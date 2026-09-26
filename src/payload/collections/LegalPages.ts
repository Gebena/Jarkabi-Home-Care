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
        { label: "Consent Information", value: "consent" },
        { label: "Care Service Disclaimer", value: "care-disclaimer" },
        { label: "Employment Privacy Notice", value: "employment-privacy" },
        { label: "Referral Privacy Notice", value: "referral-privacy" },
        { label: "Feedback & Complaints Policy", value: "feedback-policy" },
      ],
    },
    { name: "body", type: "richText", localized: true },
    {
      name: "reviewRequired",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Enable only while counsel review is still in progress." },
    },
    { name: "published", type: "checkbox", defaultValue: true },
  ],
};
