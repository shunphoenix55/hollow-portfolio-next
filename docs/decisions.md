# Decisions

Short record of the practices adopted for the rebuild and why.

## Framework

- **Next.js 16 App Router, TypeScript strict.** Server Components by default; `'use client'` only on the pieces that own a rAF loop, an observer or a toggle (hero, town, abyss canvas, read-more, tech-stack intro, ferris wheel, menu, experience journey). Everything else (headings, ornaments, cards, menu, stack list, HUD) renders on the server and ships no JS.
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

- `geo.mjs` and `ornaments.mjs` are ported to `scripts/ornaments/` and run by `npm run ornaments` (and automatically before `dev`, `build`, `lint` and `typecheck`). The script writes `public/ornaments.svg` (one `<symbol>` per ornament plus the HUD, knight, slot-mark and tech-logo symbols, with their gradients) and `src/components/ornament/sprite.generated.ts` (symbol sizes and a content-hashed sprite URL). Nothing is computed at runtime.
- Every use is `<use href="/ornaments.svg?v=…#id">`. The crest, corner and slot mark appear dozens of times, so one cached sprite file beats repeating path data. An inline sprite was tried first: React's RSC payload repeated it, doubling the HTML to 412 KB.
- Each outer `<svg>` gets a 0-origin viewBox the size of its symbol (gotcha from the original: a negative-origin outer viewBox shifts `<use>` content).

## Images

- Every source image, including the PNG sprites, was converted to WebP with alpha (`cwebp -exact`) and is served by `next/image` with explicit `sizes`. The optimizer negotiates AVIF first and falls back to WebP: the hero mid layer drops from 215 KB to 75 KB with no visible difference.
- Only the hero's back and stage layers are preloaded (`preload`, and `fetchPriority="high"` on the stage, which is the LCP element); the other hero layers are eager, everything else is lazy. The town images mount only when the visitor scrolls toward the town, so they don't compete with the hero on first load.
- No base64 inlining. Image slots are plain components, so portrait art can later be swapped in with `getImageProps` + `<picture>` without touching layout.

## Motion and performance

- Only `transform` and `opacity` are animated (plus the registered `--sway` angle, which only moves transforms through CSS trig).
- One rAF loop per effect, started on demand and stopped when idle; scroll and pointer handlers only record a target value (web.dev's parallax guidance: never do visual work inside the scroll event).
- IntersectionObserver pauses every loop and CSS animation while its section is off-screen. The WebGL context is created only when the background first becomes visible (creating it at load cost 2.4 s of blocking time in Lighthouse's software GPU); it pauses when the tab is hidden, caps its DPR at 1.5 × 0.75 and falls back to plain black when WebGL is missing.
- `experimental.inlineCss` was tried and rejected: Next repeats the inlined CSS in the RSC payload.
- Mouse parallax only runs on `(hover: hover) and (pointer: fine)` devices.
- `prefers-reduced-motion` disables the parallax, typewriter, journey, sway and glints; content is shown in its final state.
- No `backdrop-filter` anywhere (the original's blur on the dialogue panel was dropped; the panel is now 90% black instead of 80% black plus blur).
- Experience picks between the journey and the compact list with a CSS media query that matches the original's JS rule (`scene width < 960px`), so the server HTML is already in the right mode and nothing shifts on hydrate.

## SEO and accessibility

- Metadata API (title, description, Open Graph, Twitter), a generated `opengraph-image`, `sitemap.ts`, `robots.ts` and JSON-LD for a `Person`.
- One `h1` (the name), an `h2` per section, `main` and `nav` landmarks, visible `:focus-visible` states that mirror the hover highlight, `aria-expanded`/`aria-controls` on every toggle, and empty `alt` only on purely decorative art.

## Results

Lighthouse on the production build (`next start`): desktop performance 99; mobile performance 88–91 across runs (simulated slow 4G, 4× CPU); accessibility, best practices and SEO 100.
