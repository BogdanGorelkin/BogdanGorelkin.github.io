# Portfolio context — facts about Bogdan

The **single source of truth for career and content facts.** If a fact isn't here, in `src/data/`, or in a source listed in [CONTENT_SOURCES.md](CONTENT_SOURCES.md), don't put it on the site.

**Sources, in order of authority:**
1. **Bogdan's own statements to Claude:** the briefs that shaped this repo.
2. **`public/cv/bogdan-gorelkin-cv-en.pdf`:** the English CV, dated June 2026.
3. **The five public LinkedIn and YouTube posts** in CONTENT_SOURCES.md.
4. **The old site**, a local repo at `../BogdanGorelkin.github.io` (also the old GitHub Pages site behind `gorelkin.vip`). Used for project links, education and photos.

The French CV in the old repo is outdated: it still lists AuxaSphere as the current job. Don't use it.

---

## Bogdan

- **Name:** Bogdan Gorelkin
- **Location:** Paris, France.
- **Languages:** English B2, French B2, Russian native, German A1.
- **Role / positioning:** Full-stack / Product Engineer. The CV title at HABS is "Full Stack Developer".
  - **Not** "NeuroTech Engineer". Neurotech is the current chapter, not the identity.
- **Durable positioning:** an engineer who likes working where **human, hardware and software** meet. He builds systems where software interacts with people, sensors, devices and the physical world.
- **Experience:** 5+ years of product-focused full-stack work, per the CV.
- **Roles he's targeting:** Senior or Staff full-stack, Product Engineer, Tech Lead. Industries: robotics, neurotech, medtech, IoT / connected products, human–machine systems.

**Traits to show through evidence, never as a bullet list:**
- prototypes fast (PoC → MVP → production)
- tests ideas in reality
- moves between software and hardware
- works across frontend, backend, mobile, devices and infrastructure
- thinks about scalability and how a team operates
- cares about the final experience

**Capabilities** (from the CV, grouped as in `profile.ts`):

| Group | Items |
|---|---|
| Product | React, React Native, TypeScript, multi-role UX |
| Systems | Node.js, NestJS, Python, Flask, Java / Spring, MongoDB, Redis, RabbitMQ |
| Connected devices | BLE, EEG / biometric signals, IoT, ESP8266 / Arduino / STM32, MicroPython, C / C++, ROS, RTOS, PCB & soldering |
| Infrastructure | Linux, Docker, CI/CD, Git, SSH / shell |

**Contact:**
- **Email:** `b.k.gorelkin@gmail.com` (from the CV; the old site used a Yandex address).
- **LinkedIn:** https://www.linkedin.com/in/bogdan-gorelkin/
- **GitHub:** https://github.com/BogdanGorelkin
- **CV:** `/cv/bogdan-gorelkin-cv-en.pdf`. It contains a phone number.

## The career narrative

> **The technology changed. The pattern didn't.**

Every chapter is people ↔ software ↔ physical devices or systems:

| Chapter | Human | Hardware | Software |
|---|---|---|---|
| Research: programmable matter | *not yet; that came next* | robot modules | distributed algorithms (FSM rules, time sync) |
| MedTech: TemmaCare | patient and remote doctor | diagnostic devices | remote consultation + device data |
| HABS: today | people wearing sensors | wearable EEG devices | apps + realtime backend, HABS Player |
| Field tests | a rider in traffic, Bogdan in freefall | portable EEG headsets | a mobile app he coded, real-time analysis |
| Microsoft Hackathon | the player's state | EEG headset, LEDs, controller | realtime game environment |

**Internal phrase:** *software repeatedly escaping the screen.* It's guidance, not necessarily on-screen copy.

## Current work — HABS (Feb 2025 – now, Paris)

- **Company:** HABS — Human Augmented Brain Systems.
- **Role:** Full Stack Developer.

**Public-safe summary** (CV + brief):
- Software for biometric-signal acquisition, processing workflows and protocol execution.
- End-to-end delivery across React, React Native, backend services and infrastructure.
- Fast PoCs from leadership ideas, turned into MVPs and production features.
- Peripheral-device integration and data-capture pipelines.
- CI/CD.

**Themes confirmed by Bogdan,** kept generic on the site:
- EEG devices
- BLE
- several devices streaming at once
- realtime data pipelines
- experiment orchestration and tooling
- WebSockets
- Python / Node / TypeScript

**Public-safe rule.** Never publish:
- clients or customer names
- datasets
- internal architecture or infrastructure
- internal URLs or repository names
- unreleased hardware
- private screenshots

Current HABS wording in `src/data` is marked `publicSafe: 'review'` / `TODO: PUBLIC-SAFE CONTENT REVIEW`.

## HABS Player

*This is HABS work.* Source: the public LinkedIn post (see CONTENT_SOURCES.md). The post doesn't use the name "HABS Player"; Bogdan does, and its public use is still unconfirmed.

- **Before:** experiments were Python scripts, run and monitored locally on one machine.
- **After:** a centralized platform with:
  - visual protocol design (steps, media)
  - remote monitoring
  - per-participant personalisation through questionnaires
- **Result:** faster iteration, larger-scale data collection, and research setups beyond a single lab.

**Why it matters:** it isn't "another app". It shows **product and scalability thinking**: bespoke experiment workflows became a reusable system the team runs. It supports the Product Engineer / Tech Lead positioning.

## Microsoft Hackathon (Copenhagen, 2026, Crowd Award)

**Facts:**
- Realtime EEG read the player's state.
- Software orchestrated a game environment, plus LEDs and controller feedback.
- Bogdan built the full experience end to end, from scratch.
- Full 2-minute film on YouTube (see CONTENT_SOURCES.md).

**Framing:**
- **Use:** "the environment reacts to the player's state in real time."
- **Avoid:** "controlling the game with your mind."

**Role:** the main cinematic proof that software leaves the screen.

## Field tests

These are **real-world validation, not stunts.** Tone: a curious engineer, never "look how crazy I am".

- **Paris ride — EEG on a motorcycle.** Source: public LinkedIn post.
  - Bogdan rode through Paris wearing a portable EEG headset.
  - A mobile app he coded recorded EEG rhythms (alpha, beta, theta, gamma) with GPS, speed and acceleration. The ride was also video-recorded.
  - The goal was to see how focus, stress and attention shift during real riding.
- **Skydive — EEG in freefall.** Source: public LinkedIn post.
  - A jump from 4,000 m wearing an EEG headset.
  - HABS's app analysed emotional state in real time. The post names the product "Sensora"; the site says "HABS's app" until naming is confirmed.
- **Networked wall lamp (ESP8266, 2024).** From the old site.
  - Idea to MVP: a lamp controlled over the network, remotely or through Siri.
  - Build video on YouTube; a real photo is in the repo.
- **Hackathons in general** are also field work.

## MedTech — TemmaCare / AuxaSphere (2022 – 2025, Paris)

- **Role:** Software Application Developer at AuxaSphere, whose product is TemmaCare.
- **Company name:** both CVs say "AuxaSphere". The brief once said "Oxisphere"; that's unconfirmed and probably a typo.
- **Dates:**
  - The English CV says Jun 2022 – Feb 2025.
  - The old site and French CV say the start was Jan 2022.
  - The site shows "2022 — 2025".

**Product concept:** a patient communicates remotely with a doctor while physical diagnostic devices are connected locally around the patient.
- **Devices from the brief:** ECG, ultrasound, spirometry, dermatoscope.
- **Device from the public post:** pulse oximetry (SpO₂).

**Bogdan's work:**
- **From the CV:**
  - medical-device data visualisation, encryption, storage and delivery
  - UX / UI for a multi-role system
  - microservices
  - reusable strictly typed packages
  - mentoring and code review
- **From the public post:** oximetry graphs drawn on canvas during a migration from JavaFX to React + TypeScript.

**Role in the story:** the human + software + hardware pattern existed **before HABS**.
- Keep the company brand small.
- **No negative company history, ever.**

## Research — programmable matter (Inria & Femto-ST, 2020 – 2021)

- **Role:** Research Engineer. Locations: Lille (Inria) and Montbéliard (Femto-ST / UTBM).
- **The work:**
  - self-reconfigurable modular robots
  - module behaviour as deterministic finite-state machines
  - a boosted time-synchronisation protocol (MRTP)
  - movement simulation (hexanodes), in VisibleSim and BIP

**Public links (from the old site):**
- Code: https://github.com/BogdanGorelkin/Boosted-MRTP
- Video: https://youtu.be/x4lbToZrboo
- Also: https://github.com/BogdanGorelkin/Modular-Movable-Robots and https://youtu.be/alA4-bqghO0

**Role in the story:** the physical / software pattern predates product work. Honest gap: there was no human in the loop yet.

## Older experience — what to do with it

| Experience | Source | Verdict |
|---|---|---|
| Research Engineer, Polytech Nantes / IETR (2020): RSA on STM32, side-channel analysis ([code](https://github.com/BogdanGorelkin/RSA-SCA)) | CV, old site | **Portfolio-relevant**, in the Index as "earlier research" |
| Research student, TUSUR lab (2018–2019): NB-IoT channel modelling, 3GPP ([code](https://github.com/BogdanGorelkin/NB-IoT-Downlink-Physical-Layer-Design)) | old site | **Portfolio-relevant**, in the Index as "earlier research" |
| M.Sc. IoT, UBFC / UTBM (2020–21); M.Sc. Wireless Embedded Technologies, Polytech Nantes (2019–20), double degree with TUSUR | CV | **Background**, Index only |
| React Native template and react-kit npm package (2024, GitHub `dev-masters-team`) | old site | **Maybe**: shows tooling and DX care, but not the pattern |
| Side projects: music app with limited listening rights, outdoor-activity social network | CV, no details or links | **Maybe**, only if Bogdan supplies details |
| Hobbies: IoT devices, Raspberry Pi home server, vehicle repair, skydiving, cycling, bouldering, music | CV | **Background**. Skydiving is already a field test |
| Security-systems lab intern, TUSUR (2016–18): CCTV and fire-system installation | old site | **Probably omit** |
| Weekend-school maths teacher (2019–20); driving instructor using VR (2017–19) | old site | **Omit** |
| School history, coursework (PCA, QGIS, Dataiku, ARX, gender classification, mobility analysis), recommendations, diplomas | old site | **Omit** |
