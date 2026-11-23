/**
 * Công cụ một lần: chuyển dữ liệu demo trong InMemoryDemoDataProvider.cs
 * (bản ASP.NET) sang data/seed.json để nạp vào SQLite.
 *
 * Chạy: node tools/extract-seed.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = join(here, '..', '..', 'CutTayShop - ASP', 'CutTayShop.Infrastructure', 'Services', 'InMemoryDemoDataProvider.cs');
const OUT = join(here, '..', 'data', 'seed.json');

const text = readFileSync(SRC, 'utf8');
let pos = 0;

function fail(msg) {
  const line = text.slice(0, pos).split('\n').length;
  throw new Error(`${msg} (dòng ${line}) → ...${text.slice(pos, pos + 80).replace(/\n/g, '\\n')}...`);
}

function skipWs() {
  for (;;) {
    while (pos < text.length && /\s/.test(text[pos])) pos++;
    if (text[pos] === '/' && text[pos + 1] === '/') {
      while (pos < text.length && text[pos] !== '\n') pos++;
      continue;
    }
    if (text[pos] === '/' && text[pos + 1] === '*') {
      const end = text.indexOf('*/', pos + 2);
      pos = end < 0 ? text.length : end + 2;
      continue;
    }
    return;
  }
}

function readString() {
  if (text[pos] !== '"') fail('cần chuỗi');
  pos++;
  let out = '';
  while (pos < text.length) {
    const c = text[pos];
    if (c === '\\') {
      const n = text[pos + 1];
      if (n === 'n') out += '\n';
      else if (n === 't') out += '\t';
      else if (n === 'r') out += '\r';
      else if (n === '"') out += '"';
      else if (n === '\\') out += '\\';
      else out += n;
      pos += 2;
      continue;
    }
    if (c === '"') { pos++; return out; }
    out += c;
    pos++;
  }
  fail('chuỗi không đóng');
}

function readNumber() {
  const start = pos;
  if (text[pos] === '-') pos++;
  while (pos < text.length && /[0-9._]/.test(text[pos])) pos++;
  if (/[mMdDfF]/.test(text[pos] ?? '')) pos++;
  return Number(text.slice(start, pos).replace(/[mMdDfF]$/, '').replace(/_/g, ''));
}

function readIdent() {
  const start = pos;
  while (pos < text.length && /[A-Za-z0-9_]/.test(text[pos])) pos++;
  return text.slice(start, pos);
}

function readDateTime() {
  skipWs();
  if (text[pos] !== '(') fail('cần ( cho DateTime');
  pos++;
  const args = [];
  for (;;) {
    skipWs();
    if (text[pos] === ')') { pos++; break; }
    if (text[pos] === ',') { pos++; continue; }
    if (/[0-9]/.test(text[pos])) { args.push(readNumber()); continue; }
    fail('tham số DateTime không hợp lệ');
  }
  const [y, mo = 1, d = 1, h = 0, mi = 0, s = 0] = args;
  const p = (n) => String(n).padStart(2, '0');
  return `${y}-${p(mo)}-${p(d)}T${p(h)}:${p(mi)}:${p(s)}`;
}

/** Phân biệt `{ Ident = ... }` (object) với `{ value, ... }` (collection). */
function readBlock() {
  if (text[pos] !== '{') fail('cần {');
  pos++;

  skipWs();
  let kind = 'collection';
  if (/[A-Za-z_]/.test(text[pos])) {
    const save = pos;
    readIdent();
    skipWs();
    kind = text[pos] === '=' ? 'object' : 'collection';
    pos = save;
  }

  if (kind === 'object') {
    const obj = {};
    for (;;) {
      skipWs();
      if (text[pos] === '}') { pos++; break; }
      if (text[pos] === ',') { pos++; continue; }
      const key = readIdent();
      if (!key) fail('cần tên thuộc tính');
      skipWs();
      if (text[pos] !== '=') fail(`thiếu = sau ${key}`);
      pos++;
      obj[key] = readValue();
    }
    return obj;
  }

  const arr = [];
  for (;;) {
    skipWs();
    if (text[pos] === '}') { pos++; break; }
    if (text[pos] === ',') { pos++; continue; }
    arr.push(readValue());
  }
  return arr;
}

function readValue() {
  skipWs();
  const c = text[pos];

  if (c === '"') return readString();
  if (c === '{') return readBlock();
  if (/[0-9]/.test(c) || (c === '-' && /[0-9]/.test(text[pos + 1]))) return readNumber();

  if (/[A-Za-z_]/.test(c)) {
    const id = readIdent();
    if (id === 'true') return true;
    if (id === 'false') return false;
    if (id === 'null') return null;

    if (id === 'new') {
      skipWs();
      if (text[pos] === '(') {
        pos++;
        skipWs();
        if (text[pos] !== ')') fail('new( không hợp lệ');
        pos++;
        skipWs();
        return readBlock();
      }
      const typeName = readIdent();
      if (typeName === 'DateTime') return readDateTime();
      skipWs();
      if (text[pos] === '<') {
        let depth = 0;
        while (pos < text.length) {
          if (text[pos] === '<') depth++;
          else if (text[pos] === '>') { depth--; if (depth === 0) { pos++; break; } }
          pos++;
        }
        skipWs();
      }
      return readBlock();
    }
    fail(`token không xác định "${id}"`);
  }
  fail('token không hợp lệ');
}

function extractList(name) {
  const re = new RegExp(`private static readonly List<[\\w.]+>\\s+${name}\\s*=\\s*new\\(\\)\\s*\\{`);
  const m = re.exec(text);
  if (!m) throw new Error(`Không tìm thấy danh sách ${name}`);
  pos = m.index + m[0].length - 1;
  const value = readBlock();
  if (!Array.isArray(value)) throw new Error(`${name} không phải collection`);
  return value;
}

/** Mảng các cặp `{ "key", "value" }` → object. */
function pairsToObject(list) {
  const out = {};
  for (const item of list || []) {
    if (Array.isArray(item) && item.length >= 2) out[String(item[0])] = String(item[1]);
  }
  return out;
}

const seed = {
  categories: extractList('Categories'),
  trustBenefits: extractList('TrustBenefits'),
  promoBanners: extractList('PromoBanners'),
  products: extractList('Products').map((p) => ({
    ...p,
    Specifications: pairsToObject(p.Specifications),
  })),
  blogPosts: extractList('BlogPosts'),
  coupons: extractList('Coupons'),
  orders: extractList('Orders'),
};

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(seed, null, 2), 'utf8');

for (const [k, v] of Object.entries(seed)) {
  console.log(String(k).padEnd(16), Array.isArray(v) ? v.length : '?');
}
console.log('→', OUT);
