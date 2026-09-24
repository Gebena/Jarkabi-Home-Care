import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Super Administrator", value: "super_admin" },
        { label: "National Administrator", value: "national_admin" },
        { label: "Provincial Administrator", value: "provincial_admin" },
        { label: "Content Editor", value: "editor" },
        { label: "Translator", value: "translator" },
        { label: "Care Coordinator", value: "care_coordinator" },
        { label: "Recruitment / HR", value: "hr" },
      ],
    },
    { name: "firstName", type: "text" },
    { name: "lastName", type: "text" },
  ],
};
