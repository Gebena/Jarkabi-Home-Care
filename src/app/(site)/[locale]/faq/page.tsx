import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import type { Locale } from "@/i18n/routing";
import { getFaqs } from "@/lib/cms";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tNav, faqs] = await Promise.all([
    getTranslations({ locale, namespace: "faqPage" }),
    getTranslations({ locale, namespace: "nav" }),
    getFaqs(locale as Locale),
  ]);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={tNav("faq")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      <PageSection>
        <SectionTitle align="center" title={t("sectionTitle")} subtitle={t("sectionLead")} />
        <div className="mt-12">
          <FaqAccordion
            items={faqs}
            columns={2}
            searchable
            searchPlaceholder={t("searchPlaceholder")}
          />
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
