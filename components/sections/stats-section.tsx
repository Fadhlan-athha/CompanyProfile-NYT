import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { stats } from "@/lib/data";

export function StatsSection() {
  return (
    <section className="relative bg-white py-12 sm:py-16" aria-labelledby="stats-title">
      <Container>
        <h2 id="stats-title" className="sr-only">
          Ringkasan kapabilitas Next Young Tecnology
        </h2>
        <AnimatedSection className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-md border border-slate-200 bg-white p-6 shadow-soft"
            >
              <p className="text-4xl font-semibold tracking-normal text-navy-950">
                {stat.value}
              </p>
              <h3 className="mt-3 text-base font-semibold text-ink-900">{stat.label}</h3>
              <p className="mt-2 text-sm leading-6 text-ink-500">{stat.description}</p>
            </article>
          ))}
        </AnimatedSection>
      </Container>
    </section>
  );
}
