#!/usr/bin/env node
/**
 * Database + NAP go-live checklist for Jarkabi Home Care.
 *
 * Usage:
 *   npm run go-live:database
 *   DATABASE_URI=postgresql://... npm run go-live:database
 */
import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

const uri = process.env.DATABASE_URI?.trim();

console.log("Jarkabi — database & NAP go-live checklist\n");

console.log("1. Supabase Postgres (Canada Central)");
if (!uri) {
  console.log("   ✗ DATABASE_URI is not set in this shell");
  console.log("   → Provision: SUPABASE_ACCESS_TOKEN=... npm run supabase:provision");
  console.log("   → Or one-shot:  SUPABASE_ACCESS_TOKEN=... npm run supabase:launch");
} else {
  const res = spawnSync("node", ["scripts/verify-supabase-connection.mjs"], {
    stdio: "inherit",
    env: process.env,
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

console.log("\n2. Vercel production env");
console.log("   Required:");
console.log("     DATABASE_URI          — Supabase transaction pooler (port 6543)");
console.log("     PAYLOAD_SECRET        — random 32+ char secret");
console.log("   Optional NAP overrides (until Payload Brand Settings edited):");
console.log("     JARKABI_PRIMARY_PHONE");
console.log("     JARKABI_TOLL_FREE_PHONE");
console.log("     JARKABI_OTTAWA_OFFICE_ADDRESS");
console.log("   Verify: npm run verify:vercel-env");

if (existsSync("scripts/set-vercel-database-uri.mjs") && uri) {
  console.log("\n   To push DATABASE_URI to Vercel:");
  console.log("     VERCEL_TOKEN=... node scripts/set-vercel-database-uri.mjs");
}

console.log("\n3. After deploy");
console.log("   https://jarkabi.ca/api/health  → database: postgresql");
console.log("   https://jarkabi.ca/admin       → rotate admin password");
console.log("   Payload → Brand Settings       → confirm phone & Ottawa address");
console.log("\n4. Full site check: npm run verify:go-live");
