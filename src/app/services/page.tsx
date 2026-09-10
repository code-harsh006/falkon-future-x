"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, Search, Inbox } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { services, categories } from "@/lib/services-data";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return services.filter((s) => {
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "all" || s.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-background text-neutral-900">
      <Navbar />

      <main className="container-rivet pt-32 pb-20 md:pt-36">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-neutral-900">Services</span>
        </nav>

        {/* Header */}
        <header className="mt-10 max-w-2xl">
          <span className="eyebrow">Ventures</span>
          <h1 className="section-title mt-4">Ecosystem services.</h1>
          <p className="lead mt-5">
            Specialised divisions solving connected challenges across
            infrastructure, resource allocation, and digital security.
          </p>
        </header>

        {/* Controls */}
        <div className="mt-12 flex flex-col gap-4 border-b border-[hsl(var(--border))] pb-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Filter services by category">
            {categories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-[hsl(var(--border))] bg-white text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <label htmlFor="service-search" className="sr-only">Search services</label>
            <input
              id="service-search"
              type="text"
              placeholder="Search services"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-[hsl(var(--border))] bg-white pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 border-l border-t border-[hsl(var(--border))] md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => {
              const Icon = s.icon;
              return (
                <Link
                  key={s.id}
                  href={`/services/${s.id}`}
                  className="group flex min-h-[220px] flex-col justify-between border-b border-r border-[hsl(var(--border))] bg-white p-6 transition-colors hover:bg-neutral-50"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[hsl(var(--border))] bg-background">
                        <Icon className="h-5 w-5 text-neutral-900" aria-hidden="true" />
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-neutral-900" aria-hidden="true" />
                    </div>
                    <h2 className="mt-5 text-base font-semibold text-neutral-900">{s.shortTitle}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 text-pretty">{s.summary}</p>
                  </div>
                  <span className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                    {s.categoryLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center rounded-xl border border-dashed border-[hsl(var(--border))] py-20 text-center">
            <Inbox className="h-8 w-8 text-neutral-400" aria-hidden="true" />
            <h3 className="mt-4 text-sm font-semibold text-neutral-900">No services found</h3>
            <p className="mt-1 text-xs text-neutral-500">Try adjusting your search or category filter.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-xl bg-neutral-900 p-8 text-white md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold">Request a customised advisory assessment</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-300 text-pretty">
              We run technical integration audits across e-commerce, smart waste,
              cyber defence, and renewable grids.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex h-11 flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
          >
            Connect with a specialist
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
