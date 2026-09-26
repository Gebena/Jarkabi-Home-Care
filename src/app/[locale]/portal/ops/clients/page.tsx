import { PortalShell } from "@/components/portal/portal-shell";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function OpsClientsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "ops");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("clients")}>
      <p className="text-body">{t("opsClientsLead")}</p>
    </PortalShell>
  );
}
