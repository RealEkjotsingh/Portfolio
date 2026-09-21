import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

// Preserve the existing vanilla frontend; add a small Worker for the contact API.
await rm('dist', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await mkdir('dist/.openai', { recursive: true });
await cp('web', 'dist/client', { recursive: true });
await cp('worker', 'dist/server', { recursive: true });
await cp('.openai/hosting.json', 'dist/.openai/hosting.json');
await cp('drizzle', 'dist/.openai/drizzle', { recursive: true });
const manifest = JSON.parse(await readFile('.openai/hosting.json', 'utf8'));
if (manifest.static || !manifest.d1) throw new Error('Contact submissions require the Worker and DB binding.');
await writeFile('dist/client/_headers', '/api/*\n  Cache-Control: no-store\n');
console.log('Built portfolio assets, contact Worker, and database migrations.');
