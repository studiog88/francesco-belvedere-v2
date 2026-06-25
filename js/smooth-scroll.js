/**
 * Unified in-page scroll for nav anchors and back-to-top.
 * Replaces browser-native smooth scroll so Chrome/Safari feel the same.
 * Respects prefers-reduced-motion.
 */
(function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeFrame = null;

  /** Chrome-like ease-in-out cubic */
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /** Longer scrolls get more time, capped for very long jumps */
  function getDurationMs(distance) {
    return Math.min(1215, Math.max(630, distance / 0.94));
  }

  function cancelActiveScroll() {
    if (activeFrame !== null) {
      cancelAnimationFrame(activeFrame);
      activeFrame = null;
    }
  }

  function getScrollTopForElement(element) {
    const marginTop = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
    return element.getBoundingClientRect().top + window.scrollY - marginTop;
  }

  function updateHash(hash) {
    if (!hash) {
      return;
    }

    history.pushState(
      history.state,
      "",
      `${window.location.pathname}${window.location.search}${hash}`
    );
  }

  function scrollToY(targetY, options = {}) {
    const { updateHash: hash = null } = options;
    cancelActiveScroll();

    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const clampedY = Math.max(0, Math.min(targetY, maxScroll));

    if (prefersReducedMotion) {
      window.scrollTo(0, clampedY);
      updateHash(hash);
      return;
    }

    const startY = window.scrollY;
    const distance = Math.abs(clampedY - startY);

    if (distance < 2) {
      window.scrollTo(0, clampedY);
      updateHash(hash);
      return;
    }

    const duration = getDurationMs(distance);
    const startTime = performance.now();
    const delta = clampedY - startY;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + delta * eased);

      if (progress < 1) {
        activeFrame = requestAnimationFrame(step);
      } else {
        activeFrame = null;
        updateHash(hash);
      }
    };

    activeFrame = requestAnimationFrame(step);
  }

  function scrollToElement(element, hash) {
    scrollToY(getScrollTopForElement(element), { updateHash: hash });
  }

  function isInPageHashLink(anchor) {
    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
      return false;
    }

    if (anchor.hasAttribute("data-contact-trigger")) {
      return false;
    }

    const href = anchor.getAttribute("href");
    if (!href || !href.startsWith("#") || href === "#") {
      return false;
    }

    return Boolean(document.getElementById(href.slice(1)));
  }

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const anchor = event.target.closest("a[href^='#']");
    if (!isInPageHashLink(anchor)) {
      return;
    }

    event.preventDefault();
    const hash = anchor.getAttribute("href");
    scrollToElement(document.getElementById(hash.slice(1)), hash);
  });

  const backToTopButton = document.querySelector(".back-to-top");
  if (backToTopButton) {
    backToTopButton.addEventListener("click", () => {
      scrollToY(0);
    });
  }
})();
