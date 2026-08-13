/**
 * Lumosity intro feature: subtle scrub parallax.
 * Blue plate stays put; FG drifts up as the stage scrolls through the viewport
 * so headroom reads first, then devices slide into it.
 * Depends on GSAP + ScrollTrigger (CDN on lumosity.html).
 */
(function () {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (!document.body.classList.contains("project-lumosity")) {
    return;
  }

  var stage = document.querySelector(".project-lumosity-intro-feature-stage");
  var fg = document.querySelector(".project-lumosity-intro-feature-fg");
  if (!stage || !fg) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* Start lower so blue reads first; scrub up to the layout rest position. */
  gsap.fromTo(
    fg,
    { y: 96 },
    {
      y: 0,
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top bottom",
        end: "center center",
        scrub: true,
      },
    }
  );
})();
