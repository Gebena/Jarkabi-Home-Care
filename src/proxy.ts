import createMiddleware from "next-intl/middleware";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from "./lib/supabase/config";

const handleI18nRouting = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE === "true") {
    const path = request.nextUrl.pathname;
    if (
      !path.startsWith("/maintenance") &&
      !path.startsWith("/api/health") &&
      !path.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL("/maintenance", request.url));
    }
  }

  let response = handleI18nRouting(request);

  if (isSupabaseConfigured()) {
    const supabase = createServerClient(supabaseUrl(), supabaseAnonKey(), {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          response = handleI18nRouting(request);
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    });

    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/(en|fr|ti|byn|tig|ar|am|zh|pa|es)/:path*",
    "/((?!admin|api|_next|_vercel|sw.js|manifest.webmanifest|.*\\..*).*)",
  ],
};
