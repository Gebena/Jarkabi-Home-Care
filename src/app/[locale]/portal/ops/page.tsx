import { DashboardCards } from "@/components/portal/dashboard-cards";
import { PortalShell } from "@/components/portal/portal-shell";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Link from "next/link";

type Props = { params: Promise<{ locale: string }> };

export default async function OpsPortalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "ops");
  const t = await getTranslations({ locale, namespace: "portal" });
  const base = `/${locale}/portal/ops`;

  return (
    <PortalShell locale={locale} session={session} title={t("opsDashboard")}>
      <DashboardCards
        cards={[
          { label: t("newCareRequests"), value: "—", hint: t("syncedFromCms") },
          { label: t("openReferrals"), value: "—" },
          { label: t("visitsToday"), value: String(2) },
          { label: t("staffOnShift"), value: String(4) },
        ]}
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        <li className="border border-line bg-white p-5">
          <Link href={`${base}/clients`} className="font-display text-lg text-ink hover:text-coral">
            {t("clients")}
          </Link>
        </li>
        <li className="border border-line bg-white p-5">
          <Link href={`${base}/scheduling`} className="font-display text-lg text-ink hover:text-coral">
            {t("scheduling")}
          </Link>
        </li>
        <li className="border border-line bg-white p-5">
          <Link href={`${base}/audit`} className="font-display text-lg text-ink hover:text-coral">
            {t("auditLog")}
          </Link>
        </li>
      </ul>
    </PortalShell>
  );
}
