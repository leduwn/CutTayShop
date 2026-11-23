/**
 * CutTayShop - Global Cart State Management (Demo)
 * Manages cart state in localStorage under 'cuttayshop_demo_cart'
 * Dispatches 'cart:updated' and keeps [data-cart-badge] in sync.
 */
(function (root) {
  'use strict';

  const STORAGE_KEY = 'cuttayshop_demo_cart';

  const CutTayCart = {
    _items: [],

    _load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            this._items = parsed;
            return;
          }
        }
      } catch (err) {
        console.warn('CutTayCart: Error reading from localStorage', err);
      }
      this._items = [];
    },

    _save() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items));
      } catch (err) {
        console.warn('CutTayCart: Error saving to localStorage', err);
      }
      this.updateBadges();
      this._dispatch();
    },

    _dispatch() {
      const detail = {
        items: this.getItems(),
        count: this.getCount(),
        total: this.getTotal()
      };
      const event = new CustomEvent('cart:updated', { detail });
      window.dispatchEvent(event);
      document.dispatchEvent(event);
    },

    getItems() {
      return this._items.map(item => Object.assign({}, item));
    },

    addItem(item) {
      if (!item || item.id === undefined || item.id === null) {
        return null;
      }

      const id = item.id;
      const name = String(item.name || 'Sản phẩm');
      const slug = String(item.slug || '');
      const price = Number(item.price) || 0;
      const imageUrl = String(item.imageUrl || '/images/products/placeholder.svg');
      const quantity = Math.max(1, parseInt(item.quantity, 10) || 1);
      const variantName = String(item.variantName || '');

      const existingIndex = this._items.findIndex(
        i => String(i.id) === String(id) && String(i.variantName || '') === variantName
      );

      if (existingIndex > -1) {
        this._items[existingIndex].quantity += quantity;
      } else {
        this._items.push({
          id,
          name,
          slug,
          price,
          imageUrl,
          quantity,
          variantName
        });
      }

      this._save();
      return this.getItems();
    },

    removeItem(id, variantName) {
      this._items = this._items.filter(item => {
        if (String(item.id) !== String(id)) return true;
        if (variantName !== undefined && variantName !== null && String(item.variantName || '') !== String(variantName)) {
          return true;
        }
        return false;
      });
      this._save();
      return this.getItems();
    },

    updateQuantity(id, qty, variantName) {
      const quantity = parseInt(qty, 10);
      if (isNaN(quantity) || quantity <= 0) {
        return this.removeItem(id, variantName);
      }

      const item = this._items.find(i => {
        if (String(i.id) !== String(id)) return false;
        if (variantName !== undefined && variantName !== null && String(i.variantName || '') !== String(variantName)) {
          return false;
        }
        return true;
      });

      if (item) {
        item.quantity = quantity;
        this._save();
      }
      return this.getItems();
    },

    getCount() {
      return this._items.reduce((sum, item) => sum + (parseInt(item.quantity, 10) || 0), 0);
    },

    getTotal() {
      return this._items.reduce(
        (sum, item) => sum + ((Number(item.price) || 0) * (parseInt(item.quantity, 10) || 0)),
        0
      );
    },

    clear() {
      this._items = [];
      this._save();
    },

    updateBadges() {
      const count = this.getCount();
      const badges = document.querySelectorAll('[data-cart-badge]');
      badges.forEach(badge => {
        if (count > 0) {
          badge.textContent = count > 99 ? '99+' : String(count);
          badge.style.display = 'flex';
        } else {
          badge.textContent = '0';
          badge.style.display = 'none';
        }
      });
    },

    init() {
      this._load();
      this.updateBadges();

      // Sync across browser tabs/windows
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
          this._load();
          this.updateBadges();
          this._dispatch();
        }
      });
    }
  };

  // Initialize early
  CutTayCart.init();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      CutTayCart.updateBadges();
    });
  } else {
    CutTayCart.updateBadges();
  }

  root.CutTayCart = CutTayCart;
})(typeof window !== 'undefined' ? window : this);
