"use client";

import { useState } from "react";
import Reveal from "./Reveal";

/* ─── Service tile data ─────────────────────────────────────────────────── */
const services = [
  {
    title: "International Moving (Europe)",
    description: "Door-to-door across the EU with our own crews.",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Truck outline */}
        <rect x="2" y="12" width="22" height="14" rx="1" stroke="#c9a84c" strokeWidth="1.5" />
        <path d="M24 17h6l4 5v4h-10V17Z" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Wheels */}
        <circle cx="9" cy="27" r="3" stroke="#c9a84c" strokeWidth="1.5" />
        <circle cx="28" cy="27" r="3" stroke="#c9a84c" strokeWidth="1.5" />
        {/* EU stars motif — 3 small dots above cab */}
        <circle cx="7" cy="9" r="1" fill="#c9a84c" fillOpacity="0.6" />
        <circle cx="11" cy="7" r="1" fill="#c9a84c" fillOpacity="0.6" />
        <circle cx="15" cy="9" r="1" fill="#c9a84c" fillOpacity="0.6" />
      </svg>
    ),
  },
  {
    title: "Overseas Shipping (Sea + Air)",
    description: "Containerised sea freight and time-critical air moves worldwide.",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Ship hull */}
        <path d="M4 22 L6 28 L30 28 L32 22 Z" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Container stack on deck */}
        <rect x="10" y="16" width="7" height="6" rx="0.5" stroke="#c9a84c" strokeWidth="1.25" />
        <rect x="19" y="16" width="7" height="6" rx="0.5" stroke="#c9a84c" strokeWidth="1.25" />
        {/* Mast */}
        <line x1="18" y1="8" x2="18" y2="16" stroke="#c9a84c" strokeWidth="1.5" />
        <line x1="12" y1="11" x2="24" y2="11" stroke="#c9a84c" strokeWidth="1.25" />
        {/* Waves */}
        <path d="M2 31 Q6 29 10 31 Q14 33 18 31 Q22 29 26 31 Q30 33 34 31" stroke="#c9a84c" strokeWidth="1.25" strokeOpacity="0.5" />
        {/* Plane silhouette top-right */}
        <path d="M26 5 L34 9 L28 10 L26 14 L24 10 L20 10 Z" stroke="#c9a84c" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Corporate & Office Relocations",
    description: "Whole offices and staff mobility, planned to the hour.",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Building */}
        <rect x="4" y="10" width="16" height="22" rx="0.5" stroke="#c9a84c" strokeWidth="1.5" />
        {/* Windows */}
        <rect x="7" y="14" width="4" height="3" rx="0.25" stroke="#c9a84c" strokeWidth="1.1" />
        <rect x="13" y="14" width="4" height="3" rx="0.25" stroke="#c9a84c" strokeWidth="1.1" />
        <rect x="7" y="20" width="4" height="3" rx="0.25" stroke="#c9a84c" strokeWidth="1.1" />
        <rect x="13" y="20" width="4" height="3" rx="0.25" stroke="#c9a84c" strokeWidth="1.1" />
        {/* Door */}
        <rect x="9" y="26" width="6" height="6" rx="0.25" stroke="#c9a84c" strokeWidth="1.25" />
        {/* Arrow pointing right */}
        <path d="M22 18 L32 18" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M28 14 L33 18 L28 22" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Clock motif */}
        <circle cx="30" cy="9" r="4" stroke="#c9a84c" strokeWidth="1.25" />
        <path d="M30 7 L30 9 L32 10" stroke="#c9a84c" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Warehousing & Storage",
    description: "Secure short- and long-term storage in PL & DE warehouses.",
    icon: (
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Warehouse roof */}
        <path d="M2 16 L18 6 L34 16" stroke="#c9a84c" strokeWidth="1.5" strokeLinejoin="round" />
        {/* Warehouse walls */}
        <rect x="4" y="16" width="28" height="16" rx="0.5" stroke="#c9a84c" strokeWidth="1.5" />
        {/* Roller door */}
        <rect x="13" y="22" width="10" height="10" rx="0.25" stroke="#c9a84c" strokeWidth="1.25" />
        <line x1="13" y1="25" x2="23" y2="25" stroke="#c9a84c" strokeWidth="0.75" strokeOpacity="0.6" />
        <line x1="13" y1="28" x2="23" y2="28" stroke="#c9a84c" strokeWidth="0.75" strokeOpacity="0.6" />
        {/* Shelving racks */}
        <line x1="8" y1="18" x2="8" y2="30" stroke="#c9a84c" strokeWidth="1.1" />
        <line x1="6" y1="22" x2="11" y2="22" stroke="#c9a84c" strokeWidth="1.1" />
        <line x1="6" y1="26" x2="11" y2="26" stroke="#c9a84c" strokeWidth="1.1" />
        {/* Lock icon */}
        <rect x="26" y="20" width="6" height="5" rx="0.5" stroke="#c9a84c" strokeWidth="1.1" />
        <path d="M27.5 20 Q27.5 17 29 17 Q30.5 17 30.5 20" stroke="#c9a84c" strokeWidth="1.1" />
        <circle cx="29" cy="23" r="0.75" fill="#c9a84c" />
      </svg>
    ),
  },
];

/* ─── Form fields ───────────────────────────────────────────────────────── */
const fields: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  autoComplete?: string;
}[] = [
  {
    id: "q-name",
    label: "Full Name",
    type: "text",
    placeholder: "Jane Smith",
    required: true,
    autoComplete: "name",
  },
  {
    id: "q-company",
    label: "Company",
    type: "text",
    placeholder: "Acme Corp",
    required: false,
    autoComplete: "organization",
  },
  {
    id: "q-origin",
    label: "Origin City",
    type: "text",
    placeholder: "Warsaw",
    required: true,
    autoComplete: "address-level2",
  },
  {
    id: "q-destination",
    label: "Destination Country",
    type: "text",
    placeholder: "Germany",
    required: true,
    autoComplete: "country-name",
  },
  {
    id: "q-date",
    label: "Estimated Move Date",
    type: "date",
    placeholder: "",
    required: false,
    autoComplete: "off",
  },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function Services() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="services" className="bg-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">

        {/* ── Section header ── */}
        <Reveal>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            WHAT WE DO
          </p>
        </Reveal>
        <Reveal delay={80}>
          <h2
            className="font-display text-ink mb-16 max-w-xl leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Four services. One accountable team.
          </h2>
        </Reveal>

        {/* ── Split layout: tiles left, form right ── */}
        <div className="grid gap-10 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px]">

          {/* ── LEFT: 2×2 service tiles ── */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 80}>
                <article
                  className="
                    group relative flex h-full flex-col gap-4 border border-line-light bg-white
                    p-7 transition-all duration-300
                    hover:-translate-y-1 hover:shadow-[0_8px_32px_0_rgba(13,27,42,0.10)]
                    hover:border-gold/40
                  "
                >
                  {/* Gold left-border accent on hover */}
                  <div
                    aria-hidden
                    className="absolute left-0 top-0 h-full w-[3px] origin-bottom scale-y-0 bg-gold transition-transform duration-300 group-hover:scale-y-100"
                  />

                  {/* Icon */}
                  <div className="flex-shrink-0">{svc.icon}</div>

                  {/* Text */}
                  <div>
                    <h3
                      className="font-display text-ink mb-2 font-semibold leading-snug"
                      style={{ fontSize: "1.15rem" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4a5568]">
                      {svc.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* ── RIGHT: Quote form on navy card ── */}
          <Reveal delay={200}>
            <div
              id="quote"
              className="flex flex-col bg-navy p-8 md:p-10"
              style={{ scrollMarginTop: "80px" }}
            >
              {submitted ? (
                /* Success state */
                <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
                  {/* Checkmark icon */}
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-6"
                    aria-hidden="true"
                  >
                    <circle cx="26" cy="26" r="25" stroke="#c9a84c" strokeWidth="1.5" strokeOpacity="0.4" />
                    <path
                      d="M15 27 L22 34 L37 19"
                      stroke="#c9a84c"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3
                    className="font-display mb-4 font-semibold text-bone leading-tight"
                    style={{ fontSize: "1.5rem" }}
                  >
                    You&rsquo;re on our radar.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#c8cdd4]">
                    Thanks — we&rsquo;ll be in touch within one business day at{" "}
                    <a
                      href="mailto:arkpol@arkpol.com"
                      className="text-gold underline underline-offset-2 hover:text-gold-bright"
                    >
                      arkpol@arkpol.com
                    </a>
                    .
                  </p>
                </div>
              ) : (
                /* Form */
                <>
                  <div className="mb-7">
                    <h3
                      className="font-display mb-2 font-semibold text-bone leading-tight"
                      style={{ fontSize: "1.6rem" }}
                    >
                      Get your quote
                    </h3>
                    <p className="text-sm leading-relaxed text-[#c8cdd4]">
                      Tell us where you&rsquo;re going. We reply within one business day.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                    {fields.map((f) => (
                      <div key={f.id} className="flex flex-col gap-1.5">
                        <label
                          htmlFor={f.id}
                          className="text-xs font-semibold uppercase tracking-widest text-[#c8cdd4]"
                        >
                          {f.label}
                          {f.required && (
                            <span className="ml-1 text-gold" aria-hidden="true">
                              *
                            </span>
                          )}
                        </label>
                        <input
                          id={f.id}
                          name={f.id}
                          type={f.type}
                          placeholder={f.placeholder || undefined}
                          required={f.required}
                          autoComplete={f.autoComplete}
                          className="
                            w-full border border-[#1f2d3d] bg-[#07111c] px-4 py-3
                            text-sm text-bone placeholder:text-[#4a5a6a]
                            outline-none ring-0 transition-colors duration-200
                            focus:border-gold/60 focus:ring-1 focus:ring-gold/30
                            [color-scheme:dark]
                          "
                        />
                      </div>
                    ))}

                    {/* Required note */}
                    <p className="text-[11px] text-[#4a5a6a]">
                      <span className="text-gold">*</span> Required fields
                    </p>

                    <button
                      type="submit"
                      className="
                        mt-1 w-full bg-gold px-8 py-4 text-sm font-semibold uppercase
                        tracking-widest text-navy transition-colors duration-200
                        hover:bg-[#dcc16f] focus-visible:outline focus-visible:outline-2
                        focus-visible:outline-offset-2 focus-visible:outline-gold
                      "
                    >
                      Get My Quote
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
