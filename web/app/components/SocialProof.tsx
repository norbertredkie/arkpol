"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useT } from "../i18n";

function useCountUp(target: number, duration = 1600, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

function Stat({
  prefix = "",
  value,
  suffix = "",
  label,
  active,
}: {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  active: boolean;
}) {
  const count = useCountUp(value, 1600, active);
  return (
    <div className="text-center">
      <span className="block font-display text-5xl font-bold leading-none text-gold-bright md:text-6xl">
        {prefix}
        {count.toLocaleString("en-US")}
        {suffix}
      </span>
      <span className="mt-3 block text-xs font-medium uppercase tracking-[0.2em] text-bone-dim">
        {label}
      </span>
    </div>
  );
}

export default function SocialProof() {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The white+gold IAMTrusted seal is featured on the dark (its intended look);
  // the four association logos share one soft light bar so their colour marks read
  // without scattering white chips across the dark section.
  const barLogos = [
    { src: "/partners/iam.svg", alt: "IAM — International Association of Movers", h: "h-7 md:h-9" },
    { src: "/partners/iamx.png", alt: "IAMX Validated — IAM Mobility Exchange", h: "h-6 md:h-7" },
    { src: "/partners/eura.svg", alt: "EURA — European Relocation Association (Full Member)", h: "h-6 md:h-7" },
    { src: "/partners/fedemac.svg", alt: "FEDEMAC — Federation of European Movers Associations (Direct Affiliate)", h: "h-7 md:h-9", href: "https://fedemac.com/member/arkpol-moving-relocations/" },
  ];

  return (
    <section id="numbers" className="bg-navy py-20 text-bone md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-10 border-y border-line py-14 md:grid-cols-4 md:gap-6"
        >
          <Stat prefix="+" value={5000} label={t.numbers.moves} active={visible} />
          <Stat value={30} label={t.numbers.years} active={visible} />
          <Stat value={50} suffix="+" label={t.numbers.countries} active={visible} />
          <Stat value={5} label={t.numbers.memberships} active={visible} />
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-8">
          <span className="text-[11px] uppercase tracking-[0.28em] text-bone-dim/55">
            {t.numbers.memberOf}
          </span>

          {/* Featured certification: IAMTrusted seal (white+gold, on dark) */}
          <img
            src="/partners/iam-trusted.png"
            alt="IAM Trusted Moving Company"
            className="h-16 w-auto md:h-20"
            loading="lazy"
          />

          {/* Association memberships — one soft light bar, logos in full colour */}
          <div className="flex flex-wrap items-stretch justify-center divide-x divide-line-light overflow-hidden rounded-xl bg-bone shadow-[0_10px_40px_-12px_rgba(0,0,0,0.5)]">
            {barLogos.map((p) => {
              const cell = (
                <span className="flex items-center justify-center px-7 py-5 transition-opacity duration-300 hover:opacity-70 md:px-9">
                  <img src={p.src} alt={p.alt} className={`${p.h} w-auto`} loading="lazy" />
                </span>
              );
              return p.href ? (
                <a key={p.src} href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.alt} className="flex">
                  {cell}
                </a>
              ) : (
                <span key={p.src} className="flex">{cell}</span>
              );
            })}
          </div>

          <p className="text-center text-[11px] tracking-[0.12em] text-bone-dim/55">
            {t.numbers.credential}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
