import { handleContact } from './contact.js';

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/api/contact') return handleContact(request, env);
    if (path.startsWith('/api/')) return Response.json({ ok: false, error: 'Not found.' }, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    if (request.method !== 'GET' && request.method !== 'HEAD') return new Response('Method not allowed', { status: 405 });
    return env.ASSETS.fetch(request);
  },
};
