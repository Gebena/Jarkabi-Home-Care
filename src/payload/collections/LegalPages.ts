import type { CollectionConfig } from "payload";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "published"],
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "slug",
      type: "select",
      required: true,
      unique: true,
      options: [
        { label: "Privacy Policy", value: "privacy" },
        { label: "Terms of Use", value: "terms" },
        { label: "Accessibility", value: "accessibility" },
        { label: "Cookie Policy", value: "cookies" },
        { label: "Care Service Disclaimer", value: "care-disclaimer" },
      ],
    },
    { name: "body", type: "richText", localized: true },
    {
      name: "reviewRequired",
      type: "checkbox",
      defaultValue: true,
      admin: { description: "Mark until legal professional review is complete." },
    },
    { name: "published", type: "checkbox", defaultValue: false },
  ],
};
