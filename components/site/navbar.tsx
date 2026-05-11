"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { Container } from "@/components/ui/container";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/92 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="focus-ring flex min-w-0 items-center gap-3 rounded-md"
          aria-label="Next Young Tecnology home"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy-950 text-sm font-bold text-white shadow-line">
            NYT
          </span>
          <span className="min-w-0 text-sm font-semibold tracking-normal text-ink-900 sm:text-base">
            Next Young Tecnology
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-md text-sm font-medium text-ink-700 transition hover:text-navy-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="focus-ring hidden items-center gap-2 rounded-md bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 lg:inline-flex"
          aria-label="Mulai konsultasi dengan Next Young Tecnology"
        >
          Konsultasi
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-ink-900 md:hidden"
          aria-label={isOpen ? "Tutup navigasi" : "Buka navigasi"}
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </Container>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white md:hidden"
          aria-label="Navigasi mobile"
        >
          <Container className="grid gap-1 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="focus-ring rounded-md px-2 py-3 text-sm font-semibold text-ink-700 hover:bg-cloud hover:text-navy-950"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="focus-ring mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-navy-950 px-4 py-3 text-sm font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              Konsultasi Sekarang
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
