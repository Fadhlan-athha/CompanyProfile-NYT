import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/site/brand-logo";
import {
  buildCompanyConsultationWhatsAppUrl,
  companyEmail,
  companyWhatsAppLabel
} from "@/lib/company-contact";
import { navLinks, services } from "@/lib/data";

const contactLinks = [
  {
    label: "Email",
    value: companyEmail,
    href: `mailto:${companyEmail}`,
    icon: Mail
  },
  {
    label: "WhatsApp",
    value: companyWhatsAppLabel,
    href: buildCompanyConsultationWhatsAppUrl(),
    icon: Phone
  },
  {
    label: "Area",
    value: "Indonesia",
    href: "#contact",
    icon: MapPin
  }
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1fr]">
          <div className="max-w-lg sm:col-span-2 lg:col-span-1">
            <a href="#home" className="focus-ring inline-flex items-center gap-3 rounded-md">
              <BrandLogo inverse />
            </a>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Perusahaan teknologi dan solusi digital untuk membangun website,
              sistem bisnis, UI/UX, maintenance, dan konsultasi digitalisasi yang
              siap digunakan secara nyata.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-electric">
              Navigasi
            </h2>
            <nav className="mt-5 grid gap-3" aria-label="Navigasi footer">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="focus-ring w-fit rounded-md text-sm text-slate-300 transition hover:text-cyan-electric"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-electric">
              Layanan
            </h2>
            <ul className="mt-5 grid gap-3">
              {services.slice(0, 5).map((service) => (
                <li key={service.title} className="text-sm leading-6 text-slate-300">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-electric">
              Kontak
            </h2>
            <ul className="mt-5 grid gap-3">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                      className="focus-ring flex items-start gap-3 rounded-md text-sm text-slate-300 transition hover:text-cyan-electric"
                    >
                      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>
                        <span className="block font-semibold text-white">{item.label}</span>
                        <span className="block break-words leading-6">{item.value}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Next Young Tecnology.</p>
          <p>All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
