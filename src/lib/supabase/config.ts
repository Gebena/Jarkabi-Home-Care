/** Returns true when public Supabase Auth is configured. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

/** Returns true when server-side Supabase operations (form mirror, admin) are available. */
export function isSupabaseServiceConfigured(): boolean {
  return isSupabaseConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY?.trim());
}

/** Demo portal access for local/staging without Supabase Auth keys. */
export function isPortalDemoEnabled(): boolean {
  return process.env.NEXT_PUBLIC_PORTAL_DEMO === "true";
}

export function supabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
}

export function supabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";
}
