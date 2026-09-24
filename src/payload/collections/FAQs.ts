import type { CollectionConfig } from "payload";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  admin: { useAsTitle: "question" },
  fields: [
    { name: "question", type: "text", localized: true, required: true },
    { name: "answer", type: "textarea", localized: true, required: true },
    {
      name: "category",
      type: "select",
      options: [
        "getting-started",
        "costs",
        "caregivers",
        "nursing",
        "scheduling",
        "privacy",
        "service-areas",
        "employment",
        "languages",
      ],
    },
    { name: "sortOrder", type: "number", defaultValue: 0 },
  ],
};
