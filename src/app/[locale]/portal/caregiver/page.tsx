import { DashboardCards } from "@/components/portal/dashboard-cards";
import { PortalShell } from "@/components/portal/portal-shell";
import { demoVisits } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function CaregiverPortalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "caregiver");
  const t = await getTranslations({ locale, namespace: "portal" });

  const today = demoVisits[0];

  return (
    <PortalShell locale={locale} session={session} title={t("caregiverDashboard")}>
      <DashboardCards
        cards={[
          { label: t("todayVisits"), value: "1" },
          { label: t("openTimesheets"), value: "1", hint: t("submitByWeekEnd") },
          { label: t("assignedClients"), value: String(session.assignedClientIds?.length ?? 1) },
          { label: t("training"), value: "—", hint: t("credentialsUpToDate") },
        ]}
      />

      {today ? (
        <section className="mt-10 border border-line bg-white p-6">
          <h2 className="font-display text-xl text-ink">{t("nextVisit")}</h2>
          <p className="mt-3 text-body">
            {today.date} · {today.time} · {today.service}
          </p>
        </section>
      ) : null}
    </PortalShell>
  );
}
