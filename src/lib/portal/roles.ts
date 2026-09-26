/** Care-platform and CMS roles unified per MASTER_PROMPT §54 / §723. */
export const portalRoles = [
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
  "client",
  "family_member",
  "content_editor",
  "translator",
  "seo_editor",
] as const;

export type PortalRole = (typeof portalRoles)[number];

export type PortalArea = "client" | "caregiver" | "clinical" | "ops";

export const rolePortalArea: Partial<Record<PortalRole, PortalArea>> = {
  client: "client",
  family_member: "client",
  caregiver: "caregiver",
  rn: "clinical",
  rpn: "clinical",
  clinical_director: "clinical",
  care_coordinator: "clinical",
  scheduler: "ops",
  operations_manager: "ops",
  billing: "ops",
  hr: "ops",
  administrator: "ops",
  super_admin: "ops",
};

export function portalAreaForRole(role: PortalRole): PortalArea | null {
  return rolePortalArea[role] ?? null;
}

export function isPortalRole(value: string): value is PortalRole {
  return (portalRoles as readonly string[]).includes(value);
}
