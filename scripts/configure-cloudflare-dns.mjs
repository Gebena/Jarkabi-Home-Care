#!/usr/bin/env node
/**
 * Point jarkabi.ca DNS (Cloudflare) at the Vercel deployment.
 *
 * Required: CLOUDFLARE_API_TOKEN (Zone DNS Edit for jarkabi.ca)
 * Optional: CLOUDFLARE_ZONE_ID
 *
 * Usage: npm run dns:cloudflare
 */

const DOMAIN = "jarkabi.ca";
const TOKEN = (
  process.env.CLOUDFLARE_API_TOKEN ??
  process.env.CF_API_TOKEN ??
  ""
).trim();

const RECORDS = [
  {
    type: "A",
    name: "@",
    content: "76.76.21.21",
    proxied: false,
    comment: "Vercel apex — jarkabi.ca",
  },
  {
    type: "CNAME",
    name: "www",
    content: "cname.vercel-dns.com",
    proxied: false,
    comment: "Vercel www — www.jarkabi.ca",
  },
];

async function api(path, init = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json();
  if (!body.success) {
    const msg = body.errors?.map((e) => e.message).join("; ") || res.statusText;
    throw new Error(msg);
  }
  return body.result;
}

async function getZoneId() {
  if (process.env.CLOUDFLARE_ZONE_ID?.trim()) {
    return process.env.CLOUDFLARE_ZONE_ID.trim();
  }
  const zones = await api(`/zones?name=${DOMAIN}`);
  const zone = zones?.[0];
  if (!zone?.id) {
    throw new Error(
      `Cloudflare zone not found for ${DOMAIN}. Add jarkabi.ca to Cloudflare first.`,
    );
  }
  return zone.id;
}

function recordNameMatches(recordName, specName) {
  const normalized = recordName
    .replace(`.${DOMAIN}`, "")
    .replace(DOMAIN, "@");
  return normalized === specName;
}

async function upsertRecord(zoneId, spec, existing) {
  const match = existing.find(
    (r) => r.type === spec.type && recordNameMatches(r.name, spec.name),
  );

  const payload = {
    type: spec.type,
    name: spec.name === "@" ? DOMAIN : `${spec.name}.${DOMAIN}`,
    content: spec.content,
    proxied: spec.proxied,
    comment: spec.comment,
    ttl: 1,
  };

  if (match) {
    if (match.content === spec.content && match.proxied === spec.proxied) {
      console.log(`✓ ${spec.type} ${spec.name} already correct`);
      return;
    }
    await api(`/zones/${zoneId}/dns_records/${match.id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    console.log(`↻ Updated ${spec.type} ${spec.name} → ${spec.content}`);
    return;
  }

  await api(`/zones/${zoneId}/dns_records`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  console.log(`+ Added ${spec.type} ${spec.name} → ${spec.content}`);
}

if (!TOKEN) {
  console.error("Missing CLOUDFLARE_API_TOKEN");
  console.error("\nManual DNS records:");
  for (const r of RECORDS) {
    console.log(`  ${r.type}  ${r.name}  →  ${r.content}  (DNS only)`);
  }
  process.exit(1);
}

const zoneId = await getZoneId();
console.log(`Zone: ${DOMAIN} (${zoneId})`);

const existing = await api(`/zones/${zoneId}/dns_records?per_page=100`);
for (const spec of RECORDS) {
  await upsertRecord(zoneId, spec, existing);
}

try {
  const current = await api(`/zones/${zoneId}/settings/ssl`);
  if (current?.value !== "strict") {
    await api(`/zones/${zoneId}/settings/ssl`, {
      method: "PATCH",
      body: JSON.stringify({ value: "strict" }),
    });
    console.log("↻ SSL/TLS set to Full (strict)");
  } else {
    console.log("✓ SSL/TLS already Full (strict)");
  }
} catch {
  console.log("… Set SSL/TLS → Full (strict) manually in Cloudflare");
}

console.log("\nDone. Open https://jarkabi.ca after DNS propagates (2–10 min).");
