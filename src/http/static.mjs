/** Phục vụ tài nguyên tĩnh từ thư mục public/ (có ETag + 304). */
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, sep } from 'node:path';

const TYPES = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

export function serveStatic(publicDir) {
  const root = publicDir.endsWith(sep) ? publicDir : publicDir + sep;

  return (req, res, pathname) => {
    const rel = normalize(pathname).replace(/^([/\\])+/, '');
    const full = join(publicDir, rel);

    // Chặn path traversal
    if (!full.startsWith(root)) return false;

    let stat;
    try {
      stat = statSync(full);
    } catch {
      return false;
    }
    if (!stat.isFile()) return false;

    const etag = `W/"${stat.size.toString(16)}-${Math.floor(stat.mtimeMs).toString(16)}"`;

    // Trình duyệt luôn hỏi lại (no-cache) nhưng nhận 304 nếu file không đổi,
    // tránh giữ bản asset cũ sau khi sửa.
    if (req.headers['if-none-match'] === etag) {
      res.writeHead(304, { ETag: etag, 'Cache-Control': 'no-cache' });
      res.end();
      return true;
    }

    const ext = extname(full).toLowerCase();
    res.writeHead(200, {
      'Content-Type': TYPES[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache',
      ETag: etag,
    });

    if (req.method === 'HEAD') {
      res.end();
      return true;
    }

    createReadStream(full).pipe(res);
    return true;
  };
}
