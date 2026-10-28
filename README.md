# Hollow Portfolio (Next.js) — Wahhaj Mustafa

A Hollow Knight–styled portfolio for Wahhaj Mustafa, a game developer. This is the production rebuild of the single-file prototype in `Saad07Khan/hollow-portfolio`, covering everything up to and including Experience:

1. WebGL background (pitch black with drifting motes)
2. Hero (layered parallax, "Wahhaj Mustafa")
3. Town with the dialogue box
4. Journey menu
5. Projects, Hackathons and Game Jams
6. Tech Stack
7. Experience (scroll-pinned knight journey)

Workshops & Organizations, the old Hollow Dev UI kit and anything after Experience are intentionally not ported.

---

## Stack

- **Next.js 16** (App Router, Turbopack, statically prerendered), **React 19**, **TypeScript strict**
- **Tailwind CSS v4** for tokens and simple layout; **CSS Modules** for the section art
- `next/font` (Cinzel self-hosted from `src/fonts`, Cormorant Garamond, Sedan SC and Poppins via Google at build time)
- `next/image` with AVIF/WebP negotiation
- ESLint (`eslint-config-next` + Prettier compat), Prettier with `prettier-plugin-tailwindcss`, Vitest

Why each choice was made: [`docs/decisions.md`](docs/decisions.md).

## Setup

```bash
npm install
npm run dev
```

| Script                            | What it does                                                 |
| --------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                     | Generates the ornament sprite, then starts the dev server    |
| `npm run build`                   | Generates the sprite, then builds the static site            |
| `npm run start`                   | Serves the production build                                  |
| `npm run lint`                    | ESLint                                                       |
| `npm run typecheck`               | Route types + `tsc --noEmit`                                 |
| `npm test`                        | Vitest (journey math, ornament geometry)                     |
| `npm run format` / `format:check` | Prettier                                                     |
| `npm run ornaments`               | Regenerates `public/ornaments.svg` and `sprite.generated.ts` |

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so canonical URLs, Open Graph, the sitemap and JSON-LD point at the real domain (defaults to `http://localhost:3000`).

## Structure

```
scripts/ornaments/        build-time SVG ornament engine (ported geo.mjs + ornaments.mjs)
  build.mjs               writes public/ornaments.svg and src/components/ornament/sprite.generated.ts
src/
  app/                    layout, page, fonts, metadata routes (OG image, sitemap, robots, icon), JSON-LD
  styles/theme.css        all design tokens (palette, fonts, glows, easing) in one @theme
  content/                typed section data: site, journey, projects, stack, experience,
                          plus the archive pages (archive.ts types, portfolio-projects.ts, work-experience.ts)
  components/
    ornament/             <Ornament name="…"> — typed <use> of the generated sprite
    ui/                   SectionHeading, CrestRule, HkChoice, FrameCorners, MotionSection
    sections/<name>/      one folder per section: component, module CSS, its client hooks
    sections/archive/     shared /projects and /experience page: ferris wheel, detail panel, links
  hooks/                  useInView, useOnceInView, useMediaQuery
  lib/                    rafScheduler, clamp/smoothstep, hero-progress bus
  assets/                 WebP sources imported by next/image
```

**Boundaries.** Section content lives in `src/content` and is passed in as props; components only render. Pages are server components; `'use client'` is limited to the pieces that own an animation loop, an observer or a toggle (hero, town, abyss canvas, read-more, tech-stack intro, ferris wheel, menu, experience). Each motion effect lives in its own hook next to its section (`useHeroMotion`, `useTownParallax`, `useKnightJourney`), and the knight's pure path math is in `journey-math.ts` with unit tests.

**Editing content.** Change a project, tech or job in `src/content/*.ts`. The tech-stack arc spreads any number of orbs over 150°→30°. On first view the knight jumps, slashes the rock and the orbs burst out of it (`stack-intro.ts`); with reduced motion, or before JavaScript runs, the section shows its final layout. New tech logos go in `scripts/ornaments/tech-icons.mjs` (Simple Icons path data) and become `tech-<id>` symbols.

**Swapping art.** Each image slot is one `next/image` in its section component, with its `sizes` next to it. Portrait art for mobile can be added later with `getImageProps()` and a `<picture>` element in the same slot without touching layout.

## Performance

- Static HTML; JS only for the interactive pieces. The WebGL canvas is loaded with `next/dynamic` (`ssr: false`) and only creates its GL context once the background first becomes visible.
- Every animation is `transform`/`opacity` (plus the registered `--sway` angle). One rAF loop per effect, started on demand, stopped when idle or off-screen; scroll handlers only record a target.
- Off-screen sections get `data-offscreen`, which pauses all their CSS animations.
- Mouse parallax only on `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion`: no parallax, typewriter, journey, sway or glints; content shows in its final state; the WebGL draws one static frame.
- No `backdrop-filter`.
- Images: WebP sources, served as AVIF where supported. Only the hero's back and stage layers are preloaded (the stage is the LCP element and gets `fetchPriority="high"`); town images mount only when the visitor scrolls toward them; everything else is lazy.
- Ornaments are one cacheable, content-hashed `public/ornaments.svg`.
- Lighthouse (production build): desktop performance 99; mobile performance 88–91 (simulated slow 4G); accessibility, best practices and SEO 100.

## Responsive behaviour

- **Hero:** 200vh (160vh on ≤640px), name wraps on phones.
- **Town:** on phones the scene is framed on the characters and lamp, with the dialogue at the bottom over it.
- **Projects:** two columns above 900px; single column with the cave on top at ≤900px; on phones a compact header (HUD centred above the title) and a horizontal swipe row of cards.
- **Tech Stack:** a taller, tighter arc and smaller chips on phones.
- **Experience:** the scroll journey runs when the scene would be at least 960px wide (`min-width: 960px` and `min-height: 609px`) and motion is allowed. Otherwise it is the compact stacked list. The rule is a CSS media query, so the server HTML is already in the right mode; `modes.ts` holds the same query for the JS side.

## Gotchas carried over

- **Cinzel is caps-only.** Lowercase renders as small caps. Anything that must be mixed case (company names, dialogue) uses Cormorant Garamond. Trajan Pro stays first in the title stack and renders only where it is installed.
- **SVG viewBox and `<use>`.** An outer `<svg>` with a negative-origin viewBox shifts `<use>` content. `<Ornament>` always gives the outer svg a 0-origin viewBox the size of its symbol.
- **Flip with `scale`, not `transform`.** `<Ornament flip>` uses `scale: 1 -1` so it never fights a component's own `transform`.
- **Stacking.** A `z-index: -1` pseudo-element panel disappears behind a sibling image unless the parent has `isolation: isolate` (dialogue, cards, chips, entries).
- **Masks.** Two-gradient feathering needs `mask-composite: intersect`; Lightning CSS adds the WebKit fallback.
- **Container query units.** Card panel insets (`cqw`), the hero/town/experience scenes and the stack arc rely on `container-type`. A `::before` can query its own element.
- **`[hidden]` loses to author `display`.** Global `[hidden] { display: none !important }`.
- **Grid stretch.** Grids that must not spread their rows use `align-content: start`.
- **CSS rule order.** In the original, a later `.hk-choice` font shorthand silently overrode the card's "Read more" size; the rebuild keeps the effective size. CSS Modules remove class collisions, but two modules with equal specificity still resolve by import order, so a section imports shared components before its own module.
- **Image black vs page black.** Pure-black image edges show a box against anything lighter. Every backdrop is feathered and the page is pitch black.
- **Contain, don't cover.** Tall sections contain their art, size it explicitly and feather it.
- **Scroll animation.** Map scroll to a target and ease a displayed value toward it with a speed cap (1.1 segments/s for the journey), so fast scrolls never teleport.
- **Platform coordinates.** Experience platforms are measured in percent of the 1672×941 cave image (`src/content/experience.ts`). Re-measure them if the image changes. Knight start: (91.5%, 82.9%).
- **Turbopack + Tailwind.** The Tailwind loader rule must target `globals.css` only. A `*.css` rule with `as: '*.css'` turns every CSS Module into plain CSS and all module class names come out empty.
- **RSC payload duplication.** Anything rendered inline by a server component is repeated in the RSC payload. That is why the sprite is an external file and `experimental.inlineCss` is off.

## Open items

- **Archive pages:** `/projects` and `/experience` are the same `ArchivePage` fed different data (`portfolio-projects.ts`, `work-experience.ts`, both copied from shunphoenix55.github.io). The home Projects section shows the first four projects; the HUD count is the total. Their images were downloaded once from shunphoenix55.github.io (and one from sulakshanamonga.com), converted to WebP and live in `src/assets/projects` and `src/assets/work`.
- **Journey links:** "Contact" points at the footer (`#contact`).
- **Links:** project, hackathon and "View all" URLs.
- **Portrait art** for the hero, town and projects on phones.
