# gorelkin-portfolio

Personal portfolio of **Bogdan Gorelkin**, a full-stack / product engineer in Paris.

It is built as one continuous, scroll-driven film rather than a stack of sections:

> **The technology changed. The pattern didn't.**
> Software that has to work with people and physical devices — human, hardware, software.

| # | Chapter | Beat |
|---|---|---|
| 0 | Signal | *Human. Hardware. Software. I like the space between them.* A live trace on a dark screen turns out to have depth. |
| 1 | Today | HABS: systems around connected human signals (head, headband, annotations). |
| 2 | System | From sensor to experience: fly through devices → BLE → mobile → backend → realtime → experience. |
| 3 | Scale | HABS Player: the same screen becomes a grid of experiments. *Build once. Run many experiments.* |
| 4 | Hackathon | Microsoft Hackathon, Copenhagen 2026, Crowd Award: push *through* the screen into a reacting room. |
| 5 | Field | *If I build it, I want to know how it behaves outside the lab.* Real media planes. |
| 6 | Rewind | Pull back: *But this didn't start with EEG.* Today's journey is one station; travel backwards. |
| 7 | MedTech | Remote care: patient, diagnostic devices, a remote doctor (TemmaCare). |
| 8 | Research | Programmable matter: modules reconfigure while a sync pulse spreads (Inria & Femto-ST). |
| 9 | Pattern | Three threads (human, hardware, software) run through every station. |
| 10 | Contact | The opening line again, calm: *What should we build next?* |

Recruiters don't have to sit through the film. The persistent nav (**Work / Experience / CV / Contact**) jumps straight to readable content, and a plain-HTML **Index** ("The short version") after the film lists everything.

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
    projects.ts    stories (teaser media + deep-dive URLs + publicSafe/featured), field tests, documentary moments
    experience.ts  career stations: Research → MedTech → HABS → Next, plus earlier research roles (Index only)
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
  chapters/      ← DOM layer: one component per chapter + the plain Index section
  components/    Nav, Chapter, Headline, LinkSlot, ContactLinks
  lib/           gsap setup, scrubbed-timeline helpers, spline, math
  styles/        tokens, base, chapters, index section
public/          images/ videos/ models/ textures/ cv/   (see ASSETS.md)
```

Optional fields that are left empty in `src/data` render as an explicit **"To be added"**; nothing is invented. A contact link or CV with no URL is shown as disabled text, never as a dead link.

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

## Content notes

Content comes from two sources:

- **`CV_Bogdan_Gorelkin_EN.pdf` (June 2026)** is authoritative for roles and dates.
- **The previous site** supplied project links, the education detail and photos.

Nothing beyond those two sources and the brief was invented. These items need a decision:

- **AuxaSphere / TemmaCare start date:**
  - The English CV says Jun 2022.
  - The old site and the French CV say Jan 2022.
  - The site shows years only (`2022 — 2025`), which is true either way.
- **Email:** the CV uses `b.k.gorelkin@gmail.com` and the old site used `b.gorelkin@yandex.com`. The site uses the CV address.
- **The CV PDF includes a phone number.** It was already public on the old site. Decide whether that's still OK.
- **`TODO: PUBLIC-SAFE CONTENT REVIEW`:** HABS wording in `projects.ts` (`habs-multi-device`) and `experience.ts` (`neurotech`) is deliberately generic. It has no device names, customers, data or architecture. Confirm it before publishing.
- **Deep dives:** YouTube and LinkedIn URLs that are still `undefined` (marked `TODO` in `src/data`) are hidden in the UI. ASSETS.md lists every slot.
- **Company name:** the brief said "Oxisphere", but both CVs say **AuxaSphere**, so the site uses AuxaSphere. Confirm.
- **The "250 Hz" annotation was removed** because no public, device-specific source confirmed it.
- **Production domain:** the old site used `gorelkin.vip`. The canonical and absolute OG URLs are left as a TODO in `index.html`.

## Deployment

Not configured yet. `pnpm build` outputs a static site to `dist/`.
