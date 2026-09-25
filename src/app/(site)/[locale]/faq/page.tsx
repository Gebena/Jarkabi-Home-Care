import { FaqPageSidebar } from "@/components/faq/faq-page-sidebar";
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

      <PageSection tone="mist">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-12">
          <div className="min-w-0">
            <SectionTitle title={t("sectionTitle")} subtitle={t("sectionLead")} />
            <div className="mt-10">
              <FaqAccordion
                items={faqs}
                columns={1}
                searchable
                searchPlaceholder={t("searchPlaceholder")}
              />
            </div>
          </div>

          <FaqPageSidebar
            locale={locale}
            quickLinksTitle={t("sidebarTitle")}
            widgetTitle={t("widgetTitle")}
            widgetButton={t("widgetButton")}
            links={[
              { label: tNav("howCareWorks"), href: `/${locale}/how-care-works` },
              { label: tNav("services"), href: `/${locale}/services` },
              { label: tNav("contact"), href: `/${locale}/contact` },
              { label: tNav("whyJarkabi"), href: `/${locale}/why-jarkabi` },
            ]}
          />
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
