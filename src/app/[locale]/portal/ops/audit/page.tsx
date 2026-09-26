import { PortalShell } from "@/components/portal/portal-shell";
import { demoAuditLogs } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function OpsAuditPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "ops");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("auditLog")}>
      <div className="overflow-x-auto border border-line bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-line bg-mist">
            <tr>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("action")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("actor")}</th>
              <th className="px-4 py-3 font-bold uppercase tracking-[0.08em] text-body">{t("timestamp")}</th>
            </tr>
          </thead>
          <tbody>
            {demoAuditLogs.map((row) => (
              <tr key={row.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-mono text-xs">{row.action}</td>
                <td className="px-4 py-3">{row.actor}</td>
                <td className="px-4 py-3">{row.at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PortalShell>
  );
}
