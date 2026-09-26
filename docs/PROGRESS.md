# Jarkabi Home Care — Progress Log

## Status: Batches 1–7 reconciled to `main` (2026-09-26)

### Batch 6 — SEO polish (2026-09-26) ✅
- [x] Homepage `generateMetadata` with EN/FR meta description
- [x] Default OG + Twitter card image via `buildPageMetadata()`
- [x] Footer social links + intro/why CTAs — descriptive accessible link text
- [x] Lighthouse SEO `/en` — **100** (was 83)

### Step 3 — Verification (2026-09-26) ✅
- [x] `npm run build` — PASS (558 pages)
- [x] `npm run test` — PASS (9/9)
- [x] `npm run verify:images` — PASS (22/22)
- [x] `npm audit` — 8 vulnerabilities (documented; no force-fix)
- [x] Lighthouse baseline on `/en` homepage — Perf 90, A11y 100, BP 100, SEO 83
- [x] Marker search — 14× `[REVIEW REQUIRED]` in EN/FR messages; NAP brackets CMS-only (hidden in UI)
- [x] Merge `improvements` → `cursor/jarkabi-home-care-04d3` (PR #242, 2026-09-26)
- [x] Merge `improvements` → `cursor/jarkabi-home-care-04d3` (PR #242)
- [x] Batch 7 → `cursor/jarkabi-home-care-04d3` (PR #243)
- [x] Reconcile `cursor/jarkabi-home-care-04d3` → `main` (replace `jarkabi-home-care/` tree; removes legacy `(site)/[locale]` routing)

### Step 2 — Improvement batches (2026-09-26) ✅
- [x] **Batch 1:** Hide bracket NAP in public UI; safe hero/trust/intro copy (no unverified licensed/insured claims); manifest colours + request-care shortcut; hero CTA → `/request-care`
- [x] **Batch 2:** Trust bar after hero; funding teaser; 5-step care process; referral/careers band (EN + FR)
- [x] **Batch 3:** Request Care form — RHF+Zod, 3-step UI, CASL consents, urgent flag, 911 on all embeds
- [x] **Batch 4:** Public legal routes — dynamic `/legal/[slug]` for all 9 types (EN + FR copy)
- [x] **Batch 5:** Partial locale strategy — banner, grouped switcher, sitemap/hreflang EN+FR only, noindex on partial locales
- [x] **Batch 6:** Homepage SEO — meta description, OG/Twitter images, descriptive link text (Lighthouse SEO 100)
- [x] **Batch 7:** Referral + job application forms — RHF+Zod, EN/FR i18n, aria-invalid

## Status: Master prompt Phase 3–4 alignment (in progress) — Phases 8–19 in codebase

### Master prompt implementation (2026-09-26) ✅ partial
- [x] Jarkabi brand palette (navy #1C2B45, gold #B08D57, sage #4E6A58, ivory #F6F1E8) in design tokens
- [x] Cormorant Garamond + Jost typography (master prompt §10)
- [x] Embrace logo SVG + stacked/horizontal wordmark component
- [x] Main nav: Services · Locations · How Care Works · About · Resources · Careers · Contact
- [x] Utility bar: Refer a Client, FAQ, Funding
- [x] New pages: `/faq`, `/funding`, `/feedback`, `/request-care` (EN + FR copy)
- [x] Text-size control (accessibility), FAQ structured data, homepage title format
- [x] jarkabi.com → jarkabi.ca 301 redirect in `next.config.ts`
- [ ] Full service catalog (~25 services) in CMS
- [ ] Location selector in header
- [ ] Transparent hero header on scroll
- [ ] Script fonts (Ge'ez, Arabic, Gurmukhi, Chinese) per locale
- [ ] Portals, RLS, Supabase production (Phases 9–13)

## Status: Phases 8–19 implemented in codebase — launch blockers remain

### Production deployment ✅
- [x] `Gebena/Jarkabi-Home-Care` standalone repo synced
- [x] Vercel live at `jarkabi.ca`
- [x] Cloud Agent environment configured (`.cursor/environment.json`)

### Phase 8 — Service system ✅
- [x] `ServiceCard` component with categories
- [x] Services hub, detail template, related services
- [x] `service-availability` wired to city pages
- [x] Slug redirects (`nursing` → `registered-nursing`)

### Phase 9 — Specialty & service pages ✅ (content review pending)
- [x] Dedicated `/nursing` and `/dementia-care` marketing pages
- [x] CMS blocks seeded for core services
- [ ] Full CMS copy for all 8 services
- [ ] Post-hospital, respite, palliative dedicated pages (use `/services/[slug]`)

### Phase 10 — Locations & local SEO ✅ (partial)
- [x] Flat local SEO URLs: `/{locale}/{province}/{city}/{service}`
- [x] Location-filtered services on city pages
- [ ] City-specific unique marketing copy
- [ ] City-level `service-availability` records in CMS

### Phase 11 — Supabase ⏳ (user action required)
- [x] Postgres adapter + verify/provision scripts
- [ ] Provision dedicated Canada Central Supabase project
- [ ] Set `DATABASE_URI` on Vercel production

### Phase 12 — Admin / CMS wiring ✅ (partial)
- [x] `getTeamMembers()`, `getTestimonials()`, `getFaqs()` in `src/lib/cms.ts`
- [x] Homepage team/testimonials read from CMS when published
- [x] `ContactInquiries` collection
- [ ] Custom branded admin shell (Payload default in use)

### Phase 13 — Forms (RHF + Zod) ✅
- [x] `react-hook-form` + Zod schemas (`src/lib/validations/forms.ts`)
- [x] Server-side validation on all form APIs
- [x] Separate Contact form (`/api/contact`) vs Request Care
- [x] Request Care form: RHF + Zod, 3-step UI, CASL consents, urgent flag, 911 on embeds
- [x] Homepage form uses contact API (no fake postal code)
- [ ] Durable rate limiting (Upstash/Vercel KV)

### Phase 14 — Careers & referrals ✅ (partial)
- [x] Careers list/detail + job application
- [x] Referrals page + API with Zod validation
- [x] `JobPosting` JSON-LD on career detail pages
- [ ] Published careers in CMS (placeholders on list page)

### Phase 15 — Multilingual ✅ (partial)
- [x] 7 locales configured; RTL for Arabic
- [x] hreflang for all locales via `buildLanguageAlternates()`
- [x] `LocaleDocument` sets `lang`/`dir` on `<html>`
- [x] Partial locale launch strategy (banner, SEO limits); English fallback via `i18n/request.ts`
- [ ] Complete ti/byn/tig/ar/am message files (professional translation)

### Phase 16 — SEO ✅ (partial)
- [x] `app/sitemap.ts` — dynamic from CMS + local SEO URLs
- [x] `app/robots.ts`
- [x] JSON-LD: Organization, LocalBusiness, Service, JobPosting, Breadcrumbs
- [x] Breadcrumbs component on service pages
- [ ] OG images per page type
- [ ] Google Search Console setup

### Phase 17 — Accessibility ✅ (partial)
- [x] Skip link, reduced motion, form `aria-invalid` on contact form
- [x] Per-locale `lang`/`dir`
- [ ] Focus traps on all dialogs
- [ ] Formal WCAG 2.2 AA audit

### Phase 18 — Performance ⏳
- [x] `next/image` on service cards
- [x] Font subsetting via `next/font`
- [ ] `globals.css` cleanup (still ~2.7k lines)
- [ ] Replace Unsplash with licensed production photography

### Phase 19 — Testing ✅ (foundation)
- [x] Vitest + form schema tests (`npm run test`)
- [ ] E2E navigation tests
- [ ] CI workflow for tests

### Phase 20 — Launch checklist ⏳
- [x] Vercel deploy pipeline working
- [x] DNS on `jarkabi.ca`
- [ ] Real phone + Ottawa address in Brand Settings
- [ ] Supabase production database
- [ ] Admin password rotated after deploy
- [ ] Legal pages reviewed
- [ ] Merge Ketet → sync standalone → promote Vercel

---

## Next user actions

1. Add real NAP (phone, address, hours) in Payload Brand Settings
2. Provision Supabase + set `DATABASE_URI` on Vercel
3. Review and publish service copy, careers, legal pages
4. Merge PRs to `main` and run sync workflow

See `DEPLOYMENT.md` for full deployment steps.
