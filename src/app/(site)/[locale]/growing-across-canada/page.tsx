import { GrowingIntroSection } from "@/components/growing/growing-intro-section";
import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { Building2, Map, ShieldAlert } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "growingPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function GrowingAcrossCanadaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "growingPage" });

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      <GrowingIntroSection introTitle={t("introTitle")} introBody={t("introBody")} />

      <PageSection tone="mist">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            headingLevel={2}
            icon={Building2}
            title={t("localTitle")}
            body={t("localBody")}
          />
          <FeatureCard
            headingLevel={2}
            icon={Map}
            title={t("opensTitle")}
            body={t("opensBody")}
          />
          <FeatureCard
            headingLevel={2}
            icon={ShieldAlert}
            title={t("neverTitle")}
            body={t("neverBody")}
          />
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
