import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_COOKIE } from "@/lib/portal/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }

  const cookieStore = await cookies();
  cookieStore.delete(DEMO_COOKIE);

  return NextResponse.redirect(new URL(`/${locale}/portal/login`, url.origin));
}
