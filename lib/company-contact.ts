export const companyEmail = "nextyoungcommunity@gmail.com";
export const companyWhatsAppNumber = "628881023038";
export const companyWhatsAppLabel = "+62 888-1023-038";

export function buildCompanyConsultationWhatsAppUrl() {
  const text = [
    "Halo Next Young Tech, saya ingin konsultasi.",
    "",
    "Nama:",
    "Perusahaan:",
    "Kebutuhan:",
    "Pesan singkat:"
  ].join("\n");

  return `https://wa.me/${companyWhatsAppNumber}?text=${encodeURIComponent(text)}`;
}
