#!/usr/bin/env node
/**
 * Merges English base messages with partial locale files and optional translation patches.
 * Run: node scripts/sync-partial-locales.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const messagesDir = join(root, "messages");
const patchesDir = join(messagesDir, "patches");

const en = JSON.parse(readFileSync(join(messagesDir, "en.json"), "utf8"));
const partialLocales = ["ti", "tig", "byn", "ar", "am"];

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge(base, overlay) {
  const merged = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    if (isPlainObject(value) && isPlainObject(base[key])) {
      merged[key] = deepMerge(base[key], value);
    } else if (value !== undefined && value !== "") {
      merged[key] = value;
    }
  }
  return merged;
}

for (const locale of partialLocales) {
  const localePath = join(messagesDir, `${locale}.json`);
  const patchPath = join(patchesDir, `${locale}.patch.json`);

  const existing = existsSync(localePath)
    ? JSON.parse(readFileSync(localePath, "utf8"))
    : {};

  const patch = existsSync(patchPath) ? JSON.parse(readFileSync(patchPath, "utf8")) : {};

  // Existing translations win, then patch, then English for any remaining keys.
  const merged = deepMerge(en, deepMerge(existing, patch));

  writeFileSync(localePath, `${JSON.stringify(merged, null, 2)}\n`);
  console.log(`Updated messages/${locale}.json`);
}

console.log("Partial locale sync complete.");
