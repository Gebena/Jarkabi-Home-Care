#!/usr/bin/env node
/**
 * Verifies every photograph referenced by src/lib/site-images.ts exists in public/.
 *
 * Run after editing the licensed image registry.
 */
import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const source = readFileSync(new URL("src/lib/site-images.ts", root), "utf8");
const publicDir = new URL("public", root).pathname;

const licensedPaths = [
  ...new Set(
    [...source.matchAll(/licensed\(\s*"([^"]+)"/g)].map(([, path]) => `/images/caregiver-licensed/${path}`),
  ),
];

const referenced = licensedPaths.sort();

if (referenced.length === 0) {
  console.error("Could not read image paths from src/lib/site-images.ts");
  process.exit(1);
}

console.log(`Checking ${referenced.length} referenced image(s)…\n`);

const missing = [];
for (const path of referenced) {
  const file = join(publicDir, path);
  let size = 0;
  try {
    size = statSync(file).size;
  } catch {
    missing.push(path);
    console.log(`FAIL missing  ${path}`);
    continue;
  }
  if (size === 0) {
    missing.push(path);
    console.log(`FAIL empty    ${path}`);
  } else {
    console.log(`ok   ${String(Math.round(size / 1024)).padStart(4)}K  ${path}`);
  }
}

if (missing.length > 0) {
  console.error(`\n${missing.length} image(s) missing or empty.`);
  process.exit(1);
}

console.log(`\nAll ${referenced.length} images present.`);
