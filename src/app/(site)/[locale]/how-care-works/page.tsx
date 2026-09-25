import { PageHero } from "@/components/layout/page-hero";
import { ProcessSection } from "@/components/sections/process-section";
import { CallToAction } from "@/components/ui/call-to-action";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { caregiverMeetingImage } from "@/lib/caregiver-assets";
import { MessageSquare, ShieldCheck } from "lucide-react";
import Image from "next/image";
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

      <PageSection tone="mist">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl text-ink sm:text-3xl">{t("meetingTitle")}</h2>
          <p className="mt-3 text-base font-medium text-tan-ink">{t("meetingTagline")}</p>
          <p className="mt-6 text-base leading-relaxed text-body">{t("meetingIntro")}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h3 className="font-display text-xl text-ink">{t("meetingTopicsTitle")}</h3>
            <ul className="mt-6 space-y-4 border-s-2 border-tan ps-5">
              {(t.raw("meetingTopics") as string[]).map((topic) => (
                <li key={topic} className="text-sm leading-relaxed text-body">
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={caregiverMeetingImage}
              alt=""
              fill
              sizes="(max-width: 1024px) 92vw, 28vw"
              className="object-cover"
            />
          </div>
        </div>
      </PageSection>

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
