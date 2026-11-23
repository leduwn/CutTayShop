/**
 * CutTayShop — Giỏ hàng & yêu thích phía client, dùng API thật (SQLite).
 * Thay thế hoàn toàn localStorage của bản demo cũ.
 */
(function (root) {
  'use strict';

  const api = {
    async get(url) {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      return res.json();
    },
    async post(url, body) {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body || {}),
      });
      return res.json();
    },
  };

  function formatVnd(n) {
    return new Intl.NumberFormat('en-US').format(Math.round(Number(n) || 0)) + ' ₫';
  }

  function toast(message, type = 'success') {
    let el = document.getElementById('cts-toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'cts-toast';
      el.style.cssText = [
        'position:fixed', 'bottom:24px', 'left:50%', 'transform:translateX(-50%) translateY(20px)',
        'padding:12px 20px', 'border-radius:9999px', 'font-size:0.875rem', 'font-weight:600',
        'z-index:9999', 'opacity:0', 'transition:all .25s ease', 'pointer-events:none',
        'box-shadow:0 8px 24px rgba(15,23,42,.18)', 'max-width:90vw', 'text-align:center',
      ].join(';');
      document.body.appendChild(el);
    }

    el.textContent = message;
    el.style.background = type === 'error' ? '#E11D48' : '#059669';
    el.style.color = '#fff';
    el.style.opacity = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(el._timer);
    el._timer = setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2600);
  }

  function updateBadges(cart) {
    const count = cart ? cart.count : 0;
    document.querySelectorAll('[data-cart-badge]').forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  function renderCartTotals(cart) {
    const set = (sel, value) => {
      document.querySelectorAll(sel).forEach((el) => { el.textContent = value; });
    };
    set('[data-cart-subtotal]', formatVnd(cart.subtotal));
    set('[data-cart-total]', formatVnd(cart.subtotal));
    set('[data-checkout-subtotal]', formatVnd(cart.subtotal));
    set('[data-checkout-total]', formatVnd(cart.subtotal));
  }

  async function refreshCart() {
    try {
      const cart = await api.get('/api/v1/cart');
      updateBadges(cart);
      renderCartTotals(cart);
      return cart;
    } catch {
      return null;
    }
  }

  async function addToCart(productId, quantity = 1, variantId = null) {
    const result = await api.post('/api/v1/cart/add', { productId, quantity, variantId });

    if (!result.success) {
      toast(result.message || 'Không thể thêm vào giỏ hàng', 'error');
      return result;
    }

    updateBadges(result.cart);
    renderCartTotals(result.cart);
    toast(result.message || 'Đã thêm vào giỏ hàng! 🛍️');
    return result;
  }

  async function updateItem(itemId, quantity) {
    const result = await api.post('/api/v1/cart/update', { itemId, quantity });
    if (result.success) {
      updateBadges(result.cart);
      renderCartTotals(result.cart);
    }
    return result;
  }

  async function removeItem(itemId) {
    const result = await api.post('/api/v1/cart/remove', { itemId });
    if (result.success) {
      updateBadges(result.cart);
      renderCartTotals(result.cart);
    }
    return result;
  }

  async function toggleWishlist(productId) {
    const result = await api.post('/api/v1/wishlist/toggle', { productId });

    if (result.requiresLogin) {
      toast('Vui lòng đăng nhập để lưu sản phẩm yêu thích', 'error');
      setTimeout(() => { window.location.href = '/dang-nhap?returnUrl=' + encodeURIComponent(location.pathname); }, 900);
      return result;
    }

    if (result.success) toast(result.message);
    return result;
  }

  /* ------------------------------------------------------------- khởi tạo */

  document.addEventListener('DOMContentLoaded', () => {
    refreshCart();

    // Nút thêm vào giỏ trên thẻ sản phẩm
    document.addEventListener('click', async (e) => {
      const cardBtn = e.target.closest('.product-card-add-btn');
      if (cardBtn) {
        const card = cardBtn.closest('.product-card');
        const id = card && Number(card.dataset.productId);
        if (id) {
          e.preventDefault();
          await addToCart(id, 1);
        }
        return;
      }

      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        e.preventDefault();
        await addToCart(Number(addBtn.getAttribute('data-add-to-cart')), 1);
        return;
      }

      // Nút trên trang chi tiết sản phẩm
      const pdpAdd = e.target.closest('[data-pdp-add-cart]');
      if (pdpAdd) {
        e.preventDefault();
        const id = Number(pdpAdd.dataset.productId);
        const qtyInput = document.querySelector('[data-stepper-input]');
        const qty = qtyInput ? Math.max(1, Number(qtyInput.value) || 1) : 1;
        await addToCart(id, qty);
        return;
      }

      const buyNow = e.target.closest('[data-pdp-buy-now]');
      if (buyNow) {
        e.preventDefault();
        const id = Number(buyNow.dataset.productId);
        const qtyInput = document.querySelector('[data-stepper-input]');
        const qty = qtyInput ? Math.max(1, Number(qtyInput.value) || 1) : 1;
        const result = await addToCart(id, qty);
        if (result.success) window.location.href = '/thanh-toan';
        return;
      }

      // Tim yêu thích
      const wishBtn = e.target.closest('.product-card-wishlist');
      if (wishBtn) {
        e.preventDefault();
        const card = wishBtn.closest('.product-card');
        const id = card && Number(card.dataset.productId);
        if (id) {
          const result = await toggleWishlist(id);
          if (result.success) wishBtn.classList.toggle('active', result.added);
        }
      }
    });

    // Tăng / giảm số lượng trong trang giỏ hàng
    document.addEventListener('click', async (e) => {
      const minus = e.target.closest('[data-qty-minus]');
      const plus = e.target.closest('[data-qty-plus]');
      const remove = e.target.closest('[data-remove-item]');

      if (minus || plus) {
        const btn = minus || plus;
        const itemId = Number(btn.dataset.itemId);
        const card = btn.closest('.cart-item-card');
        const input = card && card.querySelector('.qty-input');
        if (!itemId || !input) return;

        const next = Math.max(1, Number(input.value) + (plus ? 1 : -1));
        input.value = next;
        await updateItem(itemId, next);
        return;
      }

      if (remove) {
        const itemId = Number(remove.dataset.removeItem);
        if (!itemId) return;

        const card = remove.closest('.cart-item-card');
        const result = await removeItem(itemId);

        if (result.success && card) {
          card.style.transition = 'all .25s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(.96)';
          setTimeout(() => {
            card.remove();
            if (!document.querySelectorAll('.cart-item-card').length) window.location.reload();
          }, 250);
        }
        toast('Đã xoá sản phẩm khỏi giỏ hàng');
      }
    });
  });

  root.CutTayCart = {
    addToCart,
    updateItem,
    removeItem,
    refreshCart,
    toggleWishlist,
    toast,
    formatVnd,

    /** Tương thích với homepage.js cũ: nhận object sản phẩm. */
    addItem(product) {
      const id = Number(product && product.id);
      const qty = Number(product && product.quantity) || 1;
      if (!id) return Promise.resolve({ success: false });
      return addToCart(id, qty);
    },
  };
})(window);
