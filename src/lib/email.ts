import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailOptions): Promise<{ ok: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set, skipping email");
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    await resend.emails.send({
      from: "SquamaTracker <onboarding@resend.dev>",
      to,
      subject,
      text,
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Email send failed:", message);
    return { ok: false, error: message };
  }
}
