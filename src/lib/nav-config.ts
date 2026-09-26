export type NavLink = { key: string; href: string };

/** Master prompt §25 / §26 — About submenu pages. */
export const aboutSubNav: NavLink[] = [
  { key: "aboutOverview", href: "/about" },
  { key: "whyChooseUs", href: "/why-choose-us" },
  { key: "caregivers", href: "/caregivers" },
  { key: "leadership", href: "/about#leadership" },
  { key: "growingAcrossCanada", href: "/growing-across-canada" },
];

/** Master prompt §25 — main navigation (home is via logo only). */
export const mainNav: NavLink[] = [
  { key: "services", href: "/services" },
  { key: "locations", href: "/locations" },
  { key: "howCareWorks", href: "/how-care-works" },
  { key: "about", href: "/about" },
  { key: "resources", href: "/resources" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

/** Keys that render as a flyout submenu on desktop (see `MainNavDropdown`). */
export const navDropdownKeys = new Set(["about"]);

/** Full set, used by the mobile drawer and the footer. */
export const secondaryNav: NavLink[] = [
  { key: "howCareWorks", href: "/how-care-works" },
  { key: "whyJarkabi", href: "/why-jarkabi" },
  { key: "caregivers", href: "/caregivers" },
  { key: "careers", href: "/careers" },
];
