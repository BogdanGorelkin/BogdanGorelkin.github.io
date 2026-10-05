# gorelkin-portfolio

Personal portfolio of **Bogdan Gorelkin**, a full-stack / product engineer in Paris.

It is built as one continuous, scroll-driven film rather than a stack of sections:

> **Human → Signal → Software → Physical world → Career**

A live EEG-like trace leads the visitor into an abstract head, then through a multi-device data system and out through a screen into a physical room. From there it moves to field tests. At the career stage the camera pulls back to reveal that the whole journey was one station on a larger career line. The film closes on a single calm line and a question.

Recruiters don't have to sit through the film. The persistent nav (**Work / Experience / CV / Contact**) jumps straight to readable content, and a plain-HTML **Index** ("The short version") after the film lists everything.

This is a **V1 cinematic graybox**: the choreography, architecture and typography are in place, and procedural placeholders stand in for media until the real videos, photos and models are ready (see [ASSETS.md](ASSETS.md)).

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
    profile.ts     name, role, statement, focus areas, contact links, CV path
    projects.ts    case studies (+ media) and field tests; case numbers follow array order
    experience.ts  career stations: Research → Robotics → MedTech → NeuroTech → What's next
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
  scenes/        ← R3F environments (Signal, Neural, Data, Screen+Room, Field, Timeline, Atmosphere)
    world.ts       world layout constants shared by scenes and shots
    shared/        SignalLine (EEG ribbon shader), MediaPlane, StreamParticles, materials, geometry
  chapters/      ← DOM layer: one component per chapter + the plain Index section
  components/    Nav, Chapter, Headline, LinkSlot, ContactLinks
  lib/           gsap setup, scrubbed-timeline helpers, spline, math
  styles/        tokens, base, chapters, index section
public/          images/ videos/ models/ textures/ cv/   (see ASSETS.md)
```

Optional fields that are left empty in `src/data` render as an explicit **"To be added"**; nothing is invented. A contact link or CV with no URL is shown as disabled text, never as a dead link.

## How the cinematic scroll works

```text
Lenis (smooth wheel) ─► ScrollTrigger ─► scrollStore.story.time   ("story clock", 0 … 7)
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
- **When the Index covers the screen:** the canvas stops rendering frames, and resumes as soon as you scroll back.
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
- **Semantics and keyboard:** semantic landmarks, a skip link to the Index, and keyboard focus that moves with nav jumps. The canvas is `aria-hidden`.

## Deployment

Not configured yet. `pnpm build` outputs a static site to `dist/`.
