"use client";

import { useEffect, useState, useCallback } from "react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Why Arkpol", href: "#why" },
  { label: "Network", href: "#network" },
  { label: "FAQ", href: "#faq" },
  { label: "Insights", href: "#insights" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  return (
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-navy/95 backdrop-blur-md border-b border-line shadow-lg"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
      role="banner"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="flex items-center justify-between h-[72px]">

          {/* ─── Wordmark ─────────────────────────────────────────── */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            aria-label="Arkpol — home"
          >
            {/* Gold movement mark — a small forward-angled chevron/arrow */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <rect
                x="0"
                y="0"
                width="14"
                height="14"
                fill="#c9a84c"
                className="fill-gold"
              />
              <path
                d="M4.5 10.5L9.5 7 4.5 3.5"
                stroke="#0d1b2a"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span
              className={[
                "font-display font-bold tracking-[0.15em] text-[1.05rem] leading-none transition-colors duration-300",
                scrolled ? "text-bone" : "text-bone",
              ].join(" ")}
            >
              ARKPOL
            </span>
          </a>

          {/* ─── Desktop nav ──────────────────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={[
                  "relative text-[0.8125rem] font-medium tracking-[0.06em] uppercase",
                  "transition-colors duration-200",
                  scrolled
                    ? "text-bone-dim hover:text-bone"
                    : "text-bone/80 hover:text-bone",
                  // Underline grow
                  "after:content-[''] after:absolute after:left-0 after:-bottom-0.5",
                  "after:h-px after:w-0 after:bg-gold",
                  "after:transition-[width] after:duration-300",
                  "hover:after:w-full",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:rounded-sm",
                ].join(" ")}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* ─── Desktop CTA ──────────────────────────────────────── */}
          <div className="hidden md:flex items-center">
            <a
              href="#quote"
              className={[
                "inline-flex items-center gap-2 px-5 py-2.5 rounded",
                "bg-gold text-ink text-[0.8125rem] font-semibold tracking-[0.05em] uppercase",
                "transition-all duration-200",
                "hover:bg-gold-bright hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy",
              ].join(" ")}
            >
              Request a Quote
            </a>
          </div>

          {/* ─── Mobile hamburger ─────────────────────────────────── */}
          <button
            type="button"
            className={[
              "md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm",
              "group",
            ].join(" ")}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={[
                "block h-px bg-bone transition-all duration-300 origin-center",
                menuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px bg-bone transition-all duration-300",
                menuOpen ? "w-0 opacity-0" : "w-5 opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px bg-bone transition-all duration-300 origin-center",
                menuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* ─── Mobile dropdown panel ──────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={[
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          "bg-navy border-t border-line",
          menuOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-[1200px] px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className={[
                "py-3 px-2 text-bone-dim hover:text-bone",
                "text-sm font-medium tracking-[0.07em] uppercase",
                "border-b border-line last:border-none",
                "transition-colors duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm",
              ].join(" ")}
            >
              {label}
            </a>
          ))}

          <div className="pt-4">
            <a
              href="#quote"
              onClick={closeMenu}
              className={[
                "flex items-center justify-center w-full py-3 rounded",
                "bg-gold text-ink text-sm font-semibold tracking-[0.05em] uppercase",
                "hover:bg-gold-bright transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
              ].join(" ")}
            >
              Request a Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
