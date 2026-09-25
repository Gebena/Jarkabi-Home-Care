import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  // Serwist injects sw-entry into the app bundle and breaks Payload /admin
  // hydration on Vercel production. Re-enable once scoped to public routes only.
  disable: true,
});

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "jarkabi.ca" },
    ],
  },
};

export default withSerwist(withPayload(withNextIntl(nextConfig)));
