#!/usr/bin/env node
/**
 * Verify production env configuration (vercel.json + live deployment).
 * Usage: SMOKE_BASE_URL=https://jarkabi.ca npm run verify:vercel-env
 */
import { readFileSync } from "node:fs";

const BASE = process.env.SMOKE_BASE_URL?.trim() || "https://jarkabi.ca";
const REQUIRED_VERCEL_JSON = [
  "NEXT_PUBLIC_SERVER_URL",
  "CARE_INQUIRY_EMAIL",
  "CANONICAL_SITE_HOST",
];

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

let vercel;
try {
  vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
} catch {
  fail("vercel.json missing or invalid JSON");
}

if (vercel) {
  const env = vercel.env ?? {};
  for (const key of REQUIRED_VERCEL_JSON) {
    if (!env[key]?.trim()) fail(`vercel.json env.${key} is missing`);
  }
  if (env.NEXT_PUBLIC_SERVER_URL && !env.NEXT_PUBLIC_SERVER_URL.includes("jarkabi.ca")) {
    fail("vercel.json NEXT_PUBLIC_SERVER_URL should use jarkabi.ca");
  }
}

try {
  const res = await fetch(`${BASE}/api/health`, { redirect: "follow" });
  if (!res.ok) {
    fail(`Health check ${BASE}/api/health → HTTP ${res.status}`);
  } else {
    const data = await res.json();
    console.log("Health:", JSON.stringify(data, null, 2));
    if (!data.ok) fail("Health endpoint returned ok: false");
  }
} catch (err) {
  warn(`Could not reach ${BASE}/api/health (${err.message})`);
}

try {
  const res = await fetch(`${BASE}/en`, { redirect: "follow" });
  if (!res.ok) fail(`Homepage ${BASE}/en → HTTP ${res.status}`);
  else console.log(`✓ Homepage ${BASE}/en → ${res.status}`);
} catch (err) {
  warn(`Could not reach homepage (${err.message})`);
}

for (const w of warnings) console.warn("⚠", w);
for (const e of errors) console.error("✗", e);

if (errors.length) {
  console.error("\nFix errors and redeploy.");
  process.exit(1);
}

console.log("\n✓ Verification passed.");
