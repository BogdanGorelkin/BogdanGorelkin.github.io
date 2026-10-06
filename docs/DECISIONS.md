# Decisions — don't relitigate without a reason

| Decision | Why |
|---|---|
| **pnpm** only (never npm or yarn); **Vite + React + strict TypeScript**; no Next.js | Static, client-rendered cinematic site; it's the owner's choice. |
| **One continuous cinematic scroll journey**, not a hero / projects / skills / contact template | Memorability; the story is the product. |
| **Human + Hardware + Software** positioning, not a "NeuroTech Engineer" identity | Neurotech is the current chapter; the durable pattern is software meeting people and physical systems. |
| **"The technology changed. The pattern didn't."** is the narrative spine | It makes research → MedTech → HABS → field tests read as one story, not a CV. |
| The career is told **backwards after "But this didn't start with EEG"** | Lead with the strongest current work, then reveal its origins. |
| **Portfolio = trailer; LinkedIn / YouTube = extended story** | Keeps the film concise. External links only, no embeds. |
| **Contextual call-to-action labels** per story, stored as typed `deepDives` in data | Generic "Learn more" wastes the moment; URLs never live in JSX. |
| **Recruiter fast path coexists with the film:** nav fast-travel + plain-HTML Index + reduced-motion / static layout | Recruiters must get facts in seconds. |
| **Critical text is always DOM**, never only WebGL; DOM labels are pinned to 3D points (no drei `<Html>`) | Accessibility and SEO; drei Html threw StrictMode errors. |
| One **story clock**: a paused GSAP **director** timeline + a **shot list** + per-chapter scrubbed DOM timelines | Choreography is keyed to story time, not pixels. One place to read the film. |
| **Real media over decorative 3D**; procedural placeholders are temporary | Credibility. Remove impressive effects that weaken the story. |
| **Aesthetic:** near-black / off-white, fog, hairlines, editorial type (Archivo Variable + IBM Plex Mono). **No** neon, cyberpunk, terminals, novelty cursors, glassmorphism, skill bars, logo clouds | The owner's explicit direction. |
| **Never fabricate** facts. Missing data → `undefined` + TODO in data, hidden in the film | Trust. |
| **HABS content stays generic** (`publicSafe: 'review'`) | Current employer; no clients, architecture or internal details. |
| Research shows **"Human — not yet"** honestly | The pattern is stronger when it isn't overclaimed. |
| Node **22** for builds (Vite 8 / rolldown needs ≥ 20.19 / 22.12) | A Nixpacks deploy failed on Node 18. |
