import { SpecialtyPage } from "@/components/pages/specialty-page";
import { specialtyPageImages } from "@/lib/site-images";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "specialtyPages.dementia" });
  return buildPageMetadata({
    locale,
    path: "/dementia-care",
    title: t("title"),
    description: t("lead"),
  });
}

export default async function DementiaCarePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "specialtyPages.dementia" });
  const images = specialtyPageImages.dementia;

  return (
    <SpecialtyPage
      locale={locale}
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
      sections={[
        { title: t("section1Title"), body: t("section1Body"), image: images[0].src },
        { title: t("section2Title"), body: t("section2Body"), image: images[1].src },
        { title: t("section3Title"), body: t("section3Body"), image: images[2].src },
      ]}
    />
  );
}
