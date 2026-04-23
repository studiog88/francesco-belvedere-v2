gsap.registerPlugin(ScrollTrigger);

const backToTopButton = document.querySelector(".back-to-top");
const contactSection = document.querySelector("#contact");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (backToTopButton && contactSection) {
  const showBackToTop = () => {
    backToTopButton.classList.add("is-visible");
    gsap.to(backToTopButton, {
      autoAlpha: 1,
      y: 0,
      duration: prefersReducedMotion ? 0 : 0.4,
      ease: "power2.out",
      overwrite: true
    });
  };

  const hideBackToTop = () => {
    backToTopButton.classList.remove("is-visible");
    gsap.to(backToTopButton, {
      autoAlpha: 0,
      y: prefersReducedMotion ? 0 : 16,
      duration: prefersReducedMotion ? 0 : 0.4,
      ease: "power2.inOut",
      overwrite: true
    });
  };

  hideBackToTop();

  ScrollTrigger.create({
    trigger: contactSection,
    start: "bottom bottom",
    onEnter: showBackToTop,
    onLeaveBack: hideBackToTop
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}
