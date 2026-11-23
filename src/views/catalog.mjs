/** Catalog PLP + PDP — chuyển từ Views/Catalog/{Index,Detail}.cshtml */
import { esc, n0, fixed1, dmy } from '../format.mjs';
import {
  layout, breadcrumb, productCard, emptyState, pagination, sortToolbar,
  filterSidebar, filterDrawer, ratingStars,
} from './partials.mjs';

const CATALOG_CSS = '<link rel="stylesheet" href="/css/catalog.css" />';

/** Dựng baseUrl phân trang giống khối @{ } trong Catalog/Index.cshtml. */
function buildBaseUrl(model) {
  const f = model.filter;
  const params = [];
  if (model.searchQuery) params.push(`q=${encodeURIComponent(model.searchQuery)}`);
  if (f.categorySlug) params.push(`categorySlug=${encodeURIComponent(f.categorySlug)}`);
  if (f.brand) params.push(`brand=${encodeURIComponent(f.brand)}`);
  if (f.minPrice != null && f.minPrice !== '') params.push(`minPrice=${f.minPrice}`);
  if (f.maxPrice != null && f.maxPrice !== '') params.push(`maxPrice=${f.maxPrice}`);
  if (f.minRating != null && f.minRating !== '') params.push(`minRating=${f.minRating}`);
  if (f.inStockOnly) params.push('inStockOnly=true');
  if (f.onSaleOnly) params.push('onSaleOnly=true');
  if (f.sortBy) params.push(`sortBy=${encodeURIComponent(f.sortBy)}`);

  const path = model.isSearch ? '/tim-kiem' : (model.category ? `/danh-muc/${model.category.slug}` : '/san-pham');
  return `${path}?${params.length ? `${params.join('&')}&` : ''}`;
}

export function renderCatalog(model) {
  const baseUrl = buildBaseUrl(model);
  const currentSort = model.filter.sortBy || 'popular';
  const clearUrl = model.isSearch ? '/tim-kiem' : (model.category ? `/danh-muc/${model.category.slug}` : '/san-pham');

  const bannerStyle = model.category
    ? `style="background: linear-gradient(135deg, ${esc(model.category.bgColorHex)}40 0%, var(--color-surface) 100%);"`
    : '';

  const grid = model.result.products.length
    ? `<div class="catalog-grid">
${model.result.products.map((p) => `          ${productCard(p)}`).join('\n')}
        </div>

        ${pagination({
          currentPage: model.result.currentPage,
          totalPages: model.result.totalPages,
          baseUrl,
        })}`
    : emptyState({
      title: 'Không tìm thấy sản phẩm phù hợp',
      description: 'Hãy thử điều chỉnh lại bộ lọc giá, thương hiệu hoặc tìm kiếm bằng từ khóa khác.',
      actionText: 'Xóa bộ lọc để xem tất cả',
      actionUrl: clearUrl,
    });

  const body = `${breadcrumb(model.breadcrumbs)}

<div class="container-custom">
  <header class="catalog-banner" ${bannerStyle}>
    <div>
      <h1 class="catalog-banner-title">${esc(model.title)}</h1>
      <p class="catalog-banner-desc">${esc(model.description)}</p>
    </div>
    <div class="catalog-banner-stat">
      <span>📦</span>
      <span><strong>${n0(model.result.totalItems)}</strong> sản phẩm có sẵn</span>
    </div>
  </header>

  <div class="catalog-layout">
    ${filterSidebar(model)}

    <main>
      ${sortToolbar({ totalItems: model.result.totalItems, currentSort, baseUrl })}

      ${grid}
    </main>
  </div>
</div>

${filterDrawer(model)}`;

  return layout({
    title: model.title,
    body,
    styles: CATALOG_CSS,
    scripts: '<script src="/js/catalog.js"></script>',
    active: 'catalog',
  });
}

export function renderProductDetail(model) {
  const p = model.product;
  const images = p.galleryImages && p.galleryImages.length ? p.galleryImages : [p.imageUrl];
  const mainImg = images[0];

  const galleryBadge = p.badgeText
    ? `<span class="badge-capsule badge-sale pdp-gallery-badge">${esc(p.badgeText)}</span>`
    : '';

  const thumbs = images.length > 1
    ? `<div class="pdp-gallery-thumbs" role="tablist" aria-label="Hình ảnh sản phẩm">
${images.map((img, i) => `          <button type="button" class="pdp-thumb-btn${i === 0 ? ' is-active' : ''}" data-img-src="${esc(img)}" aria-label="Xem hình ảnh ${i + 1}">
            <img src="${esc(img)}" alt="Thumbnail ${i + 1}" class="pdp-thumb-img" loading="lazy" />
          </button>`).join('\n')}
        </div>`
    : '';

  const brandTag = p.brand ? `<span class="pdp-brand-tag">${esc(p.brand)}</span>` : '';

  const priceOriginal = p.originalPrice > p.price
    ? `<span class="pdp-price-original">${n0(p.originalPrice)}₫</span>
          <span class="pdp-price-save-badge">Tiết kiệm ${p.discountPercent}%</span>`
    : '';

  const variants = p.variants && p.variants.length
    ? `<div class="pdp-option-group">
          <label class="pdp-option-label">Lựa chọn phiên bản:</label>
          <div class="pdp-variants-list" role="radiogroup">
${p.variants.map((v, i) => `            <button type="button" class="pdp-variant-pill${i === 0 ? ' is-selected' : ''}" data-variant-price="${v.price}" role="radio" aria-checked="${i === 0 ? 'true' : 'false'}">
              ${esc(v.name)}
            </button>`).join('\n')}
          </div>
        </div>`
    : '';

  const specs = p.specifications && p.specifications.length
    ? `<table class="specs-table">
          <tbody>
${p.specifications.map((s) => `            <tr>
              <td class="specs-label">${esc(s.key)}</td>
              <td>${esc(s.value)}</td>
            </tr>`).join('\n')}
          </tbody>
        </table>`
    : '<p>Thông số kỹ thuật chi tiết đang được cập nhật.</p>';

  const reviews = p.reviews && p.reviews.length
    ? `<div class="reviews-grid">
${p.reviews.map((rev) => `          <div class="review-card">
            <div class="review-header">
              <div>
                <span class="review-author">${esc(rev.authorName)}</span>
                ${rev.isVerifiedPurchase ? '<span class="review-verified">✓ Đã mua hàng</span>' : ''}
              </div>
              <span class="review-date">${dmy(rev.date)}</span>
            </div>
            ${ratingStars(rev.rating)}
            <p class="review-body">${esc(rev.comment)}</p>
          </div>`).join('\n')}
        </div>`
    : '<p>Chưa có đánh giá nào cho sản phẩm này.</p>';

  const related = model.relatedProducts && model.relatedProducts.length
    ? `<section class="products-section" aria-label="Sản phẩm tương tự">
      <div class="section-header">
        <div class="section-header-left">
          <h2 class="section-title">Sản phẩm liên quan</h2>
          <p class="section-subtitle">Có thể bạn cũng sẽ thích các sản phẩm này</p>
        </div>
      </div>
      <div class="deals-grid">
${model.relatedProducts.map((r) => `        ${productCard(r)}`).join('\n')}
      </div>
    </section>`
    : '';

  const dataAttrs = `data-product-id="${p.id}"
                data-product-name="${esc(p.name)}"
                data-product-price="${p.price}"
                data-product-image="${esc(p.imageUrl)}"
                data-product-slug="${esc(p.slug)}"`;

  const body = `${breadcrumb(model.breadcrumbs)}

<div class="container-custom pdp-main-section">
  <div class="pdp-grid">
    <div class="pdp-gallery-wrap">
      <div class="pdp-gallery-main">
        ${galleryBadge}
        <img src="${esc(mainImg)}" alt="${esc(p.name)}" class="pdp-gallery-main-img" width="500" height="500" />
      </div>

      ${thumbs}
    </div>

    <div class="pdp-info-wrap">
      ${brandTag}

      <h1 class="pdp-product-title">${esc(p.name)}</h1>

      <div class="pdp-rating-strip">
        <div style="display: flex; align-items: center; gap: 6px;">
          ${ratingStars(p.rating)}
          <span style="font-weight: 700; color: var(--color-text-primary);">${fixed1(p.rating)}</span>
          <span style="color: var(--color-text-muted);">(${n0(p.reviewCount)} đánh giá)</span>
        </div>
        <span style="color: var(--color-border-strong);">|</span>
        <div class="pdp-stock-status">
          <span class="pdp-stock-dot"></span>
          <span>${p.inStock ? 'Còn hàng trong kho' : 'Tạm hết hàng'}</span>
        </div>
      </div>

      <div class="pdp-price-box">
        <span class="pdp-price-current">${n0(p.price)}₫</span>
        ${priceOriginal}
      </div>

      <p style="font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.6;">
        ${esc(p.shortDescription)}
      </p>

      ${variants}

      <div class="pdp-action-group">
        <div class="quantity-stepper" aria-label="Bộ chọn số lượng">
          <button type="button" class="stepper-btn" data-stepper-minus aria-label="Giảm số lượng">-</button>
          <input type="number" class="stepper-input" data-stepper-input value="1" min="1" max="99" aria-label="Số lượng" />
          <button type="button" class="stepper-btn" data-stepper-plus aria-label="Tăng số lượng">+</button>
        </div>

        <button type="button" class="btn-pill btn-pill-secondary btn-pill-lg"
                data-pdp-add-cart
                ${dataAttrs}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>Thêm vào giỏ hàng</span>
        </button>

        <button type="button" class="btn-pill btn-pill-primary btn-pill-lg"
                data-pdp-buy-now
                ${dataAttrs}>
          <span>Mua ngay</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div class="pdp-commitments">
        <div class="pdp-commitment-item">
          <span style="color: var(--color-primary); font-size: 1.125rem;">⚡</span>
          <span>Giao nhanh tiêu chuẩn toàn quốc</span>
        </div>
        <div class="pdp-commitment-item">
          <span style="color: var(--color-primary); font-size: 1.125rem;">🛡️</span>
          <span>Cam kết hàng chính hãng 100%</span>
        </div>
        <div class="pdp-commitment-item">
          <span style="color: var(--color-primary); font-size: 1.125rem;">🔄</span>
          <span>Đổi trả miễn phí trong 7 ngày</span>
        </div>
        <div class="pdp-commitment-item">
          <span style="color: var(--color-primary); font-size: 1.125rem;">🎁</span>
          <span>Đóng gói cẩn thận, bảo hành uy tín</span>
        </div>
      </div>
    </div>
  </div>

  <div class="pdp-tabs-wrap">
    <div class="pdp-tabs-nav" role="tablist">
      <button type="button" class="pdp-tab-trigger is-active" data-tab-target="tab-desc" role="tab" aria-selected="true">Mô tả sản phẩm</button>
      <button type="button" class="pdp-tab-trigger" data-tab-target="tab-specs" role="tab" aria-selected="false">Thông số kỹ thuật</button>
      <button type="button" class="pdp-tab-trigger" data-tab-target="tab-reviews" role="tab" aria-selected="false">Đánh giá (${p.reviews && p.reviews.length ? p.reviews.length : p.reviewCount})</button>
    </div>

    <div id="tab-desc" class="pdp-tab-content is-active" role="tabpanel">
      <div style="max-width: 840px;">
        <p style="margin-bottom: 16px;">${esc(p.description)}</p>
        <p style="margin-bottom: 16px;">
          Sản phẩm được gia công và hoàn thiện với tiêu chuẩn khắt khe, mang lại trải nghiệm tối ưu cho nhu cầu sử dụng hàng ngày và thể hiện cá tính riêng biệt.
        </p>
        <h4 style="font-size: 1.125rem; font-weight: 700; color: var(--color-text-primary); margin: 24px 0 12px;">Đặc điểm nổi bật:</h4>
        <ul style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px;">
          <li>Thiết kế hiện đại, phối màu pastel tinh tế theo xu hướng 2026.</li>
          <li>Chất lượng hoàn thiện cao cấp, bền bỉ theo thời gian.</li>
          <li>Tối ưu công thái học, đem lại cảm giác thoải mái tối đa khi sử dụng.</li>
        </ul>
      </div>
    </div>

    <div id="tab-specs" class="pdp-tab-content" role="tabpanel">
      ${specs}
    </div>

    <div id="tab-reviews" class="pdp-tab-content" role="tabpanel">
      ${reviews}
    </div>
  </div>

  ${related}
</div>

<div class="pdp-mobile-sticky-bar">
  <div>
    <div style="font-size: 0.75rem; color: var(--color-text-muted);">Giá sản phẩm</div>
    <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-sale);">${n0(p.price)}₫</div>
  </div>
  <button type="button" class="btn-pill btn-pill-primary"
          data-pdp-add-cart
          ${dataAttrs}>
    <span>Thêm vào giỏ</span>
    <span aria-hidden="true">→</span>
  </button>
</div>`;

  return layout({
    title: p.name,
    body,
    styles: CATALOG_CSS,
    scripts: '<script src="/js/catalog.js"></script>',
  });
}
