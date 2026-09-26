import { PortalShell } from "@/components/portal/portal-shell";
import { demoVisits } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function ClientSchedulePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "client");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("schedule")}>
      <div className="overflow-x-auto border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-mist">
            <tr>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("date")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("time")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("service")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("caregiver")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {demoVisits.map((visit) => (
              <tr key={visit.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">{visit.date}</td>
                <td className="px-4 py-3">{visit.time}</td>
                <td className="px-4 py-3">{visit.service}</td>
                <td className="px-4 py-3">{visit.caregiver}</td>
                <td className="px-4 py-3 capitalize">{visit.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalShell>
  );
}
