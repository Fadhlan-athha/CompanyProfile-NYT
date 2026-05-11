import { NextResponse } from "next/server";
import { validateContactPayload, buildCompanyWhatsAppUrl } from "@/lib/contact";
import { sendLeadNotification } from "@/lib/email";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        message: "Format data tidak valid."
      },
      { status: 400 }
    );
  }

  const validation = validateContactPayload(body);

  if (!validation.success) {
    return NextResponse.json(
      {
        message: "Periksa kembali data yang dikirim.",
        errors: validation.errors
      },
      { status: 422 }
    );
  }

  const lead = await prisma.contactLead.create({
    data: {
      name: validation.data.name,
      company: validation.data.company,
      email: validation.data.email,
      whatsapp: validation.data.whatsapp,
      service: validation.data.service,
      message: validation.data.message
    }
  });

  const emailResult = await sendLeadNotification(lead);

  if (emailResult.sent) {
    await prisma.contactLead.update({
      where: { id: lead.id },
      data: { notificationSent: true }
    });
  }

  return NextResponse.json(
    {
      message: "Permintaan berhasil dikirim.",
      leadId: lead.id,
      emailNotification: emailResult.sent ? "sent" : emailResult.reason,
      whatsappUrl: buildCompanyWhatsAppUrl(validation.data)
    },
    { status: 201 }
  );
}
