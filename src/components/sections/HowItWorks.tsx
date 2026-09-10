import { ArrowRight } from "lucide-react";

const steps = [
  { n: "01", title: "Issue", desc: "Brands tag packaging with serialized QR codes at registration." },
  { n: "02", title: "Scan", desc: "Consumers scan to identify the polymer and learn how to sort it." },
  { n: "03", title: "Collect", desc: "Segregated waste is picked up along existing delivery routes." },
  { n: "04", title: "Verify", desc: "Certified recyclers process material; recovery is logged and audited." },
  { n: "05", title: "Reward", desc: "Verified impact becomes EPR credit and carbon offsets, paid back to the loop." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[hsl(var(--ink))] text-neutral-300">
      <div className="container-rivet section-py">
        <div className="max-w-2xl">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            How the loop works
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1] text-white text-balance">
            Five steps, one closed loop.
          </h2>
          <p className="mt-5 text-base md:text-lg text-neutral-400 leading-relaxed text-pretty">
            Each step produces the data the next one needs, so recovery is measurable
            end to end — no black boxes.
          </p>
        </div>

        <div className="mt-14">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-px bg-neutral-800 border border-neutral-800 rounded-xl overflow-hidden">
            {steps.map((step, i) => (
              <div key={step.n} className="relative bg-[hsl(var(--ink))] p-6 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-neutral-500">{step.n}</span>
                  {i < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-neutral-700 hidden md:block" />
                  )}
                </div>
                <h3 className="mt-6 text-base font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed text-pretty">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-neutral-500">
            Carbon accounting follows the Verra VM0044 methodology. Partner data shown
            in reports is permissioned and anonymized until a partner opts in.
          </p>
        </div>
      </div>
    </section>
  );
}
