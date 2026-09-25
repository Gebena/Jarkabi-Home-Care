const POSTGRES_ENV_KEYS = [
  "DATABASE_URI",
  "POSTGRES_URL",
  "POSTGRES_PRISMA_URL",
  "DATABASE_URL",
] as const;

type PostgresEnvKey = (typeof POSTGRES_ENV_KEYS)[number];

function isPostgresConnectionString(value: string | undefined): value is string {
  const trimmed = value?.trim();
  return Boolean(
    trimmed?.startsWith("postgresql://") || trimmed?.startsWith("postgres://"),
  );
}

/**
 * Resolve the Postgres connection string for Payload CMS.
 * Supports manual DATABASE_URI and Vercel Supabase integration env vars.
 */
export function resolveDatabaseUri(): string {
  for (const key of POSTGRES_ENV_KEYS) {
    const value = process.env[key]?.trim();
    if (isPostgresConnectionString(value)) return value;
  }

  return process.env.DATABASE_URI?.trim() || "file:./payload.db";
}

export function resolveDatabaseUriSource(): PostgresEnvKey | null {
  for (const key of POSTGRES_ENV_KEYS) {
    if (isPostgresConnectionString(process.env[key])) return key;
  }
  return null;
}

export type DatabaseUriDiagnostics = {
  source: PostgresEnvKey | null;
  user: string | null;
  host: string | null;
  port: string | null;
  database: string | null;
  usesPooler: boolean;
  hasPasswordPlaceholder: boolean;
};

/** Safe connection metadata for debugging (never exposes password). */
export function getDatabaseUriDiagnostics(
  uri: string,
): DatabaseUriDiagnostics | null {
  if (!isPostgresUri(uri)) return null;

  try {
    const normalized = uri.replace(/^postgres:\/\//, "postgresql://");
    const url = new URL(normalized);
    const database = url.pathname.replace(/^\//, "") || null;

    return {
      source: resolveDatabaseUriSource(),
      user: url.username || null,
      host: url.hostname || null,
      port: url.port || null,
      database,
      usesPooler: url.hostname.includes("pooler.supabase.com"),
      hasPasswordPlaceholder:
        url.password.includes("[YOUR-PASSWORD]") ||
        url.password.includes("[YOUR_PASSWORD]"),
    };
  } catch {
    return {
      source: resolveDatabaseUriSource(),
      user: null,
      host: null,
      port: null,
      database: null,
      usesPooler: uri.includes("pooler.supabase.com"),
      hasPasswordPlaceholder:
        uri.includes("[YOUR-PASSWORD]") || uri.includes("[YOUR_PASSWORD]"),
    };
  }
}

export function isPostgresUri(uri: string): boolean {
  return uri.startsWith("postgresql") || uri.startsWith("postgres://");
}
