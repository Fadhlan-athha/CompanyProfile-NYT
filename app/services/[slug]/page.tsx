import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { services } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { TechShowcase } from "@/components/sections/tech-showcase";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-navy-950 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 text-white">
        <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-electric/10 text-cyan-electric border border-cyan-electric/20 mb-8">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-electric mb-3">
              Layanan Kami
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {service.description}
            </p>
            <div className="mt-10 flex gap-4">
              <a
                href="/#contact"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-cyan-electric px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-white"
              >
                Mulai Konsultasi
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-20 sm:py-24 bg-white text-ink-900">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-semibold text-ink-900">
                Solusi Tepat untuk Bisnis Anda
              </h2>
              <p className="mt-6 text-lg text-ink-500 leading-relaxed">
                Kami memastikan bahwa layanan {service.title} yang kami berikan tidak hanya menarik secara visual, tetapi juga berfungsi dengan performa tinggi dan aman untuk mendukung operasional bisnis Anda sehari-hari.
              </p>
              
              <ul className="mt-10 space-y-4">
                {[
                  "Pendekatan berpusat pada kebutuhan pengguna",
                  "Struktur kode yang rapi dan mudah dikembangkan",
                  "Performa optimal dan responsif di semua perangkat",
                  "Dukungan penuh setelah peluncuran"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-x-3">
                    <CheckCircle2 className="h-6 w-5 flex-none text-cyan-600" aria-hidden="true" />
                    <span className="text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Mockup/Illustration from TechShowcase */}
            <div className="w-full flex items-center justify-center">
              <TechShowcase slug={slug} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
