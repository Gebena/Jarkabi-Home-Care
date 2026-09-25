"use client";

import type { TestimonialData } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type TestimonialCarouselProps = {
  testimonials: TestimonialData[];
  /** Cards visible at lg breakpoint — Care Giver shows two side-by-side. */
  visibleDesktop?: number;
};

const AUTOPLAY_MS = 8000;

function TestimonialCard({ item }: { item: TestimonialData }) {
  return (
    <figure className="h-full">
      <blockquote className="relative h-full bg-white p-8 text-sm leading-relaxed text-body">
        {item.quote}
        <span
          aria-hidden="true"
          className="absolute -bottom-3 start-10 h-0 w-0 border-s-[14px] border-t-[14px] border-s-transparent border-t-white"
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
          <span className="block font-display text-base text-plum">{item.attribution}</span>
          <span className="block text-xs text-plum/75">{item.relation}</span>
        </span>
        <span className="ms-auto flex gap-0.5" aria-label="Rated 5 out of 5">
          {[0, 1, 2, 3, 4].map((star) => (
            <Star key={star} size={13} aria-hidden="true" className="fill-current text-plum" />
          ))}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Care Giver Home Page 01 testimonial slider — blush band, speech-bubble cards,
 * square prev/next controls, and restrained autoplay.
 */
export function TestimonialCarousel({
  testimonials,
  visibleDesktop = 2,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const step = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => step(1), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, step]);

  if (count === 0) return null;

  const desktopPairs = visibleDesktop >= 2 && count >= 2;
  const secondIndex = (index + 1) % count;
  const visibleItems = desktopPairs
    ? [testimonials[index], testimonials[secondIndex]]
    : [testimonials[index]];

  return (
    <div
      className="relative mt-12"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        role="group"
        aria-live="polite"
        aria-label={`Testimonial ${index + 1} of ${count}`}
        className={cn(
          "grid gap-10 transition-opacity duration-500",
          desktopPairs ? "md:grid-cols-2" : "max-w-2xl mx-auto",
        )}
      >
        {visibleItems.map((item, slot) => (
          <div key={`${index}-${item.attribution}-${slot}`} className="transition-opacity duration-500">
            <TestimonialCard item={item} />
          </div>
        ))}
      </div>

      {count > 1 ? (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous testimonial"
            className="absolute -left-1 top-[38%] hidden h-12 w-10 -translate-y-1/2 place-items-center bg-white/95 text-plum shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum md:grid lg:-left-4"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next testimonial"
            className="absolute -right-1 top-[38%] hidden h-12 w-10 -translate-y-1/2 place-items-center bg-white/95 text-plum shadow-sm transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum md:grid lg:-right-4"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.attribution}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className="grid h-6 w-6 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-2 w-2 rounded-full transition-colors",
                    i === index ? "bg-plum" : "bg-plum/30 hover:bg-plum/50",
                  )}
                />
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
