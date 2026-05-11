import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/lib/data";

export function ProcessSection() {
  return (
    <section id="process" className="bg-white py-20 sm:py-24" aria-labelledby="process-title">
      <Container>
        <AnimatedSection>
          <SectionHeading
            id="process-title"
            eyebrow="Work process"
            title="Alur kerja yang jelas dari ide sampai rilis."
            description="Proses dibuat bertahap agar keputusan desain dan teknis dapat dipahami sejak awal, termasuk ruang untuk revisi yang terukur."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <AnimatedSection key={step.step} delay={index * 0.04}>
                <article className="relative h-full rounded-md border border-slate-200 bg-white p-6 shadow-line">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-cyan-electric">{step.step}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-md bg-cloud text-navy-950">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-normal text-ink-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-500">{step.description}</p>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
