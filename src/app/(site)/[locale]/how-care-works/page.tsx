import { HowCareWorksSections } from "@/components/how-care/how-care-works-sections";
import { PageHero } from "@/components/layout/page-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { CallToAction } from "@/components/ui/call-to-action";
import { howCareWorksImages } from "@/lib/site-images";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "howCareWorksPage" });
  return { title: t("title"), description: t("lead") };
}

export default async function HowCareWorksPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "howCareWorksPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={tNav("howCareWorks")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={tNav("howCareWorks")}
      />

      <ProcessSection />

      <HowCareWorksSections
        meetingTitle={t("meetingTitle")}
        meetingTagline={t("meetingTagline")}
        meetingIntro={t("meetingIntro")}
        meetingTopicsTitle={t("meetingTopicsTitle")}
        meetingTopics={t.raw("meetingTopics") as string[]}
        bands={[
          {
            title: t("communicationTitle"),
            body: t("communicationBody"),
            image: howCareWorksImages.communication,
          },
          {
            title: t("supervisionTitle"),
            body: t("supervisionBody"),
            image: howCareWorksImages.supervision,
          },
        ]}
      />

      <CallToAction locale={locale} />
    </>
  );
}
