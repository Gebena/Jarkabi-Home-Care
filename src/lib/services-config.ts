import {
  Brain,
  Clock,
  Heart,
  Home,
  Hospital,
  Moon,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = "daily-living" | "clinical" | "specialty";

export const serviceCategories: Record<
  ServiceCategory,
  { label: { en: string; fr: string }; description: { en: string; fr: string } }
> = {
  "daily-living": {
    label: { en: "Daily Living", fr: "Vie quotidienne" },
    description: {
      en: "Support for everyday routines, comfort and independence at home.",
      fr: "Soutien pour les routines quotidiennes, le confort et l'autonomie à domicile.",
    },
  },
  clinical: {
    label: { en: "Clinical Care", fr: "Soins cliniques" },
    description: {
      en: "Professional nursing and clinical support where appropriate.",
      fr: "Soins infirmiers et soutien clinique professionnel lorsque approprié.",
    },
  },
  specialty: {
    label: { en: "Specialty Care", fr: "Soins spécialisés" },
    description: {
      en: "Focused support for complex, transitional or family-care needs.",
      fr: "Soutien ciblé pour les besoins complexes, transitionnels ou liés aux aidants familiaux.",
    },
  },
};

export const serviceIcons: Record<string, LucideIcon> = {
  "elderly-care": Home,
  "personal-care": Heart,
  "companion-care": Users,
  "skilled-nursing": Stethoscope,
  "day-support": Moon,
  "hospital-discharge": Hospital,
  "chronic-condition-care": Hospital,
  "after-surgery-care": Hospital,
  "special-needs-care": Brain,
  "respite-care": Clock,
  "end-of-life-care": Heart,
  /** Legacy slugs — icons for redirects and CMS records */
  "senior-home-care": Home,
  "registered-nursing": Stethoscope,
  "dementia-support": Brain,
  "post-hospital-care": Hospital,
  "palliative-care": Heart,
};

/** Legacy or marketing slugs → Care Giver demo slug */
export const serviceSlugRedirects: Record<string, string> = {
  nursing: "skilled-nursing",
  "dementia-care": "special-needs-care",
  "elderly-service": "elderly-care",
  "senior-home-care": "elderly-care",
  "registered-nursing": "skilled-nursing",
  "chronic-care": "chronic-condition-care",
  "chronical-care": "chronic-condition-care",
  "post-hospital-care": "hospital-discharge",
  "palliative-care": "end-of-life-care",
  "life-care": "end-of-life-care",
  "dementia-support": "special-needs-care",
  support: "day-support",
  discharge: "hospital-discharge",
  surgery: "after-surgery-care",
  chronical: "chronic-condition-care",
};

export function resolveServiceSlug(slug: string): string {
  return serviceSlugRedirects[slug] ?? slug;
}

export function getCategoryLabel(category: ServiceCategory, locale: string): string {
  const lang = locale in serviceCategories[category].label ? locale : "en";
  return serviceCategories[category].label[lang as "en" | "fr"] ?? serviceCategories[category].label.en;
}
