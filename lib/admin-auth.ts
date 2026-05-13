import "server-only";

import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_ROUTE = "/nyt-admin";
export const ADMIN_LOGIN_ROUTE = "/nyt-admin/login";

const SESSION_COOKIE = "nyt_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;
const DEFAULT_ADMIN_PASSWORD = "admin-nyt-2026";
const PLACEHOLDER_PASSWORDS = new Set([
  "",
  "ganti-password-admin-yang-kuat",
  "ganti-password-admin-yang-kuat-anda",
  "password-kuat-anda"
]);
const PLACEHOLDER_SESSION_SECRETS = new Set([
  "",
  "ganti-dengan-random-string-panjang",
  "random-string-panjang"
]);

function getAdminPassword() {
  const password = process.env.ADMIN_PASSWORD?.trim() ?? "";

  if (PLACEHOLDER_PASSWORDS.has(password)) {
    return DEFAULT_ADMIN_PASSWORD;
  }

  return password;
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim() ?? "";

  if (PLACEHOLDER_SESSION_SECRETS.has(secret)) {
    return "local-development-secret-for-next-young-tecnology-dashboard";
  }

  return secret;
}

function hash(value: string) {
  return createHash("sha256").update(value).digest();
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

export function isUsingDefaultAdminPassword() {
  const password = process.env.ADMIN_PASSWORD?.trim() ?? "";

  return PLACEHOLDER_PASSWORDS.has(password);
}

export function getDefaultAdminPasswordHint() {
  return DEFAULT_ADMIN_PASSWORD;
}

export function canUseLocalFallbackPassword() {
  return process.env.NODE_ENV !== "production";
}

export function verifyAdminPassword(password: string) {
  const matchesConfiguredPassword = timingSafeEqual(hash(password), hash(getAdminPassword()));

  if (matchesConfiguredPassword) {
    return true;
  }

  return (
    canUseLocalFallbackPassword() &&
    timingSafeEqual(hash(password), hash(DEFAULT_ADMIN_PASSWORD))
  );
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
