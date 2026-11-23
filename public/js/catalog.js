/**
 * CutTayShop - Catalog (PLP) & Product Detail (PDP) Interactive Scripts
 * Filters, Sorting, Gallery thumbnails, Variant selection, Stepper, Tabs, Cart integration.
 */
document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. MOBILE FILTER DRAWER
  // ==========================================================================
  const filterTrigger = document.querySelector('[data-mobile-filter-trigger]');
  const filterDrawer = document.querySelector('[data-filter-drawer]');
  const filterClose = document.querySelector('[data-filter-drawer-close]');

  if (filterTrigger && filterDrawer) {
    const openDrawer = () => filterDrawer.classList.add('is-open');
    const closeDrawer = () => filterDrawer.classList.remove('is-open');

    filterTrigger.addEventListener('click', openDrawer);

    if (filterClose) {
      filterClose.addEventListener('click', closeDrawer);
    }

    // Close on backdrop click
    filterDrawer.addEventListener('click', (e) => {
      if (e.target === filterDrawer) {
        closeDrawer();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && filterDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });
  }

  // ==========================================================================
  // 2. SORT SELECT ONCHANGE -> NAVIGATE URL
  // ==========================================================================
  const sortSelect = document.querySelector('[data-sort-select]');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const url = new URL(window.location.href);
      url.searchParams.set('sortBy', e.target.value);
      url.searchParams.set('page', '1'); // reset to page 1 on sort change
      window.location.href = url.toString();
    });
  }

  // ==========================================================================
  // 3. PDP GALLERY THUMBNAIL CLICK
  // ==========================================================================
  const mainImage = document.querySelector('.pdp-gallery-main-img');
  const thumbButtons = document.querySelectorAll('.pdp-thumb-btn');

  if (mainImage && thumbButtons.length > 0) {
    thumbButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const newSrc = btn.getAttribute('data-img-src');
        if (newSrc) {
          mainImage.src = newSrc;
          thumbButtons.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
        }
      });
    });
  }

  // ==========================================================================
  // 4. PDP VARIANT SELECTION
  // ==========================================================================
  const variantPills = document.querySelectorAll('.pdp-variant-pill');
  const priceDisplay = document.querySelector('.pdp-price-current');

  if (variantPills.length > 0) {
    variantPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const parentGroup = pill.closest('.pdp-option-group');
        if (parentGroup) {
          parentGroup.querySelectorAll('.pdp-variant-pill').forEach(p => p.classList.remove('is-selected'));
        }
        pill.classList.add('is-selected');

        // Update price if variant specifies one
        const variantPrice = pill.getAttribute('data-variant-price');
        if (variantPrice && priceDisplay) {
          const num = Number(variantPrice);
          if (!isNaN(num)) {
            priceDisplay.textContent = num.toLocaleString('vi-VN') + '₫';
          }
        }
      });
    });
  }

  // ==========================================================================
  // 5. QUANTITY STEPPER
  // ==========================================================================
  const stepperMinus = document.querySelector('[data-stepper-minus]');
  const stepperPlus = document.querySelector('[data-stepper-plus]');
  const stepperInput = document.querySelector('[data-stepper-input]');

  if (stepperInput) {
    const getQty = () => parseInt(stepperInput.value, 10) || 1;
    const setQty = (val) => {
      const min = parseInt(stepperInput.getAttribute('min'), 10) || 1;
      const max = parseInt(stepperInput.getAttribute('max'), 10) || 99;
      const clamped = Math.max(min, Math.min(max, val));
      stepperInput.value = clamped;
    };

    if (stepperMinus) {
      stepperMinus.addEventListener('click', () => setQty(getQty() - 1));
    }
    if (stepperPlus) {
      stepperPlus.addEventListener('click', () => setQty(getQty() + 1));
    }
    stepperInput.addEventListener('change', () => setQty(getQty()));
  }

  // ==========================================================================
  // 6. PDP TABS NAVIGATION
  // ==========================================================================
  const tabTriggers = document.querySelectorAll('.pdp-tab-trigger');
  const tabPanes = document.querySelectorAll('.pdp-tab-content');

  if (tabTriggers.length > 0 && tabPanes.length > 0) {
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const targetId = trigger.getAttribute('data-tab-target');
        tabTriggers.forEach(t => t.classList.remove('is-active'));
        tabPanes.forEach(p => p.classList.remove('is-active'));

        trigger.classList.add('is-active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('is-active');
        }
      });
    });
  }

  // ==========================================================================
  // 7. ADD TO CART FROM PDP & PRODUCT CARDS
  // ==========================================================================
  function showCartToast(name) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #0F172A;
        color: #FFFFFF;
        padding: 12px 24px;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 600;
        z-index: 999;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        opacity: 0;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = `Đã thêm "${name}" vào giỏ hàng!`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2400);
  }

  // PDP Add-to-cart buttons (Main + Mobile sticky)
  const pdpAddBtns = document.querySelectorAll('[data-pdp-add-cart]');
  pdpAddBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-product-id'), 10);
      const name = btn.getAttribute('data-product-name') || 'Sản phẩm';
      const price = parseFloat(btn.getAttribute('data-product-price')) || 0;
      const imageUrl = btn.getAttribute('data-product-image') || '';
      const slug = btn.getAttribute('data-product-slug') || '';
      const qty = stepperInput ? parseInt(stepperInput.value, 10) || 1 : 1;

      const selectedVariant = document.querySelector('.pdp-variant-pill.is-selected');
      const variantName = selectedVariant ? selectedVariant.textContent.trim() : '';

      if (window.CutTayCart) {
        window.CutTayCart.addItem({
          id: id,
          name: name,
          price: price,
          imageUrl: imageUrl,
          slug: slug,
          quantity: qty,
          variantName: variantName
        });
      }

      showCartToast(name);
    });
  });

  // PDP Buy-now CTA
  const pdpBuyNowBtn = document.querySelector('[data-pdp-buy-now]');
  if (pdpBuyNowBtn) {
    pdpBuyNowBtn.addEventListener('click', () => {
      const id = parseInt(pdpBuyNowBtn.getAttribute('data-product-id'), 10);
      const name = pdpBuyNowBtn.getAttribute('data-product-name') || 'Sản phẩm';
      const price = parseFloat(pdpBuyNowBtn.getAttribute('data-product-price')) || 0;
      const imageUrl = pdpBuyNowBtn.getAttribute('data-product-image') || '';
      const slug = pdpBuyNowBtn.getAttribute('data-product-slug') || '';
      const qty = stepperInput ? parseInt(stepperInput.value, 10) || 1 : 1;

      const selectedVariant = document.querySelector('.pdp-variant-pill.is-selected');
      const variantName = selectedVariant ? selectedVariant.textContent.trim() : '';

      if (window.CutTayCart) {
        window.CutTayCart.addItem({
          id: id,
          name: name,
          price: price,
          imageUrl: imageUrl,
          slug: slug,
          quantity: qty,
          variantName: variantName
        });
      }

      window.location.href = '/gio-hang';
    });
  }
});
