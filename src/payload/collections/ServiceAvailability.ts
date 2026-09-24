import type { CollectionConfig } from "payload";

export const ServiceAvailability: CollectionConfig = {
  slug: "service-availability",
  admin: {
    useAsTitle: "label",
    defaultColumns: ["service", "province", "city", "status"],
  },
  fields: [
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
      admin: { description: "Optional — leave empty for province-wide availability" },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "not_served",
      options: [
        { label: "Active", value: "active" },
        { label: "Coming Soon", value: "coming_soon" },
        { label: "Paused", value: "paused" },
        { label: "Not Currently Served", value: "not_served" },
      ],
    },
    {
      name: "label",
      type: "text",
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            siblingData.label = `${siblingData.service || "service"}-${siblingData.province || "province"}`;
          },
        ],
      },
    },
  ],
};
