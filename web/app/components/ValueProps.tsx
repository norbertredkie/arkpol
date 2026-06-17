import Reveal from "./Reveal";

const REASONS = [
  {
    n: "01",
    title: "Precision-Grade Logistics",
    body: "Three decades moving high-value, time-critical and sensitive cargo across borders — every relocation planned, documented and executed to an exacting standard. The complex move is our default setting.",
  },
  {
    n: "02",
    title: "Our Own Crews Where It Counts",
    body: "Across Central and Eastern Europe — our home ground — your move is handled end-to-end by Arkpol's own teams, dispatched from our warehouses in Poland and Germany. One crew, one standard, no handoff surprises.",
  },
  {
    n: "03",
    title: "Accredited Reach, Worldwide",
    body: "Wherever you're headed, you're covered by a vetted international network. As an IAM member working hand-in-hand with FIDI-accredited partners, every leg of your move is held to the same accredited standard — across Europe and beyond.",
  },
];

export default function ValueProps() {
  return (
    <section id="why" className="amb bg-navy py-28 text-bone md:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Why Arkpol
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.04]">
            Not a mover. A logistics standard.
          </h2>
        </Reveal>

        <div className="mt-16 divide-y divide-line border-t border-line">
          {REASONS.map((r, i) => (
            <Reveal key={r.n} delay={i * 90}>
              <div className="grid gap-6 py-10 md:grid-cols-[7rem_1fr_1.1fr] md:items-baseline md:gap-10">
                <span className="font-display text-2xl text-gold/70">{r.n}</span>
                <h3 className="font-display text-2xl font-bold leading-snug md:text-3xl">
                  {r.title}
                </h3>
                <p className="text-base leading-relaxed text-bone-dim">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
