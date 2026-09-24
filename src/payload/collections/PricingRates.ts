import type { CollectionConfig } from "payload";

export const PricingRates: CollectionConfig = {
  slug: "pricing-rates",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["service", "province", "city", "published"],
  },
  fields: [
    { name: "label", type: "text", admin: { hidden: true } },
    {
      name: "service",
      type: "relationship",
      relationTo: "services",
      required: true,
    },
    {
      name: "province",
      type: "relationship",
      relationTo: "provinces",
      required: true,
    },
    {
      name: "city",
      type: "relationship",
      relationTo: "cities",
    },
    { name: "caregiverClassification", type: "text" },
    { name: "weekdayRate", type: "text" },
    { name: "weekendRate", type: "text" },
    { name: "holidayRate", type: "text" },
    { name: "overnightRate", type: "text" },
    { name: "minimumVisit", type: "text" },
    { name: "published", type: "checkbox", defaultValue: false },
    {
      name: "notes",
      type: "textarea",
      admin: { description: "Do not publish until administrators activate rates." },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data) {
          data.label = `${data.service || "service"}-${data.province || "province"}`;
        }
        return data;
      },
    ],
  },
};
