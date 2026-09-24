import type { CollectionConfig } from "payload";

export const Provinces: CollectionConfig = {
  slug: "provinces",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "code", "status"],
  },
  fields: [
    { name: "name", type: "text", localized: true, required: true },
    { name: "slug", type: "text", required: true, unique: true },
    {
      name: "code",
      type: "select",
      required: true,
      options: [
        "ON", "QC", "BC", "AB", "SK", "MB", "NB", "NS", "PE", "NL", "YT", "NT", "NU",
      ],
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
      name: "complianceContent",
      type: "richText",
      localized: true,
      admin: {
        description: "[REVIEW REQUIRED] Province-specific legal and compliance content.",
      },
    },
    { name: "seoTitle", type: "text", localized: true },
    { name: "seoDescription", type: "textarea", localized: true },
    { name: "localPhone", type: "text" },
    { name: "localEmail", type: "email" },
  ],
};
