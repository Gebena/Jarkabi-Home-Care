"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { VideoLightbox } from "@/components/ui/video-lightbox";
import { whyImage } from "@/lib/service-images";
import { Check, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";

type WhySectionProps = {
  locale: string;
};

export function WhySection({ locale }: WhySectionProps) {
  const t = useTranslations("why");
  const base = `/${locale}`;
  const [videoOpen, setVideoOpen] = useState(false);

  const checks = [
    t("check1"),
    t("check2"),
    t("check3"),
    t("check4"),
    t("check5"),
    t("check6"),
  ];

  return (
    <section className="why-section">
      <div className="container">
        <ScrollReveal>
          <div className="why-split">
            <button
              type="button"
              className="why-media"
              onClick={() => setVideoOpen(true)}
              aria-label="Play care overview video"
            >
              <img src={whyImage} alt="" loading="lazy" />
              <span className="why-play" aria-hidden="true">
                <span className="why-play-btn why-play-btn--large">
                  <Play size={22} fill="currentColor" />
                </span>
              </span>
            </button>
            <div className="why-panel">
              <p className="eyebrow eyebrow--light">{t("eyebrow")}</p>
              <h2>{t("title")}</h2>
              <p>{t("body")}</p>
              <ul className="why-checks">
                {checks.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "2rem" }}>
                <Link className="button button-primary" href={`${base}/why-jarkabi`}>
                  {t("cta")}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      <VideoLightbox open={videoOpen} onClose={() => setVideoOpen(false)} title={t("title")} />
    </section>
  );
}
