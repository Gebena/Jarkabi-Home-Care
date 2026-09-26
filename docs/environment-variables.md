# Environment Variables

Copy `.env.example` to `.env` for local development.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URI` | Yes | SQLite locally; Supabase pooler URI in production |
| `PAYLOAD_SECRET` | Yes | Payload CMS encryption secret (32+ chars) |
| `NEXT_PUBLIC_SERVER_URL` | Yes | Canonical site URL |
| `JARKABI_PRIMARY_PHONE` | Prod | Overrides CMS phone when set |
| `JARKABI_OTTAWA_OFFICE_ADDRESS` | Prod | Overrides CMS address when set |
| `NEXT_PUBLIC_SUPABASE_URL` | Portal | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Portal | Public anon key for Auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Portal | Server-only; form mirror + audit |
| `NEXT_PUBLIC_PORTAL_DEMO` | Dev | `true` enables demo portal login |
| `MAINTENANCE_MODE` | Optional | `true` redirects public site to `/maintenance` |
| `SMTP_*` | Prod | Transactional email |
| `CARE_INQUIRY_EMAIL` | Prod | Form notification recipient |

Never commit `.env`, `.env.local`, or production secrets to Git.
