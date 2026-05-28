/**
 * Home hero enter (Tier 2): kraftmouth → heading → nav links.
 * Wordmark (.hero-wordmark) stays static. Home only — load on index.html.
 * Skips prefers-reduced-motion and #hash landing (is-awaiting-hash-scroll).
 */
(function initHomeHeroEnter() {
  if (typeof gsap === "undefined") {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (document.documentElement.classList.contains("is-awaiting-hash-scroll")) {
    return;
  }

  const kraftmouth = document.querySelector(".hero-kraftmouth");
  const heading = document.querySelector(".hero-heading");
  const navLinks = gsap.utils.toArray(".hero-nav-link");

  const targets = [kraftmouth, heading, ...navLinks].filter(Boolean);
  if (targets.length === 0) {
    return;
  }

  const HERO_DELAY = 0.2;
  const PAGE_FADE_MS = 320;
  let didRun = false;

  function revealTargetsFallback() {
    gsap.set(targets, { autoAlpha: 1, y: 0, clearProps: "opacity,visibility,transform" });
  }

  function runHeroTimeline() {
    if (didRun) {
      return;
    }
    didRun = true;

    if (document.documentElement.classList.contains("is-awaiting-hash-scroll")) {
      revealTargetsFallback();
      return;
    }

    const tl = gsap.timeline({ delay: HERO_DELAY });

    if (kraftmouth) {
      tl.from(kraftmouth, {
        autoAlpha: 0,
        y: 20,
        duration: 0.55,
        ease: "power2.out",
      });
    }

    if (heading) {
      tl.from(
        heading,
        {
          autoAlpha: 0,
          y: 24,
          duration: 0.65,
          ease: "power2.out",
        },
        kraftmouth ? "-=0.25" : 0
      );
    }

    if (navLinks.length > 0) {
      tl.from(
        navLinks,
        {
          autoAlpha: 0,
          y: 12,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out",
        },
        kraftmouth || heading ? "-=0.3" : 0
      );
    }
  }

  function scheduleHeroEnter() {
    const start = () => runHeroTimeline();

    window.addEventListener("portfolio:page-visible", start, { once: true });

    if (document.documentElement.classList.contains("is-page-visible")) {
      start();
      return;
    }

    /* Fallback if page-visible event was missed (script order / cache). */
    window.setTimeout(() => {
      if (!didRun) {
        start();
      }
    }, PAGE_FADE_MS + 80);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleHeroEnter, { once: true });
  } else {
    scheduleHeroEnter();
  }
})();
