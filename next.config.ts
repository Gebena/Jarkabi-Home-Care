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
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  turbopack: {
    root,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "jarkabi.com" }],
        destination: "https://jarkabi.ca/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.jarkabi.com" }],
        destination: "https://jarkabi.ca/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "jarkabi.ca" },
    ],
  },
};

export default withSerwist(withPayload(withNextIntl(nextConfig)));
