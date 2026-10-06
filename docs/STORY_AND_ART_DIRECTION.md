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
| 1 | **Today** (`#work`) | A chain rather than a brain: a quiet point-cloud head wearing a headband (device) → a wireless link carrying packets → a phone showing the live signal → the stream leaving for the system. Labels on the stages: Sensor / BLE / Mobile / Realtime. *"Today, I build systems around connected human signals."* + triad strip. | HABS = current proof of broad systems engineering: device, connection, software. |
| 2 | **System** | The signal is the protagonist: streams leave the phone, pinch through **one gate** (the system — the camera flies through it) and open onto the screen (the experience). *"From sensor to experience."* Four stages: Device · Mobile / edge · System · Experience. | Shows range end to end, readable without architecture knowledge. |
| 3 | **Scale** | The big screen becomes a grid of experiments, which then **resolves into one framed product slot** (right half) — the place the real HABS Player recording will play. *"Build once. Run many experiments."* Before/after + CTA. | HABS Player = product and scalability thinking (Tech Lead signal). |
| 4 | **Hackathon** | *"Software leaves the screen."* The camera pushes **through** the screen into a room: LEDs flash, a signal runs along the floor. It comes to rest square on a large **footage wall** (high in frame, the protagonist) with a smaller "Bogdan at the event" plane beside it. A quiet credits row below: Microsoft Hackathon · Copenhagen / 2026 · Crowd Award | title | EEG → Software → Game → Physical feedback · **Watch the full film ↗**. | **The first cinematic climax**, designed around the coming video. |
| 5 | **Field** | *"If I build it, I want to know how it behaves outside the lab."* Only two experiments + one moment: the **Paris ride** plane (camera holds on it, beat 1), then the **skydive** hero plane where the dolly rests (beat 2); the bench photo of Bogdan sits behind for depth. Other tests in an "Also" line. Triad strip top-left. | Real-world validation and personality, not a moodboard. |
| 6 | **Rewind** (`#experience`) | The camera rises while **today's whole journey physically collapses** into one station (scaled to the size of the others, double ring). Then the earlier stations emerge on the career line. *"But this didn't start with EEG."* Desktop: side-on line. Portrait: looking steeply down the line, stations stacked. The camera travels backwards. | The plot twist: everything seen so far is the current chapter. |
| 7 | **MedTech** | A point-cloud patient, **three** representative devices (ECG with live trace, ultrasound probe, pulse oximeter), an arc of data to a large remote-doctor screen (the TemmaCare media slot). Three labels only: Patient · Diagnostic devices · Doctor. Copy + triad + **See the medical device work ↗**. | The pattern existed before HABS. |
| 8 | **Research** | A single-layer arch of about 40 modules (calmer, dimmer, more space) rebuilds itself from a block while a sync pulse ripples. Framed right of the text from a quieter distance. A real simulation video, once provided, appears beside it. | The origin — deliberately not the climax. |
| 9 | **Pattern** | Three motifs recalled from the film — **HUMAN** (the point-cloud figure), **HARDWARE** (headband, phone, module), **SOFTWARE** (the Player's screen of runs) — connect into a loop with travelling packets, then **converge into one point** that becomes the closing line. Row on desktop, column on portrait. *"The technology changed. The pattern didn't."* | The payoff, as a recap rather than a diagram. |
| 10 | **Contact** (`#contact`) | The opening trace again, calm and horizontal: a bookend. *"What should we build next?"* Email · LinkedIn · GitHub · Download CV. As the Index rises (soft gradient edge), the ending fades and lifts away. | A simple ending, and a deliberate handoff. |
| — | **Index** ("The short version") | A plain HTML curtain: profile, Selected work by weight, experience, capabilities, education, languages. | Recruiter clarity. |

**Device of the whole film:** *one continuous world.* The HABS journey literally collapses into a station on the career line, and the opening trace returns at the end.

**Hierarchy rule:** real project evidence > typography > 3D supporting visualisation > decoration. Every media slot is composed so real footage will be the protagonist.

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
