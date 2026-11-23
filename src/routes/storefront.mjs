/** Route storefront: trang chủ, catalog, PDP, giỏ hàng, thanh toán, blog, nội dung. */
import * as repo from '../repository.mjs';
import { toCatalogFilters, sendHtml, redirect } from '../http/utils.mjs';
import { cartIdentity } from '../http/session.mjs';
import { renderHome, renderPrivacy } from '../views/home.mjs';
import { renderCatalog, renderProductDetail } from '../views/catalog.mjs';
import {
  renderCart, renderCheckout, renderOrderSuccess, renderTracking,
  renderFlashSale, renderPromotionIndex, renderWishlist, renderCompare,
} from '../views/shop.mjs';
import {
  renderBlogIndex, renderBlogDetail, renderAbout, renderCareers, renderContact,
  renderFAQ, renderPaymentMethods, renderPrivacyPolicy, renderReturnPolicy,
  renderShippingPolicy, renderTerms, renderWarranty, renderStores,
} from '../views/content.mjs';
import { newOrderCode } from '../format.mjs';

const SHIPPING_FEES = { standard: 30000, express: 45000 };
const SHIPPING_LABELS = {
  standard: 'Giao hàng tiêu chuẩn',
  express: 'Giao hàng hỏa tốc 2H',
};
const PAYMENT_LABELS = {
  cod: 'Thanh toán khi nhận hàng (COD)',
  vietqr: 'Chuyển khoản VietQR',
  demo_bank: 'Thẻ ATM / Internet Banking',
};

export function registerStorefrontRoutes(router) {
  /* ------------------------------------------------------------- trang chủ */

  router.get('/', (req, res) => {
    sendHtml(res, renderHome({
      categories: repo.getCategories(),
      trustBenefits: repo.getTrustBenefits(),
      promoBanners: repo.getPromoBanners(),
      dealCountdown: repo.getDealCountdown(),
      hotDeals: repo.getHotDeals(),
      featuredProducts: repo.getFeaturedProducts(),
      newArrivals: repo.getNewArrivals(),
    }));
  });

  router.get('/privacy', (req, res) => sendHtml(res, renderPrivacy()));

  /* --------------------------------------------------------------- catalog */

  const catalogIndex = (req, res) => {
    const filters = toCatalogFilters(req.query);
    sendHtml(res, renderCatalog({
      title: 'Tất cả sản phẩm',
      description: 'Khám phá hàng ngàn sản phẩm công nghệ, thời trang và đời sống cao cấp tại CutTayShop.',
      breadcrumbs: [
        { label: 'Trang chủ', url: '/' },
        { label: 'Sản phẩm', url: null },
      ],
      result: repo.getCatalog(filters),
      filter: filters,
      category: null,
      isSearch: false,
      searchQuery: null,
    }));
  };

  router.getAny(['/san-pham', '/danh-muc'], catalogIndex);

  router.get('/danh-muc/:slug', (req, res) => {
    const category = repo.getCategoryBySlug(req.params.slug);
    if (!category) return notFound(res);

    const filters = toCatalogFilters(req.query, { categorySlug: req.params.slug });

    sendHtml(res, renderCatalog({
      title: category.name,
      description: `Bộ sưu tập sản phẩm ngành hàng ${category.name} chính hãng, cập nhật xu hướng mới nhất 2026.`,
      breadcrumbs: [
        { label: 'Trang chủ', url: '/' },
        { label: 'Sản phẩm', url: '/san-pham' },
        { label: category.name, url: null },
      ],
      result: repo.getCatalog(filters),
      filter: filters,
      category,
      isSearch: false,
      searchQuery: null,
    }));
  });

  router.get('/san-pham/:slug', (req, res) => {
    const product = repo.getProductBySlug(req.params.slug);
    if (!product) return notFound(res);

    const breadcrumbs = [
      { label: 'Trang chủ', url: '/' },
      { label: 'Sản phẩm', url: '/san-pham' },
    ];
    if (product.categorySlug && product.categoryName) {
      breadcrumbs.push({ label: product.categoryName, url: `/danh-muc/${product.categorySlug}` });
    }
    breadcrumbs.push({ label: product.name, url: null });

    sendHtml(res, renderProductDetail({
      product,
      breadcrumbs,
      relatedProducts: repo.getRelatedProducts(product.id, 4),
      selectedVariant: product.variants[0] || null,
    }));
  });

  router.get('/tim-kiem', (req, res) => {
    const q = (req.query.q || '').trim();
    const filters = toCatalogFilters(req.query, { searchQuery: q });
    const result = repo.getCatalog(filters);

    const title = q ? `Kết quả tìm kiếm cho: "${q}"` : 'Tìm kiếm sản phẩm';
    const description = result.totalItems > 0
      ? `Tìm thấy ${result.totalItems.toLocaleString('en-US')} sản phẩm phù hợp với từ khóa của bạn.`
      : 'Không tìm thấy sản phẩm nào phù hợp. Bạn vui lòng thử lại với từ khóa khác.';

    sendHtml(res, renderCatalog({
      title,
      description,
      breadcrumbs: [
        { label: 'Trang chủ', url: '/' },
        { label: 'Tìm kiếm', url: null },
      ],
      result,
      filter: filters,
      category: null,
      isSearch: true,
      searchQuery: q,
    }));
  });

  /* ------------------------------------------------------------ giỏ hàng */

  router.get('/gio-hang', (req, res) => {
    const cart = repo.getCart(cartIdentity(req));
    sendHtml(res, renderCart({
      cart,
      suggestedProducts: repo.getFeaturedProducts(),
      availableCoupons: repo.getCoupons(),
    }));
  });

  /* ------------------------------------------------------------ thanh toán */

  router.get('/thanh-toan', (req, res) => {
    const cart = repo.getCart(cartIdentity(req));
    sendHtml(res, renderCheckout({ cart, user: req.user }));
  });

  router.post('/thanh-toan', (req, res) => {
    const body = req.body || {};
    const fullName = (body.fullName || '').trim();
    const phoneNumber = (body.phoneNumber || '').trim();
    const city = (body.city || '').trim();
    const district = (body.district || '').trim();
    const address = (body.address || '').trim();

    const identity = cartIdentity(req);
    const cart = repo.getCart(identity);

    if (!fullName || !phoneNumber || !city || !district || !address) {
      return sendHtml(res, renderCheckout({ cart, user: req.user }), 400);
    }

    if (!cart.items.length) {
      return redirect(res, '/gio-hang');
    }

    const shippingMethod = body.shippingMethod === 'express' ? 'express' : 'standard';
    const paymentMethod = ['cod', 'vietqr', 'demo_bank'].includes(body.paymentMethod)
      ? body.paymentMethod
      : 'cod';

    const items = cart.items.map((it) => ({
      productId: it.productId,
      productName: it.name,
      productSlug: it.slug,
      imageUrl: it.imageUrl,
      variantName: it.variantName,
      unitPrice: it.unitPrice,
      quantity: it.quantity,
    }));

    const subtotal = cart.subtotal;
    const shippingFee = SHIPPING_FEES[shippingMethod];
    const discount = 0;

    const order = repo.createOrder({
      orderCode: newOrderCode(),
      userId: req.user ? req.user.id : null,
      customerName: fullName,
      phoneNumber,
      email: body.email || '',
      shippingAddress: `${address}, ${district}, ${city}`,
      shippingMethod: SHIPPING_LABELS[shippingMethod],
      paymentMethod: PAYMENT_LABELS[paymentMethod],
      subtotal,
      shippingFee,
      discount,
      note: body.note || null,
      items,
    });

    // Trừ tồn kho + xoá giỏ sau khi đặt thành công
    for (const it of cart.items) repo.adjustStock(it.productId, -it.quantity);
    repo.clearCart(identity);

    repo.logAudit({
      userId: req.user ? req.user.id : null,
      action: 'create_order',
      entity: 'order',
      entityId: order.id,
      detail: `${order.orderCode} — ${subtotal}₫`,
    });

    redirect(res, `/dat-hang-thanh-cong?code=${encodeURIComponent(order.orderCode)}`);
  });

  router.get('/dat-hang-thanh-cong', (req, res) => {
    const code = (req.query.code || '').trim();
    let order = code ? repo.getOrderByCode(code) : null;

    if (!order) {
      // Fallback giống CheckoutController: dựng đơn demo khi không tìm thấy mã
      const demo = repo.getProductBySlug('tai-nghe-chup-tai-studio-pro-wireless');
      order = {
        orderCode: code || 'CTS-2026-DEMO',
        customerName: req.query.name || 'Khách hàng CutTayShop',
        phoneNumber: req.query.phone || '0988 123 456',
        email: 'nguyenvanan@gmail.com',
        shippingAddress: req.query.addr || 'Số 18, Nguyễn Đình Chiểu, Hai Bà Trưng, Hà Nội',
        paymentMethod: req.query.pay === 'vietqr'
          ? 'Chuyển khoản VietQR'
          : (req.query.pay === 'demo_bank' ? 'Thẻ ATM / Internet Banking' : 'Thanh toán khi nhận hàng (COD)'),
        createdAt: new Date().toISOString().slice(0, 19),
        status: 'Đang xử lý',
        subtotal: 1490000,
        shippingFee: 30000,
        discount: 20000,
        totalAmount: 1500000,
        items: demo ? [{
          productId: demo.id,
          productName: demo.name,
          productSlug: demo.slug,
          imageUrl: demo.imageUrl,
          variantName: demo.variants[0]?.name || null,
          unitPrice: demo.price,
          quantity: 1,
          totalPrice: demo.price,
        }] : [],
      };
    }

    sendHtml(res, renderOrderSuccess({
      order,
      recommendedProducts: repo.getFeaturedProducts(),
    }));
  });

  /* -------------------------------------------------------- tra cứu vận đơn */

  router.get('/tra-cuu-don-hang', (req, res) => {
    const code = (req.query.code || '').trim();
    const model = {
      queryCode: code || null,
      phoneNumber: req.query.phone || null,
      order: null,
      hasSearched: false,
      errorMessage: null,
    };

    if (code) {
      model.hasSearched = true;
      model.order = repo.getOrderByCode(code);
      if (!model.order) {
        model.errorMessage = `Không tìm thấy đơn hàng với mã "${code}". Vui lòng kiểm tra lại thông tin.`;
      }
    }

    sendHtml(res, renderTracking(model));
  });

  router.post('/tra-cuu-don-hang', (req, res) => {
    const code = (req.body?.queryCode || '').trim();
    if (!code) {
      return sendHtml(res, renderTracking({
        queryCode: null,
        phoneNumber: null,
        order: null,
        hasSearched: false,
        errorMessage: 'Vui lòng nhập mã đơn hàng cần tra cứu',
      }), 400);
    }
    redirect(res, `/tra-cuu-don-hang?code=${encodeURIComponent(code)}`);
  });

  /* ------------------------------------------------------------- khuyến mãi */
  router.get('/flash-sale', (req, res) => {
    sendHtml(res, renderFlashSale({
      countdown: repo.getDealCountdown(),
      deals: repo.getHotDeals(),
      categories: repo.getCategories(),
    }));
  });

  router.getAny(['/khuyen-mai', '/deals'], (req, res) => {
    sendHtml(res, renderPromotionIndex({
      coupons: repo.getCoupons(),
      hotDeals: repo.getHotDeals(),
      banners: repo.getPromoBanners(),
    }));
  });

  /* --------------------------------------------------------------- wishlist */

  router.get('/yeu-thich', (req, res) => {
    const saved = req.user ? repo.getWishlist(req.user.id) : [];
    sendHtml(res, renderWishlist({
      products: saved.length ? saved : repo.getFeaturedProducts(),
      savedCount: saved.length,
      isLoggedIn: !!req.user,
    }));
  });

  /* ---------------------------------------------------------------- so sánh */

  router.get('/so-sanh', (req, res) => {
    sendHtml(res, renderCompare(repo.getAllProducts()));
  });

  /* ------------------------------------------------------------------- blog */

  router.getAny(['/blog', '/tin-tuc'], (req, res) => {
    const chuDe = (req.query.chuDe || '').trim();
    const allPosts = repo.getBlogPosts();

    const posts = chuDe
      ? allPosts.filter((p) => p.categorySlug.toLowerCase() === chuDe.toLowerCase())
      : allPosts;

    sendHtml(res, renderBlogIndex({
      posts,
      featuredPost: allPosts[0] || null,
      currentCategory: chuDe || null,
      categories: [...new Set(allPosts.map((p) => p.category))],
    }));
  });

  router.get('/blog/chu-de/:slug', (req, res) => {
    redirect(res, `/blog?chuDe=${encodeURIComponent(req.params.slug)}`);
  });

  router.get('/blog/:slug', (req, res) => {
    const post = repo.getBlogPostBySlug(req.params.slug);
    if (!post) return notFound(res);

    const recent = repo.getBlogPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
    const relatedProducts = post.relatedProductSlugs
      .map((slug) => repo.getProductBySlug(slug))
      .filter(Boolean);

    sendHtml(res, renderBlogDetail({ post, recentPosts: recent, relatedProducts }));
  });

  /* --------------------------------------------------------- trang nội dung */

  router.getAny(['/ve-chung-toi', '/gioi-thieu'], (req, res) => sendHtml(res, renderAbout()));
  router.get('/tuyen-dung', (req, res) => sendHtml(res, renderCareers()));

  router.get('/lien-he', (req, res) => sendHtml(res, renderContact({})));

  router.post('/lien-he', (req, res) => {
    const body = req.body || {};
    const fullName = (body.fullName || '').trim();
    const email = (body.email || '').trim();
    const message = (body.message || '').trim();

    if (!fullName || !email || !message) {
      return sendHtml(res, renderContact({
        errorMessage: 'Vui lòng nhập đầy đủ Họ tên, Email và Nội dung tin nhắn.',
      }), 400);
    }

    repo.createContactMessage({
      fullName,
      email,
      phone: (body.phone || '').trim(),
      message,
    });

    sendHtml(res, renderContact({
      successMessage: 'Cảm ơn bạn đã liên hệ! CutTayShop sẽ phản hồi trong vòng 24 giờ.',
    }));
  });

  router.getAny(['/faq', '/huong-dan-mua-hang'], (req, res) => sendHtml(res, renderFAQ()));

  router.getAny(['/chinh-sach/doi-tra', '/chinh-sach-doi-tra'], (req, res) => sendHtml(res, renderReturnPolicy()));

  router.getAny(
    ['/chinh-sach/giao-hang', '/chinh-sach-giao-hang', '/chinh-sach-van-chuyen'],
    (req, res) => sendHtml(res, renderShippingPolicy()),
  );

  router.getAny(
    ['/chinh-sach/bao-mat', '/chinh-sach-bao-mat', '/bao-mat'],
    (req, res) => sendHtml(res, renderPrivacyPolicy()),
  );

  router.getAny(['/chinh-sach/dieu-khoan', '/dieu-khoan'], (req, res) => sendHtml(res, renderTerms()));

  router.get('/chinh-sach-bao-hanh', (req, res) => sendHtml(res, renderWarranty()));
  router.get('/phuong-thuc-thanh-toan', (req, res) => sendHtml(res, renderPaymentMethods()));
  router.get('/he-thong-cua-hang', (req, res) => sendHtml(res, renderStores()));
}

/** Handler 404 dùng chung — được server gắn sau khi đăng ký route. */
let notFoundHandler = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
};

export function setNotFoundHandler(fn) {
  notFoundHandler = fn;
}

function notFound(res) {
  return notFoundHandler(res);
}
