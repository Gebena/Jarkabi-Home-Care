export const defaultBrand = {
  agencyName: "Jarkabi Home Care",
  tagline: "Exceptional Care. Right at Home.",
  primaryPhone: "[PRIMARY PHONE]",
  tollFreePhone: "[TOLL-FREE PHONE]",
  email: "care@jarkabi.ca",
  websiteUrl: "https://jarkabi.ca",
  businessHours: "[BUSINESS HOURS]",
  ottawaOfficeAddress: "[OTTAWA OFFICE ADDRESS]",
};

export const defaultServices = [
  {
    slug: "personal-care",
    title: { en: "Personal Care", fr: "Soins personnels" },
    summary: {
      en: "Respectful assistance with bathing, dressing, grooming and mobility.",
      fr: "Aide respectueuse pour le bain, l'habillage, la toilette et la mobilité.",
    },
  },
  {
    slug: "senior-home-care",
    title: { en: "Senior Home Care", fr: "Soins à domicile pour personnes âgées" },
    summary: {
      en: "Support that helps seniors live safely and independently at home.",
      fr: "Soutien pour aider les personnes âgées à vivre en sécurité et en toute indépendance à domicile.",
    },
  },
  {
    slug: "companion-care",
    title: { en: "Companion Care", fr: "Soins de compagnie" },
    summary: {
      en: "Meaningful companionship, conversation and shared activities.",
      fr: "Compagnie significative, conversation et activités partagées.",
    },
  },
  {
    slug: "registered-nursing",
    title: { en: "Registered Nursing", fr: "Soins infirmiers autorisés" },
    summary: {
      en: "Professional nursing services where legally and operationally appropriate. [REVIEW REQUIRED]",
      fr: "Services infirmiers professionnels lorsque légalement et opérationnellement appropriés. [REVIEW REQUIRED]",
    },
  },
  {
    slug: "dementia-support",
    title: { en: "Dementia Support", fr: "Soutien à la démence" },
    summary: {
      en: "Routine, familiarity and caregiver consistency for cognitive support.",
      fr: "Routine, familiarité et continuité des soignants pour le soutien cognitif.",
    },
  },
  {
    slug: "respite-care",
    title: { en: "Respite Care", fr: "Soins de répit" },
    summary: {
      en: "Temporary relief for family caregivers who need rest and peace of mind.",
      fr: "Répit temporaire pour les aidants familiaux qui ont besoin de repos et de tranquillité d'esprit.",
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
