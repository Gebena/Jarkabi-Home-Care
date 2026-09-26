import { DashboardCards } from "@/components/portal/dashboard-cards";
import { PortalShell } from "@/components/portal/portal-shell";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function ClinicalPortalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "clinical");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("clinicalDashboard")}>
      <DashboardCards
        cards={[
          { label: t("activeCarePlans"), value: "12" },
          { label: t("pendingAssessments"), value: "3" },
          { label: t("incidentsOpen"), value: "0" },
          { label: t("supervisionDue"), value: "2" },
        ]}
      />
      <p className="mt-8 text-sm text-body">{t("clinicalNote")}</p>
    </PortalShell>
  );
}
