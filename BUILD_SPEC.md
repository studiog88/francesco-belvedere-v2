# PORTFOLIO BUILD SPEC

Francesco Belvedere · francescobelvedere.com
April 2026 · v2.1

---

## 00 · OVERVIEW

Single-page portfolio with anchor navigation. One secondary route type: project detail pages. Built to be scanned in 2–3 minutes by a hiring manager.

| Stack | HTML + CSS + JS. No framework. |
| --- | --- |
| Animation | GSAP + ScrollTrigger via CDN. |
| Build tool | Cursor (AI-assisted). |
| Design | Figma (tokens, exploration only). |
| Hosting | Netlify or Vercel. Decision pending. |
| Domain | francescobelvedere.com (owned). |

---

## 01 · BRAND

Logo mark: the character 'F' — rounded, whimsical, with an eye detail. This is the primary brand element. It replaces the previous isometric geometric mark.

| Mark usage | Hero element on homepage. Footer element. Favicon. Not in the nav. |
| --- | --- |
| Color | Mint green primary. Existing palette carries forward. |
| Typography | Existing type system carries forward. |
| Voice | Whimsical yet technically savvy. Not corporate. |

---

## 02 · PAGE STRUCTURE

Single page. Sections scroll vertically. Each section earns its space against a 2–3 minute visit.

| ORDER | SECTION | DESCRIPTION |
| --- | --- | --- |
| 01 | **Hero** | Full-width name (FRANCESCO BELVEDERE) as single line at top of page, downplayed so as not to compete with F mark. 'F' character mark near full-height of hero. Short descriptor beside mark. Pill-shaped anchor links right-aligned below name. 80vh height. Top of next section visible. |
| 02 | **Work** | 3-up card grid. Image above, text below. Title + short description + link to project detail page. Reflows: 3 → 2 → 1 across breakpoints. Simple hover state. |
| 03 | **About** | Large-type positioning statement (2–3 sentences). Compact credentials strip below: years, industries, origin. Not the full origin story — keep it tight. |
| 04 | **Experiments** | Small card grid linking to live AI/vibe-coded builds. Image + link. Ships when 3+ builds are live. Omit until ready — no 'coming soon.' |
| 05 | **Footer** | Short text blurb about working together. 'F' logo on left. Copyright and email center. Social links (LinkedIn) on right. |

---

## 03 · HERO DETAIL

| Height | 80vh. Next section peeks above fold. |
| --- | --- |
| Name treatment | FRANCESCO BELVEDERE as single line across top of page. Full-width but smaller scale — does not compete with F mark. One line, not two. |
| Brand mark | 'F' character — near full-height of hero section. Primary visual anchor. |
| Descriptor | One functional line beside mark. E.g. 'Product Designer · Santa Monica' |
| Nav links | Pill-shaped anchor links, right-aligned, positioned below name. |
| Background | Subtle gradient + grain texture for MVP. No flat white. |
| Motion (MVP) | All hero elements fade in and move up as staggered sequence. Name does not animate — keeps focus on F mark. |
| Scroll behavior | On scroll past hero, name scrolls off. Anchor links become sticky nav at top of page. |
| Motion (later) | Eye-follow on mouseX/mouseY. Generative background elements. Parallax. |

---

## 04 · WORK CARDS

The most important section. This is the proof. A hiring manager who spends 2–3 minutes will scroll past the hero in seconds and land here.

| Layout | 3-up grid on desktop. 2-up on tablet. 1-up stacked on mobile. |
| --- | --- |
| Card anatomy | Image (top) + title + short description (below image). Not inside the image. |
| Link | Each card links to a project detail page (separate route). |
| Hover | Subtle scale or lift. Keep it fast. |
| Count | 3 projects minimum. 5 maximum. Start with 3. |
| Image ratio | Consistent aspect ratio across all cards. 4:3 or 3:2. |

Project detail page layout is a separate workstream. Tackle after homepage ships.

---

## 05 · ABOUT SECTION

Not a biography. A positioning statement and a proof strip. Two components:

**Component A — Statement:** Large-type text. 2–3 sentences max. Says who you are and what you value. Set at a display size — this is a visual moment, not a paragraph to read.

**Component B — Credentials:** Compact strip below the statement. Years of experience, industries, illustration background. Could be monospace annotations, a stat row, or a minimal visual resume. Not a bulleted list.

---

## 06 · EXPERIMENTS SECTION

STATUS: Not included in MVP. Add when 3+ builds are live and deployed.

Purpose: demonstrate active engagement with AI tools and workflows. Show hiring managers you are building with Cursor, Claude Code, and similar tools — not just talking about them.

| Card format | Image/screenshot + project name + link to live build or repo. |
| --- | --- |
| Layout | Small card grid. Less prominent than Work section. |
| Content | Live, working builds only. No concepts. No 'coming soon.' |
| Cadence | Build 1–2 per week. Add to section when ready. |

---

## 07 · NAVIGATION

| Pattern | Right-aligned pill-shaped anchor links. No horizontal bar. No logo in nav. |
| --- | --- |
| Initial state | Links sit below the name treatment at the top of the hero section. |
| On scroll | Name scrolls off. Links become sticky at top of page. |
| Links | About · Work · Contact (all anchor scroll). |
| Style | Pill-shaped containers. |
| Mobile | Collapse to hamburger or simplified pill row. |
| Behavior | Smooth scroll to anchor targets. Active state on current section. |

---

## 08 · MOTION & INTERACTION

Engine: GSAP + ScrollTrigger via CDN. No bundler. No Framer Motion. No React.

### MVP MOTION

- Hero elements: staggered fade-in + move-up on page load (F mark, descriptor, nav links)
- Name does not animate — stays static so as not to compete with F mark
- On scroll past hero: name scrolls off, anchor links stick to top
- Section content: fade-in on scroll into view (ScrollTrigger)
- Work cards: subtle hover state (CSS transition — scale or lift)
- Page scroll: smooth scroll behavior (CSS or GSAP ScrollToPlugin)

### POST-LAUNCH MOTION

- 'F' mark eye-follow (tracks mouseX/mouseY)
- Background generative elements (subtle shapes, particles, or flow field)
- Parallax depth on scroll
- Reduced-motion fallback: all animations respect prefers-reduced-motion

---

## 09 · COLOR MODES

| MVP | Light mode only. Token-driven. No hardcoded hex in components (see **Locked color usage** below). |
| --- | --- |
| Post-launch | Dark mode (token swap, respects system preference). |
| Post-launch | Ferrari mode (red + cream/ivory, separate primitive set). |
| Toggle | Persistent UI element in nav or footer. 3-option when all modes ship. |

### TOKEN ARCHITECTURE

Two-tier system. Primitives CSS already generated. Cursor implements component-level tokens during build.

| Tier 1 | Primitives Collection — raw color values. CSS files already generated. |
| --- | --- |
| Tier 2 | Alias / Component Collection — semantic tokens consumed by components. Cursor implements as we build. |
| Responsive | Separate Responsive collection already saved. Handles text sizing. |
| Mode switch | data-theme attribute swap on `<html>`. |

### LOCKED COLOR USAGE (MVP → LAUNCH)

**Primitives are the source of truth.** Any solid UI color on a component or element must map through a **token** (Tier 2 alias or Tier 1 primitive variable)—not a raw hex in component CSS.

**Exceptions**

- **Gradients:** Stops may combine multiple primitives; full-token purity on every stop is ideal but not always practical—still avoid random hex when a primitive exists.
- **Images:** Raster or SVG artwork uses its own embedded colors; that is not a token violation.

**After launch — accessibility**

- Run an **accessibility pass** (contrast, focus, etc.). If a primitive value must change for a11y or refinement, **update the hex in `primitives.css`** (or the generated source of that file)—do not scatter fixes as one-offs in components.

---

## 10 · LAYOUT RULES

| Max-width | Wide. Less margin on sides than previous build. |
| --- | --- |
| Text blocks | Inset within the wider container. Narrower column for readability. |
| Name / cards | Near edge-to-edge. Full visual width. |
| Spacing | Existing spacing system carries forward. |
| Grid | Existing grid carries forward. |
| Type scale | Existing fluid type scale carries forward. |
| Responsive | Mobile-first CSS. Breakpoints: mobile → tablet → desktop. |
| Tap targets | Minimum 44px on mobile. |

---

## 11 · ROUTES

| / (index) | Homepage. Single page. All sections. |
| --- | --- |
| /work/[slug] | Project detail page. One per project. Layout TBD. |

All nav links on homepage are anchor scrolls, not page navigations. Project detail pages are the only secondary route.

---

## 12 · WHAT'S OUT

Sections and features explicitly removed from scope to keep the site focused:

- Craft section — fold any craft thinking into case studies instead
- Currently section — not earning its real estate at launch
- Elaborate hero copy / tagline manifesto — name + descriptor only
- Contact form — direct email link only
- Experiments section — ships later when 3+ builds are live
- Dark mode and Ferrari mode — post-launch progressive enhancement
- Video backgrounds — post-launch
- Translation toggle (EN/IT/FR) — post-launch
- Logo in nav — nav is links only, no brand mark

// build it, then refine it
