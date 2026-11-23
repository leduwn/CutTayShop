/** API JSON — giỏ hàng, wishlist, tìm kiếm, voucher, đánh giá, AI (dữ liệu thật từ SQLite). */
import * as repo from '../repository.mjs';
import { sendJson } from '../http/utils.mjs';
import { cartIdentity } from '../http/session.mjs';
import { n0 } from '../format.mjs';

export function registerApiRoutes(router) {
  /* ------------------------------------------------------- gợi ý tìm kiếm */

  router.get('/Home/SearchSuggestions', (req, res) => {
    const q = (req.query.q || '').trim();
    const results = repo.searchProducts(q).slice(0, 5);

    sendJson(res, results.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: `${n0(p.price)}₫`,
      originalPrice: p.originalPrice > 0 ? `${n0(p.originalPrice)}₫` : null,
      imageUrl: p.imageUrl,
      categoryName: p.categoryName,
    })));
  });

  router.get('/api/v1/search/quick', (req, res) => {
    const q = (req.query.q || '').trim();
    if (!q) return sendJson(res, { products: [] });

    const products = repo.searchProducts(q).slice(0, 6).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: p.price,
      originalPrice: p.originalPrice,
      imageUrl: p.imageUrl,
      categoryName: p.categoryName,
      rating: p.rating,
    }));

    sendJson(res, { products });
  });

  /* ------------------------------------------------------------------- cart */

  router.get('/api/v1/cart', (req, res) => {
    sendJson(res, repo.getCart(cartIdentity(req)));
  });

  router.post('/api/v1/cart/add', (req, res) => {
    const productId = Number(req.body?.productId);
    const variantId = req.body?.variantId ? Number(req.body.variantId) : null;
    const quantity = Math.max(1, Number(req.body?.quantity) || 1);

    const product = repo.getProductById(productId);
    if (!product) {
      return sendJson(res, { success: false, message: 'Sản phẩm không tồn tại' }, 404);
    }

    const cart = repo.addCartItem({
      ...cartIdentity(req),
      productId,
      variantId,
      quantity,
    });

    sendJson(res, {
      success: true,
      message: `Đã thêm "${product.name}" vào giỏ hàng thành công!`,
      cart,
      product: {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        imageUrl: product.imageUrl,
      },
    });
  });

  router.post('/api/v1/cart/update', (req, res) => {
    const itemId = Number(req.body?.itemId);
    const quantity = Number(req.body?.quantity);

    if (!itemId || Number.isNaN(quantity)) {
      return sendJson(res, { success: false, message: 'Tham số không hợp lệ' }, 400);
    }

    const cart = repo.updateCartItem({ ...cartIdentity(req), itemId, quantity });
    sendJson(res, { success: true, cart });
  });

  router.post('/api/v1/cart/remove', (req, res) => {
    const itemId = Number(req.body?.itemId);
    if (!itemId) return sendJson(res, { success: false, message: 'Thiếu itemId' }, 400);

    const cart = repo.removeCartItem({ ...cartIdentity(req), itemId });
    sendJson(res, { success: true, cart });
  });

  router.post('/api/v1/cart/apply-coupon', (req, res) => {
    const code = (req.body?.code || '').trim();
    const coupon = repo.getCouponByCode(code);

    if (!coupon || !coupon.isActive) {
      return sendJson(res, { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn' }, 400);
    }

    const cart = repo.getCart(cartIdentity(req));
    if (cart.subtotal < coupon.minOrderValue) {
      return sendJson(res, {
        success: false,
        message: `Đơn hàng tối thiểu ${n0(coupon.minOrderValue)}₫ để dùng mã này`,
      }, 400);
    }

    let discount = coupon.discountAmount;
    if (coupon.discountPercent) {
      discount = Math.min(coupon.discountAmount, Math.round(cart.subtotal * coupon.discountPercent / 100));
    }

    sendJson(res, {
      success: true,
      message: `Áp dụng thành công mã ${coupon.code}: ${coupon.title}`,
      code: coupon.code,
      discountAmount: discount,
      discountPercent: coupon.discountPercent,
      minOrderValue: coupon.minOrderValue,
      subtotal: cart.subtotal,
      total: Math.max(0, cart.subtotal - discount),
    });
  });

  /* --------------------------------------------------------------- wishlist */

  router.post('/api/v1/wishlist/toggle', (req, res) => {
    if (!req.user) {
      return sendJson(res, {
        success: false,
        requiresLogin: true,
        message: 'Vui lòng đăng nhập để lưu sản phẩm yêu thích',
      }, 401);
    }

    const productId = Number(req.body?.productId);
    const product = repo.getProductById(productId);
    if (!product) {
      return sendJson(res, { success: false, message: 'Sản phẩm không tồn tại' }, 404);
    }

    const result = repo.toggleWishlist(req.user.id, productId);
    sendJson(res, {
      success: true,
      added: result.added,
      productId: product.id,
      productName: product.name,
      message: result.added
        ? `Đã lưu "${product.name}" vào yêu thích`
        : `Đã bỏ "${product.name}" khỏi yêu thích`,
    });
  });

  router.get('/api/v1/wishlist', (req, res) => {
    if (!req.user) return sendJson(res, { products: [] });
    sendJson(res, {
      products: repo.getWishlist(req.user.id).map((p) => ({
        id: p.id, name: p.name, slug: p.slug, price: p.price, imageUrl: p.imageUrl,
      })),
    });
  });

  /* ---------------------------------------------------------------- reviews */

  router.post('/api/v1/reviews', (req, res) => {
    if (!req.user) {
      return sendJson(res, { success: false, requiresLogin: true, message: 'Vui lòng đăng nhập để đánh giá' }, 401);
    }

    const productId = Number(req.body?.productId);
    const rating = Math.min(5, Math.max(1, Number(req.body?.rating) || 5));
    const comment = String(req.body?.comment || '').trim();

    if (!repo.getProductById(productId)) {
      return sendJson(res, { success: false, message: 'Sản phẩm không tồn tại' }, 404);
    }
    if (comment.length < 5) {
      return sendJson(res, { success: false, message: 'Nội dung đánh giá quá ngắn' }, 400);
    }

    repo.addReview({
      productId,
      userId: req.user.id,
      authorName: req.user.fullName,
      rating,
      comment,
    });

    sendJson(res, {
      success: true,
      message: 'Cảm ơn bạn! Đánh giá đang chờ kiểm duyệt trước khi hiển thị.',
    });
  });

  /* ------------------------------------------------------------ AI assistant */

  router.post('/api/v1/ai/chat', (req, res) => {
    const msg = String(req.body?.message || '').trim().toLowerCase();
    let reply;
    let suggestions = null;

    if (msg.includes('tai nghe') || msg.includes('âm thanh') || msg.includes('headphone')) {
      const p = repo.getProductBySlug('tai-nghe-chup-tai-studio-pro-wireless');
      reply = 'CutTay AI gợi ý bạn mẫu **Tai nghe Studio Pro Wireless** chống ồn chủ động ANC 40h pin, đang có ưu đãi giảm 40% chỉ 1.490.000đ!';
      if (p) suggestions = [{ name: p.name, slug: p.slug, price: p.price, imageUrl: p.imageUrl }];
    } else if (msg.includes('mũ') || msg.includes('thời trang') || msg.includes('hoodie')) {
      const p = repo.getProductBySlug('mu-luoi-trai-cotton-street-style-2026');
      reply = 'Đối với phong cách dạo phố trẻ trung, **Mũ lưỡi trai Cotton Street Style 2026** màu Be Vintage đang là best-seller tuần này của CutTayShop!';
      if (p) suggestions = [{ name: p.name, slug: p.slug, price: p.price, imageUrl: p.imageUrl }];
    } else if (msg.includes('ship') || msg.includes('giao hàng') || msg.includes('vận chuyển')) {
      reply = 'CutTayShop hỗ trợ **Giao hàng hỏa tốc 2H** tại nội thành Hà Nội & TP.HCM, và 2-3 ngày toàn quốc. Đơn từ 250.000đ nhập mã `FREESHIP50` được miễn phí ship bạn nhé!';
    } else {
      reply = 'Xin chào! Tôi là CutTay AI - Trợ lý mua sắm thông minh. Bạn có thể hỏi tôi về gợi ý quà tặng, kiểm tra deal hot hôm nay hoặc chính sách đổi trả 7 ngày!';
    }

    sendJson(res, { reply, suggestions });
  });
}
