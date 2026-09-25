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

/**
 * Care Giver Home Page 01 intro + Enrich/Empower/Engage blocks. Hover reveals
 * body copy and a pill "Type of care" button that links to service detail pages.
 */
export function PillarsSection({ locale }: PillarsSectionProps) {
  const intro = useTranslations("intro");
  const t = useTranslations("pillars");

  const pillars = [
    { title: t("oneTitle"), body: t("oneBody"), wash: "bg-care-teal/85" },
    { title: t("twoTitle"), body: t("twoBody"), wash: "bg-care-brick/85" },
    { title: t("threeTitle"), body: t("threeBody"), wash: "bg-care-ocean/85" },
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
            className="group relative isolate flex min-h-[17rem] flex-col items-center justify-center overflow-hidden px-8 py-14 text-center"
          >
            <Image
              src={pillarPhotos[i]}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="absolute inset-0 -z-20 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className={`absolute inset-0 -z-10 ${pillar.wash} transition-opacity duration-700`}
            />

            <div className="relative flex flex-col items-center transition-transform duration-700 group-hover:-translate-y-5">
              <h3 className="font-display text-3xl text-white lg:text-[2.5rem]">{pillar.title}</h3>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/90 opacity-0 transition-all duration-700 group-hover:opacity-100">
                {pillar.body}
              </p>
              <Link
                href={`/${locale}/services/${pillarLinks[i]}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-plum-footer px-6 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white opacity-0 transition-all duration-700 hover:bg-tan hover:text-plum group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("typeOfCareCta")}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
