import { PageSection } from "@/components/ui/page-section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { getTranslations } from "next-intl/server";

/**
 * Care Giver's numbered path-to-care row. The reveal wrapper sits inside each
 * <li> rather than around it, so the list stays a list for assistive tech.
 */
export async function ProcessSection() {
  const t = await getTranslations("process");
  const steps = [t("step1"), t("step2"), t("step3"), t("step4"), t("step5"), t("step6")];

  return (
    <PageSection tone="mist">
      <ScrollReveal>
        {/* No subtitle: the namespace's eyebrow repeats the page title verbatim. */}
        <SectionTitle align="center" title={t("title")} />
      </ScrollReveal>

      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step} className="border-t-2 border-line pt-5">
            <ScrollReveal delay={index * 70}>
              <span aria-hidden="true" className="font-display text-2xl text-tan-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 font-display text-base text-ink">{step}</p>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </PageSection>
  );
}
