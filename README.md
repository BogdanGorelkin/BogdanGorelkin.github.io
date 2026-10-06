# gorelkin-portfolio

Personal portfolio of **Bogdan Gorelkin**, a full-stack / product engineer in Paris.

It is built as one continuous, scroll-driven film rather than a stack of sections:

> **The technology changed. The pattern didn't.**
> Software that has to work with people and physical devices — human, hardware, software.

Eleven chapters run from identity through today's work at HABS, a Microsoft hackathon and field tests. Then a rewind — *"But this didn't start with EEG"* — goes back through remote medicine and programmable-matter research, and ends on the pattern that connects them. The chapter-by-chapter spine and the art direction are in [docs/STORY_AND_ART_DIRECTION.md](docs/STORY_AND_ART_DIRECTION.md).

Recruiters don't have to sit through the film. The persistent nav (**Recent projects / CV / Contact**) jumps straight to readable content — CV opens the Experience list, where the PDF download lives — and a plain-HTML **Work & Experience** section (`#index`) after the film gives featured projects, earlier projects and the career.

The content is real, taken from Bogdan's CV (June 2026) and his previous site. Where real footage doesn't exist yet, procedural placeholders stand in (see [ASSETS.md](ASSETS.md)).

## Stack

- pnpm, Vite, React 19, TypeScript (strict)
- three.js, `@react-three/fiber`, `@react-three/drei` (`PerformanceMonitor` only)
- GSAP + ScrollTrigger + CustomEase (`@gsap/react` for cleanup)
- Lenis for smooth wheel scrolling (native touch scrolling)
- Self-hosted fonts: Archivo Variable (with a width axis) and IBM Plex Mono, both via `@fontsource`

## Commands

```bash
pnpm install     # install dependencies
pnpm dev         # local dev server
pnpm build       # type-check + production build into dist/
pnpm preview     # serve the production build locally
pnpm typecheck   # type-check only
```

## Where things live

```text
src/
  data/          ← edit content here
    profile.ts     identity, summary, photo, grouped capabilities, education, languages, links, CV path
    projects.ts    LINKS (public deep dives), stories (teaser, deepDives, storyRole, weight, publicSafe), field tests, moments
    experience.ts  career stations: Research → MedTech → HABS → Next, plus earlier research roles (semantic tail only)
    copy.ts        narrative lines for each chapter (headlines, captions)
    types.ts       content types (Project, MediaAsset, CareerStation, …)
  experience/    ← the cinematic engine
    chapters.ts    chapter order, scroll lengths, nav anchors, NAV_TRAVEL_DURATION
    shots.ts       the camera shot list (keyframes on the story clock)
    director.ts    master GSAP timeline: fog, light, per-scene presence; camera sampling
    scrollStore.ts scroll → story clock; active chapter
    useScrollDirector.ts  Lenis + ScrollTrigger boot
    CameraRig.tsx  story clock → director → camera (damped)
    Experience.tsx the fixed, lazy-loaded R3F canvas; render gating
    SpatialLabels.tsx  DOM labels pinned to 3D points
    quality.ts     device tiers (desktop / mobile)
    navigation.ts  hash links, nav fast-travel
  scenes/        ← R3F environments (Signal, Neural, Data, Screen+Player+Room, Field, Timeline, MedTech, Research, Pattern, Atmosphere)
    world.ts       world layout constants shared by scenes and shots
    shared/        SignalLine (EEG ribbon shader), MediaPlane, StreamParticles, materials, geometry
  chapters/      ← DOM layer: one component per chapter + the plain Work & Experience section (IndexSection)
  components/    Nav, Chapter, Headline, LinkSlot, ContactLinks, DeepDiveLinks, TriadStrip
  lib/           gsap setup, scrubbed-timeline helpers, spline, math
  styles/        tokens, base, chapters, index section
public/          images/ videos/ models/ textures/ cv/   (see ASSETS.md)
```

Nothing is invented. Missing data stays `undefined` (with a `TODO`) in `src/data`: deep dives without a URL simply don't render, and a contact link or CV without a URL shows as disabled text, never as a dead link.

## How the cinematic scroll works

```text
Lenis (smooth wheel) ─► ScrollTrigger ─► scrollStore.story.time   ("story clock", 0 … 11)
                                              │
               ┌──────────────────────────────┴──────────────────────────────┐
               ▼                                                             ▼
  R3F frame (CameraRig, priority −1)                      DOM chapters (one scrubbed timeline each)
    director.seek(storyTime)  → stage: fog, light,          headline line-masks, metadata, panels
                                 per-scene presence          keyed to the chapter's local progress
    sampleCamera(storyTime)   → camera (damped)
    scenes read stage.presence (0 ⇒ not drawn)
```

- **Story clock.** Each chapter is a tall `<section>`. Chapter `i` covers story time `[i, i+1)` as it scrolls past. Everything 3D is keyed to story time, not pixels, so section heights (desktop and mobile) can change without retuning the choreography.
- **Shots.** `experience/shots.ts` is a list of keyframes, `{ t, pos, look, fov, ease, mobile? }`.
  - Repeating a keyframe creates a hold.
  - The path is a monotone cubic spline, so it never overshoots a keyframe.
  - The ease on a shot shapes the segment that leaves it.
  - `mobile` overrides apply in portrait.
- **Director.** `experience/director.ts` builds one paused GSAP timeline whose time axis is story time. It's never played; the render loop seeks it every frame. Tweens in it are cues: fog distances, room light, signal calm, and each environment's `presence`.
- **Typography.** Each chapter's DOM stage is fixed to the viewport and shown only while that chapter is active. Its text runs on a scrubbed timeline that covers the same scroll range, normalised to 0–1. A cue at `0.3` lines up with story time `i + 0.3` in `shots.ts`.
- **Adding a shot or chapter:**
  1. Add the chapter to `chapters.ts`.
  2. Add a `<Chapter>` component in `src/chapters/`.
  3. Add shots in `shots.ts` and presence cues in `director.ts`.
  4. Read `stage.presence.<key>` from a scene in `src/scenes/`.

### Performance, mobile, accessibility

- **Loading:** the 3D layer is a lazy chunk, so the DOM paints first.
- **Device pixel ratio:** capped (desktop 1.75, mobile 1.25), and `PerformanceMonitor` lowers it further under load.
- **Rendering cost:**
  - Environments with zero presence are not drawn.
  - Particles use a lookup table.
  - The signal waveform and the screen are drawn on the GPU.
  - There is no post-processing.
- **Media:** images and videos load the first time their scene appears, and videos pause when it disappears.
- **When Work & Experience covers the screen:** the canvas stops rendering frames, and resumes as soon as you scroll back.
- **Mobile tier:**
  - Fewer points and streams.
  - No 3D-anchored labels; the DOM lists take over.
  - Portrait camera framings.
  - Condensed typography via the font's width axis.
  - Native touch scrolling.
- **`prefers-reduced-motion`:**
  - No smooth scrolling and no typography animation.
  - Chapters become a normal document flow with all text visible.
  - The 3D layer cuts between still key frames with a short crossfade.
  - Nav jumps are instant.
- **No WebGL:** the site runs DOM-only.
- **Semantics and keyboard:** semantic landmarks, a skip link to Work & Experience, and keyboard focus that moves with nav jumps. The canvas is `aria-hidden`.

## Project docs

| File | Responsible for |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Rules and context for every Claude Code session |
| [docs/PORTFOLIO_CONTEXT.md](docs/PORTFOLIO_CONTEXT.md) | Facts about Bogdan and his work — the single source of truth |
| [docs/STORY_AND_ART_DIRECTION.md](docs/STORY_AND_ART_DIRECTION.md) | Story spine as implemented, copy style, visual direction |
| [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md) | Public LinkedIn / YouTube sources, what each proves, CTA labels |
| [docs/PORTFOLIO_BACKLOG.md](docs/PORTFOLIO_BACKLOG.md) | Open polish, copy, media, verification and technical work |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Decisions not to relitigate |
| [ASSETS.md](ASSETS.md) | Local media slots, specs and encoding |
| [.claude/agents/portfolio-director.md](.claude/agents/portfolio-director.md) | Specialist agent for narrative, content, copy and art direction |

## Deployment

`pnpm build` outputs a static site to `dist/`.

A Nixpacks-compatible setup exists:
- Node 22 is pinned in `engines`, `.nvmrc` and `nixpacks.toml`.
- `pnpm start` serves `dist/` on `$PORT`.

Production is planned to move from the old GitHub Pages site to a VPS. Nothing here deploys automatically.
