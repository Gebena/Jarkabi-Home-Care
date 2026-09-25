import { careGiverServiceMenu } from "@/lib/service-menu";

export type NavLink = { key: string; href: string };

export type NavDropdownItem = {
  key: string;
  href: string;
};

export type NavEntry =
  | { kind: "link"; key: string; href: string }
  | { kind: "dropdown"; key: string; href: string; items: NavDropdownItem[] };

/**
 * Care Giver Home Page 01 primary navigation with dropdowns.
 * Top-level labels mirror the demo; Jarkabi-only pages stay in footer/secondary nav.
 */
export const mainNavEntries: NavEntry[] = [
  { kind: "link", key: "home", href: "" },
  {
    kind: "dropdown",
    key: "aboutMenu",
    href: "/about",
    items: [
      { key: "about", href: "/about" },
      { key: "team", href: "/team" },
      { key: "faq", href: "/faq" },
      { key: "testimonials", href: "/testimonials" },
    ],
  },
  {
    kind: "dropdown",
    key: "typesOfCare",
    href: "/services",
    items: careGiverServiceMenu.map((item) => ({
      key: item.key,
      href: `/services/${item.slug}`,
    })),
  },
  {
    kind: "dropdown",
    key: "knowledgeCenter",
    href: "/resources",
    items: [
      { key: "resources", href: "/resources" },
      { key: "gallery", href: "/gallery" },
      { key: "howCareWorks", href: "/how-care-works" },
      { key: "careers", href: "/careers" },
    ],
  },
  { kind: "link", key: "contact", href: "/contact" },
];

/** Flat list for search, sitemap helpers, and legacy callers. */
export const mainNav: NavLink[] = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "resources", href: "/resources" },
  { key: "contact", href: "/contact" },
];

/** Supplementary links — footer columns, mobile overflow, and location SEO pages. */
export const secondaryNav: NavLink[] = [
  { key: "howCareWorks", href: "/how-care-works" },
  { key: "whyJarkabi", href: "/why-jarkabi" },
  { key: "locations", href: "/locations" },
  { key: "caregivers", href: "/caregivers" },
  { key: "referrals", href: "/referrals" },
];
