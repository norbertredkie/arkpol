"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

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

  const memberships = ["IAM", "FEDEMAC", "IMA", "IAMX"];

  return (
    <section id="numbers" className="bg-navy py-20 text-bone md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-10 border-y border-line py-14 md:grid-cols-4 md:gap-6"
        >
          <Stat prefix="+" value={5000} label="Moves per year" active={visible} />
          <Stat value={30} label="Years" active={visible} />
          <Stat value={50} suffix="+" label="Countries" active={visible} />
          <Stat value={4} label="Memberships" active={visible} />
        </div>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <span className="text-[11px] uppercase tracking-[0.24em] text-bone-dim/60">
            Member of
          </span>
          {memberships.map((m) => (
            <span
              key={m}
              className="text-sm font-semibold uppercase tracking-[0.18em] text-bone-dim/80"
            >
              {m}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
