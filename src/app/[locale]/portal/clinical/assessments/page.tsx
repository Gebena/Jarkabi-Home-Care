import { PortalShell } from "@/components/portal/portal-shell";
import { requirePortalArea } from "@/lib/portal/guard";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function ClinicalAssessmentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const session = await requirePortalArea(locale, "clinical");
  const t = await getTranslations({ locale, namespace: "portal" });

  return (
    <PortalShell locale={locale} session={session} title={t("assessments")}>
      <div className="border border-line bg-white p-6">
        <p className="text-body">{t("assessmentsPlaceholder")}</p>
      </div>
    </PortalShell>
  );
}
