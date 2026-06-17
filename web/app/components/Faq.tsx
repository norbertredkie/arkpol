"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I move internationally from Poland to Germany?",
    answer:
      "Arkpol handles your Poland–Germany move door-to-door with our own trained crews — no subcontractors. We survey your belongings, pack everything professionally, and transport it directly between our warehouses in both Poland and Germany, giving you flexible storage at either end if your dates don't align perfectly. Our team takes care of all cross-border paperwork so you don't have to navigate EU customs procedures alone. From first contact to keys-in-hand at your new address, a typical PL–DE move takes 3–7 days depending on volume.",
  },
  {
    question:
      "What certifications should an international moving company have?",
    answer:
      "The two recognised industry benchmarks are IAM (International Association of Movers) and FEDEMAC (Federation of European Movers Associations). IAM membership requires movers to meet strict standards for insurance, crew training, and claims handling, while FEDEMAC ensures compliance with European cross-border regulations. Arkpol holds both, which means your goods are covered by internationally recognised liability frameworks and you have a formal complaints pathway if anything goes wrong.",
  },
  {
    question: "How long does an international corporate relocation take?",
    answer:
      "A single-employee corporate relocation within Europe typically takes one to two weeks from survey to delivery, while larger volume moves or those requiring customs clearance outside the EU can run three to six weeks. The key variables are shipment volume, the destination country's import requirements, and whether temporary storage is needed. Arkpol's corporate relocation team provides a detailed timeline at the survey stage so HR and the relocating employee both have certainty.",
  },
  {
    question: "Can household goods be shipped by sea from Poland?",
    answer:
      "Yes — Arkpol arranges containerised sea freight for moves from Poland to destinations beyond Europe, including the Americas, Asia, and Africa. Your belongings are professionally packed and loaded into a dedicated or shared (LCL) container at our Polish warehouse, then shipped through major European ports. Sea freight is the most cost-effective option for large volumes over long distances, with transit times typically ranging from 2 to 8 weeks depending on destination. We manage port-to-door delivery at the receiving end.",
  },
  {
    question: "What is a FIDI / IAM moving company?",
    answer:
      "FIDI is the global alliance of premium international movers; its members must pass the independent FAIM quality audit (covering packing, claims, staff training, and financial stability) and are re-audited every three years. IAM is the International Association of Movers, the largest moving-industry association worldwide, with similar ethical and operational standards. A mover carrying either accreditation has been vetted by an independent third party — not just self-declared. Arkpol operates as an IAM member and works within the FIDI network, ensuring your move meets the same standards whether you are an individual or a multinational corporation.",
  },
  {
    question: "Have you handled high-security and government-site relocations?",
    answer:
      "Yes. Across three decades Arkpol has carried out complex, high-scrutiny relocations connected to NATO and government sites in several countries — the kind of moves where documentation, vetting and timing leave no margin for error. That same discipline — meticulous paperwork, security-aware crews and tight on-site coordination — is built into every move we run, whether it's a single family or a multi-country corporate programme.",
  },
  {
    question: "How much does an international move from Europe to the USA cost?",
    answer:
      "Honestly, it depends — but the main cost drivers are shipment volume (cubic metres), origin and destination cities, sea-freight versus air-freight, and the level of packing service you choose. A shared container (LCL) for a one-bedroom apartment from Poland typically starts around €2,000–4,000 all-in, while a full 20-ft container for a larger home can reach €6,000–10,000+. US customs clearance and destination-agent fees add to the total. The only way to get an accurate number is a free home survey or video assessment — request a quote and we'll give you a fixed-price offer within 48 hours.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function Faq() {
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
            Answers
          </p>
          <h2 className="font-display mb-4 text-4xl leading-tight text-ink md:text-5xl">
            International moving, explained.
          </h2>
          <p className="text-steel text-base leading-relaxed md:text-lg">
            The questions buyers actually ask — answered plainly.
          </p>
        </div>

        {/* ── Accordion ── */}
        <div className="divide-y divide-[#e6e2d8] border-y border-[#e6e2d8]">
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
                    {faq.question}
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
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Soft CTA ── */}
        <p className="mt-10 text-sm text-steel md:text-base">
          Still have a question?{" "}
          <a
            href="#quote"
            className="font-medium text-gold underline underline-offset-4 transition-opacity hover:opacity-75"
          >
            Request a quote
          </a>{" "}
          and ask us directly.
        </p>
      </div>
    </section>
  );
}
