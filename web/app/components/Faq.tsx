"use client";

import { useState } from "react";
import { useT } from "../i18n";

export default function Faq() {
  const t = useT();
  const faqs = t.faq.items;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <section id="faq" className="bg-bone text-ink py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto max-w-[1200px] px-6">
        {/* ── Section header ── */}
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {t.faq.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-4xl leading-tight text-ink md:text-5xl">
            {t.faq.heading}
          </h2>
          <p className="text-steel text-base leading-relaxed md:text-lg">
            {t.faq.sub}
          </p>
        </div>

        {/* ── Accordion ── */}
        <div className="divide-y divide-[#e2e2e4] border-y border-[#e2e2e4]">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.has(index);
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={index}>
                <button
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  <span
                    className="font-display text-[1.1rem] leading-snug text-ink transition-colors group-hover:text-gold md:text-[1.15rem]"
                    style={{ fontWeight: 500 }}
                  >
                    {faq.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex-shrink-0 text-gold transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      fontSize: "1.5rem",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "grid-template-rows 300ms ease, opacity 300ms ease",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-[0.9375rem] leading-relaxed text-steel md:text-base max-w-3xl">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Soft CTA ── */}
        <p className="mt-10 text-sm text-steel md:text-base">
          {t.faq.stillHave}
          <a
            href="#quote"
            className="font-medium text-gold underline underline-offset-4 transition-opacity hover:opacity-75"
          >
            {t.faq.requestQuote}
          </a>
          {t.faq.andAsk}
        </p>
      </div>
    </section>
  );
}
