/**
 * Middleware phiên đăng nhập: đọc cookie → gắn `req.user` và `req.sessionToken`.
 * Cũng cấp `req.cartKey` (khoá giỏ hàng cho khách chưa đăng nhập).
 */
import * as repo from '../repository.mjs';
import { readSessionCookie, newSessionToken, sessionCookie } from '../auth.mjs';

const GUEST_COOKIE = 'cts_guest';

function readCookie(cookieHeader, name) {
  for (const part of (cookieHeader || '').split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return null;
}

/**
 * @returns {{ user: object|null, sessionToken: string|null, guestKey: string, setCookies: string[] }}
 */
export function resolveSession(req) {
  const cookieHeader = req.headers.cookie || '';
  const sessionToken = readSessionCookie(cookieHeader);
  const user = sessionToken ? repo.getSessionUser(sessionToken) : null;

  let guestKey = readCookie(cookieHeader, GUEST_COOKIE);
  const setCookies = [];

  if (!guestKey) {
    guestKey = newSessionToken();
    setCookies.push(`${GUEST_COOKIE}=${guestKey}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`);
  }

  return { user, sessionToken, guestKey, setCookies };
}

/** Khoá định danh giỏ hàng: ưu tiên tài khoản, fallback phiên khách. */
export function cartIdentity(req) {
  return req.user
    ? { userId: req.user.id, sessionKey: null }
    : { userId: null, sessionKey: req.guestKey };
}

export { sessionCookie, GUEST_COOKIE };
