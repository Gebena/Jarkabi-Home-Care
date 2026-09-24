/** Primary navigation — spec §23 (flat, no Seniar dropdowns) */
export type NavLink = { key: string; href: string };

export const mainNav: NavLink[] = [
  { key: "home", href: "" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "howCareWorks", href: "/how-care-works" },
  { key: "whyJarkabi", href: "/why-jarkabi" },
  { key: "locations", href: "/locations" },
  { key: "resources", href: "/resources" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];
