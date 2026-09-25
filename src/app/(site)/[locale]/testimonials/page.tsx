import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid";
import type { Locale } from "@/i18n/routing";
import { getTestimonials } from "@/lib/cms";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "testimonialsPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function TestimonialsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [t, tNav, testimonials] = await Promise.all([
    getTranslations({ locale, namespace: "testimonialsPage" }),
    getTranslations({ locale, namespace: "nav" }),
    getTestimonials(locale as Locale),
  ]);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={tNav("testimonials")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
        breadcrumbs={[{ label: tNav("about"), href: `/${locale}/about` }]}
      />

      <PageSection tone="blush">
        <SectionTitle align="center" tone="blush" title={t("sectionTitle")} />
        <div className="mt-12">
          <TestimonialsGrid testimonials={testimonials} />
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
