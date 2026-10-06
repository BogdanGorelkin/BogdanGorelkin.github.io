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
| 0 | **Signal** | A live trace on a dark screen. Identity row: name, "Full-stack / Product Engineer", "Software · hardware · realtime systems", "Paris / 2026". After about 5 s (or the first scroll), **HUMAN. HARDWARE. SOFTWARE.** appears with *"I like the space between them."* Scrolling swings the camera: the flat trace is really a thread into depth. | Identity and curiosity in under 10 s, broader than neurotech. |
| 1 | **Today** (`#work`) | Point-cloud head, headband, labels: Sensor / BLE / Mobile / Realtime. *"Today, I build systems around connected human signals."* HABS shown as metadata, plus a triad strip. | HABS = current proof of broad systems engineering. Starts with what he builds, not neuroscience. |
| 2 | **System** | Fly through headbands → edge slabs → backend lattice → screen. *"From sensor to experience."* Six layers listed. *"…I own it end to end."* CASE 01. | Shows range: hardware integration, mobile, backend, realtime. |
| 3 | **Scale** | The big screen becomes a grid of experiments. *"Build once. Run many experiments."* *"Not just features — systems that let a team move faster."* A struck-through Before (scripts on one machine) vs After. CTA. | HABS Player = product and scalability thinking (Tech Lead signal). |
| 4 | **Hackathon** | *"Software leaves the screen."* The camera pushes **through** the screen into a room: LEDs flash, a signal runs along the floor, a footage wall and a moment plane of Bogdan. Case: "A game environment that reacts to you", Crowd Award, signal chain, **Watch the full film ↗**. | **The first cinematic climax**: end-to-end creative engineering, software into a physical environment. |
| 5 | **Field** | *"If I build it, I want to know how it behaves outside the lab."* A sideways camera move across media planes. Beat 1: the **Paris ride** (signals: EEG, GPS, speed, acceleration). Beat 2: the **skydive**, on the hero plane where the camera rests (Bogdan in person). An "Also" line: lamp, hackathon floor. Triad strip. | Real-world validation and personality, not stunts. |
| 6 | **Rewind** (`#experience`) | Huge pull-back: the whole journey so far shrinks to one ringed station on a career line. *"But this didn't start with EEG."* Rail: Research · MedTech · HABS · Next. The camera travels **backwards**. | The pivot: neurotech is one chapter of a longer pattern. |
| 7 | **MedTech** | A patient made of points, five device glyphs (ECG, ultrasound, spirometry, dermatoscope, pulse oximetry), an arc of data to a remote-doctor screen. *"Remote care. Physical diagnostics. Connected through software."* Triad. **See the medical device work ↗** | The pattern existed before HABS. |
| 8 | **Research** | About 120 modules rebuild themselves from a block into an arch while a sync pulse ripples through. *"Before products, I was building programmable matter."* Triad with **Human — not yet, that came next**. Links. | The deeper origin. Honest about the missing human. |
| 9 | **Pattern** | Side-on: three living threads labelled HUMAN / HARDWARE / SOFTWARE run through every station (no Human node at Research). *"The technology changed. The pattern didn't."* | The payoff. The triad strips set it up. |
| 10 | **Contact** (`#contact`) | The opening trace again, now calm and horizontal: a bookend. *"What should we build next?"* Email · LinkedIn · GitHub · Download CV. | A simple ending. |
| — | **Index** ("The short version") | A plain HTML curtain: profile, Selected work by weight, experience, capabilities, education, languages. | Recruiter clarity. |

**Device of the whole film:** *one continuous world.* The HABS journey is literally a station on the career line, and the opening trace returns at the end.

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
- **The Index** after the film holds everything in plain HTML.
- **Reduced motion and no-WebGL** both degrade to readable static layouts.
- **Never put critical text only in WebGL.**
