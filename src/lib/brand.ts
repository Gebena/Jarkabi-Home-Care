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

/** Eleven services — one slug per Care Giver demo HTML file (`Types Of Care` menu). */
export const defaultServices: DefaultService[] = [
  {
    slug: "elderly-care",
    category: "daily-living",
    featured: true,
    sortOrder: 10,
    title: { en: "Elderly Care Service", fr: "Soins aux personnes âgées" },
    summary: {
      en: "Support that helps seniors live safely, comfortably and independently at home.",
      fr: "Soutien pour aider les personnes âgées à vivre en sécurité et en confort à domicile.",
    },
  },
  {
    slug: "personal-care",
    category: "daily-living",
    featured: true,
    sortOrder: 20,
    title: { en: "Personal Care", fr: "Soins personnels" },
    summary: {
      en: "Respectful assistance with bathing, dressing, grooming and mobility.",
      fr: "Aide respectueuse pour le bain, l'habillage, la toilette et la mobilité.",
    },
  },
  {
    slug: "respite-care",
    category: "specialty",
    featured: false,
    sortOrder: 30,
    title: { en: "Respite Care", fr: "Soins de répit" },
    summary: {
      en: "Temporary relief for family caregivers who need rest and peace of mind.",
      fr: "Répit temporaire pour les aidants familiaux qui ont besoin de repos et de tranquillité d'esprit.",
    },
  },
  {
    slug: "skilled-nursing",
    category: "clinical",
    featured: true,
    sortOrder: 40,
    title: { en: "Skilled Nursing", fr: "Soins infirmiers spécialisés" },
    reviewRequired: true,
    summary: {
      en: "Professional nursing care at home, coordinated with your healthcare team.",
      fr: "Soins infirmiers professionnels à domicile, coordonnés avec votre équipe de santé.",
    },
  },
  {
    slug: "day-support",
    category: "daily-living",
    featured: false,
    sortOrder: 50,
    title: { en: "24/7 Day Support", fr: "Soutien de jour 24/7" },
    summary: {
      en: "Reliable daytime and overnight presence so your loved one is never alone when needs are highest.",
      fr: "Présence fiable de jour et de nuit pour que votre proche ne soit jamais seul.",
    },
  },
  {
    slug: "hospital-discharge",
    category: "specialty",
    featured: false,
    sortOrder: 60,
    title: { en: "Hospital Discharge", fr: "Sortie d'hospitalisation" },
    reviewRequired: true,
    summary: {
      en: "Coordinated support from hospital bed to home, following discharge instructions closely.",
      fr: "Soutien coordonné du lit d'hôpital au domicile, en suivant les consignes de sortie.",
    },
  },
  {
    slug: "companion-care",
    category: "daily-living",
    featured: false,
    sortOrder: 70,
    title: { en: "Companion Care", fr: "Soins de compagnie" },
    summary: {
      en: "Meaningful companionship, conversation and shared activities.",
      fr: "Compagnie significative, conversation et activités partagées.",
    },
  },
  {
    slug: "chronic-condition-care",
    category: "specialty",
    featured: false,
    sortOrder: 80,
    title: { en: "Chronic Condition Care", fr: "Soins pour maladies chroniques" },
    summary: {
      en: "Steady support for diabetes, COPD, heart failure and other long-term conditions at home.",
      fr: "Soutien continu pour le diabète, la MPOC, l'insuffisance cardiaque et autres maladies chroniques.",
    },
  },
  {
    slug: "after-surgery-care",
    category: "specialty",
    featured: false,
    sortOrder: 90,
    title: { en: "After Surgery Care", fr: "Soins postopératoires" },
    reviewRequired: true,
    summary: {
      en: "Recovery support after surgery — mobility, personal care, meals and medication reminders.",
      fr: "Soutien à la récupération après une chirurgie — mobilité, soins personnels et médicaments.",
    },
  },
  {
    slug: "end-of-life-care",
    category: "specialty",
    featured: false,
    sortOrder: 100,
    title: { en: "End of Life Care", fr: "Soins de fin de vie" },
    reviewRequired: true,
    summary: {
      en: "Comfort-focused support with dignity, companionship and family coordination.",
      fr: "Soutien axé sur le confort, la dignité, la compagnie et la coordination familiale.",
    },
  },
  {
    slug: "special-needs-care",
    category: "specialty",
    featured: true,
    sortOrder: 110,
    title: { en: "Special Needs Care", fr: "Soins spécialisés" },
    summary: {
      en: "Focused support for dementia, cognitive change, and complex daily living needs.",
      fr: "Soutien ciblé pour la démence, les changements cognitifs et les besoins complexes.",
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
