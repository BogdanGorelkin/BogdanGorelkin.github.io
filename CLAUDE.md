# CLAUDE.md — gorelkin-portfolio

Bogdan Gorelkin's personal portfolio: a **cinematic, scroll-driven film**, not a conventional developer portfolio.

**Audience:** recruiters, hiring managers, CTOs and founders, and engineers. Both the "experience it" visitor and the "just give me the facts" recruiter must be served.

For narrative, content, copy or media work, use the **`portfolio-director`** agent (`.claude/agents/portfolio-director.md`).

## Positioning (applies to every task)

- **Who he is:** a Full-stack / Product Engineer who works where **HUMAN · HARDWARE · SOFTWARE** meet. Software repeatedly escapes the screen.
- **Not a "NeuroTech Engineer".** Neurotech (HABS) is the strongest *current* chapter, not the identity.
- **Spine:** *The technology changed. The pattern didn't.* Research → MedTech → HABS → field tests → hackathon are all people ↔ software ↔ physical devices.

## Content rules

- **Never invent** metrics, dates, titles, clients, companies, awards, technologies or links. Missing data stays `undefined` with a `TODO` in `src/data`, and is hidden in the film.
- **HABS stays public-safe:** no clients, datasets, internal architecture or infrastructure, internal URLs or repo names, or unreleased hardware.
- **No negative history** about past employers.
- **Outcomes and projects before technology lists;** concise copy.
- **The portfolio is the trailer;** LinkedIn and YouTube are the deep dives. Links are typed `deepDives` in data with contextual call-to-action labels. No URLs in JSX.
- **Content lives in typed data** (`src/data/*`), never hard-coded in scene or chapter JSX.

**Facts:** [docs/PORTFOLIO_CONTEXT.md](docs/PORTFOLIO_CONTEXT.md)
**What each public link proves:** [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md)
**Open work:** [docs/PORTFOLIO_BACKLOG.md](docs/PORTFOLIO_BACKLOG.md)
**Media slots and specs:** [ASSETS.md](ASSETS.md)

## Tech (actual)

- **Stack:** pnpm only, Vite 8, React 19, TypeScript (strict), three.js + `@react-three/fiber`, `@react-three/drei` (only `PerformanceMonitor`), GSAP + ScrollTrigger + CustomEase (`@gsap/react`), Lenis, self-hosted Archivo Variable + IBM Plex Mono.
- **Node ≥ 22.12** (pinned via `engines`, `.nvmrc`, `nixpacks.toml`).
- **Commands:**
  - `pnpm dev`
  - `pnpm typecheck`
  - `pnpm build`
  - `pnpm preview` / `pnpm start` (`vite preview` on `$PORT`)
- **Architecture:** one **story clock** (`storyTime` 0…11; chapter `i` = `[i, i+1)`).
  - Lenis → ScrollTrigger → `scrollStore`.
  - `director.ts` (a paused GSAP timeline) cues fog, light and per-scene `presence`.
  - `shots.ts` holds the camera keyframes (monotone spline; repeated keyframe = hold; `mobile` overrides).
  - Each DOM chapter has its own scrubbed timeline on local progress 0–1.
  - Details are in [README.md](README.md).
- **Adding a chapter:**
  1. `experience/chapters.ts`
  2. a component in `src/chapters/`
  3. shots
  4. director cues
  5. a scene reading `stage.presence.<key>`
- **GSAP gotchas:**
  - Never tween a property named `data` on the director's stage: it's a reserved GSAP vars key and fails silently.
  - Keep camera holds as repeated keyframes.
- **Must keep:**
  - semantic HTML for all critical text (DOM labels pinned to 3D, never text only in WebGL)
  - the recruiter fast path (nav BG · Work · Experience · CV · Contact, plus the plain Index)
  - the mobile tier, `prefers-reduced-motion` static layout, and the no-WebGL fallback

## Working style

1. **Inspect** the current implementation and docs first; start from the existing story, not a blank slate.
2. **Preserve** the established narrative unless Bogdan explicitly changes it. Iterate rather than rewrite.
3. **After material changes:** run `pnpm typecheck && pnpm build`, then **verify visually**.
   - Run headless Chrome with `playwright-core` (`channel: 'chrome'`, `--enable-unsafe-swiftshader`) from a scratch directory, not the repo.
   - Scroll to a story time with `section.top + localT × section.offsetHeight` (sections are `[data-chapter]`).
   - Wait about 2 s, then screenshot at 1440×900 and 390×844, and with `reducedMotion: 'reduce'`.
   - Check the console for errors.
4. **Don't deploy or push** unless explicitly asked. Branches: `dev` (work), `prod`.

@docs/STORY_AND_ART_DIRECTION.md
@docs/DECISIONS.md
