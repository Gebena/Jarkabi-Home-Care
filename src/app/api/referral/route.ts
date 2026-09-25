import { sendCareTeamEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { referralSchema } from "@/lib/validations/forms";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`referral:${ip}`, 8, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = referralSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation_failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const payload = await getPayloadClient();

    await payload.create({
      collection: "referrals",
      data: {
        organizationName: data.organizationName,
        contactName: data.contactName,
        phone: data.phone,
        email: data.email,
        province: data.province,
        city: data.city,
        referrerType: data.referrerType,
        clientSummary: data.clientSummary,
        notes: data.notes,
        locale: data.locale,
        status: "new",
      },
    });

    await sendCareTeamEmail({
      subject: `New referral — ${data.organizationName}`,
      text: [
        `Organization: ${data.organizationName}`,
        `Contact: ${data.contactName}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Type: ${data.referrerType}`,
        `Province: ${data.province}`,
        `Summary: ${data.clientSummary || "—"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
