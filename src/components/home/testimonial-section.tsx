import type { TestimonialData } from "@/lib/cms";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";

type TestimonialSectionProps = {
  locale: string;
  testimonials: TestimonialData[];
};

/**
 * Care Giver Home Page 01 testimonials: a rose-blush band holding white cards
 * with a small pointer tail, an attribution line and a five-star rating.
 *
 * The empty state is deliberate — no placeholder or invented reviews ship.
 */
export function TestimonialSection({ locale, testimonials }: TestimonialSectionProps) {
  const t = useTranslations("testimonials");

  return (
    <section className="bg-blush py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <SectionTitle align="center" tone="blush" title={t("title")} subtitle={t("subtitle")} />

        {testimonials.length === 0 ? (
          <p className="mx-auto mt-10 max-w-xl bg-white/85 p-6 text-center text-sm leading-relaxed text-body">
            {t("placeholder")}
          </p>
        ) : (
          <ul className="mt-12 grid gap-10 md:grid-cols-2">
            {testimonials.slice(0, 4).map((item) => (
              <li key={item.quote}>
                <figure>
                  <blockquote className="relative bg-white p-8 text-sm leading-relaxed text-body">
                    {item.quote}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-3 left-10 h-0 w-0 border-l-[14px] border-t-[14px] border-l-transparent border-t-white"
                    />
                  </blockquote>

                  <figcaption className="mt-7 flex items-center gap-4 px-2">
                    {item.photo ? (
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                        <Image src={item.photo} alt="" fill sizes="48px" className="object-cover" />
                      </span>
                    ) : (
                      <span
                        aria-hidden="true"
                        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-plum font-display text-lg text-white"
                      >
                        {item.attribution.trim().charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span>
                      <span className="block font-display text-base text-plum">
                        {item.attribution}
                      </span>
                      <span className="block text-xs text-plum/75">{item.relation}</span>
                    </span>
                    <span className="ml-auto flex gap-0.5" aria-label="Rated 5 out of 5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          size={13}
                          aria-hidden="true"
                          className="fill-current text-plum"
                        />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
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
