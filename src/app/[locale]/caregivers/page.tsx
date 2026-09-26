import { SpecialtyPage } from "@/components/pages/specialty-page";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

type Section = { title: string; body: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caregiversPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function CaregiversPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "caregiversPage" });

  return (
    <SpecialtyPage
      locale={locale}
      eyebrow={t("eyebrow")}
      title={t("title")}
      lead={t("lead")}
      crumbLabel={t("crumb")}
      sections={t.raw("sections") as Section[]}
    />
  );
}
