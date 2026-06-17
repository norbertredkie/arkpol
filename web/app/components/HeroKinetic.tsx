import Reveal from "./Reveal";

const DESTINATIONS = [
  "Warszawa", "Frankfurt", "Amsterdam", "London", "Praha",
  "Wien", "Paris", "Madrid", "Dubai", "New York", "Singapore",
];

function Marquee() {
  const row = [...DESTINATIONS, ...DESTINATIONS];
  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <div className="marquee-track">
        {row.map((city, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-8 font-display text-2xl text-bone/85 md:text-3xl">{city}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-navy to-transparent" />
    </div>
  );
}

export default function HeroKinetic() {
  return (
    <section id="top" className="amb relative flex min-h-screen flex-col bg-navy">
      {/* faint route accent — a single drawn line, ambient not dominant */}
      <svg
        aria-hidden
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
      >
        <path
          d="M-50 560 C 300 540, 520 320, 820 300 S 1300 180, 1520 120"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
      </svg>

      {/* main */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 pt-28">
        <Reveal>
          <p className="mb-7 text-xs font-medium uppercase tracking-[0.3em] text-gold">
            Est. 1995 · IAM Member · FIDI-Accredited Partners
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-[clamp(3.2rem,9vw,7rem)] font-bold leading-[0.95] text-bone">
            Move With
            <br />
            <span className="flow-text">Certainty.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-xl text-lg text-bone/80 md:text-xl">
            International relocations, handled by people who own the outcome. Own crews
            across Central Europe, an accredited network worldwide, and 30 years of moves
            that simply had to arrive.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <a
              href="#quote"
              className="rounded-[2px] bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-bright"
            >
              Request a Quote →
            </a>
            <a
              href="#services"
              className="rounded-[2px] border border-bone-dim/40 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone-dim hover:bg-bone/5"
            >
              Our Services
            </a>
          </div>
        </Reveal>
      </div>

      {/* the signature moment: kinetic destinations */}
      <div className="relative z-10 pb-10">
        <p className="mx-auto mb-4 max-w-[1200px] px-6 text-[11px] uppercase tracking-[0.3em] text-bone/35">
          Moving Europe — and the world — since 1995
        </p>
        <Marquee />
      </div>
    </section>
  );
}
