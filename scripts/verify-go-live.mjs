#!/usr/bin/env node
/**
 * Check whether jarkabi.ca is ready for public launch.
 *
 * Usage: npm run verify:go-live
 */

const CHECKS = [
  {
    name: "Vercel preview URL",
    url: "https://jarkabi-home-care.vercel.app/en",
    expectStatus: 200,
  },
  {
    name: "Health endpoint",
    url: "https://jarkabi-home-care.vercel.app/api/health",
    expectStatus: 200,
    expectBody: (text) => {
      const data = JSON.parse(text);
      return data.ok === true;
    },
  },
  {
    name: "Custom domain HTTPS",
    url: "https://jarkabi.ca/en",
    expectStatus: 200,
  },
  {
    name: "Custom domain HTTP (interim)",
    url: "http://jarkabi.ca/en",
    expectStatus: 200,
  },
];

async function dnsHasRecords() {
  const res = await fetch(
    "https://dns.google/resolve?name=jarkabi.ca&type=A",
  );
  const data = await res.json();
  return Array.isArray(data.Answer) && data.Answer.length > 0;
}

async function check({ name, url, expectStatus, expectBody }) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const text = await res.text();
    const statusOk = res.status === expectStatus;
    const bodyOk = expectBody ? expectBody(text) : true;
    const ok = statusOk && bodyOk;
    console.log(ok ? "✓" : "✗", name, `(${res.status})`, url);
    if (!ok && expectBody) {
      console.log("  response:", text.slice(0, 200));
    }
    return ok;
  } catch (err) {
    console.log("✗", name, url);
    console.log(" ", err.message);
    return false;
  }
}

async function main() {
  console.log("Jarkabi go-live verification\n");

  const dnsOk = await dnsHasRecords();
  console.log(dnsOk ? "✓" : "✗", "DNS A record for jarkabi.ca");
  if (!dnsOk) {
    console.log(
      "  Add in Cloudflare → jarkabi.ca → DNS:\n" +
        "    A     @    76.76.21.21   (DNS only / grey cloud)\n" +
        "    CNAME www  cname.vercel-dns.com   (DNS only)",
    );
  }

  let passed = dnsOk ? 1 : 0;
  for (const item of CHECKS) {
    if (await check(item)) passed += 1;
  }

  try {
    const health = await fetch(
      "https://jarkabi-home-care.vercel.app/api/health",
    ).then((r) => r.json());
    const dbOk = health.database === "postgresql";
    console.log(dbOk ? "✓" : "✗", "DATABASE_URI (Postgres)", health.database);
    if (!dbOk) {
      console.log(
        "  Create Supabase project jarkabi-home-care (Canada Central),\n" +
          "  set DATABASE_URI on Vercel, redeploy.",
      );
    }
    if (dbOk) passed += 1;
  } catch {
    console.log("✗ DATABASE_URI check failed");
  }

  try {
    const res = await fetch("https://jarkabi.ca/en");
    if (res.status !== 200) throw new Error(String(res.status));
    console.log("✓ Custom domain HTTPS now live");
    passed += 1;
  } catch {
    console.log(
      "… HTTPS not ready yet (HTTP may work). Vercel cert was issued;",
    );
    console.log(
      "  wait 10–30 min or enable Cloudflare proxy (orange cloud) + Full (strict).",
    );
  }

  console.log(`\n${passed} checks passed.`);
  process.exit(passed >= 4 ? 0 : 1);
}

main();
