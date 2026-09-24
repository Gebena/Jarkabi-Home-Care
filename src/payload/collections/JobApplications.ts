import type { CollectionConfig } from "payload";

export const JobApplications: CollectionConfig = {
  slug: "job-applications",
  admin: {
    useAsTitle: "applicantName",
    defaultColumns: ["applicantName", "job", "province", "status", "createdAt"],
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "applicantName", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", required: true },
    {
      name: "job",
      type: "relationship",
      relationTo: "careers",
    },
    { name: "jobTitle", type: "text" },
    { name: "province", type: "text" },
    { name: "city", type: "text" },
    { name: "coverLetter", type: "textarea" },
    { name: "resume", type: "upload", relationTo: "media" },
    { name: "locale", type: "text" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Reviewing", value: "reviewing" },
        { label: "Closed", value: "closed" },
      ],
    },
  ],
};
