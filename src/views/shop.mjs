/** Giỏ hàng, thanh toán, xác nhận đơn, tra cứu vận đơn, khuyến mãi. */
import { esc, n0, vnd, dmy, dmyhm, d2, isoRoundTrip, countdownParts } from '../format.mjs';
import { layout, breadcrumb, productCard, pageHeaderEditorial, emptyState } from './partials.mjs';

/* --------------------------------------------------------------- giỏ hàng */

export function renderCart(model) {
  const suggestions = model.suggestedProducts.slice(0, 4);
  const cart = model.cart || { items: [], subtotal: 0, count: 0 };

  const itemRows = cart.items.length
    ? cart.items.map((it) => `
        <div class="cart-item-card" data-cart-item="${it.id}">
          <div class="cart-item-img-wrap">
            <img src="${esc(it.imageUrl)}" alt="${esc(it.name)}" class="cart-item-img" width="100" height="100" />
          </div>
          <div class="cart-item-info">
            <div class="cart-item-brand">${esc(it.brand || '')}</div>
            <h3 class="cart-item-title"><a href="/san-pham/${esc(it.slug)}">${esc(it.name)}</a></h3>
            ${it.variantName ? `<div class="cart-item-variant">Biến thể: ${esc(it.variantName)}</div>` : ''}
            <div class="cart-item-price-row">
              <span class="cart-item-price">${n0(it.unitPrice)} ₫</span>
              ${it.originalPrice > it.unitPrice ? `<span class="cart-item-orig-price">${n0(it.originalPrice)} ₫</span>` : ''}
            </div>
          </div>
          <div class="cart-item-actions">
            <div class="qty-stepper">
              <button type="button" class="qty-btn" data-qty-minus data-item-id="${it.id}" aria-label="Giảm số lượng">-</button>
              <input type="number" class="qty-input" value="${it.quantity}" min="1" max="${it.totalStock || 99}" readonly />
              <button type="button" class="qty-btn" data-qty-plus data-item-id="${it.id}" aria-label="Tăng số lượng">+</button>
            </div>
            <button type="button" class="btn-remove-item" data-remove-item="${it.id}" aria-label="Xóa sản phẩm">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Xóa</span>
            </button>
          </div>
        </div>`).join('')
    : `<div class="catalog-empty-state" style="padding: 48px 24px;">
        <div class="empty-state-icon">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h3 class="empty-state-title">Giỏ hàng đang trống</h3>
        <p class="empty-state-desc">Hãy thêm vài sản phẩm bạn thích để bắt đầu mua sắm.</p>
        <a href="/san-pham" class="btn-pill btn-pill-primary">
          <span>Khám phá sản phẩm</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>`;

  const body = `<div class="container-custom" style="padding-top: 32px; padding-bottom: 80px;">
  <div class="cart-header-title">
    <h1 class="page-title" style="margin-bottom: 8px;">Giỏ hàng của bạn</h1>
    <p class="text-muted" data-cart-summary-text>${cart.count} sản phẩm trong giỏ — kiểm tra và áp dụng voucher ưu đãi</p>
  </div>

  <div class="cart-layout-grid" style="margin-top: 24px;">
    <div class="cart-main-col">
      <div id="cart-items-container" data-cart-list>
${itemRows}
      </div>

      <div class="freeship-progress-card" style="margin-top: 24px;">
        <div class="progress-title-row">
          <span>🎉 Bạn đã đủ điều kiện nhận <strong>Miễn phí vận chuyển</strong>!</span>
          <span class="progress-percent">100%</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: 100%;"></div>
        </div>
      </div>
    </div>

    <div class="cart-sidebar-col">
      <div class="cart-summary-card">
        <h2 class="summary-card-title">Tóm tắt đơn hàng</h2>

        <div class="summary-coupon-box">
          <div class="coupon-input-group">
            <input type="text" class="coupon-field" id="cart-coupon-input" placeholder="Mã giảm giá (ví dụ: CUTTAYNEW)" />
            <button type="button" class="btn-apply-coupon" id="btn-apply-coupon">Áp dụng</button>
          </div>
          <div class="coupon-feedback" id="coupon-feedback" style="display: none;"></div>
        </div>

        <div class="summary-rows-group">
          <div class="summary-row">
            <span class="summary-label">Tạm tính:</span>
            <span class="summary-val" data-cart-subtotal>${n0(cart.subtotal)} ₫</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Phí vận chuyển:</span>
            <span class="summary-val text-success" data-cart-shipping>Miễn phí</span>
          </div>
          <div class="summary-row" id="row-discount" style="display: none;">
            <span class="summary-label">Giảm giá voucher:</span>
            <span class="summary-val text-danger" data-cart-discount>-20.000 ₫</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-row total-row">
            <span class="total-label">Tổng thanh toán:</span>
            <div class="total-val-box">
              <span class="total-val" data-cart-total>${n0(cart.subtotal)} ₫</span>
              <span class="vat-note">(Đã bao gồm VAT)</span>
            </div>
          </div>
        </div>

        <a href="/thanh-toan" class="btn-pill btn-pill-primary btn-block btn-pill-lg checkout-btn">
          Tiến hành thanh toán →
        </a>

        <div class="summary-trust-perks">
          <div class="perk-item">
            <span class="perk-icon">🛡️</span>
            <span>Bảo hành chính hãng 100%</span>
          </div>
          <div class="perk-item">
            <span class="perk-icon">🔄</span>
            <span>Đổi trả 7 ngày miễn phí</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="cart-recommended-section" style="margin-top: 64px;">
    <h2 class="section-title">Có thể bạn cũng thích</h2>
    <div class="product-grid" style="margin-top: 24px;">
${suggestions.map((p) => `      ${productCard(p)}`).join('\n')}
    </div>
  </div>
</div>`;

  return layout({ title: 'Giỏ Hàng Mua Sắm — CutTayShop', body });
}

/* --------------------------------------------------------------- thanh toán */

export function renderCheckout(model = {}) {
  const cart = model.cart || { items: [], subtotal: 0, count: 0 };
  const user = model.user || null;

  const itemRows = cart.items.length
    ? cart.items.map((it) => `
          <div class="checkout-item-row">
            <img src="${esc(it.imageUrl)}" alt="${esc(it.name)}" class="item-thumb" width="60" height="60" />
            <div class="item-meta">
              <div class="item-name">${esc(it.name)}</div>
              <div class="item-variant">${esc(it.variantName || 'Mặc định')} × ${it.quantity}</div>
            </div>
            <div class="item-price">${n0(it.lineTotal)} ₫</div>
          </div>`).join('')
    : `<p class="text-muted" style="padding: 12px 0;">Giỏ hàng trống — <a href="/san-pham">chọn sản phẩm</a> trước khi thanh toán.</p>`;

  const body = `<div class="container-custom" style="padding-top: 32px; padding-bottom: 80px;">
  <div class="demo-notice-alert" role="alert">
    <div class="alert-icon">ℹ️</div>
    <div class="alert-body">
      <strong>Chế độ Mô phỏng (Demo Mode):</strong> Quy trình thanh toán nhằm kiểm thử giao diện và hành vi trải nghiệm. Hệ thống <strong>không thu thập thông tin thẻ tín dụng</strong> và không phát sinh bất kỳ giao dịch trừ tiền thực tế nào.
    </div>
  </div>

  <div class="checkout-header-title" style="margin-top: 24px;">
    <h1 class="page-title">Xác nhận thông tin giao hàng &amp; thanh toán</h1>
  </div>

  <form action="/thanh-toan" method="post" id="checkout-form" class="checkout-form-grid" style="margin-top: 24px;">
    <div class="checkout-left-col">
      <section class="checkout-card-section">
        <h2 class="checkout-section-title">
          <span class="step-num">1</span> Thông tin người nhận
        </h2>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Họ và tên <span class="required">*</span></label>
            <input name="fullName" class="form-control" placeholder="Ví dụ: Nguyễn Văn An" value="${esc(user ? user.fullName : 'Nguyễn Văn An')}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Số điện thoại <span class="required">*</span></label>
            <input name="phoneNumber" class="form-control" placeholder="Ví dụ: 0988 123 456" value="${esc(user ? user.phoneNumber : '0988 123 456')}" required />
          </div>
        </div>

        <div class="form-group" style="margin-top: 16px;">
          <label class="form-label">Địa chỉ Email (để nhận hóa đơn &amp; mã tra cứu)</label>
          <input name="email" class="form-control" type="email" placeholder="Ví dụ: an.nguyen@example.com" value="${esc(user ? user.email : 'an.nguyen@example.com')}" />
        </div>
      </section>

      <section class="checkout-card-section" style="margin-top: 24px;">
        <h2 class="checkout-section-title">
          <span class="step-num">2</span> Địa chỉ nhận hàng
        </h2>
        <div class="form-row-2">
          <div class="form-group">
            <label class="form-label">Tỉnh / Thành phố <span class="required">*</span></label>
            <select name="city" class="form-control" required>
              <option value="Hà Nội" selected>Hà Nội</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Cần Thơ">Cần Thơ</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Quận / Huyện <span class="required">*</span></label>
            <input name="district" class="form-control" placeholder="Ví dụ: Quận Hai Bà Trưng" value="Quận Hai Bà Trưng" required />
          </div>
        </div>

        <div class="form-group" style="margin-top: 16px;">
          <label class="form-label">Số nhà, tên đường, phường/xã <span class="required">*</span></label>
          <input name="address" class="form-control" placeholder="Ví dụ: Số 18, ngõ 45 phố Nguyễn Đình Chiểu" value="Số 18, ngõ 45 phố Nguyễn Đình Chiểu" required />
        </div>

        <div class="form-group" style="margin-top: 16px;">
          <label class="form-label">Ghi chú cho shipper (tùy chọn)</label>
          <textarea name="note" class="form-control" rows="2" placeholder="Ví dụ: Gọi điện trước khi giao hàng..."></textarea>
        </div>
      </section>

      <section class="checkout-card-section" style="margin-top: 24px;">
        <h2 class="checkout-section-title">
          <span class="step-num">3</span> Phương thức vận chuyển
        </h2>
        <div class="radio-options-group">
          <label class="radio-card selected">
            <input type="radio" name="shippingMethod" value="standard" checked />
            <div class="radio-card-content">
              <div class="radio-card-header">
                <strong>Giao hàng Tiêu Chuẩn (2-3 ngày)</strong>
                <span class="price-pill">30.000 ₫</span>
              </div>
              <p class="radio-card-desc">Giao hàng tận nơi toàn quốc qua đối tác vận chuyển uy tín.</p>
            </div>
          </label>

          <label class="radio-card">
            <input type="radio" name="shippingMethod" value="express" />
            <div class="radio-card-content">
              <div class="radio-card-header">
                <strong>Giao hàng Hỏa Tốc 2H (Nội thành)</strong>
                <span class="price-pill">45.000 ₫</span>
              </div>
              <p class="radio-card-desc">Áp dụng đơn nội thành Hà Nội &amp; TP.HCM, nhận hàng trong 120 phút.</p>
            </div>
          </label>
        </div>
      </section>

      <section class="checkout-card-section" style="margin-top: 24px;">
        <h2 class="checkout-section-title">
          <span class="step-num">4</span> Phương thức thanh toán (Demo)
        </h2>
        <div class="radio-options-group">
          <label class="radio-card selected">
            <input type="radio" name="paymentMethod" value="cod" checked />
            <div class="radio-card-content">
              <div class="radio-card-header">
                <strong>Thanh toán khi nhận hàng (COD)</strong>
                <span class="badge-capsule badge-mint">Khuyên dùng</span>
              </div>
              <p class="radio-card-desc">Nhận hàng, kiểm tra sản phẩm rồi mới thanh toán tiền mặt cho shipper.</p>
            </div>
          </label>

          <label class="radio-card">
            <input type="radio" name="paymentMethod" value="vietqr" />
            <div class="radio-card-content">
              <div class="radio-card-header">
                <strong>Chuyển khoản VietQR Demo</strong>
                <span class="badge-capsule badge-sky">Nhanh chóng</span>
              </div>
              <p class="radio-card-desc">Quét mã QR qua app ngân hàng hoặc ví điện tử (chế độ demo thử nghiệm).</p>
            </div>
          </label>
        </div>
      </section>
    </div>

    <div class="checkout-right-col">
      <div class="checkout-summary-card">
        <h2 class="summary-card-title">Đơn hàng của bạn (${cart.count} món)</h2>

        <div class="order-items-preview" data-checkout-items>
${itemRows}
        </div>

        <div class="summary-rows-group" style="margin-top: 20px;">
          <div class="summary-row">
            <span>Tạm tính:</span>
            <span data-checkout-subtotal>${n0(cart.subtotal)} ₫</span>
          </div>
          <div class="summary-row">
            <span>Phí vận chuyển:</span>
            <span class="text-success" data-checkout-shipping>Miễn phí</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-row total-row">
            <span class="total-label">Tổng thanh toán:</span>
            <span class="total-val" data-checkout-total>${n0(cart.subtotal)} ₫</span>
          </div>
        </div>

        <button type="submit" class="btn-pill btn-pill-primary btn-block btn-pill-lg" style="margin-top: 24px;"${cart.items.length ? '' : ' disabled'}>
          Hoàn tất đặt hàng (Demo) →
        </button>

        <p class="checkout-terms-note">
          Bằng việc nhấn đặt hàng, bạn đồng ý với <a href="/chinh-sach/dieu-khoan">Điều khoản dịch vụ</a> và <a href="/chinh-sach/bao-mat">Chính sách bảo mật</a> của CutTayShop.
        </p>
      </div>
    </div>
  </form>
</div>`;

  return layout({ title: 'Thanh Toán Đơn Hàng — CutTayShop', body });
}

/* ---------------------------------------------------------- đặt hàng thành công */

export function renderOrderSuccess(model) {
  const o = model.order;
  const recommended = (model.recommendedProducts || []).slice(0, 4);

  const body = `<div class="container-custom" style="padding-top: 48px; padding-bottom: 80px;">
  <div class="order-success-card">
    <div class="success-icon-badge">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    </div>

    <div class="badge-capsule badge-peach" style="margin-top: 16px;">
      ⚠️ Đơn hàng mô phỏng — Chưa phát sinh giao dịch tài chính
    </div>

    <h1 class="success-title" style="margin-top: 16px;">Cảm ơn bạn đã đặt hàng!</h1>
    <p class="success-desc">
      Mã đơn hàng của bạn là <strong class="order-code-highlight">${esc(o.orderCode)}</strong>. Hệ thống CutTayShop đã ghi nhận và gửi thông tin xác nhận tới email <strong>${esc(o.email || 'email đã đăng ký')}</strong>.
    </p>

    <div class="receipt-summary-box">
      <div class="receipt-header-row">
        <span>Thông tin nhận hàng</span>
        <span class="badge-capsule badge-mint">${esc(o.status)}</span>
      </div>
      <div class="receipt-grid">
        <div class="receipt-item">
          <span class="label">Người nhận:</span>
          <strong>${esc(o.customerName)} (${esc(o.phoneNumber)})</strong>
        </div>
        <div class="receipt-item">
          <span class="label">Địa chỉ giao:</span>
          <span>${esc(o.shippingAddress)}</span>
        </div>
        <div class="receipt-item">
          <span class="label">Phương thức thanh toán:</span>
          <span>${esc(o.paymentMethod)}</span>
        </div>
        <div class="receipt-item">
          <span class="label">Tổng số tiền:</span>
          <strong class="receipt-total-price">${n0(o.totalAmount)} ₫</strong>
        </div>
      </div>
    </div>

    <div class="success-actions-row">
      <a href="/tra-cuu-don-hang?code=${encodeURIComponent(o.orderCode)}" class="btn-pill btn-pill-primary btn-pill-lg">
        Tra cứu hành trình đơn hàng →
      </a>
      <a href="/san-pham" class="btn-pill btn-pill-secondary btn-pill-lg">
        Tiếp tục mua sắm
      </a>
    </div>
  </div>

  <div style="margin-top: 64px;">
    <h2 class="section-title">Gợi ý sản phẩm cho bạn</h2>
    <div class="product-grid" style="margin-top: 24px;">
${recommended.map((p) => `      ${productCard(p)}`).join('\n')}
    </div>
  </div>
</div>`;

  return layout({ title: 'Đặt Hàng Thành Công — CutTayShop', body });
}

/* ------------------------------------------------------------ tra cứu vận đơn */

export function renderTracking(model) {
  const extra = `<form action="/tra-cuu-don-hang" method="post" class="tracking-search-form">
        <div class="tracking-input-wrap">
          <input type="text"
                 name="queryCode"
                 class="tracking-input"
                 placeholder="Nhập mã đơn (ví dụ: CTS-2026-88910 hoặc SĐT: 0988 123 456)..."
                 value="${esc(model.queryCode || '')}"
                 required />
          <button type="submit" class="btn-pill btn-pill-primary tracking-btn">
            Tra cứu ngay →
          </button>
        </div>
      </form>`;

  let content = '';

  if (model.order) {
    const o = model.order;
    const steps = o.trackingHistory.map((step) => `
          <div class="timeline-step${step.isCompleted ? ' completed' : ''}${step.isCurrent ? ' current' : ''}">
            <div class="step-indicator">
              <span class="step-dot"></span>
              <span class="step-line"></span>
            </div>
            <div class="step-content">
              <div class="step-time">${dmyhm(step.timestamp)}</div>
              <h3 class="step-title">${esc(step.title)}</h3>
              <p class="step-desc">${esc(step.description)}</p>
            </div>
          </div>`).join('\n');

    const items = o.items.map((item) => `
            <div class="package-item-row">
              <img src="${esc(item.imageUrl)}" alt="${esc(item.productName)}" class="package-item-img" width="60" height="60" />
              <div class="package-item-info">
                <a href="/san-pham/${esc(item.productSlug)}" class="package-item-title">${esc(item.productName)}</a>
                <span class="package-item-variant">${esc(item.variantName || '')} × ${item.quantity}</span>
              </div>
              <div class="package-item-price">${n0(item.totalPrice)} ₫</div>
            </div>`).join('\n');

    content = `<div class="order-tracking-card">
      <div class="tracking-card-header">
        <div>
          <span class="tracking-code-title">Đơn hàng: <strong>${esc(o.orderCode)}</strong></span>
          <span class="text-muted" style="margin-left: 12px; font-size: 0.875rem;">Đặt ngày: ${dmyhm(o.createdAt)}</span>
        </div>
        <span class="badge-capsule badge-mint">${esc(o.status)}</span>
      </div>

      <div class="tracking-timeline">
${steps}
      </div>

      <div class="order-package-items" style="margin-top: 32px;">
        <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Sản phẩm trong kiện hàng</h3>
        <div class="package-items-list">
${items}
        </div>
      </div>
    </div>`;
  } else if (!model.hasSearched) {
    content = `<div class="demo-tracking-hints" style="max-width: 680px; margin: 0 auto; text-align: center;">
      <p class="text-muted">Bạn có thể thử tra cứu với các mã đơn hàng mẫu sẵn có trong hệ thống:</p>
      <div style="display: flex; gap: 12px; justify-content: center; margin-top: 12px; flex-wrap: wrap;">
        <a href="/tra-cuu-don-hang?code=CTS-2026-88910" class="badge-capsule badge-sky">CTS-2026-88910 (Đang giao)</a>
        <a href="/tra-cuu-don-hang?code=CTS-2026-88902" class="badge-capsule badge-mint">CTS-2026-88902 (Đã giao)</a>
        <a href="/tra-cuu-don-hang?code=CTS-2026-88934" class="badge-capsule badge-peach">CTS-2026-88934 (Đang xử lý)</a>
      </div>
    </div>`;
  }

  const error = model.errorMessage
    ? `<div class="alert alert-warning" role="alert" style="max-width: 680px; margin: 0 auto 32px;">
      ${esc(model.errorMessage)}
    </div>`
    : '';

  const body = `${pageHeaderEditorial({
    badgeClass: 'badge-sky',
    badgeIcon: '📦',
    badgeText: 'Theo dõi hành trình kiện hàng',
    title: 'Tra Cứu Đơn Hàng',
    subtitle: 'Nhập mã đơn hàng hoặc số điện thoại để cập nhật tiến độ vận chuyển mới nhất.',
    extra,
  })}

<div class="container-custom" style="padding-top: 32px; padding-bottom: 80px;">
  ${error}
  ${content}
</div>`;

  return layout({ title: 'Tra Cứu Đơn Hàng — CutTayShop', body });
}

/* --------------------------------------------------------------- flash sale */

export function renderFlashSale(model) {
  const c = model.countdown;
  const parts = countdownParts(c.endTime);

  const extra = `<div class="flash-countdown-card" data-countdown-end="${esc(isoRoundTrip(c.endTime))}">
        <div class="countdown-label">
          <span class="pulse-indicator"></span> Kết thúc sau:
        </div>
        <div class="countdown-digits">
          <div class="countdown-unit">
            <span class="unit-val hours">${d2(parts.hours)}</span>
            <span class="unit-text">Giờ</span>
          </div>
          <span class="countdown-colon">:</span>
          <div class="countdown-unit">
            <span class="unit-val minutes">${d2(parts.minutes)}</span>
            <span class="unit-text">Phút</span>
          </div>
          <span class="countdown-colon">:</span>
          <div class="countdown-unit">
            <span class="unit-val seconds">${d2(parts.seconds)}</span>
            <span class="unit-text">Giây</span>
          </div>
        </div>
      </div>`;

  const chips = model.categories
    .map((cat) => `<a href="/danh-muc/${esc(cat.slug)}" class="filter-chip">${esc(cat.name)}</a>`)
    .join('\n    ');

  const body = `${pageHeaderEditorial({
    badgeClass: 'badge-peach',
    badgeIcon: '⚡',
    badgeText: 'Khung giờ vàng giảm sốc',
    title: 'Flash Sale Hôm Nay',
    subtitle: 'Săn deal chớp nhoáng với mức giảm lên đến 50%. Số lượng có hạn theo từng khung giờ!',
    extra,
  })}

<div class="container-custom" style="padding-top: 32px; padding-bottom: 64px;">
  <div class="filter-chips-row" style="margin-bottom: 28px;">
    <a href="/flash-sale" class="filter-chip active">Tất cả deal</a>
    ${chips}
  </div>

  <div class="product-grid">
${model.deals.map((p) => `    ${productCard(p)}`).join('\n')}
  </div>
</div>`;

  return layout({ title: 'Flash Sale Deal Giờ Vàng — CutTayShop', body, active: 'promo' });
}

/* --------------------------------------------------------------- khuyến mãi */

function couponTicket(coupon, { copyButton }) {
  const value = coupon.discountPercent != null
    ? `${coupon.discountPercent}%`
    : `${coupon.discountAmount / 1000}K`;

  const action = copyButton
    ? `<button type="button" class="btn-copy-coupon" data-copy="${esc(coupon.code)}">
                <span class="copy-code-text">${esc(coupon.code)}</span>
                <span class="copy-action-btn">Lưu mã</span>
              </button>`
    : `<a href="/gio-hang" class="btn-pill btn-pill-primary btn-sm" style="margin-left: auto;">Dùng ngay</a>`;

  return `<div class="coupon-ticket-card" data-coupon-code="${esc(coupon.code)}">
          <div class="ticket-left">
            <div class="ticket-type">VOUCHER</div>
            <div class="ticket-val"><span>${value}</span></div>
            <div class="ticket-off">GIẢM</div>
          </div>
          <div class="ticket-divider"></div>
          <div class="ticket-right">
            <h3 class="ticket-title">${esc(coupon.title)}</h3>
            <p class="ticket-desc">${esc(coupon.description)}</p>
            <div class="ticket-meta">
              <span class="ticket-hsd">HSD: ${dmy(coupon.validUntil)}</span>
              ${action}
            </div>
          </div>
        </div>`;
}

export function renderPromotionIndex(model) {
  const campaigns = model.banners.map((banner) => `
        <div class="campaign-banner-card" style="background-color: ${esc(banner.bgColorHex)};">
          <div class="campaign-info">
            <span class="campaign-cat">${esc(banner.categoryTitle)}</span>
            <h3 class="campaign-headline">${esc(banner.promoLabel)} <strong>${esc(banner.highlightNumber)}</strong></h3>
            <a href="${esc(banner.ctaLink)}" class="btn-pill btn-pill-primary">${esc(banner.ctaText)}</a>
          </div>
          <div class="campaign-visual">
            <img src="${esc(banner.imageUrl)}" alt="${esc(banner.categoryTitle)}" width="160" height="160" loading="lazy" />
          </div>
        </div>`).join('\n');

  const body = `${pageHeaderEditorial({
    badgeClass: 'badge-mint',
    badgeIcon: '🎁',
    badgeText: 'Tiết kiệm tối đa cùng CutTayShop',
    title: 'Kho Voucher & Ưu Đãi Đặc Quyền',
    subtitle: 'Thu thập các mã giảm giá hấp dẫn, miễn phí vận chuyển và ưu đãi đặc quyền theo ngành hàng.',
  })}

<div class="container-custom" style="padding-top: 32px; padding-bottom: 64px;">
  <div class="promo-section-block">
    <div class="section-title-wrap">
      <h2 class="section-title">Mã Giảm Giá Sẵn Sàng Lưu</h2>
      <p class="section-desc">Nhấn vào mã để sao chép và tự động áp dụng tại giỏ hàng của bạn.</p>
    </div>

    <div class="coupons-grid">
${model.coupons.map((c) => `      ${couponTicket(c, { copyButton: true })}`).join('\n')}
    </div>
  </div>

  <div class="promo-section-block" style="margin-top: 48px;">
    <div class="section-title-wrap">
      <h2 class="section-title">Chiến Dịch Nổi Bật</h2>
    </div>
    <div class="promo-campaign-grid">
${campaigns}
    </div>
  </div>

  <div class="promo-section-block" style="margin-top: 48px;">
    <div class="section-title-wrap" style="display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h2 class="section-title">Deal Hot Đang Diễn Ra</h2>
        <p class="section-desc">Giá ưu đãi trực tiếp không cần nhập mã.</p>
      </div>
      <a href="/flash-sale" class="btn-pill btn-pill-secondary">Xem tất cả flash sale →</a>
    </div>

    <div class="product-grid" style="margin-top: 24px;">
${model.hotDeals.map((p) => `      ${productCard(p)}`).join('\n')}
    </div>
  </div>
</div>`;

  return layout({ title: 'Trung Tâm Khuyến Mãi & Voucher — CutTayShop', body, active: 'promo' });
}

/* ----------------------------------------------------------------- wishlist */

export function renderWishlist(model) {
  const products = Array.isArray(model) ? model : (model.products || []);
  const savedCount = Array.isArray(model) ? 0 : (model.savedCount || 0);
  const isLoggedIn = Array.isArray(model) ? false : !!model.isLoggedIn;

  const heading = savedCount > 0 ? 'Sản phẩm bạn đã lưu' : 'Gợi ý sản phẩm nổi bật';
  const label = savedCount > 0
    ? `${savedCount} sản phẩm trong danh sách yêu thích`
    : (isLoggedIn
      ? 'Bấm tim trên thẻ sản phẩm để lưu vào danh sách'
      : 'Đăng nhập để lưu sản phẩm yêu thích của bạn');

  const body = `${pageHeaderEditorial({
    badgeClass: 'badge-peach',
    badgeIcon: '❤️',
    badgeText: 'Bộ sưu tập yêu thích của bạn',
    title: 'Sản Phẩm Yêu Thích',
    subtitle: 'Lưu giữ những món đồ bạn quan tâm để dễ dàng theo dõi biến động giá và mua sắm bất cứ lúc nào.',
  })}

<div class="container-custom" style="padding-top: 32px; padding-bottom: 64px;">
  <div id="wishlist-container" data-wishlist-view>
    <div class="wishlist-items-section">
      <div class="wishlist-header-row">
        <h2 class="section-title">${heading}</h2>
        <span class="text-muted" data-wishlist-count-label>${label}</span>
      </div>

      <div class="product-grid" style="margin-top: 24px;">
${products.map((p) => `        ${productCard(p)}`).join('\n')}
      </div>
    </div>
  </div>
</div>`;

  return layout({ title: 'Danh Sách Yêu Thích — CutTayShop', body });
}

/* ------------------------------------------------------------------ so sánh */

export function renderCompare(products) {
  const list = products.slice(0, 3);

  const headerCells = list.map((p) => `
            <th style="min-width: 260px;">
              <div class="compare-prod-card">
                <img src="${esc(p.imageUrl)}" alt="${esc(p.name)}" class="compare-img" width="120" height="120" />
                <h3 class="compare-prod-name"><a href="/san-pham/${esc(p.slug)}">${esc(p.name)}</a></h3>
                <div class="compare-price">${n0(p.price)} ₫</div>
                <button type="button" class="btn-pill btn-pill-primary btn-sm btn-block" data-add-to-cart="${p.id}" style="margin-top: 8px;">
                  Thêm vào giỏ
                </button>
              </div>
            </th>`).join('');

  const row = (label, cellFn) => `        <tr>
          <td class="compare-row-label">${label}</td>
${list.map((p) => `          <td>${cellFn(p)}</td>`).join('\n')}
        </tr>`;

  const body = `${pageHeaderEditorial({
    badgeClass: 'badge-sky',
    badgeIcon: '⚖️',
    badgeText: 'Đưa ra quyết định mua sắm thông thái',
    title: 'So Sánh Sản Phẩm',
    subtitle: 'Đặt cạnh nhau để so sánh chi tiết tính năng, thông số kỹ thuật, giá thành và đánh giá thực tế.',
  })}

<div class="container-custom" style="padding-top: 32px; padding-bottom: 64px;">
  <div class="compare-table-wrapper" style="overflow-x: auto;">
    <table class="compare-table">
      <thead>
        <tr>
          <th style="min-width: 180px;">Tiêu chí so sánh</th>${headerCells}
        </tr>
      </thead>
      <tbody>
${row('Thương hiệu', (p) => `<strong>${esc(p.brand)}</strong>`)}
${row('Ngành hàng', (p) => `<a href="/danh-muc/${esc(p.categorySlug)}">${esc(p.categoryName)}</a>`)}
${row('Đánh giá', (p) => `<span class="rating-badge">★ ${p.rating}</span>
              <span class="text-muted" style="font-size: 0.8rem;">(${p.reviewCount} nhận xét)</span>`)}
${row('Tình trạng', (p) => (p.inStock
    ? '<span class="stock-status in-stock">● Còn hàng</span>'
    : '<span class="stock-status out-of-stock">● Hết hàng tạm thời</span>'))}
${row('Mô tả tóm tắt', (p) => `<span style="font-size: 0.875rem; color: var(--color-text-secondary); line-height: 1.5;">${esc(p.shortDescription)}</span>`)}
      </tbody>
    </table>
  </div>
</div>`;

  return layout({ title: 'So Sánh Sản Phẩm — CutTayShop', body });
}
