/**
 * ==========================================================================
 * CUTTAYSHOP - HIGH-PERFORMANCE SCROLL REVEAL SYSTEM
 * IntersectionObserver-based staggered entrance with zero CLS
 * Author: Senior Motion Designer & Principal Frontend Engineer
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. Capability & Accessibility Check
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsIntersectionObserver = 'IntersectionObserver' in window;

  // Graceful degradation: if reduced motion or no IntersectionObserver, display all content natively
  if (prefersReducedMotion || !supportsIntersectionObserver) {
    document.querySelectorAll('.reveal-item, .reveal-stagger-parent').forEach((el) => {
      el.classList.add('is-revealed');
    });
    return;
  }

  /**
   * Configuration for Section Discovery & Stagger Delays
   */
  const REVEAL_SPECS = [
    {
      containerSelector: '.categories-section .category-grid',
      itemSelector: '.category-item',
      staggerMs: 50,
      type: 'stagger',
    },
    {
      containerSelector: '.trust-section .trust-grid',
      itemSelector: '.trust-item',
      staggerMs: 65,
      type: 'stagger',
    },
    {
      containerSelector: '#hot-deals .deals-grid',
      itemSelector: '.product-card',
      staggerMs: 60,
      type: 'stagger',
    },
    {
      containerSelector: '#featured .deals-grid',
      itemSelector: '.product-card',
      staggerMs: 60,
      type: 'stagger',
    },
    {
      containerSelector: '.products-section:not(#featured) .deals-grid',
      itemSelector: '.product-card',
      staggerMs: 60,
      type: 'stagger',
    },
    {
      containerSelector: '.membership-banner',
      type: 'single',
    },
    {
      containerSelector: '.newsletter-card',
      type: 'single',
    },
  ];

  /**
   * Primary IntersectionObserver Instance
   * rootMargin offsets trigger 50px before entering viewport bottom for seamless appearance
   */
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const target = entry.target;

      // Unobserve immediately to free observer thread
      observer.unobserve(target);

      // Trigger reveal in composited frame
      requestAnimationFrame(() => {
        target.classList.add('is-revealed');

        // Free will-change memory once CSS animation concludes
        const onTransitionEnd = (e) => {
          if (e.target === target || target.contains(e.target)) {
            target.classList.add('will-change-auto');
            target.removeEventListener('transitionend', onTransitionEnd);
          }
        };
        target.addEventListener('transitionend', onTransitionEnd, { passive: true });
      });
    });
  }, observerOptions);

  /**
   * Scans and prepares DOM elements for staggered scroll entrances
   */
  function initScrollReveal() {
    REVEAL_SPECS.forEach((spec) => {
      const containers = document.querySelectorAll(spec.containerSelector);

      containers.forEach((container) => {
        if (!container) return;

        if (spec.type === 'stagger') {
          container.classList.add('reveal-stagger-parent');
          const children = container.querySelectorAll(spec.itemSelector || ':scope > *');

          children.forEach((child, index) => {
            const delay = Math.min(index * spec.staggerMs, 600); // Cap max delay at 600ms
            child.style.setProperty('--stagger-delay', `${delay}ms`);
          });

          revealObserver.observe(container);
        } else {
          // Single standalone block (e.g. membership banner, newsletter card)
          container.classList.add('reveal-item');
          revealObserver.observe(container);
        }
      });
    });

    // Also observe any custom element marked with [data-reveal]
    document.querySelectorAll('[data-reveal]').forEach((customEl) => {
      customEl.classList.add('reveal-item');
      revealObserver.observe(customEl);
    });
  }

  // Public API for dynamic catalog / filter updates
  window.CutTayScrollReveal = {
    refresh: () => {
      initScrollReveal();
    },
    revealNow: (element) => {
      if (element) {
        element.classList.add('is-revealed');
        revealObserver.unobserve(element);
      }
    },
  };

  // Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }
})();
