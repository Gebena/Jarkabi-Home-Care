import { getPortalSession, portalHomePath } from "@/lib/portal/session";
import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function PortalIndexPage({ params }: Props) {
  const { locale } = await params;
  const session = await getPortalSession();

  if (!session) {
    redirect(`/${locale}/portal/login`);
  }

  redirect(portalHomePath(locale, session.role));
}
