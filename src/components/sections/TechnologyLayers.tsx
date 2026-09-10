const layers = [
  {
    title: "QR product tracking",
    tags: ["Serialized codes", "EPR ledger", "Brand portal"],
    desc: "Brands register packaging and get unique codes that follow each item from shelf to recovery, producing an auditable EPR compliance trail.",
  },
  {
    title: "AI polymer scanning",
    tags: ["Computer vision", "Resin ID", "Sorting"],
    desc: "A phone-camera scan identifies polymer grade in seconds and returns clear recycling instructions, cutting contamination at the source.",
  },
  {
    title: "Smart geolocation",
    tags: ["Drop-off routing", "Coverage map", "Pickups"],
    desc: "Consumers are routed to the nearest verified collection point, and pickups ride existing delivery routes instead of a new fleet.",
  },
  {
    title: "IoT smart bins",
    tags: ["Fill sensors", "Auto-sort", "RFID"],
    desc: "Connected bins measure fill levels and segregate dry from wet waste, so collection is scheduled by data rather than guesswork.",
  },
  {
    title: "Carbon-credit offsetting",
    tags: ["Verra VM0044", "Verification", "Reporting"],
    desc: "Avoided emissions are calculated against a recognised methodology and issued as verified credits with transparent reporting.",
  },
];

export default function TechnologyLayers() {
  return (
    <section id="technology" className="section-py border-t border-[hsl(var(--border))]">
      <div className="container-rivet">
        <div className="max-w-2xl">
          <span className="eyebrow">What we build</span>
          <h2 className="section-title mt-4">
            A stack of connected layers, each doing one job well.
          </h2>
          <p className="lead mt-5">
            Every layer is useful on its own and stronger together — track a product,
            scan it, collect it, and account for the impact.
          </p>
        </div>

        <div className="mt-14 border-t border-[hsl(var(--border))]">
          {layers.map((layer, i) => (
            <div
              key={layer.title}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-b border-[hsl(var(--border))]"
            >
              <div className="md:col-span-1">
                <span className="text-2xl font-semibold text-neutral-300 tabular tracking-tight">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-lg font-semibold text-neutral-900">{layer.title}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {layer.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-white px-2.5 py-0.5 text-xs text-neutral-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:col-span-7">
                <p className="text-[15px] text-neutral-600 leading-relaxed text-pretty">
                  {layer.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
