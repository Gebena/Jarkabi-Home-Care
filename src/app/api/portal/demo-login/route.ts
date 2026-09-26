import { DEMO_COOKIE } from "@/lib/portal/session";
import { isPortalDemoEnabled } from "@/lib/supabase/config";
import { isPortalRole } from "@/lib/portal/roles";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isPortalDemoEnabled()) {
    return NextResponse.json({ ok: false, error: "demo_disabled" }, { status: 403 });
  }

  const body = (await request.json()) as { role?: string };
  if (!body.role || !isPortalRole(body.role)) {
    return NextResponse.json({ ok: false, error: "invalid_role" }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set(DEMO_COOKIE, body.role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return NextResponse.json({ ok: true });
}
