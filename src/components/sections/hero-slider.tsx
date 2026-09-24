"use client";

import { heroImage, serviceImages } from "@/lib/service-images";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const slideImages = [
  heroImage,
  serviceImages["senior-home-care"],
  serviceImages["companion-care"],
];

export function HeroSlider({ locale }: { locale: string }) {
  const t = useTranslations("hero");
  const base = `/${locale}`;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slides = [
    {
      script: t("slide1Script"),
      title: t("slide1Title"),
      body: t("slide1Body"),
    },
    {
      script: t("slide2Script"),
      title: t("slide2Title"),
      body: t("slide2Body"),
    },
    {
      script: t("slide3Script"),
      title: t("slide3Title"),
      body: t("slide3Body"),
    },
  ];

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(next, 5000);
    return () => window.clearInterval(timer);
  }, [next, paused]);

  return (
    <div className="hero-wrap">
      <section
        className="hero-section hero-slider"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        aria-label="Featured highlights"
      >
        {slideImages.map((src, i) => (
          <div
            key={src}
            className={cn("hero-slide", i === index && "hero-slide--active")}
            aria-hidden={i !== index}
          >
            <div className="hero-backdrop">
              <div className="hero-photo" style={{ backgroundImage: `url("${src}")` }} />
              <div className="hero-overlay" />
            </div>
          </div>
        ))}

        <div className="hero-content">
          <div className="hero-copy">
            <p className="script-text">{slides[index].script}</p>
            <h1>{slides[index].title}</h1>
            <p className="hero-subheadline">{slides[index].body}</p>
            <div className="hero-actions">
              <Link className="button button-primary button-lg" href={`${base}/contact`}>
                {t("primaryCta")}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link className="button button-outline-light button-lg" href={`${base}/services`}>
                {t("secondaryCta")}
              </Link>
            </div>
          </div>
        </div>

        <button type="button" className="hero-arrow hero-arrow--prev" onClick={prev} aria-label="Previous slide">
          <ChevronLeft size={22} />
        </button>
        <button type="button" className="hero-arrow hero-arrow--next" onClick={next} aria-label="Next slide">
          <ChevronRight size={22} />
        </button>

        <div className="hero-dots" role="tablist" aria-label="Slide navigation">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              className={cn("hero-dot", i === index && "hero-dot--active")}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
