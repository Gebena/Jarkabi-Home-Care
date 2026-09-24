import type { CollectionConfig } from "payload";

export const Careers: CollectionConfig = {
  slug: "careers",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "province", "city", "published"],
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "summary", type: "textarea", localized: true },
    { name: "body", type: "richText", localized: true },
    {
      name: "province",
      type: "relationship",
      relationTo: "provinces",
    },
    {
      name: "city",
      type: "relationship",
      relationTo: "cities",
    },
    {
      name: "profession",
      type: "select",
      options: [
        "Personal Support Worker",
        "Health Care Aide",
        "Registered Nurse",
        "Registered Practical Nurse",
        "Care Coordinator",
        "Clinical Lead",
        "Administrative Team",
      ],
    },
    {
      name: "employmentType",
      type: "select",
      options: ["Full-time", "Part-time", "Casual", "Contract"],
    },
    { name: "published", type: "checkbox", defaultValue: false },
  ],
};
