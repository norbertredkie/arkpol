"use client";

import Reveal from "./Reveal";
import { useT } from "../i18n";

/* Pin positions as percentages of the real Europe map box (680×520).
   Derived from the actual country geometry + each city's lat/lon. City names
   are proper nouns and stay constant across languages. */
const PINS = [
  { id: "pl", x: 57.9, y: 58.7, label: "Warsaw", sublabel: "PL" },
  { id: "de", x: 43.8, y: 64.6, label: "Frankfurt", sublabel: "DE" },
];

const LEGEND_COLORS = ["#f4646e", "#c43d48", "#7d2f38", "#b0696f"];

export default function EntityMap() {
  const t = useT();
  const CARDS = t.network.cards;
  const LEGEND = LEGEND_COLORS.map((color, i) => ({ color, label: t.network.legend[i] }));
  return (
    <section id="network" className="amb bg-navy text-bone py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">

        {/* Header */}
        <Reveal>
          <p className="text-gold tracking-[0.18em] text-xs uppercase mb-4 font-semibold">
            {t.network.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-bone leading-tight max-w-xl">
            {t.network.heading1}<br />{t.network.heading2}
          </h2>
        </Reveal>

        {/* Two-column layout */}
        <div className="mt-16 flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">

          {/* ── MAP (real, accurate Europe geometry — Wikimedia Commons,
                 themed dark; pins placed at true city coordinates) ── */}
          <Reveal className="w-full lg:w-[55%] shrink-0">
            <div
              className="rounded-2xl border border-line overflow-hidden"
              style={{ background: "radial-gradient(120% 100% at 45% 40%, #202124 0%, #161719 70%)" }}
            >
              {/* image + overlay share ONE positioning box sized exactly to the
                  map, so pin %s map to the map (not the map + legend). */}
              <div className="relative">
                <img
                  src="/europe.svg"
                  alt={t.network.mapAlt}
                  className="block w-full h-auto select-none"
                  draggable={false}
                />

                {/* connectors between the two hubs */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <polyline
                    points={PINS.map((p) => `${p.x},${p.y}`).join(" ")}
                    fill="none"
                    stroke="#be1e2d"
                    strokeWidth="0.25"
                    strokeOpacity="0.5"
                    strokeDasharray="0.8 1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* pins */}
                {PINS.map((pin) => (
                  <div
                    key={pin.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/30 map-ping" />
                    <span className="relative block h-3 w-3 rounded-full bg-bone ring-[3px] ring-gold shadow-[0_0_16px_4px_rgba(191,60,71,0.65)]" />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-[3px] bg-navy/90 px-2 py-0.5 text-[10px] font-semibold tracking-wide ring-1 ring-line backdrop-blur-sm">
                      <span className="text-bone">{pin.label}</span>
                      <span className="ml-1 text-bone-dim">{pin.sublabel}</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* coverage legend (sibling — does NOT affect pin positioning) */}
              <div className="flex flex-col gap-2 px-4 py-3 border-t border-line">
                {LEGEND.map((item, i) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <span
                      className="inline-block h-3 w-3 rounded-[2px] shrink-0"
                      style={{
                        background: item.color,
                        boxShadow: i === 0 ? "0 0 0 1.5px #ffe1e3" : undefined,
                      }}
                    />
                    <span className={`text-[11px] tracking-wide ${i === 0 ? "text-bone" : "text-bone-dim"}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* ── ENTITY CARDS ── */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {CARDS.map((card, i) => (
              <Reveal key={card.tag} delay={i * 120}>
                <div
                  className="rounded-xl border border-line p-6 group transition-colors duration-300 hover:border-gold/40"
                  style={{ background: "rgba(255, 255, 255, 0.03)" }}
                >
                  {/* Country tag */}
                  <span className="inline-block text-gold text-[10px] font-semibold tracking-[0.2em] uppercase mb-3 border border-gold/30 px-2 py-0.5 rounded-sm">
                    {card.tag}
                  </span>

                  {/* Entity name */}
                  <h3 className="font-display text-2xl text-bone mb-2 leading-tight">
                    {card.name}
                  </h3>

                  {/* Address */}
                  <p className="text-bone-dim text-sm mb-3 leading-relaxed">
                    {card.address}
                  </p>

                  {/* Divider */}
                  <div className="h-px bg-line mb-3" />

                  {/* Capacity line */}
                  <p className="text-gold text-xs font-medium tracking-wide flex items-center gap-2">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full bg-gold shrink-0"
                      style={{ boxShadow: "0 0 6px #be1e2d" }}
                    />
                    {card.capacity}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Network footnote */}
            <Reveal delay={400}>
              <p className="text-bone-dim text-xs leading-relaxed pt-2 border-t border-line mt-1">
                {t.network.footnote}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
