#!/usr/bin/env node
/**
 * Pre-launch checklist: NAP env, Postgres, message markers, photo staging flag.
 *
 * Usage:
 *   npm run verify:production
 *   SMOKE_BASE_URL=https://jarkabi.ca npm run verify:production
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.SMOKE_BASE_URL?.trim() || "https://jarkabi.ca";
const ROOT = process.cwd();
const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function pass(msg) {
  console.log("✓", msg);
}

/** @param {string} dir */
function walkJsonFiles(dir) {
  /** @type {string[]} */
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkJsonFiles(full));
    else if (entry.name.endsWith(".json")) files.push(full);
  }
  return files;
}

console.log("Jarkabi production readiness\n");

for (const file of walkJsonFiles(join(ROOT, "messages"))) {
  const text = readFileSync(file, "utf8");
  if (text.includes("[REVIEW REQUIRED]")) {
    fail(`${file} still contains [REVIEW REQUIRED]`);
  }
  if (text.includes("[JARKABI FACT REQUIRED]")) {
    fail(`${file} still contains [JARKABI FACT REQUIRED]`);
  }
}
if (!errors.some((e) => e.includes("messages"))) {
  pass("Public message files — no [REVIEW REQUIRED] or [JARKABI FACT REQUIRED]");
}

try {
  const res = await fetch(`${BASE}/api/health`, { redirect: "follow" });
  if (!res.ok) {
    fail(`Health ${BASE}/api/health → HTTP ${res.status}`);
  } else {
    const health = await res.json();
    console.log("Health:", JSON.stringify(health, null, 2));

    if (health.database !== "postgresql") {
      fail(
        `DATABASE_URI not Postgres on live deploy (got: ${health.database}). Set Supabase pooler URI on Vercel and redeploy.`,
      );
    } else if (!health.databaseConnected) {
      fail(
        `Postgres configured but not connected${health.databaseError ? `: ${health.databaseError}` : ""}`,
      );
    } else {
      pass("Production database — Postgres connected");
    }

    if (health.launch) {
      if (!health.launch.phone) warn("JARKABI_PRIMARY_PHONE not set on production");
      else pass("NAP — primary phone configured");
      if (!health.launch.address) warn("JARKABI_OTTAWA_OFFICE_ADDRESS not set on production");
      else pass("NAP — Ottawa office address configured");
    }
  }
} catch (err) {
  warn(`Could not reach ${BASE}/api/health (${err.message})`);
}

try {
  const res = await fetch(`${BASE}/en`, { redirect: "follow" });
  const html = await res.text();
  if (!res.ok) fail(`Homepage ${BASE}/en → HTTP ${res.status}`);
  else pass(`Homepage ${BASE}/en → ${res.status}`);

  if (html.includes("[REVIEW REQUIRED]") || html.includes("[JARKABI FACT REQUIRED]")) {
    fail("Homepage HTML contains internal review markers");
  } else {
    pass("Homepage HTML — no review markers");
  }

  if (html.includes("Photography notice") || html.includes("Avis sur la photographie")) {
    warn("Photo staging banner visible (set NEXT_PUBLIC_PHOTOS_STAGING=false after real photos)");
  }
} catch (err) {
  warn(`Could not fetch homepage (${err.message})`);
}

for (const w of warnings) console.warn("⚠", w);
for (const e of errors) console.error("✗", e);

console.log(`\n${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
