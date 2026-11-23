/** Cổng quản trị Admin — CRUD thật, dữ liệu từ SQLite. */
import { esc, n0, dmy, dmyhm } from '../format.mjs';

/**
 * Người dùng đang đăng nhập, được server gắn trước mỗi lần render.
 * Tránh phải truyền `user` qua từng hàm view.
 */
let currentAdminUser = null;

export function setAdminUser(user) {
  currentAdminUser = user;
}

/* ------------------------------------------------------------------ layout */

const MENU = [
  { section: 'TỔNG QUAN' },
  { href: '/admin', icon: '📊', label: 'Dashboard', match: ['Dashboard'] },
  { href: '/admin/bao-cao', icon: '📈', label: 'Báo cáo doanh thu', match: ['Report'] },
  { section: 'QUẢN LÝ BÁN HÀNG' },
  { href: '/admin/don-hang', icon: '📦', label: 'Quản lý Đơn hàng', match: ['Order'] },
  { href: '/admin/khach-hang', icon: '👥', label: 'Quản lý Khách hàng', match: ['Customer'] },
  { section: 'DANH MỤC & KHO' },
  { href: '/admin/san-pham', icon: '🛍️', label: 'Quản lý Sản phẩm', match: ['Product'] },
  { href: '/admin/danh-muc', icon: '📂', label: 'Quản lý Danh mục', match: ['Category'] },
  { href: '/admin/ton-kho', icon: '🏬', label: 'Quản lý Tồn kho', match: ['Inventory'] },
  { section: 'MARKETING & CMS' },
  { href: '/admin/khuyen-mai', icon: '🎟️', label: 'Quản lý Voucher', match: ['Promotion:Coupons'] },
  { href: '/admin/flash-sale', icon: '⚡', label: 'Cài đặt Flash Sale', match: ['Promotion:FlashSale'] },
  { href: '/admin/banner-cms', icon: '🖼️', label: 'Quản lý Banner CMS', match: ['Banner'] },
  { href: '/admin/bai-viet', icon: '✍️', label: 'Quản trị Blog', match: ['BlogAdmin'] },
  { href: '/admin/danh-gia', icon: '⭐', label: 'Duyệt Đánh giá', match: ['Review'] },
  { section: 'HỆ THỐNG' },
  { href: '/admin/ho-tro', icon: '💬', label: 'Hỗ trợ khách hàng', match: ['Support'] },
  { href: '/admin/phan-quyen', icon: '🛡️', label: 'Quyền & Thành viên', match: ['Role'] },
  { href: '/admin/nguoi-dung', icon: '👤', label: 'Tài khoản', match: ['Users'] },
  { href: '/admin/nhat-ky', icon: '📋', label: 'Nhật ký thao tác', match: ['Audit'] },
  { href: '/admin/cai-dat', icon: '⚙️', label: 'Cài đặt hệ thống', match: ['Setting'] },
];

function sidebar(activeKey) {
  return MENU.map((entry) => {
    if (entry.section) return `        <div class="menu-section-label">${entry.section}</div>`;
    const isActive = entry.match.includes(activeKey);
    return `        <a href="${entry.href}" class="admin-menu-item${isActive ? ' active' : ''}">
          <span class="menu-icon">${entry.icon}</span> ${entry.label}
        </a>`;
  }).join('\n');
}

export function adminLayout({ title, body, activeKey = '', user = null }) {
  const currentUser = user || currentAdminUser;
  const initials = currentUser
    ? currentUser.fullName.split(' ').filter(Boolean).slice(-2).map((w) => w[0]).join('').toUpperCase()
    : 'AD';

  return `<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)} — CutTayShop Admin Portal</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/css/design-system.css" />
  <link rel="stylesheet" href="/css/tokens-compat.css" />
  <link rel="stylesheet" href="/css/motion-tokens.css" />
  <link rel="stylesheet" href="/css/admin-portal.css" />
  <link rel="stylesheet" href="/css/responsive-fixes.css" />
</head>
<body class="admin-body">
  <div class="admin-wrapper">
    <aside class="admin-sidebar" id="adminSidebar">
      <div class="admin-sidebar-header">
        <a href="/admin" class="admin-brand-logo">
          <span>CutTay</span><span class="badge-admin">Admin</span>
        </a>
        <button type="button" class="admin-sidebar-close" id="adminSidebarClose" aria-label="Đóng menu">✕</button>
      </div>

      <nav class="admin-sidebar-menu">
${sidebar(activeKey)}
      </nav>

      <div class="admin-sidebar-footer">
        <a href="/" class="btn-storefront-link" target="_blank">
          <span>🌐 Xem Website Storefront</span>
        </a>
      </div>
    </aside>

    <div class="admin-main">
      <header class="admin-topbar">
        <button type="button" class="admin-mobile-toggle" id="adminSidebarToggle" aria-label="Mở menu">
          ☰
        </button>

        <form class="admin-search-box" action="/admin/san-pham" method="get">
          <input type="search" name="q" placeholder="Tìm nhanh sản phẩm..." class="admin-search-input" />
        </form>

        <div class="admin-topbar-actions">
          <button type="button" class="btn-icon" data-theme-toggle aria-label="Đổi theme">
            🌓
          </button>
          <div class="admin-user-pill">
            <span class="admin-avatar">${esc(initials)}</span>
            <span class="admin-username">${esc(currentUser ? currentUser.fullName : 'Admin CutTay')}</span>
          </div>
          <form action="/dang-xuat" method="post" style="margin: 0;">
            <button type="submit" class="btn-pill btn-pill-ghost btn-sm" title="Đăng xuất">Đăng xuất</button>
          </form>
        </div>
      </header>

      <main class="admin-content-area">
        ${body}
      </main>
    </div>
  </div>

  <script src="/js/theme-toggle.js"></script>
  <script>
    document.getElementById('adminSidebarToggle')?.addEventListener('click', function() {
      document.getElementById('adminSidebar')?.classList.toggle('open');
    });
    document.getElementById('adminSidebarClose')?.addEventListener('click', function() {
      document.getElementById('adminSidebar')?.classList.remove('open');
    });
  </script>
</body>
</html>`;
}

/* --------------------------------------------------------------- tiện ích */

function notice(message, type = 'success') {
  if (!message) return '';
  return `<div class="alert alert-${type}" style="margin-bottom: 24px;">${esc(message)}</div>`;
}

function pageHeader({ title, subtitle, actions = '' }) {
  return `<div class="admin-page-header">
  <div>
    <h1 class="admin-page-title">${esc(title)}</h1>
    ${subtitle ? `<p class="text-muted">${esc(subtitle)}</p>` : ''}
  </div>
  ${actions ? `<div style="display: flex; gap: 10px; flex-wrap: wrap;">${actions}</div>` : ''}
</div>`;
}

function card(inner, extraStyle = '') {
  return `<div class="admin-card" style="background: var(--color-bg-primary); border: 1px solid var(--color-border); border-radius: var(--radius-lg); ${extraStyle}">
${inner}
</div>`;
}

function table(headers, rows, { empty = 'Chưa có dữ liệu.' } = {}) {
  const head = headers.map((h) => `<th style="padding: 12px;">${h}</th>`).join('');
  const body = rows.length
    ? rows.join('\n')
    : `<tr><td colspan="${headers.length}" style="padding: 32px; text-align: center; color: var(--color-text-muted);">${esc(empty)}</td></tr>`;

  return `<div style="overflow-x: auto;">
    <table class="table-styled" style="width: 100%;">
      <thead>
        <tr style="text-align: left; background: var(--color-bg-secondary);">${head}</tr>
      </thead>
      <tbody>
${body}
      </tbody>
    </table>
  </div>`;
}

function field({ label, name, value = '', type = 'text', required = false, placeholder = '', hint = '' }) {
  return `    <div class="form-group" style="margin-bottom: 18px;">
      <label class="form-label">${esc(label)}${required ? ' <span class="required">*</span>' : ''}</label>
      <input type="${type}" name="${name}" class="form-control" value="${esc(value)}"${required ? ' required' : ''}${placeholder ? ` placeholder="${esc(placeholder)}"` : ''} />
      ${hint ? `<span class="text-muted" style="font-size: 0.75rem;">${esc(hint)}</span>` : ''}
    </div>`;
}

function textarea({ label, name, value = '', rows = 4, placeholder = '' }) {
  return `    <div class="form-group" style="margin-bottom: 18px;">
      <label class="form-label">${esc(label)}</label>
      <textarea name="${name}" class="form-control" rows="${rows}"${placeholder ? ` placeholder="${esc(placeholder)}"` : ''}>${esc(value)}</textarea>
    </div>`;
}

function select({ label, name, value, options, required = false }) {
  const opts = options.map((o) => {
    const val = typeof o === 'string' ? o : o.value;
    const text = typeof o === 'string' ? o : o.label;
    return `<option value="${esc(val)}"${String(value) === String(val) ? ' selected' : ''}>${esc(text)}</option>`;
  }).join('\n        ');

  return `    <div class="form-group" style="margin-bottom: 18px;">
      <label class="form-label">${esc(label)}${required ? ' <span class="required">*</span>' : ''}</label>
      <select name="${name}" class="form-control"${required ? ' required' : ''}>
        ${opts}
      </select>
    </div>`;
}

function checkbox({ label, name, checked }) {
  return `    <div class="form-group" style="margin-bottom: 18px; display: flex; align-items: center; gap: 8px;">
      <input type="checkbox" name="${name}" id="cb-${name}"${checked ? ' checked' : ''} />
      <label for="cb-${name}" style="font-size: 0.875rem; cursor: pointer;">${esc(label)}</label>
    </div>`;
}

/* -------------------------------------------------------------- dashboard */

export function renderAdminDashboard(model) {
  const s = model.stats || {};

  const kpi = (label, value, icon, note, noteClass = 'badge-mint') => `
  <div class="kpi-card" style="padding: 20px; background: var(--color-bg-primary); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span class="text-muted" style="font-size: 0.875rem;">${label}</span>
      <span style="font-size: 1.5rem;">${icon}</span>
    </div>
    <div style="font-size: 1.75rem; font-weight: 800; margin: 8px 0 4px;">${value}</div>
    <span class="badge-capsule ${noteClass}" style="font-size: 0.75rem;">${note}</span>
  </div>`;

  const topProducts = model.topProducts.slice(0, 5).map((prod) => `        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${esc(prod.imageUrl)}" alt="${esc(prod.name)}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm);" />
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 0.875rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${esc(prod.name)}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-secondary);">Đã bán: ${prod.soldCount} món</div>
          </div>
          <strong style="font-size: 0.875rem;">${n0(prod.price)} ₫</strong>
        </div>`).join('\n');

  const body = `${pageHeader({
    title: 'Dashboard Tổng Quan',
    subtitle: 'Số liệu thật từ cơ sở dữ liệu — doanh thu, đơn hàng và tồn kho.',
    actions: '<a href="/admin/san-pham/them-moi" class="btn-pill btn-pill-primary btn-sm">+ Thêm sản phẩm mới</a>',
  })}

<div class="admin-kpi-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 24px;">
  ${kpi('DOANH THU HÔM NAY', `${n0(s.revenueToday)} ₫`, '💰', `${s.ordersToday} đơn hôm nay`)}
  ${kpi('TỔNG DOANH THU', `${n0(s.totalRevenue)} ₫`, '📈', `${s.totalOrders} đơn hàng`)}
  ${kpi('KHÁCH HÀNG', s.totalCustomers, '👥', 'Tài khoản đã đăng ký', 'badge-sky')}
  ${kpi('CẢNH BÁO TỒN KHO', `${s.lowStock} SP`, '⚠️', 'Sản phẩm còn ≤ 10', 'badge-peach')}
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-top: 20px;">
  ${kpi('ĐÁNH GIÁ CHỜ DUYỆT', s.pendingReviews, '⭐', 'Cần kiểm duyệt', 'badge-peach')}
  ${kpi('TIN NHẮN MỚI', s.newMessages, '💬', 'Từ biểu mẫu liên hệ', 'badge-sky')}
</div>

<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 32px;" class="admin-dashboard-split">
  ${card(`    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <h2 style="font-size: 1.125rem; font-weight: 700; margin: 0;">Đơn hàng mới nhận</h2>
      <a href="/admin/don-hang" style="font-size: 0.875rem; color: var(--color-primary);">Xem tất cả →</a>
    </div>
    ${table(['Mã đơn', 'Khách hàng', 'Tổng tiền', 'Trạng thái', 'Xử lý'], model.recentOrders.map((o) => `            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 10px;"><strong>#${esc(o.orderCode)}</strong></td>
              <td style="padding: 10px;">${esc(o.customerName)}</td>
              <td style="padding: 10px; font-weight: 600;">${n0(o.totalAmount)} ₫</td>
              <td style="padding: 10px;"><span class="badge-capsule badge-mint">${esc(o.status)}</span></td>
              <td style="padding: 10px;"><a href="/admin/don-hang/chi-tiet/${o.id}" class="btn-pill btn-pill-secondary btn-sm">Xem</a></td>
            </tr>`), { empty: 'Chưa có đơn hàng.' })}`, 'padding: 24px;')}

  ${card(`    <h2 style="font-size: 1.125rem; font-weight: 700; margin: 0 0 20px;">Sản phẩm bán chạy</h2>
    <div style="display: flex; flex-direction: column; gap: 14px;">
${topProducts}
    </div>`, 'padding: 24px;')}
</div>`;

  return adminLayout({ title: 'Dashboard Quản Trị', body, activeKey: 'Dashboard' });
}

/* -------------------------------------------------------------- sản phẩm */

export function renderAdminProducts({ products, categories, selectedCategory, searchQuery, notice: msg }) {
  const options = categories.map((cat) =>
    `<option value="${esc(cat.slug)}"${selectedCategory === cat.slug ? ' selected' : ''}>${esc(cat.name)}</option>`).join('\n      ');

  const rows = products.map((prod) => {
    const stock = prod.totalStock > 10
      ? `<span>${prod.totalStock}</span>`
      : `<span class="badge-capsule badge-peach">Còn ít: ${prod.totalStock}</span>`;

    return `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px; color: var(--color-text-muted);">#${prod.id}</td>
            <td style="padding: 12px;">
              <img src="${esc(prod.imageUrl)}" alt="${esc(prod.name)}" style="width: 48px; height: 48px; object-fit: cover; border-radius: var(--radius-sm);" />
            </td>
            <td style="padding: 12px;">
              <strong>${esc(prod.name)}</strong>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">${esc(prod.brand)}</div>
            </td>
            <td style="padding: 12px;">${esc(prod.categoryName)}</td>
            <td style="padding: 12px;"><strong>${n0(prod.price)} ₫</strong></td>
            <td style="padding: 12px;">${stock}</td>
            <td style="padding: 12px;">
              <span class="badge-capsule ${prod.inStock ? 'badge-mint' : 'badge-peach'}">${prod.inStock ? 'Đang bán' : 'Ngừng bán'}</span>
            </td>
            <td style="padding: 12px; text-align: right; white-space: nowrap;">
              <a href="/admin/san-pham/chinh-sua/${prod.id}" class="btn-pill btn-pill-secondary btn-sm">Sửa</a>
              <a href="/admin/san-pham/${prod.id}/bien-the" class="btn-pill btn-pill-ghost btn-sm">SKU</a>
              <form action="/admin/san-pham/xoa/${prod.id}" method="post" style="display: inline;" onsubmit="return confirm('Xoá sản phẩm &quot;${esc(prod.name).replace(/"/g, '&quot;')}&quot;?');">
                <button type="submit" class="btn-pill btn-pill-ghost btn-sm" style="color: var(--color-danger);">Xoá</button>
              </form>
            </td>
          </tr>`;
  });

  const body = `${pageHeader({
    title: `Quản Lý Sản Phẩm (${products.length} món)`,
    subtitle: 'Thêm, sửa, xoá sản phẩm trực tiếp trong cơ sở dữ liệu.',
    actions: '<a href="/admin/san-pham/them-moi" class="btn-pill btn-pill-primary">+ Thêm sản phẩm mới</a>',
  })}

${notice(msg)}

${card(`  <form method="get" action="/admin/san-pham" style="display: flex; gap: 12px; flex-wrap: wrap;">
    <input type="search" name="q" value="${esc(searchQuery || '')}" placeholder="Tìm tên, thương hiệu..." class="form-control" style="max-width: 280px;" />
    <select name="category" class="form-control" style="max-width: 200px;">
      <option value="">Tất cả ngành hàng</option>
      ${options}
    </select>
    <button type="submit" class="btn-pill btn-pill-secondary">Lọc dữ liệu</button>
    <a href="/admin/san-pham" class="btn-pill btn-pill-ghost">Đặt lại</a>
  </form>`, 'padding: 16px; margin: 20px 0;')}

${card(table(
    ['ID', 'Hình ảnh', 'Tên sản phẩm', 'Ngành hàng', 'Giá bán', 'Tồn kho', 'Trạng thái', 'Hành động'],
    rows,
    { empty: 'Không có sản phẩm nào khớp bộ lọc.' },
  ), 'overflow: hidden;')}`;

  return adminLayout({ title: 'Quản Lý Sản Phẩm — Admin', body, activeKey: 'Product' });
}

function productForm({ product, categories, isNew, errorMessage }) {
  const options = categories.map((cat) =>
    `<option value="${esc(cat.slug)}"${product.categorySlug === cat.slug ? ' selected' : ''}>${esc(cat.name)}</option>`).join('\n        ');

  return `${notice(errorMessage, 'danger')}
  <form action="${isNew ? '/admin/san-pham/them-moi' : `/admin/san-pham/chinh-sua/${product.id}`}" method="post">
${field({ label: 'Tên sản phẩm', name: 'name', value: product.name, required: true, placeholder: 'Ví dụ: Loa Bluetooth Mini Fabric Sound 2026' })}

    <div class="form-row-2" style="margin-bottom: 18px;">
      <div class="form-group">
        <label class="form-label">Ngành hàng <span class="required">*</span></label>
        <select name="categorySlug" class="form-control" required>
        ${options}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Thương hiệu</label>
        <input type="text" name="brand" class="form-control" value="${esc(product.brand)}" placeholder="Ví dụ: CutTay Studio" />
      </div>
    </div>

    <div class="form-row-2" style="margin-bottom: 18px;">
      <div class="form-group">
        <label class="form-label">Giá bán (VNĐ) <span class="required">*</span></label>
        <input type="number" name="price" class="form-control" value="${product.price || ''}" placeholder="590000" required />
      </div>
      <div class="form-group">
        <label class="form-label">Giá gốc / gạch ngang (VNĐ)</label>
        <input type="number" name="originalPrice" class="form-control" value="${product.originalPrice || ''}" placeholder="990000" />
      </div>
    </div>

    <div class="form-row-2" style="margin-bottom: 18px;">
      <div class="form-group">
        <label class="form-label">Đường dẫn hình ảnh <span class="required">*</span></label>
        <input type="text" name="imageUrl" class="form-control" value="${esc(product.imageUrl || '/images/products/speaker-mini.webp')}" required />
      </div>
      <div class="form-group">
        <label class="form-label">${isNew ? 'Số lượng tồn ban đầu' : 'Số lượng tồn kho'}</label>
        <input type="number" name="totalStock" class="form-control" value="${product.totalStock ?? 50}" />
      </div>
    </div>

${field({ label: 'Nhãn hiển thị (badge)', name: 'badgeText', value: product.badgeText || '', placeholder: 'Ví dụ: Deal Hot -40%' })}
${field({ label: 'Mô tả ngắn', name: 'shortDescription', value: product.shortDescription, placeholder: 'Đặc điểm nổi bật trong 1 câu...' })}
${textarea({ label: 'Mô tả chi tiết', name: 'description', value: product.description, rows: 5, placeholder: 'Thông số, công nghệ, bảo hành...' })}

    <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 24px;">
${checkbox({ label: 'Deal Hot', name: 'isHotDeal', checked: product.isHotDeal })}
${checkbox({ label: 'Sản phẩm nổi bật', name: 'isFeatured', checked: product.isFeatured })}
${checkbox({ label: 'Hàng mới về', name: 'isNewArrival', checked: product.isNewArrival })}
    </div>

    <div style="display: flex; gap: 12px;">
      <button type="submit" class="btn-pill btn-pill-primary btn-pill-lg">${isNew ? 'Lưu sản phẩm mới' : 'Lưu thay đổi'} →</button>
      <a href="/admin/san-pham" class="btn-pill btn-pill-ghost btn-pill-lg">Hủy bỏ</a>
    </div>
  </form>`;
}

export function renderAdminProductCreate({ product, categories, errorMessage }) {
  const body = `${pageHeader({
    title: 'Thêm Mới Sản Phẩm',
    subtitle: 'Sản phẩm sẽ được ghi trực tiếp vào cơ sở dữ liệu.',
    actions: '<a href="/admin/san-pham" class="btn-pill btn-pill-ghost">← Quay lại danh sách</a>',
  })}

${card(productForm({ product, categories, isNew: true, errorMessage }), 'max-width: 800px; padding: 32px; margin-top: 24px;')}`;

  return adminLayout({ title: 'Thêm Mới Sản Phẩm — Admin', body, activeKey: 'Product' });
}

export function renderAdminProductEdit({ product, categories, errorMessage }) {
  const body = `${pageHeader({
    title: `Chỉnh Sửa: ${product.name}`,
    subtitle: `ID #${product.id} · /san-pham/${product.slug}`,
    actions: '<a href="/admin/san-pham" class="btn-pill btn-pill-ghost">← Quay lại danh sách</a>',
  })}

${card(productForm({ product, categories, isNew: false, errorMessage }), 'max-width: 800px; padding: 32px; margin-top: 24px;')}`;

  return adminLayout({ title: `Chỉnh Sửa Sản Phẩm #${product.id} — Admin`, body, activeKey: 'Product' });
}

/* -------------------------------------------------------------- danh mục */

export function renderAdminCategories({ categories, notice: msg, error }) {
  const rows = categories.map((cat) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px; font-weight: 700;">${cat.sortOrder}</td>
            <td style="padding: 12px;">
              <img src="${esc(cat.imageUrl)}" alt="${esc(cat.name)}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm);" />
            </td>
            <td style="padding: 12px;"><strong>${esc(cat.name)}</strong></td>
            <td style="padding: 12px; color: var(--color-text-muted);">/danh-muc/${esc(cat.slug)}</td>
            <td style="padding: 12px;"><span class="badge-capsule badge-sky">${cat.productCount} sản phẩm</span></td>
            <td style="padding: 12px; text-align: right; white-space: nowrap;">
              <a href="/danh-muc/${esc(cat.slug)}" target="_blank" class="btn-pill btn-pill-ghost btn-sm">Xem</a>
              <form action="/admin/danh-muc/xoa/${cat.id}" method="post" style="display: inline;" onsubmit="return confirm('Xoá danh mục &quot;${esc(cat.name).replace(/"/g, '&quot;')}&quot;?');">
                <button type="submit" class="btn-pill btn-pill-ghost btn-sm" style="color: var(--color-danger);">Xoá</button>
              </form>
            </td>
          </tr>`);

  const body = `${pageHeader({
    title: `Quản Lý Danh Mục (${categories.length})`,
    subtitle: 'Cây phân loại sản phẩm hiển thị trên menu và trang chủ.',
  })}

${notice(msg)}
${notice(error, 'danger')}

${card(`  <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Thêm danh mục mới</h2>
  <form action="/admin/danh-muc/them-moi" method="post" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; align-items: end;">
    <div class="form-group">
      <label class="form-label">Tên danh mục <span class="required">*</span></label>
      <input type="text" name="name" class="form-control" required placeholder="Ví dụ: Đồ gia dụng" />
    </div>
    <div class="form-group">
      <label class="form-label">Màu nền</label>
      <input type="color" name="bgColorHex" class="form-control" value="#E0F2FE" style="height: 42px;" />
    </div>
    <div class="form-group">
      <label class="form-label">Màu icon</label>
      <input type="color" name="iconColorHex" class="form-control" value="#0284C7" style="height: 42px;" />
    </div>
    <div class="form-group">
      <label class="form-label">Thứ tự</label>
      <input type="number" name="sortOrder" class="form-control" value="${categories.length + 1}" />
    </div>
    <div class="form-group">
      <label class="form-label">Ảnh (URL)</label>
      <input type="text" name="imageUrl" class="form-control" placeholder="/images/categories/..." />
    </div>
    <button type="submit" class="btn-pill btn-pill-primary" style="height: 42px;">+ Thêm</button>
  </form>`, 'padding: 24px; margin: 24px 0;')}

${card(table(['Thứ tự', 'Ảnh', 'Tên ngành hàng', 'Slug', 'Số SP', 'Thao tác'], rows), 'overflow: hidden;')}`;

  return adminLayout({ title: 'Quản Lý Danh Mục — Admin', body, activeKey: 'Category' });
}

/* -------------------------------------------------------------- đơn hàng */

export function renderAdminOrders({ orders, selectedStatus, statuses = [], notice: msg }) {
  const chip = (href, label, key) =>
    `<a href="${href}" class="filter-chip${(selectedStatus || '') === key ? ' active' : ''}">${label}</a>`;

  const rows = orders.map((order) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;"><strong>#${esc(order.orderCode)}</strong></td>
            <td style="padding: 12px;">${dmyhm(order.createdAt)}</td>
            <td style="padding: 12px;">
              <div>${esc(order.customerName)}</div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">${esc(order.phoneNumber)}</div>
            </td>
            <td style="padding: 12px; font-size: 0.8125rem;">${esc(order.paymentMethod)}</td>
            <td style="padding: 12px; font-weight: 700; color: var(--color-primary);">${n0(order.totalAmount)} ₫</td>
            <td style="padding: 12px;"><span class="badge-capsule badge-mint">${esc(order.status)}</span></td>
            <td style="padding: 12px; text-align: right; white-space: nowrap;">
              <a href="/admin/don-hang/chi-tiet/${order.id}" class="btn-pill btn-pill-secondary btn-sm">Chi tiết</a>
              <a href="/admin/don-hang/in-phieu/${order.id}" target="_blank" class="btn-pill btn-pill-ghost btn-sm">In</a>
            </td>
          </tr>`);

  const body = `${pageHeader({
    title: `Quản Lý Đơn Hàng (${orders.length} đơn)`,
    subtitle: 'Cập nhật trạng thái và mã vận đơn trực tiếp.',
  })}

${notice(msg)}

${card(`  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    ${chip('/admin/don-hang', 'Tất cả đơn', '')}
    ${statuses.map((s) => chip(`/admin/don-hang?status=${encodeURIComponent(s)}`, s, s)).join('\n    ')}
  </div>`, 'padding: 16px; margin: 20px 0;')}

${card(table(
    ['Mã đơn', 'Ngày tạo', 'Khách hàng', 'Phương thức', 'Tổng tiền', 'Trạng thái', 'Thao tác'],
    rows,
    { empty: 'Không có đơn hàng nào.' },
  ), 'overflow: hidden;')}`;

  return adminLayout({ title: 'Quản Lý Đơn Hàng — Admin', body, activeKey: 'Order' });
}

export function renderAdminOrderDetail({ order, statuses = [], notice: msg }) {
  const items = order.items.map((item) => `            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 10px; display: flex; align-items: center; gap: 10px;">
                <img src="${esc(item.imageUrl)}" alt="${esc(item.productName)}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm);" />
                <div>
                  <strong>${esc(item.productName)}</strong>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">${esc(item.variantName || '')}</div>
                </div>
              </td>
              <td style="padding: 10px;">${n0(item.unitPrice)} ₫</td>
              <td style="padding: 10px;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right; font-weight: 600;">${n0(item.totalPrice)} ₫</td>
            </tr>`).join('\n');

  const statusOptions = statuses
    .map((s) => `<option value="${esc(s)}"${order.status === s ? ' selected' : ''}>${esc(s)}</option>`)
    .join('\n        ');

  const body = `${pageHeader({
    title: `Xử Lý Đơn Hàng #${order.orderCode}`,
    subtitle: `Ngày tạo: ${dmyhm(order.createdAt)}`,
    actions: `<a href="/admin/don-hang" class="btn-pill btn-pill-ghost">← Danh sách</a>
      <a href="/admin/don-hang/in-phieu/${order.id}" target="_blank" class="btn-pill btn-pill-secondary">🖨️ In phiếu</a>`,
  })}

${notice(msg)}

<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 24px;" class="admin-order-split">
  ${card(`    <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Sản phẩm đặt mua</h2>
    ${table(['Sản phẩm', 'Đơn giá', 'SL', 'Thành tiền'], order.items.map((item) => `            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 10px; display: flex; align-items: center; gap: 10px;">
                <img src="${esc(item.imageUrl)}" alt="${esc(item.productName)}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm);" />
                <div>
                  <strong>${esc(item.productName)}</strong>
                  <div style="font-size: 0.75rem; color: var(--color-text-muted);">${esc(item.variantName || '')}</div>
                </div>
              </td>
              <td style="padding: 10px;">${n0(item.unitPrice)} ₫</td>
              <td style="padding: 10px;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right; font-weight: 600;">${n0(item.totalPrice)} ₫</td>
            </tr>`))}

    <div style="max-width: 280px; margin-left: auto; margin-top: 20px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
        <span>Tạm tính:</span><span>${n0(order.subtotal)} ₫</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
        <span>Phí ship:</span><span>${n0(order.shippingFee)} ₫</span>
      </div>
      ${order.discount > 0 ? `<div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: var(--color-danger);">
        <span>Giảm giá:</span><span>-${n0(order.discount)} ₫</span>
      </div>` : ''}
      <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.125rem; border-top: 1px solid var(--color-border); padding-top: 8px;">
        <span>Tổng thu:</span><span style="color: var(--color-primary);">${n0(order.totalAmount)} ₫</span>
      </div>
    </div>`, 'padding: 24px;')}

  <div style="display: flex; flex-direction: column; gap: 24px;">
    ${card(`      <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Thông tin khách hàng</h2>
      <p style="margin: 0 0 6px;"><strong>${esc(order.customerName)}</strong></p>
      <p style="margin: 0 0 6px; font-size: 0.875rem;">SĐT: ${esc(order.phoneNumber)}</p>
      <p style="margin: 0 0 6px; font-size: 0.875rem;">Email: ${esc(order.email || '—')}</p>
      <p style="margin: 0; font-size: 0.875rem; color: var(--color-text-secondary);">Địa chỉ: ${esc(order.shippingAddress)}</p>`, 'padding: 24px;')}

    ${card(`      <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Trạng thái đơn hàng</h2>
      <form action="/admin/don-hang/trang-thai/${order.id}" method="post">
        <select name="status" class="form-control" style="margin-bottom: 12px;">
        ${statusOptions}
        </select>
        <button type="submit" class="btn-pill btn-pill-primary btn-sm" style="width: 100%;">Cập nhật trạng thái</button>
      </form>

      <form action="/admin/don-hang/van-don/${order.id}" method="post" style="margin-top: 20px;">
        <div class="form-group">
          <label class="form-label">Mã vận đơn bưu cục</label>
          <input type="text" name="trackingNumber" class="form-control" value="${esc(order.trackingNumber || '')}" placeholder="VNPOST-..." />
        </div>
        <button type="submit" class="btn-pill btn-pill-secondary btn-sm" style="width: 100%;">Lưu mã vận đơn</button>
      </form>`, 'padding: 24px;')}
  </div>
</div>`;

  return adminLayout({ title: `Xử Lý Đơn Hàng #${order.orderCode} — Admin`, body, activeKey: 'Order' });
}

export function renderAdminPrintSlip(order) {
  const rows = order.items.map((item, i) => `        <tr>
          <td style="text-align: center;">${i + 1}</td>
          <td><strong>${esc(item.productName)}</strong></td>
          <td>${esc(item.variantName || '')}</td>
          <td style="text-align: center;">${item.quantity}</td>
          <td style="text-align: right;">${n0(item.unitPrice)} ₫</td>
          <td style="text-align: right; font-weight: 700;">${n0(item.totalPrice)} ₫</td>
        </tr>`).join('\n');

  const discountLine = order.discount > 0
    ? `<div>Giảm giá voucher: -${n0(order.discount)} ₫</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <title>Phiếu Giao Hàng — #${esc(order.orderCode)} — CutTayShop</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 24px; }
    .title { font-size: 24px; font-weight: 800; margin: 0; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; }
    th { background: #f8fafc; }
    .total-box { text-align: right; font-size: 16px; margin-top: 16px; }
    .print-btn { padding: 10px 20px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; }
    @media print { .no-print { display: none; } body { padding: 0; } }
    @media (max-width: 720px) {
      body { padding: 16px; }
      .header { flex-direction: column; gap: 12px; }
      .grid { grid-template-columns: 1fr; gap: 12px; }
      table { display: block; overflow-x: auto; white-space: nowrap; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right;">
    <button type="button" class="print-btn" onclick="window.print()">🖨️ In Phiếu Giao Hàng</button>
  </div>

  <div class="header">
    <div>
      <div style="font-size: 20px; font-weight: 800; color: #0284c7;">CutTayShop</div>
      <div style="font-size: 13px; color: #64748b;">Nền tảng mua sắm thương mại điện tử hiện đại</div>
    </div>
    <div style="text-align: right;">
      <h1 class="title">PHIẾU ĐÓNG GÓI</h1>
      <div style="font-weight: 700; font-size: 16px; margin-top: 4px;">#${esc(order.orderCode)}</div>
      <div style="font-size: 13px; color: #64748b;">Ngày in: ${dmyhm(new Date())}</div>
    </div>
  </div>

  <div class="grid">
    <div>
      <strong style="color: #64748b; font-size: 12px;">ĐƠN VỊ GỬI:</strong>
      <div style="font-weight: 700; margin-top: 4px;">CutTayShop Logistics Hub</div>
      <div>Số 18, Ngõ 45 phố Nguyễn Đình Chiểu, Hai Bà Trưng, Hà Nội</div>
      <div>Hotline: 1900 8888</div>
    </div>
    <div>
      <strong style="color: #64748b; font-size: 12px;">NGƯỜI NHẬN HÀNG:</strong>
      <div style="font-weight: 700; margin-top: 4px;">${esc(order.customerName)} (${esc(order.phoneNumber)})</div>
      <div>${esc(order.shippingAddress)}</div>
      <div style="margin-top: 4px;"><strong>Phương thức:</strong> ${esc(order.paymentMethod)}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width: 50px;">STT</th>
        <th>Tên sản phẩm</th>
        <th>Phân loại</th>
        <th style="width: 60px; text-align: center;">SL</th>
        <th style="width: 120px; text-align: right;">Đơn giá</th>
        <th style="width: 140px; text-align: right;">Thành tiền</th>
      </tr>
    </thead>
    <tbody>
${rows}
    </tbody>
  </table>

  <div class="total-box">
    <div>Tạm tính: ${n0(order.subtotal)} ₫</div>
    <div>Cước vận chuyển: ${n0(order.shippingFee)} ₫</div>
    ${discountLine}
    <div style="font-size: 20px; font-weight: 800; margin-top: 8px;">
      TỔNG THU TIỀN: ${n0(order.totalAmount)} ₫
    </div>
  </div>

  <div style="margin-top: 40px; border-top: 1px dashed #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between; font-size: 13px; color: #64748b;">
    <div>Người lập phiếu: Admin CutTayShop</div>
    <div>Xác nhận của bưu tá: ..................................</div>
    <div>Chữ ký người nhận: ..................................</div>
  </div>
</body>
</html>`;
}

/* ------------------------------------------------------------ khách hàng */

export function renderAdminCustomers({ users = [], orders = [] }) {
  const rows = users.map((u) => {
    const userOrders = orders.filter((o) => o.userId === u.id);
    const spent = userOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    return `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px; display: flex; align-items: center; gap: 10px;">
              <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
                ${esc(u.fullName.split(' ').filter(Boolean).slice(-2).map((w) => w[0]).join('').toUpperCase())}
              </div>
              <strong>${esc(u.fullName)}</strong>
            </td>
            <td style="padding: 12px;">${esc(u.phoneNumber || '—')}</td>
            <td style="padding: 12px;">${esc(u.email)}</td>
            <td style="padding: 12px;">${userOrders.length} đơn</td>
            <td style="padding: 12px; font-weight: 700; color: var(--color-primary);">${n0(spent)} ₫</td>
            <td style="padding: 12px;">
              <span class="badge-capsule ${u.role === 'admin' ? 'badge-peach' : 'badge-sky'}">${u.role === 'admin' ? 'Quản trị' : 'Khách'}</span>
            </td>
            <td style="padding: 12px;">
              <span class="badge-capsule ${u.status === 'active' ? 'badge-mint' : 'badge-peach'}">${u.status === 'active' ? 'Hoạt động' : 'Đã khoá'}</span>
            </td>
            <td style="padding: 12px; text-align: right; white-space: nowrap;">
              <a href="/admin/khach-hang/${u.id}" class="btn-pill btn-pill-secondary btn-sm">Chi tiết</a>
              <form action="/admin/khach-hang/khoa/${u.id}" method="post" style="display: inline;">
                <button type="submit" class="btn-pill btn-pill-ghost btn-sm">${u.status === 'active' ? 'Khoá' : 'Mở'}</button>
              </form>
            </td>
          </tr>`;
  });

  const body = `${pageHeader({
    title: 'Quản Lý Khách Hàng',
    subtitle: 'Tài khoản thật trong cơ sở dữ liệu, kèm lịch sử chi tiêu.',
  })}

${card(table(
    ['Khách hàng', 'Số điện thoại', 'Email', 'Số đơn', 'Tổng chi tiêu', 'Vai trò', 'Trạng thái', 'Hành động'],
    rows,
    { empty: 'Chưa có khách hàng nào.' },
  ), 'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: 'Quản Lý Khách Hàng — Admin', body, activeKey: 'Customer' });
}

export function renderAdminCustomerDetail({ user, orders = [] }) {
  if (!user) {
    return adminLayout({
      title: 'Không tìm thấy khách hàng',
      body: `${pageHeader({ title: 'Không tìm thấy khách hàng', actions: '<a href="/admin/khach-hang" class="btn-pill btn-pill-ghost">← Danh sách</a>' })}`,
      activeKey: 'Customer',
    });
  }

  const spent = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const orderRows = orders.map((o) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 10px;"><strong>#${esc(o.orderCode)}</strong></td>
            <td style="padding: 10px;">${dmy(o.createdAt)}</td>
            <td style="padding: 10px; font-weight: 600;">${n0(o.totalAmount)} ₫</td>
            <td style="padding: 10px;"><span class="badge-capsule badge-mint">${esc(o.status)}</span></td>
            <td style="padding: 10px;"><a href="/admin/don-hang/chi-tiet/${o.id}" class="btn-pill btn-pill-secondary btn-sm">Xem</a></td>
          </tr>`);

  const body = `${pageHeader({
    title: `Hồ Sơ: ${user.fullName}`,
    subtitle: `ID #${user.id} · Tham gia ${dmy(user.createdAt)}`,
    actions: '<a href="/admin/khach-hang" class="btn-pill btn-pill-ghost">← Danh sách</a>',
  })}

<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 24px; margin-top: 24px;">
  ${card(`    <div style="text-align: center; margin-bottom: 20px;">
      <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--color-primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 24px; margin: 0 auto 12px;">
        ${esc(user.fullName.split(' ').filter(Boolean).slice(-2).map((w) => w[0]).join('').toUpperCase())}
      </div>
      <h2 style="font-size: 1.25rem; font-weight: 700; margin: 0 0 4px;">${esc(user.fullName)}</h2>
      <span class="badge-capsule ${user.role === 'admin' ? 'badge-peach' : 'badge-sky'}">${user.role === 'admin' ? '👑 Quản trị' : 'Khách hàng'}</span>
    </div>
    <div style="border-top: 1px solid var(--color-border); padding-top: 16px; font-size: 0.875rem;">
      <div style="margin-bottom: 8px;"><strong>Số điện thoại:</strong> ${esc(user.phoneNumber || '—')}</div>
      <div style="margin-bottom: 8px;"><strong>Email:</strong> ${esc(user.email)}</div>
      <div style="margin-bottom: 8px;"><strong>Ngày sinh:</strong> ${user.birthday ? dmy(user.birthday) : '—'}</div>
      <div><strong>Trạng thái:</strong> ${user.status === 'active' ? 'Hoạt động' : 'Đã khoá'}</div>
    </div>`, 'padding: 24px;')}

  ${card(`    <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Lịch sử mua hàng</h2>
    <p style="color: var(--color-text-secondary); font-size: 0.875rem; margin-bottom: 16px;">
      ${orders.length} đơn hàng · Tổng chi tiêu <strong>${n0(spent)} ₫</strong>
    </p>
    ${table(['Mã đơn', 'Ngày', 'Tổng tiền', 'Trạng thái', ''], orderRows, { empty: 'Khách chưa có đơn hàng nào.' })}`, 'padding: 24px;')}
</div>`;

  return adminLayout({ title: 'Hồ Sơ Khách Hàng — Admin', body, activeKey: 'Customer' });
}

/* -------------------------------------------------------------- tồn kho */

export function renderAdminInventory(products) {
  const rows = products.map((prod) => {
    const status = prod.totalStock <= 10
      ? '<span class="badge-capsule badge-peach">⚠️ Sắp hết hàng</span>'
      : '<span class="badge-capsule badge-mint">An toàn</span>';

    return `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px; color: var(--color-text-muted);">#${prod.id}</td>
            <td style="padding: 12px; display: flex; align-items: center; gap: 12px;">
              <img src="${esc(prod.imageUrl)}" alt="${esc(prod.name)}" style="width: 40px; height: 40px; object-fit: cover; border-radius: var(--radius-sm);" />
              <div>
                <strong>${esc(prod.name)}</strong>
                <div style="font-size: 0.75rem; color: var(--color-text-muted);">${esc(prod.brand)}</div>
              </div>
            </td>
            <td style="padding: 12px;">${esc(prod.categoryName)}</td>
            <td style="padding: 12px;">${prod.soldCount} món</td>
            <td style="padding: 12px; font-weight: 700;">${prod.totalStock}</td>
            <td style="padding: 12px;">${status}</td>
            <td style="padding: 12px; text-align: right;">
              <form action="/admin/san-pham/${prod.id}/nhap-kho" method="post" style="display: inline-flex; gap: 6px; align-items: center;">
                <input type="number" name="delta" value="10" min="1" class="form-control" style="width: 80px; padding: 4px 8px;" />
                <button type="submit" class="btn-pill btn-pill-secondary btn-sm">+ Nhập</button>
              </form>
            </td>
          </tr>`;
  });

  const body = `${pageHeader({
    title: 'Quản Lý Tồn Kho',
    subtitle: 'Nhập thêm hàng trực tiếp vào cơ sở dữ liệu.',
  })}

${card(table(
    ['Mã SP', 'Sản phẩm', 'Ngành hàng', 'Đã bán', 'Tồn kho', 'Tình trạng', 'Nhập thêm'],
    rows,
    { empty: 'Chưa có sản phẩm.' },
  ), 'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: 'Quản Lý Tồn Kho — Admin', body, activeKey: 'Inventory' });
}

/* -------------------------------------------------------------- voucher */

export function renderAdminCoupons({ coupons, notice: msg }) {
  const rows = coupons.map((c) => {
    const discount = c.discountPercent != null
      ? `${c.discountPercent}% (tối đa ${n0(c.discountAmount)} ₫)`
      : `${n0(c.discountAmount)} ₫`;

    return `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;"><strong class="badge-capsule badge-peach">${esc(c.code)}</strong></td>
            <td style="padding: 12px;">${esc(c.title)}</td>
            <td style="padding: 12px; font-weight: 700; color: var(--color-primary);">${discount}</td>
            <td style="padding: 12px;">${n0(c.minOrderValue)} ₫</td>
            <td style="padding: 12px; font-size: 0.8125rem;">${dmy(c.validUntil)}</td>
            <td style="padding: 12px;">
              <span class="badge-capsule ${c.isActive ? 'badge-mint' : 'badge-peach'}">${c.isActive ? 'Kích hoạt' : 'Tắt'}</span>
            </td>
            <td style="padding: 12px; text-align: right;">
              <form action="/admin/khuyen-mai/xoa/${c.id}" method="post" style="display: inline;" onsubmit="return confirm('Xoá mã ${esc(c.code)}?');">
                <button type="submit" class="btn-pill btn-pill-ghost btn-sm" style="color: var(--color-danger);">Xoá</button>
              </form>
            </td>
          </tr>`;
  });

  const body = `${pageHeader({
    title: `Quản Lý Voucher (${coupons.length} mã)`,
    subtitle: 'Tạo và xoá mã giảm giá trực tiếp trong cơ sở dữ liệu.',
  })}

${notice(msg)}

${card(`  <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Tạo mã khuyến mãi</h2>
  <form action="/admin/khuyen-mai/them-moi" method="post" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
    <div class="form-group">
      <label class="form-label">Mã <span class="required">*</span></label>
      <input type="text" name="code" class="form-control" required placeholder="SALE20" />
    </div>
    <div class="form-group">
      <label class="form-label">Tiêu đề <span class="required">*</span></label>
      <input type="text" name="title" class="form-control" required placeholder="Giảm 20.000đ" />
    </div>
    <div class="form-group">
      <label class="form-label">Giảm (VNĐ)</label>
      <input type="number" name="discountAmount" class="form-control" value="20000" />
    </div>
    <div class="form-group">
      <label class="form-label">Giảm (%)</label>
      <input type="number" name="discountPercent" class="form-control" placeholder="10" min="0" max="100" />
    </div>
    <div class="form-group">
      <label class="form-label">Đơn tối thiểu</label>
      <input type="number" name="minOrderValue" class="form-control" value="150000" />
    </div>
    <div class="form-group">
      <label class="form-label">Hết hạn</label>
      <input type="date" name="validUntil" class="form-control" value="2026-12-31" />
    </div>
    <button type="submit" class="btn-pill btn-pill-primary" style="height: 42px;">+ Tạo mã</button>
  </form>`, 'padding: 24px; margin: 24px 0;')}

${card(table(
    ['Mã', 'Tiêu đề', 'Mức giảm', 'Đơn tối thiểu', 'Thời hạn', 'Trạng thái', 'Thao tác'],
    rows,
    { empty: 'Chưa có voucher nào.' },
  ), 'overflow: hidden;')}`;

  return adminLayout({ title: 'Quản Lý Voucher — Admin', body, activeKey: 'Promotion:Coupons' });
}

export function renderAdminFlashSale({ deals, countdown }) {
  const rows = deals.map((prod) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px; display: flex; align-items: center; gap: 10px;">
              <img src="${esc(prod.imageUrl)}" alt="${esc(prod.name)}" style="width: 40px; height: 40px; object-fit: cover; border-radius: var(--radius-sm);" />
              <strong>${esc(prod.name)}</strong>
            </td>
            <td style="padding: 12px; text-decoration: line-through; color: var(--color-text-muted);">${n0(prod.originalPrice)} ₫</td>
            <td style="padding: 12px; font-weight: 700; color: var(--color-primary);">${n0(prod.price)} ₫</td>
            <td style="padding: 12px;"><span class="badge-capsule badge-peach">${esc(prod.badgeText || `-${prod.discountPercent}%`)}</span></td>
            <td style="padding: 12px;">${prod.soldCount} / ${prod.totalStock} món</td>
            <td style="padding: 12px; text-align: right;">
              <a href="/admin/san-pham/chinh-sua/${prod.id}" class="btn-pill btn-pill-secondary btn-sm">Chỉnh giá</a>
            </td>
          </tr>`);

  const body = `${pageHeader({
    title: 'Cài Đặt Flash Sale',
    subtitle: 'Sản phẩm đang gắn cờ Deal Hot sẽ xuất hiện trong chiến dịch.',
  })}

${card(`  <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Khung giờ đang kích hoạt</h2>
  <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
    <div>
      <label class="form-label">Thời điểm kết thúc</label>
      <input type="datetime-local" class="form-control" value="${esc(String(countdown.endTime).slice(0, 16))}" />
    </div>
    <div>
      <label class="form-label">Trạng thái</label>
      <div style="margin-top: 8px;"><span class="badge-capsule badge-mint">⚡ Đang đếm ngược</span></div>
    </div>
  </div>`, 'padding: 24px; margin-top: 24px;')}

${card(`  <div style="padding: 16px; border-bottom: 1px solid var(--color-border); font-weight: 700;">
    Sản phẩm tham gia Flash Sale (${deals.length})
  </div>
  ${table(['Sản phẩm', 'Giá gốc', 'Giá sale', 'Mức giảm', 'Đã bán', 'Thao tác'], rows, { empty: 'Chưa có sản phẩm nào gắn cờ Deal Hot.' })}`,
    'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: 'Cài Đặt Flash Sale — Admin', body, activeKey: 'Promotion:FlashSale' });
}

/* -------------------------------------------------------------- banner */

export function renderAdminBanners({ banners, notice: msg }) {
  const cards = banners.map((banner) => `    <div class="admin-card" style="padding: 24px; background: var(--color-bg-primary); border: 1px solid var(--color-border); border-radius: var(--radius-lg);">
      <div style="height: 140px; border-radius: var(--radius-md); background: ${esc(banner.bgColorHex)}; display: flex; align-items: center; justify-content: space-between; padding: 20px; margin-bottom: 16px;">
        <div>
          <span style="font-size: 0.8125rem; font-weight: 700; color: #334155;">${esc(banner.categoryTitle)}</span>
          <div style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">${esc(banner.promoLabel)} ${esc(banner.highlightNumber)}</div>
          <span style="font-size: 0.8125rem; color: var(--color-primary); font-weight: 600;">${esc(banner.ctaText)}</span>
        </div>
        <img src="${esc(banner.imageUrl)}" alt="${esc(banner.categoryTitle)}" style="width: 80px; height: 80px; object-fit: cover; border-radius: var(--radius-sm);" />
      </div>

      <div style="font-size: 0.875rem;">
        <div style="margin-bottom: 6px;"><strong>Vị trí:</strong> Trang chủ — Hero Side (${banner.id})</div>
        <div style="margin-bottom: 12px;"><strong>Liên kết:</strong> <code>${esc(banner.ctaLink)}</code></div>
      </div>

      <form action="/admin/banner-cms/xoa/${banner.id}" method="post" onsubmit="return confirm('Xoá banner #${banner.id}?');">
        <button type="submit" class="btn-pill btn-pill-ghost btn-sm" style="color: var(--color-danger);">Xoá banner</button>
      </form>
    </div>`).join('\n');

  const body = `${pageHeader({
    title: 'Quản Lý Banner CMS',
    subtitle: 'Banner hiển thị ở cột phải khu vực hero trang chủ.',
  })}

${notice(msg)}

${card(`  <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Thêm banner mới</h2>
  <form action="/admin/banner-cms/them-moi" method="post" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; align-items: end;">
    <div class="form-group">
      <label class="form-label">Danh mục <span class="required">*</span></label>
      <input type="text" name="categoryTitle" class="form-control" required placeholder="Đồ công nghệ" />
    </div>
    <div class="form-group">
      <label class="form-label">Nhãn</label>
      <input type="text" name="promoLabel" class="form-control" placeholder="Giảm đến" />
    </div>
    <div class="form-group">
      <label class="form-label">Số nổi bật</label>
      <input type="text" name="highlightNumber" class="form-control" placeholder="50%" />
    </div>
    <div class="form-group">
      <label class="form-label">Liên kết</label>
      <input type="text" name="ctaLink" class="form-control" value="/danh-muc/cong-nghe" />
    </div>
    <div class="form-group">
      <label class="form-label">Ảnh (URL)</label>
      <input type="text" name="imageUrl" class="form-control" placeholder="/images/compositions/promos/..." />
    </div>
    <div class="form-group">
      <label class="form-label">Màu nền</label>
      <input type="color" name="bgColorHex" class="form-control" value="#E5F8DC" style="height: 42px;" />
    </div>
    <button type="submit" class="btn-pill btn-pill-primary" style="height: 42px;">+ Thêm</button>
  </form>`, 'padding: 24px; margin: 24px 0;')}

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
${cards}
</div>`;

  return adminLayout({ title: 'Quản Lý Banner CMS — Admin', body, activeKey: 'Banner' });
}

/* -------------------------------------------------------------- blog */

export function renderAdminBlog({ posts, notice: msg }) {
  const rows = posts.map((post) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;">
              <img src="${esc(post.imageUrl)}" alt="${esc(post.title)}" style="width: 60px; height: 40px; object-fit: cover; border-radius: var(--radius-sm);" />
            </td>
            <td style="padding: 12px;">
              <strong>${esc(post.title)}</strong>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">/blog/${esc(post.slug)}</div>
            </td>
            <td style="padding: 12px;"><span class="badge-capsule badge-sky">${esc(post.category)}</span></td>
            <td style="padding: 12px;">${esc(post.author)}</td>
            <td style="padding: 12px; font-size: 0.8125rem;">${dmy(post.publishedAt)}</td>
            <td style="padding: 12px; text-align: right; white-space: nowrap;">
              <a href="/blog/${esc(post.slug)}" target="_blank" class="btn-pill btn-pill-ghost btn-sm">Xem</a>
              <form action="/admin/bai-viet/xoa/${post.id}" method="post" style="display: inline;" onsubmit="return confirm('Xoá bài viết này?');">
                <button type="submit" class="btn-pill btn-pill-ghost btn-sm" style="color: var(--color-danger);">Xoá</button>
              </form>
            </td>
          </tr>`);

  const body = `${pageHeader({
    title: `Quản Trị Bài Viết (${posts.length})`,
    subtitle: 'Viết và xoá bài blog trực tiếp trong cơ sở dữ liệu.',
  })}

${notice(msg)}

${card(`  <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 16px;">Viết bài mới</h2>
  <form action="/admin/bai-viet/them-moi" method="post">
    <div class="form-row-2" style="margin-bottom: 12px;">
      <div class="form-group">
        <label class="form-label">Tiêu đề <span class="required">*</span></label>
        <input type="text" name="title" class="form-control" required placeholder="Tiêu đề bài viết" />
      </div>
      <div class="form-group">
        <label class="form-label">Chuyên mục</label>
        <input type="text" name="category" class="form-control" placeholder="Công nghệ & Lifestyle" />
      </div>
    </div>
    <div class="form-row-2" style="margin-bottom: 12px;">
      <div class="form-group">
        <label class="form-label">Tác giả</label>
        <input type="text" name="author" class="form-control" placeholder="Ban biên tập" />
      </div>
      <div class="form-group">
        <label class="form-label">Ảnh bìa (URL)</label>
        <input type="text" name="imageUrl" class="form-control" placeholder="/images/blog/..." />
      </div>
    </div>
    <div class="form-group" style="margin-bottom: 12px;">
      <label class="form-label">Tóm tắt</label>
      <input type="text" name="summary" class="form-control" placeholder="Mô tả ngắn hiển thị ở danh sách" />
    </div>
    <div class="form-group" style="margin-bottom: 16px;">
      <label class="form-label">Nội dung (HTML)</label>
      <textarea name="contentHtml" class="form-control" rows="5" placeholder="<p>Nội dung bài viết...</p>"></textarea>
    </div>
    <button type="submit" class="btn-pill btn-pill-primary">+ Đăng bài</button>
  </form>`, 'padding: 24px; margin: 24px 0;')}

${card(table(['Ảnh bìa', 'Tiêu đề', 'Chuyên mục', 'Tác giả', 'Ngày đăng', 'Thao tác'], rows, { empty: 'Chưa có bài viết.' }), 'overflow: hidden;')}`;

  return adminLayout({ title: 'Quản Trị Bài Viết Blog — Admin', body, activeKey: 'BlogAdmin' });
}

/* -------------------------------------------------------------- đánh giá */

export function renderAdminReviews({ reviews, currentStatus, notice: msg }) {
  const chip = (href, label, key) =>
    `<a href="${href}" class="filter-chip${(currentStatus || '') === key ? ' active' : ''}">${label}</a>`;

  const rows = reviews.map((rev) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;">
              <strong>${esc(rev.authorName)}</strong>
              ${rev.isVerifiedPurchase ? '<div style="font-size: 0.75rem; color: #10b981;">✓ Đã mua hàng</div>' : ''}
            </td>
            <td style="padding: 12px; font-size: 0.8125rem;">
              <a href="/san-pham/${esc(rev.productSlug)}" target="_blank">${esc(rev.productName)}</a>
            </td>
            <td style="padding: 12px; color: #f59e0b; font-weight: 700;">★ ${rev.rating}</td>
            <td style="padding: 12px; font-size: 0.875rem;">${esc(rev.comment)}</td>
            <td style="padding: 12px; font-size: 0.8125rem;">${dmy(rev.date)}</td>
            <td style="padding: 12px;">
              <span class="badge-capsule ${rev.status === 'approved' ? 'badge-mint' : (rev.status === 'pending' ? 'badge-peach' : 'badge-subtle')}">
                ${rev.status === 'approved' ? 'Đã duyệt' : (rev.status === 'pending' ? 'Chờ duyệt' : 'Đã ẩn')}
              </span>
            </td>
            <td style="padding: 12px; text-align: right; white-space: nowrap;">
              ${rev.status !== 'approved' ? `<form action="/admin/danh-gia/duyet/${rev.id}" method="post" style="display: inline;"><button type="submit" class="btn-pill btn-pill-primary btn-sm">Duyệt</button></form>` : ''}
              ${rev.status !== 'hidden' ? `<form action="/admin/danh-gia/an/${rev.id}" method="post" style="display: inline;"><button type="submit" class="btn-pill btn-pill-ghost btn-sm">Ẩn</button></form>` : ''}
              <form action="/admin/danh-gia/xoa/${rev.id}" method="post" style="display: inline;" onsubmit="return confirm('Xoá đánh giá này?');">
                <button type="submit" class="btn-pill btn-pill-ghost btn-sm" style="color: var(--color-danger);">Xoá</button>
              </form>
            </td>
          </tr>`);

  const body = `${pageHeader({
    title: 'Kiểm Duyệt Đánh Giá',
    subtitle: 'Đánh giá mới ở trạng thái "Chờ duyệt" cho tới khi bạn phê duyệt.',
  })}

${notice(msg)}

${card(`  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    ${chip('/admin/danh-gia', 'Tất cả', '')}
    ${chip('/admin/danh-gia?status=pending', 'Chờ duyệt', 'pending')}
    ${chip('/admin/danh-gia?status=approved', 'Đã duyệt', 'approved')}
    ${chip('/admin/danh-gia?status=hidden', 'Đã ẩn', 'hidden')}
  </div>`, 'padding: 16px; margin: 20px 0;')}

${card(table(
    ['Khách hàng', 'Sản phẩm', 'Sao', 'Nội dung', 'Ngày', 'Trạng thái', 'Thao tác'],
    rows,
    { empty: 'Chưa có đánh giá nào.' },
  ), 'overflow: hidden;')}`;

  return adminLayout({ title: 'Kiểm Duyệt Đánh Giá — Admin', body, activeKey: 'Review' });
}

/* -------------------------------------------------------------- báo cáo */

export function renderAdminReport({ products, stats = {}, salesByCategory = [] }) {
  const ranked = [...products].sort((a, b) => (b.soldCount * b.price) - (a.soldCount * a.price)).slice(0, 10);

  const rows = ranked.map((prod, i) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px; font-weight: 800; color: var(--color-primary);">#${i + 1}</td>
            <td style="padding: 12px; display: flex; align-items: center; gap: 10px;">
              <img src="${esc(prod.imageUrl)}" alt="${esc(prod.name)}" style="width: 36px; height: 36px; object-fit: cover; border-radius: var(--radius-sm);" />
              <strong>${esc(prod.name)}</strong>
            </td>
            <td style="padding: 12px;">${n0(prod.price)} ₫</td>
            <td style="padding: 12px; font-weight: 600;">${prod.soldCount} món</td>
            <td style="padding: 12px; text-align: right; font-weight: 700; color: var(--color-primary);">
              ${n0(prod.soldCount * prod.price)} ₫
            </td>
          </tr>`);

  const catRows = salesByCategory.map((c) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;"><strong>${esc(c.name || 'Khác')}</strong></td>
            <td style="padding: 12px;">${c.items} món</td>
            <td style="padding: 12px; text-align: right; font-weight: 700; color: var(--color-primary);">${n0(c.revenue)} ₫</td>
          </tr>`);

  const body = `${pageHeader({
    title: 'Báo Cáo Doanh Thu',
    subtitle: 'Số liệu tổng hợp thật từ đơn hàng trong cơ sở dữ liệu.',
  })}

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-top: 24px;">
  ${card(`    <span class="text-muted" style="font-size: 0.8125rem;">TỔNG DOANH THU</span>
    <div style="font-size: 1.75rem; font-weight: 800; color: var(--color-primary); margin: 6px 0;">${n0(stats.totalRevenue)} ₫</div>
    <span class="badge-capsule badge-mint" style="font-size: 0.75rem;">${stats.totalOrders} đơn hàng</span>`, 'padding: 20px;')}

  ${card(`    <span class="text-muted" style="font-size: 0.8125rem;">DOANH THU HÔM NAY</span>
    <div style="font-size: 1.75rem; font-weight: 800; margin: 6px 0;">${n0(stats.revenueToday)} ₫</div>
    <span class="badge-capsule badge-sky" style="font-size: 0.75rem;">${stats.ordersToday} đơn hôm nay</span>`, 'padding: 20px;')}

  ${card(`    <span class="text-muted" style="font-size: 0.8125rem;">GIÁ TRỊ TRUNG BÌNH / ĐƠN</span>
    <div style="font-size: 1.75rem; font-weight: 800; margin: 6px 0;">${n0(stats.totalOrders ? stats.totalRevenue / stats.totalOrders : 0)} ₫</div>
    <span class="badge-capsule badge-peach" style="font-size: 0.75rem;">AOV</span>`, 'padding: 20px;')}
</div>

${card(`  <div style="padding: 16px; border-bottom: 1px solid var(--color-border); font-weight: 700;">
    Doanh thu theo ngành hàng
  </div>
  ${table(['Ngành hàng', 'Số món bán', 'Doanh thu'], catRows, { empty: 'Chưa có dữ liệu bán hàng.' })}`,
    'margin-top: 32px; overflow: hidden;')}

${card(`  <div style="padding: 16px; border-bottom: 1px solid var(--color-border); font-weight: 700;">
    Top 10 sản phẩm theo doanh số
  </div>
  ${table(['Top', 'Sản phẩm', 'Đơn giá', 'Đã bán', 'Doanh thu ước tính'], rows)}`,
    'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: 'Báo Cáo Doanh Thu — Admin', body, activeKey: 'Report' });
}

/* -------------------------------------------------------------- biến thể */

export function renderAdminVariants(product) {
  const rows = product.variants && product.variants.length
    ? product.variants.map((v) => `            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 12px;"><code class="badge-capsule badge-subtle">${esc(v.sku)}</code></td>
              <td style="padding: 12px;"><strong>${esc(v.name)}</strong></td>
              <td style="padding: 12px; font-weight: 700; color: var(--color-primary);">${n0(v.price)} ₫</td>
              <td style="padding: 12px; text-decoration: line-through; color: var(--color-text-muted);">${n0(v.originalPrice)} ₫</td>
              <td style="padding: 12px; text-align: right;">
                <a href="/admin/san-pham/chinh-sua/${product.id}" class="btn-pill btn-pill-secondary btn-sm">Sửa sản phẩm</a>
              </td>
            </tr>`)
    : [];

  const body = `${pageHeader({
    title: `Biến Thể SKU: ${product.name}`,
    subtitle: 'Biến thể được nạp từ cơ sở dữ liệu.',
    actions: '<a href="/admin/san-pham" class="btn-pill btn-pill-ghost">← Danh sách sản phẩm</a>',
  })}

${card(table(['Mã SKU', 'Tên phân loại', 'Giá bán', 'Giá gốc', 'Thao tác'], rows), 'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: `Biến Thể SKU — ${product.name}`, body, activeKey: 'Product' });
}

/* -------------------------------------------------------------- phân quyền */

export function renderAdminRoles({ users = [], notice: msg }) {
  const rows = users.map((u) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;"><strong>${esc(u.fullName)}</strong></td>
            <td style="padding: 12px;">${esc(u.email)}</td>
            <td style="padding: 12px;">
              <span class="badge-capsule ${u.role === 'admin' ? 'badge-peach' : 'badge-sky'}">${u.role === 'admin' ? 'SuperAdmin' : 'Khách hàng'}</span>
            </td>
            <td style="padding: 12px;">
              <span class="badge-capsule ${u.status === 'active' ? 'badge-mint' : 'badge-peach'}">${u.status === 'active' ? 'Hoạt động' : 'Đã khoá'}</span>
            </td>
            <td style="padding: 12px; text-align: right;">
              <form action="/admin/phan-quyen/vai-tro/${u.id}" method="post" style="display: inline-flex; gap: 6px;">
                <select name="role" class="form-control" style="width: auto; padding: 4px 8px;">
                  <option value="customer"${u.role === 'customer' ? ' selected' : ''}>Khách hàng</option>
                  <option value="admin"${u.role === 'admin' ? ' selected' : ''}>Quản trị</option>
                </select>
                <button type="submit" class="btn-pill btn-pill-secondary btn-sm">Lưu</button>
              </form>
            </td>
          </tr>`);

  const body = `${pageHeader({
    title: 'Quản Trị Người Dùng & Phân Quyền',
    subtitle: 'Thay đổi vai trò trực tiếp trong cơ sở dữ liệu.',
  })}

${notice(msg)}

${card(table(['Họ tên', 'Email', 'Vai trò', 'Trạng thái', 'Thao tác'], rows, { empty: 'Chưa có người dùng.' }), 'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: 'Quản Trị Người Dùng & Phân Quyền — Admin', body, activeKey: 'Role' });
}

/* -------------------------------------------------------------- cài đặt */

export function renderAdminSettings({ settings = {}, notice: msg }) {
  const body = `${pageHeader({
    title: 'Cài Đặt Cấu Hình Hệ Thống',
    subtitle: 'Các giá trị này được lưu trong bảng settings của SQLite.',
  })}

${notice(msg)}

${card(`  <form action="/admin/cai-dat" method="post">
    <h2 style="font-size: 1.125rem; font-weight: 700; margin-bottom: 20px;">Thông tin chung cửa hàng</h2>

    <div class="form-row-2" style="margin-bottom: 18px;">
      <div class="form-group">
        <label class="form-label">Tên thương hiệu</label>
        <input type="text" name="brand_name" class="form-control" value="${esc(settings.brand_name || '')}" />
      </div>
      <div class="form-group">
        <label class="form-label">Hotline chăm sóc khách hàng</label>
        <input type="text" name="hotline" class="form-control" value="${esc(settings.hotline || '')}" />
      </div>
    </div>

    <div class="form-row-2" style="margin-bottom: 18px;">
      <div class="form-group">
        <label class="form-label">Email hỗ trợ</label>
        <input type="email" name="support_email" class="form-control" value="${esc(settings.support_email || '')}" />
      </div>
      <div class="form-group">
        <label class="form-label">Phí vận chuyển mặc định (VNĐ)</label>
        <input type="number" name="default_shipping_fee" class="form-control" value="${esc(settings.default_shipping_fee || '')}" />
      </div>
    </div>

    <div class="form-group" style="margin-bottom: 18px;">
      <label class="form-label">Ngưỡng Freeship tự động (VNĐ)</label>
      <input type="number" name="freeship_threshold" class="form-control" value="${esc(settings.freeship_threshold || '')}" />
    </div>

    <div class="form-group" style="margin-bottom: 18px;">
      <label class="form-label">Địa chỉ kho tổng đóng gói</label>
      <input type="text" name="warehouse_address" class="form-control" value="${esc(settings.warehouse_address || '')}" />
    </div>

    <div class="form-group" style="margin-bottom: 24px; display: flex; align-items: center; gap: 8px;">
      <input type="checkbox" name="maintenance_mode" id="cb-maintenance"${settings.maintenance_mode === '1' ? ' checked' : ''} />
      <label for="cb-maintenance" style="font-size: 0.875rem; cursor: pointer;">Bật chế độ bảo trì (storefront hiển thị trang 503)</label>
    </div>

    <button type="submit" class="btn-pill btn-pill-primary btn-pill-lg">Lưu cấu hình</button>
  </form>`, 'max-width: 800px; padding: 32px; margin-top: 24px;')}`;

  return adminLayout({ title: 'Cài Đặt Hệ Thống — Admin', body, activeKey: 'Setting' });
}

/* -------------------------------------------------------------- hỗ trợ */

export function renderAdminSupport({ messages = [], notice: msg }) {
  const rows = messages.map((m) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;"><strong>#TK-${m.id}</strong></td>
            <td style="padding: 12px;">
              <div>${esc(m.fullName)}</div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted);">${esc(m.phone || m.email)}</div>
            </td>
            <td style="padding: 12px; font-size: 0.875rem; max-width: 380px;">${esc(m.message)}</td>
            <td style="padding: 12px; font-size: 0.8125rem;">${dmyhm(m.createdAt)}</td>
            <td style="padding: 12px;">
              <span class="badge-capsule ${m.status === 'new' ? 'badge-peach' : 'badge-mint'}">${m.status === 'new' ? 'Mới' : 'Đã xử lý'}</span>
            </td>
            <td style="padding: 12px; text-align: right;">
              <form action="/admin/ho-tro/trang-thai/${m.id}" method="post" style="display: inline;">
                <input type="hidden" name="status" value="${m.status === 'new' ? 'resolved' : 'new'}" />
                <button type="submit" class="btn-pill btn-pill-secondary btn-sm">${m.status === 'new' ? 'Đánh dấu xử lý' : 'Mở lại'}</button>
              </form>
            </td>
          </tr>`);

  const body = `${pageHeader({
    title: 'Hỗ Trợ Khách Hàng',
    subtitle: 'Tin nhắn thật gửi từ biểu mẫu liên hệ.',
  })}

${notice(msg)}

${card(table(
    ['Mã', 'Khách hàng', 'Nội dung', 'Thời gian', 'Trạng thái', 'Thao tác'],
    rows,
    { empty: 'Chưa có yêu cầu hỗ trợ nào.' },
  ), 'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: 'Hỗ Trợ Khách Hàng — Admin', body, activeKey: 'Support' });
}

/* -------------------------------------------------------------- tài khoản */

export function renderAdminUsers({ users = [] }) {
  const rows = users.map((u) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 12px;">#${u.id}</td>
            <td style="padding: 12px;"><strong>${esc(u.fullName)}</strong></td>
            <td style="padding: 12px;">${esc(u.email)}</td>
            <td style="padding: 12px;">${esc(u.phoneNumber || '—')}</td>
            <td style="padding: 12px;"><span class="badge-capsule ${u.role === 'admin' ? 'badge-peach' : 'badge-sky'}">${u.role}</span></td>
            <td style="padding: 12px;"><span class="badge-capsule ${u.status === 'active' ? 'badge-mint' : 'badge-peach'}">${u.status}</span></td>
            <td style="padding: 12px; font-size: 0.8125rem;">${dmy(u.createdAt)}</td>
          </tr>`);

  const body = `${pageHeader({
    title: `Tài Khoản (${users.length})`,
    subtitle: 'Bảng users trong SQLite — mật khẩu lưu dưới dạng scrypt hash.',
  })}

${card(table(['ID', 'Họ tên', 'Email', 'Điện thoại', 'Vai trò', 'Trạng thái', 'Ngày tạo'], rows), 'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: 'Tài Khoản — Admin', body, activeKey: 'Users' });
}

/* -------------------------------------------------------------- nhật ký */

export function renderAdminAudit({ entries = [] }) {
  const rows = entries.map((e) => `          <tr style="border-bottom: 1px solid var(--color-border);">
            <td style="padding: 10px;">#${e.id}</td>
            <td style="padding: 10px; font-size: 0.8125rem;">${dmyhm(e.createdAt)}</td>
            <td style="padding: 10px;">${e.userId ?? '—'}</td>
            <td style="padding: 10px;"><span class="badge-capsule badge-sky">${esc(e.action)}</span></td>
            <td style="padding: 10px;">${esc(e.entity || '—')}${e.entityId ? ` #${esc(e.entityId)}` : ''}</td>
            <td style="padding: 10px; font-size: 0.8125rem;">${esc(e.detail || '')}</td>
          </tr>`);

  const body = `${pageHeader({
    title: 'Nhật Ký Thao Tác',
    subtitle: 'Ghi nhận mọi thay đổi dữ liệu từ cổng quản trị.',
  })}

${card(table(['ID', 'Thời gian', 'User', 'Hành động', 'Đối tượng', 'Chi tiết'], rows, { empty: 'Chưa có thao tác nào.' }), 'margin-top: 24px; overflow: hidden;')}`;

  return adminLayout({ title: 'Nhật Ký Thao Tác — Admin', body, activeKey: 'Audit' });
}
