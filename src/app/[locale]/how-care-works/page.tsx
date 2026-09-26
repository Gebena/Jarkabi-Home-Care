import { PageHero } from "@/components/layout/page-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { CallToAction } from "@/components/ui/call-to-action";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { MessageSquare, ShieldCheck } from "lucide-react";
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

      <PageSection>
        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            headingLevel={2}
            icon={MessageSquare}
            title={t("communicationTitle")}
            body={t("communicationBody")}
          />
          <FeatureCard
            headingLevel={2}
            icon={ShieldCheck}
            title={t("supervisionTitle")}
            body={t("supervisionBody")}
          />
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
