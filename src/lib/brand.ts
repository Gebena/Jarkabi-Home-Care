/** Bracketed CMS defaults like `[PRIMARY PHONE]` — hide on public UI until replaced. */
export function isBrandPlaceholder(value: string): boolean {
  return /^\s*\[.*\]\s*$/.test(value);
}

export function isDisplayablePhone(phone: string): boolean {
  if (isBrandPlaceholder(phone)) return false;
  return phone.replace(/\D/g, "").length > 3;
}

/** Whether a NAP field has a real value (not a bracketed CMS placeholder). */
export function hasNapValue(value: string): boolean {
  return !isBrandPlaceholder(value) && value.trim().length > 0;
}

/** Reserved empty slot for phone/address until Jarkabi supplies values. */
export function napDisplayValue(value: string): string {
  return hasNapValue(value) ? value : "";
}

export const defaultBrand = {
  agencyName: "Jarkabi Home Care",
  tagline: "Exceptional Care. Right at Home.",
  primaryPhone: "[PRIMARY PHONE]",
  tollFreePhone: "[TOLL-FREE PHONE]",
  email: "care@jarkabi.ca",
  websiteUrl: "https://jarkabi.ca",
  /**
   * A real value rather than a bracketed placeholder, because the footer was
   * already publishing these hours from a translation string. Two sources that
   * disagreed meant the contact band showed "[BUSINESS HOURS]" beside a footer
   * quoting specific times.
   */
  businessHours: "Mon–Fri: 8:00 AM – 6:00 PM · Sat: 9:00 AM – 2:00 PM",
  ottawaOfficeAddress: "[OTTAWA OFFICE ADDRESS]",
};

import type { ServiceCategory } from "@/lib/services-config";

export type DefaultService = {
  slug: string;
  category: ServiceCategory;
  featured: boolean;
  sortOrder: number;
  title: { en: string; fr: string };
  summary: { en: string; fr: string };
  /**
   * Makes a regulated or clinical claim that needs professional sign-off before
   * publication. Tracked as data rather than a "[REVIEW REQUIRED]" string inside
   * `summary`, which rendered the marker onto public service cards.
   */
  reviewRequired?: true;
};

export const defaultServices: DefaultService[] = [
  {
    slug: "personal-care",
    category: "daily-living",
    featured: true,
    sortOrder: 10,
    title: { en: "Personal Care", fr: "Soins personnels" },
    summary: {
      en: "Respectful assistance with bathing, dressing, grooming and mobility.",
      fr: "Aide respectueuse pour le bain, l'habillage, la toilette et la mobilité.",
    },
  },
  {
    slug: "senior-home-care",
    category: "daily-living",
    featured: true,
    sortOrder: 20,
    title: { en: "Senior Home Care", fr: "Soins à domicile pour personnes âgées" },
    summary: {
      en: "Support that helps seniors live safely and independently at home.",
      fr: "Soutien pour aider les personnes âgées à vivre en sécurité et en toute indépendance à domicile.",
    },
  },
  {
    slug: "companion-care",
    category: "daily-living",
    featured: false,
    sortOrder: 30,
    title: { en: "Companion Care", fr: "Soins de compagnie" },
    summary: {
      en: "Meaningful companionship, conversation and shared activities.",
      fr: "Compagnie significative, conversation et activités partagées.",
    },
  },
  {
    slug: "registered-nursing",
    category: "clinical",
    featured: true,
    sortOrder: 40,
    title: { en: "Registered Nursing", fr: "Soins infirmiers autorisés" },
    reviewRequired: true,
    summary: {
      en: "Skilled nursing support at home, coordinated with your healthcare team.",
      fr: "Soins infirmiers qualifiés à domicile, coordonnés avec votre équipe de santé.",
    },
  },
  {
    slug: "dementia-support",
    category: "specialty",
    featured: true,
    sortOrder: 50,
    title: { en: "Dementia Support", fr: "Soutien à la démence" },
    summary: {
      en: "Routine, familiarity and caregiver consistency for cognitive support.",
      fr: "Routine, familiarité et continuité des soignants pour le soutien cognitif.",
    },
  },
  {
    slug: "respite-care",
    category: "specialty",
    featured: false,
    sortOrder: 60,
    title: { en: "Respite Care", fr: "Soins de répit" },
    summary: {
      en: "Temporary relief for family caregivers who need rest and peace of mind.",
      fr: "Répit temporaire pour les aidants familiaux qui ont besoin de repos et de tranquillité d'esprit.",
    },
  },
  {
    slug: "post-hospital-care",
    category: "specialty",
    featured: false,
    sortOrder: 70,
    title: { en: "Post-Hospital Care", fr: "Soins post-hospitalisation" },
    reviewRequired: true,
    summary: {
      en: "Support after surgery, hospitalization or illness while recovering at home.",
      fr: "Soutien après une chirurgie, une hospitalisation ou une maladie pendant la récupération à domicile.",
    },
  },
  {
    slug: "palliative-care",
    category: "specialty",
    featured: false,
    sortOrder: 80,
    title: { en: "Palliative & Comfort Support", fr: "Soins palliatifs et de confort" },
    reviewRequired: true,
    summary: {
      en: "Comfort-focused support with dignity, companionship and family coordination.",
      fr: "Soutien axé sur le confort, la dignité, la compagnie et la coordination familiale.",
    },
  },
];

export const provincesSeed = [
  { code: "ON", slug: "ontario", name: { en: "Ontario", fr: "Ontario" }, status: "active" as const },
  { code: "QC", slug: "quebec", name: { en: "Quebec", fr: "Québec" }, status: "coming_soon" as const },
  { code: "BC", slug: "british-columbia", name: { en: "British Columbia", fr: "Colombie-Britannique" }, status: "not_served" as const },
  { code: "AB", slug: "alberta", name: { en: "Alberta", fr: "Alberta" }, status: "not_served" as const },
  { code: "SK", slug: "saskatchewan", name: { en: "Saskatchewan", fr: "Saskatchewan" }, status: "not_served" as const },
  { code: "MB", slug: "manitoba", name: { en: "Manitoba", fr: "Manitoba" }, status: "not_served" as const },
  { code: "NB", slug: "new-brunswick", name: { en: "New Brunswick", fr: "Nouveau-Brunswick" }, status: "not_served" as const },
  { code: "NS", slug: "nova-scotia", name: { en: "Nova Scotia", fr: "Nouvelle-Écosse" }, status: "not_served" as const },
  { code: "PE", slug: "prince-edward-island", name: { en: "Prince Edward Island", fr: "Île-du-Prince-Édouard" }, status: "not_served" as const },
  { code: "NL", slug: "newfoundland-and-labrador", name: { en: "Newfoundland and Labrador", fr: "Terre-Neuve-et-Labrador" }, status: "not_served" as const },
];

export const ottawaCities = [
  "ottawa",
  "kanata",
  "nepean",
  "barrhaven",
  "orleans",
  "gloucester",
  "stittsville",
  "rockland",
  "manotick",
];
