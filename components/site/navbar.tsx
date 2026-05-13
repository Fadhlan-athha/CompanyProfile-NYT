"use client";

import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { navLinks, services, portfolio } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { BrandLogo } from "@/components/site/brand-logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check initial state
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileDropdown = (href: string) => {
    setOpenMobileDropdown(prev => prev === href ? null : href);
  };

  return (
    <header 
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "border-b border-slate-200/70 bg-white/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#home"
          className="focus-ring flex min-w-0 items-center gap-3 rounded-md"
          aria-label="Next Young Tecnology home"
          onClick={() => setIsOpen(false)}
        >
          <BrandLogo compact inverse={!isScrolled && !isOpen} />
        </a>

        <nav className="hidden items-center gap-7 md:flex h-full" aria-label="Navigasi utama">
          {navLinks.map((link) => {
            if (link.href === "/#services" || link.href === "/#solutions") {
              const isServices = link.href === "/#services";
              const items = isServices ? services : portfolio;

              return (
                <div key={link.href} className="group relative h-full flex items-center">
                  <a
                    href={link.href}
                    className={`focus-ring flex items-center gap-1 rounded-md text-sm font-medium transition ${
                      isScrolled
                        ? "text-ink-700 hover:text-navy-950"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
                  </a>

                  {/* Mega Menu Dropdown */}
                  <div className="invisible absolute left-1/2 top-full w-[640px] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="pt-2">
                      <div className={`overflow-hidden rounded-xl border p-6 shadow-soft ${
                        isScrolled ? "border-slate-200 bg-white" : "border-white/10 bg-navy-900/95 backdrop-blur-xl"
                      }`}>
                        <div className="grid grid-cols-2 gap-4">
                          {isServices ? (
                            services.map((item) => {
                              const Icon = item.icon;
                              return (
                                <a key={item.title} href={`/services/${item.slug}`} className={`flex items-start gap-3 rounded-lg p-3 transition-colors ${
                                  isScrolled ? "hover:bg-slate-50" : "hover:bg-white/5"
                                }`}>
                                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${
                                    isScrolled ? "bg-cyan-soft text-navy-950" : "bg-white/10 text-cyan-electric"
                                  }`}>
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                  </div>
                                  <div>
                                    <h4 className={`text-sm font-semibold ${isScrolled ? "text-ink-900" : "text-white"}`}>
                                      {item.title}
                                    </h4>
                                    <p className={`mt-1 text-xs leading-relaxed line-clamp-2 ${isScrolled ? "text-ink-500" : "text-slate-400"}`}>
                                      {item.description}
                                    </p>
                                  </div>
                                </a>
                              );
                            })
                          ) : (
                            portfolio.map((item) => (
                              <a key={item.title} href={`/solutions/${item.slug}`} className={`flex flex-col justify-center rounded-lg p-4 transition-colors ${
                                isScrolled ? "hover:bg-slate-50" : "hover:bg-white/5"
                              }`}>
                                <div className="flex items-center gap-2">
                                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                                    isScrolled ? "text-cyan-600" : "text-cyan-electric"
                                  }`}>
                                    {item.category}
                                  </span>
                                </div>
                                <h4 className={`mt-1 text-sm font-semibold ${isScrolled ? "text-ink-900" : "text-white"}`}>
                                  {item.title}
                                </h4>
                                <p className={`mt-1 text-xs leading-relaxed line-clamp-2 ${isScrolled ? "text-ink-500" : "text-slate-400"}`}>
                                  {item.description}
                                </p>
                              </a>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <a
                key={link.href}
                href={link.href}
                className={`focus-ring flex h-full items-center rounded-md text-sm font-medium transition ${
                  isScrolled
                    ? "text-ink-700 hover:text-navy-950"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className={`focus-ring hidden items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold transition lg:inline-flex ${
            isScrolled
              ? "bg-navy-950 text-white hover:bg-navy-800"
              : "bg-white text-navy-950 hover:bg-cloud"
          }`}
          aria-label="Mulai konsultasi dengan Next Young Tecnology"
        >
          Konsultasi
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>

        <button
          type="button"
          className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border md:hidden ${
            isScrolled || isOpen
              ? "border-slate-200 text-ink-900"
              : "border-white/20 text-white hover:bg-white/10"
          }`}
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
          className="border-t border-slate-200 bg-white md:hidden max-h-[calc(100vh-4rem)] overflow-y-auto"
          aria-label="Navigasi mobile"
        >
          <Container className="grid gap-1 py-4">
            {navLinks.map((link) => {
              if (link.href === "/#services" || link.href === "/#solutions") {
                const isExpanded = openMobileDropdown === link.href;
                const isServices = link.href === "/#services";
                
                return (
                  <div key={link.href} className="grid">
                    <button
                      onClick={() => toggleMobileDropdown(link.href)}
                      className="focus-ring flex w-full items-center justify-between rounded-md px-2 py-3 text-sm font-semibold text-ink-700 hover:bg-cloud hover:text-navy-950"
                    >
                      {link.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} aria-hidden="true" />
                    </button>
                    {isExpanded && (
                      <div className="grid gap-1 px-4 pb-2">
                        {isServices ? (
                          services.map((item) => (
                            <a
                              key={item.title}
                              href={`/services/${item.slug}`}
                              className="focus-ring rounded-md py-2 text-sm text-ink-500 hover:text-navy-950"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.title}
                            </a>
                          ))
                        ) : (
                          portfolio.map((item) => (
                            <a
                              key={item.title}
                              href={`/solutions/${item.slug}`}
                              className="focus-ring rounded-md py-2 text-sm text-ink-500 hover:text-navy-950"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.title}
                            </a>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="focus-ring rounded-md px-2 py-3 text-sm font-semibold text-ink-700 hover:bg-cloud hover:text-navy-950"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              );
            })}
            
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
