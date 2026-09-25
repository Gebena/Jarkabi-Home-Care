import { defaultBrand } from "@/lib/brand";
import type { GlobalConfig } from "payload";

export const BrandSettings: GlobalConfig = {
  slug: "brand-settings",
  label: "Brand Settings",
  fields: [
    { name: "agencyName", type: "text", defaultValue: "Jarkabi Home Care" },
    { name: "tagline", type: "text", localized: true, defaultValue: "Exceptional Care. Right at Home." },
    { name: "primaryPhone", type: "text", defaultValue: "[PRIMARY PHONE]" },
    { name: "tollFreePhone", type: "text", defaultValue: "[TOLL-FREE PHONE]" },
    { name: "email", type: "email", defaultValue: "care@jarkabi.ca" },
    { name: "websiteUrl", type: "text", defaultValue: "https://jarkabi.ca" },
    {
      name: "businessHours",
      type: "text",
      localized: true,
      // Not a bracketed placeholder: the footer publishes these hours, so an
      // unset field would contradict copy the site already shows.
      defaultValue: defaultBrand.businessHours,
    },
    { name: "ottawaOfficeAddress", type: "textarea", defaultValue: "[OTTAWA OFFICE ADDRESS]" },
    { name: "yearsOfExperience", type: "text", defaultValue: "[YEARS OF EXPERIENCE]" },
    { name: "registrations", type: "textarea", defaultValue: "[REGISTRATIONS]" },
    { name: "memberships", type: "textarea", defaultValue: "[MEMBERSHIPS]" },
    { name: "accreditations", type: "textarea", defaultValue: "[ACCREDITATIONS]" },
    { name: "insuranceInfo", type: "textarea", defaultValue: "[INSURANCE INFORMATION]" },
    // A `colors` group used to sit here holding Seniar's navy/sage/gold. Nothing
    // read it, so editing it changed nothing while suggesting otherwise. The
    // palette lives in styles/caregiver-interface.css.
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "platform", type: "text" },
        { name: "url", type: "text" },
      ],
    },
  ],
};
