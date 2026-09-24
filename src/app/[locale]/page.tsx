import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { CareersCtaSection } from "@/components/sections/careers-cta-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { FamilyPeaceSection } from "@/components/sections/family-peace-section";
import { IntroSection } from "@/components/sections/intro-section";
import { JarkabiHeroSection } from "@/components/sections/jarkabi-hero-section";
import { LocationsPreviewSection } from "@/components/sections/locations-preview-section";
import { NursingHighlightSection } from "@/components/sections/nursing-highlight-section";
import { ProcessSection } from "@/components/sections/process-section";
import { ServicesPreview } from "@/components/sections/services-preview";
import { TeamSection } from "@/components/sections/team-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TrustBar } from "@/components/sections/trust-bar";
import { WhySection } from "@/components/sections/why-section";
import type { Locale } from "@/i18n/routing";
import { getBlogPosts, getBrand, getProvinces, getServices } from "@/lib/cms";
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

/** Homepage — spec §25 sequence */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale as Locale;

  const [services, posts, brand, provinces] = await Promise.all([
    getServices(lang),
    getBlogPosts(lang),
    getBrand(lang),
    getProvinces(lang),
  ]);

  return (
    <>
      <JarkabiHeroSection locale={locale} brand={brand} />
      <TrustBar />
      <IntroSection locale={locale} />
      <ServicesPreview locale={locale} services={services} />
      <WhySection locale={locale} />
      <ProcessSection />
      <NursingHighlightSection locale={locale} />
      <FamilyPeaceSection />
      <TeamSection locale={locale} />
      <TestimonialsSection />
      <LocationsPreviewSection locale={locale} provinces={provinces} />
      <BlogPreviewSection locale={locale} posts={posts} />
      <CareersCtaSection locale={locale} />
      <ContactCtaSection locale={locale} brand={brand} />
    </>
  );
}
