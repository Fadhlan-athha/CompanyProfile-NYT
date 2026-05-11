import type { Metadata } from "next";
import {
  Archive,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Inbox,
  LogOut,
  Mail,
  MessageCircle,
  Save,
  ShieldCheck
} from "lucide-react";
import { logoutAction, sendClientEmailAction, updateLeadStatusAction } from "./actions";
import { requireAdmin, isUsingDefaultAdminPassword } from "@/lib/admin-auth";
import { buildClientWhatsAppUrl, formatWhatsAppLabel } from "@/lib/contact";
import { getLeadStatusMeta, leadStatuses } from "@/lib/lead-status";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard | Next Young Tecnology",
  robots: {
    index: false,
    follow: false
  }
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(date);
}

type AdminDashboardPageProps = {
  searchParams?: Promise<{
    email?: string;
  }>;
};

function getEmailFeedback(status?: string) {
  if (status === "sent") {
    return {
      className: "border-emerald-200 bg-emerald-50 text-emerald-900",
      message: "Email follow-up berhasil dikirim ke client."
    };
  }

  if (status === "not_configured") {
    return {
      className: "border-amber-200 bg-amber-50 text-amber-900",
      message:
        "Email belum terkirim karena RESEND_API_KEY belum diatur. Isi konfigurasi Resend di .env lalu restart server."
    };
  }

  if (status === "failed") {
    return {
      className: "border-red-200 bg-red-50 text-red-900",
      message:
        "Email belum terkirim. Periksa konfigurasi Resend, domain pengirim, dan alamat email client."
    };
  }

  return null;
}

export default async function AdminDashboardPage({ searchParams }: AdminDashboardPageProps) {
  await requireAdmin();
  const params = searchParams ? await searchParams : {};
  const emailFeedback = getEmailFeedback(params.email);

  const leads = await prisma.contactLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  const total = leads.length;
  const newCount = leads.filter((lead) => lead.status === "NEW").length;
  const progressCount = leads.filter(
    (lead) => lead.status === "CONTACTED" || lead.status === "IN_PROGRESS"
  ).length;
  const closedCount = leads.filter((lead) => lead.status === "CLOSED").length;

  const statCards = [
    { label: "Total lead", value: total, icon: Inbox },
    { label: "Lead baru", value: newCount, icon: Clock3 },
    { label: "Follow up", value: progressCount, icon: ShieldCheck },
    { label: "Selesai", value: closedCount, icon: CheckCircle2 }
  ];

  return (
    <main className="min-h-screen bg-cloud text-ink-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-800">
              Hidden admin route
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-ink-900">
              Dashboard Lead
            </h1>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:border-navy-950 hover:text-navy-950"
            >
              Keluar
              <LogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        {isUsingDefaultAdminPassword() ? (
          <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            WELCOME SUPER-ADMIN
          </div>
        ) : null}

        {emailFeedback ? (
          <div className={`mb-6 rounded-md border p-4 text-sm leading-6 ${emailFeedback.className}`}>
            {emailFeedback.message}
          </div>
        ) : null}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Ringkasan lead">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <article key={stat.label} className="rounded-md border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-ink-500">{stat.label}</p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-soft text-navy-950">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-semibold tracking-normal text-navy-950">
                  {stat.value}
                </p>
              </article>
            );
          })}
        </section>

        <section
          className="mt-8 rounded-md border border-slate-200 bg-white shadow-soft"
          aria-labelledby="lead-list-title"
        >
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="lead-list-title" className="text-xl font-semibold tracking-normal">
                Permintaan Masuk
              </h2>
              <p className="mt-1 text-sm text-ink-500">
                Menampilkan maksimal 100 lead terbaru dari form kontak.
              </p>
            </div>
          </div>

          {leads.length === 0 ? (
            <div className="grid min-h-72 place-items-center p-8 text-center">
              <div>
                <Archive className="mx-auto h-10 w-10 text-slate-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-ink-900">Belum ada lead</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-ink-500">
                  Data dari form kontak akan muncul di sini setelah pengunjung mengirim
                  permintaan.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse text-left">
                <thead className="bg-cloud text-xs uppercase tracking-[0.12em] text-ink-500">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Lead</th>
                    <th className="px-5 py-4 font-semibold">Kebutuhan</th>
                    <th className="px-5 py-4 font-semibold">Pesan</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {leads.map((lead) => {
                    const status = getLeadStatusMeta(lead.status);
                    const whatsappUrl = buildClientWhatsAppUrl({
                      name: lead.name,
                      whatsapp: lead.whatsapp,
                      service: lead.service
                    });

                    return (
                      <tr key={lead.id} className="align-top">
                        <td className="px-5 py-5">
                          <div className="max-w-56">
                            <p className="font-semibold text-ink-900">{lead.name}</p>
                            <p className="mt-1 text-sm text-ink-500">
                              {lead.company || "Tanpa nama perusahaan"}
                            </p>
                            <p className="mt-2 text-sm font-semibold text-navy-800">
                              {lead.email}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-ink-700">
                              {formatWhatsAppLabel(lead.whatsapp)}
                            </p>
                            <p className="mt-2 text-xs text-ink-500">
                              {formatDate(lead.createdAt)}
                            </p>
                          </div>
                        </td>
                        <td className="px-5 py-5">
                          <p className="max-w-44 text-sm font-semibold leading-6 text-ink-900">
                            {lead.service}
                          </p>
                          <p className="mt-2 text-xs text-ink-500">
                            Email notif: {lead.notificationSent ? "terkirim" : "belum aktif"}
                          </p>
                          <p className="mt-1 text-xs text-ink-500">
                            Email client:{" "}
                            {lead.clientEmailSentAt
                              ? formatDate(lead.clientEmailSentAt)
                              : "belum dikirim"}
                          </p>
                        </td>
                        <td className="px-5 py-5">
                          <p className="line-clamp-5 max-w-sm whitespace-pre-line text-sm leading-6 text-ink-500">
                            {lead.message}
                          </p>
                        </td>
                        <td className="px-5 py-5">
                          <span
                            className={`inline-flex rounded-md border px-3 py-1.5 text-xs font-bold ${status.badgeClass}`}
                          >
                            {status.label}
                          </span>
                          <form action={updateLeadStatusAction} className="mt-3 flex gap-2">
                            <input type="hidden" name="id" value={lead.id} />
                            <label htmlFor={`status-${lead.id}`} className="sr-only">
                              Ubah status lead {lead.name}
                            </label>
                            <select
                              id={`status-${lead.id}`}
                              name="status"
                              defaultValue={lead.status}
                              className="focus-ring rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-ink-900"
                            >
                              {leadStatuses.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <button
                              type="submit"
                              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy-950 text-white transition hover:bg-navy-800"
                              aria-label={`Simpan status lead ${lead.name}`}
                            >
                              <Save className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </form>
                        </td>
                        <td className="px-5 py-5">
                          <div className="grid gap-2">
                            <form action={sendClientEmailAction}>
                              <input type="hidden" name="id" value={lead.id} />
                              <button
                                type="submit"
                                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-ink-700 transition hover:border-navy-950 hover:text-navy-950"
                              >
                                Kirim Email
                                <Mail className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </form>
                            {whatsappUrl ? (
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-3 py-2 text-sm font-semibold text-white transition hover:bg-navy-800"
                              >
                                WA Client
                                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                              </a>
                            ) : (
                              <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-slate-500">
                                WA kosong
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
