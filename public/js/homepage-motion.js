/**
 * ==========================================================================
 * CUTTAYSHOP - HOMEPAGE MOTION ORCHESTRATION & MICRO-INTERACTIONS
 * Hero entrance timeline, magnetic buttons, 3D card tilt & levitation
 * Author: Senior Motion Designer & Principal Frontend Engineer
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. Accessibility & Capability Checks
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  // Mark document state safely to activate motion styles only when ready
  if (!prefersReducedMotion) {
    document.documentElement.classList.add('motion-ready');
  } else {
    document.documentElement.setAttribute('data-reduced-motion', 'true');
  }

  /**
   * Orchestrates the 5-step hero entrance sequence
   */
  function initHeroChoreography() {
    const heroCard = document.querySelector('.hero-main-card');
    const heroSideCol = document.querySelector('.hero-side-col');
    if (!heroCard) return;

    if (prefersReducedMotion) {
      // Immediate presentation for reduced motion users
      return;
    }

    // Attach animation marker classes to specific hero children
    const kicker = heroCard.querySelector('.hero-tag');
    const headline = heroCard.querySelector('.hero-headline');
    const desc = heroCard.querySelector('.hero-description, .hero-commitments');
    const actions = heroCard.querySelector('.hero-actions');
    const graphic = heroCard.querySelector('.hero-graphic-wrap, .hero-product-stage');

    if (kicker) kicker.classList.add('hero-anim-item', 'hero-anim-kicker');
    if (headline) headline.classList.add('hero-anim-item', 'hero-anim-headline');
    if (desc) desc.classList.add('hero-anim-item', 'hero-anim-desc');
    if (actions) actions.classList.add('hero-anim-item', 'hero-anim-actions');
    if (graphic) graphic.classList.add('hero-anim-item', 'hero-anim-stage');

    // Trigger entrance in next animation frame to prevent FOUC / CLS
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroCard.classList.add('is-hero-entered');
        if (heroSideCol) {
          heroSideCol.classList.add('is-hero-entered');
        }

        // Staggered layer entrance for multi-layer composition
        const stageLayers = heroCard.querySelectorAll('.hero-stage-layer');
        stageLayers.forEach((layer, idx) => {
          layer.style.transitionDelay = `${0.1 + idx * 0.08}s`;
          layer.classList.add('is-layer-revealed');
        });

        // After timeline settles (850ms), activate ambient levitation observer
        setTimeout(() => {
          if (graphic && !prefersReducedMotion) {
            setupLevitationVisibilityObserver(graphic);
          }

          // Clean up will-change on hero elements to release composite GPU layers
          const animItems = document.querySelectorAll('.hero-anim-item, .promo-banner-card, .hero-stage-layer');
          animItems.forEach((item) => item.classList.add('will-change-auto'));
        }, 900);
      });
    });
  }

  /**
   * Pauses levitation animation when hero scrolls out of view to save battery and GPU cycles
   */
  function setupLevitationVisibilityObserver(element) {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.remove('floating-levitate-paused');
          } else {
            element.classList.add('floating-levitate-paused');
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
  }

  /**
   * Magnetic Pill Button Micro-Interaction
   * Applies subtle elastic tracking on hover for desktop pointer devices
   */
  function initMagneticButtons() {
    if (isTouchDevice || prefersReducedMotion) return;

    const magneticElements = document.querySelectorAll('.hero-actions .btn-pill, .promo-banner-cta');

    magneticElements.forEach((btn) => {
      btn.classList.add('magnetic-btn');

      let bounds;
      let rafId = null;

      const onMouseEnter = () => {
        bounds = btn.getBoundingClientRect();
      };

      const onMouseMove = (e) => {
        if (!bounds) bounds = btn.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        // Dampened magnetic displacement (max ~4px)
        const deltaX = (mouseX - centerX) * 0.18;
        const deltaY = (mouseY - centerY) * 0.18;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          btn.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0)`;
        });
      };

      const onMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        btn.style.transform = 'translate3d(0, 0, 0)';
        bounds = null;
      };

      btn.addEventListener('mouseenter', onMouseEnter, { passive: true });
      btn.addEventListener('mousemove', onMouseMove, { passive: true });
      btn.addEventListener('mouseleave', onMouseLeave, { passive: true });
    });
  }

  /**
   * 3D Subtle Tilt & Lighting Physics on Cards
   * Generates a gentle editorial perspective angle on mouseover
   */
  function initCardTilt() {
    if (isTouchDevice || prefersReducedMotion) return;

    const cards = document.querySelectorAll('.product-card, .promo-banner-card');

    cards.forEach((card) => {
      card.classList.add('card-tilt-target');

      let bounds;
      let rafId = null;

      const onMouseEnter = () => {
        bounds = card.getBoundingClientRect();
      };

      const onMouseMove = (e) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        // Subtle 3D tilt: max +-2.5 deg
        const rotateX = -((mouseY - centerY) / centerY) * 2.5;
        const rotateY = ((mouseX - centerX) / centerX) * 2.5;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0)`;
        });
      };

      const onMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
        bounds = null;
      };

      card.addEventListener('mouseenter', onMouseEnter, { passive: true });
      card.addEventListener('mousemove', onMouseMove, { passive: true });
      card.addEventListener('mouseleave', onMouseLeave, { passive: true });
    });
  }

  /**
   * Micro-Feedbacks: Wishlist Heart Pop & Cart Button Bounce
   */
  function initMicroFeedbacks() {
    // 1. Wishlist Heart Pop
    document.querySelectorAll('.product-card-wishlist').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        btn.classList.remove('heart-popped');
        // Force reflow for re-triggering keyframe
        void btn.offsetWidth;
        btn.classList.add('heart-popped');
      });
    });

    // 2. Add-to-Cart Button Hop
    document.querySelectorAll('.product-card-add-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.remove('btn-cart-popped');
        void btn.offsetWidth;
        btn.classList.add('btn-cart-popped');
        setTimeout(() => btn.classList.remove('btn-cart-popped'), 350);
      });
    });
  }

  // DOM Ready Lifecycle Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initHeroChoreography();
      initMagneticButtons();
      initCardTilt();
      initMicroFeedbacks();
    });
  } else {
    initHeroChoreography();
    initMagneticButtons();
    initCardTilt();
    initMicroFeedbacks();
  }
})();
