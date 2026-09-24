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
    { name: "businessHours", type: "text", localized: true, defaultValue: "[BUSINESS HOURS]" },
    { name: "ottawaOfficeAddress", type: "textarea", defaultValue: "[OTTAWA OFFICE ADDRESS]" },
    { name: "yearsOfExperience", type: "text", defaultValue: "[YEARS OF EXPERIENCE]" },
    { name: "registrations", type: "textarea", defaultValue: "[REGISTRATIONS]" },
    { name: "memberships", type: "textarea", defaultValue: "[MEMBERSHIPS]" },
    { name: "accreditations", type: "textarea", defaultValue: "[ACCREDITATIONS]" },
    { name: "insuranceInfo", type: "textarea", defaultValue: "[INSURANCE INFORMATION]" },
    {
      name: "colors",
      type: "group",
      fields: [
        { name: "primary", type: "text", defaultValue: "#1a2b4a" },
        { name: "secondary", type: "text", defaultValue: "#7d9b8a" },
        { name: "accent", type: "text", defaultValue: "#c9a96e" },
        { name: "background", type: "text", defaultValue: "#f8f5f0" },
        { name: "text", type: "text", defaultValue: "#1c1c1c" },
      ],
    },
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
