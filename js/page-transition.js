/**
 * Fade out before internal home ↔ project navigations; fade in on arrival.
 * Respects prefers-reduced-motion. Coordinates with index hash landing (is-awaiting-hash-scroll).
 */
(function initPageTransition() {
  const FADE_MS = 280;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add("is-page-visible");
    return;
  }

  const isHomePath = (pathname) => /(?:^|\/)index\.html$/.test(pathname) || /\/$/.test(pathname) && !pathname.includes("/work/");

  const isProjectPath = (pathname) => /\/work\/[^/]+(?:\.html)?$/.test(pathname);

  const isPortfolioPath = (pathname) => isHomePath(pathname) || isProjectPath(pathname);

  const isInternalPageLink = (anchor) => {
    if (anchor.target === "_blank" || anchor.hasAttribute("download")) {
      return false;
    }

    const rawHref = anchor.getAttribute("href");
    if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
      return false;
    }

    let targetUrl;
    try {
      targetUrl = new URL(anchor.href, window.location.href);
    } catch {
      return false;
    }

    if (targetUrl.origin !== window.location.origin) {
      return false;
    }

    if (!isPortfolioPath(targetUrl.pathname)) {
      return false;
    }

    const currentUrl = new URL(window.location.href);
    if (currentUrl.pathname === targetUrl.pathname && currentUrl.search === targetUrl.search) {
      return false;
    }

    return true;
  };

  const fadeIn = () => {
    document.documentElement.classList.remove("is-page-entering", "is-page-leaving");
    document.documentElement.classList.add("is-page-visible");
    window.dispatchEvent(new CustomEvent("portfolio:page-visible"));
  };

  const startFadeIn = () => {
    if (document.documentElement.classList.contains("is-awaiting-hash-scroll")) {
      const observer = new MutationObserver(() => {
        const awaitingHash = document.documentElement.classList.contains("is-awaiting-hash-scroll");
        const stillHidden = document.documentElement.style.visibility === "hidden";

        if (!awaitingHash && !stillHidden) {
          observer.disconnect();
          requestAnimationFrame(fadeIn);
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "style"]
      });
      return;
    }

    requestAnimationFrame(fadeIn);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startFadeIn, { once: true });
  } else {
    startFadeIn();
  }

  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) {
      return;
    }

    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const anchor = event.target.closest("a[href]");
    if (!anchor || !isInternalPageLink(anchor)) {
      return;
    }

    event.preventDefault();
    document.documentElement.classList.remove("is-page-visible");
    document.documentElement.classList.add("is-page-leaving");

    window.setTimeout(() => {
      window.location.href = anchor.href;
    }, FADE_MS);
  });
})();
