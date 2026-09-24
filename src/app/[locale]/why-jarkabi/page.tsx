import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

const differentiators = [
  "Care That Starts With Listening",
  "Personalized Care Planning",
  "Professional Care Team",
  "Caregiver Matching",
  "Clinical Oversight",
  "Dependable Scheduling",
  "Continuity of Care",
  "Family Communication",
  "Respect for Culture",
  "Respect for Language",
  "Flexible Support",
  "Quality Improvement",
];

type Props = { params: Promise<{ locale: string }> };

export const metadata: Metadata = { title: "Why Jarkabi Home Care" };

export default async function WhyJarkabiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PageHero
        eyebrow="Why Jarkabi"
        title="Care built on trust, compassion, and professional standards"
        lead="Every differentiator below will be editable in the CMS. Claims require substantiation before publication."
      />
      <section className="section">
        <div className="container card-grid">
          {differentiators.map((item) => (
            <article key={item} className="content-card">
              <h2>{item}</h2>
              <p>Editable content block. [PLACEHOLDER]</p>
            </article>
          ))}
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
