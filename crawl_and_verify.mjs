import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const BASE_URL = 'http://127.0.0.1:5139';
const SCREENSHOT_DIR = path.resolve('docs/reports/screenshots/full-ui');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Locate browser binary
const possibleBrowsers = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
];
const browserPath = possibleBrowsers.find(b => fs.existsSync(b));
console.log('Browser for screenshots:', browserPath || 'None found');

const routesToTest = [
  // Storefront Core
  { url: '/', name: 'Homepage', screenshot: true },
  { url: '/san-pham', name: 'Product Catalog', screenshot: true },
  { url: '/san-pham/tai-nghe-chup-tai-studio-pro-wireless', name: 'Product Detail', screenshot: true },
  { url: '/danh-muc', name: 'Category Index' },
  { url: '/danh-muc/cong-nghe', name: 'Category Filter', screenshot: true },
  { url: '/flash-sale', name: 'Flash Sale', screenshot: true },
  { url: '/deals', name: 'Deals Promotion' },
  { url: '/khuyen-mai', name: 'Promotions', screenshot: true },
  { url: '/yeu-thich', name: 'Wishlist', screenshot: true },
  { url: '/so-sanh', name: 'Compare', screenshot: true },
  { url: '/gio-hang', name: 'Cart', screenshot: true },
  { url: '/thanh-toan', name: 'Checkout', screenshot: true },
  { url: '/dat-hang-thanh-cong?code=CTS-2026-88910', name: 'Order Success', screenshot: true },
  { url: '/tra-cuu-don-hang', name: 'Order Tracking Form', screenshot: true },
  { url: '/tra-cuu-don-hang?code=CTS-2026-88910', name: 'Order Tracking Result' },
  { url: '/tim-kiem?q=tai+nghe', name: 'Search Results' },

  // Blog & Content
  { url: '/blog', name: 'Blog Index', screenshot: true },
  { url: '/blog/top-5-setup-goc-lam-viec-toi-gian-2026', name: 'Blog Detail', screenshot: true },
  { url: '/blog/chu-de/cong-nghe', name: 'Blog Topic' },
  { url: '/tin-tuc', name: 'News Alias' },
  { url: '/ve-chung-toi', name: 'About Us', screenshot: true },
  { url: '/gioi-thieu', name: 'About Us Alias' },
  { url: '/lien-he', name: 'Contact', screenshot: true },
  { url: '/faq', name: 'FAQ' },
  { url: '/huong-dan-mua-hang', name: 'Shopping Guide' },
  { url: '/chinh-sach/doi-tra', name: 'Return Policy' },
  { url: '/chinh-sach-doi-tra', name: 'Return Policy Alias' },
  { url: '/chinh-sach/giao-hang', name: 'Shipping Policy' },
  { url: '/chinh-sach-van-chuyen', name: 'Shipping Policy Alias' },
  { url: '/chinh-sach/bao-mat', name: 'Privacy Policy' },
  { url: '/bao-mat', name: 'Privacy Policy Alias' },
  { url: '/chinh-sach/dieu-khoan', name: 'Terms' },
  { url: '/dieu-khoan', name: 'Terms Alias' },
  { url: '/chinh-sach-bao-hanh', name: 'Warranty Policy' },
  { url: '/phuong-thuc-thanh-toan', name: 'Payment Methods' },
  { url: '/he-thong-cua-hang', name: 'Stores' },
  { url: '/tuyen-dung', name: 'Careers' },

  // Auth & Account
  { url: '/dang-nhap', name: 'Login', screenshot: true },
  { url: '/dang-ky', name: 'Register', screenshot: true },
  { url: '/quen-mat-khau', name: 'Forgot Password' },
  { url: '/dat-lai-mat-khau', name: 'Reset Password' },
  { url: '/xac-minh-email', name: 'Email Verification' },
  { url: '/tai-khoan', name: 'Account Dashboard', screenshot: true },
  { url: '/tai-khoan/ho-so', name: 'Account Profile', screenshot: true },
  { url: '/tai-khoan/dia-chi', name: 'Account Addresses' },
  { url: '/tai-khoan/don-hang', name: 'Account Orders', screenshot: true },
  { url: '/tai-khoan/don-hang/CTS-2026-88910', name: 'Account Order Detail', screenshot: true },
  { url: '/tai-khoan/cuttayshop-plus', name: 'CutTayShop Plus', screenshot: true },
  { url: '/tai-khoan/ma-giam-gia', name: 'Account Vouchers', screenshot: true },
  { url: '/tai-khoan/doi-mat-khau', name: 'Change Password' },
  { url: '/tai-khoan/danh-gia', name: 'Account Reviews' },

  // Admin Portal (Vietnamese canonical routes)
  { url: '/admin', name: 'Admin Dashboard', screenshot: true },
  { url: '/admin/san-pham', name: 'Admin Products VN', screenshot: true },
  { url: '/admin/san-pham/them-moi', name: 'Admin Product Create VN' },
  { url: '/admin/san-pham/chinh-sua/1', name: 'Admin Product Edit VN' },
  { url: '/admin/danh-muc', name: 'Admin Categories VN', screenshot: true },
  { url: '/admin/don-hang', name: 'Admin Orders VN', screenshot: true },
  { url: '/admin/don-hang/chi-tiet/1', name: 'Admin Order Detail VN' },
  { url: '/admin/don-hang/in-phieu/1', name: 'Admin Order Print Slip VN', screenshot: true },
  { url: '/admin/ton-kho', name: 'Admin Inventory VN', screenshot: true },
  { url: '/admin/khach-hang', name: 'Admin Customers VN', screenshot: true },
  { url: '/admin/khach-hang/chi-tiet/1', name: 'Admin Customer Detail VN' },
  { url: '/admin/khuyen-mai', name: 'Admin Vouchers VN', screenshot: true },
  { url: '/admin/flash-sale', name: 'Admin Flash Sale VN', screenshot: true },
  { url: '/admin/banner-cms', name: 'Admin Banners VN', screenshot: true },
  { url: '/admin/danh-gia', name: 'Admin Reviews VN' },
  { url: '/admin/bai-viet', name: 'Admin Blog VN' },
  { url: '/admin/bao-cao', name: 'Admin Reports VN', screenshot: true },
  { url: '/admin/cai-dat', name: 'Admin Settings VN' },
  { url: '/admin/san-pham/1/bien-the', name: 'Admin Variants VN' },
  { url: '/admin/ho-tro', name: 'Admin Support VN' },
  { url: '/admin/phan-quyen', name: 'Admin Roles VN' },

  // Admin Portal (English route aliases)
  { url: '/admin/products', name: 'Admin Products EN' },
  { url: '/admin/products/create', name: 'Admin Product Create EN' },
  { url: '/admin/products/edit/1', name: 'Admin Product Edit EN' },
  { url: '/admin/categories', name: 'Admin Categories EN' },
  { url: '/admin/orders', name: 'Admin Orders EN' },
  { url: '/admin/orders/detail/1', name: 'Admin Order Detail EN' },
  { url: '/admin/orders/print-slip/1', name: 'Admin Order Print EN' },
  { url: '/admin/inventory', name: 'Admin Inventory EN' },
  { url: '/admin/customers', name: 'Admin Customers EN' },
  { url: '/admin/customers/detail/1', name: 'Admin Customer Detail EN' },
  { url: '/admin/promotions', name: 'Admin Promotions EN' },
  { url: '/admin/promotions/flash-sale', name: 'Admin Flash Sale EN' },
  { url: '/admin/banners', name: 'Admin Banners EN' },
  { url: '/admin/reviews', name: 'Admin Reviews EN' },
  { url: '/admin/blog', name: 'Admin Blog EN' },
  { url: '/admin/reports', name: 'Admin Reports EN' },
  { url: '/admin/settings', name: 'Admin Settings EN' },
  { url: '/admin/variants', name: 'Admin Variants EN' },
  { url: '/admin/support', name: 'Admin Support EN' },
  { url: '/admin/roles', name: 'Admin Roles EN' },

  // Status & Error Pages
  { url: '/404', name: 'Error 404', expectedStatus: 404, screenshot: true },
  { url: '/403', name: 'Error 403', expectedStatus: 403 },
  { url: '/500', name: 'Error 500', expectedStatus: 500 },
  { url: '/session-expired', name: 'Session Expired' },
  { url: '/bao-tri', name: 'Maintenance Mode', expectedStatus: 503, screenshot: true }
];

async function runAudit() {
  console.log('=====================================================');
  console.log('🔍 CUTTAYSHOP FULL CRAWLER & ROUTE AUDIT');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;
  const imageSet = new Set();
  const brokenImages = [];
  const svgProductViolations = [];
  const reportRecords = [];

  for (const route of routesToTest) {
    const fullUrl = `${BASE_URL}${route.url}`;
    const expected = route.expectedStatus || 200;

    try {
      const res = await fetch(fullUrl, { headers: { 'Accept': 'text/html' } });
      const status = res.status;
      const html = await res.text();

      const ok = status === expected;
      if (ok) {
        passed++;
        console.log(`[PASS] [${status}] ${route.url} (${route.name}) - ${html.length} bytes`);
      } else {
        failed++;
        console.error(`[FAIL] [${status} != ${expected}] ${route.url} (${route.name})`);
      }

      reportRecords.push({
        url: route.url,
        name: route.name,
        expectedStatus: expected,
        actualStatus: status,
        bytes: html.length,
        status: ok ? 'PASS' : 'FAIL'
      });

      // Extract images: <img [^>]*src=["']([^"']+)["']
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
      let match;
      while ((match = imgRegex.exec(html)) !== null) {
        const src = match[1];
        imageSet.add(src);

        // Check if any product image is .svg
        if (src.includes('/products/') && src.endsWith('.svg')) {
          svgProductViolations.push({ page: route.url, src });
        }
      }

    } catch (err) {
      failed++;
      console.error(`[ERROR] ${route.url}: ${err.message}`);
      reportRecords.push({
        url: route.url,
        name: route.name,
        expectedStatus: expected,
        actualStatus: 'EXCEPTION',
        bytes: 0,
        status: 'FAIL',
        error: err.message
      });
    }
  }

  // Verify all discovered images
  console.log(`\n=====================================================`);
  console.log(`🖼️ VERIFYING ${imageSet.size} UNIQUE ASSETS LOADED ACROSS PAGES`);
  console.log(`=====================================================`);

  let imgPassed = 0;
  let imgFailed = 0;

  for (const imgPath of imageSet) {
    if (imgPath.startsWith('data:') || imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      continue;
    }
    const cleanPath = imgPath.split('?')[0];
    const fullImgUrl = `${BASE_URL}${cleanPath}`;
    try {
      const imgRes = await fetch(fullImgUrl, { method: 'HEAD' });
      if (imgRes.ok) {
        imgPassed++;
      } else {
        imgFailed++;
        brokenImages.push({ path: cleanPath, status: imgRes.status });
        console.warn(`[BROKEN IMG] ${cleanPath} returned HTTP ${imgRes.status}`);
      }
    } catch (e) {
      imgFailed++;
      brokenImages.push({ path: cleanPath, error: e.message });
      console.warn(`[BROKEN IMG] ${cleanPath} failed to fetch: ${e.message}`);
    }
  }

  console.log(`\nImage Check Summary:`);
  console.log(`- Verified OK: ${imgPassed}`);
  console.log(`- Broken: ${imgFailed}`);
  console.log(`- SVG Product Violations: ${svgProductViolations.length}`);

  // Test interactive APIs
  console.log(`\n=====================================================`);
  console.log(`⚡ TESTING INTERACTIVE APIS`);
  console.log(`=====================================================`);

  let apiPassed = 0;
  let apiFailed = 0;

  // 1. Quick search
  try {
    const res = await fetch(`${BASE_URL}/api/v1/search/quick?q=tai`);
    const data = await res.json();
    if (res.ok && data.products && data.products.length > 0) {
      console.log(`[PASS] /api/v1/search/quick?q=tai -> ${data.products.length} products found`);
      apiPassed++;
    } else {
      console.error(`[FAIL] /api/v1/search/quick:`, data);
      apiFailed++;
    }
  } catch (e) {
    console.error(`[ERROR] /api/v1/search/quick:`, e.message);
    apiFailed++;
  }

  // 2. Coupon apply (CUTTAYNEW)
  try {
    const res = await fetch(`${BASE_URL}/api/v1/cart/apply-coupon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: 'CUTTAYNEW' })
    });
    const data = await res.json();
    if (res.ok && data.success && data.discountAmount === 20000) {
      console.log(`[PASS] /api/v1/cart/apply-coupon (CUTTAYNEW) -> discount: ${data.discountAmount} ₫`);
      apiPassed++;
    } else {
      console.error(`[FAIL] /api/v1/cart/apply-coupon:`, data);
      apiFailed++;
    }
  } catch (e) {
    console.error(`[ERROR] /api/v1/cart/apply-coupon:`, e.message);
    apiFailed++;
  }

  // 3. Wishlist toggle
  try {
    const res = await fetch(`${BASE_URL}/api/v1/wishlist/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 1 })
    });
    const data = await res.json();
    if (res.ok && data.success) {
      console.log(`[PASS] /api/v1/wishlist/toggle -> product: ${data.productName}`);
      apiPassed++;
    } else {
      console.error(`[FAIL] /api/v1/wishlist/toggle:`, data);
      apiFailed++;
    }
  } catch (e) {
    console.error(`[ERROR] /api/v1/wishlist/toggle:`, e.message);
    apiFailed++;
  }

  // 4. AI assistant
  try {
    const res = await fetch(`${BASE_URL}/api/v1/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Gợi ý cho tôi tai nghe bluetooth' })
    });
    const data = await res.json();
    if (res.ok && data.reply) {
      console.log(`[PASS] /api/v1/ai/chat -> reply: "${data.reply.substring(0, 45)}..."`);
      apiPassed++;
    } else {
      console.error(`[FAIL] /api/v1/ai/chat:`, data);
      apiFailed++;
    }
  } catch (e) {
    console.error(`[ERROR] /api/v1/ai/chat:`, e.message);
    apiFailed++;
  }

  // Visual Screenshots Generation with Headless Browser
  if (browserPath) {
    console.log(`\n=====================================================`);
    console.log(`📸 CAPTURING RESPONSIVE SCREENSHOTS FOR VISUAL QA`);
    console.log(`=====================================================`);

    const viewports = [
      { name: 'mobile-375', width: 375, height: 812 },
      { name: 'desktop-1440', width: 1440, height: 900 }
    ];

    const capturePages = [
      { url: '/', filePrefix: 'home' },
      { url: '/san-pham', filePrefix: 'catalog' },
      { url: '/san-pham/tai-nghe-chup-tai-studio-pro-wireless', filePrefix: 'product-detail' },
      { url: '/flash-sale', filePrefix: 'flash-sale' },
      { url: '/gio-hang', filePrefix: 'cart' },
      { url: '/thanh-toan', filePrefix: 'checkout' },
      { url: '/dat-hang-thanh-cong?code=CTS-2026-88910', filePrefix: 'order-success' },
      { url: '/tra-cuu-don-hang?code=CTS-2026-88910', filePrefix: 'order-tracking' },
      { url: '/blog', filePrefix: 'blog' },
      { url: '/tai-khoan', filePrefix: 'account-dashboard' },
      { url: '/admin', filePrefix: 'admin-dashboard' },
      { url: '/admin/san-pham', filePrefix: 'admin-products' },
      { url: '/admin/don-hang', filePrefix: 'admin-orders' }
    ];

    for (const page of capturePages) {
      for (const vp of viewports) {
        const outName = `${page.filePrefix}-${vp.name}.png`;
        const outPath = path.join(SCREENSHOT_DIR, outName);
        const targetUrl = `${BASE_URL}${page.url}`;

        try {
          execFileSync(browserPath, [
            '--headless=new',
            '--hide-scrollbars',
            '--disable-gpu',
            `--window-size=${vp.width},${vp.height}`,
            `--screenshot=${outPath}`,
            targetUrl
          ], { timeout: 15000 });
          const stat = fs.statSync(outPath);
          console.log(`[CAPTURED] ${outName} (${(stat.size / 1024).toFixed(1)} KB)`);
        } catch (e) {
          console.warn(`[SCREENSHOT WARN] ${outName}: ${e.message}`);
        }
      }
    }
  }

  // Save JSON report
  fs.writeFileSync('docs/reports/crawl-audit-results.json', JSON.stringify({
    timestamp: new Date().toISOString(),
    routesSummary: { total: routesToTest.length, passed, failed },
    imagesSummary: { totalChecked: imageSet.size, passed: imgPassed, failed: imgFailed, svgViolations: svgProductViolations.length },
    apisSummary: { passed: apiPassed, failed: apiFailed },
    brokenImages,
    routes: reportRecords
  }, null, 2));

  console.log(`\n=====================================================`);
  console.log(`🏁 CRAWL & AUDIT COMPLETE!`);
  console.log(`Routes: ${passed}/${routesToTest.length} Passed`);
  console.log(`Images: ${imgPassed} Verified OK, ${imgFailed} Broken, ${svgProductViolations.length} SVG violations`);
  console.log(`APIs: ${apiPassed}/4 Passed`);
  console.log(`Audit saved to docs/reports/crawl-audit-results.json`);
  console.log(`=====================================================\n`);
}

runAudit();
