#!/usr/bin/env node
/**
 * Sync production env vars to the Vercel project dashboard.
 *
 * Required: VERCEL_TOKEN (https://vercel.com/account/tokens)
 * Optional: VERCEL_TEAM_ID, VERCEL_PROJECT_ID
 *
 * Usage:
 *   VERCEL_TOKEN=... npm run vercel:sync-env
 */
const TOKEN = process.env.VERCEL_TOKEN?.trim();
const TEAM_ID = process.env.VERCEL_TEAM_ID?.trim() || "team_qX08nFTSvAkE2N7dwdgkeLKw";
const PROJECT = process.env.VERCEL_PROJECT_ID?.trim() || "jarkabi-home-care";

const PRODUCTION_VARS = {
  NEXT_PUBLIC_SERVER_URL: "https://jarkabi.ca",
  CARE_INQUIRY_EMAIL: "care@jarkabi.ca",
  CANONICAL_SITE_HOST: "jarkabi.ca",
};

const SECRET_VARS_DOC = [
  "DATABASE_URI",
  "PAYLOAD_SECRET",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
];

async function api(path, init = {}) {
  const url = new URL(`https://api.vercel.com${path}`);
  if (TEAM_ID) url.searchParams.set("teamId", TEAM_ID);
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
    const msg = body?.error?.message || res.statusText;
    throw new Error(`${init.method || "GET"} ${path} → ${res.status}: ${msg}`);
  }
  return body;
}

async function listEnv() {
  const data = await api(`/v10/projects/${PROJECT}/env`);
  return data.envs ?? [];
}

async function upsertEnv(key, value) {
  const existing = (await listEnv()).find((e) => e.key === key);
  if (existing) {
    await api(`/v9/projects/${PROJECT}/env/${existing.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        key,
        value,
        type: existing.type || "encrypted",
        target: existing.target ?? ["production", "preview", "development"],
      }),
    });
    console.log(`✓ Updated ${key}`);
    return;
  }

  await api(`/v10/projects/${PROJECT}/env?upsert=true`, {
    method: "POST",
    body: JSON.stringify({
      key,
      value,
      type: "encrypted",
      target: ["production", "preview", "development"],
    }),
  });
  console.log(`+ Added ${key}`);
}

async function main() {
  if (!TOKEN) {
    console.error("VERCEL_TOKEN is required — create one at https://vercel.com/account/tokens");
    process.exit(1);
  }

  console.log(`Syncing env to project "${PROJECT}" (team ${TEAM_ID})…\n`);

  for (const [key, value] of Object.entries(PRODUCTION_VARS)) {
    await upsertEnv(key, value);
  }

  console.log("\nSet these secrets manually in Vercel dashboard:");
  for (const key of SECRET_VARS_DOC) {
    console.log(`  - ${key}`);
  }
  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
