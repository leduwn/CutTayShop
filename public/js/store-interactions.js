/**
 * CutTayShop — Storefront & Demo State Interactions
 * Powers Cart, Wishlist, Quick Search, Flash Sale Countdown, Coupons & AI
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Toast Notification Helper
  // -------------------------------------------------------------------------
  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;top:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:10px;pointer-events:none;';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'cuttay-toast';
    toast.style.cssText = `
      background: ${type === 'success' ? '#0F172A' : '#EF4444'};
      color: #FFFFFF;
      padding: 12px 20px;
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠️'}</span><span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 250);
    }, 2500);
  }

  // -------------------------------------------------------------------------
  // 2. Wishlist Client State
  // -------------------------------------------------------------------------
  const WISHLIST_KEY = 'cuttayshop_wishlist';

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function setWishlist(items) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
    updateWishlistBadges();
  }

  function toggleWishlistItem(productId, productName) {
    const list = getWishlist();
    const idx = list.indexOf(productId);
    if (idx > -1) {
      list.splice(idx, 1);
      setWishlist(list);
      showToast(`Đã xóa khỏi danh sách yêu thích`, 'success');
      return false;
    } else {
      list.push(productId);
      setWishlist(list);
      showToast(`Đã thêm vào danh sách yêu thích!`, 'success');
      return true;
    }
  }

  function updateWishlistBadges() {
    const count = getWishlist().length;
    document.querySelectorAll('[data-wishlist-count-label]').forEach(el => {
      if (count > 0) {
        el.textContent = `Bạn đã lưu ${count} sản phẩm yêu thích`;
      }
    });
  }

  // -------------------------------------------------------------------------
  // 3. Cart Client State & Badges
  // -------------------------------------------------------------------------
  const CART_KEY = 'cuttayshop_cart_items';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[{"id":1,"qty":1,"price":1490000}]');
    } catch (e) {
      return [{ id: 1, qty: 1, price: 1490000 }];
    }
  }

  function setCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartBadges();
  }

  function updateCartBadges() {
    const cart = getCart();
    const count = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    document.querySelectorAll('[data-cart-badge]').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  // -------------------------------------------------------------------------
  // 4. Live Quick Search Dropdown
  // -------------------------------------------------------------------------
  function setupQuickSearch() {
    const searchInputs = document.querySelectorAll('.search-pill-input');
    searchInputs.forEach(input => {
      const form = input.closest('form');
      const dropdown = form ? form.parentElement.querySelector('.search-dropdown') : null;
      if (!dropdown) return;

      let debounceTimer = null;
      input.addEventListener('input', function () {
        const query = this.value.trim();
        clearTimeout(debounceTimer);

        if (query.length < 2) {
          dropdown.style.display = 'none';
          dropdown.innerHTML = '';
          return;
        }

        debounceTimer = setTimeout(async () => {
          try {
            const resp = await fetch(`/api/v1/search/quick?q=${encodeURIComponent(query)}`);
            if (!resp.ok) return;
            const data = await resp.json();

            if (data.products && data.products.length > 0) {
              dropdown.innerHTML = data.products.map(p => `
                <a href="/san-pham/${p.slug}" class="search-drop-item" style="display:flex;align-items:center;gap:12px;padding:10px 16px;text-decoration:none;color:inherit;border-bottom:1px solid var(--color-border);">
                  <img src="${p.imageUrl}" alt="${p.name}" style="width:40px;height:40px;object-fit:cover;border-radius:6px;" />
                  <div style="flex:1;min-width:0;">
                    <div style="font-weight:700;font-size:0.875rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.name}</div>
                    <div style="font-size:0.75rem;color:var(--color-primary);font-weight:700;">${new Intl.NumberFormat('vi-VN').format(p.price)} ₫</div>
                  </div>
                </a>
              `).join('');
              dropdown.style.display = 'block';
            } else {
              dropdown.innerHTML = `<div style="padding:16px;text-align:center;color:var(--color-text-muted);font-size:0.875rem;">Không tìm thấy sản phẩm phù hợp</div>`;
              dropdown.style.display = 'block';
            }
          } catch (e) {
            console.error('QuickSearch error:', e);
          }
        }, 200);
      });

      document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.style.display = 'none';
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 5. Live Countdown Timer for Flash Sale
  // -------------------------------------------------------------------------
  function setupCountdown() {
    const countdownEl = document.querySelector('[data-countdown-end]');
    if (!countdownEl) return;

    function tick() {
      const now = new Date();
      // Target end of current day or next 4 hours
      const target = new Date();
      target.setHours(23, 59, 59, 999);

      const diff = Math.max(0, target - now);
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const hEl = countdownEl.querySelector('.hours');
      const mEl = countdownEl.querySelector('.minutes');
      const sEl = countdownEl.querySelector('.seconds');

      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }

    tick();
    setInterval(tick, 1000);
  }

  // -------------------------------------------------------------------------
  // 6. Voucher Copy Button
  // -------------------------------------------------------------------------
  function setupVouchers() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', function () {
        const code = this.getAttribute('data-copy');
        if (!code) return;

        navigator.clipboard?.writeText(code).then(() => {
          showToast(`Đã sao chép mã ${code}!`);
          const actionBtn = this.querySelector('.copy-action-btn');
          if (actionBtn) {
            actionBtn.textContent = 'Đã lưu ✓';
            setTimeout(() => { actionBtn.textContent = 'Lưu mã'; }, 2000);
          }
        }).catch(() => {
          showToast(`Mã giảm giá: ${code}`);
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 7. Cart Interactions & Voucher Apply
  // -------------------------------------------------------------------------
  function setupCartInteractions() {
    // Quantity increment / decrement
    document.querySelectorAll('[data-qty-minus]').forEach(btn => {
      btn.addEventListener('click', function () {
        const input = this.parentElement.querySelector('.qty-input');
        if (input && parseInt(input.value) > 1) {
          input.value = parseInt(input.value) - 1;
          updateCartSubtotal();
        }
      });
    });

    document.querySelectorAll('[data-qty-plus]').forEach(btn => {
      btn.addEventListener('click', function () {
        const input = this.parentElement.querySelector('.qty-input');
        if (input && parseInt(input.value) < 10) {
          input.value = parseInt(input.value) + 1;
          updateCartSubtotal();
        }
      });
    });

    // Remove item
    document.querySelectorAll('[data-remove-item]').forEach(btn => {
      btn.addEventListener('click', function () {
        const card = this.closest('.cart-item-card');
        if (card) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          card.style.transition = 'all 0.25s ease';
          setTimeout(() => {
            card.remove();
            showToast('Đã xóa sản phẩm khỏi giỏ hàng');
            const cartList = document.querySelector('[data-cart-list]');
            if (cartList && cartList.children.length === 0) {
              cartList.innerHTML = `
                <div class="empty-cart-state" style="text-align:center;padding:48px 20px;background:var(--color-bg-primary);border-radius:16px;border:1px solid var(--color-border);">
                  <div style="font-size:3rem;margin-bottom:12px;">🛒</div>
                  <h3 style="font-size:1.25rem;font-weight:800;margin-bottom:8px;">Giỏ hàng của bạn đang trống</h3>
                  <p style="color:var(--color-text-secondary);margin-bottom:24px;">Hãy khám phá hàng ngàn deal hot và sản phẩm chất lượng tại CutTayShop.</p>
                  <a href="/san-pham" class="btn-pill btn-pill-primary">Tiếp tục mua sắm →</a>
                </div>
              `;
            }
            updateCartSubtotal();
          }, 250);
        }
      });
    });

    // Voucher apply
    const applyBtn = document.getElementById('btn-apply-coupon');
    const couponInput = document.getElementById('cart-coupon-input');
    const feedback = document.getElementById('coupon-feedback');

    if (applyBtn && couponInput) {
      applyBtn.addEventListener('click', async () => {
        const code = couponInput.value.trim();
        if (!code) {
          if (feedback) {
            feedback.style.display = 'block';
            feedback.style.color = '#EF4444';
            feedback.textContent = 'Vui lòng nhập mã giảm giá';
          }
          return;
        }

        try {
          const resp = await fetch('/api/v1/cart/apply-coupon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code })
          });
          const result = await resp.json();

          if (result.success) {
            if (feedback) {
              feedback.style.display = 'block';
              feedback.style.color = '#10B981';
              feedback.textContent = result.message;
            }
            const discountRow = document.getElementById('row-discount');
            if (discountRow) discountRow.style.display = 'flex';
            showToast(`Đã áp dụng mã ${code}!`);
            updateCartSubtotal(result.discountAmount);
          } else {
            if (feedback) {
              feedback.style.display = 'block';
              feedback.style.color = '#EF4444';
              feedback.textContent = result.message || 'Mã không hợp lệ';
            }
          }
        } catch (e) {
          console.error(e);
        }
      });
    }

    function updateCartSubtotal(discount = 20000) {
      const cards = document.querySelectorAll('.cart-item-card');
      let subtotal = 0;
      cards.forEach(card => {
        const qty = parseInt(card.querySelector('.qty-input')?.value || 1);
        subtotal += 1490000 * qty;
      });

      const total = Math.max(0, subtotal - (document.getElementById('row-discount')?.style.display !== 'none' ? discount : 0));
      const subtotalEl = document.querySelector('[data-cart-subtotal]');
      const totalEl = document.querySelector('[data-cart-total]');

      if (subtotalEl) subtotalEl.textContent = new Intl.NumberFormat('vi-VN').format(subtotal) + ' ₫';
      if (totalEl) totalEl.textContent = new Intl.NumberFormat('vi-VN').format(total) + ' ₫';
    }
  }

  // -------------------------------------------------------------------------
  // 8. Global Event Listeners & Initialization
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadges();
    updateWishlistBadges();
    setupQuickSearch();
    setupCountdown();
    setupVouchers();
    setupCartInteractions();

    // Add to cart buttons across cards and PDP
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('[data-add-to-cart]');
      if (addBtn) {
        const prodId = parseInt(addBtn.getAttribute('data-add-to-cart') || '1');
        const cart = getCart();
        const existing = cart.find(i => i.id === prodId);
        if (existing) {
          existing.qty = (existing.qty || 1) + 1;
        } else {
          cart.push({ id: prodId, qty: 1, price: 1490000 });
        }
        setCart(cart);
        showToast('Đã thêm sản phẩm vào giỏ hàng! 🛍️');
      }

      const wishBtn = e.target.closest('[data-wishlist-toggle]');
      if (wishBtn) {
        const prodId = parseInt(wishBtn.getAttribute('data-wishlist-toggle') || '1');
        const isAdded = toggleWishlistItem(prodId);
        wishBtn.classList.toggle('active', isAdded);
      }
    });
  });
})();
