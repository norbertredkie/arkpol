"use client";

import Reveal from "./Reveal";
import { useT } from "../i18n";

export default function ContentHub() {
  const t = useT();
  const pillars = t.insights.pillars;
  return (
    <section id="insights" className="amb bg-navy text-bone py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6">

        {/* Section header */}
        <Reveal className="mb-16 md:mb-20">
          <p className="text-gold uppercase tracking-[0.2em] text-xs font-semibold mb-4">
            {t.insights.eyebrow}
          </p>
          <h2 className="font-display text-[2.5rem] md:text-[3rem] leading-tight text-bone mb-5 max-w-2xl">
            {t.insights.heading}
          </h2>
          <p className="text-bone-dim text-lg max-w-xl leading-relaxed">
            {t.insights.sub}
          </p>
        </Reveal>

        {/* Divider */}
        <div className="border-t border-line mb-16 md:mb-20" aria-hidden="true" />

        {/* Three pillar columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 130}>
              <div className="flex flex-col">

                {/* Pillar heading */}
                <h3 className="font-display text-[1.25rem] text-gold mb-6 leading-snug">
                  {pillar.title}
                </h3>

                {/* Article list */}
                <ul className="flex flex-col gap-0 flex-1">
                  {pillar.articles.map((article, j) => (
                    <li key={article}>
                      <a
                        href="#"
                        className="group flex items-start justify-between gap-4 py-4 border-t border-line transition-colors duration-200 hover:border-gold/50"
                        aria-label={article}
                      >
                        <span className="text-bone-dim text-[0.93rem] leading-snug group-hover:text-bone transition-colors duration-200 flex-1">
                          {article}
                        </span>
                        <span
                          className="text-bone-dim group-hover:text-gold transition-colors duration-200 mt-[1px] text-sm shrink-0"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </a>
                      {/* Bottom border on last item */}
                      {j === pillar.articles.length - 1 && (
                        <div className="border-t border-line" aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ul>

              </div>
            </Reveal>
          ))}
        </div>

        {/* Footer row */}
        <Reveal delay={400} className="mt-16 md:mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-bone-dim text-sm tracking-wide">
            <span className="text-gold font-semibold">{t.insights.newGuidesBold}</span>{t.insights.newGuidesRest}
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 border border-line text-bone text-sm px-6 py-3 rounded-full hover:border-gold hover:text-gold transition-colors duration-200"
          >
            {t.insights.readBlog}
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </Reveal>

      </div>
    </section>
  );
}
