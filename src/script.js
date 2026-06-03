const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("header a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

const showOffSection =
  currentPage === "index.html" ? document.querySelector(".show-off") : null;

if (showOffSection) {
  document.body.classList.add("show-off-reveal-ready");

  const showOffObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showOffSection.classList.add("is-visible");
          observer.unobserve(showOffSection);
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  showOffObserver.observe(showOffSection);
}
