import { PortalShell } from "@/components/portal/portal-shell";
import { demoVisits } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function CaregiverSchedulePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "caregiver");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("schedule")}>
      <ul className="space-y-3">
        {demoVisits.map((visit) => (
          <li key={visit.id} className="border border-line bg-white p-5">
            <p className="font-medium text-ink">{visit.date} · {visit.time}</p>
            <p className="mt-1 text-sm text-body">{visit.service}</p>
          </li>
        ))}
      </ul>
    </PortalShell>
  );
}
