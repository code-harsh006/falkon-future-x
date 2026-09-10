import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getService, type Service } from "@/lib/services-data";

export default function ServiceDetail({ service }: { service: Service }) {
  const Icon = service.icon;
  const related = service.related
    .map((id) => getService(id))
    .filter((s): s is Service => Boolean(s));

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <Navbar />

      <main className="container-rivet pt-32 pb-20 md:pt-36">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <Link href="/services" className="hover:text-neutral-900 transition-colors">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-neutral-900">{service.shortTitle}</span>
        </nav>

        {/* Header */}
        <header className="mt-10 border-b border-[hsl(var(--border))] pb-10">
          <span className="eyebrow">{service.categoryLabel}</span>
          <div className="mt-5 flex items-start gap-5">
            <div className="hidden sm:flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-[hsl(var(--border))] bg-white">
              <Icon className="h-6 w-6 text-neutral-900" aria-hidden="true" />
            </div>
            <div>
              <h1 className="section-title">{service.title}</h1>
              <p className="lead mt-4 max-w-2xl">{service.tagline}</p>
            </div>
          </div>
        </header>

        {/* Body grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main column */}
          <div className="lg:col-span-8">
            <div className="space-y-5 text-[15px] leading-relaxed text-neutral-600">
              {service.paragraphs.map((p, i) => (
                <p key={i} className="text-pretty">{p}</p>
              ))}
            </div>

            {/* Features */}
            <section className="mt-12">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {service.featuresTitle}
              </h2>
              <ul className="mt-5 divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
                {service.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 py-3.5">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--accent))]" aria-hidden="true" />
                    <span className="text-sm text-neutral-700">{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Pillars */}
            <section className="mt-12">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {service.pillarsTitle}
              </h2>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.pillars.map((p, i) => (
                  <div key={i} className="panel p-5">
                    <h3 className="text-sm font-semibold text-neutral-900">{p.title}</h3>
                    <p className="mt-2 text-sm text-neutral-600 leading-relaxed text-pretty">{p.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-4">
            <div className="panel p-6">
              <div className="flex items-baseline justify-between">
                <span className="mono-pill">{service.stat.badge}</span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-neutral-900">{service.stat.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed text-pretty">{service.stat.text}</p>
            </div>

            {related.length > 0 && (
              <div className="panel p-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  Related ventures
                </h3>
                <ul className="mt-4 divide-y divide-[hsl(var(--border))]">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link
                        href={`/services/${r.id}`}
                        className="group flex items-center justify-between gap-2 py-3 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                      >
                        {r.shortTitle}
                        <ArrowUpRight className="h-4 w-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl bg-neutral-900 p-6 text-white">
              <h3 className="text-sm font-semibold">Intake assessment</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300 text-pretty">{service.cta.text}</p>
              <Link
                href="/#contact"
                className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-white text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
              >
                {service.cta.label}
              </Link>
            </div>
          </aside>
        </div>

        {/* Back link */}
        <div className="mt-14 border-t border-[hsl(var(--border))] pt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all services
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
