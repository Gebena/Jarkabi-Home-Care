export type NavLink = { key: string; href: string };

/**
 * Header navigation. Care Giver Home Page 01 carries five top-level items, so the
 * bar stays on one line; the fuller set of pages is reachable from the footer and
 * from the relevant landing pages.
 */
export const mainNav: NavLink[] = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "locations", href: "/locations" },
  { key: "resources", href: "/resources" },
  { key: "contact", href: "/contact" },
];

/** Full set, used by the mobile drawer and the footer. */
export const secondaryNav: NavLink[] = [
  { key: "howCareWorks", href: "/how-care-works" },
  { key: "whyJarkabi", href: "/why-jarkabi" },
  { key: "caregivers", href: "/caregivers" },
  { key: "careers", href: "/careers" },
];
