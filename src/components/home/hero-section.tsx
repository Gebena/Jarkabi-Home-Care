"use client";

import { GlidingHeroBackground } from "@/components/ui/gliding-hero-background";
import { isRtlLocale } from "@/lib/direction";
import { heroSlides } from "@/lib/site-images";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 6500;
const SWIPE_THRESHOLD = 48;

/**
 * One Jarkabi homepage hero — three premium photographs glide through the same
 * layout while headline, body, and CTAs stay fixed (Care Giver Home Page 01).
 */
export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const rtl = isRtlLocale(locale);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);

  const slides = heroSlides;
  const count = slides.length;
  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  function onTouchStart(event: React.TouchEvent) {
    touchStart.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: React.TouchEvent) {
    if (touchStart.current === null) return;
    const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
    touchStart.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    go(delta > 0 ? (rtl ? index + 1 : index - 1) : rtl ? index - 1 : index + 1);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("headline")}
      className="relative isolate min-h-[36rem] overflow-hidden bg-plum sm:min-h-[40rem] lg:min-h-[46rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <GlidingHeroBackground
        slides={slides.map((slide) => ({
          src: slide.src,
          alt: slide.alt,
          position: slide.position,
          flip: slide.flip,
        }))}
        activeIndex={index}
        rtl={rtl}
      />

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-[1]",
          "from-plum/97 from-0% via-plum/90 via-42% to-plum/12 to-100%",
          "sm:from-plum/96 sm:from-18% sm:via-plum/84 sm:via-48% sm:to-plum/18 sm:to-88%",
          "lg:from-[34%] lg:via-plum/80 lg:via-46% lg:to-transparent lg:to-[68%]",
          rtl ? "bg-gradient-to-l" : "bg-gradient-to-r",
        )}
      />

      <div className="relative z-[2] mx-auto flex w-[min(1240px,calc(100%-2rem))] items-center py-20 sm:py-24 md:min-h-[40rem] md:py-28 lg:min-h-[46rem]">
        <div className="max-w-2xl" aria-live="polite">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-tan sm:text-xs">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 font-display text-[1.85rem] leading-tight text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]">
            {t("headline")}
          </h1>
          <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/85 sm:text-base md:text-lg">
            {t("subheadline")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="bg-tan px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("primaryCta")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="border border-white/70 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("secondaryCta")}
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/70">{t("locationNote")}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-0 top-1/2 z-[3] hidden h-14 w-11 -translate-y-1/2 place-items-center bg-white/90 text-plum transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:grid"
      >
        <ChevronLeft size={22} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-0 top-1/2 z-[3] hidden h-14 w-11 -translate-y-1/2 place-items-center bg-white/90 text-plum transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:grid"
      >
        <ChevronRight size={22} aria-hidden="true" />
      </button>

      <div className="absolute bottom-4 left-1/2 z-[3] flex -translate-x-1/2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className="grid h-6 w-6 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block h-2.5 w-2.5 rounded-full transition-colors",
                i === index ? "bg-tan" : "bg-white/45 hover:bg-white/70",
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
