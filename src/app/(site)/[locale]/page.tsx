import { BlogPreview } from "@/components/home/blog-preview";
import { CallToAction } from "@/components/ui/call-to-action";
import { CareProcess } from "@/components/home/care-process";
import { CareTasksSection } from "@/components/home/care-tasks-section";
import { ContactSection } from "@/components/home/contact-section";
import { HeroSection } from "@/components/home/hero-section";
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
import { setRequestLocale } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

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
      <PillarsSection locale={locale} />
      <ServicesGrid locale={locale} services={services} />
      <WhyChooseUs locale={locale} />
      <CareTasksSection />
      <CareProcess locale={locale} />
      <StatisticsSection />
      <CallToAction locale={locale} />
      <TestimonialSection locale={locale} testimonials={testimonials} />
      <TeamSection locale={locale} members={team} />
      <LocationFinder locale={locale} provinces={provinces} />
      <BlogPreview locale={locale} posts={posts} />
      <TrustBar />
      <ContactSection locale={locale} brand={brand} />
    </>
  );
}
