import { PageHero } from "@/components/layout/page-hero";
import { CtaSection } from "@/components/sections/cta-section";

type SpecialtyPageProps = {
  locale: string;
  eyebrow: string;
  title: string;
  lead: string;
  sections: Array<{ title: string; body: string }>;
};

export function SpecialtyPage({
  locale,
  eyebrow,
  title,
  lead,
  sections,
}: SpecialtyPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={lead} />
      <section className="section">
        <div className="container content-stack">
          {sections.map((section) => (
            <article key={section.title} className="content-card">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaSection locale={locale} />
    </>
  );
}
