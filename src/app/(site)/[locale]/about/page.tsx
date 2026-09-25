import { TestimonialSection } from "@/components/home/testimonial-section";
import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageSection } from "@/components/ui/page-section";
import { SectionTitle } from "@/components/ui/section-title";
import { getTestimonials } from "@/lib/cms";
import type { Locale } from "@/i18n/routing";
import { aboutImages } from "@/lib/site-images";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
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
  const visionPoints = t.raw("visionPoints") as string[];
  const testimonials = await getTestimonials(locale as Locale);

  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={t("eyebrow")}
        title={t("title")}
        lead={t("lead")}
        crumbLabel={t("crumb")}
      />

      {/* Care Giver mission-section: centred title box + narrow image + wide copy */}
      <PageSection tone="mist">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-2xl text-ink sm:text-3xl lg:text-[2.35rem]">
            {t("differenceTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl font-display text-lg italic leading-relaxed text-ink-soft lg:text-xl">
            {t("differenceLead")}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-body">
            {t("differenceBody")}
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-14">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden lg:mx-0">
            <Image
              src={aboutImages.mission.src}
              alt={aboutImages.mission.alt}
              fill
              sizes="(max-width: 1024px) 80vw, 20vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">{t("missionTitle")}</h2>
            <p className="mt-4 font-display text-lg italic leading-relaxed text-ink-soft">
              {t("missionLead")}
            </p>
            <p className="mt-4 text-base leading-relaxed text-body">{t("missionBody")}</p>

            <h3 className="mt-8 font-display text-xl text-plum">{t("visionTitle")}</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {visionPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-body">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-tan" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageSection>

      <CallToAction locale={locale} />

      {/* Care Giver healthcare-section: copy left, photo collage right */}
      <PageSection>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl lg:text-[2.35rem]">
              {t("healthcareTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-body">{t("healthcareBody")}</p>
            <p className="mt-6 font-display text-lg italic leading-relaxed text-tan-ink">
              {t("healthcareCallout")}{" "}
              <Link
                href={`/${locale}/contact`}
                className="not-italic text-coral underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
              >
                {t("healthcareLink")}
              </Link>
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={aboutImages.main.src}
                alt={aboutImages.main.alt}
                fill
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={aboutImages.small1.src}
                  alt={aboutImages.small1.alt}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={aboutImages.small2.src}
                  alt={aboutImages.small2.alt}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <TestimonialSection locale={locale} testimonials={testimonials} />

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

      <PageSection>
        <div className="mx-auto max-w-3xl text-center">
          <SectionTitle align="center" title={t("leadershipTitle")} />
          <p className="mt-6 text-base leading-relaxed text-body">{t("leadershipBody")}</p>
        </div>
      </PageSection>
    </>
  );
}
