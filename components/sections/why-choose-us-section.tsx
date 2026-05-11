import { AnimatedSection } from "@/components/ui/animated-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { reasons } from "@/lib/data";

export function WhyChooseUsSection() {
  return (
    <section
      className="relative overflow-hidden bg-navy-950 py-20 sm:py-24"
      aria-labelledby="why-title"
    >
      <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <AnimatedSection>
            <SectionHeading
              id="why-title"
              eyebrow="Why choose us"
              title="Bukan hanya membuat website terlihat bagus, tapi membuatnya berguna."
              description="Kami menjaga keseimbangan antara desain, struktur konten, performa, dan kemudahan pengelolaan agar hasil akhir bisa dipakai dalam kegiatan bisnis sehari-hari."
              inverse
            />
          </AnimatedSection>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <AnimatedSection key={reason.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-white/12 bg-white/[0.05] p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-md bg-cyan-electric text-navy-950">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-normal text-white">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{reason.description}</p>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
