/**
 * Circular prev/next links for project detail pages (`work/*.html`).
 * Edit PROJECT_NAV_ORDER when you add/remove/reorder pages — basename only, same folder.
 */
(function () {
  const PROJECT_NAV_ORDER = [
    "project-template.html",
    // Example when you add pages (keep one shared list updated everywhere):
    // "figment.html",
    // "icons.html",
  ];

  const prevAnchor = document.querySelector("[data-project-nav-prev]");
  const nextAnchor = document.querySelector("[data-project-nav-next]");

  if (!prevAnchor || !nextAnchor || PROJECT_NAV_ORDER.length === 0) {
    return;
  }

  function currentBasename() {
    const segments = decodeURIComponent(location.pathname).split("/");
    const last = segments.pop() || "";
    return last;
  }

  const file = currentBasename();
  const idx = PROJECT_NAV_ORDER.indexOf(file);

  /* If current file is not listed, keep default hrefs (#). */
  if (idx === -1) {
    return;
  }

  const n = PROJECT_NAV_ORDER.length;
  const prevHref = `./${PROJECT_NAV_ORDER[(idx - 1 + n) % n]}`;
  const nextHref = `./${PROJECT_NAV_ORDER[(idx + 1) % n]}`;

  prevAnchor.setAttribute("href", prevHref);
  nextAnchor.setAttribute("href", nextHref);
})();
