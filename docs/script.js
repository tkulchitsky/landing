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
