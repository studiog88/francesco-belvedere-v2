/**
 * Circular prev/next links for project detail pages (`work/*.html`).
 * Edit PROJECT_NAV_ORDER when you add/remove/reorder pages — basename only, same folder.
 */
(function () {
  const PROJECT_NAV_ORDER = [
    "lumosity.html",
    "figment.html",
    "lumosity-system-icons.html",
    "radius.html",
  ];

  const prevAnchor = document.querySelector("[data-project-nav-prev]");
  const nextAnchor = document.querySelector("[data-project-nav-next]");

  if (!prevAnchor || !nextAnchor || PROJECT_NAV_ORDER.length === 0) {
    return;
  }

  /**
   * Basename for PROJECT_NAV_ORDER lookup (e.g. "lumosity.html").
   * Netlify Pretty URLs serve /work/lumosity without .html; local dev often uses .html in the path.
   */
  function currentBasename() {
    const segments = decodeURIComponent(location.pathname).split("/").filter(Boolean);
    let last = segments.pop() || "";
    if (!last) {
      return "";
    }
    if (!/\.html?$/i.test(last)) {
      last = `${last}.html`;
    }
    return last;
  }

  const file = currentBasename();
  const idx = PROJECT_NAV_ORDER.indexOf(file);

  /* If current file is not listed, keep default hrefs (#). */
  if (idx === -1) {
    return;
  }

  const n = PROJECT_NAV_ORDER.length;

  if (n === 1) {
    const onlyHref = `./${PROJECT_NAV_ORDER[0]}`;
    prevAnchor.setAttribute("href", onlyHref);
    nextAnchor.setAttribute("href", onlyHref);
    return;
  }

  const prevHref = `./${PROJECT_NAV_ORDER[(idx - 1 + n) % n]}`;
  const nextHref = `./${PROJECT_NAV_ORDER[(idx + 1) % n]}`;

  prevAnchor.setAttribute("href", prevHref);
  nextAnchor.setAttribute("href", nextHref);
})();
