"use client";

import Reveal from "./Reveal";

/* ─────────────────────────────────────────────
   Simplified Europe SVG paths + pin coordinates
   All values are percentages of the 600×500 viewBox.
   Pins:
     Warsaw  (PL)  ≈ 390, 190
     Frankfurt (DE) ≈ 275, 220
     Amsterdam–Brussels (BNL) ≈ 210, 170
   ───────────────────────────────────────────── */

const EUROPE_PATH = `
  M 105,140
  C 110,110 130,90  160,88
  C 175,80  190,72  210,68
  C 230,62  250,60  275,55
  C 300,50  330,48  360,52
  C 385,55  410,65  430,80
  C 450,92  460,108 465,128
  C 470,150 468,168 460,185
  C 452,200 440,210 428,220
  C 416,230 400,240 395,255
  C 390,270 392,285 385,300
  C 378,315 362,328 345,338
  C 330,346 312,350 298,355
  C 280,360 265,365 248,370
  C 230,375 215,378 198,375
  C 182,372 170,362 162,350
  C 154,338 150,320 145,305
  C 140,290 132,278 120,270
  C 108,262 95,258  88,248
  C 78,234  75,215  80,195
  C 85,175  98,158 105,140 Z
`;

/* Scandinavia peninsula */
const SCANDINAVIA_PATH = `
  M 250,68
  C 260,50  270,30  280,15
  C 290,5   305,2   318,8
  C 330,14  336,28  332,45
  C 328,58  318,68  305,72
  C 290,76  270,72  250,68 Z
`;

/* Iberian peninsula */
const IBERIA_PATH = `
  M 105,258
  C 95,265  85,280  80,298
  C 75,315  78,332  88,345
  C 98,358  115,365 132,368
  C 148,370 162,362 162,350
  C 162,338 150,320 145,305
  C 140,290 132,278 120,270 Z
`;

/* Italian boot rough */
const ITALY_PATH = `
  M 278,310
  C 282,325 280,342 275,355
  C 270,368 260,378 252,388
  C 244,396 234,400 228,398
  C 220,395 218,385 222,375
  C 226,365 236,358 242,348
  C 248,338 250,325 252,312 Z
`;

const PINS: {
  id: string;
  cx: number;
  cy: number;
  label: string;
  sublabel: string;
}[] = [
  { id: "pl", cx: 390, cy: 190, label: "Warsaw", sublabel: "PL" },
  { id: "de", cx: 275, cy: 222, label: "Frankfurt", sublabel: "DE" },
  { id: "bnl", cx: 210, cy: 170, label: "Amsterdam", sublabel: "BNL" },
];

const CARDS = [
  {
    tag: "POLAND",
    name: "Arkpol PL",
    address: "Str. Główna 9a, Nowa Wieś — suburbs of Warsaw",
    capacity: "2,300 m² warehouse · origin-market HQ",
    pinId: "pl",
  },
  {
    tag: "GERMANY",
    name: "Arkpol DE",
    address: "Frankfurt am Main",
    capacity: "1,500 m² warehouse · Central-Europe hub",
    pinId: "de",
  },
  {
    tag: "BENELUX",
    name: "Arkpol BNL",
    address: "Amsterdam – Brussels corridor",
    capacity: "Benelux & Switzerland coverage",
    pinId: "bnl",
  },
];

export default function EntityMap() {
  return (
    <section id="network" className="amb bg-navy text-bone py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6">

        {/* Header */}
        <Reveal>
          <p className="text-gold tracking-[0.18em] text-xs uppercase mb-4 font-semibold">
            Our Network
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-bone leading-tight max-w-xl">
            Three entities.<br />One European backbone.
          </h2>
        </Reveal>

        {/* Two-column layout */}
        <div className="mt-16 flex flex-col lg:flex-row gap-12 lg:gap-8 items-start">

          {/* ── MAP ── */}
          <Reveal className="w-full lg:w-[55%] shrink-0">
            <div className="relative rounded-2xl overflow-hidden"
              style={{ background: "linear-gradient(145deg, #0d1b2a 0%, #0a1520 60%, #0d1b2a 100%)" }}>

              <svg
                viewBox="0 0 600 500"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto"
                aria-label="Europe entity map"
              >
                <defs>
                  {/* Subtle grid pattern */}
                  <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="12" cy="12" r="0.8" fill="#1f2d3d" />
                  </pattern>

                  {/* Glow filter for pins */}
                  <filter id="pinGlow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Subtle landmass glow */}
                  <filter id="landGlow" x="-5%" y="-5%" width="110%" height="110%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Connector line gradient */}
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#c9a84c" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Background dot grid */}
                <rect width="600" height="500" fill="url(#dotGrid)" />

                {/* Soft outer vignette */}
                <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
                  <stop offset="40%" stopColor="transparent" />
                  <stop offset="100%" stopColor="#0d1b2a" stopOpacity="0.6" />
                </radialGradient>
                <rect width="600" height="500" fill="url(#vignette)" />

                {/* ── Landmass ── */}
                <g filter="url(#landGlow)">
                  {/* Main landmass */}
                  <path d={EUROPE_PATH} fill="#1b4f72" fillOpacity="0.22" stroke="#1f2d3d" strokeWidth="1.2" />
                  <path d={SCANDINAVIA_PATH} fill="#1b4f72" fillOpacity="0.22" stroke="#1f2d3d" strokeWidth="1.2" />
                  <path d={IBERIA_PATH} fill="#1b4f72" fillOpacity="0.22" stroke="#1f2d3d" strokeWidth="1.2" />
                  <path d={ITALY_PATH} fill="#1b4f72" fillOpacity="0.22" stroke="#1f2d3d" strokeWidth="1.2" />
                </g>

                {/* Interior country borders suggestion — faint lines */}
                <g stroke="#1f2d3d" strokeWidth="0.6" opacity="0.6" strokeDasharray="3 5">
                  <line x1="275" y1="100" x2="275" y2="300" />
                  <line x1="320" y1="90" x2="320" y2="280" />
                  <line x1="130" y1="200" x2="440" y2="200" />
                  <line x1="130" y1="250" x2="400" y2="250" />
                  <line x1="160" y1="150" x2="430" y2="150" />
                </g>

                {/* ── Connector lines ── */}
                {/* BNL → DE */}
                <line
                  x1={PINS[2].cx} y1={PINS[2].cy}
                  x2={PINS[1].cx} y2={PINS[1].cy}
                  stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.35"
                  strokeDasharray="4 6"
                />
                {/* DE → PL */}
                <line
                  x1={PINS[1].cx} y1={PINS[1].cy}
                  x2={PINS[0].cx} y2={PINS[0].cy}
                  stroke="#c9a84c" strokeWidth="1" strokeOpacity="0.35"
                  strokeDasharray="4 6"
                />
                {/* BNL → PL (long arc implied by straight line) */}
                <line
                  x1={PINS[2].cx} y1={PINS[2].cy}
                  x2={PINS[0].cx} y2={PINS[0].cy}
                  stroke="#c9a84c" strokeWidth="0.5" strokeOpacity="0.18"
                  strokeDasharray="2 8"
                />

                {/* ── Gold pins ── */}
                {PINS.map((pin) => (
                  <g key={pin.id} filter="url(#pinGlow)">
                    {/* Outer pulsing ring 1 */}
                    <circle cx={pin.cx} cy={pin.cy} r="18" fill="none" stroke="#c9a84c" strokeWidth="0.8" strokeOpacity="0.3">
                      <animate attributeName="r" values="12;22;12" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
                    </circle>

                    {/* Inner pulsing ring 2 — offset timing */}
                    <circle cx={pin.cx} cy={pin.cy} r="8" fill="none" stroke="#dcc16f" strokeWidth="0.8" strokeOpacity="0.4">
                      <animate attributeName="r" values="7;14;7" dur="3s" begin="0.8s" repeatCount="indefinite" />
                      <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="3s" begin="0.8s" repeatCount="indefinite" />
                    </circle>

                    {/* Solid gold dot */}
                    <circle cx={pin.cx} cy={pin.cy} r="4" fill="#c9a84c" />
                    <circle cx={pin.cx} cy={pin.cy} r="2" fill="#dcc16f" />

                    {/* City label */}
                    <g transform={`translate(${pin.cx + 10}, ${pin.cy - 6})`}>
                      <rect x="-2" y="-9" width={pin.label.length * 6.2 + 14} height="18" rx="3"
                        fill="#0d1b2a" fillOpacity="0.85" />
                      <text
                        x="5" y="4"
                        fontSize="9"
                        fontFamily="Inter, sans-serif"
                        fontWeight="600"
                        fill="#dcc16f"
                        letterSpacing="0.04em"
                      >
                        {pin.label}
                      </text>
                      <text
                        x={pin.label.length * 6.2 + 6} y="4"
                        fontSize="7"
                        fontFamily="Inter, sans-serif"
                        fill="#c8cdd4"
                        letterSpacing="0.03em"
                      >
                        {pin.sublabel}
                      </text>
                    </g>
                  </g>
                ))}
              </svg>
            </div>
          </Reveal>

          {/* ── ENTITY CARDS ── */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            {CARDS.map((card, i) => (
              <Reveal key={card.pinId} delay={i * 120}>
                <div
                  className="rounded-xl border border-line p-6 group transition-colors duration-300 hover:border-gold/40"
                  style={{ background: "rgba(10, 18, 28, 0.7)" }}
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
                      style={{ boxShadow: "0 0 6px #c9a84c" }}
                    />
                    {card.capacity}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* Network footnote */}
            <Reveal delay={400}>
              <p className="text-bone-dim text-xs leading-relaxed pt-2 border-t border-line mt-1">
                All three entities operate under unified quality and compliance standards, enabling seamless cross-border fulfilment across 25+ EU markets.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
