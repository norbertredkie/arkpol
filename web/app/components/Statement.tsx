import Reveal from "./Reveal";

const PROOF = [
  { k: "NATO Sites", v: "Multi-country relocations delivered" },
  { k: "Premier League", v: "Ibrahimović · Fernandinho" },
  { k: "Venice", v: "A household, by water only" },
];

export default function Statement() {
  return (
    <section id="proof" className="bg-bone py-28 text-ink md:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.28em] text-gold">
            Track Record
          </p>
          <h2 className="max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.25rem)] font-bold leading-[1.02]">
            Trusted where it cannot go wrong.
          </h2>
          <p className="mt-7 max-w-xl text-lg text-ink/70">
            Thirty years of moves that left no room for error — the most sensitive,
            the highest-profile, and the merely impossible.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[4px] border border-line-light bg-line-light sm:grid-cols-3">
          {PROOF.map((item, i) => (
            <Reveal key={item.k} delay={i * 90} className="bg-bone p-8">
              <p className="font-display text-2xl font-bold text-navy">{item.k}</p>
              <p className="mt-2 text-sm text-ink/60">{item.v}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
