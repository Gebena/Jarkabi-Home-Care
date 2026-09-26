# Batch 9 — choose one: security headers **or** transparent hero header

Both are polish items from the improvement audit. **Pick one** for the next implementation batch; do not merge both in a single release without testing each independently.

---

## Option A — Security headers (Batch 9A)

**Goal:** Harden production responses with standard HTTP security headers (audit item B23).

**Scope:**

| Header | Purpose |
|--------|---------|
| `Strict-Transport-Security` | Force HTTPS (Vercel handles TLS; HSTS on custom domain) |
| `X-Content-Type-Options: nosniff` | MIME sniffing protection |
| `X-Frame-Options: SAMEORIGIN` | Clickjacking mitigation |
| `Referrer-Policy: strict-origin-when-cross-origin` | Limit referrer leakage |
| `Permissions-Policy` | Disable unused browser features |
| `Content-Security-Policy` (report-only first) | XSS mitigation — tune for Payload admin, Vercel Blob, fonts |

**Implementation:** Add headers in `next.config.ts` `headers()` or `vercel.json`. Start CSP in **report-only** mode; promote to enforce after one preview deploy.

**Pros**

- Low visual risk; no layout changes.
- Improves Lighthouse Best Practices and security posture.
- Required for many enterprise / healthcare-adjacent procurement checklists.

**Cons**

- CSP tuning takes iteration (Payload `/admin`, inline styles, Serwist PWA).
- Wrong CSP can break admin or third-party embeds.

**Effort:** ~1 focused batch (config + CSP report-only + verify admin + public pages).

---

## Option B — Transparent hero header (Batch 9B)

**Goal:** Match master prompt §25 — header transparent over the homepage hero, solid white with shadow on scroll.

**Current state:** `SiteHeader` is always white/sticky with border (`src/components/layout/site-header.tsx`).

**Scope:**

- Homepage only (or hero pages): `position: sticky`, `bg-transparent`, no border at top.
- On scroll past ~12px: transition to current white bar + shadow (scroll listener already exists).
- Ensure contrast over hero imagery (white or plum text + optional scrim).
- Mobile: same behaviour; tap-to-call and REQUEST CARE remain visible.

**Pros**

- Matches Care Giver Home Page 01 reference and master prompt.
- Visible brand polish on first impression.

**Cons**

- Contrast/accessibility work over varied hero slides.
- Inner pages keep solid header — behaviour differs by route (document in QA).
- Does not improve security.

**Effort:** ~1 batch (header variant prop, homepage layout flag, contrast QA, FR/EN check).

---

## Recommendation

| If your priority is… | Choose |
|----------------------|--------|
| Launch checklist / compliance / admin safety | **Option A — Security headers** |
| Visual parity with Care Giver demo / marketing first impression | **Option B — Transparent header** |

Reply with **9A** or **9B** (or “security headers” / “transparent header”) to schedule the next PR.
