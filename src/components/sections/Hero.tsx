"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "4.1M+", label: "Tonnes of plastic India generates yearly", source: "CPCB, 2022–23" },
  { value: "~10%", label: "Formally recycled today", source: "CPCB estimate" },
  { value: "VM0044", label: "Carbon methodology we align to", source: "Verra" },
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="pt-32 md:pt-40 pb-16 md:pb-20">
      <div className="container-rivet">
        <div className="max-w-3xl">
          <span className="eyebrow">Circular economy infrastructure</span>
          <h1 className="display mt-4">
            Make plastic waste{" "}
            <span className="link-underline">traceable</span>,{" "}
            <span className="link-underline">compliant</span>, and{" "}
            <span className="link-underline">worth recovering</span>.
          </h1>
          <p className="lead mt-6 max-w-2xl">
            Falkon Future X connects brands, consumers, and recyclers with the
            tracking and verification tools that turn a linear waste stream into a
            measurable circular loop — from QR-tagged packaging to verified
            carbon-credit offsetting.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={() => scrollTo("contact")} className="btn-primary">
              Get in touch
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => scrollTo("how-it-works")} className="btn-secondary">
              See how it works
            </button>
          </div>
        </div>

        <div className="mt-14 md:mt-16 panel overflow-hidden">
          <div className="relative aspect-[16/7] w-full bg-neutral-100">
            <Image
              src="/hero-loop.png"
              alt="Sorted recycled plastic materials arranged for processing"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[hsl(var(--border))] border-t border-[hsl(var(--border))]">
            {stats.map((s) => (
              <div key={s.label} className="p-6">
                <div className="text-2xl font-semibold text-neutral-900 tracking-tight">
                  {s.value}
                </div>
                <p className="mt-1.5 text-sm text-neutral-600 leading-snug text-pretty">
                  {s.label}
                </p>
                <p className="mt-2 text-xs text-neutral-400">Source: {s.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
