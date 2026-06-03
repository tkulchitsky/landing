const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("header a").forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.setAttribute("aria-current", "page");
  }
});
