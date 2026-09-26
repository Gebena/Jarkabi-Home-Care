# Role Permissions — Jarkabi Home Care

See also: [`roles-permissions.md`](./roles-permissions.md) for Payload CMS admin roles.

## Portal roles

Defined in `src/lib/portal/roles.ts`:

| Role | Portal area | Notes |
|------|-------------|-------|
| client | Client / family | Own schedule, care plan, messages |
| family_member | Client / family | Assigned client access |
| caregiver | Caregiver | Assigned visits, timesheets |
| rn, rpn | Clinical | Care plans, assessments |
| clinical_director | Clinical + ops reads | Clinical sign-off |
| care_coordinator | Clinical + ops | Intake, assignments |
| scheduler, operations_manager | Operations | Scheduling, staffing |
| billing | Operations | Invoices |
| hr | Operations | Job applications |
| administrator, super_admin | All areas | Full access |

## Permission engine

`canAccess(context, resource, action, clientId?)` in `src/lib/portal/permissions.ts`.

Resources: `client_profile`, `care_plan`, `visit`, `visit_note`, `timesheet`, `message`, `document`, `invoice`, `care_request`, `referral`, `job_application`, `audit_log`, `staff_record`.

## Tests

```bash
npm run test -- src/lib/portal/permissions.test.ts
```

Automated tests prove caregivers cannot read unassigned clients and clients cannot read other clients' invoices.
