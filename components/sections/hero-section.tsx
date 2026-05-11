"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { capabilityHighlights } from "@/lib/data";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-navy-950 text-white"
      aria-labelledby="hero-title"
    >
      <div className="hero-grid absolute inset-0 opacity-80" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-white"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-[-20rem] top-12 hidden h-[38rem] w-[60rem] rotate-[-8deg] border border-cyan-electric/20 bg-navy-900/60 shadow-2xl shadow-black/20 lg:block"
        aria-hidden="true"
      >
        <div className="surface-grid absolute inset-0" />
        <div className="absolute left-20 top-20 h-28 w-56 rounded-md border border-white/12 bg-white/[0.06]" />
        <div className="absolute left-40 top-64 h-24 w-72 rounded-md border border-cyan-electric/25 bg-cyan-electric/[0.08]" />
        <div className="absolute left-[24rem] top-28 h-40 w-64 rounded-md border border-white/12 bg-white/[0.05]" />
        <div className="absolute left-[31rem] top-[20rem] h-28 w-52 rounded-md border border-white/12 bg-white/[0.06]" />
        <div className="absolute left-48 top-52 h-px w-48 bg-cyan-electric/40" />
        <div className="absolute left-[27rem] top-[15rem] h-28 w-px bg-cyan-electric/30" />
        <div className="absolute left-[18rem] top-[22rem] h-px w-48 bg-white/20" />
      </div>

      <Container className="relative z-10 flex min-h-[86svh] items-center py-20 sm:py-24 lg:py-28">
        <motion.div
          className="max-w-3xl"
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.65, ease: "easeOut" }}
        >
          <p className="inline-flex items-center gap-2 rounded-md border border-cyan-electric/30 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-cyan-electric">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Next Young Tecnology
          </p>
          <h1
            id="hero-title"
            className="mt-6 max-w-3xl text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl"
          >
            Solusi Digital Profesional untuk Bisnis yang Ingin Tumbuh Lebih Cepat
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Next Young Tecnology membantu bisnis membangun website, sistem digital,
            aplikasi, dan solusi teknologi yang rapi, aman, responsif, dan siap
            digunakan secara nyata.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-cyan-electric px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-white"
            >
              Konsultasi Sekarang
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="focus-ring inline-flex items-center justify-center rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-electric hover:text-cyan-electric"
            >
              Lihat Layanan Kami
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:max-w-2xl lg:grid-cols-3">
            {capabilityHighlights.slice(0, 3).map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-slate-200"
                >
                  <Icon className="h-4 w-4 shrink-0 text-cyan-electric" aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
