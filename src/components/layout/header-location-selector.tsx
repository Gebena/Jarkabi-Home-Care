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
};

export function HeaderLocationSelector({
  locale,
  provinces,
  className,
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
        <MapPin size={14} aria-hidden="true" className="pointer-events-none absolute left-2.5 text-plum/70" />
        <select
          id={selectId}
          value={slug}
          onChange={(event) => {
            const next = event.target.value;
            setSlug(next);
            if (next) router.push(`/${locale}/locations/${next}`);
          }}
          className="h-9 max-w-[9.5rem] truncate border border-line bg-white py-1.5 pl-8 pr-7 text-xs font-semibold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tan-ink xl:max-w-[11rem]"
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
