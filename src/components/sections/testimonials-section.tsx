"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { serviceImages } from "@/lib/service-images";
import { Play, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [videoOpen, setVideoOpen] = useState(false);

  const sideImages = [
    serviceImages["senior-home-care"],
    serviceImages["companion-care"],
    serviceImages["dementia-support"],
    serviceImages["respite-care"],
  ];

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <ScrollReveal>
          <div className="section-heading center">
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2>{t("title")}</h2>
            <p className="section-lead">{t("subtitle")}</p>
          </div>
        </ScrollReveal>
        <div className="testimonials-layout">
          <div className="testimonial-side">
            {sideImages.slice(0, 2).map((src, i) => (
              <button
                key={i}
                type="button"
                className="testimonial-thumb"
                onClick={() => setVideoOpen(true)}
                aria-label="Play testimonial video"
              >
                <img src={src} alt="" loading="lazy" />
                <span className="testimonial-thumb-play" aria-hidden="true">
                  <span className="why-play-btn">
                    <Play size={16} fill="currentColor" />
                  </span>
                </span>
              </button>
            ))}
          </div>
          <ScrollReveal delay={100}>
            <article className="testimonial-main">
              <div className="testimonial-avatar" aria-hidden="true">MR</div>
              <div className="stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="testimonial-quote">{t("quote1")}</p>
              <div className="testimonial-author">
                <strong>{t("name1")}</strong>
                <span>{t("role1")}</span>
              </div>
            </article>
          </ScrollReveal>
          <div className="testimonial-side">
            {sideImages.slice(2).map((src, i) => (
              <button
                key={i}
                type="button"
                className="testimonial-thumb"
                onClick={() => setVideoOpen(true)}
                aria-label="Play testimonial video"
              >
                <img src={src} alt="" loading="lazy" />
                <span className="testimonial-thumb-play" aria-hidden="true">
                  <span className="why-play-btn">
                    <Play size={16} fill="currentColor" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <VideoLightbox
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={t("title")}
      />
    </section>
  );
}
