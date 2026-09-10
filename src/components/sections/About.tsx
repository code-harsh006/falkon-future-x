import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="section-py border-t border-[hsl(var(--border))]">
      <div className="container-rivet">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <span className="eyebrow">Our mission</span>
            <h2 className="section-title mt-4">
              Less plastic in landfills. More of it back in use.
            </h2>
            <div className="mt-6 space-y-4 lead">
              <p>
                India recovers only a small share of the plastic it produces. Most
                leaks into drains, waterways, and landfill sites. We work with
                municipalities and enterprises to divert that material and route it
                back into the economy.
              </p>
              <p>
                By turning recovery into verifiable EPR compliance and carbon credits,
                the loop becomes self-funding — the people who collect, sort, and
                recycle are paid for the value they create.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { k: "Recover", v: "Divert plastic from landfill" },
                { k: "Verify", v: "Prove compliance and impact" },
                { k: "Reward", v: "Fund the people in the loop" },
              ].map((item) => (
                <div key={item.k} className="border-t border-neutral-900 pt-3">
                  <div className="text-sm font-semibold text-neutral-900">{item.k}</div>
                  <div className="mt-1 text-xs text-neutral-500 leading-snug">{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="panel overflow-hidden">
              <div className="relative aspect-[3/4]">
                <Image src="/plastic_1.jpg" alt="Collected plastic waste" fill unoptimized sizes="(max-width:1024px) 50vw, 320px" className="object-cover" />
              </div>
            </div>
            <div className="panel overflow-hidden mt-8">
              <div className="relative aspect-[3/4]">
                <Image src="/plastic_2.jpg" alt="Plastic sorting for recycling" fill unoptimized sizes="(max-width:1024px) 50vw, 320px" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
