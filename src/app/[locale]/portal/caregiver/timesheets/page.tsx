import { PortalShell } from "@/components/portal/portal-shell";
import { demoTimesheets } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function CaregiverTimesheetsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "caregiver");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("timesheets")}>
      <div className="overflow-x-auto border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-mist">
            <tr>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("date")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("client")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("hours")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("status")}</th>
            </tr>
          </thead>
          <tbody>
            {demoTimesheets.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">{row.date}</td>
                <td className="px-4 py-3">{row.client}</td>
                <td className="px-4 py-3">{row.hours}</td>
                <td className="px-4 py-3 capitalize">{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalShell>
  );
}
