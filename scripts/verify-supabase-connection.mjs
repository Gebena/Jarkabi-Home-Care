#!/usr/bin/env node
/**
 * Verify Supabase Postgres connection for Payload CMS.
 *
 * Usage:
 *   DATABASE_URI=postgresql://... node scripts/verify-supabase-connection.mjs
 */
const uri = process.env.DATABASE_URI?.trim();

if (!uri) {
  console.error("✗ DATABASE_URI is not set");
  process.exit(1);
}

if (!uri.startsWith("postgresql")) {
  console.error("✗ DATABASE_URI must be a PostgreSQL connection string (Supabase pooler recommended)");
  process.exit(1);
}

const isSupabase = uri.includes("supabase.com");
const isPooler = uri.includes("pooler.supabase.com") || uri.includes(":6543");

console.log("Database check:");
console.log(`  Provider: ${isSupabase ? "Supabase" : "PostgreSQL (generic)"}`);
console.log(`  Pooler:   ${isPooler ? "yes (recommended for Vercel)" : "no — use Transaction pooler (port 6543) on Vercel"}`);

if (!isSupabase) {
  console.warn("\n⚠ For production, use a dedicated Supabase project in Canada (Central) — same pattern as ketet.org.");
}

try {
  const { default: pg } = await import("pg");
  const client = new pg.Client({
    connectionString: uri,
    ssl: isSupabase ? { rejectUnauthorized: false } : undefined,
  });
  await client.connect();
  const { rows } = await client.query("SELECT version()");
  await client.end();
  console.log("\n✓ Connected successfully");
  console.log(`  ${rows[0]?.version?.split(" ")[0] ?? "PostgreSQL"} …`);
} catch (err) {
  console.error(`\n✗ Connection failed: ${err.message}`);
  process.exit(1);
}
