/** Route cổng quản trị Admin — CRUD thật, yêu cầu đăng nhập vai trò admin. */
import * as repo from '../repository.mjs';
import { sendHtml, sendJson, redirect } from '../http/utils.mjs';
import { requireAdmin } from './account.mjs';
import {
  renderAdminDashboard, renderAdminProducts, renderAdminProductCreate,
  renderAdminProductEdit, renderAdminCategories, renderAdminOrders,
  renderAdminOrderDetail, renderAdminPrintSlip, renderAdminCustomers,
  renderAdminCustomerDetail, renderAdminInventory, renderAdminCoupons,
  renderAdminFlashSale, renderAdminBanners, renderAdminBlog, renderAdminReviews,
  renderAdminReport, renderAdminVariants, renderAdminRoles, renderAdminSettings,
  renderAdminSupport, renderAdminUsers, renderAdminAudit, setAdminUser,
} from '../views/admin.mjs';

/** Bọc handler: chặn nếu không phải admin. */
function guard(handler) {
  return (req, res) => {
    if (requireAdmin(req, res)) return;
    setAdminUser(req.user);
    return handler(req, res);
  };
}

function audit(req, action, entity, entityId, detail) {
  repo.logAudit({
    userId: req.user ? req.user.id : null,
    action, entity, entityId, detail,
  });
}

export function registerAdminRoutes(router) {
  /* ------------------------------------------------------------- dashboard */

  router.get('/admin', guard((req, res) => {
    const stats = repo.getDashboardStats();
    sendHtml(res, renderAdminDashboard({
      stats,
      recentOrders: repo.getOrders().slice(0, 8),
      topProducts: repo.getFeaturedProducts(),
      salesByCategory: repo.getSalesByCategory(),
    }));
  }));

  /* -------------------------------------------------------------- sản phẩm */

  router.getAny(['/admin/san-pham', '/admin/products'], guard((req, res) => {
    const category = (req.query.category || '').trim();
    const q = (req.query.q || '').trim();

    let products = repo.getAllProducts();
    if (category) {
      products = products.filter((p) => p.categorySlug.toLowerCase() === category.toLowerCase());
    }
    if (q) {
      const needle = q.toLowerCase();
      products = products.filter((p) =>
        p.name.toLowerCase().includes(needle) || p.brand.toLowerCase().includes(needle));
    }

    sendHtml(res, renderAdminProducts({
      products,
      categories: repo.getCategories(),
      selectedCategory: category || null,
      searchQuery: q || null,
      notice: req.query.saved === '1' ? 'Đã lưu sản phẩm thành công!' : null,
    }));
  }));

  router.getAny(['/admin/san-pham/them-moi', '/admin/products/create'], guard((req, res) => {
    sendHtml(res, renderAdminProductCreate({
      product: { inStock: true, totalStock: 50, imageUrl: '/images/products/speaker-mini.webp' },
      categories: repo.getCategories(),
    }));
  }));

  router.post('/admin/san-pham/them-moi', guard((req, res) => {
    const body = req.body || {};
    if (!body.name?.trim() || !body.price) {
      return sendHtml(res, renderAdminProductCreate({
        product: body,
        categories: repo.getCategories(),
        errorMessage: 'Vui lòng nhập Tên sản phẩm và Giá bán.',
      }), 400);
    }

    const product = repo.createProduct({
      name: body.name.trim(),
      categorySlug: body.categorySlug,
      brand: body.brand,
      price: body.price,
      originalPrice: body.originalPrice,
      imageUrl: body.imageUrl,
      totalStock: body.totalStock,
      shortDescription: body.shortDescription,
      description: body.description,
      badgeText: body.badgeText,
      isHotDeal: body.isHotDeal === 'on',
      isFeatured: body.isFeatured === 'on',
      isNewArrival: body.isNewArrival === 'on',
    });

    audit(req, 'create', 'product', product.id, product.name);
    redirect(res, '/admin/san-pham?saved=1');
  }));

  router.getAny(['/admin/san-pham/chinh-sua/:id', '/admin/products/edit/:id'], guard((req, res) => {
    const product = repo.getProductById(Number(req.params.id));
    if (!product) return notFound(res);

    sendHtml(res, renderAdminProductEdit({
      product,
      categories: repo.getCategories(),
    }));
  }));

  router.post('/admin/san-pham/chinh-sua/:id', guard((req, res) => {
    const id = Number(req.params.id);
    const body = req.body || {};

    if (!body.name?.trim() || !body.price) {
      const product = repo.getProductById(id);
      return sendHtml(res, renderAdminProductEdit({
        product: { ...product, ...body },
        categories: repo.getCategories(),
        errorMessage: 'Vui lòng nhập Tên sản phẩm và Giá bán.',
      }), 400);
    }

    const updated = repo.updateProduct(id, {
      name: body.name.trim(),
      categorySlug: body.categorySlug,
      brand: body.brand,
      price: body.price,
      originalPrice: body.originalPrice,
      imageUrl: body.imageUrl,
      totalStock: body.totalStock,
      shortDescription: body.shortDescription,
      description: body.description,
      badgeText: body.badgeText,
      isHotDeal: body.isHotDeal === 'on',
      isFeatured: body.isFeatured === 'on',
      isNewArrival: body.isNewArrival === 'on',
    });

    if (!updated) return notFound(res);
    audit(req, 'update', 'product', id, updated.name);
    redirect(res, '/admin/san-pham?saved=1');
  }));

  router.post('/admin/san-pham/xoa/:id', guard((req, res) => {
    const id = Number(req.params.id);
    const product = repo.getProductById(id);
    repo.deleteProduct(id);
    audit(req, 'delete', 'product', id, product ? product.name : null);
    redirect(res, '/admin/san-pham');
  }));

  router.post('/admin/san-pham/:id/nhap-kho', guard((req, res) => {
    const id = Number(req.params.id);
    const delta = Number(req.body?.delta) || 0;
    repo.adjustStock(id, delta);
    audit(req, 'adjust_stock', 'product', id, `${delta > 0 ? '+' : ''}${delta}`);
    redirect(res, '/admin/ton-kho');
  }));

  router.getAny(
    ['/admin/san-pham/:productId/bien-the', '/admin/variants', '/admin/products/:productId?/variants'],
    guard((req, res) => {
      const productId = Number(req.params.productId) || 1;
      const product = repo.getProductById(productId) || repo.getAllProducts()[0];
      if (!product) return notFound(res);
      sendHtml(res, renderAdminVariants(product));
    }),
  );

  /* -------------------------------------------------------------- danh mục */

  router.getAny(['/admin/danh-muc', '/admin/categories'], guard((req, res) => {
    sendHtml(res, renderAdminCategories({
      categories: repo.getCategories(),
      notice: req.query.saved === '1' ? 'Đã lưu danh mục thành công!' : null,
      error: req.query.error === 'in_use' ? 'Không thể xoá: danh mục còn sản phẩm.' : null,
    }));
  }));

  router.post('/admin/danh-muc/them-moi', guard((req, res) => {
    const body = req.body || {};
    if (!body.name?.trim()) return redirect(res, '/admin/danh-muc');

    const cat = repo.createCategory({
      name: body.name.trim(),
      bgColorHex: body.bgColorHex,
      iconColorHex: body.iconColorHex,
      sortOrder: body.sortOrder,
      imageUrl: body.imageUrl,
    });
    audit(req, 'create', 'category', cat.id, body.name);
    redirect(res, '/admin/danh-muc?saved=1');
  }));

  router.post('/admin/danh-muc/chinh-sua/:id', guard((req, res) => {
    const id = Number(req.params.id);
    const body = req.body || {};
    repo.updateCategory(id, {
      name: body.name?.trim(),
      bgColorHex: body.bgColorHex,
      iconColorHex: body.iconColorHex,
      sortOrder: body.sortOrder,
      imageUrl: body.imageUrl,
    });
    audit(req, 'update', 'category', id, body.name);
    redirect(res, '/admin/danh-muc?saved=1');
  }));

  router.post('/admin/danh-muc/xoa/:id', guard((req, res) => {
    const id = Number(req.params.id);
    const ok = repo.deleteCategory(id);
    audit(req, 'delete', 'category', id, ok ? 'ok' : 'in_use');
    redirect(res, ok ? '/admin/danh-muc?saved=1' : '/admin/danh-muc?error=in_use');
  }));

  /* -------------------------------------------------------------- đơn hàng */

  router.getAny(['/admin/don-hang', '/admin/orders'], guard((req, res) => {
    const status = (req.query.status || '').trim();
    let orders = repo.getOrders();
    if (status) {
      orders = orders.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }
    sendHtml(res, renderAdminOrders({
      orders,
      selectedStatus: status || null,
      statuses: repo.ORDER_STATUSES,
      notice: req.query.saved === '1' ? 'Đã cập nhật đơn hàng!' : null,
    }));
  }));

  router.getAny(
    ['/admin/don-hang/chi-tiet/:id', '/admin/orders/detail/:id'],
    guard((req, res) => {
      const order = repo.getOrderById(Number(req.params.id));
      if (!order) return notFound(res);
      sendHtml(res, renderAdminOrderDetail({
        order,
        statuses: repo.ORDER_STATUSES,
        notice: req.query.saved === '1' ? 'Đã cập nhật đơn hàng!' : null,
      }));
    }),
  );

  router.post('/admin/don-hang/trang-thai/:id', guard((req, res) => {
    const id = Number(req.params.id);
    const status = (req.body?.status || '').trim();
    if (repo.ORDER_STATUSES.includes(status)) {
      repo.updateOrderStatus(id, status);
      audit(req, 'update_status', 'order', id, status);
    }
    redirect(res, `/admin/don-hang/chi-tiet/${id}?saved=1`);
  }));

  router.post('/admin/don-hang/van-don/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.updateOrderTracking(id, (req.body?.trackingNumber || '').trim());
    audit(req, 'update_tracking', 'order', id, req.body?.trackingNumber);
    redirect(res, `/admin/don-hang/chi-tiet/${id}?saved=1`);
  }));

  router.getAny(
    ['/admin/don-hang/in-phieu/:id', '/admin/orders/print-slip/:id'],
    guard((req, res) => {
      const order = repo.getOrderById(Number(req.params.id));
      if (!order) return notFound(res);
      sendHtml(res, renderAdminPrintSlip(order));
    }),
  );

  /* ------------------------------------------------------------ khách hàng */

  router.getAny(['/admin/khach-hang', '/admin/customers'], guard((req, res) => {
    sendHtml(res, renderAdminCustomers({
      users: repo.listUsers(),
      orders: repo.getOrders(),
    }));
  }));

  router.getAny(
    ['/admin/khach-hang/:id', '/admin/khach-hang/detail/:id', '/admin/khach-hang/chi-tiet/:id',
      '/admin/customers/detail/:id'],
    guard((req, res) => {
      const user = repo.getUserById(Number(req.params.id));
      const orders = repo.getOrders().filter((o) => !o.userId || (user && o.userId === user.id));
      sendHtml(res, renderAdminCustomerDetail({ user, orders }));
    }),
  );

  router.post('/admin/khach-hang/khoa/:id', guard((req, res) => {
    const id = Number(req.params.id);
    const user = repo.getUserById(id);
    if (user) {
      const next = user.status === 'active' ? 'locked' : 'active';
      repo.setUserStatus(id, next);
      audit(req, 'set_status', 'user', id, next);
    }
    redirect(res, '/admin/khach-hang');
  }));

  /* --------------------------------------------------------------- tồn kho */

  router.getAny(['/admin/ton-kho', '/admin/inventory'], guard((req, res) => {
    sendHtml(res, renderAdminInventory(repo.getAllProducts()));
  }));

  /* ------------------------------------------------------------- khuyến mãi */

  router.getAny(['/admin/khuyen-mai', '/admin/promotions'], guard((req, res) => {
    sendHtml(res, renderAdminCoupons({
      coupons: repo.getCoupons(),
      notice: req.query.saved === '1' ? 'Đã lưu voucher!' : null,
    }));
  }));

  router.post('/admin/khuyen-mai/them-moi', guard((req, res) => {
    const body = req.body || {};
    if (!body.code?.trim() || !body.title?.trim()) return redirect(res, '/admin/khuyen-mai');

    const coupon = repo.createCoupon(body);
    audit(req, 'create', 'coupon', coupon.id, coupon.code);
    redirect(res, '/admin/khuyen-mai?saved=1');
  }));

  router.post('/admin/khuyen-mai/chinh-sua/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.updateCoupon(id, req.body || {});
    audit(req, 'update', 'coupon', id, req.body?.code);
    redirect(res, '/admin/khuyen-mai?saved=1');
  }));

  router.post('/admin/khuyen-mai/xoa/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.deleteCoupon(id);
    audit(req, 'delete', 'coupon', id, null);
    redirect(res, '/admin/khuyen-mai?saved=1');
  }));

  router.getAny(['/admin/flash-sale', '/admin/promotions/flash-sale'], guard((req, res) => {
    sendHtml(res, renderAdminFlashSale({
      deals: repo.getHotDeals(),
      countdown: repo.getDealCountdown(),
    }));
  }));

  /* ---------------------------------------------------------------- banner */

  router.getAny(['/admin/banner-cms', '/admin/banners'], guard((req, res) => {
    sendHtml(res, renderAdminBanners({
      banners: repo.getPromoBanners(),
      notice: req.query.saved === '1' ? 'Đã lưu banner!' : null,
    }));
  }));

  router.post('/admin/banner-cms/them-moi', guard((req, res) => {
    const id = repo.createBanner(req.body || {});
    audit(req, 'create', 'banner', id, req.body?.categoryTitle);
    redirect(res, '/admin/banner-cms?saved=1');
  }));

  router.post('/admin/banner-cms/chinh-sua/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.updateBanner(id, req.body || {});
    audit(req, 'update', 'banner', id, req.body?.categoryTitle);
    redirect(res, '/admin/banner-cms?saved=1');
  }));

  router.post('/admin/banner-cms/xoa/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.deleteBanner(id);
    audit(req, 'delete', 'banner', id, null);
    redirect(res, '/admin/banner-cms?saved=1');
  }));

  /* ------------------------------------------------------------------ blog */

  router.getAny(['/admin/bai-viet', '/admin/blog'], guard((req, res) => {
    sendHtml(res, renderAdminBlog({
      posts: repo.getBlogPosts(),
      notice: req.query.saved === '1' ? 'Đã lưu bài viết!' : null,
    }));
  }));

  router.post('/admin/bai-viet/them-moi', guard((req, res) => {
    const body = req.body || {};
    if (!body.title?.trim()) return redirect(res, '/admin/bai-viet');

    const post = repo.createBlogPost(body);
    audit(req, 'create', 'blog_post', post.id, body.title);
    redirect(res, '/admin/bai-viet?saved=1');
  }));

  router.post('/admin/bai-viet/chinh-sua/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.updateBlogPost(id, req.body || {});
    audit(req, 'update', 'blog_post', id, req.body?.title);
    redirect(res, '/admin/bai-viet?saved=1');
  }));

  router.post('/admin/bai-viet/xoa/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.deleteBlogPost(id);
    audit(req, 'delete', 'blog_post', id, null);
    redirect(res, '/admin/bai-viet?saved=1');
  }));

  /* -------------------------------------------------------------- đánh giá */

  router.getAny(['/admin/danh-gia', '/admin/reviews'], guard((req, res) => {
    const status = (req.query.status || '').trim();
    sendHtml(res, renderAdminReviews({
      reviews: repo.listReviews({ status: status || null }),
      currentStatus: status || null,
      notice: req.query.saved === '1' ? 'Đã cập nhật đánh giá!' : null,
    }));
  }));

  router.post('/admin/danh-gia/duyet/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.setReviewStatus(id, 'approved');
    audit(req, 'approve', 'review', id, null);
    redirect(res, '/admin/danh-gia?saved=1');
  }));

  router.post('/admin/danh-gia/an/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.setReviewStatus(id, 'hidden');
    audit(req, 'hide', 'review', id, null);
    redirect(res, '/admin/danh-gia?saved=1');
  }));

  router.post('/admin/danh-gia/xoa/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.deleteReview(id);
    audit(req, 'delete', 'review', id, null);
    redirect(res, '/admin/danh-gia?saved=1');
  }));

  /* --------------------------------------------------------------- báo cáo */

  router.getAny(['/admin/bao-cao', '/admin/reports'], guard((req, res) => {
    sendHtml(res, renderAdminReport({
      products: repo.getAllProducts(),
      stats: repo.getDashboardStats(),
      salesByCategory: repo.getSalesByCategory(),
    }));
  }));

  /* -------------------------------------------------------------- hệ thống */

  router.getAny(['/admin/phan-quyen', '/admin/roles'], guard((req, res) => {
    sendHtml(res, renderAdminRoles({
      users: repo.listUsers(),
      notice: req.query.saved === '1' ? 'Đã cập nhật phân quyền!' : null,
    }));
  }));

  router.post('/admin/phan-quyen/vai-tro/:id', guard((req, res) => {
    const id = Number(req.params.id);
    const role = req.body?.role === 'admin' ? 'admin' : 'customer';
    repo.setUserRole(id, role);
    audit(req, 'set_role', 'user', id, role);
    redirect(res, '/admin/phan-quyen?saved=1');
  }));

  router.getAny(['/admin/cai-dat', '/admin/settings'], guard((req, res) => {
    sendHtml(res, renderAdminSettings({
      settings: repo.getSettings(),
      notice: req.query.saved === '1' ? 'Đã lưu cấu hình hệ thống!' : null,
    }));
  }));

  router.post('/admin/cai-dat', guard((req, res) => {
    const body = req.body || {};
    repo.saveSettings({
      brand_name: body.brand_name,
      hotline: body.hotline,
      support_email: body.support_email,
      default_shipping_fee: body.default_shipping_fee,
      freeship_threshold: body.freeship_threshold,
      warehouse_address: body.warehouse_address,
      maintenance_mode: body.maintenance_mode === 'on' ? '1' : '0',
    });
    audit(req, 'update', 'settings', null, null);
    redirect(res, '/admin/cai-dat?saved=1');
  }));

  router.getAny(['/admin/ho-tro', '/admin/support'], guard((req, res) => {
    sendHtml(res, renderAdminSupport({
      messages: repo.listContactMessages(),
      notice: req.query.saved === '1' ? 'Đã cập nhật yêu cầu!' : null,
    }));
  }));

  router.post('/admin/ho-tro/trang-thai/:id', guard((req, res) => {
    const id = Number(req.params.id);
    repo.setContactStatus(id, (req.body?.status || 'resolved').trim());
    audit(req, 'update_status', 'contact', id, req.body?.status);
    redirect(res, '/admin/ho-tro?saved=1');
  }));

  router.get('/admin/nguoi-dung', guard((req, res) => {
    sendHtml(res, renderAdminUsers({ users: repo.listUsers() }));
  }));

  router.get('/admin/nhat-ky', guard((req, res) => {
    sendHtml(res, renderAdminAudit({ entries: repo.listAuditLog(200) }));
  }));
}

let notFoundHandler = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
};

export function setAdminNotFoundHandler(fn) {
  notFoundHandler = fn;
}

function notFound(res) {
  return notFoundHandler(res);
}
