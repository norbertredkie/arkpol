import Link from "next/link";

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Why Arkpol", href: "#why" },
  { label: "Our Network", href: "#network" },
  { label: "Insights", href: "#insights" },
];

const SERVICE_LINKS = [
  { label: "International Moving", href: "#services" },
  { label: "Overseas Shipping", href: "#services" },
  { label: "Corporate Relocations", href: "#services" },
  { label: "Warehousing", href: "#services" },
];

const RESOURCE_LINKS = [
  { label: "FAQ", href: "#faq" },
  { label: "Case Studies", href: "#proof" },
  { label: "GDPR", href: "#" },
  { label: "Blog", href: "#insights" },
];

const ENTITIES = [
  {
    tag: "PL",
    name: "Arkpol PL",
    detail: "Str. Główna 9a, Nowa Wieś, Warsaw area",
    size: "2,300 m²",
  },
  {
    tag: "DE",
    name: "Arkpol DE",
    detail: "Frankfurt am Main",
    size: "1,500 m²",
  },
  {
    tag: "BNL",
    name: "Arkpol BNL",
    detail: "Amsterdam–Brussels corridor",
    size: null,
  },
];

const MEMBERSHIPS = ["IAM", "FEDEMAC", "IMA", "IAMX"];

export default function Footer() {
  return (
    <footer className="bg-navy text-bone border-t border-line">
      {/* CTA Band */}
      <div className="border-b border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight text-bone">
            Move With Certainty.
          </p>
          <a
            href="#quote"
            className="inline-block shrink-0 rounded border border-gold px-7 py-3 text-gold font-semibold text-sm tracking-wide uppercase transition-colors hover:bg-gold hover:text-navy"
          >
            Request a Quote
          </a>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mx-auto max-w-[1200px] px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {/* Company */}
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.15em] uppercase text-bone-dim">
              Company
            </p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.15em] uppercase text-bone-dim">
              Services
            </p>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.15em] uppercase text-bone-dim">
              Resources
            </p>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-bone-dim transition-colors hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-5 text-xs font-semibold tracking-[0.15em] uppercase text-bone-dim">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:arkpol@arkpol.com"
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  arkpol@arkpol.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/arkpol-group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <span className="text-sm text-bone-dim">Phone: on request</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Entity Addresses */}
        <div className="mt-14 border-t border-line pt-10 flex flex-col gap-6 sm:flex-row sm:gap-10">
          {ENTITIES.map((e) => (
            <div key={e.tag} className="flex-1">
              <span className="mb-2 inline-block rounded border border-line px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase text-bone-dim">
                {e.tag}
              </span>
              <p className="mt-1 text-sm font-medium text-bone">{e.name}</p>
              <p className="text-xs text-bone-dim leading-relaxed">{e.detail}</p>
              {e.size && (
                <p className="text-xs text-bone-dim">{e.size}</p>
              )}
            </div>
          ))}
        </div>

        {/* Membership Strip */}
        <div className="mt-10 border-t border-line pt-8 flex flex-wrap items-center gap-4">
          <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-bone-dim mr-2">
            Members
          </span>
          {MEMBERSHIPS.map((m, i) => (
            <span key={m} className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-wider text-bone-dim">
                {m}
              </span>
              {i < MEMBERSHIPS.length - 1 && (
                <span className="text-line select-none">·</span>
              )}
            </span>
          ))}
        </div>

        {/* Language Switcher */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-xs font-semibold text-gold">EN</span>
          <span className="text-line select-none">·</span>
          <span className="text-xs text-bone-dim cursor-default">PL</span>
          <span className="text-line select-none">·</span>
          <span className="text-xs text-bone-dim cursor-default">DE</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1200px] px-6 py-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-bone-dim">
            © 2026 Arkpol Group. All rights reserved.
          </p>
          <p className="text-xs text-bone-dim italic">
            30 years of moving Europe.
          </p>
        </div>
      </div>
    </footer>
  );
}
