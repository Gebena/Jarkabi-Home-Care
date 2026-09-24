import nodemailer from "nodemailer";

type EmailPayload = {
  subject: string;
  text: string;
  html?: string;
};

export async function sendCareTeamEmail(payload: EmailPayload): Promise<boolean> {
  const to = process.env.CARE_INQUIRY_EMAIL || "care@jarkabi.ca";
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.info("[email] SMTP not configured — skipping send:", payload.subject);
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: user,
    to,
    subject: payload.subject,
    text: payload.text,
    html: payload.html ?? payload.text,
  });

  return true;
}
