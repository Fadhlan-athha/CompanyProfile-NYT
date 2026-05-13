import type { Metadata } from "next";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { loginAction } from "./actions";
import {
  canUseLocalFallbackPassword,
  getDefaultAdminPasswordHint,
  isUsingDefaultAdminPassword
} from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login | Next Young Tecnology",
  robots: {
    index: false,
    follow: false
  }
};

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = searchParams ? await searchParams : {};
  const hasError = params.error === "invalid";
  const usesDefaultPassword = isUsingDefaultAdminPassword();
  const canUseFallback = canUseLocalFallbackPassword();

  return (
    <main className="min-h-screen bg-navy-950 px-4 py-8 text-white sm:px-5 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center sm:min-h-[calc(100vh-5rem)]">
        <section
          className="w-full rounded-md border border-white/12 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 sm:p-8"
          aria-labelledby="admin-login-title"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-electric text-navy-950">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-electric">
            Admin area
          </p>
          <h1 id="admin-login-title" className="mt-3 text-2xl font-semibold tracking-normal sm:text-3xl">
            Next Young Tecnology
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Masuk untuk melihat lead dari form kontak dan mengelola status follow up.
          </p>

          {hasError ? (
            <p className="mt-5 rounded-md border border-red-300/30 bg-red-300/10 p-4 text-sm text-red-100">
              Password tidak sesuai. Coba lagi dengan password admin yang benar.
            </p>
          ) : null}

          {usesDefaultPassword || canUseFallback ? (
            <div className="mt-5 rounded-md border border-cyan-electric/30 bg-cyan-electric/10 p-4 text-sm leading-6 text-cyan-soft">
              Password lokal yang bisa dipakai:{" "}
              <span className="font-bold text-white">{getDefaultAdminPasswordHint()}</span>.
              Ganti `ADMIN_PASSWORD` di `.env` sebelum website dipakai publik.
            </div>
          ) : null}

          <form action={loginAction} className="mt-6">
            <label htmlFor="password" className="text-sm font-semibold text-white">
              Password admin
            </label>
            <div className="relative mt-2">
              <LockKeyhole
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="focus-ring w-full rounded-md border border-white/15 bg-white px-12 py-3 text-sm text-ink-900 outline-none placeholder:text-slate-400"
                placeholder="Masukkan password"
              />
            </div>

            <button
              type="submit"
              className="focus-ring mt-5 inline-flex w-full items-center justify-center rounded-md bg-cyan-electric px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-white"
            >
              Masuk Dashboard
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
