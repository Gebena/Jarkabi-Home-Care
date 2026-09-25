/**
 * Care Giver "Types Of Care" submenu — one slug per demo HTML file.
 * Order and labels match `index.html` navigation exactly.
 */
export type ServiceMenuItem = {
  /** Translation key under `nav.menuItems.*` */
  key: string;
  slug: string;
  /** Source template file for documentation */
  template: string;
};

export const careGiverServiceMenu: ServiceMenuItem[] = [
  { key: "elderlyCare", slug: "elderly-care", template: "elderly-service.html" },
  { key: "personalCare", slug: "personal-care", template: "personal-care.html" },
  { key: "respiteCare", slug: "respite-care", template: "respite-care.html" },
  { key: "skilledNursing", slug: "skilled-nursing", template: "nursing.html" },
  { key: "daySupport", slug: "day-support", template: "support.html" },
  { key: "hospitalDischarge", slug: "hospital-discharge", template: "discharge.html" },
  { key: "companionCare", slug: "companion-care", template: "care.html" },
  { key: "chronicCondition", slug: "chronic-condition-care", template: "chronical.html" },
  { key: "afterSurgery", slug: "after-surgery-care", template: "surgery.html" },
  { key: "endOfLife", slug: "end-of-life-care", template: "life-care.html" },
  { key: "specialNeeds", slug: "special-needs-care", template: "special-care.html" },
];

export const careGiverServiceSlugs = careGiverServiceMenu.map((item) => item.slug);

export function serviceDetailHref(locale: string, slug: string): string {
  return `/${locale}/services/${slug}`;
}
