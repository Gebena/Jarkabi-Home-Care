import type { CollectionConfig } from "payload";
import { pageBlocks } from "../blocks";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "published"],
  },
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "published", type: "checkbox", defaultValue: false },
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
