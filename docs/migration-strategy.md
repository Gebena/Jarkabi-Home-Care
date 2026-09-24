# Migration Strategy — Jarkabi Home Care

**Status:** Phase 2 planning document  
**Prerequisite:** [`template-audit.md`](./template-audit.md)  
**Production app:** `/jarkabi-home-care/` only  
**Templates:** `/templates/seniar/`, `/templates/caregiver/` — read-only, gitignored

---

## 1. Strategic intent

Jarkabi Home Care is **not** a template reskin. The migration path:

```
SENIAR (engineering scaffold)
        +
CARE GIVER (visual inspiration — reinterpreted)
        +
JARKABI BRAND SYSTEM (new)
        ↓
Original premium Canadian home-care platform
```

### Non-negotiables

- No wholesale HTML paste from Care Giver
- No permanent Bootstrap + Tailwind coexistence
- No fake testimonials, stats, awards, or certifications
- All editable content eventually CMS/database-driven
- Ottawa launch first; national architecture already scaffolded

---

## 2. What we keep vs rebuild

### Keep (investment preserved)

| Asset | Rationale |
|-------|-----------|
| Next.js 16 App Router + `[locale]` routing | Production-deployed, i18n-ready |
| Payload CMS 3 collections & admin | 17 collections, roles, localization |
| National location model (provinces → cities) | Spec §43–45 |
| Form APIs + email notifications | Care request, referral, job application |
| next-intl + 7 locale codes + Arabic RTL | Spec §46–48 |
| PWA (Serwist) + mobile bottom bar | Spec §66 |
| Vercel deployment pipeline | Spec §85–86 |
| `src/lib/cms.ts` data layer | Graceful CMS fallbacks |

### Rebuild (escape template identity)

| Asset | Rationale |
|-------|-----------|
| `globals.css` (~2K lines) | Seniar visual DNA — migrate to Tailwind + tokens |
| All `sections/*` components | New Jarkabi layout per spec §25 |
| Header / footer / navigation | Spec §23 — rename routes, new IA |
| Colour system | Purple/coral → navy/teal/champagne |
| Typography | Bricolage/Allison → serif display + sans UI |
| Homepage hero | Slider → editorial single hero §24 |
| Hardcoded team/testimonials/FAQs | Wire to Payload collections |
| Forms UI | Add react-hook-form + Zod §74 |
| Admin visual system | shadcn/ui for admin §53 |

### Reference only (Care Giver)

- Warm photography tone
- Family reassurance section rhythm
- Service card proportions
- Trust strip placement
- Contact CTA hierarchy

---

## 3. Phased implementation plan

Maps to user spec §91. Each phase ends with a **working deploy** — no big-bang rewrites.

### Phase 1 — Template audit ✅

**Deliverables:**
- `docs/template-audit.md`
- `docs/migration-strategy.md` (this file)
- `docs/design-system.md`

**Exit criteria:** Stakeholder approves design direction before Phase 4 coding.

---

### Phase 2 — Design system foundation

**Deliverables:**
- `docs/design-system.md` — tokens, typography, components
- `src/styles/tokens.css` — CSS custom properties (new file)
- `tailwind.config` equivalent via `@theme` in CSS
- Logo direction brief (no final logo file required yet)

**Tasks:**
1. Define colour tokens per spec §15
2. Select font pairing (e.g. **Fraunces** or **Cormorant Garamond** display + **Source Sans 3** or **DM Sans** body)
3. Map tokens to shadcn CSS variables (prepare for Phase 5)
4. Document public vs admin visual systems §22

**Exit criteria:** Tokens approved; CMS `BrandSettings.colors` defaults aligned.

---

### Phase 3 — Tailwind configuration

**Tasks:**
1. Expand `@theme inline` with Jarkabi tokens
2. Create utility patterns: `section-padding`, `container-narrow`, `text-balance`
3. Establish rule: **new code = Tailwind only**; legacy CSS frozen except bugfixes
4. Add `prettier-plugin-tailwindcss` (optional)

**Do not:** global Bootstrap→Tailwind replace, or delete `globals.css` wholesale.

**Exit criteria:** Token-powered Tailwind utilities render correctly in a test page.

---

### Phase 4 — shadcn/ui setup

**Tasks:**
1. `npx shadcn@latest init` with Jarkabi theme
2. Install priority components: Button, Sheet, Dialog, Accordion, Form, Input, Select, Tabs, Card, Table, Toast, Badge
3. Customize shadcn theme to navy/teal/champagne — **admin-first**
4. Public site uses shadcn primitives wrapped in branded components §80

**Exit criteria:** Admin can use shadcn Form; public Button matches design system.

---

### Phase 5 — Global layout rebuild

**Order:**
1. `Logo` component (text-based until final artwork)
2. `site-header.tsx` — sticky, transparent→solid scroll, spec §23 nav
3. `mobile-nav.tsx` — shadcn Sheet
4. `site-footer.tsx` — premium 4-column, Ottawa contact
5. `LanguageSelector` — persist locale, display native names §48
6. Remove `top-bar.tsx`, unused `hero-section.tsx`

**Nav IA change:**

| Old (Seniar) | New (Jarkabi) |
|--------------|---------------|
| Pages dropdown | Flatten: About, Services, How Care Works, Why Jarkabi |
| projects | Locations |
| blog | Resources |
| — | Careers (top-level) |
| — | Contact (top-level) |

**Exit criteria:** All pages render with new header/footer; no Seniar purple in chrome.

---

### Phase 6 — Homepage rebuild

Follow spec §25 section order (see template-audit Part F).

**Component creation order:**
1. `Hero` (single image, not slider)
2. `TrustBar`
3. `SectionHeading` (shared primitive)
4. `IntroSection` — "Care Built Around the Person"
5. `ServiceCard` + services grid
6. `WhyJarkabiSection`
7. `ProcessSteps` — 6 steps §32
8. `NursingHighlight` — clinical credibility
9. `FamilyPeaceSection` §33
10. `LeadershipSection` — CMS `team-members`
11. `TestimonialCard` — CMS `testimonials`
12. `LocationCard` — Ottawa active only
13. `ResourcesPreview`
14. `CareersCta`
15. `RequestCareCta`

**Parallel:** Strip Seniar CSS classes as each section migrates.

**Exit criteria:** Homepage passes "Final Test" §99 — does not look like Seniar or Care Giver.

---

### Phase 7 — Service system

**Tasks:**
1. Finalize `ServiceCard` component §29
2. Service hub page — category filters
3. Service detail template §30 (all sections)
4. Wire `service-availability` for Ontario/Ottawa
5. Related services, location-aware CTAs
6. Local SEO URLs: `/ontario/ottawa/[service-slug]/` §70

**Exit criteria:** 3+ services fully populated in CMS with detail pages.

---

### Phase 8 — Core marketing pages

| Page | Priority | Notes |
|------|----------|-------|
| About | P0 | Spec §35 |
| How Care Works | P0 | Full process page |
| Why Jarkabi | P0 | Rename from why-choose-us |
| Caregivers | P1 | Spec §37 |
| Nursing | P1 | Spec §38 — regulated titles [REVIEW REQUIRED] |
| Dementia Care | P2 | Spec §39 |
| Post-Hospital | P2 | Spec §40 |
| Respite | P2 | Spec §41 |
| Palliative | P2 | Spec §42 |
| Locations | P0 | Ottawa ACTIVE only |
| Resources/Blog | P1 | Already wired |
| Careers | P1 | Already wired |
| Contact | P0 | Separate from Request Care |
| Referrals | P1 | Already wired |

**Exit criteria:** P0 pages live with correct metadata and CTAs.

---

### Phase 9 — Supabase connection

**Tasks:**
1. Provision dedicated Supabase project (Canada Central) — **not Ketet's**
2. Set `DATABASE_URI` on Vercel
3. Run Payload migrations against Postgres
4. Verify `npm run verify:supabase`
5. Plan migration from Payload-only to Supabase-native tables §50 (future phases)

**Architecture decision:**

| Layer | Phase 9 | Future (Phase 12+) |
|-------|---------|-------------------|
| Content CMS | Payload on Supabase Postgres | Payload **or** hybrid |
| Auth | Payload Users | Supabase Auth for portals §93 |
| Storage | Vercel Blob / local | Supabase Storage |
| Public forms | Payload collections | + RLS policies |

**Exit criteria:** Production uses persistent Postgres; no SQLite on Vercel.

---

### Phase 10 — Admin dashboard enhancement

**Tasks:**
1. Custom admin dashboard shell at `/admin` (Payload default → branded)
2. shadcn sidebar navigation §53
3. Wire dormant collections to frontend
4. Page builder: complete `BlockRenderer` for all 7 block types
5. Global settings editor — phone, hours, logo §55

**Exit criteria:** Content editor can update homepage team + testimonials without code.

---

### Phase 11 — Forms hardening

**Tasks:**
1. Install `react-hook-form` + `@hookform/resolvers`
2. Zod schemas for all public forms §74
3. Server-side validation in API routes
4. Request Care form §56 — remove fake postal code
5. Contact form (separate from care request) §57
6. Referral form §58
7. Job application + secure resume upload §60
8. Durable rate limiting (Vercel KV or Upstash)

**Exit criteria:** All forms pass WCAG + validation tests.

---

### Phase 12 — Multilingual database layer

**Tasks:**
1. `languages` + `translations` tables (Payload or Supabase)
2. Migrate UI strings from JSON → database gradually
3. Complete ti/byn/tig/ar/am translations
4. RTL layout audit for Arabic §47
5. hreflang for all 7 locales
6. Fix `<html lang>` and `dir` per locale

**Exit criteria:** Language switch works across all pages; AR layout correct on mobile.

---

### Phase 13 — SEO & structured data

**Tasks:**
1. `app/sitemap.ts` — dynamic from CMS
2. `app/robots.ts`
3. JSON-LD: Organization, LocalBusiness (Ottawa), Service, FAQPage, Article, JobPosting §71
4. Breadcrumbs component
5. OG images per page
6. Canonical URLs + hreflang

**Exit criteria:** Google Search Console ready for jarkabi.ca.

---

### Phase 14 — Accessibility & performance

**Tasks:**
1. WCAG 2.2 AA audit §67
2. Skip link, focus traps, form labels
3. `prefers-reduced-motion` everywhere
4. Image optimization — replace Unsplash with licensed assets
5. Font subsetting
6. Core Web Vitals pass on mobile

---

### Phase 15 — Testing & QA

**Tasks:**
1. Form integration tests
2. Navigation e2e tests
3. Admin permission tests
4. QA checklist §89 across breakpoints

---

### Phase 16 — Production launch (Ottawa)

**Checklist:**
- [ ] Real phone + Ottawa address in Brand Settings
- [ ] DNS: jarkabi.ca → Vercel
- [ ] Supabase production DB
- [ ] Admin password changed
- [ ] Legal pages reviewed [REVIEW REQUIRED]
- [ ] No placeholder testimonials/stats
- [ ] Only ACTIVE locations visible

---

## 4. Incremental CSS migration pattern

For each component (spec §20):

```
1. Read current component + globals.css rules
2. List Seniar-specific classes
3. Rebuild markup with Tailwind + design tokens
4. Verify responsive + a11y
5. Delete orphaned CSS from globals.css
6. Ship behind same route (no feature flag needed)
```

**Target:** `globals.css` under 400 lines (resets + tokens + RTL) by Phase 8 end.

---

## 5. CMS wiring priority

| Priority | Collection | Frontend target |
|----------|------------|-----------------|
| P0 | team-members | Homepage leadership |
| P0 | testimonials | Homepage + service pages |
| P0 | faqs | FAQ page + service detail |
| P1 | pages + blocks | Flexible landing pages |
| P1 | service-availability | Service + location gating |
| P2 | pricing-rates | Consultation-only display |
| P2 | navigation_items | DB-driven nav (future) |

---

## 6. Risk register

| Risk | Impact | Mitigation |
|------|--------|------------|
| Site looks like Seniar after rebuild | Brand failure | Design review gate after Phase 6 |
| Dual CSS systems | Maintenance debt | Freeze legacy CSS; Tailwind-only for new code |
| Supabase not provisioned | Data loss on Vercel | Block production launch on Phase 9 |
| Partial translations | Poor UX for community languages | Label incomplete locales; prioritize EN/FR launch |
| Placeholder testimonials indexed | Trust/legal risk | Remove until real content approved |
| Care Giver Bootstrap bleed | Bundle bloat | Never import Care Giver CSS |
| Over-scoping portals §93 | Delayed launch | Architecture only until requested |

---

## 7. Git & deployment workflow

```
Local /templates/ (gitignored)
        ↓ reference only
jarkabi-home-care/ → commit → Gebena/Ketet main
        ↓
GitHub Actions → Vercel (jarkabi-home-care project)
        ↓
Supabase Postgres (Canada Central)
```

**Commit convention:** `docs:`, `feat:`, `refactor:`, `chore:` per spec §83.

**Standalone repo sync:** Requires `JARKABI_SYNC_TOKEN` on Ketet (see `PROGRESS.md`).

---

## 8. Immediate next actions (after approval)

1. User adds `/templates/seniar/` and `/templates/caregiver/` locally (gitignored) for asset extraction
2. User provisions Supabase + adds `DATABASE_URI`
3. Agent executes **Phase 3–4** (Tailwind tokens + shadcn init)
4. Agent executes **Phase 5–6** (layout + homepage rebuild)

**No major public UI coding until this document and `design-system.md` are approved.**

---

*Related: [`design-system.md`](./design-system.md) · [`architecture.md`](./architecture.md)*
