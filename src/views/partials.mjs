/**
 * Các khối HTML dùng lại cho toàn site (thay cho Razor partials).
 */
import { esc, n0, fixed1 } from '../format.mjs';

/* ------------------------------------------------------------------- header */

export function header({ active = '' } = {}) {
  const link = (href, label, key) =>
    `<a href="${href}" class="nav-link${active === key ? ' active' : ''}">${label}</a>`;

  return `<header class="site-header">
  <div class="container-custom header-container">
    <a href="/" class="brand-logo" aria-label="CutTayShop Trang chủ">
      <span>CutTayShop</span>
      <span class="logo-dot"></span>
    </a>

    <nav class="header-nav" aria-label="Điều hướng chính">
      ${link('/', 'Trang chủ', 'home')}
      ${link('/san-pham', 'Sản phẩm', 'catalog')}
      ${link('/#hot-deals', 'Khuyến mãi', 'promo')}
      ${link('/blog', 'Blog', 'blog')}
      ${link('/lien-he', 'Liên hệ', 'contact')}
    </nav>

    <div class="header-search">
      <form class="search-pill-form" action="/tim-kiem" method="get" role="search">
        <input type="search"
               name="q"
               class="search-pill-input"
               placeholder="Tìm kiếm tai nghe, mũ lưỡi trai, đồng hồ..."
               autocomplete="off"
               aria-label="Tìm kiếm sản phẩm" />
        <button type="submit" class="search-pill-btn" aria-label="Bắt đầu tìm kiếm">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
      <div class="search-dropdown" role="region" aria-live="polite"></div>
    </div>

    <div class="header-actions">
      <button type="button" class="btn-icon" data-theme-toggle aria-label="Chuyển chế độ giao diện">
        <svg class="theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg class="theme-icon-sun" style="display: none;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      </button>

      <a href="/yeu-thich" class="btn-icon action-btn-wrap" aria-label="Danh sách yêu thích">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </a>

      <a href="/gio-hang" class="btn-icon action-btn-wrap" aria-label="Giỏ hàng">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="badge-count" data-cart-badge style="display: none;">0</span>
      </a>

      <a href="/tai-khoan" class="btn-icon" aria-label="Tài khoản cá nhân">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </a>
    </div>
  </div>
</header>`;
}

/* ------------------------------------------------------------------- footer */

export function footer() {
  return `<footer class="site-footer">
  <div class="container-custom">
    <div class="footer-grid">
      <div>
        <a href="/" class="brand-logo" style="margin-bottom: 16px;">
          <span>CutTayShop</span>
          <span class="logo-dot"></span>
        </a>
        <p style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.6; max-width: 320px; margin-bottom: 20px;">
          Nền tảng mua sắm trực tuyến phong cách trẻ, hiện đại, uy tín số 1 Việt Nam. Cam kết 100% chính hãng, giao hàng hoả tốc 2H.
        </p>
        <div style="display: flex; gap: 12px;">
          <span class="badge-capsule badge-mint">⭐ 4.9/5 Rating</span>
          <span class="badge-capsule badge-subtle">🔒 100% Bảo mật</span>
        </div>
      </div>

      <div>
        <h4 class="footer-col-title">Về CutTayShop</h4>
        <ul class="footer-nav-list">
          <li><a href="/gioi-thieu" class="footer-nav-link">Giới thiệu công ty</a></li>
          <li><a href="/tuyen-dung" class="footer-nav-link">Cơ hội việc làm</a></li>
          <li><a href="/he-thong-cua-hang" class="footer-nav-link">Hệ thống cửa hàng</a></li>
          <li><a href="/tin-tuc" class="footer-nav-link">Tin tức &amp; Khuyến mãi</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Hỗ trợ khách hàng</h4>
        <ul class="footer-nav-list">
          <li><a href="/huong-dan-mua-hang" class="footer-nav-link">Hướng dẫn mua hàng</a></li>
          <li><a href="/chinh-sach-doi-tra" class="footer-nav-link">Chính sách đổi trả 7 ngày</a></li>
          <li><a href="/chinh-sach-bao-hanh" class="footer-nav-link">Chính sách bảo hành</a></li>
          <li><a href="/phuong-thuc-thanh-toan" class="footer-nav-link">Phương thức thanh toán</a></li>
        </ul>
      </div>

      <div>
        <h4 class="footer-col-title">Kết nối với chúng tôi</h4>
        <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 12px;">
          Hotline hỗ trợ: <strong style="color: var(--color-text-primary);">1900 8888</strong> (8:00 - 22:00)
        </p>
        <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-bottom: 16px;">
          Email: <span style="color: var(--color-text-primary);">cskh@cuttayshop.vn</span>
        </p>
        <div style="display: flex; gap: 10px;">
          <div class="badge-capsule badge-subtle" style="font-size: 0.75rem;">iOS App</div>
          <div class="badge-capsule badge-subtle" style="font-size: 0.75rem;">Android App</div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div>
        © 2026 CutTayShop. Tất cả quyền được bảo lưu. Thiết kế và phát triển với Node.js + SQLite &amp; UI-First Architecture.
      </div>
      <div style="display: flex; gap: 16px;">
        <a href="/dieu-khoan" class="footer-nav-link">Điều khoản dịch vụ</a>
        <a href="/bao-mat" class="footer-nav-link">Chính sách bảo mật</a>
      </div>
    </div>
  </div>
</footer>`;
}

/* --------------------------------------------------------------- bottom nav */

export function bottomNav() {
  return `<nav class="bottom-nav" aria-label="Thanh điều hướng di động">
  <a href="/" class="bottom-nav-item active">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
    <span>Trang chủ</span>
  </a>
  <a href="/danh-muc" class="bottom-nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
    <span>Danh mục</span>
  </a>
  <a href="/deals" class="bottom-nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
    <span>Ưu đãi</span>
  </a>
  <a href="/gio-hang" class="bottom-nav-item" style="position: relative;" aria-label="Giỏ hàng">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
    <span class="badge-count" data-cart-badge style="display: none;">0</span>
    <span>Giỏ hàng</span>
  </a>
  <a href="/tai-khoan" class="bottom-nav-item">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
    <span>Tôi</span>
  </a>
</nav>`;
}

/* ------------------------------------------------------------- AI assistant */

export function aiWidget() {
  return `<div class="ai-widget-wrap">
  <div class="ai-widget-card" data-ai-card role="dialog" aria-modal="false" aria-label="Trợ lý CutTay AI (Bản thử nghiệm / Demo Preview)" aria-hidden="true">
    <div class="ai-card-header">
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 1.25rem;">✨</span>
        <div>
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-weight: 700; font-size: 0.9375rem; color: var(--color-text-primary);">CutTay AI</span>
            <span class="badge-capsule badge-mint" style="font-size: 0.625rem; padding: 2px 6px;">Bản thử nghiệm / Demo Preview</span>
          </div>
          <div style="font-size: 0.6875rem; color: var(--color-text-muted); font-weight: 500;">Minh hoạ giao diện · Chưa kết nối API AI</div>
        </div>
      </div>
      <button type="button" class="btn-icon" data-ai-close aria-label="Đóng trợ lý AI" style="width: 28px; height: 28px;">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="ai-card-body">
      <div class="ai-msg ai-msg-bot">
        Xin chào! Mình là CutTay AI. Bạn cần tìm kiếm phong cách thời trang hay thiết bị công nghệ nào hôm nay?
      </div>

      <div class="ai-quick-chips">
        <button type="button" class="ai-chip">🎧 Gợi ý tai nghe hot nhất</button>
        <button type="button" class="ai-chip">⚡ Deal flash sale hôm nay</button>
        <button type="button" class="ai-chip">🚚 Chính sách vận chuyển</button>
      </div>

      <div class="ai-support-fallback" style="margin-top: 16px; padding: 10px 12px; background: var(--color-surface-subtle); border-radius: var(--radius-sm); font-size: 0.75rem; color: var(--color-text-muted); text-align: center; border: 1px dashed var(--color-border-subtle); line-height: 1.4;">
        Hỗ trợ khách hàng: <a href="mailto:hotro@cuttayshop.vn" style="color: var(--color-primary); font-weight: 600; text-decoration: underline;">hotro@cuttayshop.vn</a> | Hotline: <strong>1900-xxxx</strong>
      </div>
    </div>

    <div class="ai-card-footer">
      <input type="text" class="ai-input" placeholder="Hỏi CutTay AI điều gì đó..." aria-label="Nhập câu hỏi cho trợ lý AI" />
      <button type="button" class="btn-pill btn-pill-primary btn-pill-sm" style="padding: 6px 12px;">Gửi</button>
    </div>
  </div>

  <button type="button" class="ai-widget-trigger" data-ai-trigger aria-label="Mở trợ lý AI CutTay">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
    <span>Hỏi CutTay AI ✨</span>
  </button>
</div>`;
}

/* ------------------------------------------------------------------ layout */

export function layout({ title, body, styles = '', scripts = '', active = '' }) {
  // Một số view đặt tiêu đề kèm hậu tố "— CutTayShop"; bỏ đi để <title> không bị lặp.
  const cleanTitle = String(title || '').replace(/\s*[—–-]\s*CutTayShop\s*$/i, '').trim();

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <meta name="theme-color" content="#FAFAF9" />
  <meta name="description" content="CutTayShop - Nền tảng mua sắm thời trang và công nghệ phong cách hàng đầu." />
  <title>${esc(cleanTitle)} - CutTayShop | Mua sắm phong cách 2026</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="/css/design-system.css" />
  <link rel="stylesheet" href="/css/tokens-compat.css" />
  <link rel="stylesheet" href="/css/motion-tokens.css" />
  <link rel="stylesheet" href="/css/homepage.css" />
  <link rel="stylesheet" href="/css/storefront-pages.css" />
  <link rel="stylesheet" href="/css/responsive-fixes.css" />
  ${styles}

  <script src="/js/theme-toggle.js"></script>
</head>
<body>
  ${header({ active })}

  <main role="main" style="flex: 1;">
    ${body}
  </main>

  ${footer()}
  ${bottomNav()}
  ${aiWidget()}

  <script src="/js/cart-state.js"></script>
  <script src="/js/cart-api.js"></script>
  <script src="/js/scroll-reveal.js"></script>
  <script src="/js/homepage-motion.js"></script>
  <script src="/js/homepage.js"></script>
  <script src="/js/store-interactions.js"></script>
  ${scripts}
</body>
</html>`;
}

/* --------------------------------------------------------------- breadcrumb */

export function breadcrumb(items) {
  if (!items || !items.length) return '';

  const lis = items.map((item, i) => {
    const isLast = i === items.length - 1;
    const inner = (!isLast && item.url)
      ? `<a href="${esc(item.url)}" class="breadcrumb-link" itemprop="item">
                <span itemprop="name">${esc(item.label)}</span>
              </a>
              <span class="breadcrumb-separator" aria-hidden="true">/</span>`
      : `<span class="breadcrumb-current" aria-current="page" itemprop="name">${esc(item.label)}</span>`;

    return `          <li class="breadcrumb-item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
            ${inner}
            <meta itemprop="position" content="${i + 1}" />
          </li>`;
  }).join('\n');

  return `<nav class="breadcrumb-nav" aria-label="Đường dẫn điều hướng">
    <div class="container-custom">
      <ol class="breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
${lis}
      </ol>
    </div>
  </nav>`;
}

/* ------------------------------------------------------------- rating stars */

export function ratingStars(value) {
  const rating = Math.max(0, Math.min(5, Number(value) || 0));
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;

  let out = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      out += `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>`;
    } else if (i === fullStars + 1 && hasHalf) {
      out += `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" opacity="0.4"></path>
        <path d="M12 2v15.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>`;
    } else {
      out += `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" opacity="0.3">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>`;
    }
  }

  return `<div class="stars-group" style="display: inline-flex; align-items: center; gap: 2px; color: var(--color-warning);" aria-label="${rating.toFixed(1)} trên 5 sao">${out}</div>`;
}

/* ------------------------------------------------------------- product card */

export function productCard(p) {
  const badge = p.badgeText
    ? `<span class="badge-capsule badge-sale product-card-badge">${esc(p.badgeText)}</span>`
    : '';

  let progress = '';
  if (p.isHotDeal && p.totalStock > 0) {
    const percent = Math.min(100, Math.round((p.soldCount / p.totalStock) * 100));
    progress = `<div class="product-card-progress" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
        <div class="product-card-progress-bar" style="width: ${percent}%;"></div>
      </div>
      <div class="product-card-sold-text">Đã bán ${p.soldCount} / ${p.totalStock}</div>`;
  }

  const original = p.originalPrice > p.price
    ? `<span class="product-card-original-price">${n0(p.originalPrice)}₫</span>`
    : '';

  return `<article class="product-card"
         data-product-id="${p.id}"
         data-product-name="${esc(p.name)}"
         data-product-slug="${esc(p.slug)}"
         data-product-price="${p.price}"
         data-product-image="${esc(p.imageUrl)}">
  <div class="product-card-thumb-wrap">
    ${badge}
    <button type="button" class="product-card-wishlist" aria-label="Thêm vào danh sách yêu thích">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    </button>
    <a href="/san-pham/${esc(p.slug)}" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
      <img src="${esc(p.imageUrl)}" alt="${esc(p.name)}" class="product-card-thumb" loading="lazy" width="260" height="260" />
    </a>
  </div>

  <div class="product-card-body">
    <div class="product-card-category">${esc(p.categoryName)}</div>
    <h3 class="product-card-name">
      <a href="/san-pham/${esc(p.slug)}">${esc(p.name)}</a>
    </h3>

    <div class="product-card-rating">
      <span class="product-card-star">★</span>
      <span style="font-weight: 700; color: var(--color-text-primary);">${fixed1(p.rating)}</span>
      <span>(${n0(p.reviewCount)})</span>
    </div>

    ${progress}

    <div class="product-card-footer">
      <div class="product-card-price-group">
        <span class="product-card-price">${n0(p.price)}₫</span>
        ${original}
      </div>

      <button type="button" class="product-card-add-btn" aria-label="Thêm ${esc(p.name)} vào giỏ hàng">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  </div>
</article>`;
}

/* -------------------------------------------------------------- empty state */

export function emptyState({ title, description, actionText, actionUrl }) {
  return `<div class="catalog-empty-state">
  <div class="empty-state-icon">
    <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  </div>
  <h3 class="empty-state-title">${esc(title)}</h3>
  <p class="empty-state-desc">${esc(description)}</p>
  <a href="${esc(actionUrl)}" class="btn-pill btn-pill-primary">
    <span>${esc(actionText)}</span>
    <span aria-hidden="true">→</span>
  </a>
</div>`;
}

/* ---------------------------------------------------------------- pagination */

export function pagination({ currentPage, totalPages, baseUrl }) {
  if (totalPages <= 1) return '';

  const prevIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>`;
  const nextIcon = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>`;

  const prev = currentPage > 1
    ? `<a href="${baseUrl}page=${currentPage - 1}" class="page-btn" aria-label="Trang trước">${prevIcon}</a>`
    : `<span class="page-btn is-disabled" aria-hidden="true">${prevIcon}</span>`;

  let numbers = '';
  for (let p = 1; p <= totalPages; p++) {
    if (p === currentPage) {
      numbers += `<span class="page-btn is-active" aria-current="page">${p}</span>`;
    } else if (p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1) {
      numbers += `<a href="${baseUrl}page=${p}" class="page-btn">${p}</a>`;
    } else if ((p === 2 && currentPage > 3) || (p === totalPages - 1 && currentPage < totalPages - 2)) {
      numbers += `<span class="page-btn is-disabled" style="border: none; background: transparent;">...</span>`;
    }
  }

  const next = currentPage < totalPages
    ? `<a href="${baseUrl}page=${currentPage + 1}" class="page-btn" aria-label="Trang tiếp theo">${nextIcon}</a>`
    : `<span class="page-btn is-disabled" aria-hidden="true">${nextIcon}</span>`;

  return `<nav class="pagination-wrap" aria-label="Phân trang sản phẩm">
    ${prev}
    ${numbers}
    ${next}
  </nav>`;
}

/* -------------------------------------------------------------- sort toolbar */

export function sortToolbar({ totalItems, currentSort, baseUrl }) {
  const opt = (value, label) =>
    `<option value="${value}"${currentSort === value ? ' selected' : ''}>${label}</option>`;

  return `<div class="catalog-toolbar">
  <div class="toolbar-left">
    <button type="button" class="mobile-filter-trigger" data-mobile-filter-trigger aria-label="Mở bộ lọc tìm kiếm">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      <span>Bộ lọc</span>
    </button>
    <span class="results-count">Hiển thị <strong>${n0(totalItems)}</strong> sản phẩm</span>
  </div>

  <div class="toolbar-right">
    <div class="sort-select-wrap">
      <label for="sort-select" style="font-weight: 600;">Sắp xếp:</label>
      <select id="sort-select" class="sort-select" data-sort-select aria-label="Chọn tiêu chí sắp xếp">
        ${opt('popular', 'Phổ biến nhất')}
        ${opt('newest', 'Mới nhất')}
        ${opt('price_asc', 'Giá: Thấp đến Cao')}
        ${opt('price_desc', 'Giá: Cao đến Thấp')}
        ${opt('rating_desc', 'Đánh giá cao nhất')}
      </select>
    </div>
  </div>
</div>`;
}

/* ------------------------------------------------------- filter sidebar/drawer */

function filterAction(model) {
  return model.isSearch
    ? '/tim-kiem'
    : (model.category ? `/danh-muc/${model.category.slug}` : '/san-pham');
}

function filterGroups(model, { inDrawer }) {
  const f = model.filter;
  const onChange = inDrawer ? '' : ' onchange="this.form.submit()"';
  const checked = (cond) => (cond ? ' checked' : '');

  const categoryBlock = model.category ? '' : `
      <div class="filter-group">
        <h4 class="filter-group-title">Danh mục</h4>
        <div class="filter-options-list">
${model.result.availableCategories.map((cat) => `          <label class="filter-checkbox-label">
            <span class="filter-checkbox-inner">
              <input type="radio" name="categorySlug" value="${esc(cat.slug)}" class="filter-checkbox-input"${checked(f.categorySlug === cat.slug)}${onChange} />
              <span>${esc(cat.name)}</span>
            </span>
            <span class="filter-count-badge">(${cat.productCount})</span>
          </label>`).join('\n')}
        </div>
      </div>`;

  const brandBlock = model.result.availableBrands.length ? `
      <div class="filter-group">
        <h4 class="filter-group-title">Thương hiệu</h4>
        <div class="filter-options-list">
${model.result.availableBrands.map((brand) => `          <label class="filter-checkbox-label">
            <span class="filter-checkbox-inner">
              <input type="radio" name="brand" value="${esc(brand)}" class="filter-checkbox-input"${checked(f.brand === brand)}${onChange} />
              <span>${esc(brand)}</span>
            </span>
          </label>`).join('\n')}
        </div>
      </div>` : '';

  return `${categoryBlock}

      <div class="filter-group">
        <h4 class="filter-group-title">Khoảng giá (₫)</h4>
        <div class="price-inputs-row">
          <input type="number" name="minPrice" class="price-input" placeholder="Từ" value="${f.minPrice ?? ''}" step="50000" min="0" aria-label="Giá tối thiểu" />
          <span style="color: var(--color-text-muted);">-</span>
          <input type="number" name="maxPrice" class="price-input" placeholder="Đến" value="${f.maxPrice ?? ''}" step="50000" min="0" aria-label="Giá tối đa" />
        </div>
        ${inDrawer ? '' : '<button type="submit" class="btn-pill btn-pill-secondary btn-pill-sm filter-apply-btn">Áp dụng giá</button>'}
      </div>

      ${brandBlock}

      <div class="filter-group">
        <h4 class="filter-group-title">Đánh giá</h4>
        <div class="filter-options-list">
${[5, 4].map((r) => `          <label class="filter-checkbox-label">
            <span class="filter-checkbox-inner">
              <input type="radio" name="minRating" value="${r}" class="filter-checkbox-input"${checked(Number(f.minRating) === r)}${onChange} />
              <span style="display: flex; align-items: center; gap: 4px;">
                <span style="color: var(--color-warning);">★</span>
                <span>Từ ${r} sao</span>
              </span>
            </span>
          </label>`).join('\n')}
        </div>
      </div>

      <div class="filter-group">
        <h4 class="filter-group-title">Tình trạng</h4>
        <div class="filter-options-list">
          <label class="filter-checkbox-label">
            <span class="filter-checkbox-inner">
              <input type="checkbox" name="inStockOnly" value="true" class="filter-checkbox-input"${f.inStockOnly ? ' checked' : ''}${onChange} />
              <span>Chỉ còn hàng</span>
            </span>
          </label>
          <label class="filter-checkbox-label">
            <span class="filter-checkbox-inner">
              <input type="checkbox" name="onSaleOnly" value="true" class="filter-checkbox-input"${f.onSaleOnly ? ' checked' : ''}${onChange} />
              <span style="color: var(--color-sale); font-weight: 600;">Đang giảm giá</span>
            </span>
          </label>
        </div>
      </div>`;
}

function hiddenFields(model) {
  const q = model.isSearch && model.searchQuery
    ? `<input type="hidden" name="q" value="${esc(model.searchQuery)}" />`
    : '';
  return `${q}
    <input type="hidden" name="sortBy" value="${esc(model.filter.sortBy)}" />`;
}

export function filterSidebar(model) {
  const action = filterAction(model);
  return `<aside class="filter-sidebar" aria-label="Bộ lọc tìm kiếm sản phẩm">
  <form method="get" action="${esc(action)}">
    ${hiddenFields(model)}

    <div class="filter-header">
      <h3 class="filter-title">Bộ lọc tìm kiếm</h3>
      <a href="${esc(action)}" class="filter-clear-btn">Xóa tất cả</a>
    </div>

    ${filterGroups(model, { inDrawer: false })}
  </form>
</aside>`;
}

export function filterDrawer(model) {
  const action = filterAction(model);
  return `<div class="filter-drawer-backdrop" data-filter-drawer role="dialog" aria-modal="true" aria-label="Bộ lọc di động">
  <div class="filter-drawer-panel">
    <div class="drawer-header">
      <h3 style="font-size: 1.125rem; font-weight: 700; color: var(--color-text-primary);">Bộ lọc sản phẩm</h3>
      <button type="button" class="btn-icon" data-filter-drawer-close aria-label="Đóng bộ lọc">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <form method="get" action="${esc(action)}" class="drawer-body">
      ${hiddenFields(model)}

      ${filterGroups(model, { inDrawer: true })}

      <div class="drawer-footer">
        <a href="${esc(action)}" class="btn-pill btn-pill-secondary" style="flex: 1; text-align: center;">Thiết lập lại</a>
        <button type="submit" class="btn-pill btn-pill-primary" style="flex: 2;">Áp dụng bộ lọc</button>
      </div>
    </form>
  </div>
</div>`;
}

/* --------------------------------------------------------------- account nav */

export function accountNav(currentAction) {
  const item = (href, action, icon, label) => {
    const isActive = Array.isArray(action) ? action.includes(currentAction) : currentAction === action;
    return `<a href="${href}" class="menu-item${isActive ? ' active' : ''}">
      <span class="icon">${icon}</span> ${label}
    </a>`;
  };

  return `<aside class="account-nav-card">
  <div class="user-summary-card">
    <div class="user-avatar-circle">NA</div>
    <div class="user-info">
      <div class="user-name">Nguyễn Văn An</div>
      <div class="user-tier-badge">👑 CutTayShop+ Vàng</div>
    </div>
  </div>

  <nav class="account-menu-nav">
    ${item('/tai-khoan', 'Index', '📊', 'Tổng quan tài khoản')}
    ${item('/tai-khoan/don-hang', ['Orders', 'OrderDetail'], '📦', 'Đơn hàng của tôi')}
    ${item('/tai-khoan/dia-chi', 'Addresses', '📍', 'Sổ địa chỉ nhận hàng')}
    ${item('/tai-khoan/ma-giam-gia', 'Vouchers', '🎟️', 'Kho voucher của tôi')}
    ${item('/tai-khoan/cuttayshop-plus', 'Loyalty', '⭐', 'Đặc quyền CutTayShop+')}
    ${item('/tai-khoan/ho-so', 'Profile', '👤', 'Hồ sơ cá nhân')}
    ${item('/tai-khoan/doi-mat-khau', 'ChangePassword', '🔒', 'Đổi mật khẩu')}
    ${item('/tai-khoan/danh-gia', 'Reviews', '✍️', 'Đánh giá sản phẩm')}
    <div class="nav-divider"></div>
    <form action="/dang-xuat" method="post" style="margin: 0;">
      <button type="submit" class="menu-item menu-item-logout" style="width: 100%; text-align: left; background: none; border: none; font: inherit; cursor: pointer;">
        <span class="icon">🚪</span> Đăng xuất
      </button>
    </form>
  </nav>
</aside>`;
}

/* ------------------------------------------------------- editorial page head */

export function pageHeaderEditorial({ badgeClass, badgeIcon, badgeText, title, subtitle, extra = '' }) {
  return `<section class="page-header-editorial">
  <div class="container-custom">
    <div class="page-header-inner">
      <div class="badge-capsule ${badgeClass}">
        <span aria-hidden="true">${badgeIcon}</span> ${esc(badgeText)}
      </div>
      <h1 class="page-title">${esc(title)}</h1>
      <p class="page-subtitle">${esc(subtitle)}</p>
      ${extra}
    </div>
  </div>
</section>`;
}

/* -------------------------------------------------------------- error pages */

export function errorPage({ emoji, badgeClass, badgeText, heading, description, actions }) {
  return `<div class="container-custom" style="padding-top: 64px; padding-bottom: 96px; text-align: center;">
  <div class="system-error-card" style="max-width: 600px; margin: 0 auto;">
    <div class="error-sticker" style="font-size: 5rem; line-height: 1; margin-bottom: 16px;">
      ${emoji}
    </div>
    <div class="badge-capsule ${badgeClass}" style="margin-bottom: 16px;">
      ${esc(badgeText)}
    </div>
    <h1 style="font-size: 2.25rem; font-weight: 800; margin-bottom: 12px; letter-spacing: -0.02em;">
      ${esc(heading)}
    </h1>
    <p style="color: var(--color-text-secondary); font-size: 1rem; line-height: 1.6; margin-bottom: 32px;">
      ${esc(description)}
    </p>

    <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
      ${actions}
    </div>
  </div>
</div>`;
}

/* --------------------------------------------------------------- alert block */

export function alert(type, message, extra = '') {
  return `<div class="alert alert-${type}" style="margin-bottom: 20px;">
        ${esc(message)}
        ${extra}
      </div>`;
}
