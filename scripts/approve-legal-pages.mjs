#!/usr/bin/env node
/**
 * Mark all legal-pages as counsel-approved in the connected database.
 *
 * Usage (production DATABASE_URI required):
 *   node scripts/approve-legal-pages.mjs
 */
import { spawnSync } from "node:child_process";

const res = spawnSync("npx", ["tsx", "scripts/approve-legal-pages.ts"], {
  stdio: "inherit",
  env: process.env,
});

process.exit(res.status ?? 1);
