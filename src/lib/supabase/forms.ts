import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseServiceConfigured } from "@/lib/supabase/config";

type FormMirrorPayload = {
  formType: "care_request" | "contact" | "referral" | "job_application";
  locale?: string;
  payload: Record<string, unknown>;
  sourceIp?: string;
};

/** Mirrors public form submissions into Supabase when the service role is configured. */
export async function mirrorFormSubmission(input: FormMirrorPayload): Promise<void> {
  if (!isSupabaseServiceConfigured()) return;

  const supabase = createSupabaseAdminClient();
  if (!supabase) return;

  const tableByType: Record<FormMirrorPayload["formType"], string> = {
    care_request: "care_requests",
    contact: "contact_messages",
    referral: "referrals",
    job_application: "job_applications",
  };

  const table = tableByType[input.formType];

  const { error } = await supabase.from(table).insert({
    locale: input.locale ?? "en",
    payload: input.payload,
    source_ip: input.sourceIp ?? null,
    status: "new",
  });

  if (error) {
    console.error(`[supabase] form mirror failed (${input.formType}):`, error.message);
  }
}
