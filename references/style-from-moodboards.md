# Style from moodboards

Design notes inspired by the boards in `references/moodboards/`. Use this file **together with** `BUILD_SPEC.md` and `css/tokens/primitives.css`. When a choice is ambiguous, prefer **tokens** over approximations from the JPGs.

**What these are:** The moodboard and hero JPGs/PNGs are **ideas and optional directions**—possible layouts, motifs, and color treatments you might push toward. They are **not** hard rules, pixel specs, or final page layouts. **`BUILD_SPEC.md`** and the code you ship are authoritative for structure and behavior.

**Color tokens (locked, unlike the boards):** For **solid UI colors** (text, fills, borders, shadows with a defined token), every component and element must use a **CSS variable that resolves to `primitives.css`**—no arbitrary hex in markup or component CSS. **Exceptions:** **gradients** (may blend multiple primitives or stops that don’t map 1:1 to a single token—still prefer deriving stops from primitives where possible) and **embedded imagery** (photos, illustrations, GIFs—their colors are not tokenized). See `BUILD_SPEC.md` §09 for architecture and post-launch accessibility updates to primitives.

**Source files:** `mood-board-A.jpg`, `mood-board-C.jpg`, `mood-board-D.jpg`, `mood-board-E.jpg`, `mood-board-F.jpg`, `mood-board-G.jpg`, `page-hero-mood-A.jpg` (default-mode hero inspiration; also: `page-hero-mood-B.jpg`, `page-hero-mood-C.jpg`, `landscape-mood-A.png`)

---

## How to use this in Cursor

- For layout, color, or typography work, read this doc (and `BUILD_SPEC.md`) before changing HTML/CSS.
- When you want **optional** visual context, open or `@`-mention files in `references/moodboards/`—treat them as inspiration, not a checklist.
- Implement **solid** colors only via **tokens** from `primitives.css` (or semantic aliases that point at them). **No one-off hex** on components unless you are defining a **gradient stop** or it is **inside an image asset**. After launch, an **accessibility pass** may adjust primitive values—you will supply updated hex in `primitives.css` when that happens.

---

## Shared themes (all boards)

| Theme | Guidance |
| --- | --- |
| **Voice** | Modern product design, confident, not corporate. Whimsical yet technically savvy. Room for visual experimentation and exploration (art references, characterful “F”), but UI stays clean. |
| **Layout** | Boards often show **asymmetric** heroes with a **large geometric focal** (mark or “F”), negative space, and small **circular** portraits—**one possible direction**, not a required template. |
| **Theme & color** | **Three color modes** are planned (see `BUILD_SPEC.md` §09 · Color modes). **Ship the first mode only at launch**; add the other two after launch. **Default mode (v1):** **`--Lime-500`** and the **Lime** scale as the primary atmosphere; **Lemon** (yellows) and **Blue** in supporting roles (accents, hierarchy, UI chrome). Inspiration reference (default mode): `references/moodboards/page-hero-mood-A.jpg`—**not** a locked comp. **Second and third modes** will bring **reds and oranges** forward more strongly (alongside token work / `data-theme` — details in `BUILD_SPEC.md`). Until those ship, treat Rosso / Orange families as **reserved for future themes**, not the default UI. Neutrals (**Foundation**, **Warm-Grey**, **Cool-Grey**) ground all modes. |
| **Typography** | Geometric sans, often **all-caps** for titles. Clear hierarchy: lighter line + heavier name, or color flip (e.g. white on dark, **Lime / Lemon / Blue** on light for default mode). Prefer existing stack: **Work Sans** (`--Font-Family-*` in primitives). |
| **Mark** | Rounded, blocky **“F”** with circular cutout (and sometimes a horizontal “slot”) is the recurring hero shape—friendly, almost character-like. Align with `BUILD_SPEC` for where the mark appears (hero, footer, favicon—not nav). |
| **Texture / pattern** | Subtle **mesh or diagonal connector lines** on large fields suggest “systems thinking” without clutter—use sparingly (opacity, thin strokes). |
| **Imagery** | Boards suggest mixes like **B&W conceptual**, **color editorial**, **line illustration** (e.g. birds of prey). Circular crops for people are one option among many. |
| **Iconography** | Thin **monoline** icons; simple silhouettes. UI mockups on boards use **rounded pills** and plenty of air. |

---

## Token mapping (moodboards → primitives)

Use the closest semantic token; adjust step (50–950) for contrast, not new hex.

### Default color mode (launch)

| Role | Primitives direction |
| --- | --- |
| Primary atmosphere | **`--Lime-*`**, anchored around **`--Lime-500`** for core brand fields and key accents |
| Supporting accents | **`--Lemon-*`** (highlights, pills, secondary warmth) |
| Supporting cool accents | **`--Blue-*`** (links, secondary UI, air) |
| Neutrals / text / chrome | `--Foundation-White`, `--Foundation-Black`, `--Warm-Grey-*`, `--Cool-Grey-*` as needed |

For default mode, aim for a similar **mood** to `page-hero-mood-A.jpg` and `BUILD_SPEC` §03 (e.g. gradient + grain, mint-forward)—iterate in the browser; the JPG is not a spec sheet.

### Future color modes (post-launch)

| Moodboard idea | Primitives direction |
| --- | --- |
| Warm red “F” / headline red | `--Rosso-Dino-*` or `--Rosso-Corsa-*` (when a red-forward theme ships) |
| Orange / tangerine emphasis | `--Orange-*` (when that mode ships) |
| Bright yellow / gold (non-default emphasis) | `--Lemon-*` (still available; stronger in some boards) |

Moodboards **D / E / F / G** remain useful **reference** for contrast, layout, and eventual palette swaps — they are **not** the default launch look.

### General (all modes, any time)

| Moodboard idea | Primitives direction |
| --- | --- |
| Mint / seafoam fields | `--Lime-*` |
| Bright yellow / gold pills | `--Lemon-*` |
| Sky blue accents | `--Blue-*` |
| Deep brown / near-black backgrounds | `--Warm-Grey-950` / `--Warm-Grey-900` or `--Foundation-Black` |
| Off-white / cream panels | `--Foundation-White`, `--Lemon-50`, `--Warm-Grey-50`–`--Warm-Grey-100` |
| Cool neutral UI chrome | `--Cool-Grey-*` as needed |

---

## Per-board notes

### A — `mood-board-A.jpg`

- **Collage / systems** mood: diagonal green “wires,” multiple logos (F variants, line icon set), Magritte reference, B&W “idea” portrait, hawk sketch, mobile mocks with **yellow pills**.
- **Takeaway:** Rich *brand* layer (art, metaphor, icons) vs. **minimal** product UI. Site can echo the **connector** motif lightly in backgrounds or section dividers—not as busy as the full collage.

### C — `mood-board-C.jpg`

- **Mint field** + huge **white “F”** + thin **white mesh** + restrained type (“PRODUCT DESIGN BY…”).
- **Takeaway:** Primary **hero** formula: bold mark, airy caps headline, optional lavender/peach as *small* accents if you add semantic tokens later; otherwise use `--Blue-*` / warm tints sparingly.

### D — `mood-board-D.jpg`

- **White** canvas, **red “F”**, black + red type, swatch strip (black, red, yellow, light grey).
- **Takeaway:** Useful for a **future** red-forward light theme — not the default Lime-first launch mode.

### E — `mood-board-E.jpg`

- **Dark** ground, **red “F”**, **yellow** name line, white supporting line; same red/yellow/off-white/black vocabulary.
- **Takeaway:** Reference for **future** dark / high-contrast themes when reds and yellows lead.

### F — `mood-board-F.jpg`

- **Soft cream → pale yellow** gradient ground, **white “F”**, red name, black label line.
- **Takeaway:** Warm gradient vocabulary — **Lemon** / neutrals align with default mode; red headline belongs to **later** modes.

### G — `mood-board-G.jpg`

- **Pale mint → cream** gradient, **white “F”**, red name, circular portrait and swatches.
- **Takeaway:** Closest board to **default** mint + soft warmth; prefer **Lime + Lemon + Blue** over red name treatment until mode 2/3 ship.

---

## Do / don’t (implementation)

**Do**

- Use **scale tokens** (`--Scale-*`) for spacing and radii where possible.
- For **solid fills, text, borders, and UI chrome**, use **only** primitive-backed variables (see **Color tokens (locked)** above)—gradients and images are the main carve-outs.
- For **default mode**, lead with **`--Lime-*` (500-centered)** and use **Lemon** + **Blue** before reaching for Rosso or Orange.
- Keep **section backgrounds** either flat tokens or **very subtle** gradients (`BUILD_SPEC` §03, `page-hero-mood-A.jpg`)—no loud rainbow meshes unless intentional hero art.
- Use **Lemon** for CTAs, highlights, and small UI moments; use **Blue** for secondary emphasis and breathing room.
- Reuse **circles**: avatars, swatch-style pills, cutout language in the mark.

**Don’t**

- Drop **raw hex** on components for solid colors when a token exists—fix contrast by **changing the primitive** (post-launch a11y pass) instead of one-off patches.
- Default the **launch** site to **red/orange-led** palettes (boards D–G show those directions for **later** themes).
- Clutter the **scan path** for hiring managers: moodboard *density* is reference, not a target for every viewport.
- Put the full **collage** treatment on every block—pick one hero moment (A-style) if at all.
- Drift to **corporate** blue-grey default UI; neutrals should stay warm/clear per tokens.

---

## Living document

Edit this file when you lock each **color mode** (default Lime-first, then post-launch modes per `BUILD_SPEC.md` §09). Note the date and decision in a short bullet so future passes stay aligned.
