# Jarkabi Home Care — Improvement Audit

**Date:** 2026-09-26  
**Auditor:** Cloud Agent (Step 1 — read-only review)  
**References:** `docs/MASTER_PROMPT.md` (repo root, gitignored), `jarkabi-home-care/docs/PROGRESS.md`  
**Codebase branch reviewed:** `cursor/jarkabi-master-prompt-04d3`  
**Build:** `npm run build` — **PASS** (516 static pages, no compile errors)  
**Tests:** `npm run test` — **PASS** (4/4 Vitest form schema tests)  
**npm audit:** **8 vulnerabilities** (6 moderate, 2 high); `npm audit fix --force` may cause breaking changes  
**Images:** `npm run verify:images` — **PASS** (22/22 WebP files present)

---

## A. WORKING WELL — keep as is

### Build & architecture
- Next.js 16 App Router with `[locale]` routing, Payload CMS 3, Postgres/SQLite adapter, Vercel deploy to **jarkabi.ca**
- Production build completes cleanly; TypeScript passes; sitemap and robots.txt generated
- Monorepo isolation documented; Ketet root app not mixed with Jarkabi work
- Service system: hub, `[slug]` detail, local SEO URLs `/{province}/{city}/{service}`, 8 seeded services
- CMS collections cover provinces, cities, services, availability, pages, blog, careers, legal, FAQs, testimonials, team, forms data
- JSON-LD: Organization, LocalBusiness, Service, JobPosting, Breadcrumbs; FAQ page adds FAQPage schema
- `jarkabi.com` → `jarkabi.ca` 301 redirect (Vercel + `next.config.ts`)

### Branding (partial but intentional)
- Public name **Jarkabi Home Care** throughout UI; email **care@jarkabi.ca** in brand defaults and deploy config
- Embrace logo SVG + wordmark component; Jarkabi navy/gold/ivory tokens applied (Sept 2026 rebrand)
- Cormorant Garamond + Jost fonts loaded via `next/font`
- Homepage title template: `Jarkabi Home Care | Home Care & Nursing in Ottawa`
- No **Visiting Angels**, ThemeArc, or Lovegiver branding in public-facing copy

### Content integrity
- No lorem ipsum on public pages; testimonials/team use honest empty states, not fabricated reviews
- Statistics band uses **commitments** (not fake “500+ families served” counts)
- `docs/caregiver-to-jarkabi-map.md` documents Care Giver → React migration; demo deviations listed
- `docs/licensed-assets.md` records 22 photography assets with usage table; all files verified on disk
- AI-generated photography disclosed as **[REPLACE BEFORE LAUNCH]** in licensed-assets doc (not hotlinked stock)

### Pages that exist and function
- Core public routes: home, about, services (+ detail), how-care-works, why-jarkabi, why-choose-us, caregivers, locations (hub/province/city), resources (+ blog slug), careers (+ detail), contact, referrals, nursing, dementia-care, growing-across-canada, faq, funding, feedback, request-care, legal (privacy, terms, accessibility)

### Forms & APIs (foundation)
- Zod schemas for all four form types; server-side re-validation on API routes
- Contact form uses React Hook Form + accessible error states
- Care request: postal-code routing, area-served / waitlist messaging, dedicated `/request-care` with 911 notice
- Rate-limit helper exists (`src/lib/rate-limit.ts`)

### Multilingual (infrastructure)
- EN + FR message files ~760 lines; hreflang via `buildLanguageAlternates()`; `lang`/`dir` on document
- Arabic RTL layout class; locale switcher without flag icons
- 7 locales routed (en, fr, ti, byn, tig, ar, am)

### Accessibility (basics)
- Skip link, reduced-motion CSS, text-size control (A/A+/A++), form labels on contact form
- Photography has descriptive alt text in `site-images.ts`

### Security (basics)
- `.env.example` present; secrets not committed; placeholder detection in JSON-LD
- Admin and API disallowed in robots.txt

---

## B. NEEDS IMPROVEMENT — exists but weak, incomplete, buggy, or inconsistent

| # | Area | Issue | Priority |
|---|------|-------|----------|
| B1 | **Brand — NAP** | CMS defaults still `[PRIMARY PHONE]` / `[OTTAWA OFFICE ADDRESS]` — **UI now hides placeholders**; JSON-LD already omitted them. Real NAP still `[JARKABI FACT REQUIRED]` | **HIGH** (partial ✅ Batch 1) |
| B2 | **Brand — favicon/PWA** | ~~Manifest stale colours/shortcut~~ **fixed Batch 1**; no dedicated favicon audit | **MEDIUM** (partial ✅) |
| B3 | **Brand — logo** | Master prompt lists stacked/horizontal/reversed logo variants; only horizontal wordmark + one SVG implemented; `[LOGO DECISION PENDING]` unresolved | **LOW** |
| B4 | **Homepage structure** | ~~Trust bar position, funding teaser, referral/careers band, 5-step process~~ **fixed Batch 2**; philosophy/family peace blocks still inline in other sections | **MEDIUM** (partial ✅) |
| B5 | **Homepage hero copy** | ~~Care Giver headline + unverified licensed/insured claims~~ **fixed Batch 1** — Jarkabi tagline on slide 1; trust bar uses professional/family-centred copy | **HIGH** ✅ Batch 1 |
| B6 | **Navigation** | ~~About dropdown + location selector~~ **Batch 8**; header not transparent-over-hero on scroll | **MEDIUM** (partial ✅) |
| B7 | **Design system drift** | `docs/design-system.md` still documents old navy/teal palette and Fraunces/Source Sans; conflicts with live tokens and master prompt | **LOW** |
| B8 | **Care Giver comments** | Many source comments still say “Care Giver Home Page 01”; harmless but confusing for future editors | **LOW** |
| B9 | **Forms — Request Care** | ~~RHF+Zod, multi-step, CASL, urgent, 911 on embeds~~ **fixed Batch 3**; confirmation email/page copy still basic | **HIGH** (partial ✅) |
| B10 | **Forms — Referral & Job** | Plain HTML forms, hard-coded English labels/success text, no RHF, no i18n, no aria-invalid pattern | **MEDIUM** |
| B11 | **Forms — rate limiting** | In-memory rate limit only; not durable for production (noted in PROGRESS) | **MEDIUM** |
| B12 | **Legal pages** | ~~Missing public routes~~ **Batch 4** — all 9 legal types routed via `/legal/[slug]`; draft templates + `DraftNotice` remain until legal review | **HIGH** (partial ✅) |
| B13 | **Services catalog** | Only **8** services seeded vs ~25 in master prompt §27; several specialty pages share generic `[slug]` template only | **MEDIUM** |
| B14 | **Service copy** | PROGRESS notes full CMS copy not published; clinical summaries flagged `reviewRequired` in seed data | **MEDIUM** |
| B15 | **Locations** | City pages lack unique marketing copy; `service-availability` CMS records incomplete; no interactive Canada map (Phase 15) | **MEDIUM** |
| B16 | **Multilingual — FR** | French file exists (~758 lines) but not professionally reviewed; mixed quality vs EN | **MEDIUM** |
| B17 | **Multilingual — other locales** | ~~Public without strategy~~ **Batch 5** — partial banner, grouped switcher, sitemap/hreflang limited to EN/FR, `noindex` on partial locales; message files still ~158 lines (professional translation TODO) | **HIGH** (partial ✅) |
| B18 | **Multilingual — master prompt languages** | Master lists **Mandarin (zh), Punjabi (pa), Spanish (es)**; not in routing. Current **byn/tig** not in master’s Phase 15 list | **MEDIUM** |
| B19 | **Multilingual — script fonts** | No Noto Ethiopic/Arabic/Gurmukhi/SC fonts loaded per locale | **MEDIUM** |
| B20 | **SEO** | No per-page OG images; some pages use raw `{ title }` metadata without `buildPageMetadata` (e.g. how-care-works); GSC not configured | **MEDIUM** |
| B21 | **Performance** | `globals.css` ~450+ lines with legacy layers; Serwist PWA + Turbopack warning; no Lighthouse baseline recorded | **MEDIUM** |
| B22 | **Accessibility** | Search modal / mobile nav lack focus traps; no formal WCAG 2.2 AA audit; some tan/gold button contrast should be re-verified after rebrand | **MEDIUM** |
| B23 | **Security — headers** | No explicit security headers (CSP, HSTS, etc.) in `vercel.json` or middleware | **MEDIUM** |
| B24 | **Supabase / production DB** | Production still on SQLite or unset `DATABASE_URI`; Supabase Canada Central not provisioned (user action) | **HIGH** |
| B25 | **Documentation** | Master prompt §91 lists many docs; several missing or renamed (`caregiver-to-jarkabi-content-map.md`, `lovegiver-architecture-audit.md`, `caregiver-content-audit.md`, `jarkabi-architecture.md`, etc.) | **LOW** |
| B26 | **npm audit** | 8 vulnerabilities (esbuild/drizzle-kit chain, @serwist/next high via browserslist); no fix without breaking changes | **MEDIUM** |
| B27 | **Careers** | List page uses placeholders when CMS empty; job application form lacks resume upload (master §35) | **MEDIUM** |
| B28 | **Pricing module** | `PricingRates` collection exists; no public UI; acceptable per master default-off, but CTA consistency unchecked | **LOW** |
| B29 | **About section** | Leadership/Clinical Leadership are **sections on About**, not standalone pages as master §26 suggests | **LOW** |
| B30 | **Contact page** | Still hosts both contact + care request forms; duplicates `/request-care` purpose | **LOW** |

---

## C. MISSING — required by master prompt but not built yet

| # | Area | Requirement | Priority |
|---|------|-------------|----------|
| C1 | **Legal pages (public)** | ~~Routes + CMS slugs for all six missing types~~ **Batch 4**; professional legal review + CMS publish still required | **HIGH** (partial ✅) |
| C2 | **Supabase production** | Canada Central Postgres, auth foundation, form submissions in Supabase with **RLS** (master §39, §87 Phase 7–8) | **HIGH** |
| C3 | **Portals** | Client/family, caregiver, clinical, operations admin beyond Payload default (Phases 9–12) | **HIGH** (post-launch) |
| C4 | **Service catalog** | ~17+ additional service types activatable by province/city (homemaking, meal prep, overnight, 24-hour, live-in, etc.) | **MEDIUM** |
| C5 | **Homepage content blocks** | ~~Funding teaser + referral/careers band~~ **Batch 2**; philosophy/family peace as dedicated blocks still optional | **MEDIUM** (partial ✅) |
| C6 | **Header location selector** | Province/city selector tied to CMS active locations (§25, §31) | **MEDIUM** |
| C7 | **Request Care form (full spec)** | ~~Multi-step, urgent, CASL~~ **Batch 3**; confirmation email/page copy still TODO | **HIGH** (partial ✅) |
| C8 | **Interactive Canada map** | Accessible map + text list alternative (§31, Phase 15) | **LOW** |
| C9 | **Pricing public module** | Optional rates by province/city when admin activates (§30) | **LOW** |
| C10 | **Languages Phase 15** | Mandarin (zh-Hans), Punjabi (pa-Guru), Spanish (es-419) + full professional translations | **MEDIUM** |
| C11 | **Testimonial/review system** | Google reviews integration, video testimonials, consent tracking (§34) | **LOW** |
| C12 | **Careers search** | Filter by province, city, role, shift (§35) | **MEDIUM** |
| C13 | **Resource centre depth** | Full category set, print-friendly articles, “Reviewed by” clinical lines (§37) | **MEDIUM** |
| C14 | **Maintenance mode & 404** | Custom error pages, maintenance mode, redirect manager (§89) | **MEDIUM** |
| C15 | **Email/notifications** | SMTP configured; form notification emails to care@jarkabi.ca | **HIGH** |
| C16 | **Real photography** | Replace AI placeholders with consented Jarkabi/client photos (§11) | **HIGH** |
| C17 | **Content migration docs** | `caregiver-to-jarkabi-content-map.md` with COPY/ADAPT/REWRITE per block (Phase 2) | **MEDIUM** |
| C18 | **Lovegiver architecture audit** | `docs/lovegiver-architecture-audit.md` (Phase 1) | **LOW** |
| C19 | **E2E / CI** | Playwright navigation tests, CI workflow (PROGRESS Phase 19) | **LOW** |
| C20 | **OG images** | Per page type for social sharing | **LOW** |

---

## Area-by-area checklist (14 requested areas)

| # | Area | Status | Notes |
|---|------|--------|-------|
| 1 | Build health | ✅ Pass | `npm run build` 558 pages; 8 npm audit issues (esbuild/drizzle-kit chain — non-blocking) |
| 2 | Branding | ⚠️ Partial | NAP placeholders hidden in UI (Batch 1); manifest fixed; real phone/address still `[JARKABI FACT REQUIRED]` in CMS |
| 3 | Content | ⚠️ Partial | No lorem; unverified licensed/insured claims removed (Batch 1); 14× `[REVIEW REQUIRED]` in EN/FR messages (funding/faq/feedback) |
| 4 | Photos | ✅ Good | 22/22 WebPs verified; all AI placeholders per `licensed-assets.md` |
| 5 | Pages | ⚠️ Partial | All 9 legal routes live (Batch 4); leadership standalone pages still sections on About |
| 6 | Design quality | ⚠️ Partial | Homepage order aligned (Batch 2); Care Giver layout retained |
| 7 | Navigation & links | ⚠️ Partial | About submenu + province selector (Batch 8); transparent hero header still TODO |
| 8 | Forms | ⚠️ Partial | Request Care: RHF+Zod+CASL+urgent (Batch 3); referral/job forms still plain HTML / hard-coded EN |
| 9 | Accessibility | ✅ Good (baseline) | Lighthouse **100** a11y on `/en` homepage; focus traps on modals still TODO |
| 10 | Performance | ✅ Good (baseline) | Lighthouse perf **90**; LCP 3.7s, CLS 0, TBT 60ms (local prod, `/en`) |
| 11 | SEO | ✅ Good (baseline) | Lighthouse SEO **100** (Batch 6); homepage meta + default OG; hreflang EN+FR only (Batch 5) |
| 12 | Multilingual | ⚠️ Partial | EN/FR full; partial locale strategy (Batch 5); professional ti/byn/tig/ar/am translation TODO |
| 13 | Security | ⚠️ Partial | .env.example OK; no security headers; Supabase/RLS not production-ready |
| 14 | Code quality | ⚠️ Partial | Care-request on RHF; referral/job duplication remains |

---

## Step 3 — verification run (2026-09-26, branch `improvements`)

| Check | Result |
|-------|--------|
| `npm run build` | ✅ PASS — 558 static pages |
| `npm run test` | ✅ PASS — 9/9 |
| `npm run verify:images` | ✅ PASS — 22/22 WebP |
| `npm audit` | ⚠️ 8 vulnerabilities (6 moderate, 2 high); `npm audit fix --force` may break drizzle-kit |
| Lighthouse `/en` (local prod, Step 3) | Perf **90** · A11y **100** · Best practices **100** · SEO **83** |
| Lighthouse `/en` SEO re-run (Batch 6) | SEO **100** — meta description, OG image, descriptive link text |
| Lighthouse vitals | FCP 1.1s · LCP 3.7s · TBT 60ms · CLS 0 |

**Lighthouse SEO gaps (pre–Batch 6):** missing meta description; non-descriptive links (social icons, READ MORE / LEARN MORE CTAs). **Fixed in Batch 6.**

**Marker search (final counts, public-facing sources):**

| Marker | Count | Location / notes |
|--------|-------|------------------|
| `[REVIEW REQUIRED]` | **14** | 7× `messages/en.json`, 7× `messages/fr.json` (funding, FAQ, feedback) |
| `[JARKABI FACT REQUIRED]` | **1** in UI copy | `messages/fr.json` feedback timeline; NAP placeholders in CMS/brand defaults only (hidden from UI) |
| `[REPLACE BEFORE LAUNCH]` | **22 assets** | `docs/licensed-assets.md` — all photography AI placeholders |
| `[HUMAN TRANSLATION REQUIRED]` | **4** | Partial locale meta stubs (ti, byn, tig, am) |
| `[DEMO CONTENT]` | **0** | — |
| lorem / Lovegiver / ThemeArc / Visiting Angels | **0** in `src/` | Docs/comments only |
| `[PRIMARY PHONE]` / address brackets | **CMS only** | Hidden from public UI via `isBrandPlaceholder()` |

---

## Recommended fix order (for Step 2 — after your approval)

1. **HIGH — Launch blockers:** B1 NAP, B5 hero badges, B9/B12 forms+legal, B17 locale strategy, C1/C7/C15/C16/C24
2. **MEDIUM — Trust & quality:** B4 homepage order, B6 nav, B13 services, B16–B19 i18n/SEO/a11y, C4–C6
3. **LOW — Polish:** B3 logo variants, B7 docs sync, B8 comments, C8–C11

---

## Assumptions

- Audit performed on Cloud Agent VM; production `jarkabi.ca` may differ slightly from this branch until merged.
- `docs/MASTER_PROMPT.md` at **repo root** is canonical (gitignored); `jarkabi-home-care/docs/MASTER_PROMPT.md` is a pointer.
- Lighthouse and manual mobile QA deferred to Step 2/3 per your workflow.
- No code, content, or pages were modified during this audit.

---

---

## Step 2 progress (branch `improvements`)

| Batch | Date | Items addressed | Build |
|-------|------|-----------------|-------|
| 1 | 2026-09-26 | B1 (partial — hide bracket NAP in UI; CMS defaults unchanged), B2 (manifest colours + request-care shortcut), B5 (hero slide 1 + trust bar + intro/why copy — removed unverified licensed/insured claims) | ✅ PASS (516 pages) |
| 2 | 2026-09-26 | B4 (trust bar after hero; funding teaser; 5-step care process; referral/careers band), C5 (partial — funding + referral/careers blocks) | ✅ PASS (516 pages) |
| 3 | 2026-09-26 | B9/C7 (RHF+Zod care request form; 3-step UI; CASL consent checkboxes; urgent flag; 911 notice on all embeds) | ✅ PASS (516 pages) · tests 6/6 |
| 4 | 2026-09-26 | B12/C1 (public legal routes: cookies, consent, care-disclaimer, employment/referral/feedback policies; dynamic `/legal/[slug]`; footer + sitemap) | ✅ PASS (558 pages) |
| 5 | 2026-09-26 | B17 (partial locale strategy: banner, grouped switcher, EN fallback documented, hreflang/sitemap EN+FR only, noindex on partial locales) | ✅ PASS (558 pages) · tests 9/9 |
| 6 | 2026-09-26 | B20 (homepage `generateMetadata`; default OG + Twitter cards; footer social sr-only labels; intro/why CTA accessible text) | ✅ PASS (558 pages) · tests 9/9 · SEO **100** |
| 7 | 2026-09-26 | B10 (referral + job application forms — RHF+Zod, EN/FR labels, aria-invalid, CMS referrer types) | ✅ PASS (558 pages) · tests 9/9 |
| 8 | 2026-09-26 | B6/C6 (About dropdown, header province selector, mobile nav parity, leadership anchor) | ✅ PASS (558 pages) · tests 9/9 |

**Batch 1 notes:**
- Added `isBrandPlaceholder()` / `isDisplayablePhone()` in `src/lib/brand.ts`; footer, header, contact band, and contact page omit `[PRIMARY PHONE]` / `[OTTAWA OFFICE ADDRESS]` until CMS values are set.
- Trust bar now uses `professionalCare`, `familyCentred`, `local`, `responsiveSupport` instead of licensed/insured strings.
- Hero primary CTA links to `/request-care`.
- **B1 still open:** Replace placeholders in CMS Brand Settings with real NAP when `[JARKABI FACT REQUIRED]`.

**Batch 2 notes:**
- `TrustBar` moved directly below hero; removed duplicate at page bottom.
- New `FundingTeaser` and `ReferralCareersBand` components on homepage.
- `CareProcess` expanded from 3 to 5 steps (EN + FR copy).

**Batch 3 notes:**
- `CareRequestForm` rebuilt with React Hook Form + Zod; 3-step progress UI.
- Required CASL contact consent + optional marketing consent; `urgentCare` flag stored in CMS.
- 911 emergency notice rendered inside the form component (covers `/request-care` and `/contact` embed).

**Batch 4 notes:**
- Consolidated legal pages under `/[locale]/legal/[slug]` with shared `LegalPageContent` component.
- Added routes: cookies, consent, care-disclaimer, employment-privacy, referral-privacy, feedback-policy (plus existing privacy, terms, accessibility).
- Extended Payload `LegalPages` slug options; seeded all nine types; footer + sitemap updated.

**Batch 5 notes:**
- `locale-strategy.ts` defines full (en/fr) vs partial (ti/byn/tig/ar/am) locales.
- `PartialLocaleBanner` on community locales with links to full EN/FR same path.
- Locale switcher grouped: “Full site” vs “Community languages (partial translation)”.
- Sitemap and hreflang use EN+FR only; partial locale pages set `noindex, follow`.

**Batch 6 notes:**
- Added `homePage.metaTitle` / `metaDescription` (EN + FR) and `generateMetadata` on homepage.
- Extended `buildPageMetadata()` with default OG image (`jarkabi-hero-care-conversation.webp`) and Twitter card metadata.
- Footer social links use i18n labels + `sr-only` text; intro and why-jarkabi CTAs use accessible link text (visual uppercase labels preserved via `aria-hidden`).

**Batch 7 notes:**
- `ReferralForm` and `JobApplicationForm` rebuilt with React Hook Form + Zod (matching contact/care-request patterns).
- New `referralForm` and `jobApplicationForm` i18n namespaces (EN + FR); referrer type values stay English for CMS consistency.

**Step 2 batches 1–7 complete.**

---

## Launch blockers remaining (post Step 2–3)

| Priority | Item | Owner |
|----------|------|-------|
| **HIGH** | Real NAP in Payload Brand Settings | Jarkabi |
| **HIGH** | Supabase Canada Central + `DATABASE_URI` on Vercel | Jarkabi |
| **HIGH** | Replace AI photography with consented photos | Jarkabi |
| **HIGH** | Legal/professional review of funding, FAQ, feedback copy (`[REVIEW REQUIRED]`) | Legal/clinical |
| ~~**MEDIUM**~~ | ~~Homepage meta description + OG images~~ | ✅ Batch 6 |
| **MEDIUM** | Professional FR review; complete ti/byn/tig/ar/am translations | Jarkabi |
| ~~**MEDIUM**~~ | ~~Referral/job forms — RHF + i18n~~ | ✅ Batch 7 |
| **LOW** | npm audit chain (drizzle-kit/esbuild); security headers | Dev |

**Workflow status:** Step 1 audit ✅ · Step 2 fixes (batches 1–6) ✅ · Step 3 verification ✅ · Batch 6 SEO polish ✅ — ready for your review before merge to `main`.
