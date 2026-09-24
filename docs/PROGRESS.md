# Jarkabi Home Care — Progress Log

## Status: Phase 1–3 planning complete — UI rebuild pending approval

### Phase 0 — Strategic replan (2026-09-24) ✅
- [x] `docs/template-audit.md` — Seniar (in-repo clone) + Care Giver (reference) audit
- [x] `docs/migration-strategy.md` — 16-phase implementation plan
- [x] `docs/design-system.md` — Jarkabi navy/teal/champagne design tokens
- [x] Supporting docs: architecture, licensed-assets, supabase-schema, roles-permissions, multilingual, seo
- [x] Homepage switched to **Seniar Home Page 01** layout (Jarkabi copy, EN/FR)
- [ ] **Awaiting approval** before Phase 4+ (Tailwind tokens, shadcn, full brand redesign)
- [x] Seniar Envato Elements license recorded (`AVKJY8MX67`) — cert in `/templates/licenses/` (gitignored)
- [x] Care Giver Envato Elements license recorded (`KVZ473J956`) — cert in `/templates/licenses/` (gitignored)
- [ ] Unzip Seniar + Care Giver into `/templates/seniar/` and `/templates/caregiver/` — **zips not received yet**

> **Finding:** Current production UI still reads as Seniar index-3 (purple/coral). Rebuild required per new brand spec.

---

## Previous build: Platform foundation — live on Vercel

### Phase 1 — Foundation ✅
- Isolated app in `jarkabi-home-care/` (Gebena/Ketet monorepo)
- Next.js 16, Tailwind, Payload CMS 3
- National architecture: provinces, cities, services, availability
- EN/FR marketing site, care request form, admin dashboard

### Phase 2 — Operations ✅
- [x] Careers with job detail pages + resume upload (`/api/job-application`)
- [x] Blog/resources publishing (`blog-posts` collection, `/resources/[slug]`)
- [x] Email notifications via SMTP (`src/lib/email.ts`)
- [x] Rate limiting on public form APIs
- [x] Referrals collection + professional referral form
- [x] Legal pages collection + pricing rates architecture
- [x] Job applications collection

### Phase 3 — National & multilingual ✅
- [x] 7 languages: EN, FR, TI, BYN, TIG, AR (RTL), AM
- [x] Arabic RTL layout (`dir="rtl"`)
- [x] Interactive SVG Canada map + province grid
- [x] City-level location pages
- [x] CMS data layer for brand, services, provinces, blog, careers, legal
- [x] Page block renderer for CMS content

### Phase 4 — Mobile ✅
- [x] PWA manifest (`/manifest.webmanifest`)
- [x] Service worker (Serwist) — offline shell, installable app
- [x] PWA icons (`public/icons/`)
- [x] Mobile bottom bar: Call + Request Care
- [x] Install prompt (Add to Home Screen)
- [x] Safe-area / viewport meta for notched devices
- [x] Capacitor config + `mobile/README.md` for App Store / Play Store wrapper

### Deployment ✅ (Vercel + GitHub)
- [x] Merged to **Gebena/Ketet** `main` (PR #215 — Seniar index-3 clone)
- [x] Vercel project **jarkabi-home-care** → production deploy (GitHub Actions + Vercel API)
- [x] Git source: `Gebena/Ketet` / `jarkabi-home-care` root directory
- [x] Domains on Vercel: `jarkabi.ca`, `www.jarkabi.ca`
- [x] Env vars: `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, SMTP (Gmail)
- [x] Health check: `/api/health`
- [ ] Standalone repo `Gebena/Jarkabi-Home-Care` — awaiting successful sync after `JARKABI_SYNC_TOKEN` update on Ketet

### Supabase (blocked — token expired)
- [ ] Create project `jarkabi-home-care` in **Canada (Central)** at [supabase.com](https://supabase.com)
- [ ] Run: `SUPABASE_ACCESS_TOKEN=sbp_... npm run supabase:provision`
- [ ] Set `DATABASE_URI` in Vercel **jarkabi-home-care** project → Redeploy
- [ ] Verify: `DATABASE_URI=... npm run verify:supabase`

> Current `SUPABASE_ACCESS_TOKEN` in the environment returns **401 Unauthorized**. Generate a new token at [supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens) — use a **dedicated** Jarkabi project, not Ketet's database.

### DNS (jarkabi.ca)
- [x] Domain added to Vercel (verified)
- [ ] Point registrar DNS to Vercel: `A` `@` → `76.76.21.21`, `CNAME` `www` → `cname.vercel-dns.com`
- [ ] Or add `jarkabi.ca` to Cloudflare and run `npm run dns:cloudflare`

## Live URLs

| URL | Status |
|-----|--------|
| https://jarkabi-home-care.vercel.app/en | ✅ Production |
| https://jarkabi.ca/en | ⏳ DNS pending at registrar |
| https://jarkabi-home-care.vercel.app/admin | ✅ CMS admin |

## Production checklist

- [ ] Set `DATABASE_URI` (Supabase Canada Central)
- [ ] Point `jarkabi.ca` DNS at Vercel
- [ ] Replace `[PRIMARY PHONE]`, `[OTTAWA OFFICE ADDRESS]` in admin → Brand Settings
- [ ] Change default admin password
- [ ] Legal pages: professional review [REVIEW REQUIRED]
- [ ] Human translation review for TI, BYN, TIG, AM [REVIEW REQUIRED]

## Run locally

```bash
cd jarkabi-home-care
npm install
cp .env.example .env
npm run dev
```

## Admin credentials (first seed)

- Email: `admin@jarkabi.ca`
- Password: `ChangeMeNow123!` — **change immediately**
