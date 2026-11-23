/** Tiện ích HTTP: đọc body, parse query/form, gửi response. */

export function parseCookies(header = '') {
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    const key = part.slice(0, idx).trim();
    if (!key) continue;
    out[key] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

export function parseQuery(url) {
  const out = {};
  for (const [k, v] of url.searchParams) {
    if (!(k in out)) out[k] = v;
  }
  return out;
}

export function readBody(req, limit = 1_000_000) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('Payload quá lớn'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

export async function parseForm(req) {
  const type = req.headers['content-type'] || '';
  const raw = await readBody(req);

  if (type.includes('application/json')) {
    if (!raw.trim()) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  const out = {};
  const params = new URLSearchParams(raw);
  for (const [k, v] of params) out[k] = v;
  return out;
}

export function sendHtml(res, html, status = 200, extraHeaders = {}) {
  const body = Buffer.from(html, 'utf8');
  res.writeHead(status, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-cache',
    ...extraHeaders,
  });
  res.end(body);
}

export function sendJson(res, data, status = 200) {
  const body = Buffer.from(JSON.stringify(data), 'utf8');
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': body.length,
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

export function sendText(res, text, status = 200, contentType = 'text/plain; charset=utf-8') {
  const body = Buffer.from(text, 'utf8');
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': body.length,
  });
  res.end(body);
}

export function redirect(res, location, status = 302) {
  res.writeHead(status, { Location: location });
  res.end();
}

/** Chuyển chuỗi query thành object filter cho catalog. */
export function toCatalogFilters(query, overrides = {}) {
  const num = (v) => (v === undefined || v === '' ? null : Number(v));
  const bool = (v) => v === 'true' || v === 'on' || v === '1';

  return {
    categorySlug: query.categorySlug || null,
    searchQuery: query.q ?? null,
    brand: query.brand || null,
    minPrice: num(query.minPrice),
    maxPrice: num(query.maxPrice),
    minRating: num(query.minRating),
    inStockOnly: bool(query.inStockOnly),
    onSaleOnly: bool(query.onSaleOnly),
    sortBy: query.sortBy || 'popular',
    page: Number(query.page) > 0 ? Number(query.page) : 1,
    pageSize: 12,
    ...overrides,
  };
}
