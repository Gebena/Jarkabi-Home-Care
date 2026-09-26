import { createClient } from "@supabase/supabase-js";
import { isSupabaseServiceConfigured, supabaseUrl } from "@/lib/supabase/config";

/** Service-role client — server-only. Never import from client components. */
export function createSupabaseAdminClient() {
  if (!isSupabaseServiceConfigured()) {
    return null;
  }

  return createClient(supabaseUrl(), process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
