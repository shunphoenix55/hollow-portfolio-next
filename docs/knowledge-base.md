# Knowledge base

Everything needed to work on Wahhaj Mustafa's Hollow Knight–styled portfolio. Recent changes and next steps live in [`handoff.md`](handoff.md); the reasoning behind the original setup is in [`decisions.md`](decisions.md). Where `README.md` disagrees with this file, this file is current.

## People and repo

- **Owner of the portfolio:** Wahhaj Mustafa (game and XR developer, GitHub `shunphoenix55`, collaborator on the repo). Content comes from his old site, shunphoenix55.github.io.
- **Repo:** `Saad07Khan/hollow-portfolio-next`, private, single branch `main`.

## Stack

- Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript strict. `cacheComponents` and `partialPrefetching` are on in `next.config.ts`.
- Next 16 differs from older versions: read `node_modules/next/dist/docs/` before using an unfamiliar API (`AGENTS.md`).
- Tailwind CSS v4, all tokens in `src/styles/theme.css` under `@theme`. CSS Modules for every section's art and layout.
- `next/image` with AVIF/WebP, every image a local WebP static import with `placeholder="blur"`.
- `lucide-react` 1.x for UI icons (it has no brand icons; the GitHub mark is a hand path in `SocialIcon.tsx`).
- ESLint (`eslint-config-next`), Prettier with `prettier-plugin-tailwindcss`, Vitest.

## Commands

| Command                   | Does                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run dev -- -p 3100`  | Dev server (sprite is generated first). Use 3100; 3000 and 8000 are reserved for other work |
| `npm run build` / `start` | Production build / serve it                                                                 |
| `npm run lint`            | ESLint                                                                                      |
| `npm run typecheck`       | Route types + `tsc --noEmit`                                                                |
| `npm test`                | Vitest (journey math, ornament geometry, archive and guild content)                         |
| `npm run format:check`    | Prettier                                                                                    |
| `npm run ornaments`       | Rebuilds `public/ornaments.svg` and `sprite.generated.ts`                                   |

Before every commit: lint, typecheck, test, format check, build.

## Routes

| Route            | File                                                                             | What                                        |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------- |
| `/`              | `src/app/page.tsx`                                                               | The journey (sections below)                |
| `/projects`      | `src/app/projects/page.tsx`                                                      | `ArchivePage` with `portfolio-projects.ts`  |
| `/experience`    | `src/app/experience/page.tsx`                                                    | `ArchivePage` with `work-experience.ts`     |
| `/organizations` | `src/app/organizations/page.tsx`                                                 | Forest hero + hunter's journal (`guild.ts`) |
| metadata         | `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `icon.svg`, `PersonJsonLd.tsx` | All read `site.url`                         |

Everything is statically prerendered. `new Date()` in a server component breaks prerender in Next 16, which is why the footer copyright is a static string.

## Home page, top to bottom

`<Abyss revealOnHero />` (fixed WebGL motes behind everything) and `<SiteMenu>` (in the layout) wrap these:

1. **Hero** `sections/hero`. Sticky scene of four parallax layers (`hero-back`, `hero-stage` + `hero-knight`, `hero-mid`, `hero-front`) plus two fog layers, a vignette and the name. `useHeroMotion` maps scroll progress `p` (0 → 1 over the sticky phase) to layer lift and zoom, title opacity `1 - p * 1.8`, cue opacity and a dark overlay `clamp((p - 0.5) / 0.5) * 0.7`, and publishes `p` on `lib/hero-progress` (the abyss fades in from `p` 0.55). Track height 170vh, 140vh on phones. Mouse parallax only on fine pointers.
2. **Town** `sections/town`. Lamp-lit town scene with a typed welcome dialogue (`site.dialogue`). Images mount only when near (`useOnceInView` with 50% root margin); typing starts at 40% visibility. Characters are revealed by CSS `transition-delay` 34 ms each.
3. **JourneyMenu** `sections/journey`. "Choose your path" list from `journeyLinks` (home anchors).
4. **Projects** `sections/projects`. Cave backdrop, HUD (count of all projects), heading, first four projects as cards, "View all" → `/projects`. Two columns above 900px, one column below, a horizontal snap row on phones.
5. **TechStack** `sections/stack`. Ruins backdrop, 11 orbs scattered on a 5-column grid with seeded jitter (`TechStack.tsx`). First view plays an intro (knight jumps, slashes the rock, orbs burst out: `stack-intro.ts`, `StackIntro.tsx`). Orb details show on hover/focus.
6. **Experience** `sections/experience`. Above 960×609 with motion allowed: a 440vh pinned cave where the knight jumps between platforms per job (`useKnightJourney`, pure math in `journey-math.ts`, platform coordinates in `content/experience.ts` as % of the 1672×941 cave). Otherwise a stacked list. The switch is a CSS media query mirrored in `modes.ts`. "View all" → `/experience`.
7. **EndCredits** `sections/credits`. Three 100vh scenes:
   - Guild scene (`credits-forest`), pulled up 8vh, with org summary and a CTA to `/organizations`.
   - Farewell (`town-farewell`): typed goodbye (`farewellLine`), then the knight turns and walks off right and fades. `TYPE_PER_CHAR_MS = 34` in `Farewell.tsx` must match the dialogue CSS delay.
   - Credits cave (`credits-cave`): a knight walk-cycle sprite (`knight-walk`, 6 frames) and a looping credits roll from `creditRoll`.
   - Each scene starts when in view via `PlayOnView` (`data-playing`).
8. **SiteFooter** `sections/footer`, `id="contact"`. 100vh black, pulled up 8vh, content at the bottom. WebGL smoke (`ui/smoke`, colour `#8c929b`, half resolution, pauses off-screen) along the bottom half. Contact mailto + round GitHub and LinkedIn icons (`site.socials`) top right; name, short role, copyright, page links and email at the bottom.

## Archive pages (`/projects`, `/experience`)

- `ArchivePage` = `ArchiveShell` (cavern backdrop, back nav) + `ArchiveHeader` + `ArchiveBrowser`.
- `ArchiveBrowser`: ferris wheel (`ui/ferris-wheel`, drag, arrows, keyboard) selects an entry; a cue under it slow-scrolls (`lib/slow-scroll.ts`, cancelled by wheel, touch or key) to the detail.
- `ArchiveDetail`: title, subtitle, overview, features, tech tags, details list, links, and a framed image with thumbnails. `size="sm"` gives smaller text and `HkChoice` links. Without images it renders text only.
- Selection is synced to the URL hash by `useHashSelection` (replaceState on select, listens to `hashchange`).

## Organizations page

- `GuildHero`: `credits-forest` contained in a block with a bottom fade, page header inside.
- `GuildJournal`: sticky left index grouped into Organizations and Workshops and talks (slot mark on the selected item), right page card with `FrameCorners`, content via `ArchiveDetail size="sm"`. Same hash sync. Below 900px it stacks.
- Content in `content/guild.ts`: 2 orgs (CodeChef VIT, TAG Club VIT), 4 workshops/talks (DEVSOC '23, Beyond Reality XR webinar, Blender workshop, Fruit Ninja Unity workshop). Tested by `guild.test.ts`.

## Navigation

- `SiteMenu`: fixed round toggle top right opening a `<dialog>` with `JourneyNav compact` and `menuLinks`: Achievements and Skills and Contact go to home anchors; Projects, Experience, Organizations and Workshops go to pages.
- `<html data-scroll-behavior="smooth">` tells Next 16 to disable smooth scrolling during route changes (otherwise new pages scroll-animate from the old position).

## Content model (`src/content`)

| File                                          | Holds                                                                                       |
| --------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `site.ts`                                     | name, role, `shortRole`, title, description, URL, dialogue, `copyright`, `email`, `socials` |
| `journey.ts`                                  | `journeyLinks` (home), `menuLinks` (menu and footer)                                        |
| `projects.ts`                                 | Projects section heading and "View all" href                                                |
| `portfolio-projects.ts`, `work-experience.ts` | `ArchiveEntry[]` for the archive pages                                                      |
| `archive.ts`                                  | `ArchiveEntry`, `ArchiveImage` (`StaticImageData`), links, labels                           |
| `stack.ts`                                    | Tech orbs (name, icon, optional detail)                                                     |
| `experience.ts`                               | Jobs and platform coordinates for the home journey                                          |
| `guild.ts`                                    | Organizations page groups and labels                                                        |
| `credits.ts`                                  | Credits roll, guild scene copy and CTA, farewell line                                       |

Components only render what they are given; edit copy in these files.

## Shared UI

- `Ornament name="…"`: `<use>` into the generated sprite (`orn-flourish`, `orn-crest`, `orn-corner`, `orn-panel-top`, `slot-mark`, `knight`, `tech-*`, …). `flip` uses `scale: 1 -1`; `glow` adds the drop-shadow.
- `HkChoice`: Hollow Knight menu choice (link or button), `selected`, `size="md" | "lg"`.
- `SectionHeading` (`lg`, `md`, `sm`; title or dialogue font), `CrestRule`, `FrameCorners`.
- `MotionSection`: sets `data-offscreen` when out of view, which pauses all CSS animations inside.
- `PlayOnView`: sets `data-playing` once in view.
- Hooks: `useInView`, `useOnceInView`, `useMediaQuery`. Lib: `rafScheduler`, `clamp`/`smoothstep`, `hero-progress`, `slowScrollTo`.

## Typography

| Variable          | Font                                               | Used for                                          |
| ----------------- | -------------------------------------------------- | ------------------------------------------------- |
| `--font-title`    | Trajan Pro if installed, else Cinzel (local woff2) | Hero and footer name, section titles, card titles |
| `--font-label`    | Sedan SC                                           | Small labels, footer text, cue                    |
| `--font-dialogue` | Cormorant Garamond 500/700                         | Dialogue, body copy, detail pages                 |
| `--font-body`     | Poppins 400                                        | Small meta text (roles, dates, tags)              |

Cinzel is caps-only, so it reads as small caps; anything mixed case uses Cormorant. No all-caps text in UI copy. Cormorant looks about 20% smaller than Poppins at the same pixel size.

**Phone scale** (`theme.css`, applied inside each section's `@media (max-width: 640px)`; desktop sizes are untouched):

| Token                  | Size | Used for                                                                         |
| ---------------------- | ---- | -------------------------------------------------------------------------------- |
| `--type-phone-display` | 34px | Hero name                                                                        |
| `--type-phone-title`   | 28px | Archive and org titles, footer name                                              |
| `--type-phone-heading` | 22px | `SectionHeading lg`, journey items, wheel title, guild scene title               |
| `--type-phone-lead`    | 19px | Card titles, `HkChoice lg`, detail labels and feature titles, experience company |
| `--type-phone-body`    | 17px | Dialogue, archive intro                                                          |
| `--type-phone-minor`   | 16px | Card points, "Read more", tech labels and details, credits lead and note         |
| `--type-phone-small`   | 14px | Experience role and meta, journal subtitles                                      |
| `--type-phone-label`   | 12px | Hero cue                                                                         |

New phone text should pick one of these instead of a new pixel value.

## Assets (`src/assets`, all WebP)

| File                                        | Size                          | Where                                 |
| ------------------------------------------- | ----------------------------- | ------------------------------------- |
| `hero-back/mid/front/stage`                 | 1672×941                      | Hero layers                           |
| `hero-knight`                               | 1254×1254                     | Hero knight on the stage              |
| `town-scene`, `town-front`                  | 1672×941                      | Town                                  |
| `projects-cave`                             | 1024×1536                     | Projects backdrop                     |
| `projects-cavern`                           | 1672×941                      | Archive page backdrop                 |
| `stack-ruins`, `stack-rock`, `knight-slash` | 1536×1024, 1254²              | Tech stack backdrop and intro         |
| `exp-cave`, `exp-knight-jump/stand`         | 1672×941, 360²                | Experience                            |
| `credits-forest`                            | 1672×941                      | Guild scene and `/organizations` hero |
| `town-farewell`                             | 1672×941                      | Farewell                              |
| `credits-cave`, `knight-walk`               | 1672×941, 1662×492 (6 frames) | Credits cave                          |
| `projects/*`, `work/*`                      | various                       | Archive entries and home cards        |

Scenes keep the 1672:941 ratio and are contained, feathered with two-gradient masks, never cropped hard against black.

## Responsive rules (current)

- Breakpoints in use: 640px (phone), 900px (stacked layouts), 960px + 609px tall (Experience journey).
- Hero 140vh on phones, name 34px; town reframes on the characters with the dialogue at the bottom; projects become a swipe row; experience becomes a list.
- Most scenes still use `100vh`; `svh` only on the town (phones) and archive hero. See `handoff.md` for the planned mobile pass and the portrait images to create.

## Motion and performance rules

- Animate only `transform` and `opacity`. One rAF loop per effect, started on demand, stopped when idle or off-screen; scroll handlers only record a target.
- WebGL (abyss, smoke) caps device pixel ratio, renders below full resolution, pauses when hidden or off-screen and draws one still frame under reduced motion.
- `prefers-reduced-motion`: no parallax, typing, journey, sway, glints or credit scroll; final states shown.
- Measured hero scroll: 60 fps with no long frames on an M-series Mac.

## Gotchas

- **Lightning CSS** merges `transform` and `translate` on the same rule and drops `translate`: put anchor offsets inside `transform`. It also drops unprefixed `backdrop-filter` when a manual `-webkit-` line follows it.
- **Turbopack + Tailwind:** the Tailwind loader rule must target `globals.css` only, or every CSS Module's class names come out empty.
- **Sprite:** external `public/ornaments.svg`, never inline (RSC payload duplication). Outer `<svg>` gets a 0-origin viewBox.
- **Stacking:** `z-index: -1` pseudo panels need `isolation: isolate` on the parent.
- **Masks:** two-gradient feathering needs `mask-composite: intersect`.
- **`[hidden]`** is forced with `display: none !important` globally.
- **CSS rule order** decides ties between modules with equal specificity; `ArchiveDetail.module.css` currently defines its main selectors twice, so phone overrides go at the end of the file.
- **Typing speed** lives in two places (dialogue CSS and `Farewell.tsx`).
- **Experience platforms** are image percentages; re-measure if `exp-cave` changes.

## SEO and accessibility

Metadata API on every page, generated OG image, sitemap (home, projects, experience, organizations), robots, `Person` JSON-LD. Set `NEXT_PUBLIC_SITE_URL` in production or every canonical and OG URL points at localhost. One `h1`, `h2` per section, landmarks, `:focus-visible` mirrors hover, decorative images have empty `alt`.

## Working conventions

- Small single-concern commits, 2–3 plain lowercase words (`hero pacing`), no prefixes, no trailers; stage by explicit path.
- Run all checks before committing; push only `main` (no PR flow on this repo).
- No code comments. Follow the file's existing idiom.
- Never remove or hide existing UI without the owner's explicit approval.
- No all-caps UI copy. Images stay local WebP with blur placeholders.
- Ports 3000 and 8000 are reserved; develop on 3100.

## Deploy (Vercel)

The site is a plain Next.js app: Vercel detects the framework with no config and every route is static. The project is set up on Wahhaj's Vercel account, not the repo owner's.

- **Environment variable:** `NEXT_PUBLIC_SITE_URL` = the production origin (e.g. `https://<project>.vercel.app` or the custom domain), set for Production before the first deploy. It is inlined at build time, so redeploy after changing it.
- **Git access:** a Vercel Hobby account only builds pushes to a private repo when the commit author is that account's owner. With the repo private under `Saad07Khan`, pushes by anyone other than Wahhaj would be blocked. Either transfer the repo to `shunphoenix55` and make it public (any collaborator's push then deploys), or use Vercel Pro and add both people to the team.
- **Build settings:** defaults (`npm install`, `npm run build`; `prebuild` generates the ornament sprite). Node 20+.
- **Domain:** add it under Project → Domains, then update `NEXT_PUBLIC_SITE_URL` and redeploy.
