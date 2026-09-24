import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Growing Across Canada" };

export default async function GrowingAcrossCanadaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="National vision"
        title="Growing across Canada — without compromising quality"
        lead="We began locally in Ottawa with a platform designed to expand thoughtfully into additional Canadian communities."
      />
      <section className="section">
        <div className="container content-stack">
          <article className="content-card">
            <h2>Local heart, national capability</h2>
            <p>Each market can display local leadership, caregivers, phone numbers, testimonials and resources — while sharing one national brand and quality framework.</p>
          </article>
          <article className="content-card">
            <h2>How expansion works</h2>
            <p>Activate a province, add regional content, configure services and compliance wording, publish local team profiles, and launch — without rebuilding the website.</p>
          </article>
          <article className="content-card">
            <h2>What we will never do</h2>
            <p>We will not imply service in a province or city until it is marked ACTIVE in our administration system.</p>
          </article>
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
