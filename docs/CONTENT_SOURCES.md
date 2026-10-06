# Content sources — what each one proves

**The model:** *the portfolio is the trailer; LinkedIn and YouTube are the extended story.* Keep the site concise and let these links carry the detail.

- **Where the URLs live:** `LINKS` in `src/data/projects.ts`, attached to projects and field tests as typed `deepDives` (`{ label, href, platform }`). Each URL exists in one place. The first entry is the story's call to action in the film (where the film shows one). **Work & Experience** (`src/data/explore.ts`: `featuredProjects`, `earlierProjects`, in display order) lists the project links once; Experience roles carry no links. Not every source is shown to visitors (see the table at the end).
- **Rules for using them:**
  - Never hard-code URLs in components.
  - Summarise these posts; don't quote them at length.
  - Don't infer confidential details from them.

Local media status for each slot is tracked in [ASSETS.md](../ASSETS.md).

---

## Microsoft Hackathon — full film (YouTube)

https://youtu.be/H-j7i20jWfI?si=lNFsgy2RSUR4Qwey

- **Public fact** (Bogdan's brief):
  - Microsoft Hackathon, Copenhagen, 2026, Crowd Award.
  - Realtime EEG → software → game environment → LEDs and controller feedback.
  - Built end to end, from scratch.
  - The YouTube page itself couldn't be read automatically, so these facts rest on the brief.
- **Narrative role:** the main cinematic climax, "From signal to environment". The full film is the deep dive; the site never embeds it.
- **Call to action:** **Watch the full film ↗**. In the film it sits in the Hackathon credits row; it's also the first Featured project after the film.
- **Local asset:** the teaser loop is in (`hackathon.web.mp4`). Still useful: a documentary still of Bogdan at the event.

## HABS Player (LinkedIn)

https://www.linkedin.com/feed/update/urn:li:activity:7466058297108811777/

- **Public fact:** HABS experiments moved from Python scripts, run and monitored locally, to a centralized platform. The platform has visual protocol design (steps, media), remote monitoring and per-participant personalisation through questionnaires. The result: faster iteration, larger-scale data collection, beyond a single lab. Production experiments run on it.
- **Narrative role:** scalability and product / system thinking. "He builds systems that make a team faster."
- **Interpretation note:** the post doesn't use the name "HABS Player". Bogdan uses it; confirm it can be public.
- **Call to action:** **Read how we scaled experiments ↗** (Scale chapter, Featured projects).
- **Local asset:** in — `habs-player.web.mp4` (study-flow creation, then live monitoring; names and client titles blurred) plays in the Scale chapter's product slot.

## Paris motorcycle — EEG field test (LinkedIn)

https://www.linkedin.com/feed/update/urn:li:activity:7401523361895464960/

- **Public fact:**
  - Bogdan rode a motorcycle through Paris wearing a portable EEG headset.
  - A custom mobile app he coded recorded EEG rhythms (alpha / beta / theta / gamma), GPS, speed and acceleration, with video.
  - The aim was to see how focus, stress and attention change during real riding.
- **Narrative role:** he tests systems in uncontrolled, moving environments. Human signal + software + motion and context data.
- **Call to action:** **Watch the Paris field test ↗** (Field chapter, beat 1; Index).
- **Local asset still needed:** a 3:2 photo or 5–10 s clip of the rider with the headset.

## Skydive — EEG in freefall (LinkedIn)

https://www.linkedin.com/feed/update/urn:li:activity:7371069399224569856/

- **Public fact:** a 4,000 m jump wearing an EEG headset, with HABS's AI app analysing emotions in real time. The post names it "Sensora"; the site doesn't name it yet.
- **Narrative role:** the strongest personal field-validation moment. Bogdan is visibly present. The tone is a curious engineer, not a daredevil.
- **Call to action:** **See the skydive experiment ↗** (Field chapter, beat 2 on the hero plane; Index).
- **Local asset still needed:** a 4:5 clip or still in freefall with the headset visible.

## TemmaCare / AuxaSphere — medical-device work (LinkedIn)

https://www.linkedin.com/feed/update/urn:li:activity:7135241238428966912/

- **Public fact:** Bogdan rendering oximetry (SpO₂) data as canvas graphs, during a migration from JavaFX to React + TypeScript. It's one artifact, not the whole TemmaCare story.
- **Narrative role:** public proof that connected software + physical medical devices predates HABS. The wider product concept (remote doctor ↔ software ↔ devices around the patient) comes from Bogdan's brief.
- **Call to action:** none shown to visitors right now. The link stays in data (`temmacare.deepDives`); TemmaCare is represented as a role in Experience and by the MedTech chapter, not as a project row.
- **Local asset still needed:** a public doctor-view screenshot (e.g. the oximetry graphs) and device photos.

## Older public links (old site, still valid)

| Link | Proves | Used |
|---|---|---|
| https://youtu.be/alA4-bqghO0?si=lCiKSfFQ0miONd8x, https://github.com/BogdanGorelkin/Modular-Movable-Robots | Research: "Simulation of the movement of modular robots hexanodes" (C++, VisibleSim, Univ. of Franche-Comté / IUT-BM; two authors). Legacy listing: https://gorelkin.vip/projects.html | Research chapter + Earlier projects ("Watch the hexanodes simulation", "View the code") |
| https://youtu.be/x4lbToZrboo, https://github.com/BogdanGorelkin/Boosted-MRTP | Modular-robot time-synchronisation (MRTP), FEMTO-ST | **Not used** — the hexanodes project is this chapter's public proof |
| https://youtu.be/EpEfgixWeLc | Hardware prototyping: ESP8266 lamp | Field "Also" line ("Watch the build") |
| https://github.com/BogdanGorelkin/RSA-SCA | Embedded security: RSA on an STM32, side-channel analysis | Earlier projects ("Read the RSA side-channel code") |
| https://github.com/BogdanGorelkin/NB-IoT-Downlink-Physical-Layer-Design | NB-IoT channel modelling | **Not shown** — not important enough for the story |
| https://temma.care/ | The product exists | Kept in data; not shown |
