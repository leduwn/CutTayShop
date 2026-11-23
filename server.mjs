/**
 * CutTayShop — máy chủ HTTP thuần Node.js (không framework), dữ liệu SQLite.
 * Chạy: node server.mjs  (hoặc npm start)
 */
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { createRouter } from './src/http/router.mjs';
import { serveStatic } from './src/http/static.mjs';
import { parseQuery, parseForm, sendHtml, sendText } from './src/http/utils.mjs';
import { resolveSession } from './src/http/session.mjs';
import { getDb } from './src/db.mjs';
import * as repo from './src/repository.mjs';

import { registerStorefrontRoutes, setNotFoundHandler } from './src/routes/storefront.mjs';
import { registerAccountRoutes } from './src/routes/account.mjs';
import { registerAdminRoutes, setAdminNotFoundHandler } from './src/routes/admin.mjs';
import { registerApiRoutes } from './src/routes/api.mjs';

import { render404, render403, render500, renderSessionExpired, renderMaintenance } from './src/views/errors.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(here, 'public');
const PORT = Number(process.env.PORT) || 5139;

/* --------------------------------------------------------------- khởi tạo */

getDb(); // tạo/nạp dữ liệu demo lần đầu

const router = createRouter();
const servePublic = serveStatic(PUBLIC_DIR);

const notFound = (res) => sendHtml(res, render404(), 404);
setNotFoundHandler(notFound);
setAdminNotFoundHandler(notFound);

registerStorefrontRoutes(router);
registerAccountRoutes(router);
registerAdminRoutes(router);
registerApiRoutes(router);

/* ------------------------------------------------------- trang trạng thái */

router.get('/404', (req, res) => sendHtml(res, render404(), 404));
router.get('/403', (req, res) => sendHtml(res, render403(), 403));
router.get('/500', (req, res) => sendHtml(res, render500(), 500));
router.get('/session-expired', (req, res) => sendHtml(res, renderSessionExpired()));
router.get('/bao-tri', (req, res) => sendHtml(res, renderMaintenance(), 503));

/* -------------------------------------------------------------- xử lý req */

async function handle(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Tài nguyên tĩnh
  if (req.method === 'GET' || req.method === 'HEAD') {
    if (servePublic(req, res, url.pathname)) return;
  }

  const match = router.match(req.method, url.pathname);
  if (!match) return notFound(res);

  // Chuẩn bị context
  req.query = parseQuery(url);
  req.pathname = url.pathname;
  req.params = match.params;

  // Phiên đăng nhập + khoá giỏ hàng khách
  const session = resolveSession(req);
  req.user = session.user;
  req.sessionToken = session.sessionToken;
  req.guestKey = session.guestKey;
  if (session.setCookies.length) {
    res.setHeader('Set-Cookie', session.setCookies);
  }

  // Chế độ bảo trì: chặn storefront (trừ admin và trang tĩnh)
  if (repo.getSetting('maintenance_mode', '0') === '1'
      && !url.pathname.startsWith('/admin')
      && !url.pathname.startsWith('/dang-nhap')
      && !url.pathname.startsWith('/api/')
      && url.pathname !== '/bao-tri') {
    return sendHtml(res, renderMaintenance(), 503);
  }

  if (req.method === 'POST') {
    try {
      req.body = await parseForm(req);
    } catch {
      return sendText(res, 'Yêu cầu không hợp lệ', 400);
    }
  }

  try {
    await match.handler(req, res);
  } catch (err) {
    console.error(`[error] ${req.method} ${url.pathname}`, err);
    if (!res.headersSent) sendHtml(res, render500(), 500);
  }
}

const server = createServer((req, res) => {
  handle(req, res).catch((err) => {
    console.error('[fatal]', err);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Internal Server Error');
    }
  });
});

server.listen(PORT, () => {
  console.log(`CutTayShop (Node.js + SQLite) đang chạy tại http://localhost:${PORT}`);
  console.log(`  Storefront : http://localhost:${PORT}/`);
  console.log(`  Admin      : http://localhost:${PORT}/admin`);
  console.log(`  Flash Sale : http://localhost:${PORT}/flash-sale`);
  console.log(`  Tài khoản  : http://localhost:${PORT}/tai-khoan`);
});

export { server, router };
