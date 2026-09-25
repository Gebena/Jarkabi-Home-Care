import { NextResponse } from "next/server";
import {
  getDatabaseUriDiagnostics,
  isPostgresUri,
  resolveDatabaseUri,
} from "@/lib/database-uri";

export async function GET() {
  const databaseUri = resolveDatabaseUri();
  const hasDb = isPostgresUri(databaseUri);
  const hasSecret = Boolean(process.env.PAYLOAD_SECRET);
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  let databaseConnected = false;
  let databaseError: string | undefined;

  if (hasDb) {
    try {
      const { default: pg } = await import("pg");
      const client = new pg.Client({
        connectionString: databaseUri,
        ssl: databaseUri.includes("supabase.com")
          ? { rejectUnauthorized: false }
          : undefined,
      });
      await client.connect();
      await client.query("SELECT 1");
      await client.end();
      databaseConnected = true;
    } catch (err) {
      databaseError =
        err instanceof Error ? err.message : "Database connection failed";
    }
  }

  const databaseDiagnostics = hasDb
    ? getDatabaseUriDiagnostics(databaseUri)
    : null;

  return NextResponse.json({
    ok: hasSecret && (!hasDb || databaseConnected),
    database: hasDb ? "postgresql" : "sqlite-or-missing",
    databaseConnected: hasDb ? databaseConnected : null,
    databaseError,
    databaseDiagnostics,
    payloadSecret: hasSecret,
    siteUrl,
  });
}
