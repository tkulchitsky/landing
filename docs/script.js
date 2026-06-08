const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("header a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

const youtubeRainbow = document.querySelector(".youtube-channel-rainbow");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (youtubeRainbow && window.anime && !prefersReducedMotion) {
  const rainbow = { angle: 0 };
  const colors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#a855f7",
    "#ef4444",
  ].join(", ");

  window.anime({
    targets: rainbow,
    angle: 360,
    duration: 4000,
    easing: "linear",
    loop: true,
    update: () => {
      youtubeRainbow.style.background =
        `conic-gradient(from ${rainbow.angle}deg, ${colors}) border-box`;
    },
  });
}

const homePanels = document.querySelector(".home-panels");

if (
  homePanels &&
  window.gsap &&
  window.ScrollTrigger &&
  !prefersReducedMotion
) {
  window.gsap.registerPlugin(window.ScrollTrigger);
  document.documentElement.classList.add("stacked-panels-active");

  const panels = Array.from(homePanels.children);
  const setActivePanel = (activeIndex) => {
    panels.forEach((panel, index) => {
      const isActive = index === activeIndex;

      panel.inert = !isActive;
      panel.setAttribute("aria-hidden", String(!isActive));
    });
  };

  window.gsap.set(panels, {
    autoAlpha: 0,
    scale: 1.04,
    yPercent: 4,
    zIndex: (index) => index,
  });
  window.gsap.set(panels[0], {
    autoAlpha: 1,
    scale: 1,
    yPercent: 0,
  });
  setActivePanel(0);

  const timeline = window.gsap.timeline({
    defaults: { duration: 1, ease: "power2.inOut" },
    scrollTrigger: {
      trigger: homePanels,
      start: "top top",
      end: () => `+=${window.innerHeight * (panels.length - 1)}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const activeIndex = Math.min(
          panels.length - 1,
          Math.round(self.progress * (panels.length - 1)),
        );

        setActivePanel(activeIndex);
      },
    },
  });

  panels.slice(1).forEach((panel, index) => {
    const previousPanel = panels[index];

    timeline
      .to(previousPanel, {
        autoAlpha: 0,
        scale: 0.98,
        yPercent: -4,
      })
      .to(
        panel,
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: 0,
        },
        "<",
      );
  });

  window.addEventListener("load", () => window.ScrollTrigger.refresh());
}
