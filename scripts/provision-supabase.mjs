#!/usr/bin/env node
/**
 * Provision a Supabase project for Jarkabi Home Care (Canada Central)
 * and print the DATABASE_URI for Vercel.
 *
 * Required: SUPABASE_ACCESS_TOKEN from https://supabase.com/dashboard/account/tokens
 *
 * Usage:
 *   SUPABASE_ACCESS_TOKEN=sbp_... node scripts/provision-supabase.mjs
 *   SUPABASE_ACCESS_TOKEN=sbp_... node scripts/provision-supabase.mjs --set-vercel
 */
import { randomBytes } from "node:crypto";

const TOKEN = process.env.SUPABASE_ACCESS_TOKEN?.trim();
const SET_VERCEL = process.argv.includes("--set-vercel");
const ORG_ID = process.env.SUPABASE_ORG_ID?.trim();
const DB_PASSWORD = process.env.SUPABASE_DB_PASSWORD?.trim() || randomBytes(24).toString("base64url");
const REGION = process.env.SUPABASE_REGION?.trim() || "ca-central-1";
const REGION_FALLBACKS = ["ca-central-1", "us-east-2", "us-east-1"];

const POOLER_HOST = {
  "ca-central-1": "aws-0-ca-central-1.pooler.supabase.com",
  "us-east-2": "aws-0-us-east-2.pooler.supabase.com",
  "us-east-1": "aws-0-us-east-1.pooler.supabase.com",
};

async function api(path, init = {}) {
  const res = await fetch(`https://api.supabase.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message || body.error || res.statusText);
  }
  return body;
}

async function main() {
  if (!TOKEN) {
    console.error("SUPABASE_ACCESS_TOKEN is required.");
    console.error("Create one at https://supabase.com/dashboard/account/tokens");
    process.exit(1);
  }

  let orgId = ORG_ID;
  if (!orgId) {
    const orgs = await api("/organizations");
    orgId = orgs[0]?.id;
    if (!orgId) throw new Error("No Supabase organization found");
    console.log(`Using organization: ${orgs[0]?.name ?? orgId}`);
  }

  const regionsToTry = [
    REGION,
    ...REGION_FALLBACKS.filter((r) => r !== REGION),
  ];
  let project;
  let usedRegion = REGION;
  for (const region of regionsToTry) {
    try {
      project = await api("/projects", {
        method: "POST",
        body: JSON.stringify({
          organization_id: orgId,
          name: "jarkabi-home-care",
          region,
          db_pass: DB_PASSWORD,
          plan: "free",
        }),
      });
      usedRegion = region;
      break;
    } catch (err) {
      const msg = String(err.message || err);
      const capacity =
        /capacity|region|unavailable|not available/i.test(msg);
      if (!capacity || region === regionsToTry.at(-1)) throw err;
      console.log(`  Region ${region} unavailable, trying next…`);
    }
  }

  const ref = project.ref || project.id;
  console.log(`\n✓ Created Supabase project: ${ref}`);
  console.log(`  URL: https://${ref}.supabase.co`);
  console.log(`  Region: ${usedRegion}`);
  console.log(`  Database password: ${DB_PASSWORD}`);
  console.log("\nSave the password — Supabase will not show it again.");

  // Wait for project to become active
  for (let i = 0; i < 30; i++) {
    const status = await api(`/projects/${ref}`);
    if (status.status === "ACTIVE_HEALTHY") break;
    console.log(`  Waiting for project… (${status.status})`);
    await new Promise((r) => setTimeout(r, 10000));
  }

  const poolerHost =
    POOLER_HOST[usedRegion] ||
    `aws-0-${usedRegion}.pooler.supabase.com`;
  const poolerUri = `postgresql://postgres.${ref}:${encodeURIComponent(DB_PASSWORD)}@${poolerHost}:6543/postgres`;
  console.log(`\nDATABASE_URI (Transaction pooler):\n${poolerUri}`);

  if (SET_VERCEL) {
    console.log("\nSet in Vercel → jarkabi-home-care → Environment Variables:");
    console.log("  DATABASE_URI = (above)");
    console.log("Or connect via Vercel Storage → Supabase (sets POSTGRES_URL; app accepts both).");
    console.log("Then redeploy production.");
  }

  // Write connection string to a temp file for downstream automation (never commit).
  const fs = await import("node:fs/promises");
  await fs.writeFile("/tmp/jarkabi-database-uri.txt", poolerUri, "utf8");
  console.log("\nSaved pooler URI to /tmp/jarkabi-database-uri.txt (for Vercel env sync).");
}

main().catch((err) => {
  console.error("✗", err.message);
  process.exit(1);
});
