# Standalone GitHub repo — why it is empty and how to fix it

The production app lives in **`jarkabi-home-care/`** inside **Gebena/Ketet**. The standalone repo **Gebena/Jarkabi-Home-Care** is the target for Vercel import and long-term isolation.

If you see GitHub’s “Quick setup” page with **no files**, the repo was created but **nothing has been pushed yet**.

## Why sync has not run

1. **Automated sync** uses GitHub Actions workflow `.github/workflows/sync-jarkabi-github.yml`.
2. That workflow **skips silently** unless the secret **`JARKABI_SYNC_TOKEN`** is set on **Gebena/Ketet**.
3. Sync also runs only on pushes to **`main`** that touch `jarkabi-home-care/**` (or when you run the workflow manually).

The Cloud Agent cannot add GitHub secrets or push to **Jarkabi-Home-Care** without your token.

---

## If sync fails with exit code 128

Open the failed **Sync Jarkabi to standalone repo** run → expand the **sync** job → read the log.

| Log message | Meaning | Fix |
|-------------|---------|-----|
| `Permission denied to Gebena` | Token works but **cannot write** to Jarkabi-Home-Care | Edit PAT → **Contents: Read and write** on `Gebena/Jarkabi-Home-Care` → update `JARKABI_SYNC_TOKEN` on **Ketet** |
| `Invalid username or token` | Secret is wrong, expired, or revoked | Create new PAT → update `JARKABI_SYNC_TOKEN` on **Ketet** |
| `JARKABI_SYNC_TOKEN cannot push` | Preflight check failed (read-only token) | Same as first row |

The secret must be on **Gebena/Ketet** (not Jarkabi-Home-Care):  
`https://github.com/Gebena/Ketet/settings/secrets/actions`

---

## Option A — GitHub Actions auto-sync (PAT)

### 1. Create a Personal Access Token

1. GitHub → **Settings → Developer settings → Personal access tokens**
2. **Fine-grained token** (recommended) or **Classic** with `repo` scope
3. Grant **Contents: Read and write** on repository **Gebena/Jarkabi-Home-Care**
4. Copy the token (starts with `github_pat_` or `ghp_`)

### 2. Add secret to Ketet

1. Open **Gebena/Ketet** → **Settings → Secrets and variables → Actions**
2. **New repository secret**
3. Name: `JARKABI_SYNC_TOKEN`
4. Value: your token

### 3. Trigger sync

Either:

- **Merge** the Jarkabi branch into `main`, or
- **Actions → “Sync Jarkabi to standalone repo” → Run workflow**

After success, refresh **github.com/Gebena/Jarkabi-Home-Care** — you should see the full app (README, `package.json`, `src/`, etc.).

---

## Option B — One-time manual push (fastest if you are at the empty repo page)

From your machine, with the Ketet repo checked out:

```bash
cd /path/to/Ketet
git pull origin main   # or your Jarkabi feature branch after merge

# Clone the empty standalone repo
git clone https://github.com/Gebena/Jarkabi-Home-Care.git /tmp/jarkabi-standalone
cd /tmp/jarkabi-standalone

# Copy app (exclude local build artifacts)
rsync -a --exclude node_modules --exclude .next --exclude media --exclude 'payload.db*' \
  /path/to/Ketet/jarkabi-home-care/ ./

git add -A
git commit -m "chore: initial Jarkabi Home Care platform"
git push -u origin main
```

Or use the helper script from Ketet root:

```bash
JARKABI_SYNC_TOKEN=ghp_your_token_here node scripts/sync-jarkabi-github.mjs
```

---

## Option D — Deploy key (most reliable for Actions)

Use this if PAT keeps failing with **Permission denied to Gebena**.

### 1. Add deploy key on Jarkabi-Home-Care

1. Open **`https://github.com/Gebena/Jarkabi-Home-Care/settings/keys`**
2. **Add deploy key**
3. Title: `ketet-sync`
4. Key: paste contents of `jarkabi-home-care/docs/jarkabi-sync-deploy-key.pub` from Ketet
5. Check **Allow write access**
6. Save

### 2. Add private key secret on Ketet

Ask your developer for the matching private key, or generate a new pair:

```bash
ssh-keygen -t ed25519 -f jarkabi-sync -N ""
# Add jarkabi-sync.pub to Jarkabi-Home-Care deploy keys (write access)
# Add jarkabi-sync (private) to Ketet secret JARKABI_DEPLOY_KEY
```

On **Gebena/Ketet → Settings → Secrets → Actions**:

- Name: `JARKABI_DEPLOY_KEY`
- Value: entire private key file (including `-----BEGIN/END OPENSSH PRIVATE KEY-----`)

### 3. Re-run workflow

**Actions → Sync Jarkabi to standalone repo → Run workflow**

The workflow uses `JARKABI_DEPLOY_KEY` when set (SSH), otherwise `JARKABI_SYNC_TOKEN` (HTTPS).

---

## Option C — Deploy from Ketet without standalone repo (interim)

You can deploy immediately from **Gebena/Ketet** on Vercel:

1. Vercel → **Import** → **Gebena/Ketet**
2. **Root Directory:** `jarkabi-home-care`
3. Production branch: your deployed branch

The standalone repo is still recommended for a clean **Jarkabi-only** history and permissions.

---

## Verify success

After push or sync:

| Check | Expected |
|-------|----------|
| Repo root | `README.md`, `package.json`, `src/` |
| Default branch | `main` |
| Latest commit | `sync:` or `chore: initial` message |
| Vercel | Can import **Gebena/Jarkabi-Home-Care** with no root directory override |

---

## Ongoing sync

Once `JARKABI_SYNC_TOKEN` is set, every merge to `main` that changes `jarkabi-home-care/**` updates the standalone repo automatically.

See also: `docs/PROJECT_ISOLATION.md`, `DEPLOYMENT.md`.
