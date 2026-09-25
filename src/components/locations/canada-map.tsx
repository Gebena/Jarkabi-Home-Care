import type { ProvinceData } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Status = ProvinceData["status"];

/**
 * Status is carried by a word plus a shape, never by colour alone, so the grid
 * stays readable for someone who cannot distinguish the chips.
 */
const chipTone: Record<Status, string> = {
  active: "border-care-teal bg-care-teal text-white",
  coming_soon: "border-tan-ink bg-blush-soft text-tan-ink",
  paused: "border-line bg-mist text-body",
  not_served: "border-line bg-mist text-body",
};

type CanadaMapProps = {
  provinces: ProvinceData[];
  locale: string;
};

export async function CanadaMap({ provinces, locale }: CanadaMapProps) {
  const t = await getTranslations({ locale, namespace: "provincePage" });
  const tList = await getTranslations({ locale, namespace: "locationsPage" });
  const base = `/${locale}/locations`;

  if (provinces.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-2xl text-ink">{tList("mapTitle")}</h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-body">{tList("mapLead")}</p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {provinces.map((province) => {
          const status = province.status;
          const served = status === "active" || status === "coming_soon";

          return (
            <li key={province.slug}>
              <Link
                href={`${base}/${province.slug}`}
                className="group flex h-full items-start justify-between gap-4 border border-line bg-white p-5 transition-colors hover:border-tan focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink"
              >
                <span>
                  <span className="block font-display text-lg text-ink">{province.name}</span>
                  <span
                    className={cn(
                      "mt-2 inline-block border px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-[0.1em]",
                      chipTone[status],
                    )}
                  >
                    {t(`status.${status}`)}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className={cn(
                    "mt-1 shrink-0 transition-transform group-hover:translate-x-1 rtl:-scale-x-100",
                    served ? "text-tan-ink" : "text-body",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
