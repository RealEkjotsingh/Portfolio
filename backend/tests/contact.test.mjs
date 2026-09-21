import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { handleContact } from '../worker/contact.js';
import worker from '../worker/index.js';

function database() {
  const sqlite = new DatabaseSync(':memory:');
  for (const path of readdirSync('drizzle').filter(path => path.endsWith('.sql')).sort()) sqlite.exec(readFileSync(`drizzle/${path}`, 'utf8'));
  const DB = { prepare(sql) { const statement = sqlite.prepare(sql); return { bind(...args) { return { first: async () => statement.get(...args) || null, run: async () => ({ success: true, meta: statement.run(...args) }) }; } }; } };
  return { DB, sqlite };
}
const input = (changes = {}) => ({ id: crypto.randomUUID(), name: 'Test Recruiter', email: 'recruiter@example.com', company: 'Example Team', interest: 'A role on our team', subject: 'UX Designer', preference: 'Remote', message: 'I would like to discuss a design role.', website: '', ...changes });
const request = (value, headers = {}, method = 'POST') => new Request('https://portfolio.example/api/contact', { method, headers: { 'Content-Type': 'application/json', Origin: 'https://portfolio.example', ...headers }, ...(method === 'GET' ? {} : { body: JSON.stringify(value) }) });

test('a valid enquiry is durably saved, with no public read endpoint', async () => {
  const env = database();
  const value = input({ name: "O’Neil", message: "Let's discuss UX; DROP TABLE contact_messages; is only text." });
  const response = await handleContact(request(value), env);
  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), { ok: true, id: value.id });
  assert.equal(env.sqlite.prepare('SELECT message FROM contact_messages').get().message, value.message);
  assert.equal((await handleContact(request(null, {}, 'GET'), env)).status, 405);
  assert.equal((await worker.fetch(new Request('https://portfolio.example/api/messages'), env)).status, 404);
  env.sqlite.close();
});
test('retrying the same submission is idempotent; changed replay is rejected', async () => {
  const env = database(); const value = input();
  assert.equal((await handleContact(request(value), env)).status, 201);
  assert.equal((await handleContact(request(value), env)).status, 200);
  assert.equal(env.sqlite.prepare('SELECT COUNT(*) AS n FROM contact_messages').get().n, 1);
  assert.equal((await handleContact(request({ ...value, message: 'A different message with the same identifier.' }), env)).status, 409);
  env.sqlite.close();
});
test('validation rejects blank names, invalid emails, enum tampering and long payloads without saving', async () => {
  const env = database();
  for (const changes of [{ name: '  ' }, { email: 'no-email' }, { message: 'too short' }, { interest: 'untrusted' }, { preference: 'unexpected' }, { id: 'not-a-uuid' }, { message: 'x'.repeat(2001) }, { name: ['not text'] }, { website: 'spam.example' }]) {
    assert.equal((await handleContact(request(input(changes)), env)).status, 422);
  }
  assert.equal((await handleContact(request(input({ message: 'x'.repeat(17000) })), env)).status, 413);
  assert.equal(env.sqlite.prepare('SELECT COUNT(*) AS n FROM contact_messages').get().n, 0);
  env.sqlite.close();
});
test('same-origin checks, invalid JSON, and unavailable storage return errors', async () => {
  const env = database();
  assert.equal((await handleContact(request(input(), { Origin: 'https://other.example' }), env)).status, 403);
  assert.equal((await handleContact(request(input(), { 'Sec-Fetch-Site': 'cross-site' }), env)).status, 403);
  assert.equal((await handleContact(request(input(), { 'Content-Type': 'text/plain' }), env)).status, 415);
  const malformed = new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{' });
  assert.equal((await handleContact(malformed, env)).status, 400);
  const unavailable = await handleContact(request(input()), {});
  assert.equal(unavailable.status, 503);
  assert.equal((await unavailable.json()).ok, false);
  env.sqlite.close();
});
test('per-email limit is enforced, including normalized casing, without blocking retries', async () => {
  const env = database(); const first = input();
  assert.equal((await handleContact(request(first), env)).status, 201);
  for (let n = 0; n < 4; n++) assert.equal((await handleContact(request(input()), env)).status, 201);
  const limited = await handleContact(request(input({ email: 'RECRUITER@example.com' })), env);
  assert.equal(limited.status, 429); assert.equal(limited.headers.get('Retry-After'), '3600');
  assert.equal((await handleContact(request(first), env)).status, 200);
  env.sqlite.close();
});
test('project and general enquiries save only their applicable fields', async () => {
  const env = database();
  for (const value of [input({ interest: 'A project', preference: 'Exploring ideas' }), input({ interest: 'Something else', preference: '' })]) assert.equal((await handleContact(request(value), env)).status, 201);
  assert.equal(env.sqlite.prepare('SELECT COUNT(*) AS n FROM contact_messages').get().n, 2);
  env.sqlite.close();
});
