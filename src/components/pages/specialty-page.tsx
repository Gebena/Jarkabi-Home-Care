import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { Check } from "lucide-react";

type SpecialtyPageProps = {
  locale: string;
  eyebrow: string;
  title: string;
  lead: string;
  crumbLabel?: string;
  sections: Array<{ title: string; body: string }>;
};

/**
 * Shared shell for the narrative pages — nursing, dementia care, caregivers.
 * Care Giver alternates the photograph side on pages like this; here the
 * sections alternate the tan rule instead, which reads the same way in a
 * right-to-left locale and does not need photography we do not have.
 */
export function SpecialtyPage({
  locale,
  eyebrow,
  title,
  lead,
  crumbLabel,
  sections,
}: SpecialtyPageProps) {
  return (
    <>
      <PageHero
        locale={locale}
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        crumbLabel={crumbLabel}
      />

      <PageSection>
        <div className="mx-auto max-w-3xl">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className={index > 0 ? "mt-10 border-t border-line pt-10" : undefined}
            >
              <h2 className="flex items-start gap-3 font-display text-xl text-ink sm:text-2xl">
                <Check
                  size={20}
                  aria-hidden="true"
                  className="mt-1.5 shrink-0 text-tan-ink"
                  strokeWidth={2.5}
                />
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-body sm:ps-8">{section.body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <CallToAction locale={locale} />
    </>
  );
}
