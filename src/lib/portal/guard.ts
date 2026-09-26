import { canAccessPortalArea } from "@/lib/portal/permissions";
import type { PortalArea } from "@/lib/portal/roles";
import { getPortalSession, portalHomePath } from "@/lib/portal/session";
import { redirect } from "next/navigation";

export async function requirePortalSession(locale: string) {
  const session = await getPortalSession();
  if (!session) {
    redirect(`/${locale}/portal/login`);
  }
  return session;
}

export async function requirePortalArea(locale: string, area: PortalArea) {
  const session = await requirePortalSession(locale);
  if (!canAccessPortalArea(session.role, area)) {
    redirect(portalHomePath(locale, session.role));
  }
  return session;
}
