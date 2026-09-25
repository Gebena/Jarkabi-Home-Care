import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import type { TestimonialData } from "@/lib/cms";
import { useTranslations } from "next-intl";
import Link from "next/link";

type TestimonialSectionProps = {
  locale: string;
  testimonials: TestimonialData[];
};

/**
 * Care Giver Home Page 01 testimonials — rose-blush band, centred serif title,
 * short white rule, carousel of speech-bubble cards with portrait + stars.
 */
export function TestimonialSection({ locale, testimonials }: TestimonialSectionProps) {
  const t = useTranslations("testimonials");

  return (
    <section className="bg-blush py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <div className="text-center">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-plum/80">
            {t("eyebrow")}
          </p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-2xl text-plum sm:text-3xl lg:text-[2.35rem]">
            {t("title")}
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-4 block h-px w-12 bg-white/90"
          />
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-body">{t("subtitle")}</p>
        </div>

        {testimonials.length === 0 ? (
          <p className="mx-auto mt-10 max-w-xl bg-white/85 p-6 text-center text-sm leading-relaxed text-body">
            {t("placeholder")}
          </p>
        ) : (
          <TestimonialCarousel testimonials={testimonials} />
        )}

        <div className="mt-10 text-center">
          <Link
            href={`/${locale}/testimonials`}
            className="inline-block border border-plum/30 px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
