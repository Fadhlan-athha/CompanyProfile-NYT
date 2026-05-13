import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { portfolio } from "@/lib/data";
import { Container } from "@/components/ui/container";
import { TechShowcase } from "@/components/sections/tech-showcase";

interface SolutionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return portfolio.map((item) => ({
    slug: item.slug,
  }));
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const item = portfolio.find((p) => p.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-navy-950 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 text-white">
        <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-md border border-cyan-electric/30 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-electric mb-6">
              {item.category}
            </p>
            <h1 className="text-4xl font-semibold tracking-normal text-white sm:text-5xl lg:text-6xl">
              {item.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {item.description}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#contact"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-cyan-electric px-5 py-3 text-sm font-bold text-navy-950 transition hover:bg-white"
              >
                Pesan Solusi Ini
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Details Section */}
      <section className="py-20 sm:py-24 bg-cloud text-ink-900">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 items-start">
            
            {/* Overview / Deliverables */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-line">
              <h3 className="text-xl font-semibold text-ink-900 mb-6">Yang Anda Dapatkan</h3>
              <ul className="space-y-4" aria-label={`Deliverables ${item.title}`}>
                {item.deliverables.map((deliverable) => (
                  <li key={deliverable} className="flex gap-x-3 items-start">
                    <CheckCircle2 className="h-5 w-5 flex-none text-cyan-600 mt-0.5" aria-hidden="true" />
                    <span className="text-sm text-ink-700 leading-6">{deliverable}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <a 
                  href="/#contact" 
                  className="group flex items-center justify-between text-sm font-semibold text-navy-950 hover:text-cyan-600 transition-colors"
                >
                  Jadwalkan Konsultasi
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cloud group-hover:bg-cyan-50 transition-colors">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
            
            {/* Gallery / Showcase */}
            <div className="grid gap-6">
              <h2 className="text-3xl font-semibold text-ink-900 mb-2">
                Studi Kasus & Referensi
              </h2>
              <p className="text-ink-500 leading-relaxed mb-6">
                Lihat bagaimana solusi {item.title} kami diterapkan untuk menyelesaikan berbagai tantangan bisnis yang spesifik dengan pendekatan modern dan efisien.
              </p>
              
              <div className="w-full flex items-center justify-center">
                <TechShowcase slug={slug} />
              </div>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
}
