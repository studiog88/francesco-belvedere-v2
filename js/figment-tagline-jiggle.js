/**
 * Figment page only: rotation “jiggle” on the four paper tagline images.
 * Runs when the tagline scrolls into view (once), then the same motion loops with ~8s between passes.
 * Depends on GSAP + ScrollTrigger (loaded from CDN on figment.html).
 */
(function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (!document.body.classList.contains("project-figment")) {
    return;
  }

  const root = document.querySelector(".project-figment-tagline");
  if (!root) {
    return;
  }

  const pieces = gsap.utils.toArray(root.querySelectorAll("img"));
  if (pieces.length === 0) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  gsap.set(pieces, {
    transformOrigin: "50% 50%",
    rotation: 0,
  });

  /* First run: 800ms after scroll-in; then same wiggle every ~8s (repeatDelay after each full staggered pass) */
  ScrollTrigger.create({
    trigger: root,
    start: "top 88%",
    once: true,
    onEnter: () => {
      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 8,
          delay: 0.8,
        })
        .to(pieces, {
          keyframes: [
            { rotation: 3.5, duration: 0.27, ease: "sine.inOut" },
            { rotation: -2.5, duration: 0.24, ease: "sine.inOut" },
            { rotation: 0, duration: 0.3, ease: "sine.out" },
          ],
          stagger: {
            each: 0.18,
            from: "start",
          },
        });
    },
  });
})();
