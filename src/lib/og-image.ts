import { defaultBrand } from "@/lib/brand";
import { absoluteUrl } from "@/lib/seo";

/** Default Open Graph image — licensed Care Giver hero frame. */
export const defaultOgImagePath = "/images/caregiver-licensed/main-slider/1.jpg";

export function defaultOpenGraphImages() {
  return [
    {
      url: absoluteUrl(defaultOgImagePath),
      width: 1920,
      height: 800,
      alt: `${defaultBrand.agencyName} — compassionate home care in Ottawa`,
    },
  ];
}
