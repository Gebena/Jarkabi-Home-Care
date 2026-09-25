import { PageHero } from "@/components/layout/page-hero";
import { CallToAction } from "@/components/ui/call-to-action";
import { PageSection } from "@/components/ui/page-section";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type SpecialtySection = {
  title: string;
  body: string;
  image: string;
  imageAlt?: string;
};

type SpecialtyPageProps = {
  locale: string;
  eyebrow: string;
  title: string;
  lead: string;
  crumbLabel?: string;
  sections: SpecialtySection[];
};

/**
 * Care Giver specialty inner pages — photographic bands alternating with copy,
 * each section using licensed template imagery.
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

      {sections.map((section, index) => {
        const imageFirst = index % 2 === 0;
        return (
          <PageSection key={section.title} tone={index % 2 === 1 ? "mist" : undefined}>
            <div
              className={cn(
                "grid items-center gap-10 lg:grid-cols-2 lg:gap-14",
                !imageFirst && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-[5/4]">
                <Image
                  src={section.image}
                  alt={section.imageAlt ?? ""}
                  fill
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
              </div>

              <div>
                <h2 className="font-display text-2xl text-ink sm:text-[1.75rem]">{section.title}</h2>
                <p className="mt-5 text-base leading-relaxed text-body">{section.body}</p>
              </div>
            </div>
          </PageSection>
        );
      })}

      <CallToAction locale={locale} />
    </>
  );
}
