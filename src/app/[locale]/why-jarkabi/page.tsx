import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

type Differentiator = { title: string; body: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "whyPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function WhyJarkabiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "whyPage" });
  const items = t.raw("items") as Differentiator[];

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      <PageSection tone="mist">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li key={item.title}>
              <FeatureCard headingLevel={2} index={index + 1} title={item.title} body={item.body} />
            </li>
          ))}
        </ul>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
