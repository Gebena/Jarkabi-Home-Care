# Architecture — Jarkabi Home Care

**Last updated:** 2026-09-24

## System overview

```
┌─────────────────────────────────────────────────────────────┐
│                        Vercel Edge/CDN                        │
├─────────────────────────────────────────────────────────────┤
│  Next.js 16 App Router (jarkabi-home-care/)                 │
│  ├── Public site  /[locale]/*                               │
│  ├── Admin UI     /admin (Payload CMS 3)                    │
│  ├── API routes   /api/*                                    │
│  └── PWA          Serwist service worker                    │
├─────────────────────────────────────────────────────────────┤
│  Data layer                                                 │
│  ├── Payload CMS → PostgreSQL (Supabase, Canada Central)    │
│  ├── Local dev   → SQLite (payload.db)                      │
│  └── Media        → Vercel Blob (prod) / local (dev)        │
├─────────────────────────────────────────────────────────────┤
│  External                                                   │
│  ├── SMTP (care inquiry emails)                             │
│  ├── jarkabi.ca DNS → Vercel                                │
│  └── Future: Supabase Auth, Storage, client portals         │
└─────────────────────────────────────────────────────────────┘
```

## Repository layout

```
Gebena/Ketet/                    # Monorepo (git)
├── jarkabi-home-care/           # ← PRODUCTION APP (only deployable code)
│   ├── src/
│   │   ├── app/[locale]/        # Public marketing pages
│   │   ├── app/(payload)/       # CMS admin + REST API
│   │   ├── app/api/             # Form submission endpoints
│   │   ├── components/          # React components
│   │   ├── payload/             # Collection & global definitions
│   │   ├── i18n/                # next-intl config
│   │   └── lib/                 # CMS helpers, email, utils
│   └── docs/                    # Architecture & planning
├── scripts/                     # Monorepo utilities (GitHub sync)
└── templates/                   # GITIGNORED — licensed Envato zips
    ├── seniar/
    └── caregiver/
```

## Routing

| Layer | Pattern | Example |
|-------|---------|---------|
| Locale | `/[locale]/...` | `/en/services/personal-care` |
| Future local SEO | `/[locale]/[province]/[city]/[service]` | `/en/ontario/ottawa/dementia-care` |
| Admin | `/admin` | Payload CMS |
| API | `/api/care-request` | Public forms |

**Proxy:** `src/proxy.ts` handles next-intl locale detection (Next.js 16).

## Data flow

### Public page (server component)

```
Request → proxy (locale) → page.tsx → getServices()/getBrand() → Payload → render
```

### Form submission

```
Client form → POST /api/care-request → rate limit → Payload create → SMTP email
```

## CMS collections

See [`supabase-schema.md`](./supabase-schema.md) for full table mapping.

**Globals:** `brand-settings` — business name, phones, colours, social links.

## Internationalization

- **UI strings:** `messages/{locale}.json` (migrating to DB — see [`multilingual.md`](./multilingual.md))
- **CMS content:** Payload field localization (7 locales)
- **RTL:** Arabic (`ar`) — `dir="rtl"` in locale layout

## Security model

| Layer | Mechanism |
|-------|-----------|
| Admin auth | Payload Users + role field |
| Public forms | Rate limiting + server validation (planned: Zod) |
| Secrets | Environment variables only |
| Future RLS | Supabase policies for portal data §93 |

## Deployment

| Environment | Trigger | URL |
|-------------|---------|-----|
| Production | Push to `main` (jarkabi-home-care/**) | jarkabi.ca, jarkabi-home-care.vercel.app |
| Preview | PR branches | *.vercel.app |

Details: [`DEPLOYMENT.md`](../DEPLOYMENT.md)

## Future architecture (not built)

Reserved for expansion §93:

- Client / Family / Caregiver portals
- Supabase Auth (separate from Payload admin users)
- Care schedules, billing, secure messaging
- CRM / SMS integrations

Database schema should not block these — use `profiles` + `user_roles` pattern when implemented.

## Related documents

- [`template-audit.md`](./template-audit.md)
- [`migration-strategy.md`](./migration-strategy.md)
- [`design-system.md`](./design-system.md)
- [`MASTER_PROMPT.md`](../../docs/MASTER_PROMPT.md) (repo root, gitignored — local copy)
