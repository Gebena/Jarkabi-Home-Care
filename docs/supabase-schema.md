# Database Schema — Jarkabi Home Care

**Current state:** Payload CMS 3 manages schema via TypeScript collection definitions.  
**Production target:** Supabase PostgreSQL (Canada Central) via `DATABASE_URI`.  
**Future:** Hybrid Payload CMS + Supabase-native tables for portals §93.

---

## Connection

| Environment | Adapter | Connection |
|-------------|---------|------------|
| Local dev | SQLite | `file:./payload.db` |
| Production | Postgres | `postgresql://...@aws-0-ca-central-1.pooler.supabase.com:6543/postgres` |

Provision: `npm run supabase:provision` (requires valid `SUPABASE_ACCESS_TOKEN`).

---

## Implemented collections (Payload → Postgres tables)

| Collection slug | Table (auto) | Purpose |
|-----------------|--------------|---------|
| `users` | `users` | Admin authentication + roles |
| `media` | `media` | Images, resumes |
| `provinces` | `provinces` | Canadian provinces |
| `cities` | `cities` | Cities within provinces |
| `services` | `services` | Service catalogue |
| `service-availability` | `service_availability` | Province/city/service matrix |
| `pages` | `pages` | Flexible CMS pages + blocks |
| `care-requests` | `care_requests` | Request care form submissions |
| `referrals` | `referrals` | Professional referrals |
| `careers` | `careers` | Job listings |
| `job-applications` | `job_applications` | Career applications |
| `blog-posts` | `blog_posts` | Resources / blog |
| `team-members` | `team_members` | Leadership & staff |
| `legal-pages` | `legal_pages` | Privacy, terms, accessibility |
| `pricing-rates` | `pricing_rates` | Optional pricing architecture |
| `faqs` | `faqs` | FAQ entries |
| `testimonials` | `testimonials` | Client testimonials |

### Globals

| Global slug | Purpose |
|-------------|---------|
| `brand-settings` | Business info, colours, social links |

---

## Planned tables (not yet implemented) §50

These will be added when migrating to Supabase-native layer or extending Payload:

| Table | Purpose | Phase |
|-------|---------|-------|
| `profiles` | Extended user profiles | Portal phase |
| `roles` | Role definitions | Phase 10+ |
| `user_roles` | User ↔ role mapping | Phase 10+ |
| `page_sections` | Reorderable homepage sections | Phase 10 |
| `service_categories` | Service grouping | Phase 7 |
| `regions` | Province sub-regions | Phase 10 |
| `service_locations` | Service availability junction | Phase 7 |
| `article_categories` | Blog categories | Phase 8 |
| `languages` | Supported languages registry | Phase 12 |
| `translations` | Key-value UI translations | Phase 12 |
| `navigation_items` | DB-driven nav | Future |
| `seo_metadata` | Per-page SEO overrides | Phase 13 |
| `audit_logs` | Admin action audit trail | Phase 10+ |
| `site_settings` | Key-value settings (may merge with brand-settings) | Phase 10 |

---

## Location status enum §44

```
ACTIVE | COMING_SOON | PAUSED | NOT_SERVED
```

Applied to: `provinces.status`, `cities.status`

Only `ACTIVE` locations appear in public navigation unless configured otherwise.

---

## Row Level Security (future) §51

When Supabase client SDK is added for public/portal access:

| Policy | Access |
|--------|--------|
| Public read | `services`, `blog_posts`, `faqs`, `testimonials` where `published = true` |
| Admin write | Authenticated Payload/Supabase admin roles |
| Form submissions | Insert-only for anonymous; read for `care_coordinator`+ |
| Job applications | Insert public; read `recruitment`+ |
| Private health data | **Never** public — portal phase only |

Currently: Payload access control in collection configs handles this.

---

## Migrations

Payload 3 auto-manages schema on deploy. For manual SQL:

1. Export from Payload after first Postgres connection
2. Store in `supabase/migrations/` when Supabase CLI is adopted

---

*See also: [`roles-permissions.md`](./roles-permissions.md)*
