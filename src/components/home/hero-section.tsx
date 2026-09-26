"use client";

import { isRtlLocale, mirrorObjectPosition } from "@/lib/direction";
import { isHomePath } from "@/lib/header-overlay";
import { heroSlides } from "@/lib/site-images";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const AUTOPLAY_MS = 7000;

/**
 * Care Giver Home Page 01 hero: a full-bleed photograph with a plum overlay
 * covering the left of the frame, a serif headline, a tan call to action and
 * square slider arrows. The original used an owl.carousel jQuery slider; this is
 * plain React state that honours `prefers-reduced-motion`.
 */
export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const pathname = usePathname();
  const isHome = isHomePath(pathname, locale);
  const rtl = isRtlLocale(locale);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const copy = [
    { script: t("slide1Script"), title: t("slide1Title"), body: t("slide1Body") },
    { script: t("slide2Script"), title: t("slide2Title"), body: t("slide2Body") },
    { script: t("slide3Script"), title: t("slide3Title"), body: t("slide3Body") },
  ];

  // Pair copy with however much photography exists, so adding a photo adds a slide.
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
      className={cn(
        "relative isolate overflow-hidden bg-plum",
        isHome && "-mt-[4.75rem] pt-[4.75rem] lg:-mt-[5.25rem] lg:pt-[5.25rem]",
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {heroSlides.slice(0, count).map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={i === index ? slide.alt : ""}
          aria-hidden={i === index ? undefined : true}
          fill
          priority={i === 0}
          sizes="100vw"
          style={{
            objectPosition: rtl ? mirrorObjectPosition(slide.position) : slide.position,
          }}
          className={cn(
            "absolute inset-0 -z-10 object-cover transition-opacity duration-[1200ms]",
            i === index ? "opacity-100" : "opacity-0",
            // Mirrored so the subject lands opposite the wash, whichever side
            // the copy is on.
            Boolean(slide.flip) !== rtl && "scale-x-[-1]",
          )}
        />
      ))}

      {/* Plum wash behind the copy, as in the Care Giver demo. Only at `lg` is
          there room for the copy to sit in the left third and let the wash clear
          to the photograph; narrower than that the copy spans most of the frame,
          so the wash has to keep tinting the whole width to stay legible. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-10 from-plum from-30% via-plum/95 via-60% to-plum/80",
          "lg:from-42% lg:via-plum/90 lg:via-55% lg:to-transparent lg:to-68%",
          rtl ? "bg-gradient-to-l" : "bg-gradient-to-r",
        )}
      />

      <div className="mx-auto flex w-[min(1240px,calc(100%-2rem))] items-center py-24 md:min-h-[36rem] md:py-28 lg:min-h-[44rem]">
        <div className="max-w-2xl">
          {/* Only the active slide is rendered: keeping the inactive ones in the
              DOM under `hidden` gave the page more than one h1. */}
          <div
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            aria-live="polite"
          >
            <p className="font-display text-xl text-white/85 md:text-2xl lg:text-3xl">
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
              href={`/${locale}/request-care`}
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
            className="absolute left-0 top-1/2 hidden h-14 w-11 -translate-y-1/2 place-items-center bg-white/90 text-plum transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:grid"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 hidden h-14 w-11 -translate-y-1/2 place-items-center bg-white/90 text-plum transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:grid"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>

          {/* 24px hit areas around 10px dots, per WCAG 2.2 target size. */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2">
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
