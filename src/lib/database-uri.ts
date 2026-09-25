/**
 * Resolve the Postgres connection string for Payload CMS.
 * Supports manual DATABASE_URI and Vercel Supabase integration env vars.
 */
export function resolveDatabaseUri(): string {
  const candidates = [
    process.env.DATABASE_URI,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.DATABASE_URL,
  ];

  for (const value of candidates) {
    const trimmed = value?.trim();
    if (trimmed?.startsWith("postgresql")) return trimmed;
  }

  return process.env.DATABASE_URI?.trim() || "file:./payload.db";
}

export function isPostgresUri(uri: string): boolean {
  return uri.startsWith("postgresql");
}
