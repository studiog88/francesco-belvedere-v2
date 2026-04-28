# Project Page Checklist

Use this checklist whenever you create a new project detail page from `work/project-template.html`.

## 5-Minute Checklist

- [ ] Duplicate `work/project-template.html` and rename to `work/<project-slug>.html`
- [ ] Update body hooks to match slug (`project-<project-slug>` and `data-project-slug`)
- [ ] Replace title, category, summary, challenge/process/solution content
- [ ] Add real media, remove `.is-empty` where filled, keep `.is-wide` / `.is-tall` as needed
- [ ] Fill stats; hide optional fields by leaving empty or using `data-empty="true"`
- [ ] Set external link (or leave hidden with `href="#"`)
- [ ] Update `PROJECT_NAV_ORDER` in `js/project-detail-nav.js` (include new filename; circular prev/next wraps)
- [ ] Verify mobile/tablet/desktop and check homepage card link

---

## 1) Duplicate + Name

- [ ] Duplicate `work/project-template.html`
- [ ] Rename to slug format: `work/<project-slug>.html` (example: `work/figment.html`)
- [ ] Update body hooks:
  - [ ] `class="site project-detail-page project-<project-slug>"`
  - [ ] `data-project-slug="<project-slug>"`

---

## 2) Core Metadata + Navigation

- [ ] Update `<title>` with project name
- [ ] Confirm top-left link points to `../index.html#work`
- [ ] Confirm your page filename appears in `js/project-detail-nav.js` `PROJECT_NAV_ORDER` (prev/next links are set automatically; order wraps circularly)

---

## 3) Header Content

- [ ] Replace category tag text
- [ ] Replace project `h1` title
- [ ] Replace short summary paragraph
- [ ] External link:
  - [ ] Add real URL if needed
  - [ ] Or leave `href="#"` (or empty) to auto-hide via `.hide-if-empty`

---

## 4) Quick Stats Row

- [ ] Fill `Timeframe`
- [ ] Fill `Role`
- [ ] Fill `Platform`
- [ ] Fill `Team`
- [ ] For optional stats:
  - [ ] Leave `dt`/`dd` empty to hide
  - [ ] Or set `data-empty="true"` on `.project-stat-item`

---

## 5) Long-Form Sections

- [ ] Replace `01 - CHALLENGE` heading + body text
- [ ] Replace `02 - PROCESS` heading + body text
- [ ] Replace `03 - SOLUTION` heading + body text

Keep labels all caps and numbered in sequence.

---

## 6) Media Slots

- [ ] Replace placeholder blocks with real media where available
- [ ] Remove `.is-empty` on slots that are filled with real media
- [ ] Keep or adjust modifiers as needed:
  - [ ] `.is-wide` for full-span behavior
  - [ ] `.is-tall` for taller placeholder/media frames
- [ ] Confirm alt text / aria labels are accurate (or decorative if appropriate)

---

## 7) Final QA (Manual)

- [ ] Mobile check (`<=390px`)
- [ ] Tablet check (`<=810px`)
- [ ] Desktop check (`>810px`)
- [ ] Verify no broken links
- [ ] Verify no missing media paths
- [ ] Verify optional fields hide correctly
- [ ] Verify visual tone stays restrained and consistent with the rest of the site

---

## 8) Homepage Linking

- [ ] Add/update corresponding project card link on homepage when ready
- [ ] Re-check card title/description matches project page title

