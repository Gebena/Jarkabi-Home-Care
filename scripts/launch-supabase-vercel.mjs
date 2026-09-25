#!/usr/bin/env node
/**
 * One-shot: provision Supabase + set DATABASE_URI on Vercel + print redeploy steps.
 *
 * Required secrets:
 *   SUPABASE_ACCESS_TOKEN — https://supabase.com/dashboard/account/tokens
 *   VERCEL_TOKEN — optional if you set DATABASE_URI manually in Vercel dashboard
 *
 * Usage:
 *   node scripts/launch-supabase-vercel.mjs
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

function run(script, args = []) {
  const res = spawnSync("node", [script, ...args], {
    stdio: "inherit",
    env: process.env,
  });
  if (res.status !== 0) process.exit(res.status ?? 1);
}

console.log("Step 1/3 — Provision Supabase project jarkabi-home-care…\n");
run("scripts/provision-supabase.mjs");

const uriFile = "/tmp/jarkabi-database-uri.txt";
if (!existsSync(uriFile)) {
  console.error("✗ Missing /tmp/jarkabi-database-uri.txt after provision");
  process.exit(1);
}

console.log("\nStep 2/3 — Set DATABASE_URI on Vercel…\n");
if (process.env.VERCEL_TOKEN?.trim()) {
  run("scripts/set-vercel-database-uri.mjs", ["--from-file", uriFile]);
} else {
  console.log("VERCEL_TOKEN not set — set DATABASE_URI manually:");
  console.log("  Vercel → jarkabi-home-care → Environment Variables");
  console.log(`  DATABASE_URI = ${readFileSync(uriFile, "utf8").trim()}`);
}

console.log("\nStep 3/3 — Redeploy production in Vercel dashboard, then verify:");
console.log("  https://jarkabi.ca/api/health  → database: postgresql");
console.log("  https://jarkabi.ca/admin");
