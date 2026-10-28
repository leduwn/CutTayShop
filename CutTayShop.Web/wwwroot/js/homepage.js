/**
 * CutTayShop - Homepage Interactive Enhancements
 * Sticky header observer, Countdown timer, Live Search autocomplete,
 * CutTay AI Widget, Keyboard navigation (Escape), and Cart Integration.
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header scroll listener
  const header = document.querySelector('.site-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Countdown Timer Logic
  const countdownEl = document.querySelector('[data-countdown-end]');
  if (countdownEl) {
    const hoursEl = countdownEl.querySelector('[data-hours]');
    const minsEl = countdownEl.querySelector('[data-mins]');
    const secsEl = countdownEl.querySelector('[data-secs]');

    // Target end time: 48h from now if parsed is past, or exact UTC target
    let targetTime = new Date(countdownEl.getAttribute('data-countdown-end')).getTime();
    if (isNaN(targetTime) || targetTime <= Date.now()) {
      targetTime = Date.now() + (23 * 3600 + 45 * 60 + 30) * 1000;
    }

    function updateTimer() {
      const now = Date.now();
      const distance = targetTime - now;

      if (distance <= 0) {
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        if (secsEl) secsEl.textContent = '00';
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((distance % (1000 * 60)) / 1000);

      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(mins).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(secs).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // 3. Search Suggestions Autocomplete (DOM API Only - No innerHTML injection)
  const searchInput = document.querySelector('.search-pill-input');
  const searchDropdown = document.querySelector('.search-dropdown');

  if (searchInput && searchDropdown) {
    let debounceTimer;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearTimeout(debounceTimer);

      if (query.length < 2) {
        searchDropdown.classList.remove('active');
        searchDropdown.innerHTML = '';
        return;
      }

      debounceTimer = setTimeout(async () => {
        try {
          const res = await fetch(`/Home/SearchSuggestions?q=${encodeURIComponent(query)}`);
          if (!res.ok) return;
          const items = await res.json();

          // Safe DOM clearing
          searchDropdown.innerHTML = '';

          if (items && items.length > 0) {
            items.forEach(item => {
              const a = document.createElement('a');
              a.className = 'search-suggestion-item';
              a.href = `/san-pham/${encodeURIComponent(item.slug)}`;

              const img = document.createElement('img');
              img.src = item.imageUrl || '/images/products/placeholder.svg';
              img.alt = item.name;
              img.style.cssText = 'width: 40px; height: 40px; border-radius: 8px; object-fit: contain; background: var(--color-surface-subtle);';

              const infoDiv = document.createElement('div');
              infoDiv.style.flex = '1';

              const nameDiv = document.createElement('div');
              nameDiv.style.cssText = 'font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary);';
              nameDiv.textContent = item.name;

              const priceDiv = document.createElement('div');
              priceDiv.style.cssText = 'font-size: 0.75rem; color: var(--color-sale); font-weight: 700;';
              priceDiv.textContent = item.price;

              infoDiv.appendChild(nameDiv);
              infoDiv.appendChild(priceDiv);
              a.appendChild(img);
              a.appendChild(infoDiv);
              searchDropdown.appendChild(a);
            });
            searchDropdown.classList.add('active');
          } else {
            const emptyDiv = document.createElement('div');
            emptyDiv.style.cssText = 'padding: 12px 16px; font-size: 0.8125rem; color: var(--color-text-muted);';
            emptyDiv.textContent = 'Không tìm thấy sản phẩm phù hợp';
            searchDropdown.appendChild(emptyDiv);
            searchDropdown.classList.add('active');
          }
        } catch (err) {
          console.error('Search suggestion error:', err);
        }
      }, 250);
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.remove('active');
      }
    });
  }

  // 4. CutTay AI Chat Widget Toggle & Interaction
  const aiTrigger = document.querySelector('[data-ai-trigger]');
  const aiCard = document.querySelector('[data-ai-card]');
  const aiClose = document.querySelector('[data-ai-close]');

  const closeAiWidget = () => {
    if (aiCard) {
      aiCard.classList.remove('is-open');
      aiCard.setAttribute('aria-hidden', 'true');
    }
    if (aiTrigger) {
      aiTrigger.setAttribute('aria-expanded', 'false');
    }
  };

  const openAiWidget = () => {
    if (aiCard) {
      aiCard.classList.add('is-open');
      aiCard.setAttribute('aria-hidden', 'false');
      const input = aiCard.querySelector('.ai-input');
      if (input) input.focus();
    }
    if (aiTrigger) {
      aiTrigger.setAttribute('aria-expanded', 'true');
    }
  };

  if (aiTrigger && aiCard) {
    aiTrigger.addEventListener('click', () => {
      if (aiCard.classList.contains('is-open')) {
        closeAiWidget();
      } else {
        openAiWidget();
      }
    });

    if (aiClose) {
      aiClose.addEventListener('click', () => {
        closeAiWidget();
        if (aiTrigger) aiTrigger.focus();
      });
    }

    // Quick chip suggestion handling
    const chips = aiCard.querySelectorAll('.ai-chip');
    const aiBody = aiCard.querySelector('.ai-card-body');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        // Append user question
        const userMsg = document.createElement('div');
        userMsg.className = 'ai-msg';
        userMsg.style.cssText = 'background: var(--color-primary); color: var(--color-primary-text); align-self: flex-end; border-bottom-right-radius: 4px;';
        userMsg.textContent = text;
        aiBody.appendChild(userMsg);

        // Simulate AI response
        setTimeout(() => {
          const botMsg = document.createElement('div');
          botMsg.className = 'ai-msg ai-msg-bot';
          if (text.includes('tai nghe')) {
            botMsg.textContent = 'Em gợi ý mẫu "Studio Pro Wireless" đang có flash sale giảm 40% (còn 1.490.000₫) và được đánh giá 4.9⭐ nhé anh/chị!';
          } else if (text.includes('vận chuyển')) {
            botMsg.textContent = 'CutTayShop giao nhanh 2H trong nội thành và 2-3 ngày toàn quốc. Đơn từ 300k được miễn phí vận chuyển ạ!';
          } else {
            botMsg.textContent = 'CutTay AI luôn sẵn sàng hỗ trợ anh/chị tìm kiếm sản phẩm phong cách với giá tốt nhất hôm nay!';
          }
          aiBody.appendChild(botMsg);
          aiBody.scrollTop = aiBody.scrollHeight;
        }, 500);

        aiBody.scrollTop = aiBody.scrollHeight;
      });
    });
  }

  // 5. Global Keyboard Handling (Escape key closes search dropdown and AI widget)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (searchDropdown && searchDropdown.classList.contains('active')) {
        searchDropdown.classList.remove('active');
        if (searchInput) searchInput.blur();
      }
      if (aiCard && aiCard.classList.contains('is-open')) {
        closeAiWidget();
        if (aiTrigger) aiTrigger.focus();
      }
    }
  });

  // 6. Product Card Add-to-Cart Click Handler (Integrated with CutTayCart)
  document.querySelectorAll('.product-card-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = btn.closest('.product-card');
      let productName = 'sản phẩm';

      if (card && window.CutTayCart) {
        const id = parseInt(card.dataset.productId, 10) || 0;
        productName = card.dataset.productName || card.querySelector('.product-card-name a')?.textContent.trim() || 'Sản phẩm';
        const slug = card.dataset.productSlug || card.querySelector('.product-card-name a')?.getAttribute('href')?.replace('/san-pham/', '') || '';
        const price = parseFloat(card.dataset.productPrice) || 0;
        const imgEl = card.querySelector('.product-card-thumb');
        const imageUrl = card.dataset.productImage || (imgEl ? imgEl.getAttribute('src') : '/images/products/placeholder.svg');

        window.CutTayCart.addItem({
          id,
          name: productName,
          slug,
          price,
          imageUrl,
          quantity: 1
        });
      }

      showToast(`Đã thêm "${productName}" vào giỏ hàng!`);
    });
  });

  function showToast(message) {
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
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, 2400);
  }
});
