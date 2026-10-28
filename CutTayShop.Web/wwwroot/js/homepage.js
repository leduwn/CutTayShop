/**
 * CutTayShop - Homepage Interactive Enhancements
 * Sticky header observer, Countdown timer, Live Search autocomplete, AI Widget.
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

  // 3. Search Suggestions Autocomplete
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

          if (items && items.length > 0) {
            searchDropdown.innerHTML = items.map(item => `
              <a href="/san-pham/${item.slug}" class="search-suggestion-item">
                <img src="${item.imageUrl}" alt="${item.name}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: contain; background: var(--color-surface-subtle);" />
                <div style="flex: 1;">
                  <div style="font-size: 0.875rem; font-weight: 600; color: var(--color-text-primary);">${item.name}</div>
                  <div style="font-size: 0.75rem; color: var(--color-sale); font-weight: 700;">${item.price}</div>
                </div>
              </a>
            `).join('');
            searchDropdown.classList.add('active');
          } else {
            searchDropdown.innerHTML = `<div style="padding: 12px 16px; font-size: 0.8125rem; color: var(--color-text-muted);">Không tìm thấy sản phẩm phù hợp</div>`;
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

  // 4. CutTay AI Chat Widget Toggle
  const aiTrigger = document.querySelector('[data-ai-trigger]');
  const aiCard = document.querySelector('[data-ai-card]');
  const aiClose = document.querySelector('[data-ai-close]');

  if (aiTrigger && aiCard) {
    aiTrigger.addEventListener('click', () => {
      aiCard.classList.toggle('is-open');
    });

    if (aiClose) {
      aiClose.addEventListener('click', () => {
        aiCard.classList.remove('is-open');
      });
    }

    // Quick chip suggestion handling
    const chips = aiCard.querySelectorAll('.ai-chip');
    const aiBody = aiCard.querySelector('.ai-card-body');
    const aiInput = aiCard.querySelector('.ai-input');

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

  // 5. Toast Feedback for "Thêm vào giỏ"
  document.querySelectorAll('.product-card-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Show quick toast notification
      showToast('Đã thêm sản phẩm vào giỏ hàng!');
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
