#!/usr/bin/env node
/**
 * Push Payload/Drizzle schema during Vercel production builds.
 * Skips when DATABASE_URI is SQLite (local CI) or unset.
 */
import Module from "node:module";

const originalLoad = Module._load;
Module._load = function patchedLoad(request, parent, isMain) {
  const exports = originalLoad.apply(this, arguments);
  if (request === "@next/env" && exports && !exports.default) {
    exports.default = exports;
  }
  return exports;
};

const databaseUri = process.env.DATABASE_URI?.trim();

if (!databaseUri?.startsWith("postgresql")) {
  console.log("[ensure-schema] Skipping — DATABASE_URI is not Postgres.");
  process.exit(0);
}

if (!process.env.PAYLOAD_SECRET?.trim()) {
  console.error("[ensure-schema] PAYLOAD_SECRET is required for Postgres builds.");
  process.exit(1);
}

Object.assign(process.env, {
  NODE_ENV: "development",
  PAYLOAD_FORCE_DRIZZLE_PUSH: "true",
  CI: "true",
});

async function main() {
  const { getPayload } = await import("payload");
  const { default: config } = await import("../src/payload.config.ts");

  console.log("[ensure-schema] Pushing Payload schema to Supabase…");

  const payload = await getPayload({ config });

  if (typeof payload.db?.destroy === "function") {
    await payload.db.destroy();
  }

  console.log("[ensure-schema] Schema push and seed complete.");
}

main().catch((error) => {
  console.error("[ensure-schema] Failed:", error);
  process.exit(1);
});
