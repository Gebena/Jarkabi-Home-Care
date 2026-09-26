import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { aboutImages } from "@/lib/site-images";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

type Value = { title: string; body: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return { title: t("metaTitle"), description: t("lead") };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const values = t.raw("values") as Value[];

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      <PageSection>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-4/3 overflow-hidden">
            <Image
              src={aboutImages.main.src}
              alt={aboutImages.main.alt}
              fill
              sizes="(max-width: 1024px) 92vw, 45vw"
              className="object-cover"
            />
          </div>

          <div>
            <SectionTitle title={t("storyTitle")} />
            <p className="mt-6 text-base leading-relaxed text-body">{t("storyBody")}</p>

            <div className="mt-8 border-l-2 border-tan pl-6">
              <h3 className="font-display text-lg text-plum">{t("missionTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{t("missionBody")}</p>
            </div>

            <div className="mt-6 border-l-2 border-tan pl-6">
              <h3 className="font-display text-lg text-plum">{t("visionTitle")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{t("visionBody")}</p>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection tone="mist">
        <SectionTitle align="center" title={t("valuesTitle")} subtitle={t("valuesSubtitle")} />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <li key={value.title}>
              <FeatureCard index={index + 1} title={value.title} body={value.body} />
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="leadership">
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle align="center" title={t("leadershipTitle")} />
          <p className="mt-6 text-base leading-relaxed text-body">{t("leadershipBody")}</p>
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
