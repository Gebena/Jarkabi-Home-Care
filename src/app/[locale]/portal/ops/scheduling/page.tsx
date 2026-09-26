import { PortalShell } from "@/components/portal/portal-shell";
import { demoVisits } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function OpsSchedulingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "ops");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("scheduling")}>
      <ul className="space-y-3">
        {demoVisits.map((visit) => (
          <li key={visit.id} className="flex justify-between border border-line bg-white p-4 text-sm">
            <span>{visit.date} · {visit.service}</span>
            <span className="capitalize text-body">{visit.status}</span>
          </li>
        ))}
      </ul>
    </PortalShell>
  );
}
