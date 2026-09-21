const INTERESTS = new Map([
  ['A role on our team', ['Remote', 'Hybrid', 'On-site', 'Let’s discuss']],
  ['A project', ['As soon as possible', 'Within a month', '1–3 months', 'Exploring ideas']],
  ['Something else', []],
]);
const UUID = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const MAX_BODY = 16384;

function json(data, status = 200, extraHeaders = {}) {
  return Response.json(data, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extraHeaders } });
}

export function validateContact(input) {
  const errors = {};
  if (!input || typeof input !== 'object' || Array.isArray(input)) return { errors: { form: 'Please complete the form.' } };
  const clean = (key, min, max, message) => {
    const value = typeof input[key] === 'string' ? input[key].trim() : '';
    if ((input[key] != null && typeof input[key] !== 'string') || value.length < min || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) errors[key] = message;
    return value;
  };
  const data = {
    id: clean('id', 36, 36, 'Please refresh the page and try again.'),
    name: clean('name', 1, 100, 'Please enter your name (up to 100 characters).'),
    email: clean('email', 3, 254, 'Please enter a valid email address.'),
    company: clean('company', 0, 150, 'Use up to 150 characters for the company name.'),
    interest: clean('interest', 1, 40, 'Please choose an enquiry type.'),
    subject: clean('subject', 0, 150, 'Use up to 150 characters for the subject.'),
    preference: clean('preference', 0, 40, 'Please choose one of the available options.'),
    message: clean('message', 10, 2000, 'Please write between 10 and 2,000 characters.'),
  };
  if (!UUID.test(data.id)) errors.id = 'Please refresh the page and try again.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email address.';
  data.email = data.email.toLowerCase();
  const options = INTERESTS.get(data.interest);
  if (!options) errors.interest = 'Please choose an enquiry type.';
  if (data.preference && !options?.includes(data.preference)) errors.preference = 'Please choose one of the available options.';
  return { data, errors };
}

async function readJson(request) {
  if (Number(request.headers.get('content-length')) > MAX_BODY) throw Object.assign(new Error('Too large'), { status: 413 });
  if (!request.body) throw new Error('Empty body');
  const reader = request.body.getReader();
  const chunks = []; let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) { await reader.cancel(); throw Object.assign(new Error('Too large'), { status: 413 }); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}

// Queries stay private. The Site owner can read submissions in the Sites database viewer.
async function saveMessage(db, data) {
  if (!db?.prepare) throw new Error('DB binding unavailable');
  const existing = await db.prepare('SELECT id, name, email, company, interest, subject, preference, message FROM contact_messages WHERE id = ?').bind(data.id).first();
  if (existing) {
    if (Object.keys(data).some(key => existing[key] !== data[key])) return { status: 409, error: 'This request changed after submission. Please start a new message.' };
    return { status: 200, id: existing.id };
  }
  const createdAt = Date.now();
  // One atomic statement bounds repeat messages and makes retries idempotent.
  const result = await db.prepare(`INSERT INTO contact_messages
    (id, name, email, company, interest, subject, preference, message, created_at)
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?
    WHERE (SELECT COUNT(*) FROM contact_messages WHERE email = ? AND created_at > ?) < 5
    ON CONFLICT(id) DO NOTHING`).bind(data.id, data.name, data.email, data.company, data.interest, data.subject, data.preference, data.message, createdAt, data.email, createdAt - 3600000).run();
  if (result.success === false) throw new Error('Contact insert failed');
  if (!result.meta?.changes) {
    const retry = await db.prepare('SELECT id, name, email, company, interest, subject, preference, message FROM contact_messages WHERE id = ?').bind(data.id).first();
    if (retry && Object.keys(data).every(key => retry[key] === data[key])) return { status: 200, id: retry.id };
    if (retry) return { status: 409, error: 'This request changed after submission. Please start a new message.' };
    return { status: 429, error: 'You’ve sent several messages recently. Please try again in an hour or email me directly.' };
  }
  return { status: 201, id: data.id };
}

export async function handleContact(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'Use the contact form to send a message.' }, 405, { Allow: 'POST' });
  const origin = request.headers.get('origin');
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get('sec-fetch-site') === 'cross-site') return json({ ok: false, error: 'Please send your message from this portfolio.' }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return json({ ok: false, error: 'Please use the contact form.' }, 415);
  let input;
  try { input = await readJson(request); }
  catch (error) { return json({ ok: false, error: error.status === 413 ? 'Your message is too long.' : 'We couldn’t read your message. Please try again.' }, error.status === 413 ? 413 : 400); }
  if (typeof input?.website === 'string' && input.website.trim()) return json({ ok: false, error: 'Please leave the website field empty.' }, 422);
  const { data, errors } = validateContact(input);
  if (Object.keys(errors).length) return json({ ok: false, error: 'Please check the highlighted fields.', errors }, 422);
  try {
    const result = await saveMessage(env.DB, data);
    if (result.error) return json({ ok: false, error: result.error }, result.status, result.status === 429 ? { 'Retry-After': '3600' } : {});
    return json({ ok: true, id: result.id }, result.status);
  } catch (error) {
    // Do not log message text, email addresses, or database parameters.
    console.error('contact_submission_unavailable', error?.name || 'Error');
    return json({ ok: false, error: 'Your message wasn’t saved. Please try again or use the email link below.' }, 503);
  }
}
