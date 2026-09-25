import { caregiverImage } from "@/lib/caregiver-assets";
import { careGiverServiceMenu } from "@/lib/service-menu";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type PillarsSectionProps = {
  locale: string;
};

const pillarPhotos = [
  caregiverImage("resource/service-1.jpg"),
  caregiverImage("resource/service-2.jpg"),
  caregiverImage("resource/service-3.jpg"),
];

const pillarLinks = [
  careGiverServiceMenu[0].slug,
  careGiverServiceMenu[1].slug,
  careGiverServiceMenu[6].slug,
];

const pillarOverlays = [
  "var(--cg-pillar-teal)",
  "var(--cg-pillar-brick)",
  "var(--cg-pillar-ocean)",
] as const;

/**
 * Care Giver `service-block` Enrich / Empower / Engage — full-bleed photos with
 * demo-exact colour washes; hover lifts copy and reveals the pill CTA.
 */
export function PillarsSection({ locale }: PillarsSectionProps) {
  const intro = useTranslations("intro");
  const t = useTranslations("pillars");

  const pillars = [
    { title: t("oneTitle"), body: t("oneBody") },
    { title: t("twoTitle"), body: t("twoBody") },
    { title: t("threeTitle"), body: t("threeBody") },
  ];

  return (
    <section className="relative bg-mist pt-16 lg:pt-[5.625rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-[8.75rem] w-full bg-gradient-to-b from-transparent to-white"
      />

      <div className="relative mx-auto w-[min(1240px,calc(100%-2rem))] pb-12 text-center lg:pb-[3.125rem]">
        <h2 className="mx-auto max-w-4xl font-display text-2xl text-ink sm:text-3xl lg:text-[2.35rem]">
          {intro("headline")}
        </h2>

        <p className="mx-auto mt-4 max-w-3xl font-display text-lg italic leading-relaxed text-ink-soft lg:text-[1.375rem]">
          {intro("body")}
        </p>

        <Link
          href={`/${locale}/about`}
          className="relative z-20 mt-8 inline-block border border-tan px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-tan-ink transition-colors hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
        >
          {intro("cta")}
        </Link>
      </div>

      <div className="relative z-20 mx-auto grid w-[min(1240px,calc(100%-2rem))] pb-16 sm:grid-cols-2 lg:grid-cols-3 lg:pb-20">
        {pillars.map((pillar, i) => (
          <article
            key={pillar.title}
            className="group relative isolate min-h-[17rem] overflow-hidden text-center"
          >
            <Image
              src={pillarPhotos[i]}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-opacity duration-700"
              style={{ backgroundColor: pillarOverlays[i] }}
            />

            <div className="relative flex min-h-[17rem] flex-col items-center justify-center px-8 py-14">
              <div className="transition-all duration-700 group-hover:-translate-y-6 group-hover:pb-10">
                <h3 className="font-display text-[2.5rem] font-bold leading-tight text-white">
                  {pillar.title}
                </h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/90 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  {pillar.body}
                </p>
                <div className="mt-6 opacity-0 transition-all duration-700 group-hover:opacity-100">
                  <Link
                    href={`/${locale}/services/${pillarLinks[i]}`}
                    className="inline-flex items-center gap-2 rounded-full bg-plum-footer px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-tan hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {t("typeOfCareCta")}
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
