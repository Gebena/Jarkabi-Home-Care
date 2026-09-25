import {
  Brain,
  Clock,
  Heart,
  Home,
  Hospital,
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
  "personal-care": Heart,
  "senior-home-care": Home,
  "companion-care": Users,
  "registered-nursing": Stethoscope,
  "dementia-support": Brain,
  "respite-care": Clock,
  "post-hospital-care": Hospital,
  "palliative-care": Heart,
};

/** Legacy or marketing slugs → canonical CMS slug */
export const serviceSlugRedirects: Record<string, string> = {
  nursing: "registered-nursing",
  "dementia-care": "dementia-support",
};

export function resolveServiceSlug(slug: string): string {
  return serviceSlugRedirects[slug] ?? slug;
}

export function getCategoryLabel(category: ServiceCategory, locale: string): string {
  const lang = locale in serviceCategories[category].label ? locale : "en";
  return serviceCategories[category].label[lang as "en" | "fr"] ?? serviceCategories[category].label.en;
}
