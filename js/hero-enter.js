/**
 * Home page enter: wordmark → hero heading → nav → selected projects.
 * Home only — load on index.html. Skips prefers-reduced-motion and hash landing.
 */
(function initHomeHeroEnter() {
  const wordmarks = gsap.utils.toArray(".hero-wordmark");
  const heroHeading = document.querySelector(".hero-heading");
  const navLinks = gsap.utils.toArray(".hero-nav-link");
  const selectedProjects = document
    .getElementById("selected-projects-heading")
    ?.closest(".work-section-block");

  if (
    wordmarks.length === 0 &&
    !heroHeading &&
    navLinks.length === 0 &&
    !selectedProjects
  ) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PAGE_FADE_MS = 320;
  const HERO_DELAY = 0.2;
  const WORDMARK_DURATION = 0.65;
  const LINE_Y = 20;
  const HEADING_DURATION = 0.7;
  const NAV_LEAD_IN = 0.8;
  const WORK_OVERLAP = 0.25;
  let didRun = false;

  function revealTargetsFallback() {
    if (typeof gsap === "undefined") {
      wordmarks.forEach((mark) => {
        mark.style.opacity = "";
        mark.style.visibility = "";
      });
      if (heroHeading) {
        heroHeading.style.transform = "";
        heroHeading.style.opacity = "";
        heroHeading.style.visibility = "";
      }
      if (selectedProjects) {
        selectedProjects.style.transform = "";
        selectedProjects.style.opacity = "";
        selectedProjects.style.visibility = "";
      }
      return;
    }

    gsap.set([...wordmarks, ...(heroHeading ? [heroHeading] : []), ...navLinks, ...(selectedProjects ? [selectedProjects] : [])], {
      autoAlpha: 1,
      y: 0,
      clearProps: "opacity,visibility,transform",
    });
  }

  function setInitialHiddenState() {
    if (typeof gsap === "undefined") {
      return;
    }

    if (wordmarks.length > 0) {
      gsap.set(wordmarks, { autoAlpha: 0 });
    }

    if (heroHeading) {
      gsap.set(heroHeading, { autoAlpha: 0, y: LINE_Y });
    }

    if (selectedProjects) {
      gsap.set(selectedProjects, { autoAlpha: 0, y: LINE_Y });
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
    const lineEase = "power2.out";

    if (wordmarks.length > 0) {
      tl.fromTo(
        wordmarks,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: WORDMARK_DURATION, ease: lineEase }
      );
    }

    if (heroHeading) {
      tl.fromTo(
        heroHeading,
        { autoAlpha: 0, y: LINE_Y },
        { autoAlpha: 1, y: 0, duration: HEADING_DURATION, ease: lineEase },
        wordmarks.length > 0 ? ">" : 0
      );
    }

    if (navLinks.length > 0) {
      tl.from(
        navLinks,
        { autoAlpha: 0, y: 12, duration: 0.4, ease: lineEase },
        heroHeading ? `-=${NAV_LEAD_IN}` : 0
      );
    }

    if (selectedProjects) {
      let workStart = 0;
      if (navLinks.length > 0) {
        workStart = `-=${WORK_OVERLAP}`;
      } else if (heroHeading) {
        workStart = ">-0.2";
      }

      tl.fromTo(
        selectedProjects,
        { autoAlpha: 0, y: LINE_Y },
        { autoAlpha: 1, y: 0, duration: HEADING_DURATION, ease: lineEase },
        workStart
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
