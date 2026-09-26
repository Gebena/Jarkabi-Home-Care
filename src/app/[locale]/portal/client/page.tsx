import { DashboardCards } from "@/components/portal/dashboard-cards";
import { PortalShell } from "@/components/portal/portal-shell";
import { demoMessages, demoVisits } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export default async function ClientPortalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "client");
  const t = await getTranslations({ locale, namespace: "portal" });
  const base = `/${locale}/portal/client`;

  return (
    <PortalShell locale={locale} session={session} title={t("clientDashboard")}>
      <DashboardCards
        cards={[
          { label: t("upcomingVisits"), value: String(demoVisits.length), hint: t("nextSevenDays") },
          { label: t("unreadMessages"), value: String(demoMessages.length) },
          { label: t("carePlan"), value: "Active", hint: t("lastUpdatedRecently") },
          { label: t("invoices"), value: "—", hint: t("availableWhenBillingLive") },
        ]}
      />

      <section className="mt-10 border border-line bg-white p-6">
        <h2 className="font-display text-xl text-ink">{t("upcomingVisits")}</h2>
        <ul className="mt-4 space-y-3">
          {demoVisits.map((visit) => (
            <li key={visit.id} className="flex flex-wrap justify-between gap-2 border-b border-line pb-3 last:border-0">
              <span>
                <span className="block font-medium text-ink">{visit.date}</span>
                <span className="text-sm text-body">{visit.time} · {visit.service}</span>
              </span>
              <span className="text-sm capitalize text-body">{visit.status}</span>
            </li>
          ))}
        </ul>
        <Link href={`${base}/schedule`} className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.12em] text-coral">
          {t("viewSchedule")}
        </Link>
      </section>
    </PortalShell>
  );
}
