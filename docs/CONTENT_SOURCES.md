# Content sources — what each one proves

**The model:** *the portfolio is the trailer; LinkedIn and YouTube are the extended story.* Keep the site concise and let these links carry the detail.

- **Where the URLs live:** `LINKS` in `src/data/projects.ts`, attached to stories as typed `deepDives` (`{ label, href, platform }`). The first entry is the story's call to action in the film.
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
- **Narrative role:** the main cinematic climax, "Software leaves the screen". The full film is the deep dive; the site never embeds it.
- **Call to action:** **Watch the full film ↗**. In the film it sits in the Hackathon case block; it's also in the Index.
- **Local asset still needed:**
  - a 5–15 s 16:9 teaser loop with poster
  - a documentary still of Bogdan at the event

## HABS Player (LinkedIn)

https://www.linkedin.com/feed/update/urn:li:activity:7466058297108811777/

- **Public fact:** HABS experiments moved from Python scripts, run and monitored locally, to a centralized platform. The platform has visual protocol design (steps, media), remote monitoring and per-participant personalisation through questionnaires. The result: faster iteration, larger-scale data collection, beyond a single lab. Production experiments run on it.
- **Narrative role:** scalability and product / system thinking. "He builds systems that make a team faster."
- **Interpretation note:** the post doesn't use the name "HABS Player". Bogdan uses it; confirm it can be public.
- **Call to action:** **Read how we scaled experiments ↗** (Scale chapter, Index).
- **Local asset still needed:** a 5–12 s UI teaser or a screenshot. It plays on the big screen in the Scale chapter.

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
- **Call to action:** **See the medical device work ↗** (MedTech chapter, Index). There's also a secondary `temma.care` link.
- **Local asset still needed:** a public doctor-view screenshot (e.g. the oximetry graphs) and device photos.

## Older public links (old site, still valid)

| Link | Proves | Used |
|---|---|---|
| https://youtu.be/x4lbToZrboo, https://github.com/BogdanGorelkin/Boosted-MRTP | Programmable-matter research: modular-robot time sync | Research chapter ("Watch the simulation", "Read the code") |
| https://youtu.be/EpEfgixWeLc | Hardware prototyping: ESP8266 lamp | Field "Also" line ("Watch the build") |
| https://github.com/BogdanGorelkin/RSA-SCA, https://github.com/BogdanGorelkin/NB-IoT-Downlink-Physical-Layer-Design | Earlier embedded and wireless research | Index → earlier research |
| https://temma.care/ | The product exists | Secondary MedTech link |
