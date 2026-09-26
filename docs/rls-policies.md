# Row Level Security Policies

Policies are defined in `supabase/migrations/002_rls_policies.sql` and tested logically in `src/lib/portal/permissions.test.ts`.

## Summary

| Table | Anonymous | Client/Family | Assigned caregiver | Clinical | Ops/Admin |
|-------|-----------|---------------|-------------------|----------|-----------|
| profiles | — | self | self + staff read | staff | staff |
| clients | — | own record | assigned | clinical+ops | ops |
| care_plans | — | own client read | assigned read | read/write | read/write |
| visits | — | own client read | assigned | read/write | read/write |
| timesheets | — | — | own | — | ops read |
| care_requests | insert via service role | — | — | — | coordinator+ read |
| contact_messages | insert via service role | — | — | — | coordinator+ read |
| referrals | insert via service role | — | — | — | coordinator+ read |
| job_applications | insert via service role | — | — | — | HR read |
| audit_logs | — | — | — | — | admin read |

## Helpers

- `current_profile_role()` — role from `profiles`
- `is_staff_role()` — staff detection
- `is_assigned_to_client(uuid)` — active assignment check

## Service role usage

Next.js API routes use `SUPABASE_SERVICE_ROLE_KEY` only on the server for:

- Form submission inserts (anonymous users cannot read submissions)
- Audit log writes
- Admin batch operations

Never expose the service role key to the browser.
