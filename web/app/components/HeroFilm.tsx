"use client";

import { useEffect, useRef } from "react";
import { useT } from "../i18n";

const DESTINATIONS = [
  "Warszawa", "Frankfurt", "Amsterdam", "London", "Praha",
  "Wien", "Paris", "Madrid", "Dubai", "New York", "Singapore",
];

function Marquee() {
  const row = [...DESTINATIONS, ...DESTINATIONS];
  return (
    <div className="relative overflow-hidden border-t border-white/10 py-4">
      <div className="marquee-track">
        {row.map((city, i) => (
          <span key={i} className="flex items-center whitespace-nowrap">
            <span className="px-7 font-display text-lg text-bone/55 md:text-xl">{city}</span>
            <span className="h-1 w-1 rounded-full bg-gold/70" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HeroFilm() {
  const t = useT();
  const imgRef = useRef<HTMLImageElement>(null);

  // Event-driven parallax: cursor + scroll. Deliberately NOT a CSS/timeline
  // animation, so it runs even when an offscreen tab's document timeline is
  // throttled. Image is over-scaled so translation never reveals an edge.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0, my = 0, sy = 0;
    // Apply synchronously: transform writes are compositor-only and cheap, and
    // this avoids depending on requestAnimationFrame (which is paused in
    // throttled/offscreen tabs, where rAF-batched parallax would never run).
    const apply = () => {
      const el = imgRef.current;
      if (el) el.style.transform = `scale(1.16) translate3d(${mx}px, ${my + sy}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      mx = -(e.clientX / window.innerWidth - 0.5) * 26;
      my = -(e.clientY / window.innerHeight - 0.5) * 26;
      apply();
    };
    const onScroll = () => { sy = window.scrollY * 0.16; apply(); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden bg-navy">
      {/* full-bleed cinematic image — Arkpol-owned, generated via PBS xAI
          (grok-imagine), photographic style. Replace with real Arkpol
          photography when available. */}
      <img
        ref={imgRef}
        src="/hero.jpg"
        alt="International container shipping terminal at dusk"
        className="absolute inset-0 z-0 h-full w-full object-cover will-change-transform"
        style={{ transform: "scale(1.16)" }}
        draggable={false}
      />

      {/* cinematic grade: darken + left-weighted gradient for type legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(95deg, rgba(20,21,24,0.92) 0%, rgba(20,21,24,0.72) 32%, rgba(20,21,24,0.28) 60%, rgba(20,21,24,0.12) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(0deg, rgba(20,21,24,0.85) 0%, rgba(20,21,24,0) 38%), radial-gradient(120% 80% at 50% 18%, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 pt-28">
        <div className="hero-rise">
          <h1 className="font-display text-[clamp(3.2rem,9vw,7rem)] font-bold leading-[0.95] text-bone drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)]">
            {t.hero.titleA}
            <br />
            <span className="relative inline-block">
              {t.hero.titleAccent}
              <span className="text-gold">.</span>
              <span
                aria-hidden
                className="absolute -bottom-2 left-0 h-[3px] bg-gold/90"
                style={{ width: "2.6em" }}
              />
            </span>
          </h1>
        </div>
        <div className="hero-rise" style={{ animationDelay: "240ms" }}>
          <p className="mt-9 max-w-xl text-lg text-bone/80 md:text-xl">
            {t.hero.sub}
          </p>
        </div>
        <div className="hero-rise" style={{ animationDelay: "360ms" }}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <a
              href="#quote"
              className="rounded-[2px] bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:bg-gold-bright"
            >
              {t.hero.ctaQuote} →
            </a>
            <a
              href="#services"
              className="rounded-[2px] border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-wider text-bone/90 backdrop-blur-[2px] transition-colors hover:border-white/60 hover:bg-white/5"
            >
              {t.hero.ctaServices}
            </a>
          </div>
        </div>
      </div>

      {/* signature footer band: kinetic destinations */}
      <div className="relative z-10">
        <p className="mx-auto mb-3 max-w-[1200px] px-6 text-[11px] uppercase tracking-[0.3em] text-bone/40">
          {t.hero.marqueeLabel}
        </p>
        <Marquee />
      </div>
    </section>
  );
}
