/**
 * Repository: mọi truy vấn SQL cho storefront + admin.
 * Trả về object camelCase giống model C# để template JS dùng trực tiếp.
 */
import { getDb, buildSearchText } from './db.mjs';
import { removeDiacritics } from './format.mjs';

const db = () => getDb();

/* ------------------------------------------------------------------ helpers */

function mapCategory(r) {
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    iconSvg: r.icon_svg,
    bgColorHex: r.bg_color_hex,
    iconColorHex: r.icon_color_hex,
    productCount: r.product_count,
    sortOrder: r.sort_order,
    imageUrl: r.image_url,
  };
}

function mapVariant(r) {
  return {
    id: r.id,
    name: r.name,
    colorName: r.color_name,
    colorHex: r.color_hex,
    sizeOrOption: r.size_or_option,
    price: r.price,
    originalPrice: r.original_price,
    inStock: !!r.in_stock,
    sku: r.sku,
  };
}

function mapProduct(r) {
  const originalPrice = r.original_price ?? 0;
  const price = r.price ?? 0;
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    shortDescription: r.short_description,
    description: r.description,
    price,
    originalPrice,
    discountPercent: originalPrice > price && originalPrice > 0
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0,
    rating: r.rating,
    reviewCount: r.review_count,
    imageUrl: r.image_url,
    secondaryImageUrl: r.secondary_image_url,
    brand: r.brand,
    categorySlug: r.category_slug,
    categoryName: r.category_name,
    badgeText: r.badge_text,
    inStock: !!r.in_stock,
    isHotDeal: !!r.is_hot_deal,
    isFeatured: !!r.is_featured,
    isNewArrival: !!r.is_new_arrival,
    soldCount: r.sold_count,
    totalStock: r.total_stock,
    galleryImages: [],
    specifications: [],
    variants: [],
    reviews: [],
    relatedProductSlugs: [],
  };
}

/** Nạp kèm chi tiết (gallery/specs/variants/reviews) cho trang PDP. */
function hydrate(product) {
  if (!product) return product;
  const d = db();
  product.galleryImages = d.prepare('SELECT url FROM product_images WHERE product_id = ? ORDER BY sort_order')
    .all(product.id).map((r) => r.url);
  product.specifications = d.prepare('SELECT name, value FROM product_specs WHERE product_id = ? ORDER BY sort_order')
    .all(product.id).map((r) => ({ key: r.name, value: r.value }));
  product.variants = d.prepare('SELECT * FROM product_variants WHERE product_id = ? ORDER BY id')
    .all(product.id).map(mapVariant);
  product.reviews = d.prepare('SELECT * FROM product_reviews WHERE product_id = ? ORDER BY date DESC, id DESC')
    .all(product.id).map((r) => ({
      authorName: r.author_name,
      rating: r.rating,
      date: r.date,
      comment: r.comment,
      isVerifiedPurchase: !!r.is_verified_purchase,
    }));
  product.relatedProductSlugs = d.prepare('SELECT related_slug FROM product_related WHERE product_id = ? ORDER BY sort_order')
    .all(product.id).map((r) => r.related_slug);
  return product;
}

function mapOrder(r) {
  const items = db().prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id').all(r.id).map((it) => ({
    productId: it.product_id,
    productName: it.product_name,
    productSlug: it.product_slug,
    imageUrl: it.image_url,
    variantName: it.variant_name,
    unitPrice: it.unit_price,
    quantity: it.quantity,
    totalPrice: it.unit_price * it.quantity,
  }));
  const trackingHistory = db()
    .prepare('SELECT * FROM order_tracking_steps WHERE order_id = ? ORDER BY sort_order')
    .all(r.id)
    .map((s) => ({
      title: s.title,
      description: s.description,
      timestamp: s.timestamp,
      isCompleted: !!s.is_completed,
      isCurrent: !!s.is_current,
    }));

  return {
    id: r.id,
    orderCode: r.order_code,
    createdAt: r.created_at,
    customerName: r.customer_name,
    phoneNumber: r.phone_number,
    email: r.email,
    shippingAddress: r.shipping_address,
    shippingMethod: r.shipping_method,
    paymentMethod: r.payment_method,
    status: r.status,
    subtotal: r.subtotal,
    shippingFee: r.shipping_fee,
    discount: r.discount,
    totalAmount: r.subtotal + r.shipping_fee - r.discount,
    trackingNumber: r.tracking_number,
    note: r.note,
    items,
    trackingHistory,
  };
}

function mapCoupon(r) {
  return {
    id: r.id,
    code: r.code,
    title: r.title,
    description: r.description,
    discountAmount: r.discount_amount,
    discountPercent: r.discount_percent,
    minOrderValue: r.min_order_value,
    validUntil: r.valid_until,
    isActive: !!r.is_active,
    categoryLimit: r.category_limit,
  };
}

function mapPost(r) {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    summary: r.summary,
    contentHtml: r.content_html,
    category: r.category,
    categorySlug: r.category_slug,
    imageUrl: r.image_url,
    author: r.author,
    readingTime: r.reading_time,
    publishedAt: r.published_at,
    tags: [],
    relatedProductSlugs: [],
  };
}

/* --------------------------------------------------------------- categories */

export function getCategories() {
  return db().prepare('SELECT * FROM categories ORDER BY sort_order').all().map(mapCategory);
}

export function getCategoryBySlug(slug) {
  if (!slug) return null;
  const r = db().prepare('SELECT * FROM categories WHERE lower(slug) = lower(?)').get(slug);
  return r ? mapCategory(r) : null;
}

/* ---------------------------------------------------------------- marketing */

export function getTrustBenefits() {
  return db().prepare('SELECT * FROM trust_benefits ORDER BY id').all().map((r) => ({
    id: r.id, title: r.title, subtitle: r.subtitle, iconSvg: r.icon_svg,
  }));
}

export function getPromoBanners() {
  return db().prepare('SELECT * FROM promo_banners ORDER BY id').all().map((r) => ({
    id: r.id,
    categoryTitle: r.category_title,
    promoLabel: r.promo_label,
    highlightNumber: r.highlight_number,
    ctaText: r.cta_text,
    ctaLink: r.cta_link,
    imageUrl: r.image_url,
    bgColorHex: r.bg_color_hex,
    decorativeDoodleSvg: r.decorative_doodle_svg,
  }));
}

/** Tương đương DealCountdown: hết hạn vào cuối ngày thứ 3 tính từ hôm nay (UTC). */
export function getDealCountdown() {
  const now = new Date();
  const end = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 2, 23, 59, 0,
  ));
  return {
    endTime: end.toISOString(),
    title: 'Deal hot hôm nay',
    subtitle: 'Số lượng có hạn — Đừng bỏ lỡ!',
    expiredMessage: 'Phiên ưu đãi đã kết thúc. Hẹn gặp lại quý khách vào phiên 12:00!',
  };
}

/* ----------------------------------------------------------------- products */

export function getAllProducts() {
  return db().prepare('SELECT * FROM products ORDER BY id').all().map(mapProduct);
}

export function getHotDeals() {
  return db().prepare('SELECT * FROM products WHERE is_hot_deal = 1 ORDER BY id').all().map(mapProduct);
}

export function getFeaturedProducts() {
  return db().prepare('SELECT * FROM products WHERE is_featured = 1 ORDER BY id').all().map(mapProduct);
}

export function getNewArrivals() {
  return db().prepare('SELECT * FROM products WHERE is_new_arrival = 1 ORDER BY id').all().map(mapProduct);
}

export function getProductsByCategory(categorySlug) {
  return db().prepare('SELECT * FROM products WHERE lower(category_slug) = lower(?) ORDER BY id')
    .all(categorySlug).map(mapProduct);
}

export function getProductBySlug(slug) {
  if (!slug) return null;
  const r = db().prepare('SELECT * FROM products WHERE lower(slug) = lower(?)').get(slug);
  return r ? hydrate(mapProduct(r)) : null;
}

export function getProductById(id) {
  const r = db().prepare('SELECT * FROM products WHERE id = ?').get(id);
  return r ? hydrate(mapProduct(r)) : null;
}

export function getAllBrands() {
  return db().prepare(`SELECT DISTINCT brand FROM products WHERE brand <> '' ORDER BY brand`)
    .all().map((r) => r.brand);
}

export function getRelatedProducts(productId, count = 4) {
  const current = db().prepare('SELECT * FROM products WHERE id = ?').get(productId);
  if (!current) return db().prepare('SELECT * FROM products LIMIT ?').all(count).map(mapProduct);

  const explicit = db().prepare('SELECT related_slug FROM product_related WHERE product_id = ? ORDER BY sort_order')
    .all(productId).map((r) => r.related_slug);

  if (explicit.length) {
    const placeholders = explicit.map(() => '?').join(',');
    const rows = db().prepare(`SELECT * FROM products WHERE slug IN (${placeholders}) AND id <> ?`)
      .all(...explicit, productId);
    // giữ đúng thứ tự khai báo trong dữ liệu gốc
    const bySlug = new Map(rows.map((r) => [r.slug.toLowerCase(), r]));
    const ordered = explicit.map((s) => bySlug.get(s.toLowerCase())).filter(Boolean).slice(0, count);
    if (ordered.length) return ordered.map(mapProduct);
  }

  const related = db().prepare('SELECT * FROM products WHERE id <> ? AND lower(category_slug) = lower(?) LIMIT ?')
    .all(productId, current.category_slug, count).map(mapProduct);

  if (related.length < count) {
    const extra = db().prepare('SELECT * FROM products WHERE id <> ? ORDER BY id LIMIT ?')
      .all(productId, count - related.length).map(mapProduct);
    for (const p of extra) {
      if (!related.some((r) => r.id === p.id)) related.push(p);
    }
  }
  return related.slice(0, count);
}

/** Tìm kiếm không dấu (giống RemoveDiacritics + Contains của bản C#). */
export function searchProducts(query) {
  if (!query || !query.trim()) return getAllProducts();
  const norm = removeDiacritics(query.trim()).toLowerCase();
  return db().prepare('SELECT * FROM products WHERE search_text LIKE ? ORDER BY id')
    .all(`%${norm}%`).map(mapProduct);
}

const SORT_SQL = {
  price_asc: 'price ASC',
  price_desc: 'price DESC',
  newest: 'is_new_arrival DESC, id DESC',
  rating_desc: 'rating DESC, review_count DESC',
  popular: 'is_hot_deal DESC, sold_count DESC',
};

/**
 * Bộ lọc catalog: category, từ khoá, thương hiệu, khoảng giá, rating, tồn kho, giảm giá.
 * Trả về object tương đương CatalogResult của C#.
 */
export function getCatalog(filters = {}) {
  const where = [];
  const params = [];

  if (filters.categorySlug) {
    where.push('lower(category_slug) = lower(?)');
    params.push(filters.categorySlug);
  }

  if (filters.searchQuery && filters.searchQuery.trim()) {
    where.push('search_text LIKE ?');
    params.push(`%${removeDiacritics(filters.searchQuery.trim()).toLowerCase()}%`);
  }

  if (filters.brand) {
    where.push('lower(brand) = lower(?)');
    params.push(filters.brand);
  }

  if (filters.minPrice != null && filters.minPrice !== '') {
    where.push('price >= ?');
    params.push(Number(filters.minPrice));
  }

  if (filters.maxPrice != null && filters.maxPrice !== '') {
    where.push('price <= ?');
    params.push(Number(filters.maxPrice));
  }

  if (filters.minRating != null && filters.minRating !== '') {
    where.push('rating >= ?');
    params.push(Number(filters.minRating));
  }

  if (filters.inStockOnly) where.push('in_stock = 1');
  if (filters.onSaleOnly) where.push('original_price > price');

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';
  const orderSql = SORT_SQL[String(filters.sortBy || 'popular').toLowerCase()] || SORT_SQL.popular;

  const { n: totalItems } = db().prepare(`SELECT COUNT(*) AS n FROM products ${whereSql}`).get(...params);

  const page = Number(filters.page) > 0 ? Number(filters.page) : 1;
  const pageSize = Number(filters.pageSize) > 0 ? Number(filters.pageSize) : 12;

  const products = db()
    .prepare(`SELECT * FROM products ${whereSql} ORDER BY ${orderSql} LIMIT ? OFFSET ?`)
    .all(...params, pageSize, (page - 1) * pageSize)
    .map(mapProduct);

  const brandRows = db().prepare(`
    SELECT DISTINCT brand FROM products
    WHERE brand <> '' ${filters.categorySlug ? 'AND lower(category_slug) = lower(?)' : ''}
    ORDER BY brand`).all(...(filters.categorySlug ? [filters.categorySlug] : []));

  const currentCategory = filters.categorySlug ? getCategoryBySlug(filters.categorySlug) : null;

  return {
    products,
    totalItems,
    currentPage: page,
    pageSize,
    totalPages: pageSize > 0 ? Math.ceil(totalItems / pageSize) : 0,
    availableBrands: brandRows.map((r) => r.brand),
    availableCategories: getCategories(),
    currentCategory,
  };
}

/* --------------------------------------------------------------------- blog */

export function getBlogPosts() {
  return db().prepare('SELECT * FROM blog_posts ORDER BY published_at DESC, id DESC').all().map(mapPost);
}

export function getBlogPostBySlug(slug) {
  if (!slug) return null;
  const r = db().prepare('SELECT * FROM blog_posts WHERE lower(slug) = lower(?)').get(slug);
  if (!r) return null;
  const post = mapPost(r);
  post.tags = db().prepare('SELECT tag FROM blog_tags WHERE post_id = ? ORDER BY sort_order')
    .all(post.id).map((x) => x.tag);
  post.relatedProductSlugs = db().prepare('SELECT product_slug FROM blog_related_products WHERE post_id = ? ORDER BY sort_order')
    .all(post.id).map((x) => x.product_slug);
  return post;
}

/* ------------------------------------------------------------------ coupons */

export function getCoupons() {
  return db().prepare('SELECT * FROM coupons ORDER BY id').all().map(mapCoupon);
}

export function getCouponByCode(code) {
  if (!code) return null;
  const r = db().prepare('SELECT * FROM coupons WHERE upper(code) = upper(?)').get(code.trim());
  return r ? mapCoupon(r) : null;
}

/* ------------------------------------------------------------------- orders */

export function getOrders() {
  return db().prepare('SELECT * FROM orders ORDER BY created_at DESC, id DESC').all().map(mapOrder);
}

export function getOrderByCode(code) {
  if (!code) return null;
  const r = db().prepare('SELECT * FROM orders WHERE lower(order_code) = lower(?) OR phone_number = ? LIMIT 1')
    .get(code.trim(), code.trim());
  return r ? mapOrder(r) : null;
}

export function getOrderById(id) {
  const r = db().prepare('SELECT * FROM orders WHERE id = ?').get(id);
  return r ? mapOrder(r) : null;
}

/** Tạo đơn hàng mới từ form checkout (demo, không thanh toán thật). */
export function createOrder({ orderCode, customerName, phoneNumber, email, shippingAddress,
  shippingMethod, paymentMethod, subtotal, shippingFee, discount, note, items }) {
  const d = db();
  d.exec('BEGIN');
  try {
    const createdAt = new Date().toISOString().slice(0, 19);
    const info = d.prepare(`INSERT INTO orders
      (order_code, created_at, customer_name, phone_number, email, shipping_address, shipping_method,
       payment_method, status, subtotal, shipping_fee, discount, tracking_number, note)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(orderCode, createdAt, customerName, phoneNumber, email || '', shippingAddress,
        shippingMethod, paymentMethod, 'Đang xử lý', subtotal, shippingFee, discount, null, note || null);

    const orderId = Number(info.lastInsertRowid);
    const insItem = d.prepare(`INSERT INTO order_items
      (order_id, product_id, product_name, product_slug, image_url, variant_name, unit_price, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    for (const it of items || []) {
      insItem.run(orderId, it.productId, it.productName, it.productSlug, it.imageUrl,
        it.variantName ?? null, it.unitPrice, it.quantity);
    }

    const insStep = d.prepare(`INSERT INTO order_tracking_steps
      (order_id, title, description, timestamp, is_completed, is_current, sort_order)
      VALUES (?, ?, ?, ?, ?, ?, ?)`);
    insStep.run(orderId, 'Đơn hàng đã đặt', 'Quý khách đã đặt đơn hàng thành công', createdAt, 1, 1, 0);

    d.exec('COMMIT');
    return getOrderById(orderId);
  } catch (err) {
    d.exec('ROLLBACK');
    throw err;
  }
}

/* ---------------------------------------------------------------- addresses */

export function getAddresses() {
  return db().prepare('SELECT * FROM addresses ORDER BY is_default DESC, id').all().map((r) => ({
    id: r.id,
    receiverName: r.receiver_name,
    phoneNumber: r.phone_number,
    fullAddress: r.full_address,
    isDefault: !!r.is_default,
    label: r.label,
  }));
}

/* -------------------------------------------------------------------- users */

function mapUser(r) {
  if (!r) return null;
  return {
    id: r.id,
    fullName: r.full_name,
    email: r.email,
    phoneNumber: r.phone_number,
    birthday: r.birthday,
    role: r.role || 'customer',
    status: r.status || 'active',
    createdAt: r.created_at,
  };
}

export function getUserByEmail(email) {
  if (!email) return null;
  return db().prepare('SELECT * FROM users WHERE lower(email) = lower(?)').get(email.trim()) || null;
}

export function getUserById(id) {
  return mapUser(db().prepare('SELECT * FROM users WHERE id = ?').get(id));
}

export function createUser({ fullName, email, phoneNumber, passwordHash, role = 'customer' }) {
  const info = db().prepare(`INSERT INTO users
    (full_name, email, phone_number, birthday, password_hash, role, status, created_at)
    VALUES (?, ?, ?, NULL, ?, ?, 'active', ?)`)
    .run(fullName, email.trim(), phoneNumber || '', passwordHash, role,
      new Date().toISOString().slice(0, 19));
  return getUserById(Number(info.lastInsertRowid));
}
export function updateUserProfile(id, { fullName, phoneNumber, email, birthday }) {
  db().prepare(`UPDATE users SET full_name = ?, phone_number = ?, email = ?, birthday = ? WHERE id = ?`)
    .run(fullName, phoneNumber, email, birthday || null, id);
}

export function updateUserPassword(id, passwordHash) {
  db().prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(passwordHash, id);
}

export function listUsers() {
  return db().prepare('SELECT * FROM users ORDER BY id').all().map(mapUser);
}

export function setUserStatus(id, status) {
  db().prepare('UPDATE users SET status = ? WHERE id = ?').run(status, id);
}

export function setUserRole(id, role) {
  db().prepare('UPDATE users SET role = ? WHERE id = ?').run(role, id);
}

export function deleteUser(id) {
  db().prepare('DELETE FROM users WHERE id = ?').run(id);
}

export { mapUser };

/* ----------------------------------------------------------------- sessions */

export function createSession(token, userId, expiresAt) {
  db().prepare('INSERT INTO sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)')
    .run(token, userId, new Date().toISOString(), expiresAt);
}

/** Trả về user nếu phiên còn hạn, ngược lại null (và xoá phiên hết hạn). */
export function getSessionUser(token) {
  if (!token) return null;
  const row = db().prepare('SELECT * FROM sessions WHERE token = ?').get(token);
  if (!row) return null;

  if (new Date(row.expires_at).getTime() < Date.now()) {
    db().prepare('DELETE FROM sessions WHERE token = ?').run(token);
    return null;
  }

  const user = getUserById(row.user_id);
  if (!user || user.status !== 'active') return null;
  return user;
}

export function deleteSession(token) {
  if (token) db().prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

export function purgeExpiredSessions() {
  db().prepare('DELETE FROM sessions WHERE expires_at < ?').run(new Date().toISOString());
}

/* -------------------------------------------------------------------- carts */

function findOrCreateCart({ userId, sessionKey }) {
  const d = db();
  let row = userId
    ? d.prepare('SELECT * FROM carts WHERE user_id = ?').get(userId)
    : d.prepare('SELECT * FROM carts WHERE session_key = ? AND user_id IS NULL').get(sessionKey);

  if (row) return row;

  const now = new Date().toISOString();
  const info = d.prepare('INSERT INTO carts (user_id, session_key, created_at, updated_at) VALUES (?, ?, ?, ?)')
    .run(userId || null, userId ? null : sessionKey, now, now);
  return d.prepare('SELECT * FROM carts WHERE id = ?').get(Number(info.lastInsertRowid));
}

export function getCart({ userId, sessionKey }) {
  const cart = findOrCreateCart({ userId, sessionKey });
  const items = db().prepare(`
    SELECT ci.id, ci.product_id, ci.variant_id, ci.quantity,
           p.name, p.slug, p.price, p.original_price, p.image_url, p.brand, p.total_stock,
           v.name AS variant_name, v.price AS variant_price
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    LEFT JOIN product_variants v ON v.id = ci.variant_id
    WHERE ci.cart_id = ?
    ORDER BY ci.id`).all(cart.id);

  const mapped = items.map((r) => {
    const unitPrice = r.variant_price ?? r.price;
    return {
      id: r.id,
      productId: r.product_id,
      variantId: r.variant_id,
      quantity: r.quantity,
      name: r.name,
      slug: r.slug,
      brand: r.brand,
      imageUrl: r.image_url,
      variantName: r.variant_name,
      unitPrice,
      originalPrice: r.original_price,
      lineTotal: unitPrice * r.quantity,
      totalStock: r.total_stock,
    };
  });

  const subtotal = mapped.reduce((sum, it) => sum + it.lineTotal, 0);
  const count = mapped.reduce((sum, it) => sum + it.quantity, 0);

  return { id: cart.id, items: mapped, subtotal, count };
}

export function addCartItem({ userId, sessionKey, productId, variantId = null, quantity = 1 }) {
  const cart = findOrCreateCart({ userId, sessionKey });
  const d = db();

  const existing = d.prepare(`SELECT * FROM cart_items
    WHERE cart_id = ? AND product_id = ? AND (variant_id IS ? OR variant_id = ?)`)
    .get(cart.id, productId, variantId, variantId);

  if (existing) {
    d.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?')
      .run(quantity, existing.id);
  } else {
    d.prepare('INSERT INTO cart_items (cart_id, product_id, variant_id, quantity) VALUES (?, ?, ?, ?)')
      .run(cart.id, productId, variantId, quantity);
  }

  d.prepare('UPDATE carts SET updated_at = ? WHERE id = ?').run(new Date().toISOString(), cart.id);
  return getCart({ userId, sessionKey });
}

export function updateCartItem({ userId, sessionKey, itemId, quantity }) {
  const cart = findOrCreateCart({ userId, sessionKey });
  const d = db();

  if (quantity <= 0) {
    d.prepare('DELETE FROM cart_items WHERE id = ? AND cart_id = ?').run(itemId, cart.id);
  } else {
    d.prepare('UPDATE cart_items SET quantity = ? WHERE id = ? AND cart_id = ?')
      .run(quantity, itemId, cart.id);
  }

  d.prepare('UPDATE carts SET updated_at = ? WHERE id = ?').run(new Date().toISOString(), cart.id);
  return getCart({ userId, sessionKey });
}

export function removeCartItem({ userId, sessionKey, itemId }) {
  return updateCartItem({ userId, sessionKey, itemId, quantity: 0 });
}

export function clearCart({ userId, sessionKey }) {
  const cart = findOrCreateCart({ userId, sessionKey });
  db().prepare('DELETE FROM cart_items WHERE cart_id = ?').run(cart.id);
  return getCart({ userId, sessionKey });
}

/** Gộp giỏ khách (theo session) vào giỏ tài khoản sau khi đăng nhập. */
export function mergeGuestCart(sessionKey, userId) {
  if (!sessionKey || !userId) return;
  const d = db();
  const guest = d.prepare('SELECT * FROM carts WHERE session_key = ? AND user_id IS NULL').get(sessionKey);
  if (!guest) return;

  const target = findOrCreateCart({ userId, sessionKey: null });
  const items = d.prepare('SELECT * FROM cart_items WHERE cart_id = ?').all(guest.id);

  for (const it of items) {
    const existing = d.prepare(`SELECT * FROM cart_items
      WHERE cart_id = ? AND product_id = ? AND (variant_id IS ? OR variant_id = ?)`)
      .get(target.id, it.product_id, it.variant_id, it.variant_id);

    if (existing) {
      d.prepare('UPDATE cart_items SET quantity = quantity + ? WHERE id = ?')
        .run(it.quantity, existing.id);
    } else {
      d.prepare('INSERT INTO cart_items (cart_id, product_id, variant_id, quantity) VALUES (?, ?, ?, ?)')
        .run(target.id, it.product_id, it.variant_id, it.quantity);
    }
  }

  d.prepare('DELETE FROM carts WHERE id = ?').run(guest.id);
}

/* ----------------------------------------------------------------- wishlist */

export function getWishlist(userId) {
  if (!userId) return [];
  return db().prepare(`
    SELECT p.* FROM wishlist w
    JOIN products p ON p.id = w.product_id
    WHERE w.user_id = ?
    ORDER BY w.created_at DESC`).all(userId).map(mapProduct);
}

export function toggleWishlist(userId, productId) {
  const d = db();
  const existing = d.prepare('SELECT 1 AS x FROM wishlist WHERE user_id = ? AND product_id = ?')
    .get(userId, productId);

  if (existing) {
    d.prepare('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?').run(userId, productId);
    return { added: false };
  }

  d.prepare('INSERT INTO wishlist (user_id, product_id, created_at) VALUES (?, ?, ?)')
    .run(userId, productId, new Date().toISOString());
  return { added: true };
}

export function isInWishlist(userId, productId) {
  if (!userId) return false;
  return !!db().prepare('SELECT 1 AS x FROM wishlist WHERE user_id = ? AND product_id = ?')
    .get(userId, productId);
}

/* ------------------------------------------------------------------ reviews */

export function addReview({ productId, userId, authorName, rating, comment }) {
  const d = db();
  d.prepare(`INSERT INTO product_reviews
    (product_id, user_id, author_name, rating, date, comment, is_verified_purchase, status)
    VALUES (?, ?, ?, ?, ?, ?, 1, 'pending')`)
    .run(productId, userId || null, authorName, rating, new Date().toISOString().slice(0, 10), comment);

  // Cập nhật điểm trung bình + số lượng đánh giá đã duyệt
  recalcProductRating(productId);
}

export function recalcProductRating(productId) {
  const d = db();
  const agg = d.prepare(`SELECT COUNT(*) AS n, AVG(rating) AS avg
    FROM product_reviews WHERE product_id = ? AND status = 'approved'`).get(productId);

  d.prepare('UPDATE products SET review_count = ?, rating = ? WHERE id = ?')
    .run(agg.n || 0, agg.avg ? Math.round(agg.avg * 10) / 10 : 0, productId);
}

export function listReviews({ status = null } = {}) {
  const where = status ? 'WHERE r.status = ?' : '';
  const params = status ? [status] : [];
  return db().prepare(`
    SELECT r.*, p.name AS product_name, p.slug AS product_slug
    FROM product_reviews r
    JOIN products p ON p.id = r.product_id
    ${where}
    ORDER BY r.date DESC, r.id DESC`).all(...params).map((r) => ({
    id: r.id,
    productId: r.product_id,
    productName: r.product_name,
    productSlug: r.product_slug,
    authorName: r.author_name,
    rating: r.rating,
    date: r.date,
    comment: r.comment,
    isVerifiedPurchase: !!r.is_verified_purchase,
    status: r.status,
  }));
}

export function setReviewStatus(id, status) {
  const d = db();
  const row = d.prepare('SELECT product_id FROM product_reviews WHERE id = ?').get(id);
  d.prepare('UPDATE product_reviews SET status = ? WHERE id = ?').run(status, id);
  if (row) recalcProductRating(row.product_id);
}

export function deleteReview(id) {
  const d = db();
  const row = d.prepare('SELECT product_id FROM product_reviews WHERE id = ?').get(id);
  d.prepare('DELETE FROM product_reviews WHERE id = ?').run(id);
  if (row) recalcProductRating(row.product_id);
}

/* -------------------------------------------------------- contact messages */

export function createContactMessage({ fullName, email, phone, message }) {
  db().prepare(`INSERT INTO contact_messages (full_name, email, phone, message, status, created_at)
    VALUES (?, ?, ?, ?, 'new', ?)`)
    .run(fullName, email, phone || null, message, new Date().toISOString().slice(0, 19));
}

export function listContactMessages() {
  return db().prepare('SELECT * FROM contact_messages ORDER BY id DESC').all().map((r) => ({
    id: r.id,
    fullName: r.full_name,
    email: r.email,
    phone: r.phone,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
  }));
}

export function setContactStatus(id, status) {
  db().prepare('UPDATE contact_messages SET status = ? WHERE id = ?').run(status, id);
}

/* ----------------------------------------------------------------- settings */

export function getSettings() {
  const out = { ...DEFAULT_SETTINGS_FALLBACK };
  for (const row of db().prepare('SELECT key, value FROM settings').all()) {
    out[row.key] = row.value;
  }
  return out;
}

export function getSetting(key, fallback = '') {
  const row = db().prepare('SELECT value FROM settings WHERE key = ?').get(key);
  return row ? row.value : fallback;
}

export function saveSettings(values) {
  const stmt = db().prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
  for (const [key, value] of Object.entries(values)) stmt.run(key, String(value ?? ''));
}

const DEFAULT_SETTINGS_FALLBACK = {
  brand_name: 'CutTayShop',
  hotline: '1900 8888',
  support_email: 'cskh@cuttayshop.vn',
  default_shipping_fee: '30000',
  freeship_threshold: '250000',
  warehouse_address: '',
  maintenance_mode: '0',
};

/* ---------------------------------------------------------------- audit log */

export function logAudit({ userId, action, entity, entityId, detail }) {
  db().prepare(`INSERT INTO audit_log (user_id, action, entity, entity_id, detail, created_at)
    VALUES (?, ?, ?, ?, ?, ?)`)
    .run(userId || null, action, entity || null, entityId != null ? String(entityId) : null,
      detail || null, new Date().toISOString().slice(0, 19));
}

export function listAuditLog(limit = 100) {
  return db().prepare('SELECT * FROM audit_log ORDER BY id DESC LIMIT ?').all(limit).map((r) => ({
    id: r.id,
    userId: r.user_id,
    action: r.action,
    entity: r.entity,
    entityId: r.entity_id,
    detail: r.detail,
    createdAt: r.created_at,
  }));
}

/* ==========================================================================
   CRUD QUẢN TRỊ
   ========================================================================== */

/* ---------------------------------------------------------------- products */

function slugify(text) {
  return removeDiacritics(String(text || ''))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function uniqueSlug(table, base, excludeId = null) {
  const d = db();
  let slug = base || 'item';
  let n = 1;
  for (;;) {
    const row = excludeId
      ? d.prepare(`SELECT id FROM ${table} WHERE slug = ? AND id <> ?`).get(slug, excludeId)
      : d.prepare(`SELECT id FROM ${table} WHERE slug = ?`).get(slug);
    if (!row) return slug;
    slug = `${base}-${++n}`;
  }
}

export function createProduct(input) {
  const d = db();
  const category = getCategoryBySlug(input.categorySlug);
  const slug = uniqueSlug('products', slugify(input.name));

  const info = d.prepare(`INSERT INTO products
    (name, slug, short_description, description, price, original_price, rating, review_count,
     image_url, secondary_image_url, brand, category_slug, category_name, badge_text,
     in_stock, is_hot_deal, is_featured, is_new_arrival, sold_count, total_stock, search_text)
    VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, '', ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)`)
    .run(
      input.name, slug, input.shortDescription || '', input.description || '',
      Number(input.price) || 0, Number(input.originalPrice) || 0,
      input.imageUrl || '/images/products/placeholder.svg',
      input.brand || '', input.categorySlug || '', category ? category.name : '',
      input.badgeText || null,
      input.inStock === false ? 0 : 1,
      input.isHotDeal ? 1 : 0,
      input.isFeatured ? 1 : 0,
      input.isNewArrival ? 1 : 0,
      Number(input.totalStock) || 0,
      buildSearchText({
        Name: input.name,
        CategoryName: category ? category.name : '',
        ShortDescription: input.shortDescription,
        Brand: input.brand,
      }),
    );

  return getProductById(Number(info.lastInsertRowid));
}

export function updateProduct(id, input) {
  const d = db();
  const current = d.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!current) return null;

  const category = getCategoryBySlug(input.categorySlug);
  const slug = input.name && input.name !== current.name
    ? uniqueSlug('products', slugify(input.name), id)
    : current.slug;

  d.prepare(`UPDATE products SET
      name = ?, slug = ?, short_description = ?, description = ?, price = ?, original_price = ?,
      image_url = ?, brand = ?, category_slug = ?, category_name = ?, badge_text = ?,
      in_stock = ?, is_hot_deal = ?, is_featured = ?, is_new_arrival = ?, total_stock = ?, search_text = ?
    WHERE id = ?`)
    .run(
      input.name, slug, input.shortDescription || '', input.description || '',
      Number(input.price) || 0, Number(input.originalPrice) || 0,
      input.imageUrl || current.image_url, input.brand || '',
      input.categorySlug || '', category ? category.name : '',
      input.badgeText || null,
      input.inStock === false ? 0 : 1,
      input.isHotDeal ? 1 : 0,
      input.isFeatured ? 1 : 0,
      input.isNewArrival ? 1 : 0,
      Number(input.totalStock) || 0,
      buildSearchText({
        Name: input.name,
        CategoryName: category ? category.name : '',
        ShortDescription: input.shortDescription,
        Brand: input.brand,
      }),
      id,
    );

  return getProductById(id);
}

export function deleteProduct(id) {
  db().prepare('DELETE FROM products WHERE id = ?').run(id);
}

export function adjustStock(id, delta) {
  db().prepare('UPDATE products SET total_stock = MAX(0, total_stock + ?) WHERE id = ?')
    .run(Number(delta) || 0, id);
  return getProductById(id);
}

/* -------------------------------------------------------------- categories */

export function createCategory(input) {
  const d = db();
  const slug = uniqueSlug('categories', slugify(input.name));
  const info = d.prepare(`INSERT INTO categories
    (name, slug, icon_svg, bg_color_hex, icon_color_hex, product_count, sort_order, image_url)
    VALUES (?, ?, ?, ?, ?, 0, ?, ?)`)
    .run(input.name, slug, input.iconSvg || '', input.bgColorHex || '#E0F2FE',
      input.iconColorHex || '#0284C7', Number(input.sortOrder) || 0, input.imageUrl || '');
  return getCategoryBySlug(slug) || { id: Number(info.lastInsertRowid) };
}

export function updateCategory(id, input) {
  const d = db();
  const current = d.prepare('SELECT * FROM categories WHERE id = ?').get(id);
  if (!current) return null;

  const slug = input.name && input.name !== current.name
    ? uniqueSlug('categories', slugify(input.name), id)
    : current.slug;

  d.prepare(`UPDATE categories SET name = ?, slug = ?, icon_svg = ?, bg_color_hex = ?,
      icon_color_hex = ?, sort_order = ?, image_url = ? WHERE id = ?`)
    .run(input.name, slug, input.iconSvg ?? current.icon_svg,
      input.bgColorHex ?? current.bg_color_hex, input.iconColorHex ?? current.icon_color_hex,
      Number(input.sortOrder) || 0, input.imageUrl ?? current.image_url, id);

  // Đồng bộ tên ngành hàng trên sản phẩm
  d.prepare('UPDATE products SET category_slug = ?, category_name = ? WHERE category_slug = ?')
    .run(slug, input.name, current.slug);

  return getCategoryBySlug(slug);
}

export function deleteCategory(id) {
  const d = db();
  const row = d.prepare('SELECT slug FROM categories WHERE id = ?').get(id);
  if (!row) return false;
  const used = d.prepare('SELECT COUNT(*) AS n FROM products WHERE category_slug = ?').get(row.slug);
  if (used.n > 0) return false;
  d.prepare('DELETE FROM categories WHERE id = ?').run(id);
  return true;
}

/* ----------------------------------------------------------------- coupons */

export function createCoupon(input) {
  const d = db();
  const info = d.prepare(`INSERT INTO coupons
    (code, title, description, discount_amount, discount_percent, min_order_value, valid_until, is_active, category_limit)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(String(input.code || '').toUpperCase().trim(), input.title || '', input.description || '',
      Number(input.discountAmount) || 0,
      input.discountPercent ? Number(input.discountPercent) : null,
      Number(input.minOrderValue) || 0,
      input.validUntil || '2026-12-31',
      input.isActive === false ? 0 : 1,
      input.categoryLimit || 'Tất cả');
  return getCouponById(Number(info.lastInsertRowid));
}

export function getCouponById(id) {
  const r = db().prepare('SELECT * FROM coupons WHERE id = ?').get(id);
  return r ? mapCoupon(r) : null;
}

export function updateCoupon(id, input) {
  db().prepare(`UPDATE coupons SET code = ?, title = ?, description = ?, discount_amount = ?,
      discount_percent = ?, min_order_value = ?, valid_until = ?, is_active = ?, category_limit = ?
    WHERE id = ?`)
    .run(String(input.code || '').toUpperCase().trim(), input.title || '', input.description || '',
      Number(input.discountAmount) || 0,
      input.discountPercent ? Number(input.discountPercent) : null,
      Number(input.minOrderValue) || 0,
      input.validUntil || '2026-12-31',
      input.isActive === false ? 0 : 1,
      input.categoryLimit || 'Tất cả',
      id);
  return getCouponById(id);
}

export function deleteCoupon(id) {
  db().prepare('DELETE FROM coupons WHERE id = ?').run(id);
}

/* ------------------------------------------------------------------ orders */

const ORDER_STATUSES = ['Chờ xác nhận', 'Đang xử lý', 'Đang giao', 'Đã giao', 'Đã hủy'];

export { ORDER_STATUSES };

export function updateOrderStatus(id, status) {
  const d = db();
  const order = d.prepare('SELECT * FROM orders WHERE id = ?').get(id);
  if (!order) return null;

  d.prepare('UPDATE orders SET status = ?, updated_at = ? WHERE id = ?')
    .run(status, new Date().toISOString().slice(0, 19), id);

  // Ghi thêm bước vào lịch sử vận đơn
  const { n } = d.prepare('SELECT COUNT(*) AS n FROM order_tracking_steps WHERE order_id = ?').get(id);
  d.prepare(`INSERT INTO order_tracking_steps
    (order_id, title, description, timestamp, is_completed, is_current, sort_order)
    VALUES (?, ?, ?, ?, 1, 1, ?)`)
    .run(id, status, `Trạng thái đơn hàng được cập nhật: ${status}`,
      new Date().toISOString().slice(0, 19), n);

  d.prepare('UPDATE order_tracking_steps SET is_current = 0 WHERE order_id = ? AND sort_order < ?')
    .run(id, n);

  return getOrderById(id);
}

export function updateOrderTracking(id, trackingNumber) {
  db().prepare('UPDATE orders SET tracking_number = ? WHERE id = ?').run(trackingNumber || null, id);
  return getOrderById(id);
}

/* -------------------------------------------------------------------- blog */

export function createBlogPost(input) {
  const d = db();
  const slug = uniqueSlug('blog_posts', slugify(input.title));
  const info = d.prepare(`INSERT INTO blog_posts
    (title, slug, summary, content_html, category, category_slug, image_url, author, reading_time, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(input.title, slug, input.summary || '', input.contentHtml || '',
      input.category || '', input.categorySlug || slugify(input.category || ''),
      input.imageUrl || '/images/blog/blog-desk-setup.webp', input.author || 'Ban biên tập',
      input.readingTime || '5 phút đọc',
      input.publishedAt || new Date().toISOString().slice(0, 10));
  return getBlogPostBySlug(slug) || { id: Number(info.lastInsertRowid) };
}

export function updateBlogPost(id, input) {
  const d = db();
  const current = d.prepare('SELECT * FROM blog_posts WHERE id = ?').get(id);
  if (!current) return null;

  const slug = input.title && input.title !== current.title
    ? uniqueSlug('blog_posts', slugify(input.title), id)
    : current.slug;

  d.prepare(`UPDATE blog_posts SET title = ?, slug = ?, summary = ?, content_html = ?,
      category = ?, category_slug = ?, image_url = ?, author = ?, reading_time = ?, published_at = ?
    WHERE id = ?`)
    .run(input.title, slug, input.summary || '', input.contentHtml || '',
      input.category || '', input.categorySlug || slugify(input.category || ''),
      input.imageUrl || current.image_url, input.author || current.author,
      input.readingTime || current.reading_time,
      input.publishedAt || current.published_at, id);

  return getBlogPostBySlug(slug);
}

export function deleteBlogPost(id) {
  db().prepare('DELETE FROM blog_posts WHERE id = ?').run(id);
}

/* ----------------------------------------------------------------- banners */

export function createBanner(input) {
  const d = db();
  const info = d.prepare(`INSERT INTO promo_banners
    (category_title, promo_label, highlight_number, cta_text, cta_link, image_url, bg_color_hex, decorative_doodle_svg)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(input.categoryTitle || '', input.promoLabel || '', input.highlightNumber || '',
      input.ctaText || 'Khám phá →', input.ctaLink || '/san-pham',
      input.imageUrl || '', input.bgColorHex || '#E5F8DC', input.decorativeDoodleSvg || null);
  return Number(info.lastInsertRowid);
}

export function updateBanner(id, input) {
  db().prepare(`UPDATE promo_banners SET category_title = ?, promo_label = ?, highlight_number = ?,
      cta_text = ?, cta_link = ?, image_url = ?, bg_color_hex = ?, decorative_doodle_svg = ?
    WHERE id = ?`)
    .run(input.categoryTitle || '', input.promoLabel || '', input.highlightNumber || '',
      input.ctaText || 'Khám phá →', input.ctaLink || '/san-pham',
      input.imageUrl || '', input.bgColorHex || '#E5F8DC',
      input.decorativeDoodleSvg || null, id);
  return id;
}

export function deleteBanner(id) {
  db().prepare('DELETE FROM promo_banners WHERE id = ?').run(id);
}

/* --------------------------------------------------------------- dashboard */

export function getDashboardStats() {
  const d = db();
  const today = new Date().toISOString().slice(0, 10);

  const revenueToday = d.prepare(`SELECT COALESCE(SUM(subtotal + shipping_fee - discount), 0) AS v
    FROM orders WHERE substr(created_at, 1, 10) = ? AND status <> 'Đã hủy'`).get(today).v;

  const ordersToday = d.prepare('SELECT COUNT(*) AS n FROM orders WHERE substr(created_at, 1, 10) = ?')
    .get(today).n;

  const totalOrders = d.prepare('SELECT COUNT(*) AS n FROM orders').get().n;
  const totalCustomers = d.prepare("SELECT COUNT(*) AS n FROM users WHERE role = 'customer'").get().n;
  const lowStock = d.prepare('SELECT COUNT(*) AS n FROM products WHERE total_stock <= 10').get().n;
  const pendingReviews = d.prepare("SELECT COUNT(*) AS n FROM product_reviews WHERE status = 'pending'").get().n;
  const newMessages = d.prepare("SELECT COUNT(*) AS n FROM contact_messages WHERE status = 'new'").get().n;

  const totalRevenue = d.prepare(`SELECT COALESCE(SUM(subtotal + shipping_fee - discount), 0) AS v
    FROM orders WHERE status <> 'Đã hủy'`).get().v;

  return {
    revenueToday, ordersToday, totalOrders, totalCustomers,
    lowStock, pendingReviews, newMessages, totalRevenue,
  };
}

export function getSalesByCategory() {
  return db().prepare(`
    SELECT p.category_name AS name,
           COUNT(oi.id) AS items,
           COALESCE(SUM(oi.unit_price * oi.quantity), 0) AS revenue
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    JOIN orders o ON o.id = oi.order_id
    WHERE o.status <> 'Đã hủy'
    GROUP BY p.category_name
    ORDER BY revenue DESC`).all();
}
