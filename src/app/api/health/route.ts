import { NextResponse } from "next/server";

export async function GET() {
  const hasDb = Boolean(process.env.DATABASE_URI?.startsWith("postgresql"));
  const hasSecret = Boolean(process.env.PAYLOAD_SECRET);
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

  return NextResponse.json({
    ok: true,
    database: hasDb ? "postgresql" : "sqlite-or-missing",
    payloadSecret: hasSecret,
    siteUrl,
  });
}
