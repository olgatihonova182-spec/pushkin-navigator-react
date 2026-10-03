/* Server of «Svoy v Pushkinskom» — Node.js, no dependencies.
   Serves the built app (dist/) and answers:
     GET  /api/health — is it alive, is the AI on;
     POST /api/route  — builds a personal route (YandexGPT; demo without a key).
   The key and the folder id are read from .env and never sent to the browser.

   Run: npm run build && node server/index.js   (or: npm start) */
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, createReadStream } from 'node:fs';
import { join, extname, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCatalog } from './lib/catalog.js';
import { sanitizeProfile } from './lib/profile.js';
import { buildRoute } from './lib/route.js';
import { makeComplete } from './lib/yandex.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const MAX_BODY = 16 * 1024;

/* .env: KEY=VALUE lines, # comments. Values already in the environment win. */
function loadEnv(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || line.trim().startsWith('#')) continue;
    const value = m[2].replace(/^["']|["']$/g, '');
    if (!(m[1] in process.env)) process.env[m[1]] = value;
  }
}

loadEnv(join(ROOT, '.env'));
const PORT = Number(process.env.PORT) || 8787;
const API_KEY = process.env.YANDEX_API_KEY || '';
const FOLDER_ID = process.env.YANDEX_FOLDER_ID || '';
const AI_ON = Boolean(API_KEY && FOLDER_ID);
const complete = AI_ON ? makeComplete({ apiKey: API_KEY, folderId: FOLDER_ID }) : null;
const catalog = parseCatalog(JSON.parse(readFileSync(join(ROOT, 'data', 'pushkin-collection.json'), 'utf8')));

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json',
};

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) { reject(new Error('too large')); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function serveStatic(req, res) {
  if (!existsSync(DIST)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Сначала соберите приложение: npm run build');
    return;
  }
  const url = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = normalize(join(DIST, url));
  if (!file.startsWith(DIST)) { res.writeHead(403); res.end(); return; }
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(DIST, 'index.html');
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(res);
}

const server = createServer(async (req, res) => {
  const path = new URL(req.url, 'http://x').pathname;
  if (path === '/api/health' && req.method === 'GET') {
    sendJson(res, 200, { ok: true, ai: AI_ON, exhibits: catalog.length });
    return;
  }
  if (path === '/api/route') {
    if (req.method !== 'POST') { sendJson(res, 405, { error: 'Нужен POST' }); return; }
    let body;
    try {
      body = JSON.parse(await readBody(req));
    } catch {
      sendJson(res, 400, { error: 'Не получилось прочитать запрос. Попробуйте ещё раз.' });
      return;
    }
    try {
      const route = await buildRoute(sanitizeProfile(body), catalog, { complete });
      sendJson(res, 200, route);
    } catch (e) {
      console.error('route failed:', e);
      sendJson(res, 500, { error: 'Не получилось собрать маршрут. Попробуйте ещё раз.' });
    }
    return;
  }
  if (path.startsWith('/api/')) { sendJson(res, 404, { error: 'Нет такого адреса' }); return; }
  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`Свой в Пушкинском: http://localhost:${PORT}  ·  ИИ ${AI_ON ? 'включён (YandexGPT)' : 'выключен — демо-маршрут'}  ·  экспонатов для маршрута: ${catalog.length}`);
});
