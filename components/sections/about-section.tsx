import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const focusPoints = [
  "Website dan sistem yang mudah dipahami oleh pengguna bisnis.",
  "Fondasi teknis yang rapi agar tidak menyulitkan saat dikembangkan.",
  "Konten, desain, dan alur kerja yang disusun sesuai kebutuhan nyata."
];

export function AboutSection() {
  return (
    <section id="about" className="bg-cloud py-20 sm:py-24" aria-labelledby="about-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <AnimatedSection>
            <SectionHeading
              id="about-title"
              eyebrow="Tentang perusahaan"
              title="Partner teknologi untuk membangun sistem digital yang benar-benar dipakai."
              description="Next Young Tecnology adalah perusahaan teknologi dan solusi digital yang membantu bisnis menata kehadiran online, memperbaiki proses operasional, dan membangun sistem yang siap digunakan oleh pelanggan maupun tim internal."
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
              <div className="flex items-start justify-between gap-6 border-b border-slate-200 pb-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-800">
                    Cara kami bekerja
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-normal text-ink-900">
                    Rapi di tampilan, jelas di proses, kuat di fondasi.
                  </h3>
                </div>
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-md bg-cyan-soft text-navy-950 sm:flex">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>

              <ul className="mt-6 grid gap-4">
                {focusPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-ink-700">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-cyan-electric"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
