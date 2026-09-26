import { sendCareTeamEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { careRequestSchema } from "@/lib/validations/forms";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`care-request:${ip}`, 8, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = careRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation_failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const payload = await getPayloadClient();

    await payload.create({
      collection: "care-requests",
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        province: data.province,
        city: data.city,
        postalCode: data.postalCode,
        relationship: data.relationship,
        careType: data.careType,
        startDate: data.startDate,
        hours: data.hours,
        preferredLanguage: data.preferredLanguage,
        contactTime: data.contactTime,
        notes: data.notes,
        urgentCare: Boolean(data.urgentCare),
        consentContact: true,
        consentMarketing: Boolean(data.consentMarketing),
        locale: data.locale,
        areaServed: Boolean(data.areaServed),
        status: "new",
      },
    });

    await sendCareTeamEmail({
      subject: `New care request — ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Phone: ${data.phone}`,
        `Email: ${data.email}`,
        `Location: ${data.city}, ${data.province} ${data.postalCode}`,
        `Care type: ${data.careType || "—"}`,
        `Urgent: ${data.urgentCare ? "yes" : "no"}`,
        `Area served: ${data.areaServed ? "yes" : "no — expansion list"}`,
        `Marketing consent: ${data.consentMarketing ? "yes" : "no"}`,
        `Notes: ${data.notes || "—"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
