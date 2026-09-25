"use client";

import type { ServiceData } from "@/lib/cms";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { ServiceCard } from "@/components/ui/service-card";

type ServicesGridProps = {
  locale: string;
  services: ServiceData[];
};

/**
 * Care Giver Home Page 01 "What Services We offer": a left-aligned serif heading
 * with square outline arrows on the right and a row of square-image cards. The
 * arrows scroll a snap track, so they stay meaningful when there are more
 * services than fit the viewport.
 */
export function ServicesGrid({ locale, services }: ServicesGridProps) {
  const t = useTranslations("services");
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.clientWidth + 24 : track.clientWidth;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  if (services.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle title={t("title")} subtitle={t("subtitle")} />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll services left"
              aria-controls="services-track"
              className="grid h-10 w-10 place-items-center border border-line text-ink transition-colors hover:border-tan hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll services right"
              aria-controls="services-track"
              className="grid h-10 w-10 place-items-center border border-line text-ink transition-colors hover:border-tan hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul
          id="services-track"
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <li
              key={service.slug}
              className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <ServiceCard locale={locale} service={service} ctaLabel={t("learnMore")} />
            </li>
          ))}
        </ul>

        <Link
          href={`/${locale}/services`}
          className="mt-10 inline-block bg-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
        >
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
