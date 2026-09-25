import { pushDevSchema, type DrizzleAdapter } from "@payloadcms/drizzle";
import type { Payload } from "payload";
import { isPostgresUri, resolveDatabaseUri } from "./database-uri";

/**
 * Push Payload/Drizzle schema in production when no migrations are checked in yet.
 * Safe to run repeatedly — only applies schema diffs.
 */
export async function ensurePayloadSchema(payload: Payload): Promise<void> {
  if (process.env.NODE_ENV !== "production") return;
  if (!isPostgresUri(resolveDatabaseUri())) return;

  await pushDevSchema(payload.db as DrizzleAdapter);
}
