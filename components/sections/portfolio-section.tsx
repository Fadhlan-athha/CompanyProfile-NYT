import { ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { portfolio } from "@/lib/data";

export function PortfolioSection() {
  return (
    <section id="solutions" className="bg-cloud py-20 sm:py-24" aria-labelledby="solutions-title">
      <Container>
        <AnimatedSection>
          <SectionHeading
            id="solutions-title"
            eyebrow="Sample solutions"
            title="Contoh solusi yang bisa disesuaikan dengan kebutuhan perusahaan."
            description="Bagian ini dapat diganti menjadi portofolio asli ketika proyek dan studi kasus perusahaan sudah siap dipublikasikan."
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {portfolio.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 0.05}>
              <article className="h-full rounded-md border border-slate-200 bg-white p-6 shadow-line">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-800">
                      {item.category}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-normal text-ink-900">
                      {item.title}
                    </h3>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-cyan-soft text-navy-950">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-500">{item.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`Deliverables ${item.title}`}>
                  {item.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="rounded-md border border-slate-200 bg-cloud px-3 py-2 text-xs font-semibold text-ink-700"
                    >
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
