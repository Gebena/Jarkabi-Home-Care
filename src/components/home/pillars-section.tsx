import { caregiverPillarImages } from "@/lib/caregiver-assets";
import { careGiverServiceMenu } from "@/lib/service-menu";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type PillarsSectionProps = {
  locale: string;
};

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
 * colour washes. Title and body stay visible on all three; the pill CTA appears
 * on hover/focus (demo uses visibility on `.link-box`).
 */
export function PillarsSection({ locale }: PillarsSectionProps) {
  const t = useTranslations("pillars");

  const pillars = [
    { title: t("oneTitle"), body: t("oneBody") },
    { title: t("twoTitle"), body: t("twoBody") },
    { title: t("threeTitle"), body: t("threeBody") },
  ];

  return (
    <section className="relative bg-white pt-4 lg:pt-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 z-10 h-[8.75rem] w-full bg-gradient-to-b from-transparent to-white"
      />

      <div className="relative z-20 mx-auto grid w-[min(1240px,calc(100%-2rem))] pb-16 sm:grid-cols-2 lg:grid-cols-3 lg:pb-20">
        {pillars.map((pillar, i) => (
          <article
            key={pillar.title}
            className="group relative isolate min-h-[18.5rem] overflow-hidden text-center sm:min-h-[20rem] lg:min-h-[22rem]"
          >
            <Image
              src={caregiverPillarImages[i]}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundColor: pillarOverlays[i] }}
            />

            <div className="relative flex min-h-[18.5rem] flex-col items-center justify-center px-8 py-12 sm:min-h-[20rem] lg:min-h-[22rem]">
              <div className="flex w-full max-w-xs flex-col items-center">
                <h3 className="font-display text-[2rem] font-bold leading-tight text-white sm:text-[2.35rem] lg:text-[2.5rem]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-white">{pillar.body}</p>

                <div className="mt-6 max-h-0 overflow-hidden opacity-0 transition-all duration-500 motion-safe:group-hover:max-h-16 motion-safe:group-hover:opacity-100 motion-safe:group-focus-within:max-h-16 motion-safe:group-focus-within:opacity-100">
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
