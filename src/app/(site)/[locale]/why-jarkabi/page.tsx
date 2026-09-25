import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { WhyJarkabiSections } from "@/components/why/why-jarkabi-sections";
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

      <WhyJarkabiSections
        introTitle={t("introTitle")}
        introBody={t("introBody")}
        gridTitle={t("gridTitle")}
        items={items}
      />

      <CallToAction locale={locale} />
    </>
  );
}
