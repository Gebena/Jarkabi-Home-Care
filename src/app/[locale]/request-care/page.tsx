import { CareRequestForm } from "@/components/forms/care-request-form";
import { PageHero } from "@/components/layout/page-hero";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "requestCarePage" });
  return buildPageMetadata({
    locale,
    path: "/request-care",
    title: t("metaTitle"),
    description: t("lead"),
  });
}

export default async function RequestCarePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "requestCarePage" });

  return (
    <>
      <PageHero locale={locale} eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} crumbLabel={t("eyebrow")} />
      <PageSection>
        <div className="mx-auto max-w-2xl">
          <SectionTitle title={t("formTitle")} />
          <p className="mt-3 text-base leading-relaxed text-body">{t("formLead")}</p>
          <div className="mt-8">
            <CareRequestForm locale={locale} />
          </div>
        </div>
      </PageSection>
    </>
  );
}
