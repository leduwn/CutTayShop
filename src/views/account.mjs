/** Cổng tài khoản khách hàng + Auth — port từ Views/Account & Views/Auth */
import { esc, n0, vnd, dmy, dmyhm } from '../format.mjs';
import { layout, accountNav, alert, breadcrumb } from './partials.mjs';

function accountShell(currentAction, inner) {
  return `<div class="container-custom" style="padding-top: 32px; padding-bottom: 80px;">
  <div class="account-portal-layout">
    <div class="account-sidebar-col">
      ${accountNav(currentAction)}
    </div>

    <div class="account-content-col">
${inner}
    </div>
  </div>
</div>`;
}

/* ------------------------------------------------------------ tổng quan */

export function renderAccountIndex(model) {
  const rows = model.recentOrders.map((order) => {
    const first = order.items[0];
    return `                <tr style="border-bottom: 1px solid var(--color-border);">
                  <td style="padding: 12px;"><strong>${esc(order.orderCode)}</strong></td>
                  <td style="padding: 12px;">${dmy(order.createdAt)}</td>
                  <td style="padding: 12px;">${esc(first ? first.productName : '')} (${order.items.length} món)</td>
                  <td style="padding: 12px;"><strong>${n0(order.totalAmount)} ₫</strong></td>
                  <td style="padding: 12px;"><span class="badge-capsule badge-mint">${esc(order.status)}</span></td>
                  <td style="padding: 12px;">
                    <a href="/tai-khoan/don-hang/${esc(order.orderCode)}" class="btn-pill btn-pill-secondary btn-sm">Chi tiết</a>
                  </td>
                </tr>`;
  }).join('\n');

  const inner = `      <div class="account-welcome-banner">
        <div>
          <h1 class="welcome-title">Xin chào, ${esc(model.customerName)}!</h1>
          <p class="welcome-sub">Chào mừng bạn trở lại với CutTayShop. Bạn đang có <strong>${model.rewardPoints} điểm</strong> thưởng CutTayShop+.</p>
        </div>
        <div class="tier-pill-gold">
          <span>👑 ${esc(model.membershipTier)}</span>
        </div>
      </div>

      <div class="account-metrics-grid" style="margin-top: 24px;">
        <div class="metric-card">
          <div class="metric-val">${model.orderCount}</div>
          <div class="metric-label">Tổng đơn hàng</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">${model.voucherCount}</div>
          <div class="metric-label">Voucher khả dụng</div>
        </div>
        <div class="metric-card">
          <div class="metric-val">${model.rewardPoints}</div>
          <div class="metric-label">Điểm CutTay+ tích lũy</div>
        </div>
      </div>

      <div class="account-section-card" style="margin-top: 28px;">
        <div class="section-card-header">
          <h2 class="card-title">Đơn hàng gần đây</h2>
          <a href="/tai-khoan/don-hang" class="view-all-link">Xem tất cả đơn hàng →</a>
        </div>

        <div class="orders-table-wrapper" style="overflow-x: auto; margin-top: 16px;">
          <table class="table-styled" style="width: 100%;">
            <thead>
              <tr style="text-align: left; background: var(--color-bg-secondary);">
                <th style="padding: 12px;">Mã đơn</th>
                <th style="padding: 12px;">Ngày đặt</th>
                <th style="padding: 12px;">Sản phẩm</th>
                <th style="padding: 12px;">Tổng tiền</th>
                <th style="padding: 12px;">Trạng thái</th>
                <th style="padding: 12px;">Thao tác</th>
              </tr>
            </thead>
            <tbody>
${rows}
            </tbody>
          </table>
        </div>
      </div>`;

  return layout({ title: 'Tổng Quan Tài Khoản — CutTayShop', body: accountShell('Index', inner) });
}

/* --------------------------------------------------------------- đơn hàng */

export function renderAccountOrders(orders, currentTab) {
  const tab = currentTab || 'all';
  const chip = (href, label, key) =>
    `<a href="${href}" class="filter-chip${tab === key ? ' active' : ''}">${label}</a>`;

  const cards = orders.map((order) => {
    const items = order.items.map((item) => `
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <img src="${esc(item.imageUrl)}" alt="${esc(item.productName)}" style="width: 56px; height: 56px; object-fit: cover; border-radius: var(--radius-sm);" />
                    <div style="flex: 1;">
                      <a href="/san-pham/${esc(item.productSlug)}" style="font-weight: 600; color: var(--color-text-primary);">${esc(item.productName)}</a>
                      <div style="font-size: 0.8125rem; color: var(--color-text-secondary);">${esc(item.variantName || '')} • Số lượng: ${item.quantity}</div>
                    </div>
                    <div style="font-weight: 600;">${n0(item.totalPrice)} ₫</div>
                  </div>`).join('\n');

    return `            <div class="customer-order-card" style="border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 20px; background: var(--color-bg-secondary);">
              <div class="order-card-top-bar" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 12px; margin-bottom: 16px;">
                <div>
                  <span style="font-weight: 700;">Đơn hàng #${esc(order.orderCode)}</span>
                  <span class="text-muted" style="margin-left: 12px; font-size: 0.8125rem;">Ngày đặt: ${dmyhm(order.createdAt)}</span>
                </div>
                <span class="badge-capsule badge-mint">${esc(order.status)}</span>
              </div>

              <div class="order-items-list" style="display: flex; flex-direction: column; gap: 12px;">
${items}
              </div>

              <div class="order-card-bottom-bar" style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 16px; margin-top: 16px; flex-wrap: wrap; gap: 12px;">
                <div>
                  <span class="text-muted" style="font-size: 0.875rem;">Tổng thanh toán: </span>
                  <strong style="font-size: 1.125rem; color: var(--color-primary);">${n0(order.totalAmount)} ₫</strong>
                </div>
                <div style="display: flex; gap: 10px;">
                  <a href="/tra-cuu-don-hang?code=${encodeURIComponent(order.orderCode)}" class="btn-pill btn-pill-secondary btn-sm">Theo dõi vận chuyển</a>
                  <a href="/tai-khoan/don-hang/${esc(order.orderCode)}" class="btn-pill btn-pill-primary btn-sm">Xem chi tiết đơn</a>
                </div>
              </div>
            </div>`;
  }).join('\n');

  const inner = `      <div class="account-section-card">
        <h1 class="card-title" style="margin-bottom: 8px;">Đơn hàng của tôi</h1>
        <p class="text-muted" style="margin-bottom: 24px;">Theo dõi và kiểm tra trạng thái toàn bộ đơn hàng bạn đã mua.</p>

        <div class="filter-chips-row" style="margin-bottom: 24px;">
          ${chip('/tai-khoan/don-hang', `Tất cả đơn (${orders.length})`, 'all')}
          ${chip('/tai-khoan/don-hang?tab=dang-giao', 'Đang giao', 'dang-giao')}
          ${chip('/tai-khoan/don-hang?tab=da-giao', 'Đã giao', 'da-giao')}
          ${chip('/tai-khoan/don-hang?tab=da-huy', 'Đã hủy', 'da-huy')}
        </div>

        <div class="customer-orders-list" style="display: flex; flex-direction: column; gap: 20px;">
${cards}
        </div>
      </div>`;

  return layout({ title: 'Đơn Hàng Của Tôi — CutTayShop', body: accountShell('Orders', inner) });
}

export function renderAccountOrderDetail(order) {
  const items = order.items.map((item) => `
              <tr style="border-bottom: 1px solid var(--color-border);">
                <td style="padding: 12px; display: flex; align-items: center; gap: 12px;">
                  <img src="${esc(item.imageUrl)}" alt="${esc(item.productName)}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius-sm);" />
                  <div>
                    <a href="/san-pham/${esc(item.productSlug)}" style="font-weight: 600; color: var(--color-text-primary);">${esc(item.productName)}</a>
                    <div style="font-size: 0.8125rem; color: var(--color-text-muted);">${esc(item.variantName || '')}</div>
                  </div>
                </td>
                <td style="padding: 12px;">${n0(item.unitPrice)} ₫</td>
                <td style="padding: 12px;">${item.quantity}</td>
                <td style="padding: 12px; text-align: right; font-weight: 600;">${n0(item.totalPrice)} ₫</td>
              </tr>`).join('\n');

  const discountRow = order.discount > 0
    ? `<div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--color-danger);">
              <span>Giảm giá:</span>
              <span>-${n0(order.discount)} ₫</span>
            </div>`
    : '';

  const tracking = order.trackingNumber
    ? `<span style="font-size: 0.8125rem; color: var(--color-text-muted);">Mã vận đơn: ${esc(order.trackingNumber)}</span>`
    : '';

  const inner = `      <div class="account-section-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
          <div>
            <a href="/tai-khoan/don-hang" style="font-size: 0.875rem; color: var(--color-primary); font-weight: 600;">← Quay lại danh sách đơn hàng</a>
            <h1 class="card-title" style="margin-top: 8px;">Chi tiết đơn hàng #${esc(order.orderCode)}</h1>
            <span class="text-muted" style="font-size: 0.8125rem;">Đặt ngày: ${dmyhm(order.createdAt)}</span>
          </div>
          <span class="badge-capsule badge-mint" style="font-size: 0.9375rem;">${esc(order.status)}</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-bottom: 32px;">
          <div style="padding: 16px; background: var(--color-bg-secondary); border-radius: var(--radius-md);">
            <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 4px;">ĐỊA CHỈ NHẬN HÀNG</div>
            <strong>${esc(order.customerName)}</strong>
            <p style="margin: 4px 0; font-size: 0.875rem;">${esc(order.shippingAddress)}</p>
            <span style="font-size: 0.875rem; color: var(--color-text-secondary);">SĐT: ${esc(order.phoneNumber)}</span>
          </div>

          <div style="padding: 16px; background: var(--color-bg-secondary); border-radius: var(--radius-md);">
            <div style="font-size: 0.8125rem; color: var(--color-text-muted); margin-bottom: 4px;">HÌNH THỨC GIAO HÀNG &amp; THANH TOÁN</div>
            <p style="margin: 4px 0; font-size: 0.875rem;">🚚 ${esc(order.shippingMethod)}</p>
            <p style="margin: 4px 0; font-size: 0.875rem;">💳 ${esc(order.paymentMethod)}</p>
            ${tracking}
          </div>
        </div>

        <h3 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Danh sách kiện hàng</h3>
        <table class="table-styled" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background: var(--color-bg-secondary); text-align: left;">
              <th style="padding: 12px;">Sản phẩm</th>
              <th style="padding: 12px;">Đơn giá</th>
              <th style="padding: 12px;">Số lượng</th>
              <th style="padding: 12px; text-align: right;">Tạm tính</th>
            </tr>
          </thead>
          <tbody>
${items}
          </tbody>
        </table>

        <div style="max-width: 320px; margin-left: auto; margin-top: 24px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Tạm tính:</span>
            <span>${n0(order.subtotal)} ₫</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span>Phí vận chuyển:</span>
            <span>${n0(order.shippingFee)} ₫</span>
          </div>
          ${discountRow}
          <div style="border-top: 1px solid var(--color-border); padding-top: 12px; display: flex; justify-content: space-between; font-weight: 700; font-size: 1.125rem;">
            <span>Tổng cộng:</span>
            <span style="color: var(--color-primary);">${n0(order.totalAmount)} ₫</span>
          </div>
        </div>
      </div>`;

  return layout({
    title: `Chi Tiết Đơn Hàng #${order.orderCode} — CutTayShop`,
    body: accountShell('OrderDetail', inner),
  });
}

/* -------------------------------------------------------------- địa chỉ */

export function renderAccountAddresses(addresses) {
  const cards = addresses.map((addr) => `
            <div class="address-item-card" style="padding: 20px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-secondary); display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                  <strong style="font-size: 1rem;">${esc(addr.receiverName)}</strong>
                  <span class="text-muted">• ${esc(addr.phoneNumber)}</span>
                  <span class="badge-capsule badge-subtle">${esc(addr.label)}</span>
                  ${addr.isDefault ? '<span class="badge-capsule badge-mint">Mặc định</span>' : ''}
                </div>
                <p style="color: var(--color-text-secondary); font-size: 0.9375rem; margin: 0;">${esc(addr.fullAddress)}</p>
              </div>
              <div style="display: flex; gap: 8px;">
                <button type="button" class="btn-pill btn-pill-secondary btn-sm" onclick="alert('Chế độ Demo: Đã mở form chỉnh sửa địa chỉ.')">Sửa</button>
              </div>
            </div>`).join('\n');

  const inner = `      <div class="account-section-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 class="card-title" style="margin-bottom: 4px;">Sổ địa chỉ nhận hàng</h1>
            <p class="text-muted">Quản lý các địa chỉ giao hàng để thanh toán nhanh chóng hơn.</p>
          </div>
          <button type="button" class="btn-pill btn-pill-primary btn-sm" onclick="alert('Chức năng thêm địa chỉ mới đang ở chế độ Demo.')">
            + Thêm địa chỉ mới
          </button>
        </div>

        <div class="address-cards-list" style="display: flex; flex-direction: column; gap: 16px;">
${cards}
        </div>
      </div>`;

  return layout({ title: 'Sổ Địa Chỉ — CutTayShop', body: accountShell('Addresses', inner) });
}

/* -------------------------------------------------------------- voucher */

export function renderAccountVouchers(coupons) {
  const cards = coupons.map((coupon) => {
    const value = coupon.discountPercent != null
      ? `${coupon.discountPercent}%`
      : `${coupon.discountAmount / 1000}K`;

    return `            <div class="coupon-ticket-card" data-coupon-code="${esc(coupon.code)}">
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
                  <a href="/gio-hang" class="btn-pill btn-pill-primary btn-sm" style="margin-left: auto;">Dùng ngay</a>
                </div>
              </div>
            </div>`;
  }).join('\n');

  const inner = `      <div class="account-section-card">
        <h1 class="card-title" style="margin-bottom: 8px;">Ví mã giảm giá của tôi</h1>
        <p class="text-muted" style="margin-bottom: 24px;">Các voucher đang có hiệu lực trong tài khoản của bạn.</p>

        <div class="coupons-grid">
${cards}
        </div>
      </div>`;

  return layout({ title: 'Ví Voucher Của Tôi — CutTayShop', body: accountShell('Vouchers', inner) });
}

/* -------------------------------------------------------------- hội viên */

export function renderAccountLoyalty() {
  const inner = `      <div class="account-section-card">
        <div class="loyalty-header-banner" style="background: linear-gradient(135deg, #1e293b, #0f172a); color: white; padding: 32px; border-radius: var(--radius-lg); margin-bottom: 32px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
            <div>
              <div class="badge-capsule" style="background: rgba(255,255,255,0.15); color: #facc15; margin-bottom: 8px;">👑 Hạng Thành Viên</div>
              <h1 style="font-size: 1.75rem; font-weight: 800; margin: 0; color: #facc15;">CutTayShop+ VÀNG</h1>
              <p style="margin-top: 8px; color: #94a3b8;">Tích lũy thêm 750 điểm nữa để lên hạng <strong>Kim Cương</strong></p>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.875rem; color: #94a3b8;">ĐIỂM HIỆN CÓ</div>
              <div style="font-size: 2.5rem; font-weight: 800; color: white;">1.250</div>
            </div>
          </div>

          <div style="margin-top: 24px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; margin-bottom: 6px; color: #cbd5e1;">
              <span>Vàng (1.000 điểm)</span>
              <span>Kim Cương (2.000 điểm)</span>
            </div>
            <div style="height: 8px; background: rgba(255,255,255,0.2); border-radius: 4px; overflow: hidden;">
              <div style="width: 62.5%; height: 100%; background: #facc15; border-radius: 4px;"></div>
            </div>
          </div>
        </div>

        <h2 class="section-title">Đặc quyền hạng Vàng của bạn</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-top: 16px;">
          <div style="padding: 20px; background: var(--color-bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
            <div style="font-size: 2rem; margin-bottom: 8px;">🚚</div>
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 4px;">4 Mã Freeship / Tháng</h3>
            <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin: 0;">Áp dụng cho mọi đơn hàng toàn quốc.</p>
          </div>

          <div style="padding: 20px; background: var(--color-bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
            <div style="font-size: 2rem; margin-bottom: 8px;">🎁</div>
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 4px;">Quà tặng sinh nhật 100k</h3>
            <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin: 0;">Voucher tự động gửi vào ví trong tháng sinh nhật.</p>
          </div>

          <div style="padding: 20px; background: var(--color-bg-secondary); border-radius: var(--radius-md); border: 1px solid var(--color-border);">
            <div style="font-size: 2rem; margin-bottom: 8px;">⚡</div>
            <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 4px;">Ưu tiên CSKH 1-1</h3>
            <p style="font-size: 0.8125rem; color: var(--color-text-secondary); margin: 0;">Kết nối chuyên viên hỗ trợ trong 30 giây.</p>
          </div>
        </div>
      </div>`;

  return layout({
    title: 'Đặc Quyền Hội Viên CutTayShop+ — CutTayShop',
    body: accountShell('Loyalty', inner),
  });
}

/* -------------------------------------------------------------- hồ sơ */

export function renderAccountProfile({ profile, successMessage, errorMessage }) {
  const success = successMessage ? alert('success', successMessage) : '';
  const error = errorMessage ? alert('danger', errorMessage) : '';

  const inner = `      <div class="account-section-card">
        <h1 class="card-title" style="margin-bottom: 8px;">Thông tin hồ sơ cá nhân</h1>
        <p class="text-muted" style="margin-bottom: 24px;">Quản lý thông tin tài khoản để bảo mật và nhận quà sinh nhật từ CutTayShop.</p>

        ${success}
        ${error}

        <form action="/tai-khoan/ho-so" method="post" style="max-width: 600px;">
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Họ và tên</label>
            <input type="text" name="fullName" class="form-control" value="${esc(profile.fullName)}" required />
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Số điện thoại</label>
            <input type="tel" name="phone" class="form-control" value="${esc(profile.phoneNumber)}" required />
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Email</label>
            <input type="email" name="email" class="form-control" value="${esc(profile.email)}" required />
          </div>

          <div class="form-group" style="margin-bottom: 24px;">
            <label class="form-label">Ngày sinh</label>
            <input type="date" name="birthday" class="form-control" value="${esc(profile.birthday || '')}" />
          </div>

          <button type="submit" class="btn-pill btn-pill-primary btn-pill-lg">
            Lưu thay đổi →
          </button>
        </form>
      </div>`;

  return layout({ title: 'Hồ Sơ Cá Nhân — CutTayShop', body: accountShell('Profile', inner) });
}

/* -------------------------------------------------------------- đổi mật khẩu */

export function renderAccountChangePassword({ successMessage, errorMessage }) {
  const success = successMessage ? alert('success', successMessage) : '';
  const error = errorMessage ? alert('danger', errorMessage) : '';

  const inner = `      <div class="account-section-card">
        <h1 class="card-title" style="margin-bottom: 8px;">Đổi mật khẩu tài khoản</h1>
        <p class="text-muted" style="margin-bottom: 24px;">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác.</p>

        ${success}
        ${error}

        <form action="/tai-khoan/doi-mat-khau" method="post" style="max-width: 500px;">
          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Mật khẩu hiện tại <span class="required">*</span></label>
            <input type="password" name="currentPassword" class="form-control" placeholder="••••••••" required />
          </div>

          <div class="form-group" style="margin-bottom: 16px;">
            <label class="form-label">Mật khẩu mới <span class="required">*</span></label>
            <input type="password" name="newPassword" class="form-control" placeholder="Tối thiểu 6 ký tự" required />
          </div>

          <div class="form-group" style="margin-bottom: 24px;">
            <label class="form-label">Xác nhận mật khẩu mới <span class="required">*</span></label>
            <input type="password" name="confirmPassword" class="form-control" placeholder="Nhập lại mật khẩu mới" required />
          </div>

          <button type="submit" class="btn-pill btn-pill-primary btn-pill-lg">
            Cập nhật mật khẩu →
          </button>
        </form>
      </div>`;

  return layout({ title: 'Đổi Mật Khẩu — CutTayShop', body: accountShell('ChangePassword', inner) });
}

/* -------------------------------------------------------------- đánh giá */

export function renderAccountReviews(products) {
  const rows = products.slice(0, 3).map((prod) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-bg-secondary); flex-wrap: wrap; gap: 16px;">
              <div style="display: flex; align-items: center; gap: 16px;">
                <img src="${esc(prod.imageUrl)}" alt="${esc(prod.name)}" style="width: 60px; height: 60px; object-fit: cover; border-radius: var(--radius-sm);" />
                <div>
                  <a href="/san-pham/${esc(prod.slug)}" style="font-weight: 600; color: var(--color-text-primary);">${esc(prod.name)}</a>
                  <div style="font-size: 0.8125rem; color: var(--color-text-muted);">Đã mua vào 20/02/2026</div>
                </div>
              </div>
              <button type="button" class="btn-pill btn-pill-primary btn-sm" onclick="alert('Cảm ơn bạn! Đã mở form đánh giá sản phẩm trong chế độ Demo.')">
                ⭐ Viết đánh giá (+50 điểm)
              </button>
            </div>`).join('\n');

  const inner = `      <div class="account-section-card">
        <h1 class="card-title" style="margin-bottom: 8px;">Đánh giá sản phẩm</h1>
        <p class="text-muted" style="margin-bottom: 24px;">Chia sẻ trải nghiệm thực tế để nhận điểm thưởng CutTayShop+.</p>

        <div class="reviews-products-list" style="display: flex; flex-direction: column; gap: 16px;">
${rows}
        </div>
      </div>`;

  return layout({ title: 'Đánh Giá Của Tôi — CutTayShop', body: accountShell('Reviews', inner) });
}

/* ------------------------------------------------------------------- auth */

function authShell(title, inner) {
  return layout({
    title,
    body: `<div class="container-custom" style="padding-top: 48px; padding-bottom: 80px; max-width: 480px;">
  <div class="auth-card">
${inner}
  </div>
</div>`,
  });
}

export function renderLogin({ errorMessage, registerSuccess, successMessage, returnUrl }) {
  const error = errorMessage ? alert('danger', errorMessage) : '';
  const regOk = registerSuccess ? alert('success', registerSuccess) : '';
  const ok = successMessage ? alert('success', successMessage) : '';

  return authShell('Đăng Nhập Tài Khoản — CutTayShop', `    <div class="auth-card-header">
      <div class="badge-capsule badge-mint" style="margin-bottom: 12px;">CutTayShop ID</div>
      <h1 class="auth-title">Chào mừng trở lại!</h1>
      <p class="auth-subtitle">Đăng nhập để theo dõi đơn hàng và tận hưởng đặc quyền CutTayShop+</p>
    </div>

    <div class="demo-auth-hint" style="background: var(--color-bg-secondary); padding: 12px 16px; border-radius: var(--radius-md); font-size: 0.8125rem; color: var(--color-text-secondary); margin-bottom: 20px;">
      💡 <strong>Chế độ Demo:</strong> Bạn có thể dùng bất kỳ email và mật khẩu mẫu nào (hoặc nhấn đăng nhập ngay) để trải nghiệm giao diện tài khoản.
    </div>

    ${regOk}
    ${ok}
    ${error}

    <form action="/dang-nhap" method="post">
      <input type="hidden" name="returnUrl" value="${esc(returnUrl || '')}" />

      <div class="form-group" style="margin-bottom: 16px;">
        <label class="form-label">Email hoặc Số điện thoại <span class="required">*</span></label>
        <input name="identifier" class="form-control" placeholder="nguyenvanan@gmail.com" value="nguyenvanan@gmail.com" required />
      </div>

      <div class="form-group" style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <label class="form-label">Mật khẩu <span class="required">*</span></label>
          <a href="/quen-mat-khau" style="font-size: 0.8125rem; color: var(--color-primary);">Quên mật khẩu?</a>
        </div>
        <input name="password" class="form-control" type="password" placeholder="••••••••" value="demo123456" required />
      </div>

      <div class="form-group" style="margin-bottom: 20px; display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" name="rememberMe" id="RememberMe" value="true" checked />
        <label for="RememberMe" style="font-size: 0.875rem; cursor: pointer;">Ghi nhớ đăng nhập</label>
      </div>

      <button type="submit" class="btn-pill btn-pill-primary btn-block btn-pill-lg">
        Đăng nhập ngay →
      </button>

      <div class="auth-divider" style="text-align: center; margin: 24px 0; position: relative;">
        <span style="background: var(--color-bg-primary); padding: 0 12px; color: var(--color-text-muted); font-size: 0.8125rem;">hoặc</span>
      </div>

      <a href="/dang-nhap-google" class="btn-pill btn-pill-secondary btn-block" style="display: flex; justify-content: center; align-items: center; gap: 8px;">
        <span>🌐 Tiếp tục với Google (1-Click)</span>
      </a>

      <div style="text-align: center; margin-top: 24px; font-size: 0.875rem; color: var(--color-text-secondary);">
        Chưa có tài khoản? <a href="/dang-ky" style="color: var(--color-primary); font-weight: 600;">Đăng ký ngay</a> nhận voucher 20k
      </div>
    </form>`);
}

export function renderRegister({ errors = {} } = {}) {
  const field = (name, label, type, placeholder, extra = '') => {
    const err = errors[name] ? `<span class="field-validation-error">${esc(errors[name])}</span>` : '';
    return `      <div class="form-group" style="margin-bottom: 16px;">
        <label class="form-label">${label} <span class="required">*</span></label>
        <input name="${name}" class="form-control" type="${type}" placeholder="${placeholder}" required${extra} />
        ${err}
      </div>`;
  };

  return authShell('Đăng Ký Tài Khoản Mới — CutTayShop', `    <div class="auth-card-header">
      <div class="badge-capsule badge-peach" style="margin-bottom: 12px;">Ưu đãi thành viên mới</div>
      <h1 class="auth-title">Tạo tài khoản CutTayShop</h1>
      <p class="auth-subtitle">Nhận ngay voucher 20.000đ và tích điểm nâng hạng thành viên</p>
    </div>

    <form action="/dang-ky" method="post">
${field('fullName', 'Họ và tên', 'text', 'Ví dụ: Nguyễn Văn An')}
${field('email', 'Địa chỉ Email', 'email', 'an.nguyen@example.com')}
${field('phoneNumber', 'Số điện thoại', 'text', '0988 123 456')}
${field('password', 'Mật khẩu', 'password', 'Tối thiểu 6 ký tự')}
${field('confirmPassword', 'Xác nhận mật khẩu', 'password', 'Nhập lại mật khẩu')}

      <button type="submit" class="btn-pill btn-pill-primary btn-block btn-pill-lg">
        Đăng ký tài khoản →
      </button>

      <div style="text-align: center; margin-top: 24px; font-size: 0.875rem; color: var(--color-text-secondary);">
        Đã có tài khoản? <a href="/dang-nhap" style="color: var(--color-primary); font-weight: 600;">Đăng nhập ngay</a>
      </div>
    </form>`);
}

export function renderForgotPassword({ successMessage, demoResetLink, errors = {} }) {
  const err = errors.email ? `<span class="field-validation-error">${esc(errors.email)}</span>` : '';
  const success = successMessage
    ? `<div class="alert alert-success" style="margin-bottom: 20px;">
        ${esc(successMessage)}
        ${demoResetLink ? `<div style="margin-top: 12px;"><a href="${esc(demoResetLink)}" class="btn-pill btn-pill-primary btn-sm">Bấm vào đây để tiếp tục Demo →</a></div>` : ''}
      </div>`
    : '';

  return authShell('Quên Mật Khẩu — CutTayShop', `    <div class="auth-card-header">
      <div class="badge-capsule badge-sky" style="margin-bottom: 12px;">Khôi phục quyền truy cập</div>
      <h1 class="auth-title">Quên mật khẩu?</h1>
      <p class="auth-subtitle">Nhập email đăng ký của bạn để nhận liên kết đặt lại mật khẩu an toàn.</p>
    </div>

    ${success}

    <form action="/quen-mat-khau" method="post">
      <div class="form-group" style="margin-bottom: 20px;">
        <label class="form-label">Email tài khoản <span class="required">*</span></label>
        <input name="email" class="form-control" type="email" placeholder="an.nguyen@example.com" value="an.nguyen@example.com" required />
        ${err}
      </div>

      <button type="submit" class="btn-pill btn-pill-primary btn-block btn-pill-lg">
        Gửi liên kết khôi phục →
      </button>

      <div style="text-align: center; margin-top: 24px; font-size: 0.875rem;">
        <a href="/dang-nhap" style="color: var(--color-text-secondary);">← Quay lại trang đăng nhập</a>
      </div>
    </form>`);
}

export function renderResetPassword({ token, errors = {} }) {
  const errNew = errors.newPassword ? `<span class="field-validation-error">${esc(errors.newPassword)}</span>` : '';
  const errConfirm = errors.confirmPassword ? `<span class="field-validation-error">${esc(errors.confirmPassword)}</span>` : '';

  return authShell('Đặt Lại Mật Khẩu — CutTayShop', `    <div class="auth-card-header">
      <div class="badge-capsule badge-mint" style="margin-bottom: 12px;">Mật khẩu mới</div>
      <h1 class="auth-title">Thiết lập mật khẩu mới</h1>
      <p class="auth-subtitle">Vui lòng nhập mật khẩu mới an toàn với tối thiểu 6 ký tự.</p>
    </div>

    <form action="/dat-lai-mat-khau" method="post">
      <input type="hidden" name="token" value="${esc(token || 'DEMO-TOKEN')}" />

      <div class="form-group" style="margin-bottom: 16px;">
        <label class="form-label">Mật khẩu mới <span class="required">*</span></label>
        <input name="newPassword" class="form-control" type="password" placeholder="Tối thiểu 6 ký tự" required />
        ${errNew}
      </div>

      <div class="form-group" style="margin-bottom: 24px;">
        <label class="form-label">Xác nhận mật khẩu mới <span class="required">*</span></label>
        <input name="confirmPassword" class="form-control" type="password" placeholder="Nhập lại mật khẩu mới" required />
        ${errConfirm}
      </div>

      <button type="submit" class="btn-pill btn-pill-primary btn-block btn-pill-lg">
        Xác nhận đặt lại mật khẩu →
      </button>
    </form>`);
}

export function renderVerifyEmail() {
  return authShell('Xác Minh Email — CutTayShop', `    <div class="auth-card-header">
      <div class="badge-capsule badge-mint" style="margin-bottom: 12px;">Kích hoạt tài khoản</div>
      <h1 class="auth-title">Kiểm tra hộp thư của bạn</h1>
      <p class="auth-subtitle">Chúng tôi đã gửi một liên kết xác minh tới email đăng ký của bạn.</p>
    </div>

    <div style="background: var(--color-bg-secondary); padding: 20px; border-radius: var(--radius-md); font-size: 0.9375rem; color: var(--color-text-secondary); line-height: 1.6;">
      <p style="margin-bottom: 12px;">📧 Mở email và bấm vào nút <strong>“Xác minh email”</strong> để hoàn tất kích hoạt tài khoản CutTayShop.</p>
      <p style="margin: 0;">Nếu không nhận được email sau 5 phút, vui lòng kiểm tra thư mục Spam hoặc liên hệ hotline <strong>1900 8888</strong>.</p>
    </div>

    <div style="text-align: center; margin-top: 24px; font-size: 0.875rem;">
      <a href="/dang-nhap" style="color: var(--color-primary); font-weight: 600;">← Quay lại trang đăng nhập</a>
    </div>`);
}
