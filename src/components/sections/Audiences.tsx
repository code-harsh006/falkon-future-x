const audiences = [
  {
    label: "Consumers",
    title: "Recycle and see it count",
    points: [
      "Scan packaging to learn how to sort it",
      "Find the nearest verified drop-off",
      "Earn rewards for verified recycling",
    ],
  },
  {
    label: "Municipalities · B2G",
    title: "Data-driven collection",
    points: [
      "Sensor-led routes and fill monitoring",
      "Transparent diversion reporting",
      "Pilot programs that scale by ward",
    ],
  },
  {
    label: "Enterprises · B2B",
    title: "Compliance you can prove",
    points: [
      "Auditable EPR tracking per product",
      "Verified carbon-credit offsetting",
      "Reporting that stands up to scrutiny",
    ],
  },
];

export default function Audiences() {
  return (
    <section className="section-py border-t border-[hsl(var(--border))]">
      <div className="container-rivet">
        <div className="max-w-2xl">
          <span className="eyebrow">Who we work with</span>
          <h2 className="section-title mt-4">Built for everyone in the loop.</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {audiences.map((a) => (
            <div key={a.label} className="panel p-6 flex flex-col">
              <span className="eyebrow">{a.label}</span>
              <h3 className="mt-3 text-lg font-semibold text-neutral-900">{a.title}</h3>
              <ul className="mt-5 space-y-3 text-sm text-neutral-600">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 rounded-full bg-neutral-900 flex-shrink-0" />
                    <span className="text-pretty">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
