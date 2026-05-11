"use client";

import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { contactServiceOptions, type ContactValidationError } from "@/lib/contact";

const contactItems = [
  {
    label: "Email",
    value: "hello@nextyoungtecnology.com",
    icon: Mail
  },
  {
    label: "Telepon",
    value: "+62 888-1023-038",
    icon: Phone
  },
  {
    label: "Area layanan",
    value: "Indonesia, remote dan onsite sesuai kebutuhan",
    icon: MapPin
  }
];

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type ContactApiResponse = {
  message?: string;
  errors?: ContactValidationError;
  whatsappUrl?: string;
};

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<ContactValidationError>({});
  const [whatsappUrl, setWhatsappUrl] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? ""),
      service: String(formData.get("service") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    setStatus("submitting");
    setErrors({});
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as ContactApiResponse;

      if (!response.ok) {
        setErrors(result.errors ?? {});
        setMessage(result.message ?? "Permintaan belum bisa dikirim.");
        setStatus("error");
        return;
      }

      formRef.current?.reset();
      setWhatsappUrl(result.whatsappUrl ?? "");
      setMessage(
        "Permintaan Anda sudah tersimpan. Tim kami dapat menindaklanjuti dari dashboard internal."
      );
      setStatus("success");
    } catch {
      setMessage("Terjadi kendala koneksi. Silakan coba beberapa saat lagi.");
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-cloud py-20 sm:py-24" aria-labelledby="contact-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <AnimatedSection>
            <SectionHeading
              id="contact-title"
              eyebrow="Kontak"
              title="Ceritakan kebutuhan digital bisnis Anda."
              description="Gunakan form ini untuk memulai diskusi awal. Tim dapat membantu memetakan kebutuhan website, sistem, desain, maintenance, atau rencana digitalisasi yang lebih luas."
            />

            <div className="mt-8 grid gap-4">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-line"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-cyan-soft text-navy-950">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{item.label}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-500">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-md border border-slate-200 bg-white p-6 shadow-soft sm:p-8"
            >
              {status === "success" ? (
                <div
                  role="status"
                  className="mb-6 rounded-md border border-emerald-200 bg-emerald-50 p-4"
                >
                  <p className="text-sm font-semibold text-emerald-900">Permintaan terkirim</p>
                  <p className="mt-1 text-sm leading-6 text-emerald-800">{message}</p>
                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    {whatsappUrl ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-navy-800"
                      >
                        Lanjut via WhatsApp
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    ) : null}
                    <button
                      type="button"
                      className="focus-ring inline-flex items-center justify-center rounded-md border border-emerald-200 bg-white px-4 py-2.5 text-sm font-semibold text-emerald-900 transition hover:border-emerald-700"
                      onClick={() => {
                        setStatus("idle");
                        setMessage("");
                        setWhatsappUrl("");
                      }}
                    >
                      Kirim kebutuhan lain
                    </button>
                  </div>
                </div>
              ) : null}

              {status === "error" && message ? (
                <p
                  role="alert"
                  className="mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
                >
                  {message}
                </p>
              ) : null}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-semibold text-ink-900">
                    Nama
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="focus-ring mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-slate-400"
                    placeholder="Nama lengkap"
                  />
                  {errors.name ? (
                    <p id="name-error" className="mt-2 text-xs font-semibold text-red-700">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="company" className="text-sm font-semibold text-ink-900">
                    Perusahaan
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.company)}
                    aria-describedby={errors.company ? "company-error" : undefined}
                    className="focus-ring mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-slate-400"
                    placeholder="Nama perusahaan"
                  />
                  {errors.company ? (
                    <p id="company-error" className="mt-2 text-xs font-semibold text-red-700">
                      {errors.company}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-ink-900">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="focus-ring mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-slate-400"
                    placeholder="email@perusahaan.com"
                  />
                  {errors.email ? (
                    <p id="email-error" className="mt-2 text-xs font-semibold text-red-700">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="whatsapp" className="text-sm font-semibold text-ink-900">
                    No WhatsApp
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    aria-invalid={Boolean(errors.whatsapp)}
                    aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
                    className="focus-ring mt-2 w-full rounded-md border border-slate-200 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-slate-400"
                    placeholder="Contoh: 0812 3456 7890"
                  />
                  {errors.whatsapp ? (
                    <p id="whatsapp-error" className="mt-2 text-xs font-semibold text-red-700">
                      {errors.whatsapp}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="service" className="text-sm font-semibold text-ink-900">
                    Kebutuhan
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    className="focus-ring mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Pilih layanan
                    </option>
                    {contactServiceOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  {errors.service ? (
                    <p id="service-error" className="mt-2 text-xs font-semibold text-red-700">
                      {errors.service}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="text-sm font-semibold text-ink-900">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="focus-ring mt-2 w-full resize-y rounded-md border border-slate-200 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-slate-400"
                  placeholder="Tuliskan kebutuhan, target, atau tantangan yang ingin diselesaikan."
                />
                {errors.message ? (
                  <p id="message-error" className="mt-2 text-xs font-semibold text-red-700">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:bg-slate-400 sm:w-auto"
              >
                {status === "submitting" ? "Mengirim..." : "Kirim Permintaan"}
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
