# Jarkabi Home Care — Progress Log

## Status: Care Giver Home Page 01 visual fidelity — passes 1–7 shipped ✅

**Merged:** [PR #229](https://github.com/Gebena/Ketet/pull/229) → `main` (2026-09-25).  
**Production verified:** https://jarkabi.ca/en (sync to `Gebena/Jarkabi-Home-Care` succeeded).  
**Handoff:** `docs/caregiver-fidelity-summary.md`, `docs/jarkabi-caregiver-visual-qa.md`, `docs/caregiver-assets-used.md`.

**Optional follow-up:** Unpack `/templates/caregiver/` for pixel-level diff against demo HTML.

### Previous phases (8–19) — launch blockers remain

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
- [ ] Complete ti/byn/tig/ar/am message files

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
- [x] Replace Unsplash with licensed production photography (`caregiver-licensed/`; 22 legacy `photography/` files unreferenced)

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
- [x] Merge Ketet → sync standalone → promote Vercel (PR #229 merged; sync workflow green)

---

## Next user actions

1. Add real NAP (phone, address, hours) in Payload Brand Settings
2. Provision Supabase + set `DATABASE_URI` on Vercel
3. Review and publish service copy, careers, legal pages
4. Hard-refresh jarkabi.ca and spot-check routes in `docs/caregiver-fidelity-summary.md`

See `DEPLOYMENT.md` for full deployment steps.
