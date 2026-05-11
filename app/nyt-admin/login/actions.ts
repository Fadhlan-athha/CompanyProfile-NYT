"use server";

import { redirect } from "next/navigation";
import {
  ADMIN_LOGIN_ROUTE,
  ADMIN_ROUTE,
  setAdminSession,
  verifyAdminPassword
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    redirect(`${ADMIN_LOGIN_ROUTE}?error=invalid`);
  }

  await setAdminSession();
  redirect(ADMIN_ROUTE);
}
