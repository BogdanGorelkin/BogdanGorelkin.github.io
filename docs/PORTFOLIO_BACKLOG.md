# Portfolio backlog

Known unfinished work, as of commit `23a5bb5`. Only tick an item off once it exists in the repo.

## UI / cinematic polish

- [ ] **Field tests is the weakest scene visually.** Its media planes are placeholders except the ESP8266 lamp photo and the bench portrait. It depends on real skydive and Paris media.
- [ ] **Field:** the triad strip (top-right) overlaps the hackathon-floor plane; a scrim was added but it's still busy.
- [ ] **MedTech:** the patient and devices are thin wireframes, and the remote-doctor screen is a small placeholder. A real doctor-view screenshot or device photos would carry it.
- [ ] **MedTech on mobile:** a 5-line headline + device list + triad + CTA makes a tall block, and the CTA appears late in the chapter.
- [ ] **Hackathon room:** the footage wall is a placeholder, so the climax relies on the push-through and the LED flash until the teaser exists.
- [ ] **Research on mobile:** the modules overlap the headline (a scrim exists).
- [ ] **Pattern on mobile:** the DOM fallback words sit over the threads.
- [ ] **Rewind and Pattern on mobile:** the wide shots make stations very small.
- [ ] **Pacing:** the total scroll is about 25 screens on desktop. Consider tightening section lengths in `chapters.ts` once real media is in.
- [ ] **Intro:** the far, depth-going part of the trace is faintly visible at the right edge at t=0 (fog 26). Minor.
- [ ] **No "headband" moment of Bogdan** placed in the film yet (`moments.headband` exists).

## Copy

- [ ] **HABS wording** (`habs-systems`, station `neurotech`): generic on purpose, awaiting public-safe review.
- [ ] **Field triad** "A rider in traffic · me, in freefall": clunky; refine.
- [ ] **Scale lede** "Not just features — systems that let a team move faster": decent; consider something shorter.
- [ ] **MedTech headline** "Connected through software." wraps heavily on phones.
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
