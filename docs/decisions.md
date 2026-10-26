# Decisions

Short record of the practices adopted for the rebuild and why.

## Framework

- **Next.js 16 App Router, TypeScript strict.** Server Components by default; `'use client'` only on the pieces that own a rAF loop, an observer or a toggle (hero, town, abyss canvas, read-more, swords, experience journey). Everything else (headings, ornaments, cards, menu, stack list, HUD) renders on the server and ships no JS.
- **Static page.** The whole page is prerendered at build time; there is no request data.
- **Heavy client pieces are lazy.** The WebGL canvas is loaded with `next/dynamic` (`ssr: false`) from a small client wrapper, so the shader never blocks first paint.

## Styling

- **Tailwind CSS v4, CSS-first config.** All tokens (palette, fonts, glows, easing) live in one file, `src/styles/theme.css`, under `@theme`, so they exist both as CSS variables and as utilities (`bg-abyss`, `font-title`, `text-mist`).
- **Utilities for layout, CSS Modules for art.** The Hollow Knight look depends on two-gradient feathered masks, container-query units, CSS trig and keyframes. Writing those as arbitrary-value utilities would be unreadable, so each section keeps its visual rules in a co-located `*.module.css` that reads the theme variables. Modules also remove the class-collision and rule-order bugs documented in the original README (`.sec-head` overriding new headings): every class is scoped to its component.
- **Prettier with `prettier-plugin-tailwindcss`** sorts utility classes; ESLint uses `eslint-config-next` (core-web-vitals + typescript).

## Fonts

- `next/font` for all four families. Cinzel uses the local variable woff2 from the original repo (`next/font/local`); Cormorant Garamond, Sedan SC and Poppins use `next/font/google`, which downloads them at build time and serves them from the site's own origin. Fallback metrics are adjusted automatically, so there is no layout shift and no third-party request at runtime.
- `Trajan Pro` stays first in the title stack, as in the original, so it renders when installed.

## Ornaments

- `geo.mjs` and `ornaments.mjs` are ported to `scripts/ornaments/` and run by `npm run ornaments` (and automatically before `dev` and `build`). The script writes `src/components/ornament/sprite.generated.ts`: one `<symbol>` per ornament plus the HUD, knight, slot-mark and tech-logo symbols. Nothing is computed at runtime.
- A single inline sprite is rendered once in the root layout and every use is a `<use href>`: the crest, corner and slot mark appear dozens of times, so a sprite is far smaller than repeating the path data.
- Each outer `<svg>` gets a 0-origin viewBox the size of its symbol (gotcha from the original: a negative-origin outer viewBox shifts `<use>` content).

## Images

- Every image, including the PNG sprites, was converted to WebP with alpha (`cwebp -exact`) and is served by `next/image` with explicit `sizes`. Only the hero layers use `priority` (they are the LCP); everything else is lazy.
- No base64 inlining. Image slots are plain components, so portrait art can later be swapped in with `getImageProps` + `<picture>` without touching layout.

## Motion and performance

- Only `transform` and `opacity` are animated (plus the registered `--sway` angle, which only moves transforms through CSS trig).
- One rAF loop per effect, started on demand and stopped when idle; scroll and pointer handlers only record a target value (web.dev's parallax guidance: never do visual work inside the scroll event).
- IntersectionObserver pauses every loop and CSS animation while its section is off-screen; the WebGL canvas also pauses when the tab is hidden, caps its DPR at 1.5 × 0.75 and falls back to plain black when WebGL is missing.
- Mouse parallax only runs on `(hover: hover) and (pointer: fine)` devices.
- `prefers-reduced-motion` disables the parallax, typewriter, journey, sway and glints; content is shown in its final state.
- No `backdrop-filter` anywhere (the original's blur on the dialogue panel was dropped; the panel is already 80% black).
- Experience picks between the journey and the compact list with a CSS media query that matches the original's JS rule (`scene width < 960px`), so the server HTML is already in the right mode and nothing shifts on hydrate.

## SEO and accessibility

- Metadata API (title, description, Open Graph, Twitter), a generated `opengraph-image`, `sitemap.ts`, `robots.ts` and JSON-LD for a `Person`.
- One `h1` (the name), an `h2` per section, `main` and `nav` landmarks, visible `:focus-visible` states that mirror the hover highlight, `aria-expanded`/`aria-controls` on every toggle, and empty `alt` only on purely decorative art.
