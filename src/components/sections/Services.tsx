import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const services = [
  { id: "water-bound-digises-solution", title: "Water resource management", desc: "IoT water audits and sensors that help cities protect and optimise municipal reserves." },
  { id: "smart-waste-management-system", title: "Smart waste bins", desc: "Fill-level sensing, auto-sorting, and RFID tracking for municipal sanitation." },
  { id: "cyber-awareness-guidance", title: "Cybersecurity consultancy", desc: "Threat audits, phishing simulations, and compliance training for teams." },
  { id: "e-commerce", title: "E-commerce frameworks", desc: "Storefronts with logistics, secure payments, and reward integration." },
  { id: "smart-healthcare-solutions", title: "Healthtech", desc: "Telemedicine tooling, encrypted health records, and AI-assisted diagnostics." },
  { id: "new-renewable-energy", title: "Renewable energy audits", desc: "Solar layout design and transition planning for buildings and municipal grids." },
];

export default function Services() {
  return (
    <section id="services" className="section-py border-t border-[hsl(var(--border))]">
      <div className="container-rivet">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">Ventures</span>
            <h2 className="section-title mt-4">Adjacent work that supports the mission.</h2>
            <p className="lead mt-5">
              Focused divisions tackling connected challenges in resources,
              compliance, and secure software.
            </p>
          </div>
          <Link href="/services" className="link-underline text-sm font-medium whitespace-nowrap">
            View all services
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[hsl(var(--border))]">
          {services.map((s) => (
            <Link
              key={s.id}
              href={`/services/${s.id}`}
              className="group p-6 border-b border-r border-[hsl(var(--border))] bg-white hover:bg-neutral-50 transition-colors flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-neutral-900">{s.title}</h3>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 transition-colors flex-shrink-0" />
                </div>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed text-pretty">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
