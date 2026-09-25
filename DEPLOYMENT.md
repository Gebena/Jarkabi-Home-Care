# Jarkabi Home Care — Vercel + Cloudflare deployment

Deploy the Next.js + Payload CMS app on **Vercel**. Point **jarkabi.ca** DNS on **Cloudflare**. Use **Supabase Postgres** (Canadian region) for the CMS database.

## Architecture

```
jarkabi.ca (Cloudflare DNS) → Vercel (Next.js + Payload) → Supabase Postgres (ca-central-1)
jarkabi.com → 301 redirect → jarkabi.ca (configured in vercel.json)
```

---

## 1. Push code to GitHub

Repository: **Gebena/Jarkabi-Home-Care** (or deploy from **Gebena/Ketet** with Root Directory `jarkabi-home-care`).

```bash
git remote add origin https://github.com/Gebena/Jarkabi-Home-Care.git
git push -u origin main
```

---

## 2. Vercel project (configured)

The **jarkabi-home-care** Vercel project is linked to **Gebena/Jarkabi-Home-Care**.

| Setting | Value |
|---------|--------|
| Git repository | `Gebena/Jarkabi-Home-Care` |
| Production branch | `main` |
| Root Directory | **(empty / repo root)** — not `jarkabi-home-care` |
| Framework | Next.js |

> If deploy fails with `Root Directory "jarkabi-home-care" does not exist`, clear Root Directory in Vercel → Project Settings → General.

Add environment variables before first production deploy (step 3).

---

## 3. Database — Supabase (not AWS RDS)

**Use Supabase**, not AWS RDS. Same approach as **ketet.org**: Vercel runs the app; Supabase hosts Postgres in a Canadian region. Payload CMS talks to Supabase via a standard `postgresql://` connection string — no Supabase JS client required for the CMS.

| | Supabase ✅ | AWS RDS ❌ |
|---|------------|-----------|
| Setup | Dashboard, free tier, minutes | VPC, security groups, manual ops |
| Canada region | **Canada (Central)** | Possible but more work |
| Vercel serverless | Transaction pooler (port 6543) built-in | Need RDS Proxy + extra config |
| Same account as Ketet | New **separate** project | Separate RDS instance |

### Create the Supabase project

1. [supabase.com](https://supabase.com) → **New project**
2. **Organization:** same as Ketet (optional)
3. **Name:** `jarkabi-home-care`
4. **Region:** **Canada (Central)** (`ca-central-1`)
5. **Database password:** save securely

> **Important:** Create a **new** Supabase project. Do not point Jarkabi at Ketet's database — Payload manages its own tables via migrations on first boot.

### Connection string for Vercel

1. Supabase → **Project Settings → Database**
2. **Connection string → URI**
3. Choose **Transaction pooler** (not Session pooler) — port **6543**
4. Copy the URI (host looks like `aws-0-ca-central-1.pooler.supabase.com`)

Set in Vercel:

| Variable | Value |
|----------|-------|
| `DATABASE_URI` | `postgresql://postgres.[ref]:[password]@aws-0-ca-central-1.pooler.supabase.com:6543/postgres` |

Verify locally before deploy:

```bash
DATABASE_URI="postgresql://..." npm run verify:supabase
npm run go-live:database
```

Payload seeds provinces, services, and admin user on first boot (`onInit` in `payload.config.ts`).

### Optional: Supabase Storage

Media uploads on Vercel use **Vercel Blob** (`BLOB_READ_WRITE_TOKEN`) by default. You can add Supabase Storage later if you prefer one vendor for files + DB — not required for launch.

---

## 4. Environment variables (Vercel)

**Settings → Environment Variables** — add for **Production**, **Preview**, and **Development**:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URI` | Yes | Supabase Postgres URI (Canadian region) |
| `PAYLOAD_SECRET` | Yes | Random 32+ char string (`openssl rand -base64 32`) |
| `NEXT_PUBLIC_SERVER_URL` | Yes | `https://jarkabi.ca` |
| `CARE_INQUIRY_EMAIL` | Yes | `care@jarkabi.ca` |
| `SMTP_HOST` | Recommended | `smtp.gmail.com` or your provider |
| `SMTP_PORT` | Recommended | `587` |
| `SMTP_USER` | Recommended | Sender email |
| `SMTP_PASS` | Recommended | App password |
| `BLOB_READ_WRITE_TOKEN` | Yes (Vercel) | Auto-set when you add **Blob** storage in Vercel → Storage |
| `JARKABI_PRIMARY_PHONE` | Optional | Overrides Payload Brand Settings until admin NAP is entered |
| `JARKABI_TOLL_FREE_PHONE` | Optional | Toll-free line override |
| `JARKABI_OTTAWA_OFFICE_ADDRESS` | Optional | Street address for footer, contact page, and JSON-LD |

Placeholder NAP (`[PRIMARY PHONE]`, etc.) is hidden from `tel:` links and JSON-LD until real values are set in Payload **Brand Settings** or the env vars above.

Sync non-secret defaults from `vercel.json`:

```bash
VERCEL_TOKEN=... npm run vercel:sync-env
npm run verify:vercel-env
```

---

## 5. First deploy

1. Click **Deploy** (or push to `main`).
2. Open the `*.vercel.app` URL → `/en` should load.
3. Admin: `/admin` — login with seeded `admin@jarkabi.ca` (change password immediately).

**Health check:** `https://YOUR-PROJECT.vercel.app/api/health`

---

## 6. Custom domain (jarkabi.ca on Cloudflare)

### Vercel

1. Project → **Settings → Domains**
2. Add `jarkabi.ca`, `www.jarkabi.ca`, `jarkabi.com`, `www.jarkabi.com`
3. `jarkabi.com` redirects to `jarkabi.ca` via `vercel.json`.

### Cloudflare

Add `jarkabi.ca` to your Cloudflare account, then:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A | `@` | `76.76.21.21` | DNS only (grey cloud) |
| CNAME | `www` | `cname.vercel-dns.com` | DNS only |

Automate (after zone is in Cloudflare):

```bash
CLOUDFLARE_API_TOKEN=... npm run dns:cloudflare
```

Set **SSL/TLS → Full (strict)** once the Vercel certificate is active.

---

## 7. Post-deploy checklist

- [ ] Change admin password at `/admin`
- [ ] Update Brand Settings in CMS (phone, address, logo)
- [ ] Configure SMTP for care-request emails
- [ ] Add Vercel Blob or S3 adapter for media uploads (required for resume uploads on serverless)
- [ ] Review legal pages marked `[REVIEW REQUIRED]`

---

## 8. Troubleshooting

| Symptom | Fix |
|---------|-----|
| Build fails on middleware | Ensure `src/proxy.ts` exists (Next.js 16), not `middleware.ts` |
| Admin 500 / DB errors | Check `DATABASE_URI` and redeploy |
| Forms submit but no email | Set SMTP env vars |
| Media upload fails on Vercel | Add cloud storage adapter for Payload `media` collection |
| jarkabi.com not redirecting | Add domain in Vercel Domains tab |
