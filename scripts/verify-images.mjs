#!/usr/bin/env node
/**
 * Verifies every photograph referenced by src/lib/site-images.ts exists in
 * public/, and reports anything in public/images/photography that nothing
 * references (legacy AI set).
 *
 * Run after editing the licensed or placeholder image registry.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const source = readFileSync(new URL("src/lib/site-images.ts", root), "utf8");
const publicDir = new URL("public", root).pathname;
const photoDir = join(publicDir, "images", "photography");

const licensedPaths = [
  ...new Set(
    [...source.matchAll(/licensed\(\s*"([^"]+)"/g)].map(([, path]) => `/images/caregiver-licensed/${path}`),
  ),
];

const legacyNames = [...new Set([...source.matchAll(/\blocal\(\s*"([\w-]+)"/g)].map(([, name]) => name))];
const legacyDir = source.match(/^const DIR = "([^"]+)";$/m)?.[1];
const legacyPaths = legacyDir ? legacyNames.map((name) => `${legacyDir}/${name}.webp`) : [];

const referenced = [...licensedPaths, ...legacyPaths].sort();

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

try {
  const onDisk = readdirSync(photoDir).map((name) => `/images/photography/${name}`);
  const unused = onDisk.filter((path) => !legacyPaths.includes(path));
  if (unused.length > 0) {
    console.log(`\n${unused.length} legacy file(s) in public/images/photography are unreferenced:`);
    for (const path of unused.sort()) console.log(`     ${path}`);
  }
} catch {
  // photography dir optional once fully on licensed assets
}

if (missing.length > 0) {
  console.error(`\n${missing.length} image(s) missing or empty.`);
  process.exit(1);
}

console.log(`\nAll ${referenced.length} images present.`);
