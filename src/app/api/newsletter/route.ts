import { sendCareTeamEmail } from "@/lib/email";
import { getPayloadClient } from "@/lib/payload";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { newsletterSchema } from "@/lib/validations/forms";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`newsletter:${ip}`, 6, 60_000);

  if (!limit.allowed) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = newsletterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation_failed", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const payload = await getPayloadClient();

    await payload.create({
      collection: "contact-inquiries",
      data: {
        name: "Newsletter subscriber",
        phone: "N/A",
        email: data.email,
        subject: "Newsletter subscription",
        message: `Newsletter signup from ${data.email}`,
        locale: data.locale,
        status: "new",
      },
    });

    await sendCareTeamEmail({
      subject: "Newsletter subscription",
      text: `New newsletter signup: ${data.email}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
