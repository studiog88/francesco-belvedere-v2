/**
 * Home hero enter (Tier 2): masked lead line → fade remaining lines → nav links.
 * Wordmark (.hero-wordmark) stays static. Home only — load on index.html.
 * Skips prefers-reduced-motion and #hash landing (is-awaiting-hash-scroll).
 */
(function initHomeHeroEnter() {
  const lines = gsap.utils.toArray(".hero-heading-line");
  const leadLine = lines[0];
  const restLines = lines.slice(1);
  const navLinks = gsap.utils.toArray(".hero-nav-link");

  if (lines.length === 0 && navLinks.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HERO_DELAY = 0.2;
  const LEAD_MASK_DURATION = 0.8;
  const REST_FADE_DURATION = 1.2;
  const NAV_LEAD_IN = 0.8; /* nav enters mid secondary fade — well before text finishes */
  const PAGE_FADE_MS = 320;
  let didRun = false;

  function revealTargetsFallback() {
    if (typeof gsap === "undefined") {
      lines.forEach((line) => {
        line.style.transform = "";
        line.style.opacity = "";
        line.style.visibility = "";
      });
      return;
    }

    gsap.set([...lines, ...navLinks], {
      autoAlpha: 1,
      y: 0,
      yPercent: 0,
      clearProps: "opacity,visibility,transform",
    });
  }

  function setInitialHiddenState() {
    if (typeof gsap === "undefined") {
      return;
    }

    if (leadLine) {
      gsap.set(leadLine, { yPercent: 110 });
    }

    if (restLines.length > 0) {
      gsap.set(restLines, { autoAlpha: 0 });
    }
  }

  function runHeroTimeline() {
    if (didRun) {
      return;
    }
    didRun = true;

    if (
      prefersReducedMotion ||
      typeof gsap === "undefined" ||
      document.documentElement.classList.contains("is-awaiting-hash-scroll")
    ) {
      revealTargetsFallback();
      return;
    }

    const tl = gsap.timeline({ delay: HERO_DELAY });

    if (leadLine) {
      tl.fromTo(
        leadLine,
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: LEAD_MASK_DURATION,
          ease: "power3.out",
        }
      );
    }

    if (restLines.length > 0) {
      tl.fromTo(
        restLines,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: REST_FADE_DURATION,
          ease: "power2.out",
        },
        leadLine ? ">" : 0
      );
    }

    if (navLinks.length > 0) {
      tl.from(
        navLinks,
        {
          autoAlpha: 0,
          y: 12,
          duration: 0.4,
          ease: "power2.out",
        },
        restLines.length > 0 ? `-=${NAV_LEAD_IN}` : leadLine ? ">-0.2" : 0
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

  if (prefersReducedMotion || typeof gsap === "undefined") {
    revealTargetsFallback();
    return;
  }

  /* Hash landing: keep text hidden until scroll settles, then reveal without motion. */
  if (document.documentElement.classList.contains("is-awaiting-hash-scroll")) {
    setInitialHiddenState();

    const observer = new MutationObserver(() => {
      if (!document.documentElement.classList.contains("is-awaiting-hash-scroll")) {
        observer.disconnect();
        revealTargetsFallback();
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return;
  }

  setInitialHiddenState();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleHeroEnter, { once: true });
  } else {
    scheduleHeroEnter();
  }
})();
