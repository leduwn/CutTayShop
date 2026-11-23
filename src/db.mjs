/**
 * Lớp truy cập SQLite thuần (node:sqlite, không thư viện ngoài).
 * Toàn bộ dữ liệu demo của bản ASP.NET được nạp vào DB quan hệ khi khởi tạo.
 */
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { removeDiacritics } from './format.mjs';
import { hashPassword } from './auth.mjs';

const here = dirname(fileURLToPath(import.meta.url));
export const DB_PATH = join(here, '..', 'data', 'cuttayshop.db');
const SEED_PATH = join(here, '..', 'data', 'seed.json');

const SCHEMA = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS categories (
  id            INTEGER PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  icon_svg      TEXT NOT NULL DEFAULT '',
  bg_color_hex  TEXT NOT NULL DEFAULT '',
  icon_color_hex TEXT NOT NULL DEFAULT '',
  product_count INTEGER NOT NULL DEFAULT 0,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  image_url     TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS trust_benefits (
  id       INTEGER PRIMARY KEY,
  title    TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  icon_svg TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS promo_banners (
  id                     INTEGER PRIMARY KEY,
  category_title         TEXT NOT NULL,
  promo_label            TEXT NOT NULL,
  highlight_number       TEXT NOT NULL,
  cta_text               TEXT NOT NULL,
  cta_link               TEXT NOT NULL,
  image_url              TEXT NOT NULL,
  bg_color_hex           TEXT NOT NULL,
  decorative_doodle_svg  TEXT
);

CREATE TABLE IF NOT EXISTS products (
  id                  INTEGER PRIMARY KEY,
  name                TEXT NOT NULL,
  slug                TEXT NOT NULL UNIQUE,
  short_description   TEXT NOT NULL DEFAULT '',
  description         TEXT NOT NULL DEFAULT '',
  price               REAL NOT NULL DEFAULT 0,
  original_price      REAL NOT NULL DEFAULT 0,
  rating              REAL NOT NULL DEFAULT 0,
  review_count        INTEGER NOT NULL DEFAULT 0,
  image_url           TEXT NOT NULL DEFAULT '',
  secondary_image_url TEXT NOT NULL DEFAULT '',
  brand               TEXT NOT NULL DEFAULT '',
  category_slug       TEXT NOT NULL DEFAULT '',
  category_name       TEXT NOT NULL DEFAULT '',
  badge_text          TEXT,
  in_stock            INTEGER NOT NULL DEFAULT 1,
  is_hot_deal         INTEGER NOT NULL DEFAULT 0,
  is_featured         INTEGER NOT NULL DEFAULT 0,
  is_new_arrival      INTEGER NOT NULL DEFAULT 0,
  sold_count          INTEGER NOT NULL DEFAULT 0,
  total_stock         INTEGER NOT NULL DEFAULT 100,
  search_text         TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_search ON products(search_text);

CREATE TABLE IF NOT EXISTS product_images (
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS product_specs (
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  value      TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS product_variants (
  id             INTEGER PRIMARY KEY,
  product_id     INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  name           TEXT NOT NULL,
  color_name     TEXT,
  color_hex      TEXT,
  size_or_option TEXT,
  price          REAL NOT NULL DEFAULT 0,
  original_price REAL NOT NULL DEFAULT 0,
  in_stock       INTEGER NOT NULL DEFAULT 1,
  sku            TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_variants_product ON product_variants(product_id);

CREATE TABLE IF NOT EXISTS product_reviews (
  id                   INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id           INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  author_name          TEXT NOT NULL,
  rating               INTEGER NOT NULL,
  date                 TEXT NOT NULL,
  comment              TEXT NOT NULL,
  is_verified_purchase INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON product_reviews(product_id);

CREATE TABLE IF NOT EXISTS product_related (
  product_id    INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  related_slug  TEXT NOT NULL,
  sort_order    INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id            INTEGER PRIMARY KEY,
  title         TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  summary       TEXT NOT NULL DEFAULT '',
  content_html  TEXT NOT NULL DEFAULT '',
  category      TEXT NOT NULL DEFAULT '',
  category_slug TEXT NOT NULL DEFAULT '',
  image_url     TEXT NOT NULL DEFAULT '',
  author        TEXT NOT NULL DEFAULT '',
  reading_time  TEXT NOT NULL DEFAULT '',
  published_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS blog_tags (
  post_id    INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag        TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS blog_related_products (
  post_id      INTEGER NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  product_slug TEXT NOT NULL,
  sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS coupons (
  id               INTEGER PRIMARY KEY,
  code             TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  description      TEXT NOT NULL DEFAULT '',
  discount_amount  REAL NOT NULL DEFAULT 0,
  discount_percent REAL,
  min_order_value  REAL NOT NULL DEFAULT 0,
  valid_until      TEXT NOT NULL,
  is_active        INTEGER NOT NULL DEFAULT 1,
  category_limit   TEXT NOT NULL DEFAULT 'Tất cả'
);

CREATE TABLE IF NOT EXISTS orders (
  id               INTEGER PRIMARY KEY,
  order_code       TEXT NOT NULL UNIQUE,
  created_at       TEXT NOT NULL,
  customer_name    TEXT NOT NULL,
  phone_number     TEXT NOT NULL,
  email            TEXT NOT NULL DEFAULT '',
  shipping_address TEXT NOT NULL DEFAULT '',
  shipping_method  TEXT NOT NULL DEFAULT '',
  payment_method   TEXT NOT NULL DEFAULT '',
  status           TEXT NOT NULL DEFAULT '',
  subtotal         REAL NOT NULL DEFAULT 0,
  shipping_fee     REAL NOT NULL DEFAULT 0,
  discount         REAL NOT NULL DEFAULT 0,
  tracking_number  TEXT,
  note             TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id   INTEGER NOT NULL,
  product_name TEXT NOT NULL,
  product_slug TEXT NOT NULL,
  image_url    TEXT NOT NULL,
  variant_name TEXT,
  unit_price   REAL NOT NULL DEFAULT 0,
  quantity     INTEGER NOT NULL DEFAULT 1
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

CREATE TABLE IF NOT EXISTS order_tracking_steps (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id     INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT NOT NULL,
  timestamp    TEXT NOT NULL,
  is_completed INTEGER NOT NULL DEFAULT 0,
  is_current   INTEGER NOT NULL DEFAULT 0,
  sort_order   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS addresses (
  id            INTEGER PRIMARY KEY,
  receiver_name TEXT NOT NULL,
  phone_number  TEXT NOT NULL,
  full_address  TEXT NOT NULL,
  is_default    INTEGER NOT NULL DEFAULT 0,
  label         TEXT NOT NULL DEFAULT 'Nhà riêng'
);

CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  phone_number  TEXT NOT NULL DEFAULT '',
  birthday      TEXT,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL DEFAULT 'customer',
  status        TEXT NOT NULL DEFAULT 'active',
  created_at    TEXT NOT NULL
);

/* --------------------------------------------------- phiên đăng nhập */

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);

/* --------------------------------------------------- giỏ hàng bền vững */

CREATE TABLE IF NOT EXISTS carts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  session_key TEXT,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_carts_user ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_session ON carts(session_key);

CREATE TABLE IF NOT EXISTS cart_items (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  cart_id    INTEGER NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  variant_id INTEGER,
  quantity   INTEGER NOT NULL DEFAULT 1,
  UNIQUE(cart_id, product_id, variant_id)
);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart ON cart_items(cart_id);

/* --------------------------------------------------- danh sách yêu thích */

CREATE TABLE IF NOT EXISTS wishlist (
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL,
  PRIMARY KEY (user_id, product_id)
);

/* --------------------------------------------------- liên hệ / CSKH */

CREATE TABLE IF NOT EXISTS contact_messages (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name  TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT,
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL
);

/* --------------------------------------------------- cấu hình hệ thống */

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

/* --------------------------------------------------- nhật ký thao tác */

CREATE TABLE IF NOT EXISTS audit_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER,
  action     TEXT NOT NULL,
  entity     TEXT,
  entity_id  TEXT,
  detail     TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log(created_at);
`;

/**
 * Bổ sung cột còn thiếu cho database đã tạo từ phiên bản trước.
 * SQLite không có `ADD COLUMN IF NOT EXISTS` nên phải kiểm tra thủ công.
 */
const COLUMN_MIGRATIONS = [
  ['users', 'role', "TEXT NOT NULL DEFAULT 'customer'"],
  ['users', 'status', "TEXT NOT NULL DEFAULT 'active'"],
  ['product_reviews', 'user_id', 'INTEGER'],
  ['product_reviews', 'status', "TEXT NOT NULL DEFAULT 'approved'"],
  ['orders', 'user_id', 'INTEGER'],
  ['orders', 'updated_at', 'TEXT'],
];

function migrate(db) {
  for (const [table, column, definition] of COLUMN_MIGRATIONS) {
    const cols = db.prepare(`PRAGMA table_info(${table})`).all().map((c) => c.name);
    if (!cols.includes(column)) {
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
      console.log(`[db] migrate: ${table}.${column}`);
    }
  }
}

/** Cấu hình mặc định của cửa hàng (admin có thể sửa trong trang Cài đặt). */
const DEFAULT_SETTINGS = {
  brand_name: 'CutTayShop',
  hotline: '1900 8888',
  support_email: 'cskh@cuttayshop.vn',
  default_shipping_fee: '30000',
  freeship_threshold: '250000',
  warehouse_address: 'Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội',
  maintenance_mode: '0',
};

const DEFAULT_ADDRESSES = [
  {
    id: 1,
    receiver_name: 'Nguyễn Văn An',
    phone_number: '0988 123 456',
    full_address: 'Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Phường Lê Đại Hành, Quận Hai Bà Trưng, Hà Nội',
    is_default: 1,
    label: 'Nhà riêng',
  },
  {
    id: 2,
    receiver_name: 'Nguyễn Văn An (Văn phòng)',
    phone_number: '0988 123 456',
    full_address: 'Tầng 8, Tòa nhà TechnoSoft, Duy Tân, Cầu Giấy, Hà Nội',
    is_default: 0,
    label: 'Văn phòng',
  },
];

/** Chuỗi tìm kiếm không dấu, ghép từ name + category + shortDescription + brand. */
export function buildSearchText(p) {
  return [p.Name, p.CategoryName, p.ShortDescription, p.Brand]
    .map((s) => removeDiacritics(s || '').toLowerCase())
    .join(' ');
}

function seed(db) {
  const data = JSON.parse(readFileSync(SEED_PATH, 'utf8'));

  const insCategory = db.prepare(`INSERT INTO categories
    (id, name, slug, icon_svg, bg_color_hex, icon_color_hex, product_count, sort_order, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of data.categories) {
    insCategory.run(c.Id, c.Name, c.Slug, c.IconSvg ?? '', c.BgColorHex ?? '', c.IconColorHex ?? '',
      c.ProductCount ?? 0, c.SortOrder ?? 0, c.ImageUrl ?? '');
  }

  const insTrust = db.prepare('INSERT INTO trust_benefits (id, title, subtitle, icon_svg) VALUES (?, ?, ?, ?)');
  for (const t of data.trustBenefits) insTrust.run(t.Id, t.Title, t.Subtitle, t.IconSvg ?? '');

  const insBanner = db.prepare(`INSERT INTO promo_banners
    (id, category_title, promo_label, highlight_number, cta_text, cta_link, image_url, bg_color_hex, decorative_doodle_svg)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const b of data.promoBanners) {
    insBanner.run(b.Id, b.CategoryTitle, b.PromoLabel, b.HighlightNumber, b.CtaText ?? 'Khám phá →',
      b.CtaLink ?? '', b.ImageUrl ?? '', b.BgColorHex ?? '', b.DecorativeDoodleSvg ?? null);
  }

  const insProduct = db.prepare(`INSERT INTO products
    (id, name, slug, short_description, description, price, original_price, rating, review_count,
     image_url, secondary_image_url, brand, category_slug, category_name, badge_text,
     in_stock, is_hot_deal, is_featured, is_new_arrival, sold_count, total_stock, search_text)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insImage = db.prepare('INSERT INTO product_images (product_id, url, sort_order) VALUES (?, ?, ?)');
  const insSpec = db.prepare('INSERT INTO product_specs (product_id, name, value, sort_order) VALUES (?, ?, ?, ?)');
  const insVariant = db.prepare(`INSERT INTO product_variants
    (id, product_id, name, color_name, color_hex, size_or_option, price, original_price, in_stock, sku)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insReview = db.prepare(`INSERT INTO product_reviews
    (product_id, author_name, rating, date, comment, is_verified_purchase) VALUES (?, ?, ?, ?, ?, ?)`);
  const insRelated = db.prepare('INSERT INTO product_related (product_id, related_slug, sort_order) VALUES (?, ?, ?)');

  for (const p of data.products) {
    insProduct.run(
      p.Id, p.Name, p.Slug, p.ShortDescription ?? '', p.Description ?? '',
      p.Price ?? 0, p.OriginalPrice ?? 0, p.Rating ?? 0, p.ReviewCount ?? 0,
      p.ImageUrl ?? '', p.SecondaryImageUrl ?? '', p.Brand ?? '', p.CategorySlug ?? '', p.CategoryName ?? '',
      p.BadgeText ?? null,
      p.InStock ? 1 : 0, p.IsHotDeal ? 1 : 0, p.IsFeatured ? 1 : 0, p.IsNewArrival ? 1 : 0,
      p.SoldCount ?? 0, p.TotalStock ?? 100,
      buildSearchText(p),
    );

    (p.GalleryImages ?? []).forEach((url, i) => insImage.run(p.Id, url, i));

    // Specifications là object { tên: giá trị } sau khi trích từ C#
    Object.entries(p.Specifications ?? {}).forEach(([name, value], i) => {
      insSpec.run(p.Id, name, String(value), i);
    });

    for (const v of p.Variants ?? []) {
      insVariant.run(v.Id ?? null, p.Id, v.Name ?? '', v.ColorName ?? null, v.ColorHex ?? null,
        v.SizeOrOption ?? null, v.Price ?? 0, v.OriginalPrice ?? 0, v.InStock === false ? 0 : 1, v.Sku ?? '');
    }

    for (const r of p.Reviews ?? []) {
      insReview.run(p.Id, r.AuthorName ?? '', r.Rating ?? 5, r.Date ?? '', r.Comment ?? '',
        r.IsVerifiedPurchase ? 1 : 0);
    }

    (p.RelatedProductSlugs ?? []).forEach((slug, i) => insRelated.run(p.Id, slug, i));
  }

  const insPost = db.prepare(`INSERT INTO blog_posts
    (id, title, slug, summary, content_html, category, category_slug, image_url, author, reading_time, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insTag = db.prepare('INSERT INTO blog_tags (post_id, tag, sort_order) VALUES (?, ?, ?)');
  const insPostRelated = db.prepare('INSERT INTO blog_related_products (post_id, product_slug, sort_order) VALUES (?, ?, ?)');
  for (const b of data.blogPosts) {
    insPost.run(b.Id, b.Title, b.Slug, b.Summary ?? '', b.ContentHtml ?? '', b.Category ?? '',
      b.CategorySlug ?? '', b.ImageUrl ?? '', b.Author ?? '', b.ReadingTime ?? '', b.PublishedAt ?? '');
    (b.Tags ?? []).forEach((t, i) => insTag.run(b.Id, t, i));
    (b.RelatedProductSlugs ?? []).forEach((s, i) => insPostRelated.run(b.Id, s, i));
  }

  const insCoupon = db.prepare(`INSERT INTO coupons
    (id, code, title, description, discount_amount, discount_percent, min_order_value, valid_until, is_active, category_limit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  for (const c of data.coupons) {
    insCoupon.run(c.Id, c.Code, c.Title, c.Description ?? '', c.DiscountAmount ?? 0,
      c.DiscountPercent ?? null, c.MinOrderValue ?? 0, c.ValidUntil ?? '', c.IsActive === false ? 0 : 1,
      c.CategoryLimit ?? 'Tất cả');
  }

  const insOrder = db.prepare(`INSERT INTO orders
    (id, order_code, created_at, customer_name, phone_number, email, shipping_address, shipping_method,
     payment_method, status, subtotal, shipping_fee, discount, tracking_number, note)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const insItem = db.prepare(`INSERT INTO order_items
    (order_id, product_id, product_name, product_slug, image_url, variant_name, unit_price, quantity)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
  const insStep = db.prepare(`INSERT INTO order_tracking_steps
    (order_id, title, description, timestamp, is_completed, is_current, sort_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)`);
  for (const o of data.orders) {
    insOrder.run(o.Id, o.OrderCode, o.CreatedAt, o.CustomerName, o.PhoneNumber, o.Email ?? '',
      o.ShippingAddress ?? '', o.ShippingMethod ?? '', o.PaymentMethod ?? '', o.Status ?? '',
      o.Subtotal ?? 0, o.ShippingFee ?? 0, o.Discount ?? 0, o.TrackingNumber ?? null, o.Note ?? null);
    for (const it of o.Items ?? []) {
      insItem.run(o.Id, it.ProductId ?? 0, it.ProductName ?? '', it.ProductSlug ?? '', it.ImageUrl ?? '',
        it.VariantName ?? null, it.UnitPrice ?? 0, it.Quantity ?? 1);
    }
    (o.TrackingHistory ?? []).forEach((s, i) => {
      insStep.run(o.Id, s.Title ?? '', s.Description ?? '', s.Timestamp ?? '',
        s.IsCompleted ? 1 : 0, s.IsCurrent ? 1 : 0, i);
    });
  }

  const insAddress = db.prepare(`INSERT INTO addresses
    (id, receiver_name, phone_number, full_address, is_default, label) VALUES (?, ?, ?, ?, ?, ?)`);
  for (const a of DEFAULT_ADDRESSES) {
    insAddress.run(a.id, a.receiver_name, a.phone_number, a.full_address, a.is_default, a.label);
  }

  // Tài khoản demo: mật khẩu "demo123456" (scrypt), 1 quản trị + 1 khách
  const insUser = db.prepare(`INSERT INTO users
    (full_name, email, phone_number, birthday, password_hash, role, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 'active', ?)`);
  const now = new Date().toISOString().slice(0, 19);
  insUser.run('Nguyễn Văn An', 'nguyenvanan@gmail.com', '0988 123 456', '1998-05-15',
    hashPassword('demo123456'), 'customer', now);
  insUser.run('Quản Trị Viên', 'admin@cuttayshop.vn', '0900 000 000', null,
    hashPassword('admin123456'), 'admin', now);

  const insSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) insSetting.run(key, value);
}

let db = null;

/** Mở (và khởi tạo lần đầu) database. */
export function getDb() {
  if (db) return db;

  mkdirSync(dirname(DB_PATH), { recursive: true });
  const fresh = !existsSync(DB_PATH);

  db = new DatabaseSync(DB_PATH);
  db.exec(SCHEMA);
  migrate(db);

  const { n } = db.prepare('SELECT COUNT(*) AS n FROM products').get();
  if (n === 0) {
    db.exec('BEGIN');
    try {
      seed(db);
      db.exec('COMMIT');
      console.log(`[db] ${fresh ? 'tạo mới' : 'nạp lại'} dữ liệu demo → ${DB_PATH}`);
    } catch (err) {
      db.exec('ROLLBACK');
      throw err;
    }
  } else {
    // Database cũ: bổ sung settings + tài khoản demo còn thiếu
    const insSetting = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
    for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) insSetting.run(key, value);

    const { n: userCount } = db.prepare('SELECT COUNT(*) AS n FROM users').get();
    if (userCount === 0) {
      const insUser = db.prepare(`INSERT INTO users
        (full_name, email, phone_number, birthday, password_hash, role, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 'active', ?)`);
      const now = new Date().toISOString().slice(0, 19);
      insUser.run('Nguyễn Văn An', 'nguyenvanan@gmail.com', '0988 123 456', '1998-05-15',
        hashPassword('demo123456'), 'customer', now);
      insUser.run('Quản Trị Viên', 'admin@cuttayshop.vn', '0900 000 000', null,
        hashPassword('admin123456'), 'admin', now);
      console.log('[db] đã tạo 2 tài khoản demo');
    }
  }

  return db;
}

export function resetDb() {
  if (db) { db.close(); db = null; }
  if (existsSync(DB_PATH)) rmSync(DB_PATH, { force: true });
}
