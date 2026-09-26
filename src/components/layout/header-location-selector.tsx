"use client";

import type { ProvinceData } from "@/lib/cms";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";

type HeaderLocationSelectorProps = {
  locale: string;
  provinces: ProvinceData[];
  className?: string;
  overlay?: boolean;
};

export function HeaderLocationSelector({
  locale,
  provinces,
  className,
  overlay = false,
}: HeaderLocationSelectorProps) {
  const t = useTranslations("nav");
  const router = useRouter();
  const selectId = useId();

  const servable = useMemo(
    () => provinces.filter((p) => p.status === "active" || p.status === "coming_soon"),
    [provinces],
  );

  const [slug, setSlug] = useState(servable[0]?.slug ?? "");

  if (servable.length === 0) return null;

  return (
    <form
      className={cn("hidden items-center lg:flex", className)}
      onSubmit={(event) => {
        event.preventDefault();
        if (slug) router.push(`/${locale}/locations/${slug}`);
      }}
    >
      <label htmlFor={selectId} className="sr-only">
        {t("locationSelector")}
      </label>
      <div className="relative flex items-center">
        <MapPin
          size={14}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute left-2.5",
            overlay ? "text-white/80" : "text-plum/70",
          )}
        />
        <select
          id={selectId}
          value={slug}
          onChange={(event) => {
            const next = event.target.value;
            setSlug(next);
            if (next) router.push(`/${locale}/locations/${next}`);
          }}
          className={cn(
            "h-9 max-w-[9.5rem] truncate py-1.5 pl-8 pr-7 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink xl:max-w-[11rem]",
            overlay
              ? "border border-white/35 bg-white/10 text-white backdrop-blur-sm"
              : "border border-line bg-white text-ink",
          )}
        >
          {servable.map((province) => (
            <option key={province.slug} value={province.slug}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
