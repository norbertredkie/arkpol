"use client";

import Reveal from "./Reveal";
import { useT } from "../i18n";

const PROOF_IMAGES = ["/proof/nato.jpg", "/proof/premier.jpg", "/proof/venice.jpg"];

export default function Statement() {
  const t = useT();
  const PROOF = t.statement.proof;
  return (
    <section id="proof" className="bg-bone py-28 text-ink md:py-40">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.28em] text-gold">
            {t.statement.eyebrow}
          </p>
          <h2 className="max-w-4xl font-display text-[clamp(2.4rem,5.5vw,4.25rem)] font-bold leading-[1.02]">
            {t.statement.heading}
          </h2>
          <p className="mt-7 max-w-xl text-lg text-ink/70">
            {t.statement.sub}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {PROOF.map((item, i) => (
            <Reveal key={item.k} delay={i * 90}>
              <article className="group relative aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={PROOF_IMAGES[i]}
                  alt={item.k}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(20,21,24,0.94) 0%, rgba(20,21,24,0.55) 34%, rgba(20,21,24,0.08) 66%, rgba(20,21,24,0.18) 100%)",
                  }}
                />
                <span aria-hidden className="absolute left-6 top-6 h-[3px] w-10 bg-gold" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-[1.6rem] font-bold leading-tight text-bone">
                    {item.k}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-bone/80">{item.v}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
