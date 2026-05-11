import { Resend } from "resend";
import type { ContactLead } from "@prisma/client";

type EmailResult =
  | {
      sent: true;
    }
  | {
      sent: false;
      reason: "not_configured" | "failed";
    };

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendLeadNotification(lead: ContactLead): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Next Young Tecnology <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.info(
      "[contact] Email notification skipped. Set RESEND_API_KEY and CONTACT_TO_EMAIL to enable it."
    );
    return { sent: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);
  const company = lead.company || "-";

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject: `Lead baru: ${lead.service} - ${lead.name}`,
      text: [
        "Ada permintaan konsultasi baru dari website Next Young Tecnology.",
        "",
        `Nama: ${lead.name}`,
        `Perusahaan: ${company}`,
        `Email: ${lead.email}`,
        `WhatsApp: ${lead.whatsapp || "-"}`,
        `Kebutuhan: ${lead.service}`,
        "",
        "Pesan:",
        lead.message
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
          <h2 style="margin:0 0 16px">Lead baru dari website</h2>
          <p>Ada permintaan konsultasi baru untuk Next Young Tecnology.</p>
          <table style="border-collapse:collapse;width:100%;max-width:640px">
            <tr><td style="padding:8px;border:1px solid #e5e7eb"><strong>Nama</strong></td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(lead.name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb"><strong>Perusahaan</strong></td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(company)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb"><strong>Email</strong></td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(lead.email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb"><strong>WhatsApp</strong></td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(lead.whatsapp || "-")}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb"><strong>Kebutuhan</strong></td><td style="padding:8px;border:1px solid #e5e7eb">${escapeHtml(lead.service)}</td></tr>
          </table>
          <h3 style="margin:20px 0 8px">Pesan</h3>
          <p style="white-space:pre-line;background:#f5f7fb;padding:16px;border-radius:8px">${escapeHtml(lead.message)}</p>
        </div>
      `
    });

    return { sent: true };
  } catch (error) {
    console.error("[contact] Failed to send lead notification", error);
    return { sent: false, reason: "failed" };
  }
}

export async function sendClientFollowUpEmail(lead: ContactLead): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.CONTACT_FROM_EMAIL || "Next Young Tecnology <onboarding@resend.dev>";
  const replyTo = process.env.CONTACT_TO_EMAIL;

  if (!apiKey) {
    console.info("[admin] Client email skipped. Set RESEND_API_KEY to enable it.");
    return { sent: false, reason: "not_configured" };
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from,
      to: lead.email,
      replyTo,
      subject: `Follow up konsultasi ${lead.service}`,
      text: [
        `Halo ${lead.name},`,
        "",
        "Terima kasih sudah mengirim permintaan konsultasi ke Next Young Tecnology.",
        `Kami ingin menindaklanjuti kebutuhan Anda terkait ${lead.service}.`,
        "",
        "Kami akan membantu memetakan kebutuhan digital bisnis Anda dengan lebih rapi.",
        "",
        "Salam,",
        "Next Young Tecnology"
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827">
          <h2 style="margin:0 0 16px">Halo ${escapeHtml(lead.name)},</h2>
          <p>Terima kasih sudah mengirim permintaan konsultasi ke <strong>Next Young Tecnology</strong>.</p>
          <p>Kami ingin menindaklanjuti kebutuhan Anda terkait <strong>${escapeHtml(lead.service)}</strong>.</p>
          <p>Kami akan membantu memetakan kebutuhan digital bisnis Anda dengan lebih rapi.</p>
          <p style="margin-top:24px">Salam,<br/>Next Young Tecnology</p>
        </div>
      `
    });

    return { sent: true };
  } catch (error) {
    console.error("[admin] Failed to send client follow-up email", error);
    return { sent: false, reason: "failed" };
  }
}
