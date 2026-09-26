import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { isSupabaseServiceConfigured } from "@/lib/supabase/config";

export type AuditAction =
  | "VIEW_CLIENT"
  | "UPDATE_CARE_PLAN"
  | "CREATE_VISIT_NOTE"
  | "DOWNLOAD_DOCUMENT"
  | "UPDATE_ASSIGNMENT"
  | "VIEW_INVOICE"
  | "PORTAL_LOGIN"
  | "PORTAL_LOGOUT";

type AuditEntry = {
  actorId: string;
  action: AuditAction;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
};

/** Append-only audit log — requires Supabase service role. */
export async function writeAuditLog(entry: AuditEntry): Promise<void> {
  if (!isSupabaseServiceConfigured()) return;

  const supabase = createSupabaseAdminClient();
  if (!supabase) return;

  const { error } = await supabase.from("audit_logs").insert({
    actor_id: entry.actorId,
    action: entry.action,
    resource_type: entry.resourceType,
    resource_id: entry.resourceId ?? null,
    metadata: entry.metadata ?? {},
  });

  if (error) {
    console.error("[audit] write failed:", error.message);
  }
}
