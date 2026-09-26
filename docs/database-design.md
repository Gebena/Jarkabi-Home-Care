# Database Design — Jarkabi Home Care

## Architecture

| Layer | Technology | Purpose |
|-------|------------|---------|
| CMS | Payload 3 + Postgres/SQLite | Public content, forms, media, admin |
| Portal | Supabase Auth + native tables | Clients, visits, care plans, audit |
| Form mirror | Supabase service role | Duplicate public submissions with RLS |

Payload owns marketing content. Supabase owns authenticated portal data and optional form mirrors.

## Entity relationships

```
auth.users ──1:1── profiles ──n:m── client_assignments ──n:1── clients
clients ──1:n── care_plans ──1:n── care_plan_items
clients ──1:n── visits ──1:n── visit_notes
profiles ──1:n── timesheets
clients ──1:n── message_threads ──1:n── messages
clients ──1:n── invoices
clients ──1:n── documents (private storage paths)
```

Public form mirrors (`care_requests`, `contact_messages`, `referrals`, `job_applications`) store JSON payloads inserted by the Next.js API via service role.

## Migrations

SQL lives in `supabase/migrations/`:

1. `001_portal_schema.sql` — tables and indexes
2. `002_rls_policies.sql` — assignment-based RLS

Apply with Supabase CLI after creating the Canada Central project.

## Environment separation

- **Development:** SQLite + optional Supabase dev project
- **Staging:** Supabase staging + Vercel preview
- **Production:** Supabase production (same schema, separate keys)

Never share Ketet or unrelated Supabase projects.
