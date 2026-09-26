# Security Model — Jarkabi Home Care

## Principles

1. **Least privilege** — roles, assignments and relationships gate every sensitive read/write
2. **Defense in depth** — UI checks + server validation + database RLS
3. **Canada residency** — production data in Supabase Canada Central
4. **No secrets in client code** — service role keys server-only

## Authentication

- **Public site:** anonymous; forms rate-limited
- **CMS admin:** Payload auth at `/admin`; rotate default password before launch
- **Portals:** Supabase Auth with session cookies refreshed in `src/proxy.ts`
- **MFA:** enable in Supabase for staff roles before real client data (Phase 13)

## Authorization

Unified roles in `src/lib/portal/roles.ts`. Permission engine in `src/lib/portal/permissions.ts` with Vitest coverage.

Assignment rule: caregivers/RNs see only clients in `client_assignments` where `active = true`.

## Transport and headers

Production responses include HSTS, CSP, `X-Frame-Options`, `X-Content-Type-Options`, and `Referrer-Policy` via `next.config.ts`.

## Audit

`audit_logs` table + `writeAuditLog()` helper. Append-only; readable by administrators only.

## Storage

Sensitive documents use private Supabase buckets with signed URLs (configure when uploading client files).

## Pre-production checklist

- [ ] Rotate Payload admin password
- [ ] Set Supabase Auth MFA for staff
- [ ] Privacy impact assessment before live client data
- [ ] Run `npm audit` and document accepted risks
- [ ] Disable `NEXT_PUBLIC_PORTAL_DEMO` in production
