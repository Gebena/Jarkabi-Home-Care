import { useTranslations } from "next-intl";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";

/**
 * Three-step care journey, styled after Care Giver's numbered panels: an oversized
 * tan index sitting above a serif step title.
 */
export function CareProcess({ locale }: { locale: string }) {
  const t = useTranslations("home01");
  const tProcess = useTranslations("process");

  const steps = [1, 2, 3].map((n) => ({
    index: String(n).padStart(2, "0"),
    title: t(`step${n}Title`),
    body: t(`step${n}Body`),
  }));

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle align="center" title={tProcess("title")} subtitle={t("processTagline")} />

        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.index} className="border-t-2 border-tan pt-6">
              <span aria-hidden="true" className="font-display text-4xl text-tan-ink">
                {step.index}
              </span>
              <h3 className="mt-3 font-display text-xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{step.body}</p>
            </li>
          ))}
        </ol>

        <Link
          href={`/${locale}/how-care-works`}
          className="mt-10 inline-block border border-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-tan-ink transition-colors hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
        >
          {tProcess("eyebrow")}
        </Link>
      </div>
    </section>
  );
}
