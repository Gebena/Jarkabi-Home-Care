import { AboutPreview } from "@/components/home/about-preview";
import { BlogPreview } from "@/components/home/blog-preview";
import { CallToAction } from "@/components/ui/call-to-action";
import { CareProcess } from "@/components/home/care-process";
import { CareTasksSection } from "@/components/home/care-tasks-section";
import { ContactSection } from "@/components/home/contact-section";
import { FundingTeaser } from "@/components/home/funding-teaser";
import { HeroSection } from "@/components/home/hero-section";
import { ReferralCareersBand } from "@/components/home/referral-careers-band";
import { LocationFinder } from "@/components/home/location-finder";
import { PillarsSection } from "@/components/home/pillars-section";
import { ServicesGrid } from "@/components/home/services-grid";
import { StatisticsSection } from "@/components/home/statistics-section";
import { TeamSection } from "@/components/home/team-section";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { TrustBar } from "@/components/home/trust-bar";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import type { Locale } from "@/i18n/routing";
import {
  getBlogPosts,
  getBrand,
  getProvinces,
  getServices,
  getTeamMembers,
  getTestimonials,
} from "@/lib/cms";
import { buildPageMetadata } from "@/lib/seo";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "homePage" });
  return {
    ...buildPageMetadata({
      locale,
      path: "",
      title: t("metaTitle"),
      description: t("metaDescription"),
    }),
    title: { absolute: t("metaTitle") },
  };
}

/**
 * Care Giver Home Page 01, rebuilt as React components on the Seniar/Next.js
 * architecture. Section order follows the licensed demo top to bottom —
 * see docs/caregiver-to-jarkabi-map.md.
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;

  const [services, posts, brand, provinces, team, testimonials] = await Promise.all([
    getServices(lang),
    getBlogPosts(lang),
    getBrand(lang),
    getProvinces(lang),
    getTeamMembers(lang),
    getTestimonials(lang),
  ]);

  return (
    <>
      <HeroSection locale={locale} />
      <TrustBar />
      <AboutPreview locale={locale} />
      <PillarsSection />
      <ServicesGrid locale={locale} services={services} />
      <WhyChooseUs locale={locale} />
      <CareTasksSection />
      <CareProcess locale={locale} />
      <StatisticsSection />
      <FundingTeaser locale={locale} />
      <CallToAction locale={locale} />
      <TestimonialSection testimonials={testimonials} />
      <TeamSection locale={locale} members={team} />
      <LocationFinder locale={locale} provinces={provinces} />
      <BlogPreview locale={locale} posts={posts} />
      <ReferralCareersBand locale={locale} />
      <ContactSection locale={locale} brand={brand} />
    </>
  );
}
