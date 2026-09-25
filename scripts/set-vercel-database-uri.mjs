#!/usr/bin/env node
/**
 * Set DATABASE_URI on the jarkabi-home-care Vercel project.
 *
 * Usage:
 *   DATABASE_URI="postgresql://..." VERCEL_TOKEN=... node scripts/set-vercel-database-uri.mjs
 *   node scripts/set-vercel-database-uri.mjs --from-file /tmp/jarkabi-database-uri.txt
 */
import { readFileSync } from "node:fs";

const TOKEN = process.env.VERCEL_TOKEN?.trim();
const TEAM_ID = process.env.VERCEL_TEAM_ID?.trim() || "team_qX08nFTSvAkE2N7dwdgkeLKw";
const PROJECT = process.env.VERCEL_PROJECT_ID?.trim() || "jarkabi-home-care";

const fromFile = process.argv.includes("--from-file")
  ? process.argv[process.argv.indexOf("--from-file") + 1]
  : null;

let databaseUri = process.env.DATABASE_URI?.trim();
if (fromFile) {
  databaseUri = readFileSync(fromFile, "utf8").trim();
}

if (!databaseUri?.startsWith("postgresql")) {
  console.error("✗ DATABASE_URI must be a postgresql:// connection string");
  process.exit(1);
}

if (!TOKEN) {
  console.error("✗ VERCEL_TOKEN is required");
  console.error("  Or set DATABASE_URI via Vercel dashboard → jarkabi-home-care → Environment Variables");
  process.exit(1);
}

async function api(path, init = {}) {
  const url = new URL(`https://api.vercel.com${path}`);
  url.searchParams.set("teamId", TEAM_ID);
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body?.error?.message || res.statusText);
  }
  return body;
}

async function main() {
  await api(`/v10/projects/${PROJECT}/env?upsert=true`, {
    method: "POST",
    body: JSON.stringify({
      key: "DATABASE_URI",
      value: databaseUri,
      type: "encrypted",
      target: ["production", "preview", "development"],
      comment: "Supabase Postgres (Transaction pooler, ca-central-1)",
    }),
  });
  console.log("✓ DATABASE_URI set on Vercel project:", PROJECT);
  console.log("  Redeploy production: vercel --prod or Vercel dashboard → Deployments → Redeploy");
}

main().catch((err) => {
  console.error("✗", err.message);
  process.exit(1);
});
