import type { CollectionConfig } from "payload";

export const Cities: CollectionConfig = {
  slug: "cities",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "province", "status"],
  },
  fields: [
    { name: "name", type: "text", localized: true, required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "province",
      type: "relationship",
      relationTo: "provinces",
      required: true,
    },
    {
      name: "region",
      type: "text",
      localized: true,
      admin: { description: "Optional region label (e.g. Ottawa Valley)" },
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
    { name: "officeAddress", type: "textarea" },
    { name: "localPhone", type: "text" },
    { name: "localEmail", type: "email" },
    { name: "intro", type: "richText", localized: true },
    { name: "seoTitle", type: "text", localized: true },
    { name: "seoDescription", type: "textarea", localized: true },
  ],
};
