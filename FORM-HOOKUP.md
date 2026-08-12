# Contact form → Netlify hookup

Checklist for wiring the contact overlay to Netlify Forms after the site is deployed. Do this when your Netlify site is live (forms do not work on `file://` local previews).

**Current state:** Form is wired to Netlify Forms and tested (desktop + mobile). Submissions deliver to `info@francescobelvedere.com`. Production branch is `dev` until launch.

**Target inbox:** `info@francescobelvedere.com` (also in footer as `mailto:` fallback)

---

## 1. Netlify site setup

- [x] Log in at [app.netlify.com](https://app.netlify.com)
- [x] **Add new site** → import this repo (GitHub/GitLab) or drag-and-drop deploy
- [x] Note the default URL (e.g. `something-random.netlify.app`) — you will test the form here first
- [x] Build settings (static site, no framework):
  - **Build command:** leave empty (or `echo "static"` if Netlify requires a command)
  - **Publish directory:** `/` (repo root — `index.html` is at top level)
- [x] Deploy and confirm the homepage loads on the Netlify URL

---

## 2. Custom domain (when ready)

### Staging — `8pxgrid.com` (done)

- [x] **Domain settings** → add `8pxgrid.com` (and `www` if you use it)
- [x] At your domain registrar, add DNS records Netlify shows you
- [x] Wait for SSL certificate to provision (Netlify does this automatically)
- [x] Set primary domain and enable HTTPS redirect if offered

### Production — `francescobelvedere.com` (post-launch)

- [ ] **Domain settings** → add `francescobelvedere.com` (and `www` if you use it)
- [ ] At your domain registrar, add DNS records Netlify shows you (usually apex `A`/`ALIAS` + `CNAME` for `www`)
- [ ] Wait for SSL certificate to provision (Netlify does this automatically)
- [ ] Set primary domain and enable HTTPS redirect if offered

Forms work on both the `*.netlify.app` URL and your custom domain once deployed.

---

## 3. HTML changes (`index.html`)

Netlify detects forms at **build time** from the built HTML. Update the contact form block (around line 251).

- [x] Add form attributes:
  ```html
  <form
    class="contact-overlay-form"
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
  >
  ```
- [x] Add hidden fields (required for Netlify + JS submit):
  ```html
  <input type="hidden" name="form-name" value="contact">
  <p class="visually-hidden" aria-hidden="true">
    <label>Don't fill this out: <input name="bot-field"></label>
  </p>
  ```
- [x] Add `required` on fields you care about (`name`, `email`, `message`)
- [x] Change Send button from `type="button"` to `type="submit"`

**Optional:** Add a success/error message container inside the dialog (empty `<p>` with `aria-live="polite"`) for feedback without leaving the overlay. — [x] done

---

## 4. JavaScript changes (`js/main.js`)

Use `fetch` so the overlay stays open and you can show "Thanks" instead of a full-page redirect.

- [x] Select `.contact-overlay-form` inside the existing contact overlay block
- [x] On `submit`:
  - `event.preventDefault()`
  - Build `FormData` from the form
  - `fetch("/", { method: "POST", body: formData })`  
    (Netlify expects POST to `/` with encoded form body — same as a normal form post)
- [x] On success (response ok): show success message, clear fields, optionally close overlay after a short delay
- [x] On failure: show error message; suggest footer `mailto:` as backup
- [x] Disable Send button while submitting (avoid double sends)
- [x] Respect `prefers-reduced-motion` for any success animations (keep it simple)

**Note:** Netlify's encoded POST body is what `FormData` sends by default — no `Content-Type: application/json`.

---

## 5. Netlify dashboard — form notifications

After first deploy **with** the updated form markup:

- [x] **Enable form detection** (Site configuration → Forms)
- [x] **Branches and deploy contexts** → set production branch to `dev` (form code lives on `dev`, not `main`)
- [x] **Site configuration → Forms** — confirm a form named `contact` appears (may take one deploy)
- [x] **Form notifications** → add email notification to `info@francescobelvedere.com`
- [ ] Optional: **Form notifications → Slack** or other integrations
- [ ] Optional: **Spam filtering** (Netlify tier / settings) if you get junk submissions

---

## 6. Test plan

- [x] Deploy with form markup included (Netlify only registers forms present in the published HTML)
- [x] Open site on live URL — tested on `8pxgrid.com` (not local disk)
- [x] Click **Contact** in nav → fill all fields → **Send**
- [x] Check **Forms → Submissions** in Netlify dashboard
- [x] Check inbox (and spam folder) for notification email — arrives quickly, not in spam
- [ ] Test honeypot: if `bot-field` is filled, submission should be rejected silently
- [ ] Test empty required fields — browser validation should block submit
- [x] Test on mobile width
- [ ] After `francescobelvedere.com` is live, repeat one submit on production domain

---

## 7. If the form does not show up in Netlify

*(Resolved — kept for reference.)*

- [x] Confirm **form detection is enabled** (Site configuration → Forms)
- [x] Confirm **production branch** matches the branch you pushed (e.g. if form code is on `dev`, production branch must be `dev` — Netlify scans production deploy HTML, not branch-deploy-only HTML)
- [x] Confirm `data-netlify="true"` and `name="contact"` match hidden `form-name` value
- [x] Confirm you redeployed **after** adding form attributes
- [x] Confirm publish directory is repo root (where `index.html` lives)
- [x] For SPA-like setups you'd need a hidden static form — **not needed** for this project (plain HTML)

---

## 8. Out of scope for now (later / optional)

- [ ] reCAPTCHA (Netlify + third-party) if spam becomes a problem
- [ ] Duplicate contact overlay on `/work/*` pages if you add Contact links there later
- [ ] Autoresponder email to the person who submitted (Netlify paid features or custom function)

---

## 9. Post-launch — customize success state

Netlify only handles delivery (submissions + email). The on-screen success experience is yours in HTML/CSS/JS — nothing to configure in the Netlify dashboard.

**Current behavior (MVP):**
- Clears form fields on success
- Shows small green caption: "Thanks — your message was sent." (`.contact-overlay-status.is-success`)
- Auto-closes overlay after 2 seconds

**Files to touch:**

| File | What to change |
|------|----------------|
| `js/main.js` | Success copy, auto-close timing, swap/hide form, animations |
| `index.html` | Dedicated success panel markup (if replacing inline caption) |
| `css/styles.css` | Success typography, layout, icon, error state to match |

**Copy & tone**
- [ ] Friendlier message (e.g. "Got it — I'll get back to you soon.")
- [ ] Second line (e.g. "Usually reply within 24 hours.")

**Visual**
- [ ] Larger success typography (not just caption size)
- [ ] Checkmark icon or small illustration
- [ ] Swap entire form for a dedicated thank-you panel (hide fields, show only success block)

**Behavior**
- [ ] Keep overlay open longer, or remove auto-close (user dismisses manually)
- [ ] Fade out form fields, fade in success message
- [ ] Subtle GSAP success animation (respect `prefers-reduced-motion`)
- [ ] Change Send button to "Done" or hide it on success

**Error state**
- [ ] Match success treatment so both states feel designed (not bolted on)

Drop a Figma comp or describe the vibe when ready to build.

---

## 10. Post-launch — deploy & domain

- [ ] Merge `dev` → `main` on GitHub
- [ ] Netlify **Branches and deploy contexts** → switch production branch back to `main`
- [ ] Point `francescobelvedere.com` at Netlify (if not already)
- [ ] Update OG/meta URLs from staging domain to production domain
- [ ] Re-test form submit on production domain

---

## Quick reference — files to touch

| File | What to change |
|------|----------------|
| `index.html` | Form attributes, hidden fields, `type="submit"`, optional status message |
| `js/main.js` | `submit` handler + `fetch` POST |
| `css/styles.css` | Only if you add success/error message styles |

No changes needed to `css/tokens/primitives.css` or new npm packages.

---

## BUILD_SPEC note

`BUILD_SPEC.md` §11 originally listed "Contact form" as out of scope (mailto only). You've added the overlay UI — this doc covers delivery when you're ready to ship on Netlify.
