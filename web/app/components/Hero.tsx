"use client";

import { useEffect, useRef, useState } from "react";

/* Approximate positions on a 1000x600 abstract-Europe canvas */
const ORIGIN = { x: 560, y: 250, label: "Warsaw" };
const PINS = [
  { x: 432, y: 286, label: "Frankfurt", at: 0.34 },
  { x: 398, y: 214, label: "Amsterdam", at: 0.56 },
  { x: 902, y: 430, label: "Worldwide", at: 0.92 },
];

/* One continuous route: Warsaw → Frankfurt → Amsterdam → long arc out (worldwide) */
const ROUTE_D = "M560 250 L432 286 L398 214 Q650 120 902 430";

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setP(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollable = el.offsetHeight - window.innerHeight;
        const passed = Math.min(Math.max(-rect.top, 0), scrollable);
        setP(scrollable > 0 ? passed / scrollable : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return p;
}

/* Faint steel dot-matrix suggesting Europe (abstract, not literal) */
function DotMatrix() {
  const dots = [];
  const cols = 26;
  const rows = 16;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 60 + c * 35;
      const y = 60 + r * 32;
      const edge =
        Math.abs(c - cols / 2) / (cols / 2) + Math.abs(r - rows / 2) / (rows / 2);
      const o = Math.max(0.04, 0.16 - edge * 0.06);
      dots.push(
        <circle key={`${r}-${c}`} cx={x} cy={y} r={1.6} fill="#1b4f72" opacity={o} />
      );
    }
  }
  return <g>{dots}</g>;
}

export default function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(wrapRef);

  const routeP = Math.min(Math.max((p - 0.12) / 0.7, 0), 1);
  const copyOpacity = Math.max(1 - p * 1.25, 0.08);
  const copyShift = -p * 48;
  const glow = 0.05 + routeP * 0.22;

  return (
    <section ref={wrapRef} id="top" className="relative h-[220vh] bg-navy">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ambient gold glow, intensifying as the network completes */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(65% 55% at 82% 14%, rgba(201,168,76,${glow}), transparent 70%), radial-gradient(60% 50% at 10% 90%, rgba(201,168,76,${glow * 0.7}), transparent 70%)`,
          }}
        />
        {/* depth vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(0,0,0,0.45))",
          }}
        />

        {/* the route-reveal canvas */}
        <svg
          aria-hidden
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
        >
          <DotMatrix />

          {/* dormant potential network (steel, always faintly visible) */}
          <path d={ROUTE_D} fill="none" stroke="#1b4f72" strokeWidth={1.4} opacity={0.5} />

          {/* the gold route, drawn by scroll progress */}
          <path
            d={ROUTE_D}
            fill="none"
            stroke="#c9a84c"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1 - routeP,
              filter: "drop-shadow(0 0 6px rgba(201,168,76,0.55))",
            }}
          />

          {/* origin — always lit */}
          <g>
            <circle cx={ORIGIN.x} cy={ORIGIN.y} r={5.5} fill="#c9a84c" />
            <circle cx={ORIGIN.x} cy={ORIGIN.y} r={11} fill="none" stroke="#c9a84c" strokeWidth={1} opacity={0.5} />
            <text x={ORIGIN.x + 14} y={ORIGIN.y + 4} fill="#c8cdd4" fontSize={15}>
              {ORIGIN.label}
            </text>
          </g>

          {/* destination pins ignite as the route reaches them */}
          {PINS.map((pin) => {
            const lit = routeP >= pin.at;
            return (
              <g key={pin.label} style={{ opacity: lit ? 1 : 0.3, transition: "opacity 0.5s ease" }}>
                <circle cx={pin.x} cy={pin.y} r={lit ? 5.5 : 3} fill={lit ? "#c9a84c" : "#1b4f72"} style={{ transition: "r 0.4s ease, fill 0.4s ease" }} />
                {lit && (
                  <circle cx={pin.x} cy={pin.y} r={11} fill="none" stroke="#c9a84c" strokeWidth={1} opacity={0.5}>
                    <animate attributeName="r" from="6" to="20" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                <text x={pin.x + 13} y={pin.y + 4} fill={lit ? "#c8cdd4" : "#5a6b7d"} fontSize={15} style={{ transition: "fill 0.4s ease" }}>
                  {pin.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* hero copy */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1200px] flex-col justify-center px-6">
          <div style={{ opacity: copyOpacity, transform: `translateY(${copyShift}px)` }}>
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.28em] text-gold">
              Est. 1995 · IAM Member · FIDI-Accredited Partners
            </p>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.98] text-bone">
              Move With{" "}
              <span className="underline-draw" style={{ ["--draw" as string]: `${Math.round(routeP * 100)}%` }}>
                Certainty.
              </span>
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
        </div>

        {/* scroll cue, fades out once the reveal starts */}
        <div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
          style={{ opacity: Math.max(1 - p * 4, 0) }}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-bone/40">Scroll</span>
          <div className="mx-auto mt-2 h-8 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
        </div>
      </div>
    </section>
  );
}
