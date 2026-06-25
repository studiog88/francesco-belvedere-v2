# Pre-Launch Checklist

Site-wide pass before shipping francescobelvedere.com.

**Per-page setup:** when adding or finishing a project detail page, use [`work/PROJECT_PAGE_CHECKLIST.md`](work/PROJECT_PAGE_CHECKLIST.md).

---

## Content & pages

- [ ] **Homepage** — final copy; work cards link only to live projects
- [ ] **Lumosity** — replace placeholder intro lede (`I am missing an intro descriptor here.`)
- [ ] **Figment** — final copy; re-add S06 media and kicker when ready
- [ ] **System Icons** — copy + image pass complete
- [ ] **Radius** — build out or hide from nav / homepage until ready
- [ ] **Project template** — update `work/project-template.html` to stacked `.project-story-grid` pattern (still uses `.project-story-split`)
- [ ] **`PROJECT_NAV_ORDER`** in `js/project-detail-nav.js` matches published pages only
- [ ] **Resume PDF** — path and date current (`assets/resume/FB-Resume-250417.pdf`)

---

## Dead / unused code (cleanup)

- [ ] **`.project-story-split` CSS** — remove or keep only if Radius/template still need it; Lumosity + Figment no longer use splits
- [ ] **Figment kicker CSS** — `.project-figment-kicker`, `.project-figment-kicker-row`, `.project-figment-tagline` (HTML removed for now)
- [ ] **Figment S06 CSS** — `.project-figment-s06-gallery`, `.project-figment-s06-media` (HTML removed)
- [ ] **`js/figment-tagline-jiggle.js`** — remove script tag from `figment.html` until kicker returns (currently no-ops)
- [ ] **Unused assets** — audit and delete or archive:
  - `assets/projects/figment/kicker-grid-*.png`, `tagline-*.png`, `section-06-flow.gif`
  - `assets/images/project-tile-FPO-*.png` if unused
  - `assets/icons/linkedin-icon.svg` if footer text link replaced icon everywhere
  - Any orphaned Lumosity/Icons kicker PNGs not referenced in HTML
- [ ] **Placeholder hero art** — Lumosity/Radius still use `assets/images/owl-A.png`; swap for project-specific assets
- [ ] **Comments in HTML/CSS** — remove stale “revert to split” / old Figma node notes if no longer relevant

---

## Images & media

- [ ] **Compress** large PNGs/JPGs (hero, project sections, OG image) — target sensible file sizes before upload
- [ ] **GIFs** — homepage `feature-B.gif`; keep count low; consider MP4/WebM loop for smaller payload if needed
- [ ] **Modern formats** — consider WebP/AVIF for photos with PNG fallback (optional)
- [ ] **`loading="lazy"`** — below-fold images (work cards, about, project galleries, footer)
- [ ] **`width` / `height`** — on `<img>` where layout shift matters (especially heroes and grids)
- [ ] **`decoding="async"`** — already on some Icons page images; apply consistently on heavy pages
- [ ] **Alt text** — every meaningful image; decorative images `alt=""` + `aria-hidden` where appropriate
- [ ] **OG / social** — `assets/images/og-share.jpg` final; meta tags in `index.html` point to production URL

---

## Responsive QA

Test at minimum: **390px**, **480px**, **745px**, **810px**, **951px**, **1200px+**

- [ ] **Home** — hero wordmark swap, nav, work grid, about (pills, logos, marquees), footer sign-off + bar layouts
- [ ] **Project pages** — hero, intro lede (full width), story text (inner container), galleries (S03 carousel, Icons grids)
- [ ] **Footer** — 951+ row layout; ≤950 centered stack; ≤744 column meta links (home + project footers)
- [ ] **Sticky project nav** — doesn’t cover anchored content (`scroll-margin-top` on `#project-intro`)
- [ ] **Horizontal overflow** — no accidental sideways scroll (marquees, approach gallery, kicker when restored)
- [ ] **Touch** — approach gallery drag/scroll; back-to-top; contact overlay

---

## Accessibility

- [ ] **Keyboard** — nav, smooth-scroll targets, contact overlay (Esc to close), approach gallery (Tab + arrows)
- [ ] **`prefers-reduced-motion`** — page transitions, smooth scroll, GSAP (hero enter, tagline jiggle, approach gallery rubber-band)
- [ ] **Focus visible** — pills, text links, client logo links, footer links
- [ ] **Color contrast** — caption/meta grey on white; lime on dark text pairings
- [ ] **Single `h1` per page** — project heroes OK; homepage uses visually-hidden h1 + wordmark

---

## Performance & deploy

- [ ] **Lighthouse** — mobile + desktop on home and one heavy project (Figment or System Icons)
- [ ] **Font** — Work Sans preload in `<head>`; only weights in use
- [ ] **CDN scripts** — GSAP/ScrollTrigger load only on pages that need them (Figment loads extra JS)
- [ ] **404 page** — Netlify/Vercel custom 404 if desired
- [ ] **Hosting** — confirm Netlify/Vercel, domain DNS, HTTPS, `index.html` as default
- [ ] **Canonical / OG URL** — production domain in meta (confirm francescobelvedere.com vs staging)
- [ ] **Contact form** — see `FORM-HOOKUP.md` if not wired yet
- [ ] **Analytics** — add only if wanted (privacy policy implication)

---

## Cross-browser smoke test

- [ ] **Chrome** (desktop + mobile)
- [ ] **Safari** (desktop + iOS) — smooth scroll JS, sticky nav, GIF playback
- [ ] **Firefox** — optional but quick check

---

## Git / hygiene

- [ ] **No secrets** in repo (`.env`, API keys)
- [ ] **Commit** remaining WIP (Lumosity/Figment layout unification) before launch push
- [ ] **Update `work/PROJECT_PAGE_CHECKLIST.md`** — reflect stacked story sections when template is updated

---

## Post-launch (optional)

- [ ] Submit sitemap / Search Console
- [ ] Test share preview (iMessage, Slack, LinkedIn)
- [ ] Link from LinkedIn / resume
