/**
 * About banners: one [data-marquee-period] per row in markup; clones extend the strip.
 * GSAP moves by measured px per period so loops stay aligned when items/icons change.
 */
(function initAboutMarquees() {
  if (typeof gsap === "undefined") {
    return;
  }

  const roots = document.querySelectorAll("[data-about-marquee]");
  if (roots.length === 0) {
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MAX_COPIES = 12;
  const MIN_COPIES = 2;

  /**
   * @param {HTMLElement} track
   * @returns {number}
   */
  function getPeriodStepPx(track) {
    const periods = track.querySelectorAll("[data-marquee-period]");
    if (periods.length < 2) {
      return 0;
    }
    const a = periods[0].getBoundingClientRect();
    const b = periods[1].getBoundingClientRect();
    return b.left - a.left;
  }

  /**
   * @param {HTMLElement} track
   * @param {HTMLElement} templatePeriod
   */
  function ensurePeriodCopies(track, templatePeriod) {
    const existing = track.querySelectorAll("[data-marquee-period]");
    for (let i = existing.length - 1; i >= 1; i -= 1) {
      existing[i].remove();
    }

    let copies = 1;
    while (copies < MIN_COPIES && copies < MAX_COPIES) {
      track.appendChild(templatePeriod.cloneNode(true));
      copies += 1;
    }

    const minWidthTarget = window.innerWidth * 1.75;
    while (track.scrollWidth < minWidthTarget && copies < MAX_COPIES) {
      track.appendChild(templatePeriod.cloneNode(true));
      copies += 1;
    }
  }

  /**
   * @param {HTMLElement} root
   * @returns {gsap.core.Tween | null}
   */
  function setupMarquee(root) {
    const track = root.querySelector("[data-marquee-track]");
    const templatePeriod = root.querySelector("[data-marquee-period]");
    if (!track || !templatePeriod) {
      return null;
    }

    const direction = root.getAttribute("data-marquee-direction") === "right" ? "right" : "left";
    const rawDur = root.getAttribute("data-marquee-duration");
    const parsed = parseFloat(rawDur != null && rawDur !== "" ? rawDur : "100");
    const durationSec = Math.max(1, Number.isFinite(parsed) ? parsed : 100);

    ensurePeriodCopies(track, templatePeriod);

    const step = getPeriodStepPx(track);
    if (step <= 0) {
      console.warn("About marquee: could not measure period step.", root);
      return null;
    }

    gsap.killTweensOf(track);
    gsap.set(track, { clearProps: "transform" });

    if (prefersReducedMotion) {
      gsap.set(track, { x: 0 });
      return null;
    }

    if (direction === "left") {
      return gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -step,
          duration: durationSec,
          ease: "none",
          repeat: -1
        }
      );
    }

    return gsap.fromTo(
      track,
      { x: -step },
      {
        x: 0,
        duration: durationSec,
        ease: "none",
        repeat: -1
      }
    );
  }

  const tweens = new Map();

  /**
   * @param {HTMLElement} root
   * @param {string} tweenKey
   */
  function refreshMarquee(root, tweenKey) {
    const prev = tweens.get(tweenKey);
    if (prev) {
      prev.kill();
      tweens.delete(tweenKey);
    }
    const tw = setupMarquee(root);
    if (tw) {
      tweens.set(tweenKey, tw);
    }
  }

  roots.forEach((root, index) => {
    const key = `marquee-${index}`;
    refreshMarquee(root, key);

    if (prefersReducedMotion) {
      return;
    }

    const ro = new ResizeObserver(() => {
      refreshMarquee(root, key);
    });
    ro.observe(root);
    const track = root.querySelector("[data-marquee-track]");
    if (track) {
      ro.observe(track);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        refreshMarquee(root, key);
      });
    }
  });

  window.addEventListener(
    "resize",
    () => {
      roots.forEach((root, index) => {
        refreshMarquee(root, `marquee-${index}`);
      });
    },
    { passive: true }
  );
})();
