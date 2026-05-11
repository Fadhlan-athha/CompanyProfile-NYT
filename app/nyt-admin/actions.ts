"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_LOGIN_ROUTE, ADMIN_ROUTE, clearAdminSession, requireAdmin } from "@/lib/admin-auth";
import { sendClientFollowUpEmail } from "@/lib/email";
import { isLeadStatus } from "@/lib/lead-status";
import { prisma } from "@/lib/prisma";

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !isLeadStatus(status)) {
    return;
  }

  await prisma.contactLead.update({
    where: { id },
    data: { status }
  });

  revalidatePath(ADMIN_ROUTE);
}

export async function sendClientEmailAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    redirect(`${ADMIN_ROUTE}?email=failed`);
  }

  const lead = await prisma.contactLead.findUnique({
    where: { id }
  });

  if (!lead) {
    redirect(`${ADMIN_ROUTE}?email=failed`);
  }

  const result = await sendClientFollowUpEmail(lead);

  if (!result.sent) {
    redirect(`${ADMIN_ROUTE}?email=${result.reason}`);
  }

  await prisma.contactLead.update({
    where: { id },
    data: {
      status: lead.status === "NEW" ? "CONTACTED" : lead.status,
      clientEmailSentAt: new Date()
    }
  });

  revalidatePath(ADMIN_ROUTE);
  redirect(`${ADMIN_ROUTE}?email=sent`);
}

export async function logoutAction() {
  await clearAdminSession();
  redirect(ADMIN_LOGIN_ROUTE);
}
