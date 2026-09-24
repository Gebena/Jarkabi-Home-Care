import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "video/*", "application/pdf"],
  },
  fields: [
    { name: "alt", type: "text", localized: true },
    { name: "caption", type: "text", localized: true },
  ],
};
