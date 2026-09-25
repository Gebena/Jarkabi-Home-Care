#!/usr/bin/env node
/**
 * Verifies every photograph referenced by src/lib/site-images.ts exists in
 * public/, and reports anything in public/images/photography that nothing
 * references.
 *
 * The site has twice shipped broken imagery — a 404 hero, then an opera house on
 * a service card — because a path was edited without anyone loading the page.
 * Run this after editing the set.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../", import.meta.url);
const source = readFileSync(new URL("src/lib/site-images.ts", root), "utf8");
const publicDir = new URL("public", root).pathname;
const photoDir = join(publicDir, "images", "photography");

// `local()` composes each path from the shared DIR constant, so read both.
const dir = source.match(/^const DIR = "([^"]+)";$/m)?.[1];
const names = [...new Set([...source.matchAll(/\blocal\(\s*"([\w-]+)"/g)].map(([, name]) => name))];

if (!dir || names.length === 0) {
  console.error("Could not read the image set out of src/lib/site-images.ts");
  process.exit(1);
}

const referenced = names.map((name) => `${dir}/${name}.webp`);

console.log(`Checking ${referenced.length} referenced image(s)…\n`);

const missing = [];
for (const path of referenced.sort()) {
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

const onDisk = readdirSync(photoDir).map((name) => `/images/photography/${name}`);
const unused = onDisk.filter((path) => !referenced.includes(path));

if (unused.length > 0) {
  console.log(`\n${unused.length} file(s) in public/images/photography are unreferenced:`);
  for (const path of unused.sort()) console.log(`     ${path}`);
}

if (missing.length > 0) {
  console.error(`\n${missing.length} image(s) missing or empty.`);
  process.exit(1);
}

console.log(`\nAll ${referenced.length} images present.`);
