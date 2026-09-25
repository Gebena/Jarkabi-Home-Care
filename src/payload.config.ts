import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { buildConfig } from "payload";
import type { Plugin } from "payload";
import { fileURLToPath } from "node:url";
import { BlogPosts } from "./payload/collections/BlogPosts";
import { CareRequests } from "./payload/collections/CareRequests";
import { ContactInquiries } from "./payload/collections/ContactInquiries";
import { Careers } from "./payload/collections/Careers";
import { JobApplications } from "./payload/collections/JobApplications";
import { LegalPages } from "./payload/collections/LegalPages";
import { PricingRates } from "./payload/collections/PricingRates";
import { Cities } from "./payload/collections/Cities";
import { FAQs } from "./payload/collections/FAQs";
import { Media } from "./payload/collections/Media";
import { Pages } from "./payload/collections/Pages";
import { Provinces } from "./payload/collections/Provinces";
import { Referrals } from "./payload/collections/Referrals";
import { ServiceAvailability } from "./payload/collections/ServiceAvailability";
import { Services } from "./payload/collections/Services";
import { TeamMembers } from "./payload/collections/TeamMembers";
import { Testimonials } from "./payload/collections/Testimonials";
import { Users } from "./payload/collections/Users";
import { BrandSettings } from "./payload/globals/BrandSettings";
import { ensurePayloadSchema } from "./lib/ensure-payload-schema";
import { seedDatabase } from "./payload/seed";
import { isPostgresUri, resolveDatabaseUri } from "./lib/database-uri";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const databaseUri = resolveDatabaseUri();

const db =
  isPostgresUri(databaseUri)
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri,
          ssl: databaseUri.includes("supabase.com")
            ? { rejectUnauthorized: false }
            : undefined,
        },
      })
    : sqliteAdapter({
        client: { url: databaseUri },
      });

const blobToken = process.env.BLOB_READ_WRITE_TOKEN?.trim();
const hasValidBlobToken = Boolean(
  blobToken?.startsWith("vercel_blob_rw_"),
);
const plugins: Plugin[] = hasValidBlobToken
  ? [
      vercelBlobStorage({
        collections: { media: true },
        token: blobToken!,
        clientUploads: true,
      }),
    ]
  : [];

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Jarkabi Admin",
    },
  },
  collections: [
    Users,
    Media,
    Provinces,
    Cities,
    Services,
    ServiceAvailability,
    Pages,
    CareRequests,
    ContactInquiries,
    Referrals,
    Careers,
    JobApplications,
    BlogPosts,
    TeamMembers,
    LegalPages,
    PricingRates,
    FAQs,
    Testimonials,
  ],
  onInit: async (payload) => {
    await ensurePayloadSchema(payload);
    await seedDatabase(payload);
  },
  globals: [BrandSettings],
  editor: lexicalEditor(),
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Français", code: "fr" },
      { label: "ትግርኛ", code: "ti" },
      { label: "ብሊን", code: "byn" },
      { label: "ትግረ", code: "tig" },
      { label: "العربية", code: "ar", rtl: true },
      { label: "አማርኛ", code: "am" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  plugins,
  secret: process.env.PAYLOAD_SECRET || "dev-only-change-before-production-32chars",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db,
});
