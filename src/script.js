const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("header a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});

const resumeSections = document.querySelectorAll(".resume-slide[id]");
const resumeNavLinks = document.querySelectorAll(".resume-nav a");

if (resumeSections.length > 0 && resumeNavLinks.length > 0) {
  const setActiveResumeSection = (id) => {
    resumeNavLinks.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const resumeObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

      if (activeEntry) {
        setActiveResumeSection(activeEntry.target.id);
      }
    },
    {
      rootMargin: "-35% 0px -35% 0px",
      threshold: [0.2, 0.45, 0.7],
    },
  );

  resumeSections.forEach((section) => resumeObserver.observe(section));
  setActiveResumeSection(resumeSections[0].id);
}
