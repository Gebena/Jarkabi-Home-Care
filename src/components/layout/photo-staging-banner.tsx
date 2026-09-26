"use client";

import { photosAreStaging } from "@/lib/site-photos";
import { Camera } from "lucide-react";
import { useTranslations } from "next-intl";

/** Honest disclosure while AI placeholder photography is still in use. */
export function PhotoStagingBanner() {
  const t = useTranslations("photoBanner");

  if (!photosAreStaging()) {
    return null;
  }

  return (
    <div
      role="status"
      className="border-b border-line bg-blush-soft px-4 py-2.5 text-sm text-plum"
    >
      <div className="mx-auto flex w-[min(1240px,calc(100%-2rem))] items-start gap-3">
        <Camera size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-tan-ink" />
        <div>
          <p className="font-semibold">{t("title")}</p>
          <p className="mt-0.5 leading-relaxed text-body">{t("body")}</p>
        </div>
      </div>
    </div>
  );
}
