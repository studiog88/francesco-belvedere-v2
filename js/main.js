gsap.registerPlugin(ScrollTrigger);

const backToTopButton = document.querySelector(".back-to-top");
const footerInnerContainer = document.querySelector(".site-footer-inner");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const contactOverlay = document.querySelector("#contact-overlay");
const contactDialog = document.querySelector(".contact-overlay-dialog");
const contactCloseButton = document.querySelector(".contact-overlay-close");
const contactTriggers = document.querySelectorAll("[data-contact-trigger]");

if (backToTopButton) {
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

  if (footerInnerContainer) {
    ScrollTrigger.create({
      trigger: footerInnerContainer,
      start: "top bottom",
      onEnter: showBackToTop,
      onLeaveBack: hideBackToTop
    });
  } else {
    ScrollTrigger.create({
      start: window.innerHeight,
      onEnter: showBackToTop,
      onLeaveBack: hideBackToTop
    });
  }

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth"
    });
  });
}

if (contactOverlay && contactDialog && contactCloseButton && contactTriggers.length > 0) {
  let isContactAnimating = false;
  contactOverlay.hidden = true;
  document.body.style.overflow = "";

  const openContactOverlay = () => {
    if (!contactOverlay.hidden || isContactAnimating) {
      return;
    }

    isContactAnimating = true;
    contactOverlay.hidden = false;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      contactCloseButton.focus();
      isContactAnimating = false;
      return;
    }

    gsap.killTweensOf([contactOverlay, contactDialog]);
    gsap.set(contactOverlay, { autoAlpha: 0 });
    gsap.set(contactDialog, { autoAlpha: 0, y: 16, scale: 0.98 });

    gsap.timeline({
      defaults: { duration: 0.22, ease: "power2.out" },
      onComplete: () => {
        contactCloseButton.focus();
        isContactAnimating = false;
      }
    })
      .to(contactOverlay, { autoAlpha: 1 }, 0)
      .to(contactDialog, { autoAlpha: 1, y: 0, scale: 1 }, 0);
  };

  const closeContactOverlay = () => {
    if (contactOverlay.hidden || isContactAnimating) {
      return;
    }

    isContactAnimating = true;

    if (prefersReducedMotion) {
      contactOverlay.hidden = true;
      document.body.style.overflow = "";
      isContactAnimating = false;
      return;
    }

    gsap.killTweensOf([contactOverlay, contactDialog]);
    gsap.timeline({
      defaults: { duration: 0.18, ease: "power2.inOut" },
      onComplete: () => {
        contactOverlay.hidden = true;
        document.body.style.overflow = "";
        gsap.set(contactOverlay, { clearProps: "opacity,visibility" });
        gsap.set(contactDialog, { clearProps: "opacity,transform" });
        isContactAnimating = false;
      }
    })
      .to(contactDialog, { autoAlpha: 0, y: 16, scale: 0.98 }, 0)
      .to(contactOverlay, { autoAlpha: 0 }, 0);
  };

  const instantCloseContactOverlay = () => {
    contactOverlay.hidden = true;
    document.body.style.overflow = "";
    isContactAnimating = false;
  };

  contactTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openContactOverlay();
    });
  });

  contactCloseButton.addEventListener("click", closeContactOverlay);

  contactOverlay.addEventListener("click", (event) => {
    if (event.target === contactOverlay) {
      closeContactOverlay();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !contactOverlay.hidden) {
      if (prefersReducedMotion) {
        instantCloseContactOverlay();
      } else {
        closeContactOverlay();
      }
    }
  });
}
