/**
 * Xác thực thật: băm mật khẩu bằng scrypt (built-in crypto) và quản lý phiên
 * đăng nhập lưu trong SQLite. Không dùng thư viện ngoài.
 */
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LEN = 64;
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 ngày

/** `scrypt$<saltHex>$<hashHex>` */
export function hashPassword(plain) {
  const salt = randomBytes(16);
  const hash = scryptSync(String(plain), salt, KEY_LEN);
  return `scrypt$${salt.toString('hex')}$${hash.toString('hex')}`;
}

export function verifyPassword(plain, stored) {
  if (!stored || typeof stored !== 'string') return false;
  const parts = stored.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;

  const salt = Buffer.from(parts[1], 'hex');
  const expected = Buffer.from(parts[2], 'hex');
  if (expected.length !== KEY_LEN) return false;

  const actual = scryptSync(String(plain), salt, KEY_LEN);
  return timingSafeEqual(actual, expected);
}

export function newSessionToken() {
  return randomBytes(32).toString('hex');
}

export function sessionExpiry() {
  return new Date(Date.now() + SESSION_TTL_MS).toISOString();
}

export const SESSION_COOKIE = 'cts_session';
export const SESSION_MAX_AGE = Math.floor(SESSION_TTL_MS / 1000);

/** Đọc cookie phiên từ header. */
export function readSessionCookie(cookieHeader = '') {
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    if (part.slice(0, idx).trim() === SESSION_COOKIE) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return null;
}

export function sessionCookie(token, maxAge = SESSION_MAX_AGE) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
