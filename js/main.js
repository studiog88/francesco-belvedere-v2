gsap.registerPlugin(ScrollTrigger);

const heroWordmark = document.querySelector(".hero-wordmark");
const heroNav = document.querySelector(".hero-nav");

if (heroWordmark && heroNav) {
  ScrollTrigger.create({
    trigger: heroWordmark,
    start: "bottom top",
    onEnter: () => {
      heroNav.classList.add("is-sticky");
    },
    onLeaveBack: () => {
      heroNav.classList.remove("is-sticky");
    }
  });
}
