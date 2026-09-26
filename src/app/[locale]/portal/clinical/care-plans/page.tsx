import { PortalShell } from "@/components/portal/portal-shell";
import { demoCarePlan } from "@/lib/portal/demo-data";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function ClinicalCarePlansPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "clinical");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("carePlans")}>
      <ul className="space-y-4">
        {demoCarePlan.map((item) => (
          <li key={item.id} className="border border-line bg-white p-6">
            <h2 className="font-display text-lg text-ink">{item.goal}</h2>
            <p className="mt-2 text-sm text-body">{t("clinicalReviewRequired")}</p>
          </li>
        ))}
      </ul>
    </PortalShell>
  );
}
