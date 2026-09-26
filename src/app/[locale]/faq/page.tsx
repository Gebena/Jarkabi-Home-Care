import { PageHero } from "@/components/layout/page-hero";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import type { Locale } from "@/i18n/routing";
import { getFaqs } from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return buildPageMetadata({
    locale,
    path: "/faq",
    title: t("metaTitle"),
    description: t("lead"),
  });
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faqPage" });
  const lang = locale as Locale;

  const cmsFaqs = await getFaqs(lang);
  const fallback = t.raw("items") as Array<{ question: string; answer: string }>;
  const items = cmsFaqs.length
    ? cmsFaqs.map((faq) => ({ question: faq.question, answer: faq.answer, category: faq.category }))
    : fallback;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero locale={locale} eyebrow={t("eyebrow")} title={t("title")} lead={t("lead")} crumbLabel={t("eyebrow")} />
      <PageSection>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={items} />
        </div>
      </PageSection>
      <CallToAction locale={locale} />
    </>
  );
}
