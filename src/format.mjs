/** Định dạng số/ngày theo đúng culture mà bản ASP.NET dùng (en-US "N0" + dd/MM/yyyy). */

const NUM = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/** Tương đương C# `value.ToString("N0")` → 1234567 => "1,234,567" */
export function n0(value) {
  const n = Number(value ?? 0);
  if (!Number.isFinite(n)) return '0';
  return NUM.format(Math.round(n));
}

/** `value.ToString("0.0")` → 4.9 => "4.9" */
export function fixed1(value) {
  const n = Number(value ?? 0);
  return (Number.isFinite(n) ? n : 0).toFixed(1);
}

/** `value.ToString("D2")` */
export function d2(value) {
  return String(Math.max(0, Math.trunc(Number(value) || 0))).padStart(2, '0');
}

/** ₫ suffix helper */
export function vnd(value) {
  return `${n0(value)}₫`;
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function toDate(value) {
  if (value instanceof Date) return value;
  if (!value) return new Date(NaN);
  // "2026-02-26T14:30:00" được hiểu là giờ local giống DateTime của .NET
  return new Date(value);
}

/** `dd/MM/yyyy` */
export function dmy(value) {
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return '';
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/** `dd/MM/yyyy HH:mm` */
export function dmyhm(value) {
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return '';
  return `${dmy(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** `ToString("o")` — ISO 8601 round-trip, dùng cho data-countdown-end */
export function isoRoundTrip(value) {
  const d = toDate(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString();
}

/** Escape HTML cho mọi giá trị chèn vào template. */
export function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Bỏ dấu tiếng Việt — tương đương RemoveDiacritics() trong C#. */
export function removeDiacritics(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFC');
}

/** Sinh mã đơn hàng dạng CTS-2026-xxxxx giống CheckoutController. */
export function newOrderCode() {
  const n = 10000 + Math.floor(Math.random() * 89999);
  return `CTS-2026-${n}`;
}

/** Đếm ngược: trả về {hours, minutes, seconds} giống DealCountdown của C#. */
export function countdownParts(endTime, now = new Date()) {
  const end = toDate(endTime);
  const diffMs = end.getTime() - now.getTime();
  if (Number.isNaN(diffMs) || diffMs <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
}
