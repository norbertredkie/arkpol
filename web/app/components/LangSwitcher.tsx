"use client";

import { LOCALES, useLocale, type Locale } from "../i18n";

const LABELS: Record<Locale, string> = { pl: "PL", en: "EN", de: "DE" };

export default function LangSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Language">
      {LOCALES.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={locale === l}
            className={[
              "text-xs font-semibold tracking-wide transition-colors",
              locale === l ? "text-gold" : "text-bone-dim/70 hover:text-bone",
            ].join(" ")}
          >
            {LABELS[l]}
          </button>
          {i < LOCALES.length - 1 && <span className="text-line select-none">·</span>}
        </span>
      ))}
    </div>
  );
}
