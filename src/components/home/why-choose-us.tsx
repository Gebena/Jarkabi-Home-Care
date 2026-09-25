"use client";

import { VideoLightbox } from "@/components/ui/video-lightbox";
import { whyChooseUsImage } from "@/lib/site-images";
import { Check, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Care Giver Home Page 01 "Here For You Always": a plum panel carrying a white
 * checklist and an italic tan callout, with a photograph overlapping its right
 * edge and a circular translucent play button.
 */
export function WhyChooseUs({ locale }: { locale: string }) {
  const t = useTranslations("why");
  const [videoOpen, setVideoOpen] = useState(false);

  const conditions = [
    t("condition1"),
    t("condition2"),
    t("condition3"),
    t("condition4"),
    t("condition5"),
    t("condition6"),
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto w-[min(1240px,calc(100%-2rem))] lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch">
        <div className="bg-plum px-6 py-14 sm:px-10 lg:px-12 lg:py-20 lg:pr-24">
          <h2 className="font-display text-2xl text-white sm:text-3xl lg:text-[2.35rem]">
            {t("title")}
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80">{t("body")}</p>

          <ul className="mt-8 space-y-3">
            {conditions.map((condition) => (
              <li key={condition} className="flex items-start gap-3 text-sm text-white/90">
                <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-tan" />
                <span>{condition}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-sm font-display text-lg italic leading-snug text-tan lg:text-xl">
            {t("callout")}
          </p>

          <Link
            href={`/${locale}/why-jarkabi`}
            className="mt-8 inline-block border border-white/60 px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {t("cta")}
          </Link>
        </div>

        <div className="relative aspect-[4/3] w-full self-center lg:-ml-16 lg:my-12 lg:aspect-auto lg:self-stretch">
          <Image
            src={whyChooseUsImage.src}
            alt={whyChooseUsImage.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            style={{ objectPosition: whyChooseUsImage.position }}
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => setVideoOpen(true)}
            aria-label={t("playVideo")}
            className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-plum/70 text-white ring-1 ring-white/40 backdrop-blur-sm transition-colors hover:bg-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Play size={22} aria-hidden="true" className="ml-0.5 fill-current" />
          </button>
        </div>
      </div>

      <VideoLightbox open={videoOpen} onClose={() => setVideoOpen(false)} title={t("title")} />
    </section>
  );
}
