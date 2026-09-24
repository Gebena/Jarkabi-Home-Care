# Jarkabi Home Care

Premium national Canadian home-care platform — launching in Ottawa, Ontario, built to scale across provinces without rebuilding.

**Website:** https://jarkabi.ca  
**Email:** care@jarkabi.ca  
**Languages:** English, French, Tigrinya, Blin, Tigre, Arabic (RTL), Amharic

This repository is **fully isolated** from other projects. Requirements live in `docs/MASTER_PROMPT.md`.

## Stack

- Next.js 16 (App Router) + TypeScript
- Payload CMS 3 (headless admin, localization, roles)
- **Supabase Postgres** (production — Canada Central) / SQLite (local dev)
- next-intl (EN/FR; architecture ready for 7+ languages)

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

- Public site: http://localhost:3000/en
- Admin dashboard: http://localhost:3000/admin

Seed admin user (first run):

```bash
npm run seed
```

Default credentials are printed once — change immediately.

## Mobile app

The site is a **Progressive Web App** — installable on iOS/Android from the browser (Add to Home Screen).

For App Store / Google Play distribution, see [`mobile/README.md`](./mobile/README.md) (Capacitor wrapper).

Mobile features:
- Sticky bottom bar (Call + Request Care)
- Offline-capable shell via service worker
- 7-language support with Arabic RTL

## Production database (Supabase)

Use a **dedicated Supabase project** in **Canada (Central)** — the same hosting pattern as [ketet.org](https://ketet.org). You do **not** need AWS RDS; Supabase provides managed Postgres (and optional Storage later).

1. [supabase.com](https://supabase.com) → **New project** → Region: **Canada (Central)**
2. Copy **Database → Connection string → URI** (Transaction pooler, port **6543** for Vercel serverless)
3. Set in Vercel: `DATABASE_URI=postgresql://postgres.[ref]:[password]@aws-0-ca-central-1.pooler.supabase.com:6543/postgres`

```bash
npm run verify:supabase   # after setting DATABASE_URI
```

Full deploy steps: [`DEPLOYMENT.md`](./DEPLOYMENT.md)

## Project structure

```
src/
  app/[locale]/     Public marketing site (7 locales)
  app/(payload)/    CMS admin + REST API
  payload/          Collection definitions
  components/       UI sections and layout
docs/
  MASTER_PROMPT.md       Full requirements (100 sections)
  template-audit.md      Seniar + Care Giver audit (Phase 1)
  migration-strategy.md  Phased implementation plan (Phase 2)
  design-system.md       Jarkabi brand tokens & components (Phase 3)
  architecture.md        System overview
  PROGRESS.md            Build status log
```

## Development phases

**Current phase: 1–3 (planning complete — awaiting approval before UI rebuild)**

1. Template audit → `docs/template-audit.md`
2. Migration strategy → `docs/migration-strategy.md`
3. Design system → `docs/design-system.md`
4. Tailwind tokens + shadcn/ui setup
5. Header/footer rebuild → homepage → services → Supabase → admin

Licensed template packages belong in `/templates/` (gitignored) — never in this repo.

## Rules

- Never invent credentials, testimonials, or registrations.
- Secrets only in `.env` — see `.env.example`.
- Legal/clinical/translation content marked `[REVIEW REQUIRED]`.
