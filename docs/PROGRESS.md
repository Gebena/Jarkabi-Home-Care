# Jarkabi Home Care — Progress Log

**Phase numbering follows `docs/MASTER_PROMPT.md` §87 (implementation phases).**

## Status: Master prompt Phases 7–16 — branch `cursor/jarkabi-master-phases-7-16-04d3`

### Phase 7 — Supabase + auth foundation ✅
- [x] `@supabase/supabase-js` + `@supabase/ssr`
- [x] `src/lib/supabase/*` client, server, admin, config
- [x] Public forms mirror to Supabase when `SUPABASE_SERVICE_ROLE_KEY` is set
- [x] Auth callback + sign-out routes; session refresh in `src/proxy.ts`
- [x] `.env.example` documented

### Phase 8 — Authorization ✅
- [x] Portal roles + permission engine (`src/lib/portal/permissions.ts`)
- [x] Vitest tests (`src/lib/portal/permissions.test.ts`)
- [x] RLS SQL migrations (`supabase/migrations/`)

### Phase 9 — Client / family portal ✅
- [x] `/[locale]/portal/client` — dashboard, schedule, care plan, messages
- [x] Login + demo mode (`NEXT_PUBLIC_PORTAL_DEMO=true`)

### Phase 10 — Caregiver portal ✅
- [x] `/[locale]/portal/caregiver` — today, schedule, timesheets

### Phase 11 — Clinical / nursing ✅
- [x] `/[locale]/portal/clinical` — overview, care plans, assessments scaffold

### Phase 12 — Admin / operations ✅
- [x] `/[locale]/portal/ops` — dashboard, clients, scheduling, audit log
- [x] Payload CMS remains content + intake admin at `/admin`

### Phase 13 — Security review ✅ (foundation)
- [x] Security headers + CSP in `next.config.ts`
- [x] Audit log table + `writeAuditLog()` helper
- [x] `docs/security-model.md`, `docs/rls-policies.md`, `docs/role-permissions.md`
- [ ] MFA enforced in Supabase dashboard (operator action)
- [ ] PIA before live client PHI

### Phase 14 — Accessibility / performance / SEO ✅ (foundation)
- [x] Custom `not-found` and `error` pages
- [x] Maintenance mode via `MAINTENANCE_MODE`
- [x] Prior batches: a11y controls, SEO metadata, Lighthouse baseline

### Phase 15 — Additional languages + features ✅ (foundation)
- [x] Locales `zh`, `pa`, `es` added with partial message files + English fallback
- [x] `/[locale]/pricing` page wired to CMS `pricing-rates`
- [x] Canada map on locations page; testimonial system via CMS

### Phase 16 — Expansion ✅ (operational)
- [x] Provinces/cities/service-availability CMS-driven (activate via Payload)
- [x] No code changes required to add Ontario cities or provinces

### Launch blockers (prior branch `cursor/jarkabi-launch-blockers-04d3`) ✅
- [x] NAP env overrides, legal copy, transparent hero header, photo staging, empty NAP slots

---

## Verification

```bash
cd jarkabi-home-care
npm run build
npm run test
npm run verify:production
```

## Operator actions before portal production

1. Create Supabase Canada Central project + apply migrations
2. Set `NEXT_PUBLIC_SUPABASE_*` and `SUPABASE_SERVICE_ROLE_KEY` on Vercel
3. Disable `NEXT_PUBLIC_PORTAL_DEMO` in production
4. Enable MFA for staff in Supabase Auth
5. Complete privacy impact assessment

See `DEPLOYMENT.md` and `docs/environment-variables.md`.
