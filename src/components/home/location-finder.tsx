"use client";

import type { ProvinceData } from "@/lib/cms";
import { locationImages } from "@/lib/site-images";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";

type LocationFinderProps = {
  locale: string;
  provinces: ProvinceData[];
};

/**
 * Care Giver Home Page 01 location finder: an ocean-blue band with tilted photo
 * prints on one side and a beige lookup card on the other.
 */
export function LocationFinder({ locale, provinces }: LocationFinderProps) {
  const t = useTranslations("locationsPreview");
  const router = useRouter();
  const selectId = useId();

  const servable = provinces.filter((p) => p.status === "active" || p.status === "coming_soon");
  const [slug, setSlug] = useState(servable[0]?.slug ?? "");

  if (servable.length === 0) return null;

  return (
    <section className="bg-care-ocean py-16 lg:py-20">
      <div className="mx-auto grid w-[min(1240px,calc(100%-2rem))] items-center gap-12 lg:grid-cols-2">
        <div aria-hidden="true" className="relative hidden h-80 lg:block">
          <div className="absolute left-4 top-0 h-64 w-52 rotate-[-6deg] border-[10px] border-white shadow-elevated">
            <Image
              src={locationImages[0].src}
              alt=""
              fill
              sizes="13rem"
              className="object-cover"
            />
          </div>
          <div className="absolute left-52 top-12 h-64 w-52 rotate-[5deg] border-[10px] border-white shadow-elevated">
            <Image
              src={locationImages[1].src}
              alt=""
              fill
              sizes="13rem"
              className="object-cover"
            />
          </div>
        </div>

        <div className="bg-blush-soft p-8 lg:p-10">
          <h2 className="font-display text-2xl sm:text-3xl">{t("title")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-body">{t("subtitle")}</p>

          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              if (slug) router.push(`/${locale}/locations/${slug}`);
            }}
          >
            <label htmlFor={selectId} className="sr-only">
              {t("eyebrow")}
            </label>
            <select
              id={selectId}
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className="flex-1 border border-line bg-white px-4 py-3.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
            >
              {servable.map((province) => (
                <option key={province.slug} value={province.slug}>
                  {province.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-plum px-8 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-plum-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
            >
              {t("viewAll")}
            </button>
          </form>

          <p className="mt-4 text-xs uppercase tracking-[0.14em] text-plum">{t("servingNow")}</p>
        </div>
      </div>
    </section>
  );
}
