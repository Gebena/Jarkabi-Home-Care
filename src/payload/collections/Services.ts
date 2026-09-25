import type { CollectionConfig } from "payload";
import { pageBlocks } from "../blocks";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "published"],
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "summary", type: "textarea", localized: true },
    {
      name: "category",
      type: "select",
      defaultValue: "daily-living",
      options: [
        { label: "Daily Living", value: "daily-living" },
        { label: "Clinical Care", value: "clinical" },
        { label: "Specialty Care", value: "specialty" },
      ],
    },
    { name: "icon", type: "text", admin: { description: "Icon key or emoji placeholder" } },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "sortOrder", type: "number", defaultValue: 0 },
    { name: "published", type: "checkbox", defaultValue: true },
    {
      name: "blocks",
      type: "blocks",
      localized: true,
      blocks: pageBlocks,
    },
    { name: "seoTitle", type: "text", localized: true },
    { name: "seoDescription", type: "textarea", localized: true },
  ],
};
