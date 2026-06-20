"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps children in a scroll-triggered fade/rise. Degrades to fully visible
 * if JS is off or prefers-reduced-motion is set (see .reveal in globals.css).
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Dynamic tag name — typing it precisely across the union collapses children to
  // `never`, so cast through `any` for the JSX element.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
