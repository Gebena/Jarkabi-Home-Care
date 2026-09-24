import { sendCareTeamEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`referral:${ip}`, 8, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const payload = await getPayloadClient();

    await payload.create({
      collection: "referrals",
      data: {
        organizationName: body.organizationName,
        contactName: body.contactName,
        phone: body.phone,
        email: body.email,
        province: body.province,
        city: body.city,
        referrerType: body.referrerType,
        clientSummary: body.clientSummary,
        notes: body.notes,
        locale: body.locale,
        status: "new",
      },
    });

    await sendCareTeamEmail({
      subject: `New referral — ${body.organizationName}`,
      text: [
        `Organization: ${body.organizationName}`,
        `Contact: ${body.contactName}`,
        `Phone: ${body.phone}`,
        `Email: ${body.email}`,
        `Type: ${body.referrerType}`,
        `Province: ${body.province}`,
        `Summary: ${body.clientSummary || "—"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
