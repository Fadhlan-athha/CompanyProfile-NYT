import "server-only";

import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_ROUTE = "/nyt-admin";
export const ADMIN_LOGIN_ROUTE = "/nyt-admin/login";

const SESSION_COOKIE = "nyt_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
const DEFAULT_ADMIN_PASSWORD = "admin-nyt-2026";

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
}

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    "local-development-secret-for-next-young-tecnology-dashboard"
  );
}

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

export function isUsingDefaultAdminPassword() {
  return !process.env.ADMIN_PASSWORD;
}

export function verifyAdminPassword(password: string) {
  return timingSafeEqual(hash(password), hash(getAdminPassword()));
}

export function createAdminSessionValue() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `admin.${expiresAt}`;

  return `${payload}.${sign(payload)}`;
}

export function isValidAdminSession(value?: string) {
  if (!value) {
    return false;
  }

  const parts = value.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [subject, expiresAtRaw, signature] = parts;
  const payload = `${subject}.${expiresAtRaw}`;
  const expiresAt = Number(expiresAtRaw);

  if (subject !== "admin" || Number.isNaN(expiresAt) || Date.now() > expiresAt) {
    return false;
  }

  return timingSafeEqual(hash(signature), hash(sign(payload)));
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;

  if (!isValidAdminSession(session)) {
    redirect(ADMIN_LOGIN_ROUTE);
  }
}

export async function setAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, createAdminSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE);
}
