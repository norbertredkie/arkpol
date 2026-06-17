"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero3D() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section id="top" className="relative h-screen overflow-hidden bg-navy">
      {/* ambient gold glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(60% 60% at 78% 30%, rgba(201,168,76,0.14), transparent 70%), radial-gradient(50% 50% at 12% 88%, rgba(201,168,76,0.07), transparent 70%)",
        }}
      />

      {/* the 3D globe — shifted right on desktop so it reads beside the copy */}
      <div className="absolute inset-0 z-0 md:translate-x-[24%]">
        <GlobeScene reduced={reduced} />
      </div>

      {/* legibility scrim — navy fades in from the left over the globe */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(100deg, rgba(13,27,42,0.92) 0%, rgba(13,27,42,0.6) 26%, rgba(13,27,42,0.08) 48%, rgba(13,27,42,0) 62%)",
        }}
      />

      {/* copy */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col justify-center px-6">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-gold">
          Est. 1995 · IAM Member · FIDI-Accredited Partners
        </p>
        <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.98] text-bone">
          Move With <span className="text-gold">Certainty.</span>
        </h1>
        <p className="mt-7 max-w-xl text-lg text-bone/80 md:text-xl">
          Own crews across Central Europe. 30 years. Worldwide reach.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#quote"
            className="rounded-[2px] bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-navy transition-colors hover:bg-gold-bright"
          >
            Request a Quote →
          </a>
          <a
            href="#services"
            className="rounded-[2px] border border-bone-dim/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-bone transition-colors hover:border-bone-dim hover:bg-bone/5"
          >
            Our Services
          </a>
        </div>
      </div>

      {/* drag hint + scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-bone/40">
          Drag the globe · Scroll
        </span>
        <div className="mx-auto mt-2 h-8 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
