import {
  type PortalArea,
  type PortalRole,
  portalAreaForRole,
  rolePortalArea,
} from "@/lib/portal/roles";

export type Resource =
  | "client_profile"
  | "care_plan"
  | "visit"
  | "visit_note"
  | "timesheet"
  | "message"
  | "document"
  | "invoice"
  | "care_request"
  | "referral"
  | "job_application"
  | "audit_log"
  | "staff_record";

export type Action = "read" | "write" | "delete";

type PermissionContext = {
  role: PortalRole;
  userId: string;
  assignedClientIds?: string[];
  clientId?: string;
};

const staffRoles: PortalRole[] = [
  "super_admin",
  "administrator",
  "operations_manager",
  "clinical_director",
  "care_coordinator",
  "scheduler",
  "billing",
  "hr",
  "rn",
  "rpn",
  "caregiver",
];

const opsRoles: PortalRole[] = [
  "super_admin",
  "administrator",
  "operations_manager",
  "scheduler",
  "billing",
  "hr",
  "care_coordinator",
];

const clinicalRoles: PortalRole[] = [
  "super_admin",
  "administrator",
  "clinical_director",
  "care_coordinator",
  "rn",
  "rpn",
];

function isAssignedToClient(ctx: PermissionContext, clientId?: string): boolean {
  if (!clientId) return false;
  return ctx.assignedClientIds?.includes(clientId) ?? false;
}

function isOwnClientRecord(ctx: PermissionContext, clientId?: string): boolean {
  return ctx.role === "client" && ctx.clientId === clientId;
}

function isFamilyOfClient(ctx: PermissionContext, clientId?: string): boolean {
  return ctx.role === "family_member" && isAssignedToClient(ctx, clientId);
}

/** Pure permission engine — mirrored by Supabase RLS policies in `supabase/migrations/`. */
export function canAccess(
  ctx: PermissionContext,
  resource: Resource,
  action: Action,
  targetClientId?: string,
): boolean {
  const { role } = ctx;

  if (role === "super_admin") return true;

  switch (resource) {
    case "care_request":
    case "referral":
      return opsRoles.includes(role) && action !== "delete";
    case "job_application":
      return (role === "hr" || role === "administrator") && action !== "delete";
    case "audit_log":
      return role === "administrator" && action === "read";
    case "staff_record":
      return opsRoles.includes(role) && action === "read";
    case "invoice":
      if (action === "write") return opsRoles.includes(role);
      return (
        isOwnClientRecord(ctx, targetClientId) ||
        isFamilyOfClient(ctx, targetClientId) ||
        opsRoles.includes(role)
      );
    case "document":
      if (action === "write") {
        return clinicalRoles.includes(role) || opsRoles.includes(role);
      }
      return (
        isOwnClientRecord(ctx, targetClientId) ||
        isFamilyOfClient(ctx, targetClientId) ||
        isAssignedToClient(ctx, targetClientId) ||
        clinicalRoles.includes(role) ||
        opsRoles.includes(role)
      );
    case "message":
      if (action === "write") {
        return (
          isOwnClientRecord(ctx, targetClientId) ||
          isFamilyOfClient(ctx, targetClientId) ||
          isAssignedToClient(ctx, targetClientId) ||
          staffRoles.includes(role)
        );
      }
      return canAccess(ctx, "message", "write", targetClientId);
    case "timesheet":
      if (role === "caregiver") {
        return action === "read" || action === "write";
      }
      return opsRoles.includes(role);
    case "visit_note":
      if (role === "caregiver") {
        return isAssignedToClient(ctx, targetClientId) && action !== "delete";
      }
      return clinicalRoles.includes(role) || opsRoles.includes(role);
    case "visit":
      if (role === "caregiver") {
        return isAssignedToClient(ctx, targetClientId) && action !== "delete";
      }
      if (role === "client" || role === "family_member") {
        return (
          (isOwnClientRecord(ctx, targetClientId) || isFamilyOfClient(ctx, targetClientId)) &&
          action === "read"
        );
      }
      return clinicalRoles.includes(role) || opsRoles.includes(role);
    case "care_plan":
      if (role === "client" || role === "family_member") {
        return (
          (isOwnClientRecord(ctx, targetClientId) || isFamilyOfClient(ctx, targetClientId)) &&
          action === "read"
        );
      }
      if (role === "caregiver") {
        return isAssignedToClient(ctx, targetClientId) && action === "read";
      }
      return clinicalRoles.includes(role) || opsRoles.includes(role);
    case "client_profile":
      if (action === "write") return opsRoles.includes(role) || clinicalRoles.includes(role);
      return (
        isOwnClientRecord(ctx, targetClientId) ||
        isFamilyOfClient(ctx, targetClientId) ||
        isAssignedToClient(ctx, targetClientId) ||
        opsRoles.includes(role) ||
        clinicalRoles.includes(role)
      );
    default:
      return false;
  }
}

export function canAccessPortalArea(role: PortalRole, area: PortalArea): boolean {
  const mapped = portalAreaForRole(role);
  if (!mapped) return false;
  if (mapped === area) return true;
  if (role === "super_admin" || role === "administrator" || role === "operations_manager") {
    return true;
  }
  if (area === "ops" && opsRoles.includes(role)) return true;
  if (area === "clinical" && clinicalRoles.includes(role)) return true;
  return false;
}

export function listAccessibleAreas(role: PortalRole): PortalArea[] {
  const areas = new Set<PortalArea>();
  const primary = rolePortalArea[role];
  if (primary) areas.add(primary);
  if (canAccessPortalArea(role, "client")) areas.add("client");
  if (canAccessPortalArea(role, "caregiver")) areas.add("caregiver");
  if (canAccessPortalArea(role, "clinical")) areas.add("clinical");
  if (canAccessPortalArea(role, "ops")) areas.add("ops");
  return [...areas];
}
