# Contact form → Netlify hookup

Checklist for wiring the contact overlay to Netlify Forms after the site is deployed. Do this when your Netlify site is live (forms do not work on `file://` local previews).

**Current state:** Overlay open/close works (`js/main.js`). Send button is `type="button"` with no submit handler — nothing is posted yet.

**Target inbox:** `info@francescobelvedere.com` (also in footer as `mailto:` fallback)

---

## 1. Netlify site setup

- [ ] Log in at [app.netlify.com](https://app.netlify.com)
- [ ] **Add new site** → import this repo (GitHub/GitLab) or drag-and-drop deploy
- [ ] Note the default URL (e.g. `something-random.netlify.app`) — you will test the form here first
- [ ] Build settings (static site, no framework):
  - **Build command:** leave empty (or `echo "static"` if Netlify requires a command)
  - **Publish directory:** `/` (repo root — `index.html` is at top level)
- [ ] Deploy and confirm the homepage loads on the Netlify URL

---

## 2. Custom domain (when ready)

- [ ] **Domain settings** → add `francescobelvedere.com` (and `www` if you use it)
- [ ] At your domain registrar, add DNS records Netlify shows you (usually apex `A`/`ALIAS` + `CNAME` for `www`)
- [ ] Wait for SSL certificate to provision (Netlify does this automatically)
- [ ] Set primary domain and enable HTTPS redirect if offered

Forms work on both the `*.netlify.app` URL and your custom domain once deployed.

---

## 3. HTML changes (`index.html`)

Netlify detects forms at **build time** from the built HTML. Update the contact form block (around line 251).

- [ ] Add form attributes:
  ```html
  <form
    class="contact-overlay-form"
    name="contact"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
  >
  ```
- [ ] Add hidden fields (required for Netlify + JS submit):
  ```html
  <input type="hidden" name="form-name" value="contact">
  <p class="visually-hidden" aria-hidden="true">
    <label>Don't fill this out: <input name="bot-field"></label>
  </p>
  ```
- [ ] Add `required` on fields you care about (`name`, `email`, `message`)
- [ ] Change Send button from `type="button"` to `type="submit"`

**Optional:** Add a success/error message container inside the dialog (empty `<p>` with `aria-live="polite"`) for feedback without leaving the overlay.

---

## 4. JavaScript changes (`js/main.js`)

Use `fetch` so the overlay stays open and you can show "Thanks" instead of a full-page redirect.

- [ ] Select `.contact-overlay-form` inside the existing contact overlay block
- [ ] On `submit`:
  - `event.preventDefault()`
  - Build `FormData` from the form
  - `fetch("/", { method: "POST", body: formData })`  
    (Netlify expects POST to `/` with encoded form body — same as a normal form post)
- [ ] On success (response ok): show success message, clear fields, optionally close overlay after a short delay
- [ ] On failure: show error message; suggest footer `mailto:` as backup
- [ ] Disable Send button while submitting (avoid double sends)
- [ ] Respect `prefers-reduced-motion` for any success animations (keep it simple)

**Note:** Netlify's encoded POST body is what `FormData` sends by default — no `Content-Type: application/json`.

---

## 5. Netlify dashboard — form notifications

After first deploy **with** the updated form markup:

- [ ] **Site configuration → Forms** — confirm a form named `contact` appears (may take one deploy)
- [ ] **Form notifications** → add email notification to `info@francescobelvedere.com`
- [ ] Optional: **Form notifications → Slack** or other integrations
- [ ] Optional: **Spam filtering** (Netlify tier / settings) if you get junk submissions

---

## 6. Test plan

- [ ] Deploy with form markup included (Netlify only registers forms present in the published HTML)
- [ ] Open site on Netlify URL (not local disk)
- [ ] Click **Contact** in nav → fill all fields → **Send**
- [ ] Check **Forms → Submissions** in Netlify dashboard
- [ ] Check inbox (and spam folder) for notification email
- [ ] Test honeypot: if `bot-field` is filled, submission should be rejected silently
- [ ] Test empty required fields — browser validation should block submit
- [ ] Test on mobile width
- [ ] After custom domain is live, repeat one submit on `francescobelvedere.com`

---

## 7. If the form does not show up in Netlify

- [ ] Confirm `data-netlify="true"` and `name="contact"` match hidden `form-name` value
- [ ] Confirm you redeployed **after** adding form attributes
- [ ] Confirm publish directory is repo root (where `index.html` lives)
- [ ] For SPA-like setups you'd need a hidden static form — **not needed** for this project (plain HTML)

---

## 8. Out of scope for now (later / optional)

- [ ] reCAPTCHA (Netlify + third-party) if spam becomes a problem
- [ ] Duplicate contact overlay on `/work/*` pages if you add Contact links there later
- [ ] Autoresponder email to the person who submitted (Netlify paid features or custom function)

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
