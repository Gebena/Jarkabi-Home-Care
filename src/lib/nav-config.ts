export type NavLink = { key: string; href: string };

/**
 * Primary header navigation — spec §32.
 * Care Giver Home Page 01 uses a compact inline bar; these eight items map to
 * Jarkabi's information architecture while preserving the same visual density.
 */
export const mainNav: NavLink[] = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "howCareWorks", href: "/how-care-works" },
  { key: "whyJarkabi", href: "/why-jarkabi" },
  { key: "resources", href: "/resources" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

/** Supplementary links — footer columns, mobile overflow, and location SEO pages. */
export const secondaryNav: NavLink[] = [
  { key: "locations", href: "/locations" },
  { key: "caregivers", href: "/caregivers" },
  { key: "referrals", href: "/referrals" },
];
