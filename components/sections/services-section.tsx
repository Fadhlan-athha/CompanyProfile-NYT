import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/lib/data";

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24" aria-labelledby="services-title">
      <Container>
        <AnimatedSection>
          <SectionHeading
            id="services-title"
            eyebrow="Layanan"
            title="Solusi digital yang mendukung kredibilitas, penjualan, dan operasional."
            description="Setiap layanan dapat dimulai dari kebutuhan kecil dan dikembangkan bertahap sesuai prioritas bisnis."
            align="center"
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <AnimatedSection key={service.title} delay={index * 0.04}>
                <article className="h-full rounded-md border border-slate-200 bg-white p-6 shadow-line transition hover:-translate-y-1 hover:border-cyan-electric/40 hover:shadow-soft">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-cyan-soft text-navy-950">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold tracking-normal text-ink-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-500">{service.description}</p>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
