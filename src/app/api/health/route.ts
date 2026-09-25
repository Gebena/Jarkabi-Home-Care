import { NextResponse } from "next/server";
import { isPostgresUri, resolveDatabaseUri } from "@/lib/database-uri";

export async function GET() {
  const databaseUri = resolveDatabaseUri();
  const hasDb = isPostgresUri(databaseUri);
  const hasSecret = Boolean(process.env.PAYLOAD_SECRET);
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return NextResponse.json({
    ok: true,
    database: hasDb ? "postgresql" : "sqlite-or-missing",
    payloadSecret: hasSecret,
    siteUrl,
  });
}
