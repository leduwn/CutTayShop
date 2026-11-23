/** Trang chủ — chuyển từ Views/Home/Index.cshtml */
import { esc, n0, isoRoundTrip } from '../format.mjs';
import { layout, productCard } from './partials.mjs';

export function renderHome(model) {
  const countdownEnd = isoRoundTrip(model.dealCountdown.endTime);

  const banners = model.promoBanners.map((banner) => `
          <aside class="promo-banner-card promo-card-${banner.id} promo-banner-${banner.id}" style="--banner-accent-bg: ${esc(banner.bgColorHex)}; background-color: ${esc(banner.bgColorHex)};">
            <div class="promo-banner-info">
              <span class="promo-banner-category">${esc(banner.categoryTitle)}</span>
              <div class="promo-banner-headline">
                <div class="promo-banner-label">${esc(banner.promoLabel)}</div>
                <div class="promo-banner-number">${esc(banner.highlightNumber)}</div>
              </div>
              <a href="${esc(banner.ctaLink)}" class="promo-banner-cta">
                <span>${esc(banner.ctaText)}</span>
              </a>
            </div>
            <div class="promo-banner-visual promo-banner-img-wrap">
              <img src="${esc(banner.imageUrl)}" alt="${esc(banner.categoryTitle)}" class="promo-banner-img" loading="eager" width="130" height="130" />
              ${banner.decorativeDoodleSvg ? `<div class="promo-banner-doodle" aria-hidden="true">${banner.decorativeDoodleSvg}</div>` : ''}
            </div>
          </aside>`).join('');

  const categories = model.categories.map((cat) => `
        <div class="category-item-wrap" role="listitem">
          <a href="/danh-muc/${esc(cat.slug)}" class="category-item" title="${esc(cat.name)}">
            <div class="category-circle" style="background-color: ${esc(cat.bgColorHex)}; color: ${esc(cat.iconColorHex)};">
              ${cat.iconSvg}
            </div>
            <span class="category-name">${esc(cat.name)}</span>
            <span class="category-count">${cat.productCount} sản phẩm</span>
          </a>
        </div>`).join('\n');

  const trust = model.trustBenefits.map((b) => `
        <div class="trust-item">
          <div class="trust-icon-box">
            ${b.iconSvg}
          </div>
          <div>
            <div class="trust-title">${esc(b.title)}</div>
            <div class="trust-subtitle">${esc(b.subtitle)}</div>
          </div>
        </div>`).join('\n');

  const body = `<!-- =====================================================================
     1. HERO 8/4 (EDITORIAL + STILL-LIFE COMPOSITION)
     ===================================================================== -->
<section class="hero-section" aria-label="Khu vực nổi bật">
  <div class="container-custom">
    <div class="hero-grid">
      <article class="hero-main-card">
        <div class="hero-main-inner">
          <div class="hero-content-col">
            <div class="hero-kicker hero-tag">
              <span class="hero-kicker-pill badge-capsule badge-mint">
                <span class="kicker-sparkle kicker-sparkles" aria-hidden="true">✨</span>
                <span class="kicker-text">Sống chất mỗi ngày</span>
              </span>
              <svg class="hero-sunburst-doodle" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
                <path d="M12 2 V6 M12 18 V22 M2 12 H6 M18 12 H22 M4.93 4.93 L7.76 7.76 M16.24 16.24 L19.07 19.07 M4.93 19.07 L7.76 16.24 M16.24 7.76 L19.07 4.93" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" />
              </svg>
            </div>

            <h1 class="hero-headline">
              Sản phẩm<br />
              bạn thích<br />
              <span class="hero-highlight-wrap">
                <span class="highlight-capsule">ở ngay đây</span>
                <svg class="hero-curly-arrow doodle-mint-arrow" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <path d="M 6 36 C 14 42, 28 44, 34 34 C 38 26, 32 16, 22 18 C 14 20, 14 30, 24 33 C 32 35, 40 28, 42 14" stroke="#10B981" stroke-width="3" stroke-linecap="round" fill="none" />
                  <path d="M 34 14 L 42 12 L 44 22" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none" />
                </svg>
              </span>
            </h1>

            <p class="hero-commitments hero-value-props">
              <span>Hàng chính hãng</span>
              <span class="vprop-dot" aria-hidden="true">•</span>
              <span>Giao nhanh toàn quốc</span>
              <span class="vprop-dot" aria-hidden="true">•</span>
              <span>Đổi trả dễ dàng</span>
            </p>

            <div class="hero-actions">
              <a href="/san-pham" class="btn-pill btn-pill-primary hero-btn-primary btn-pill-lg">
                <span>Mua ngay</span>
                <span class="btn-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#hot-deals" class="btn-pill btn-pill-secondary hero-btn-secondary btn-pill-lg">
                <span class="btn-play-icon" aria-hidden="true">
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" stroke-width="1.8" />
                    <polygon points="8,6 15,10 8,14" fill="currentColor" />
                  </svg>
                </span>
                <span>Xem ưu đãi</span>
              </a>
              <div class="hero-social-proof">
                <span class="proof-stars" aria-hidden="true">⭐⭐⭐⭐⭐</span>
                <span class="proof-text"><strong>4.9/5</strong> (10.000+ đánh giá)</span>
              </div>
            </div>
          </div>

          <div class="hero-stage-col">
            <div class="hero-product-stage" aria-label="Bố cục trưng bày phong cách sống CutTayShop">
              <div class="hero-stage-ambient" aria-hidden="true"></div>

              <div class="hero-stage-layer hero-layer-podium" aria-hidden="true">
                <img src="/images/compositions/hero/display-blocks.svg" alt="" class="hero-prop-img podium-svg" width="500" height="400" />
              </div>

              <div class="hero-stage-layer hero-layer-plant" aria-hidden="true">
                <img src="/images/compositions/hero/plant-cutout.webp" alt="Cây bạch đàn trang trí góc làm việc" class="hero-prop-img plant-img" width="892" height="700" loading="eager" />
              </div>

              <div class="hero-stage-layer hero-layer-speaker">
                <div class="prop-contact-shadow speaker-shadow" aria-hidden="true"></div>
                <img src="/images/compositions/hero/speaker-cutout.webp" alt="Loa Bluetooth vải dệt hiện đại" class="hero-prop-img speaker-img" width="390" height="700" loading="eager" />
              </div>

              <div class="hero-stage-layer hero-layer-headphones">
                <div class="prop-contact-shadow headphones-shadow" aria-hidden="true"></div>
                <img src="/images/compositions/hero/headphones-cutout.webp" alt="Tai nghe chụp tai AirPods Max Bạc Ánh Kim" class="hero-prop-img headphones-img" width="691" height="659" fetchpriority="high" loading="eager" />
              </div>

              <div class="hero-stage-layer hero-layer-bottle">
                <div class="prop-contact-shadow bottle-shadow" aria-hidden="true"></div>
                <img src="/images/compositions/hero/bottle-cutout.webp" alt="Bình giữ nhiệt kim loại cao cấp" class="hero-prop-img bottle-img" width="363" height="1124" loading="eager" />
              </div>

              <div class="hero-stage-layer hero-layer-callout" aria-hidden="true">
                <div class="hero-callout-bubble">
                  <div class="callout-star-wrap">
                    <img src="/images/compositions/hero/decorative-star.svg" alt="" class="callout-star-icon" width="28" height="28" />
                  </div>
                  <p class="callout-text">Những điều<br>tốt đẹp hơn<br>cho cuộc sống<br>của bạn ♡</p>
                  <img src="/images/compositions/hero/decorative-arrow.svg" alt="" class="callout-arrow-icon" width="56" height="56" />
                </div>
              </div>

              <div class="hero-stage-layer hero-layer-sticker" aria-hidden="true">
                <img src="/images/compositions/hero/paper-sticker.svg" alt="Good Products Brighter Days" class="hero-prop-img sticker-img" width="220" height="210" />
              </div>
            </div>
          </div>
        </div>
      </article>

      <div class="hero-side-col">${banners}
      </div>
    </div>
  </div>
</section>

<!-- =====================================================================
     2. DANH MỤC
     ===================================================================== -->
<section class="categories-section" aria-label="Danh mục ngành hàng">
  <div class="container-custom">
    <div class="section-header">
      <div class="section-header-left">
        <h2 class="section-title">Danh mục nổi bật</h2>
        <p class="section-subtitle">Khám phá các bộ sưu tập được yêu thích nhất</p>
      </div>
      <a href="/danh-muc" class="section-view-all">
        <span>Xem tất cả danh mục</span>
        <span>→</span>
      </a>
    </div>

    <div class="category-grid" role="list">
${categories}
    </div>
  </div>
</section>

<!-- =====================================================================
     3. CAM KẾT DỊCH VỤ
     ===================================================================== -->
<section class="trust-section" aria-label="Cam kết dịch vụ">
  <div class="container-custom">
    <div class="trust-grid">
${trust}
    </div>
  </div>
</section>

<!-- =====================================================================
     4. FLASH SALE
     ===================================================================== -->
<section id="hot-deals" class="deals-section" aria-label="Flash Sale giảm sốc">
  <div class="container-custom">
    <div class="section-header">
      <div class="section-header-left">
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <h2 class="section-title">⚡ Deal Hot Hôm Nay</h2>
          <div class="countdown-clock" data-countdown-end="${esc(countdownEnd)}">
            <span class="countdown-box" data-hours>23</span>
            <span class="countdown-divider">:</span>
            <span class="countdown-box" data-mins>59</span>
            <span class="countdown-divider">:</span>
            <span class="countdown-box" data-secs>59</span>
          </div>
        </div>
        <p class="section-subtitle">${esc(model.dealCountdown.subtitle)}</p>
      </div>
      <a href="/deals" class="section-view-all">
        <span>Xem tất cả deal</span>
        <span>→</span>
      </a>
    </div>

    <div class="deals-grid">
${model.hotDeals.map((p) => `      ${productCard(p)}`).join('\n')}
    </div>
  </div>
</section>

<!-- =====================================================================
     5. SẢN PHẨM NỔI BẬT
     ===================================================================== -->
<section id="featured" class="products-section" aria-label="Sản phẩm nổi bật">
  <div class="container-custom">
    <div class="section-header">
      <div class="section-header-left">
        <h2 class="section-title">Sản phẩm nổi bật</h2>
        <p class="section-subtitle">Được người mua đánh giá cao nhất trong tháng này</p>
      </div>
      <a href="/san-pham" class="section-view-all">
        <span>Xem tất cả</span>
        <span>→</span>
      </a>
    </div>

    <div class="deals-grid">
${model.featuredProducts.map((p) => `      ${productCard(p)}`).join('\n')}
    </div>
  </div>
</section>

<!-- =====================================================================
     6. CUTTAYSHOP+ MEMBERSHIP
     ===================================================================== -->
<section class="container-custom" aria-label="Gói thành viên CutTayShop+">
  <div class="membership-banner">
    <div class="membership-content">
      <div class="membership-tag">👑 CutTayShop+ Member Club</div>
      <h3 class="membership-title">Đặc quyền mua sắm không giới hạn</h3>
      <p style="font-size: 0.9375rem; color: #CBD5E1; line-height: 1.6;">
        Trở thành hội viên để tận hưởng hàng loạt ưu đãi độc quyền: tích điểm thưởng hội viên, ưu đãi giao hàng hội viên và voucher quà tặng vào ngày sinh nhật.
      </p>
      <div class="membership-perks">
        <div class="membership-perk-item">
          <span>✓</span>
          <span>Ưu đãi giao hàng hội viên</span>
        </div>
        <div class="membership-perk-item">
          <span>✓</span>
          <span>Tích điểm thưởng hội viên</span>
        </div>
        <div class="membership-perk-item">
          <span>✓</span>
          <span>Ưu tiên hỗ trợ 24/7</span>
        </div>
      </div>
    </div>
    <div>
      <a href="/tai-khoan/cuttayshop-plus" class="btn-pill btn-pill-mint btn-pill-lg">
        <span>Tham gia ngay</span>
        <span>→</span>
      </a>
    </div>
  </div>
</section>

<!-- =====================================================================
     7. HÀNG MỚI VỀ
     ===================================================================== -->
<section class="products-section" aria-label="Hàng mới về">
  <div class="container-custom">
    <div class="section-header">
      <div class="section-header-left">
        <h2 class="section-title">✨ Hàng mới về 2026</h2>
        <p class="section-subtitle">Bộ sưu tập phụ kiện và phong cách vừa cập bến</p>
      </div>
      <a href="/san-pham?sortBy=newest" class="section-view-all">
        <span>Xem tất cả</span>
        <span>→</span>
      </a>
    </div>

    <div class="deals-grid">
${model.newArrivals.map((p) => `      ${productCard(p)}`).join('\n')}
    </div>
  </div>
</section>

<!-- =====================================================================
     8. NEWSLETTER
     ===================================================================== -->
<section class="container-custom" aria-label="Đăng ký nhận tin">
  <div class="newsletter-card">
    <div>
      <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--color-text-primary); margin-bottom: 8px;">
        Nhận voucher 50.000₫ cho đơn hàng đầu tiên
      </h3>
      <p style="font-size: 0.9375rem; color: var(--color-text-muted);">
        Đăng ký email để nhận thông tin deal flash sale và sản phẩm mới nhất từ CutTayShop.
      </p>
    </div>
    <div style="flex: 1; max-width: 480px;">
      <form class="newsletter-form" id="newsletter-form" onsubmit="event.preventDefault(); const status = document.getElementById('newsletter-status'); if (status) { status.style.display = 'block'; this.reset(); }">
        <input type="email" class="newsletter-input" placeholder="Nhập địa chỉ email của bạn..." required aria-label="Địa chỉ email nhận khuyến mãi" />
        <button type="submit" class="btn-pill btn-pill-primary" style="flex-shrink: 0;">Đăng ký ngay</button>
      </form>
      <div id="newsletter-status" style="display: none; margin-top: 10px; font-size: 0.875rem; color: var(--color-primary); font-weight: 600;" role="status" aria-live="polite">
        Cảm ơn bạn! (Đây là giao diện demo, thông tin chưa được lưu vào hệ thống)
      </div>
    </div>
  </div>
</section>`;

  return layout({ title: 'Trang chủ', body, active: 'home' });
}

/** Trang Privacy mặc định của template — giữ để khớp route. */
export function renderPrivacy() {
  return layout({
    title: 'Privacy Policy',
    body: `<div class="container-custom" style="padding: 48px 0;">
  <h1>Privacy Policy</h1>
  <p>Use this page to detail your site's privacy policy.</p>
</div>`,
  });
}
