# Template Audit — Seniar, Care Giver & Jarkabi Home Care

**Audit date:** 2026-09-24  
**Auditor:** Cursor Cloud Agent (Phase 1 — documentation only, no production code changes)  
**Production app:** `/jarkabi-home-care/`  
**Reference templates (expected):** `/templates/seniar/`, `/templates/caregiver/`

---

## Executive summary

| Source | Status | Role for Jarkabi |
|--------|--------|------------------|
| **Seniar** | Partially present — absorbed into `jarkabi-home-care/` via index-3 clone (PR #215); original zip **not** in repo | **KEEP** structure & routing patterns; **REBUILD** styling & brand |
| **Care Giver** | **Not present** in workspace — audit based on ThemeForest listing + live preview only | **REFERENCE** visual warmth, trust, family tone; **REMOVE** Bootstrap/HTML architecture |
| **Current `jarkabi-home-care`** | Active Next.js 16 + Payload CMS 3 platform, deployed on Vercel | **Home Page 01** layout adopted (2026-09-24); Jarkabi branding pass still required |

### Critical finding

The live site currently **reads as Seniar** (purple/coral palette, index-3 section order, template CSS class names). The user's specification requires a **custom Jarkabi Home Care** identity using navy/teal/champagne tokens. Phase 4+ must deliberately break template visual DNA while preserving engineering investments.

### Template folder status

```
/templates/seniar/     → NOT FOUND in repository
/templates/caregiver/  → NOT FOUND in repository
```

**Action required (license holder):** Place purchased template zips **outside** the public GitHub repo (local machine or private storage). For agent audits, optionally mount read-only copies at the paths above and add `/templates/` to `.gitignore`. Never commit full Envato packages.

---

## Classification legend

| Label | Meaning |
|-------|---------|
| **KEEP** | Reuse as-is or with minor adaptation in `jarkabi-home-care/` |
| **REBUILD** | Concept survives; implementation must be rewritten for Jarkabi design system |
| **REFERENCE** | Inspiration only — reinterpret, do not copy HTML/CSS/assets wholesale |
| **REMOVE** | Do not carry forward — technical debt, wrong stack, or off-brand |

---

# Part A — SENIAR audit

## A.1 Source availability

| Item | Finding |
|------|---------|
| Original Seniar package in repo | **Absent** |
| Seniar-derived code in production app | **Present** — `src/app/globals.css` (~2,067 lines), 18 section components, Seniar index-3 homepage order |
| Seniar live reference | https://seniar-vite.vercel.app/index-3 (React + Vite demo) |
| Documented origin | `docs/PROGRESS.md` — "PR #215 — Seniar index-3 clone" |

### Inferred Seniar original stack (from demo + absorbed code)

| Technology | Seniar (original) | Current Jarkabi absorption |
|------------|-------------------|----------------------------|
| Framework | React + **Vite** (per demo title) | **Next.js 16** App Router |
| React | ~18.x (typical for Vite templates) | **19.2.8** |
| TypeScript | Likely partial / JS variant available | **Full TypeScript**, `strict: true` |
| Routing | React Router (Vite SPA) | **Next.js App Router** + `[locale]` segment |
| CSS | Custom CSS / possibly Bootstrap in other variants | Custom BEM-like CSS in `globals.css` + Tailwind v4 imported but **barely used** |
| CMS | None (static) | **Payload CMS 3** added |
| i18n | None | **next-intl** — 7 locales |

## A.2 Next.js & routing architecture

| Area | Classification | Notes |
|------|----------------|-------|
| App Router pattern | **KEEP** | `src/app/[locale]/` for public, `(payload)/` for admin |
| Locale prefix | **KEEP** | `localePrefix: "always"` — required for Canada-wide + multilingual |
| Payload admin at `/admin` | **KEEP** | Standard Payload 3 integration |
| API routes for forms | **KEEP** | `/api/care-request`, `/api/referral`, `/api/job-application` |
| Seniar nav naming (`projects`, `blog`) | **REBUILD** | `nav-config.ts` still uses Seniar keys mapped to Locations/Resources |
| Static demo pages | **REBUILD** | Rename/restructure to spec: Why Jarkabi, How Care Works, etc. |

### Current public routes (20 pages)

| Route | Seniar equivalent | Classification |
|-------|-------------------|----------------|
| `/[locale]` | index-3 homepage | **REBUILD** — new section order per spec §25 |
| `/[locale]/about` | About page | **KEEP** structure, **REBUILD** design |
| `/[locale]/services` + `[slug]` | Services grid + detail | **KEEP** — already CMS-driven |
| `/[locale]/locations` + province/city | Projects/locations | **KEEP** — custom Canadian expansion |
| `/[locale]/resources` + `[slug]` | Blog | **KEEP** |
| `/[locale]/careers` + `[slug]` | Careers | **KEEP** |
| `/[locale]/caregivers` | Team/caregivers | **KEEP** content goal, **REBUILD** UI |
| `/[locale]/how-care-works` | Process page | **KEEP**, **REBUILD** visual process |
| `/[locale]/why-choose-us` | Why us | **RENAME** → `/why-jarkabi`, **REBUILD** |
| `/[locale]/referrals` | — | **KEEP** (Jarkabi custom) |
| `/[locale]/contact` | Contact | **KEEP** |
| `/[locale]/legal/*` | — | **KEEP** (Jarkabi custom) |
| `/[locale]/growing-across-canada` | — | **KEEP** (Jarkabi custom) |

## A.3 Component structure

### Layout (`src/components/layout/`)

| Component | Classification | Notes |
|-----------|----------------|-------|
| `site-header.tsx` | **REBUILD** | Seniar sticky header + dropdowns; needs Jarkabi nav per spec §23 |
| `site-footer.tsx` | **REBUILD** | Seniar 4-column footer pattern |
| `mobile-nav.tsx` | **REBUILD** | Custom slide-out; migrate to shadcn Sheet |
| `locale-switcher.tsx` | **KEEP** | Functional; restyle |
| `mobile-bottom-bar.tsx` | **KEEP** | Jarkabi addition (Call + Request Care) |
| `page-hero.tsx` | **REBUILD** | Inner page hero — rebrand |
| `top-bar.tsx` | **REMOVE** | Unused purple promo bar — Seniar remnant |

### Sections (`src/components/sections/`)

| Component | Seniar index-3 section | Classification |
|-----------|------------------------|----------------|
| `hero-slider.tsx` | Auto-rotating hero | **REBUILD** → single editorial hero per spec §24 |
| `featured-services-section.tsx` | 3-up image cards | **REFERENCE** layout idea, **REBUILD** as ServiceCard grid |
| `intro-section.tsx` | About collage split | **REBUILD** → Care Philosophy intro §27 |
| `features-section.tsx` | Numbered feature list | **REBUILD** → Trust Indicators §26 |
| `why-section.tsx` | Video + purple panel | **REBUILD** — remove Seniar purple panel |
| `services-preview.tsx` | Services grid | **KEEP** data wiring, **REBUILD** cards |
| `stats-section.tsx` | Counter stats | **REMOVE** unless substantiated — spec §14 forbids fake stats |
| `team-section.tsx` | Team carousel | **REBUILD** — wire to CMS `team-members` |
| `faq-section.tsx` | Accordion FAQ | **KEEP** pattern, **REBUILD** — wire to CMS `faqs` |
| `testimonials-section.tsx` | 3-column testimonials | **REBUILD** — wire to CMS; remove placeholder "MR" avatar |
| `contact-cta-section.tsx` | Contact CTA split | **KEEP** intent, **REBUILD** |
| `home-contact-form.tsx` | Homepage form | **REBUILD** — fix fake postal code hack |
| `blog-preview-section.tsx` | Blog cards | **KEEP** |
| `process-section.tsx` | Timeline (not on homepage) | **KEEP** for How Care Works page |
| `hero-section.tsx` | Alternate hero | **REMOVE** — unused |
| `cta-section.tsx` | Generic CTA | **KEEP** as primitive |
| `trust-bar.tsx` | Trust strip | **KEEP** — align with spec §26 |

### UI primitives (`src/components/ui/`)

| Component | Classification |
|-----------|----------------|
| `scroll-reveal.tsx` | **REFERENCE** — subtle motion OK; respect `prefers-reduced-motion` |
| `search-modal.tsx` | **REBUILD** — static link filter only; consider Command palette |
| `video-lightbox.tsx` | **REFERENCE** — optional on Why Jarkabi; add focus trap |

## A.4 CSS architecture

| Aspect | Finding | Classification |
|--------|---------|----------------|
| Primary stylesheet | `src/app/globals.css` — ~2,067 lines | **REBUILD** incrementally |
| Tailwind v4 | `@import "tailwindcss"` present; utilities rarely used | **KEEP** as target system |
| Bootstrap | **Not present** | N/A — good |
| CSS variables | Seniar purple `#59375f` + coral `#e5a89a` | **REMOVE** — replace with Jarkabi navy/teal/champagne |
| Class naming | `.hero-slider`, `.featured-card`, `.why-panel`, `.script-text`, `.eyebrow` | **REBUILD** — Seniar fingerprints |
| Fonts | Bricolage Grotesque + Allison script | **REBUILD** — spec calls for serif display + sans body |
| Responsive | Custom media queries in globals.css | **KEEP** approach, **REBUILD** breakpoints per spec §65 |

### Brand token conflict (must resolve in Phase 3)

| Source | Primary | Secondary | Accent | Background |
|--------|---------|-----------|--------|------------|
| `globals.css` (live UI) | `#59375f` purple | `#e5a89a` coral | coral | `#f8f5f1` |
| `BrandSettings` CMS | `#1a2b4a` navy | `#7d9b8a` sage | `#c9a96e` gold | `#f8f5f0` |
| User spec §15 | Deep Navy | Muted Teal | Champagne Gold | Warm Ivory |

**Decision:** Adopt user spec §15. Wire CMS `BrandSettings.colors` into CSS variables at runtime (Phase 4).

## A.5 JavaScript / animation

| Library | In Seniar (typical) | In Jarkabi | Classification |
|---------|---------------------|------------|----------------|
| Swiper / slider | Common in templates | Custom `setInterval` in `hero-slider.tsx` | **REBUILD** — consider embla or CSS-only |
| AOS / scroll animations | Common | Custom `scroll-reveal.tsx` | **KEEP** subtle approach |
| jQuery | Sometimes in HTML templates | **Absent** | **REMOVE** (N/A) |
| Framer Motion | — | **Not installed** | **REFERENCE** — add only if needed §77 |

## A.6 Icons & images

| Asset type | Classification | Notes |
|------------|----------------|-------|
| Lucide React icons | **KEEP** | Already in stack |
| Seniar icon font (if any) | **REMOVE** | Not present |
| Unsplash stock URLs | `src/lib/service-images.ts` | **REBUILD** — licensed Jarkabi photography or Care Giver licensed images (documented) |
| Template bundled images | Not in repo | **REFERENCE** only if copied per `licensed-assets.md` |

## A.7 Forms (Seniar original vs current)

| Form | Seniar | Jarkabi current | Classification |
|------|--------|-----------------|----------------|
| Contact | Basic HTML | Care request API + Payload | **KEEP** backend, **REBUILD** UI with RHF + Zod |
| Request care | — | `care-request-form.tsx` | **KEEP** |
| Newsletter | Sometimes | **Absent** | — |

## A.8 Blog & content

| Feature | Classification |
|---------|----------------|
| Blog card layout | **REFERENCE** Seniar, **REBUILD** styling |
| Payload `blog-posts` collection | **KEEP** |
| Resources categorization | **KEEP** — expand per spec §61 |

## A.9 Performance concerns

| Issue | Severity | Classification |
|-------|----------|----------------|
| Monolithic CSS bundle (~2K lines) | Medium | **REBUILD** — split by component with Tailwind |
| External Unsplash images | Medium | **REBUILD** — `next/image` + self-hosted |
| Hero slider JS timer | Low | **REBUILD** — single hero reduces JS |
| No route-level code splitting issues observed | — | **KEEP** |

## A.10 Accessibility issues (Seniar-derived)

| Issue | Location | Classification |
|-------|----------|----------------|
| No skip-to-content link | Layout | **REBUILD** |
| Hero slider lacks `aria-live` | `hero-slider.tsx` | **REBUILD** |
| Form labels missing `htmlFor` | All forms | **REBUILD** |
| FAQ missing `aria-controls` | `faq-section.tsx` | **REBUILD** |
| `<html lang>` hardcoded `en` | `app/layout.tsx` | **REBUILD** |
| Decorative script font on body text | `.script-text` | **REFERENCE** — use sparingly for quotes only |

## A.11 Deprecated / missing dependencies

| Item | Status |
|------|--------|
| Bootstrap | Not used — good |
| shadcn/ui | **Not installed** — required Phase 5 |
| react-hook-form | **Not installed** — required Phase 13 |
| Zod | Installed but **unused** in `src/` |
| @supabase/supabase-js | **Not installed** — Postgres via connection string only |

---

# Part B — CARE GIVER audit

> **Scope note:** The Care Giver HTML template package is **not on the Cloud Agent VM** (user has unpacked copy locally in `care-giver-package 5/`). License verified: Envato Elements `KVZ473J956` (ThemeArc, 2026-09-24). This audit is based on the Envato listing, preview demos, and vendor documentation. **A full file-level audit requires unpacking into `/templates/caregiver/` (gitignored) on the agent or local machine.**

## B.1 Template profile (from vendor documentation)

| Attribute | Value |
|-----------|-------|
| Type | Static HTML template |
| Author | ThemeArc |
| Stack | HTML5, CSS3, JavaScript |
| CSS framework | **Bootstrap 3/4** (listing inconsistent — treat as Bootstrap-based) |
| Page count | 30+ HTML pages |
| Homepage demos | 1 primary homepage |
| Forms | PHP AJAX contact form |
| Maps | Google Maps multi-location |
| Gallery | Grid, masonry, fullwidth variants |
| Blog | Multiple blog layouts |
| Last update (listing) | 2025-05-28 |

## B.2 Strongest ideas — visual inspiration only

| Element | Why it works for home care | Classification |
|---------|---------------------------|----------------|
| Warm, family-oriented photography | Emotional trust without clinical coldness | **REFERENCE** |
| Generous section spacing | Senior-readable, calm pacing | **REFERENCE** |
| Service presentation blocks | Clear "what we help with" scanning | **REFERENCE** → Jarkabi `ServiceCard` |
| Trust / credentials strip | Professional credibility | **REFERENCE** → Trust Indicators §26 |
| Testimonial layouts with faces | Human proof (real content only) | **REFERENCE** |
| Family peace-of-mind copy structure | Speaks to adult children audience | **REFERENCE** → §33 |
| CTA placement after emotional sections | Conversion rhythm | **REFERENCE** |
| Contact section with phone prominence | Mobile-first care industry norm | **REFERENCE** |
| FAQ accordion before footer | Reduces friction | **REFERENCE** |
| "How we work" stepped process | Matches spec §32 | **REFERENCE** |
| Footer widget columns | Service areas + contact | **REFERENCE** — already in Seniar footer pattern |
| Parallax / hero overlays | Can feel dated | **REMOVE** or minimal **REFERENCE** |
| Shop pages | E-commerce | **REMOVE** — not relevant |
| Company history / partners pages | Corporate | **REFERENCE** only if needed for About |

## B.3 Typography & spacing (Care Giver)

| Idea | Classification |
|------|----------------|
| Large hero headlines with supportive subcopy | **REFERENCE** |
| Google Fonts pairing (likely sans + optional serif) | **REBUILD** — use Jarkabi tokens §16 |
| Comfortable line-height for body | **KEEP** principle — already ~1.7 in Jarkabi |
| Section title + subtitle pattern | **REFERENCE** → `SectionHeading` component |

## B.4 What NOT to import from Care Giver

| Item | Classification | Reason |
|------|----------------|--------|
| Bootstrap grid & utilities | **REMOVE** | Conflicts with Tailwind strategy §20 |
| jQuery plugins | **REMOVE** | React/Next.js stack |
| PHP contact handler | **REMOVE** | Use Next.js API + Supabase/Payload |
| Full HTML page copies | **REMOVE** | License hygiene §81 |
| Care Giver colour palette | **REMOVE** | Jarkabi brand §15 |
| Retirement-home / facility tone | **REMOVE** | Jarkabi is **home care**, not retirement residence |
| Pre-built shop | **REMOVE** | Out of scope |

## B.5 Licensed assets from Care Giver

When the template package is available locally, audit:

- `images/` — copy only needed photos to `jarkabi-home-care/public/media/` and log in `licensed-assets.md`
- Icon sets — prefer Lucide; copy only if uniquely licensed
- Fonts — verify license permits web embedding

**Until then:** `licensed-assets.md` lists only Unsplash URLs currently in use (to be replaced).

---

# Part C — Current `jarkabi-home-care` platform audit

## C.1 Stack (installed versions)

| Package | Version |
|---------|---------|
| next | 16.3.6 |
| react / react-dom | 19.2.8 |
| typescript | ^5 |
| tailwindcss | ^4 |
| payload | ^3.90.2 |
| next-intl | ^4.14.6 |
| zod | ^4.6.5 |
| lucide-react | ^1.47.0 |
| serwist | ^9.5.12 (PWA) |

**Not installed:** shadcn/ui, react-hook-form, @supabase/supabase-js, framer-motion, bootstrap

## C.2 CMS / database

| Component | Status | Classification |
|-----------|--------|----------------|
| Payload CMS 3 | Production-ready admin | **KEEP** |
| 17 collections | Defined | **KEEP** — wire dormant ones to frontend |
| `brand-settings` global | Defined | **KEEP** — connect to CSS |
| SQLite (local) | Working | **KEEP** for dev |
| Supabase Postgres | Script exists; **not provisioned** | **KEEP** — Phase 11 blocker |
| Vercel Blob storage | Optional plugin | **KEEP** |

### Collections — frontend wiring status

| Collection | Wired to UI? | Classification |
|------------|--------------|----------------|
| services | ✅ | **KEEP** |
| blog-posts | ✅ | **KEEP** |
| provinces, cities | ✅ | **KEEP** |
| legal-pages | ✅ | **KEEP** |
| careers, job-applications | ✅ | **KEEP** |
| care-requests, referrals | ✅ | **KEEP** |
| team-members | ❌ hardcoded | **REBUILD** — connect |
| testimonials | ❌ hardcoded | **REBUILD** — connect |
| faqs | ❌ i18n JSON | **REBUILD** — connect |
| pages + blocks | ❌ partial renderer | **REBUILD** — page builder §79 |
| pricing-rates | ❌ | **KEEP** for future §64 |
| service-availability | ❌ | **KEEP** — wire for province matrix §15 |

## C.3 Multilingual

| Locale | Code | Messages complete? | Classification |
|--------|------|-------------------|----------------|
| English | en | ✅ ~300 keys | **KEEP** |
| French | fr | ✅ ~300 keys | **KEEP** |
| Tigrinya | ti | ⚠️ ~169 keys | **REBUILD** translations |
| Blin | byn | ⚠️ partial | **REBUILD** |
| Tigre | tig | ⚠️ partial | **REBUILD** |
| Arabic | ar | ⚠️ partial + RTL | **KEEP** RTL infra, **REBUILD** copy |
| Amharic | am | ⚠️ partial | **REBUILD** |

**Architecture gap:** UI strings in JSON files; CMS content in Payload. Spec §46 requires database-driven translations — migrate in Phase 15.

## C.4 SEO & structured data

| Feature | Present? | Classification |
|---------|----------|----------------|
| Per-page metadata | Partial | **REBUILD** |
| sitemap.xml | ❌ | **REBUILD** Phase 16 |
| robots.txt | ❌ | **REBUILD** |
| JSON-LD | ❌ | **REBUILD** |
| hreflang (7 locales) | ❌ (en/fr only) | **REBUILD** |

## C.5 Security

| Control | Status |
|---------|--------|
| Payload auth + roles | ✅ Defined |
| RLS (Supabase) | ❌ Not implemented — Payload handles access |
| Rate limiting | ⚠️ In-memory only |
| Server-side Zod validation | ❌ |
| Secrets in .env | ✅ |

## C.6 "Does it still look like Seniar?"

**Yes — current production.** Evidence:

1. Homepage section order matches Seniar index-3 exactly
2. Purple/coral palette ≠ Jarkabi spec navy/teal/champagne
3. CSS class names (`featured-card`, `why-panel`, `hero-slider`) are Seniar patterns
4. Navigation uses Seniar dropdown structure (`pages`, `servicesMenu`, `projects`, `blog`)
5. Allison script font + Bricolage Grotesque = Seniar typography pairing
6. Stock Unsplash photography = generic template feel

**Does it look like Care Giver?** No — Care Giver was not used in the build.

---

# Part D — Master classification matrix

## Seniar — by major system

| System | Verdict |
|--------|---------|
| Next.js App Router structure | **KEEP** |
| Locale routing | **KEEP** |
| Section component file organization | **KEEP** (rename/reorder) |
| globals.css monolith | **REBUILD** |
| Seniar colour palette | **REMOVE** |
| Hero slider | **REBUILD** → editorial hero |
| index-3 homepage order | **REBUILD** → spec §25 order |
| Stats with unverified numbers | **REMOVE** until substantiated |
| nav-config Seniar keys | **REBUILD** |
| Payload CMS layer | **KEEP** (Jarkabi custom) |
| PWA / mobile bar | **KEEP** (Jarkabi custom) |
| Canada locations architecture | **KEEP** (Jarkabi custom) |

## Care Giver — by major system

| System | Verdict |
|--------|---------|
| Bootstrap layout | **REMOVE** |
| HTML page files | **REFERENCE** only |
| Warm photography direction | **REFERENCE** |
| Family-focused messaging structure | **REFERENCE** |
| Service detail page sections | **REFERENCE** |
| Trust / credentials presentation | **REFERENCE** |
| PHP forms | **REMOVE** |
| Shop / e-commerce pages | **REMOVE** |
| Parallax effects | **REMOVE** |

---

# Part E — Blockers before Phase 4 implementation

1. **Add template packages locally** (gitignored) for full Care Giver file audit
2. **Provision Supabase** Canada Central + `DATABASE_URI` on Vercel
3. **Approve design system** (`docs/design-system.md`)
4. **Approve migration strategy** (`docs/migration-strategy.md`)
5. **Replace placeholder content** — phone, address, testimonials, stats
6. **Legal review** — mark `[REVIEW REQUIRED]` content before publish

---

# Part F — Recommended homepage migration (spec §25)

| # | Spec section | Current component | Action |
|---|--------------|-------------------|--------|
| 1 | Header | `site-header` | REBUILD |
| 2 | Hero | `hero-slider` | REBUILD → single hero |
| 3 | Trust Indicators | `features-section` / `trust-bar` | REBUILD + merge |
| 4 | Introduction | `intro-section` | REBUILD copy + layout |
| 5 | Services | `services-preview` | REBUILD cards |
| 6 | Why Jarkabi | `why-section` | REBUILD |
| 7 | How Care Works | `process-section` (off-homepage) | MOVE to homepage |
| 8 | Nursing / Clinical | — | NEW section |
| 9 | Family Peace of Mind | — | NEW section |
| 10 | Founder / Leadership | `team-section` | REBUILD + CMS |
| 11 | Testimonials | `testimonials-section` | REBUILD + CMS |
| 12 | Locations | — | NEW (Ottawa focus) |
| 13 | Resources | `blog-preview-section` | KEEP |
| 14 | Careers CTA | — | NEW |
| 15 | Final Request Care CTA | `contact-cta-section` | REBUILD |
| 16 | Footer | `site-footer` | REBUILD |

**Remove from homepage:** `featured-services-section` (merge into Services), `stats-section` (until verified), `faq-section` (move to dedicated page or lower priority).

---

*Next document: [`migration-strategy.md`](./migration-strategy.md)*
