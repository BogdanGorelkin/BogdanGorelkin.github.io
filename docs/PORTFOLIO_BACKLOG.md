# Portfolio backlog

Known unfinished work, as of commit `23a5bb5`. Only tick an item off once it exists in the repo.

## UI / cinematic polish

Done in the clarity pass: the name is promoted in the intro; HABS is now a device → link → phone chain; System is a single gate; the Player slot is defined; the Hackathon is footage-first; Field is reduced to two experiments + one moment; the Rewind collapse; MedTech has 3 devices and 3 labels; Research is calmer; the Pattern is a motif convergence; Contact → Index handoff; portrait framings for Rewind and Pattern.

- [ ] **Placeholders still carry the key scenes** (hackathon footage, Paris, skydive, doctor screen). Real media is now the main lever.
- [ ] **Hackathon credits row:** the title floats in the middle column; revisit once the video sets the visual weight.
- [ ] **MedTech:** the patient figure is faint, and on mobile the doctor screen sits at the right edge.
- [ ] **Mobile Today:** the 5-line headline leaves only the top quarter for the head / phone chain.
- [ ] **Rewind on mobile:** the "03 — HABS" label sits close to the headline.
- [ ] **Pacing:** the total scroll is still long (~25 screens desktop); tighten once media is in.
- [ ] **No "headband" moment of Bogdan** placed in the film yet (`moments.headband` exists).

## Copy

- [ ] **HABS wording** (`habs-systems`, station `neurotech`): generic on purpose, awaiting public-safe review.
- [ ] **Field triad** "A rider in traffic · me, in freefall": clunky; refine.
- [ ] **Scale lede** "Not just features — systems that let a team move faster": decent; consider something shorter.
- [ ] **MedTech headline** "Connected through software." wraps heavily on phones.
- [ ] Hackathon `flow` is now the short chain *EEG → Software → Game → Physical feedback*; the longer subtitle/summary only show in the Index and static layout.
- [ ] **Rewind caption** "Everything so far is one chapter — HABS, today. Rewind.": check it reads to zero-context visitors.

## Real media needed

Full specs are in [ASSETS.md](../ASSETS.md).

**Not yet in the repo:**
- [ ] Microsoft Hackathon: 5–15 s 16:9 local teaser + poster.
- [ ] Microsoft Hackathon: documentary still of Bogdan (4:5).
- [ ] HABS Player: UI teaser (5–12 s) or screenshot.
- [ ] Skydive: footage or strong still (4:5).
- [ ] Paris ride: footage or still (3:2).
- [ ] TemmaCare: doctor-view UI screenshot (public), device photos.
- [ ] Programmable-matter research: photos or simulation footage.
- [ ] Documentary images of Bogdan: hackathon, lab, headband, field tests.
- [ ] HABS systems teaser: needs clearance.

**Already in the repo:**
- [x] Bench portrait (`public/images/profile/bogdan-bench.webp`).
- [x] ESP8266 lamp photo.
- [x] English CV.
- [x] OG image.

## Content still missing / to verify

- [ ] Confirm **"HABS Player"** can be named publicly (the LinkedIn post doesn't name it).
- [ ] Confirm naming **"Sensora"** (HABS's app, named in the skydive post) or keep "HABS's app".
- [ ] Confirm **AuxaSphere** (both CVs) vs "Oxisphere" (the brief).
- [ ] Confirm the **TemmaCare start month** (Jan vs Jun 2022). The site shows years only.
- [ ] Confirm the **email** to publish: gmail (CV) vs yandex (old site).
- [ ] Confirm the **phone number** in the public CV PDF is OK.
- [ ] **Research:** any publication, presentation or extra public link.
- [ ] **Older work worth adding?** React Native template / react-kit (2024); CV side projects (music app, outdoor social network). They need details from Bogdan, and should only be added if they prove something new.
- [ ] **Production domain** for the canonical URL and absolute OG URLs (the old site used `gorelkin.vip`).

## Technical polish

- [ ] Set `<link rel="canonical">` and absolute `og:url` / `og:image` once the domain is known (TODO in `index.html`).
- [ ] `@react-three/drei` is only used for `PerformanceMonitor`. It could be dropped in favour of a small FPS monitor, which would shrink the 3D chunk (~950 kB / 257 kB gzipped).
- [ ] `MediaPlane` calls `video.play()` every frame until playback starts. Harmless; could be tidied.
- [ ] A `THREE.Clock` deprecation warning comes from R3F upstream. Ignore until R3F updates.
- [ ] No real-device performance check yet: test a mid-range phone and laptop.
- [ ] Re-render `public/og-image.jpg` whenever the intro copy changes.

## Deployment

- Current repo: `github.com/BogdanGorelkin/gorelkin-portfolio`, branches `dev` and `prod`.
- A Nixpacks config exists:
  - Node 22 is pinned via `engines`, `.nvmrc` and `nixpacks.toml`.
  - `pnpm start` = `vite preview` on `$PORT`, with `preview.allowedHosts: true`.
- Production will eventually move from the old GitHub Pages site (`BogdanGorelkin.github.io`, `gorelkin.vip`) to Bogdan's own VPS. **Don't do deployment work unless asked.**
