# design-prompt — ARKPOL GROUP (arkpol.com)

Locked to [`BRAND_BOOK.md`](BRAND_BOOK.md). Same 4-section pattern as the PBS
`design-prompts/` library. Vibe: institutional, cinematic, military-grade calm.
Navy dominates, gold is precious, type is large and serif.

> **Execution note (2026-06-17):** Fable 5 is down. This prompt is executed via **Opus 4.8**
> instead, built cohesively in one hand (not fanned out — fan-out is what made v1 generic).
> Asset rule still holds: **no GPT image gen.** The hero reveal is built from SVG/CSS
> (route + network), not generated art or stock photos. Real photography is a later phase.

---

## 1. Locked tokens  (paste verbatim, do not invent colors)

- **Background:** `#0d1b2a` (navy, ~85% of the page) — navy is the "black"
- **Inverted block:** `#f8f6f1` (bone) — the ONE intentional white contrast break
- **Accent / CTA:** `#c9a84c` (gold) — used **sparingly**; hover `#dcc16f`
- **Secondary:** `#1b4f72` (steel) — borders, depth, route under-layer
- **Ambient glow:** radial `rgba(201,168,76,0.08)` top-right + bottom-left only
- **Text:** `#f8f6f1` on navy · muted `#c8cdd4` · `#0d1b2a` on bone
- **Heading font:** Playfair Display 700, massive scale (clamp 3rem–6rem)
- **Body font:** Inter 400/500 · **Labels:** UPPERCASE tracked-wide gold 12px
- **Corner radius:** CTA buttons 2px (near-sharp), cards 4px
- **Gradient policy:** none, **except** the gold ambient glow + navy depth vignette

---

## 2. Hero prompt  (nav + hero + scroll animation ONLY)

```
Build a single full-viewport hero. Navy (#0d1b2a) with a subtle radial gold glow
rgba(201,168,76,0.08) top-right + bottom-left only. Minimal nav: left wordmark
"ARKPOL" (Playfair) with a small gold arrow mark; 4 text links + one gold CTA
"Request a Quote", near-sharp 2px corners.

Hero: oversized Playfair 700 headline "Move With Certainty." — bone, with "Certainty."
carrying a fine gold underline-draw. UPPERCASE gold eyebrow above:
"EST. 1995 · TRUSTED BY NATO". Subhead Inter white/80: "Own crews across Europe.
30 years. Worldwide reach." Gold CTA "Request a Quote →" + ghost "Our Services".

The hero is PINNED for the reveal (see §3). On scroll the eyebrow/headline/subhead
translate up and fade as the reveal takes over. Smooth 60fps, ease-out, 8px grid.
Nav + hero only — no other sections yet.
```

---

## 3. Reveal prompt  (THE signature scroll-tied move — the route completing)

```
The marquee beat. In the pinned hero, build a scroll-tied reveal of a RELOCATION ROUTE
across an abstract Europe (inline SVG + CSS only — no images, no GPT gen). Base frame:
a dim steel dot-matrix / abstract Europe on navy with one origin pin (Warsaw) lit gold.
As scroll progress goes 0→1 (tied to scroll, NOT time): a gold route line DRAWS
(stroke-dashoffset) from origin out to destination pins (Frankfurt, Amsterdam, then a
long arc "worldwide"), each pin igniting with a soft gold pulse as the line reaches it,
and the gold ambient glow blooming as the network completes. The feeling: watching a
move land with certainty — not a product demo.

Make the reveal type one switchable variable: route-draw (default), radial-bloom, wipe.
Tie strictly to scroll progress over a ~180vh pinned section. Respect prefers-reduced-
motion: show the completed network immediately. Gold stays precious — only the route,
pins, and glow. No drop shadows on text.
```

> Why this is the reveal: Arkpol has no "app screen" to reveal. Its product is the move
> itself. So the emotional beat is the route completing across Europe — certainty made visible.

---

## 4. Build-out prompt  (rest of the page — cinematic, not card-soup)

```
Below the hero, build a tight cinematic flow (same Playfair headings, navy, gold sparingly,
8px grid). NOT a wall of cards. Intentional contrast rhythm:

1. STATEMENT — INVERT to bone (#f8f6f1) background, navy text. One huge Playfair line:
   "Trusted where it cannot go wrong." + a thin proof row (NATO · Premier League · Venice).
   The deliberate light break after the dark hero.
2. WHY — back to navy. Gold UPPERCASE label, three reasons as large editorial rows
   (number + Playfair title + one line), NOT boxed cards. Generous whitespace.
3. NETWORK — navy. Three entities (Arkpol PL/DE/BNL) beside a refined version of the
   route map. Real addresses from BRAND_BOOK.
4. PROOF / numbers — navy, oversized gold figures: +5,000 / 30 / 50+ / 4, membership row.
5. QUOTE — the conversion beat: services + inline quote form on a raised navy card.
6. FAQ — keep lean; PRESERVE the FAQPage JSON-LD (AI-citation layer, non-negotiable).
7. FOOTER — compact, entities, memberships, EN/PL/DE.

Subtle scroll-in fade per section. No new colors, no new fonts. Gold never becomes a surface.
```

---

## 5. CTO compliance checklist (before commit)

- [ ] Only navy `#0d1b2a` / bone `#f8f6f1` / gold `#c9a84c` / steel `#1b4f72` (+ defined alphas/muted) appear
- [ ] Headings Playfair 700 oversized; labels UPPERCASE tracked gold
- [ ] CTA near-sharp 2px, gold bg / navy text; hover `#dcc16f`
- [ ] Exactly ONE inverted bone block (the Statement); rest is navy
- [ ] The scroll-tied route reveal is present and tied to scroll progress, not time
- [ ] `prefers-reduced-motion` shows completed states (no broken hero)
- [ ] FAQPage JSON-LD preserved
- [ ] Gold appears sparingly (route/pins/accents/CTAs only, never a surface)
- [ ] No GPT-generated art / no stock photos
