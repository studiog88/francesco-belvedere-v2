# Project Page Checklist

Use this checklist whenever you create a new project detail page from `work/project-template.html`.

The template is intentionally minimal: **`section.project-hero`** (full-height band below the sticky nav: split **image | title**, then a **metadata tag** strip), then **flat copy** in `<main>` (`p` / `h2` only — the single **`h1`** lives in the hero), then **prev/next** and the **footer**. There is no category pill, duplicate title, stats row, external link, or in-page image grid in the template—you add new blocks and CSS when you need them.

## 5-Minute Checklist

- [ ] Duplicate `work/project-template.html` and rename to `work/<project-slug>.html`
- [ ] Update body hooks to match slug (`project-<project-slug>` and `data-project-slug`)
- [ ] Update `<title>`, hero `h1` (`.project-hero-title`), hero metadata tags, summary paragraph
- [ ] Update each narrative block: `p.project-section-label` + `h2.project-content-heading` + `p.project-content-body` (duplicate the trio for extra sections as needed)
- [ ] Hero: optional `background-image` on `.project-hero` or `.project-hero-bg`; left column: real `<img>` and remove `.is-empty` when no longer a placeholder
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

## 3) Hero (`section.project-hero`)

- [ ] Set `h1#project-title.project-hero-title` copy (only one `h1` on the page)
- [ ] Edit `.project-hero-metadata` tags (`.project-hero-tag` spans): role, timeframe, platform, etc.
- [ ] Left column: replace `.project-hero-image-inner` placeholder with real `<img>` (or video) when assets exist; remove `.is-empty` when appropriate
- [ ] Optional: add `background-image` (pattern / texture) on `.project-hero` (outer) and/or `.project-hero-bg` (fills **hero-content** only, not the metadata strip)

The sticky **top nav stays outside** the hero in the HTML (see `header.project-detail-top-nav`).

---

## 4) Summary + Narrative (flat in `<main>`)

- [ ] Replace short summary (`p.project-summary`) — first body copy after the hero

For each story beat:

1. `p.project-section-label` — short all-caps label (e.g. `01 - CHALLENGE`)
2. `h2.project-content-heading` — section title (use a unique `id` per `h2` if you need in-page anchors)
3. `p.project-content-body` — body copy

- [ ] Replace placeholder labels, headings, and body text for every block
- [ ] Keep labels readable (caps + numbering are fine; use an em dash or hyphen consistently within the project)

---

## 5) Final QA (Manual)

- [ ] Mobile check (`<=390px`)
- [ ] Tablet check (`<=810px`)
- [ ] Desktop check (`>810px`)
- [ ] Verify no broken links
- [ ] Verify no missing media paths
- [ ] Verify visual tone stays restrained and consistent with the rest of the site

---

## 6) Homepage Linking

- [ ] Add/update corresponding project card link on homepage when ready
- [ ] Re-check card title/description matches project page hero title
