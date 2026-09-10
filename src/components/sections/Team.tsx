import Image from "next/image";

const team = [
  { name: "Desh Premi", role: "CEO & Founder", desc: "Environmental scientist with 15+ years in solid-waste solutions.", img: "/founder.jpg" },
  { name: "Jadav Madhav", role: "CTO & Co-Founder", desc: "Builds the IoT hardware and tracking systems behind the platform.", img: "/co-founder.jpg" },
  { name: "Amit Kumar", role: "Head of Operations", desc: "Runs last-mile collection and logistics partnerships.", img: "/head-of-operations.jpg" },
  { name: "Sunil K. Gautam, IPS", role: "Board Advisor", desc: "1989-batch AGMUT IPS officer; former Special Commissioner, Delhi Police.", img: "/mentore.jpeg" },
  { name: "Dr. Mansaf Alam", role: "Academic Advisor", desc: "Professor of CS, Jamia Millia Islamia; Young Faculty Fellow, MeitY.", img: "/mentor_2.jpeg" },
];

export default function Team() {
  return (
    <section id="team" className="section-py border-t border-[hsl(var(--border))]">
      <div className="container-rivet">
        <div className="max-w-2xl">
          <span className="eyebrow">Leadership & advisors</span>
          <h2 className="section-title mt-4">The people behind Falkon Future X.</h2>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {team.map((m) => (
            <div key={m.name} className="flex flex-col">
              <div className="panel overflow-hidden">
                <div className="relative aspect-[4/5] bg-neutral-100">
                  <Image
                    src={m.img}
                    alt={m.name}
                    fill
                    unoptimized
                    sizes="(max-width:768px) 50vw, 240px"
                    className="object-cover grayscale hover:grayscale-0 transition-[filter] duration-500"
                  />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-neutral-900">{m.name}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{m.role}</p>
                <p className="mt-2 text-xs text-neutral-500 leading-relaxed text-pretty">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
