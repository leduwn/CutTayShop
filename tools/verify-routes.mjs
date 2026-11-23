/**
 * Kiểm thử hồi quy toàn bộ tuyến đường + API + tài nguyên tĩnh.
 * Chạy khi server đang lắng nghe: node tools/verify-routes.mjs [baseUrl]
 *
 * Script tự đăng nhập admin để kiểm tra cổng quản trị (đã có auth thật).
 */
const BASE = process.argv[2] || 'http://localhost:5139';

const ADMIN = { identifier: 'admin@cuttayshop.vn', password: 'admin123456' };
const CUSTOMER = { identifier: 'nguyenvanan@gmail.com', password: 'demo123456' };

/** [path, expectedStatus, mô tả] */
const PUBLIC_ROUTES = [
  ['/', 200, 'Trang chủ'],
  ['/san-pham', 200, 'Danh mục sản phẩm (PLP)'],
  ['/san-pham/tai-nghe-chup-tai-studio-pro-wireless', 200, 'Chi tiết sản phẩm (PDP)'],
  ['/danh-muc', 200, 'Tổng hợp danh mục'],
  ['/danh-muc/cong-nghe', 200, 'Lọc danh mục Công nghệ'],
  ['/flash-sale', 200, 'Flash Sale'],
  ['/deals', 200, 'Khuyến mãi Hot Deals'],
  ['/khuyen-mai', 200, 'Trang voucher'],
  ['/yeu-thich', 200, 'Yêu thích'],
  ['/so-sanh', 200, 'So sánh sản phẩm'],
  ['/gio-hang', 200, 'Giỏ hàng'],
  ['/thanh-toan', 200, 'Thanh toán'],
  ['/dat-hang-thanh-cong?code=CTS-2026-88910', 200, 'Đặt hàng thành công'],
  ['/tra-cuu-don-hang', 200, 'Form tra cứu vận đơn'],
  ['/tra-cuu-don-hang?code=CTS-2026-88910', 200, 'Kết quả tra cứu'],
  ['/tim-kiem?q=tai+nghe', 200, 'Tìm kiếm'],

  ['/blog', 200, 'Blog index'],
  ['/blog/top-5-setup-goc-lam-viec-toi-gian-2026', 200, 'Blog detail'],
  ['/blog/chu-de/cong-nghe', 302, 'Lọc chủ đề (redirect)'],
  ['/tin-tuc', 200, 'Alias tin tức'],
  ['/ve-chung-toi', 200, 'Giới thiệu'],
  ['/gioi-thieu', 200, 'Alias giới thiệu'],
  ['/lien-he', 200, 'Liên hệ'],
  ['/faq', 200, 'FAQ'],
  ['/huong-dan-mua-hang', 200, 'Hướng dẫn mua hàng'],
  ['/chinh-sach/doi-tra', 200, 'Đổi trả'],
  ['/chinh-sach-doi-tra', 200, 'Alias đổi trả'],
  ['/chinh-sach/giao-hang', 200, 'Giao hàng'],
  ['/chinh-sach-van-chuyen', 200, 'Alias vận chuyển'],
  ['/chinh-sach/bao-mat', 200, 'Bảo mật'],
  ['/bao-mat', 200, 'Alias bảo mật'],
  ['/chinh-sach/dieu-khoan', 200, 'Điều khoản'],
  ['/dieu-khoan', 200, 'Alias điều khoản'],
  ['/chinh-sach-bao-hanh', 200, 'Bảo hành'],
  ['/phuong-thuc-thanh-toan', 200, 'Thanh toán'],
  ['/he-thong-cua-hang', 200, 'Cửa hàng'],
  ['/tuyen-dung', 200, 'Tuyển dụng'],

  ['/dang-nhap', 200, 'Đăng nhập'],
  ['/dang-ky', 200, 'Đăng ký'],
  ['/quen-mat-khau', 200, 'Quên mật khẩu'],
  ['/dat-lai-mat-khau', 200, 'Đặt lại mật khẩu'],
  ['/xac-minh-email', 200, 'Xác minh email'],

  ['/404', 404, 'Not Found'],
  ['/403', 403, 'Forbidden'],
  ['/500', 500, 'Server Error'],
  ['/session-expired', 200, 'Session expired'],
  ['/bao-tri', 503, 'Maintenance'],
];

const CUSTOMER_ROUTES = [
  ['/tai-khoan', 200, 'Bảng điều khiển'],
  ['/tai-khoan/ho-so', 200, 'Hồ sơ'],
  ['/tai-khoan/dia-chi', 200, 'Sổ địa chỉ'],
  ['/tai-khoan/don-hang', 200, 'Lịch sử đơn'],
  ['/tai-khoan/don-hang/CTS-2026-88910', 200, 'Chi tiết đơn'],
  ['/tai-khoan/cuttayshop-plus', 200, 'Hội viên Plus'],
  ['/tai-khoan/ma-giam-gia', 200, 'Voucher'],
  ['/tai-khoan/doi-mat-khau', 200, 'Đổi mật khẩu'],
  ['/tai-khoan/danh-gia', 200, 'Đánh giá'],
];

const ADMIN_ROUTES = [
  ['/admin', 200, 'Dashboard'],
  ['/admin/san-pham', 200, 'Sản phẩm'],
  ['/admin/san-pham/them-moi', 200, 'Thêm sản phẩm'],
  ['/admin/san-pham/chinh-sua/1', 200, 'Sửa sản phẩm'],
  ['/admin/danh-muc', 200, 'Danh mục'],
  ['/admin/don-hang', 200, 'Đơn hàng'],
  ['/admin/don-hang/chi-tiet/1', 200, 'Chi tiết đơn'],
  ['/admin/don-hang/in-phieu/1', 200, 'In phiếu'],
  ['/admin/ton-kho', 200, 'Tồn kho'],
  ['/admin/khach-hang', 200, 'Khách hàng'],
  ['/admin/khach-hang/1', 200, 'Chi tiết khách'],
  ['/admin/khuyen-mai', 200, 'Voucher'],
  ['/admin/flash-sale', 200, 'Flash sale'],
  ['/admin/banner-cms', 200, 'Banner'],
  ['/admin/danh-gia', 200, 'Đánh giá'],
  ['/admin/bai-viet', 200, 'Bài viết'],
  ['/admin/bao-cao', 200, 'Báo cáo'],
  ['/admin/cai-dat', 200, 'Cài đặt'],
  ['/admin/san-pham/1/bien-the', 200, 'Biến thể'],
  ['/admin/ho-tro', 200, 'Hỗ trợ'],
  ['/admin/phan-quyen', 200, 'Phân quyền'],
  ['/admin/nguoi-dung', 200, 'Tài khoản'],
  ['/admin/nhat-ky', 200, 'Nhật ký'],

  ['/admin/products', 200, 'Products (EN)'],
  ['/admin/products/create', 200, 'Create (EN)'],
  ['/admin/products/edit/1', 200, 'Edit (EN)'],
  ['/admin/categories', 200, 'Categories (EN)'],
  ['/admin/orders', 200, 'Orders (EN)'],
  ['/admin/orders/detail/1', 200, 'Order detail (EN)'],
  ['/admin/orders/print-slip/1', 200, 'Print slip (EN)'],
  ['/admin/inventory', 200, 'Inventory (EN)'],
  ['/admin/customers', 200, 'Customers (EN)'],
  ['/admin/customers/detail/1', 200, 'Customer detail (EN)'],
  ['/admin/promotions', 200, 'Promotions (EN)'],
  ['/admin/promotions/flash-sale', 200, 'Flash sale (EN)'],
  ['/admin/banners', 200, 'Banners (EN)'],
  ['/admin/reviews', 200, 'Reviews (EN)'],
  ['/admin/blog', 200, 'Blog (EN)'],
  ['/admin/reports', 200, 'Reports (EN)'],
  ['/admin/settings', 200, 'Settings (EN)'],
  ['/admin/variants', 200, 'Variants (EN)'],
  ['/admin/support', 200, 'Support (EN)'],
  ['/admin/roles', 200, 'Roles (EN)'],
];

const ASSETS = [
  '/css/design-system.css',
  '/css/tokens-compat.css',
  '/css/homepage.css',
  '/css/storefront-pages.css',
  '/css/catalog.css',
  '/css/admin-portal.css',
  '/css/responsive-fixes.css',
  '/js/cart-api.js',
  '/js/store-interactions.js',
  '/js/catalog.js',
  '/images/products/headphones-pro.webp',
  '/images/categories/cat-cong-nghe.webp',
  '/images/compositions/hero/headphones-cutout.webp',
  '/favicon.ico',
];

let pass = 0;
let fail = 0;
const failures = [];

function ok(label) {
  pass++;
  console.log(`  ✅ ${label}`);
}

function bad(label, detail) {
  fail++;
  failures.push(`${label} — ${detail}`);
  console.log(`  ❌ ${label} — ${detail}`);
}

/** Cookie jar tối giản để giữ phiên giữa các request. */
function makeJar() {
  const jar = new Map();
  return {
    header() {
      return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
    },
    absorb(res) {
      const raw = typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : [];
      for (const cookie of raw) {
        const [pair] = cookie.split(';');
        const idx = pair.indexOf('=');
        if (idx > 0) jar.set(pair.slice(0, idx).trim(), pair.slice(idx + 1).trim());
      }
    },
  };
}

async function request(path, { method = 'GET', body, jar, json } = {}) {
  const headers = {};
  if (jar) headers.Cookie = jar.header();

  let payload;
  if (body) {
    if (json) {
      headers['Content-Type'] = 'application/json; charset=utf-8';
      payload = JSON.stringify(body);
    } else {
      headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
      payload = new URLSearchParams(body).toString();
    }
  }

  const res = await fetch(BASE + path, { method, headers, body: payload, redirect: 'manual' });
  if (jar) jar.absorb(res);
  return res;
}

async function login(credentials) {
  const jar = makeJar();
  const res = await request('/dang-nhap', { method: 'POST', body: credentials, jar });
  if (res.status !== 302) throw new Error(`Đăng nhập thất bại (${res.status})`);
  return jar;
}

async function checkRoutes(routes, jar, groupLabel) {
  console.log(`\n── ${groupLabel} ──`);
  for (const [path, expected, label] of routes) {
    try {
      const res = await request(path, { jar });
      if (res.status === expected) ok(`${String(res.status).padEnd(3)} ${path}  — ${label}`);
      else bad(path, `${res.status} (mong đợi ${expected}) — ${label}`);
    } catch (err) {
      bad(path, err.message);
    }
  }
}

async function checkApi() {
  console.log('\n── API JSON ──');
  const jar = makeJar();

  const cases = [
    {
      label: 'GET /api/v1/search/quick',
      run: async () => {
        const res = await request('/api/v1/search/quick?q=tai+nghe', { jar });
        const data = await res.json();
        return Array.isArray(data.products) && data.products.length > 0;
      },
    },
    {
      label: 'GET /Home/SearchSuggestions',
      run: async () => {
        const res = await request('/Home/SearchSuggestions?q=tai+nghe', { jar });
        const data = await res.json();
        return Array.isArray(data) && data.length > 0;
      },
    },
    {
      label: 'POST /api/v1/cart/add',
      run: async () => {
        const res = await request('/api/v1/cart/add', {
          method: 'POST', json: true, body: { productId: 1, quantity: 2 }, jar,
        });
        const data = await res.json();
        return data.success === true && data.cart.count === 2;
      },
    },
    {
      label: 'GET /api/v1/cart',
      run: async () => {
        const res = await request('/api/v1/cart', { jar });
        const data = await res.json();
        return data.count === 2 && data.subtotal > 0;
      },
    },
    {
      label: 'POST /api/v1/cart/update',
      run: async () => {
        const cart = await (await request('/api/v1/cart', { jar })).json();
        const res = await request('/api/v1/cart/update', {
          method: 'POST', json: true, body: { itemId: cart.items[0].id, quantity: 3 }, jar,
        });
        const data = await res.json();
        return data.success === true && data.cart.count === 3;
      },
    },
    {
      label: 'POST /api/v1/cart/apply-coupon (đủ điều kiện)',
      run: async () => {
        const res = await request('/api/v1/cart/apply-coupon', {
          method: 'POST', json: true, body: { code: 'CUTTAYNEW' }, jar,
        });
        const data = await res.json();
        return data.success === true && data.discountAmount === 20000;
      },
    },
    {
      label: 'POST /api/v1/cart/apply-coupon (mã sai)',
      run: async () => {
        const res = await request('/api/v1/cart/apply-coupon', {
          method: 'POST', json: true, body: { code: 'KHONG-TON-TAI' }, jar,
        });
        const data = await res.json();
        return data.success === false;
      },
    },
    {
      label: 'POST /api/v1/cart/remove',
      run: async () => {
        const cart = await (await request('/api/v1/cart', { jar })).json();
        const res = await request('/api/v1/cart/remove', {
          method: 'POST', json: true, body: { itemId: cart.items[0].id }, jar,
        });
        const data = await res.json();
        return data.success === true && data.cart.count === 0;
      },
    },
    {
      label: 'POST /api/v1/wishlist/toggle (chưa đăng nhập → 401)',
      run: async () => {
        const res = await request('/api/v1/wishlist/toggle', {
          method: 'POST', json: true, body: { productId: 1 }, jar,
        });
        const data = await res.json();
        return res.status === 401 && data.requiresLogin === true;
      },
    },
    {
      label: 'POST /api/v1/ai/chat',
      run: async () => {
        const res = await request('/api/v1/ai/chat', {
          method: 'POST', json: true, body: { message: 'tai nghe nao tot' }, jar,
        });
        const data = await res.json();
        return typeof data.reply === 'string';
      },
    },
  ];

  for (const c of cases) {
    try {
      if (await c.run()) ok(c.label);
      else bad(c.label, 'dữ liệu trả về không đúng');
    } catch (err) {
      bad(c.label, err.message);
    }
  }

  try {
    const customerJar = await login(CUSTOMER);
    const res = await request('/api/v1/wishlist/toggle', {
      method: 'POST', json: true, body: { productId: 1 }, jar: customerJar,
    });
    const data = await res.json();
    if (data.success === true) ok('POST /api/v1/wishlist/toggle (đã đăng nhập)');
    else bad('POST /api/v1/wishlist/toggle (đã đăng nhập)', JSON.stringify(data));
  } catch (err) {
    bad('POST /api/v1/wishlist/toggle (đã đăng nhập)', err.message);
  }
}

async function checkAssets() {
  console.log('\n── Tài nguyên tĩnh ──');
  for (const path of ASSETS) {
    try {
      const res = await request(path);
      if (res.status === 200) ok(`200 ${path}`);
      else bad(path, String(res.status));
    } catch (err) {
      bad(path, err.message);
    }
  }
}

async function checkAuthGuards() {
  console.log('\n── Kiểm tra phân quyền ──');

  try {
    const res = await request('/admin');
    if (res.status === 302) ok('/admin chưa đăng nhập → 302 (đúng)');
    else bad('/admin chưa đăng nhập', `nhận ${res.status}, mong đợi 302`);
  } catch (err) {
    bad('/admin chưa đăng nhập', err.message);
  }

  try {
    const jar = await login(CUSTOMER);
    const res = await request('/admin', { jar });
    if (res.status === 403) ok('/admin với quyền khách → 403 (đúng)');
    else bad('/admin với quyền khách', `nhận ${res.status}, mong đợi 403`);
  } catch (err) {
    bad('/admin với quyền khách', err.message);
  }

  try {
    const res = await request('/dang-nhap', {
      method: 'POST',
      body: { identifier: 'admin@cuttayshop.vn', password: 'sai-mat-khau' },
    });
    if (res.status === 401) ok('Đăng nhập sai mật khẩu → 401 (đúng)');
    else bad('Đăng nhập sai mật khẩu', `nhận ${res.status}, mong đợi 401`);
  } catch (err) {
    bad('Đăng nhập sai mật khẩu', err.message);
  }
}

/* ------------------------------------------------------------------ chạy */

console.log(`\nKiểm thử tại ${BASE}`);

await checkRoutes(PUBLIC_ROUTES, null, '1. Tuyến công khai');

try {
  const customerJar = await login(CUSTOMER);
  await checkRoutes(CUSTOMER_ROUTES, customerJar, '2. Cổng khách hàng (đã đăng nhập)');
} catch (err) {
  bad('Đăng nhập khách hàng', err.message);
}

try {
  const adminJar = await login(ADMIN);
  await checkRoutes(ADMIN_ROUTES, adminJar, '3. Cổng quản trị (đã đăng nhập admin)');
} catch (err) {
  bad('Đăng nhập admin', err.message);
}

await checkAuthGuards();
await checkApi();
await checkAssets();

console.log(`\n${'='.repeat(64)}`);
console.log(`KẾT QUẢ: ${pass} đạt / ${fail} lỗi / ${pass + fail} tổng`);
if (failures.length) {
  console.log('\nChi tiết lỗi:');
  failures.forEach((f) => console.log(`  • ${f}`));
}
console.log('='.repeat(64));

process.exit(fail === 0 ? 0 : 1);
