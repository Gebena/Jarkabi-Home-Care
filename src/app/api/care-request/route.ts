import { sendCareTeamEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`care-request:${ip}`, 8, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const payload = await getPayloadClient();

    await payload.create({
      collection: "care-requests",
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        province: body.province,
        city: body.city,
        postalCode: body.postalCode,
        relationship: body.relationship,
        careType: body.careType,
        startDate: body.startDate,
        hours: body.hours,
        preferredLanguage: body.preferredLanguage,
        contactTime: body.contactTime,
        notes: body.notes,
        locale: body.locale,
        areaServed: Boolean(body.areaServed),
        status: "new",
      },
    });

    await sendCareTeamEmail({
      subject: `New care request — ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Phone: ${body.phone}`,
        `Email: ${body.email}`,
        `Location: ${body.city}, ${body.province} ${body.postalCode}`,
        `Care type: ${body.careType || "—"}`,
        `Area served: ${body.areaServed ? "yes" : "no — expansion list"}`,
        `Notes: ${body.notes || "—"}`,
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
