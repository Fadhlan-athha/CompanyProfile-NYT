export const contactServiceOptions = [
  "Website company profile",
  "Website toko online",
  "Sistem informasi bisnis",
  "UI/UX design",
  "Maintenance website",
  "Konsultasi digitalisasi bisnis"
] as const;

export type ContactService = (typeof contactServiceOptions)[number];

export type ContactFormData = {
  name: string;
  company?: string;
  email: string;
  whatsapp: string;
  service: ContactService;
  message: string;
};

export type ContactValidationError = Partial<Record<keyof ContactFormData, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeWhatsAppNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  if (digits.startsWith("8")) {
    return `62${digits}`;
  }

  return digits;
}

export function formatWhatsAppLabel(value?: string | null) {
  if (!value) {
    return "-";
  }

  const normalized = normalizeWhatsAppNumber(value);

  return normalized ? `+${normalized}` : "-";
}

export function validateContactPayload(input: unknown):
  | {
      success: true;
      data: ContactFormData;
    }
  | {
      success: false;
      errors: ContactValidationError;
    } {
  const payload = input && typeof input === "object" ? (input as Record<string, unknown>) : {};

  const name = readText(payload.name);
  const company = readText(payload.company);
  const email = readText(payload.email).toLowerCase();
  const whatsappInput = readText(payload.whatsapp);
  const whatsapp = normalizeWhatsAppNumber(whatsappInput);
  const service = readText(payload.service);
  const message = readText(payload.message);
  const errors: ContactValidationError = {};

  if (name.length < 2) {
    errors.name = "Nama minimal 2 karakter.";
  } else if (name.length > 100) {
    errors.name = "Nama maksimal 100 karakter.";
  }

  if (company.length > 120) {
    errors.company = "Nama perusahaan maksimal 120 karakter.";
  }

  if (!emailPattern.test(email)) {
    errors.email = "Email belum valid.";
  } else if (email.length > 160) {
    errors.email = "Email terlalu panjang.";
  }

  if (!whatsapp) {
    errors.whatsapp = "No WhatsApp wajib diisi.";
  } else if (whatsapp.length < 10 || whatsapp.length > 16) {
    errors.whatsapp = "No WhatsApp belum valid.";
  }

  if (!contactServiceOptions.includes(service as ContactService)) {
    errors.service = "Pilih layanan yang tersedia.";
  }

  if (message.length < 10) {
    errors.message = "Pesan minimal 10 karakter.";
  } else if (message.length > 2000) {
    errors.message = "Pesan maksimal 2000 karakter.";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      name,
      company: company || undefined,
      email,
      whatsapp,
      service: service as ContactService,
      message
    }
  };
}

export function buildCompanyWhatsAppUrl(data: {
  name: string;
  company?: string | null;
  whatsapp?: string | null;
  service: string;
  message: string;
}) {
  const rawNumber = process.env.WHATSAPP_NUMBER || "628881023038";
  const number = rawNumber.replace(/\D/g, "");
  const companyLine = data.company ? `\nPerusahaan: ${data.company}` : "";
  const whatsappLine = data.whatsapp ? `\nNo WhatsApp: ${formatWhatsAppLabel(data.whatsapp)}` : "";
  const text = [
    "Halo Next Young Tecnology, saya ingin konsultasi.",
    "",
    `Nama: ${data.name}${companyLine}${whatsappLine}`,
    `Kebutuhan: ${data.service}`,
    `Pesan: ${data.message}`
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function buildClientWhatsAppUrl(data: {
  name: string;
  whatsapp?: string | null;
  service: string;
}) {
  const number = normalizeWhatsAppNumber(data.whatsapp ?? "");

  if (!number) {
    return "";
  }

  const text = [
    `Halo ${data.name}, saya dari Next Young Tecnology.`,
    "",
    `Terima kasih sudah mengirim permintaan konsultasi untuk ${data.service}.`,
    "Kami ingin menindaklanjuti kebutuhan digital bisnis Anda."
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
