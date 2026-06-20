"use client";

import Reveal from "./Reveal";
import { useT } from "../i18n";

export default function ValueProps() {
  const t = useT();
  const REASONS = t.why.reasons.map((r, i) => ({ n: `0${i + 1}`, ...r }));
  return (
    <section id="why" className="amb bg-navy py-28 text-bone md:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {t.why.eyebrow}
          </p>
          <h2 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.04]">
            {t.why.heading}
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
