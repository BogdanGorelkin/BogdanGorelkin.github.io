# Story and art direction

The durable creative brief. **Single source of truth for narrative and visual direction.** Facts live in [PORTFOLIO_CONTEXT.md](PORTFOLIO_CONTEXT.md).

## What the visitor should leave with

> Bogdan can take an idea across software, devices and real-world interaction and turn it into a working product or experiment.

**What the site must NOT communicate:**
- "Bogdan is primarily an EEG / neuro scientist."
- "Bogdan is another frontend developer with a cool Three.js site."
- A chronological CV.

**The test for every scene:** *Would a visitor with zero context understand what this scene proves about Bogdan?* A beautiful transition nobody understands is a failure.

## Story spine (as implemented)

The story clock runs from 0 to 11. Each row is one `<section>` in `src/chapters/`, configured in `src/experience/chapters.ts`.

| t | Chapter (nav label) | On screen | Why it exists |
|---|---|---|---|
| 0 | **Signal** | A live trace on a dark screen. **BOGDAN GORELKIN** appears first, as a large expanded title (bottom-left), with "Full-stack / Product Engineer", "Software · hardware · realtime systems" and "Paris / 2026". After about 5 s (or the first scroll), **HUMAN. HARDWARE. SOFTWARE.** appears with *"I like the space between them."* Scrolling swings the camera: the flat trace is really a thread into depth. | Whose portfolio this is, then identity and curiosity in under 10 s, broader than neurotech. |
| 1 | **Today** (`#work`) | A chain rather than a brain: **a person** — a point-cloud head-and-shoulders bust seen near profile, looking at the phone — wearing a headband (device) → a wireless link carrying packets → a phone showing the live signal → the stream leaving for the system. The camera sits a little above eye level so the band reads as a ring. Labels on the stages: Sensor / BLE / Mobile / Realtime. *"Today, I build systems around connected human signals."* + triad strip. | HABS = current proof of broad systems engineering: device, connection, software. |
| 2 | **System** | The signal is the protagonist: streams leave the phone, pinch through **one gate** (the system — the camera flies through it) and open onto the screen (the experience). *"From sensor to experience."* Four stages: Device · Mobile / edge · System · Experience. | Shows range end to end, readable without architecture knowledge. |
| 3 | **Scale** | One continuous system: the **same live channels** glide into the lanes of a grid of experiments (same signal, same clock, the sweep keeps running) while the camera eases off over 2.84 → 3.32. Attention then narrows onto one framed product slot (right half), and the **real HABS Player recording** plays there: a study flow being built, then live lab-station monitoring. *"Build once. Run many experiments."* Before/after + CTA. | HABS Player = product and scalability thinking (Tech Lead signal). The real UI is the proof. |
| 4 | **Hackathon** | *"From signal to environment."* The camera pushes **through** the screen into a room: LEDs flash, a signal runs along the floor. The headline has cleared before it comes to rest square on the **real hackathon footage** (double-outlined "screen", high in frame, the protagonist: game, HABS dashboard, people in headbands, the Microsoft venue). A quiet credits row below: Microsoft Hackathon · Copenhagen / 2026 · Crowd Award, then the title, then EEG → Software → Game → Physical feedback · **Watch the full film ↗**. | **The first cinematic climax**, proven by real footage: a person's signal became a game world, LEDs and a controller. |
| 5 | **Field** | *"If I build it, I want to know how it behaves outside the lab."* The statement plays over an empty dark stage. Then two real videos: **Paris** (framed window at street level, an EEG app over the ride past the Eiffel Tower; beat 1). The camera slides past it (it leaves the frame on the left), rises while the ground line drops away and the fog opens, and comes to rest on the **skydive**: larger, frameless, higher and deeper, Bogdan at the aircraft door (beat 2). Each video only appears once its text and camera are ready. "Also" line; triad strip top-left. | Real-world validation and personality: the engineer tests his own systems. |
| 6 | **Rewind** (`#experience`) | The camera rises while **today's whole journey physically collapses** into one station (scaled to the size of the others, double ring). Then the earlier stations emerge on the career line. *"But this didn't start with EEG."* Desktop: side-on line. Portrait: looking steeply down the line, stations stacked. The camera travels backwards. | The plot twist: everything seen so far is the current chapter. |
| 7 | **MedTech** | Two people and the software between them: a **patient** (the film's point-cloud figure) with **three** representative devices beside them (ECG with live trace, ultrasound probe, pulse oximeter), **one arc of data** to a **remote doctor** (the same figure, far away). Apart from the diagram, a **device-shaped panel plays the real SpO₂ footage** (oximetry graphs being built, JavaFX → React) — the only screen in the scene. Labels: Patient · Doctor. Copy + triad; no CTA in the film (TemmaCare appears after the film as a role in Experience). | The pattern existed before HABS. The diagram explains the system; the footage proves the work. |
| 8 | **Research** | A single-layer arch of about 40 modules (calmer, dimmer, more space) rebuilds itself from a block while a sync pulse ripples. Framed right of the text from a quieter distance. The public proof is the **hexanodes** simulation (modular movable robots, C++ / VisibleSim): **Watch the hexanodes simulation ↗ · View the code ↗**. A real loop from it, once cut, appears beside the modules. | The origin — deliberately not the climax. |
| 9 | **Pattern** | *Software is the tool I use to connect humans with the physical world* — as a picture, not a sentence. **SOFTWARE** (the Player's screen of runs) sits in the foreground, the protagonist. **HUMAN** (the point-cloud figure) and **HARDWARE** (headband, phone, module) are two worlds further back on either side. The software's signal paths draw out to both (packets run person → software → hardware), then **one line is born from the connection** and runs on: it calms into the Contact bookend. Row with depth on desktop; on portrait the two worlds sit high and apart, software large below. *"The technology changed. The pattern didn't."* | The payoff: software is the connective layer, not one of three equal trades. |
| 10 | **Contact** (`#contact`) | The opening trace again, calm and horizontal: a bookend. *"What should we build next?"* Email · LinkedIn · GitHub · Download CV. As Work & Experience rises (soft gradient edge), the ending fades out completely before any of its text is readable. | A simple ending, and a deliberate handoff. |
| — | **Work & Experience** (`#index`) | A plain HTML curtain, calmer than the film, not a second CV: the positioning line *"Software is the tool I use to connect humans with the physical world."*, contact links, a small documentary photo. Then three groups: **Featured projects** (concrete public proof, in this order: Microsoft Hackathon · HABS Player · Paris EEG Ride · Skydive EEG — one row each with its deep dives), **Show earlier projects** (a collapsed disclosure: hexanodes, RSA on an STM32), and **Experience** (one line per role, no links). The nav gets a backing and drops the chapter counter here. | "I liked this — where can I inspect the work and the career?" Recruiter clarity. |

**Device of the whole film:** *one continuous world.* The HABS journey literally collapses into a station on the career line, and the opening trace returns at the end.

**Hierarchy rule:** real project evidence > typography > 3D supporting visualisation > decoration. Every media slot is composed so real footage is the protagonist.

**Media rules:**
- Each video has its own frame: `screen` for the hackathon, `hairline` for Paris, `none` for the skydive, `device` for SpO₂; the HABS Player recording is framed by the screen's own product slot.
- Videos play only while present and on screen, so at most one decodes at a time.
- Videos are always muted and never show controls.
- Under reduced motion, posters stand in for the videos.

## Copy style

- Short, specific, confident, natural. Big statements are minimal; facts go in quiet metadata or body text.
- Projects and outcomes before technologies. Technologies appear in context, never as a cloud.
- **Banned:** "passionate", "results-driven", "innovative solutions", "cutting-edge", "team player", "full-stack enthusiast", "Hi, I'm Bogdan", generic AI personal branding.
- **Banned framing:** "controlling the game with your mind", the skydive as a stunt, anything negative about past employers.
- **Calls to action** are contextual, never "Learn more" or "View on LinkedIn". See CONTENT_SOURCES.md.
- **Don't fill gaps with text.** If a scene is unclear, fix the visual or the transition first.

## Visual style

**Working — preserve:**
- near-black and off-white palette with greys and one warm white; no accent colour
- fog as the main depth and lighting instrument
- hairline lines, points and wireframes
- editorial type:
  - Archivo Variable, expanded and uppercase, for statements
  - normal width for body text
  - IBM Plex Mono for metadata
- a scroll-driven camera with holds, pushes, a pull-back and transitions *through* geometry
- parallax media planes; a subtle grain and vignette
- quiet bordered call-to-action buttons

**Unwanted:**
- the hero / projects grid / skills / contact template
- SaaS look, neon cyberpunk, hacker terminals, glowing gradients, glassmorphism, rounded floating cards
- custom cursors, skill bars or percentages, logo clouds
- animation for its own sake

**Media:**
- **Real evidence beats decorative 3D.** Procedural placeholders are temporary.
- **Documentary moments of Bogdan** (bench, hackathon, field tests, headband) are evidence, not posed portraits.
- **Trailer vs extended story:**
  - **Cinematic asset:** a short local loop or still, inside the film.
  - **Deep dive:** LinkedIn or YouTube, an external link only. No embeds in the film.
- A technically impressive effect that weakens the story should be removed.

## Recruiter layer

The film and recruiter clarity must coexist:
- **Persistent quiet nav:** BG · Work · Experience · CV · Contact. Nav items fast-travel (0.8 s; instant under reduced motion) to the readable moment of a chapter.
- **Work & Experience** after the film holds the featured projects, earlier projects and the career in plain HTML.
- **Reduced motion and no-WebGL** both degrade to readable static layouts.
- **Never put critical text only in WebGL.**
