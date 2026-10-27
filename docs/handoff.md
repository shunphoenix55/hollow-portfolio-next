# Handoff

State of the portfolio as of 27 Oct 2026, `main` at `8664e9d phone type scale`. Read [`knowledge-base.md`](knowledge-base.md) for how everything works; this file is what changed recently and what comes next.

## Recent commits

| Commit    | What                                                                                               |
| --------- | -------------------------------------------------------------------------------------------------- |
| `59eab49` | Archive images moved from remote URLs to local WebP in `src/assets/projects` and `src/assets/work` |
| `2c40d82` | More breathing room above the Projects heading and HUD, looser `md` heading line height            |
| `0d35397` | `HkChoice size="lg"`; "View all" on Projects and a new one under Experience                        |
| `97b8b30` | `ArchiveShell` + `ArchiveHeader` and `useHashSelection` extracted; `ArchiveDetail size="sm"`       |
| `a50b769` | End credits: guild scene, farewell scene, looping credits cave                                     |
| `445891f` | `/organizations` page (forest hero + hunter's journal)                                             |
| `be74c02` | Dialogue typing 34 ms per character                                                                |
| `acfd57f` | Site menu links to the pages; smooth scroll fixed for route changes                                |
| `5266e69` | Site footer with WebGL smoke                                                                       |
| `c51ba6b` | Hero pacing: 170vh track, softer dark fade (no black dead zone before the town)                    |
| `8664e9d` | Phone type scale (`--type-phone-*` tokens)                                                         |

All of these passed lint, typecheck, Vitest, Prettier and `next build`.

## Findings that drove the last two commits

- **Hero "sluggish" scroll** was pacing, not frame rate. Measured in a browser: steady 60 fps, p95 ~17 ms, no long animation frames at 1440×900 or 375 wide. The old 200vh track faded to full black at the end of the sticky phase, leaving ~0.65 of a screen of empty black scroll before the town. Now 170vh (140vh on phones), the title fades at `p * 1.8`, and the dark overlay only reaches 0.7.
- **Phone text** had 43 different font sizes, mostly `clamp(min, vw, max)` values sitting on desktop minimums. Phones now use one scale (see the knowledge base, Typography).

GPU cost of the hero (four zoomed full-scene layers, two fog layers with `mix-blend-mode: screen`) was not measurable in a hidden browser pane. It may still matter on low-end phones.

## Next: mobile pass

Breakpoints to standardise on: `640px` phones, `900px` stacked layouts (Experience still uses `960px`), a height query around `700px` for short laptops and landscape phones, content capped near `1440px` on ultrawide.

In priority order:

1. **Viewport units.** `100vh` → `100svh` (with `vh` fallback) on hero sticky, town, tech stack, credits scenes, footer, experience stage and archive shell. Add `viewportFit: 'cover'` to the `viewport` export and `env(safe-area-inset-*)` padding on the menu toggle and footer.
2. **Organizations page.** At ≤900px the index list sits above the card, so the first card starts ~1160px down on a phone. Turn the index into a sticky, grouped, horizontal chip row with the card directly under it.
3. **Project detail** (`ArchiveDetail`). Media is already first on phones. Replace the 84px thumbnails with a swipeable `scroll-snap` gallery with dots, make links full width.
4. **Home project cards.** Swipe row exists; show a peek of the next card and dots. Card images are greyscale until hover, so on touch they never colour: move hover effects behind `@media (hover: hover) and (pointer: fine)`.
5. **Tech stack.** 11 orbs in a 5-column scatter overlap at 390px (labels are now 16px, which makes it tighter). Use a 3-column scatter on phones (second set of `--x`/`--y` vars) and show the detail on tap.
6. **Min heights.** Scenes have 560–680px `min-height`, which overflows on landscape phones (360–430px tall). Experience already handles this with `max-height: 608px`; the others don't.
7. **Art direction.** Portrait crops through `getImageProps()` + `<picture>` in the existing image slots once the art exists (list below).

### Images to recreate in portrait

Must: `hero-back`, `hero-mid`, `hero-front`, `hero-stage` (one aligned set), `town-scene` + `town-front`, `town-farewell`, `credits-forest` (guild scene; the `/organizations` hero crops it fine), `credits-cave`.
Nice to have: `stack-ruins`, `projects-cavern`.
Fine as is: `exp-cave`, `projects-cave` (already portrait), knight sprites.

On ultrawide (2560px+) the 1672px-wide scene art is upscaled and soft; wider masters would fix that.

### Edge cases to test

- iOS toolbar collapse resizing `vh` sections; iOS 26 floating bar with fixed elements.
- Landscape phones and 1366×768 / 1280×720 laptops.
- iPad split view (~507 and ~694 wide), 320px wide, 2560 and 3440 wide.
- Touch: sticky hover after tap (wheel arrows, cards), hover-only tech details.
- 200% text zoom (fixed `px` sizes in HUD, cue, tags).
- Low-end Android: abyss WebGL + footer smoke + hero layers together.
- Hash selection and the Back button on `/projects`, `/experience`, `/organizations`.
- `prefers-reduced-motion` on every scene.

Test matrix: 360×800, 375×667, 390×844, 430×932, 844×390, 768×1024, 820×1180, 1280×720, 1366×768, 1440×900, 1920×1080, 2560×1440, 3440×1440.

## Known debt

- `src/components/sections/archive/ArchiveDetail.module.css` has a large duplicated block of selectors (`.title` … `.media` defined twice). Dedupe before the next real change there.
- `README.md` predates the credits, footer, `/organizations` and the latest hero numbers (it still says 200vh/160vh and lists the archive pages as open items). The knowledge base is current.
- `site.socials` has GitHub and LinkedIn; more links can be added with a path in `SocialIcon.tsx`.
- Menu "Achievements" points at `/#achievements`, which doesn't exist yet.

## Deploy

Live at https://wahhaj-xr.vercel.app (Wahhaj's Vercel). Auto-deploy on push waits on the GitHub connection; see the knowledge base, Deploy.
