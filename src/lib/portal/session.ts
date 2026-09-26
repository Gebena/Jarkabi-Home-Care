import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isPortalDemoEnabled, isSupabaseConfigured } from "@/lib/supabase/config";
import { isPortalRole, type PortalRole, portalAreaForRole } from "@/lib/portal/roles";

export type PortalSession = {
  userId: string;
  email: string;
  role: PortalRole;
  fullName?: string;
  clientId?: string;
  assignedClientIds?: string[];
  demo?: boolean;
};

const DEMO_COOKIE = "jarkabi_portal_demo_role";

export async function getPortalSession(): Promise<PortalSession | null> {
  if (isSupabaseConfigured()) {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return readDemoSession();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return readDemoSession();

    const { data: profile } = await supabase
      .from("profiles")
      .select("role, full_name, client_id")
      .eq("id", user.id)
      .maybeSingle();

    const role = profile?.role && isPortalRole(profile.role) ? profile.role : "client";

    let assignedClientIds: string[] | undefined;
    if (role === "caregiver" || role === "rn" || role === "rpn") {
      const { data: assignments } = await supabase
        .from("client_assignments")
        .select("client_id")
        .eq("profile_id", user.id)
        .eq("active", true);
      assignedClientIds = assignments?.map((row) => row.client_id as string) ?? [];
    }

    return {
      userId: user.id,
      email: user.email ?? "",
      role,
      fullName: profile?.full_name ?? undefined,
      clientId: profile?.client_id ?? undefined,
      assignedClientIds,
    };
  }

  return readDemoSession();
}

async function readDemoSession(): Promise<PortalSession | null> {
  if (!isPortalDemoEnabled()) return null;

  const cookieStore = await cookies();
  const demoRole = cookieStore.get(DEMO_COOKIE)?.value;
  if (!demoRole || !isPortalRole(demoRole)) return null;

  return {
    userId: `demo-${demoRole}`,
    email: `${demoRole}@demo.jarkabi.ca`,
    role: demoRole,
    fullName: `Demo ${demoRole.replace(/_/g, " ")}`,
    clientId: demoRole === "client" ? "demo-client-1" : undefined,
    assignedClientIds: demoRole === "caregiver" ? ["demo-client-1"] : undefined,
    demo: true,
  };
}

export function portalHomePath(locale: string, role: PortalRole): string {
  const area = portalAreaForRole(role) ?? "client";
  return `/${locale}/portal/${area}`;
}

export { DEMO_COOKIE };
