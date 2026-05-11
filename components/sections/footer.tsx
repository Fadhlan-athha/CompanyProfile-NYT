import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-navy-950 py-10 text-white">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <a href="#home" className="focus-ring inline-flex items-center gap-3 rounded-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-sm font-bold text-navy-950">
                NYT
              </span>
              <span className="text-base font-semibold tracking-normal">Next Young Tecnology</span>
            </a>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              Perusahaan teknologi dan solusi digital untuk website, sistem bisnis,
              UI/UX, maintenance, dan konsultasi digitalisasi.
            </p>
          </div>

          <nav className="grid gap-3 sm:grid-cols-2 md:text-right" aria-label="Navigasi footer">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring inline-flex items-center gap-2 rounded-md text-sm text-slate-300 transition hover:text-cyan-electric md:justify-end"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-400">
          <p>
            Copyright {new Date().getFullYear()} Next Young Tecnology. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
