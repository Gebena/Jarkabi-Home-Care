"use client";

import { ParallaxBackground } from "@/components/ui/parallax-background";
import { isRtlLocale, mirrorObjectPosition } from "@/lib/direction";
import { heroSlides } from "@/lib/site-images";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const AUTOPLAY_MS = 7000;

/**
 * Care Giver Home Page 01 hero — licensed slider photos with cross-fading layers,
 * scroll parallax, and a plum wash that leaves the photograph visible on the right.
 */
export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const rtl = isRtlLocale(locale);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const copy = [
    { script: t("slide1Script"), title: t("slide1Title"), body: t("slide1Body") },
    { script: t("slide2Script"), title: t("slide2Title"), body: t("slide2Body") },
    { script: t("slide3Script"), title: t("slide3Title"), body: t("slide3Body") },
  ];

  const slides = copy.slice(0, heroSlides.length);
  const count = slides.length;
  const hasSlider = count > 1;
  const go = useCallback((next: number) => setIndex((next + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("headline")}
      className="relative isolate min-h-[36rem] overflow-hidden bg-plum lg:min-h-[44rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {heroSlides.slice(0, count).map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.src}
            aria-hidden={active ? undefined : true}
            className={cn(
              "absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-out",
              active ? "z-0 scale-100 opacity-100" : "z-0 scale-[1.06] opacity-0",
            )}
          >
            <ParallaxBackground
              src={slide.src}
              alt={active ? slide.alt : ""}
              priority={i === 0}
              strength={0.22}
              objectPosition={rtl ? mirrorObjectPosition(slide.position) : slide.position}
              flip={Boolean(slide.flip) !== rtl}
            />
          </div>
        );
      })}

      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-[1] from-plum/95 from-25% via-plum/80 via-55% to-plum/25 to-90%",
          "lg:from-38% lg:via-plum/75 lg:via-50% lg:to-transparent lg:to-72%",
          rtl ? "bg-gradient-to-l" : "bg-gradient-to-r",
        )}
      />

      <div className="relative z-[2] mx-auto flex w-[min(1240px,calc(100%-2rem))] items-center py-24 md:min-h-[36rem] md:py-28 lg:min-h-[44rem]">
        <div className="max-w-2xl">
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-live="polite"
          >
            <p className="font-display text-xl text-white/90 md:text-2xl lg:text-3xl">
              {slides[index].script}
            </p>
            <h1 className="mt-1 font-display text-3xl text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]">
              {slides[index].title}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
              {slides[index].body}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href={`/${locale}/services`}
              className="bg-tan px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-plum transition-colors hover:bg-tan-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("secondaryCta")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border border-white/70 px-8 py-4 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {t("primaryCta")}
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/70">{t("locationNote")}</p>
        </div>
      </div>

      {hasSlider ? (
        <>
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
                key={slide.title}
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
        </>
      ) : null}
    </section>
  );
}
