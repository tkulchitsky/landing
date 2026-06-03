const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("header a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

const homeHero = document.querySelector(".hero");
const homeShowOff = document.querySelector(".hero + .show-off");

if (homeHero && homeShowOff) {
  document.body.classList.add("home-transition-active");

  let homeTransitionFrame = null;

  const setHomeTransition = () => {
    const heroRect = homeHero.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const transitionStart = viewportHeight * 0.72;
    const transitionEnd = viewportHeight * 0.12;
    const rawProgress = (transitionStart - heroRect.bottom) / (transitionStart - transitionEnd);
    const progress = Math.min(Math.max(rawProgress, 0), 1);
    const inverseProgress = 1 - progress;

    document.body.style.setProperty("--home-transition", progress.toFixed(3));
    document.body.style.setProperty("--home-photo-scale", (1 + progress * 0.08).toFixed(3));
    document.body.style.setProperty("--home-photo-shift", `${(progress * 18).toFixed(1)}px`);
    document.body.style.setProperty("--home-photo-saturate", (1 + progress * 0.25).toFixed(3));
    document.body.style.setProperty("--home-overlay-opacity", (1 - progress * 0.18).toFixed(3));
    document.body.style.setProperty("--home-hero-lift", `${(progress * -24).toFixed(1)}px`);
    document.body.style.setProperty("--home-hero-opacity", (1 - progress * 0.5).toFixed(3));
    document.body.style.setProperty("--home-showoff-rise", `${(inverseProgress * 52).toFixed(1)}px`);
    document.body.style.setProperty("--home-showoff-opacity", (0.76 + progress * 0.24).toFixed(3));
    document.body.style.setProperty("--home-content-rise", `${(inverseProgress * 34).toFixed(1)}px`);
    document.body.style.setProperty("--home-content-opacity", (0.55 + progress * 0.45).toFixed(3));
    homeTransitionFrame = null;
  };

  const requestHomeTransitionUpdate = () => {
    if (homeTransitionFrame === null) {
      homeTransitionFrame = window.requestAnimationFrame(setHomeTransition);
    }
  };

  setHomeTransition();
  window.addEventListener("scroll", requestHomeTransitionUpdate, { passive: true });
  window.addEventListener("resize", requestHomeTransitionUpdate);
}
