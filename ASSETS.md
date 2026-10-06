# Assets

Every media slot is driven by data in `src/data/`, so the scene code never changes. Drop the file into `public/`, then point the matching entry at it. Paths are served from the site root, so `public/videos/a.mp4` is written as `/videos/a.mp4`.

A slot with no real media renders a procedural placeholder, generated at runtime with no files and no network.

## Media entry format

```ts
// src/data/types.ts → MediaAsset
{ kind: 'video', sources: { webm: '/videos/x.webm', mp4: '/videos/x.mp4' }, poster: '/images/x-poster.jpg', alt: '…', aspect: 16 / 9 }
{ kind: 'image', src: '/images/x.avif', alt: '…', aspect: 3 / 2 }
{ kind: 'placeholder', label: 'SHOWN ON THE PLACEHOLDER', alt: '…', aspect: 4 / 5 }
```

`aspect` is width ÷ height. Each plane is sized from it, so give the true aspect ratio of the file.

## In the repo now

These were migrated from the previous site (`BogdanGorelkin.github.io`).

| File | Source | Used in |
|---|---|---|
| `public/cv/bogdan-gorelkin-cv-en.pdf` | `documents/CV/CV_Bogdan_Gorelkin_EN.pdf` (June 2026) | Nav "CV", contact chapter, Work & Experience, noscript. **It contains a phone number.** |
| `public/images/profile/bogdan-bench.webp` (720×960) | `images/about.jpg`, resized | Work & Experience → small documentary image beside the header |
| `public/images/field/esp8266-lamp-prototype.webp` (1920×1080) | `images/projects/esp8266-led.png`, video letterbox cropped | Field "Also" line data (not a 3D plane — the Field scene is reduced to the two experiments) |
| `public/og-image.jpg` (1200×630) | Rendered from the site's opening frame | `og:image` / `twitter:image` |
| `public/favicon.svg` | New | Favicon |

### Real video (added October 2026)

The repo holds only the web versions the site plays, in `public/videos/optimized/`: H.264 High, yuv420p, 30 fps, no audio, `+faststart`, each with a poster JPG. Source recordings are not kept in the repo; if one is dropped under `public/videos/` while preparing an encode, `vite.config.ts` → `shipOptimizedVideosOnly` keeps it out of `dist/`.

| Web version | Made from | Where |
|---|---|---|
| `optimized/habs-player.web.mp4`: **0.9 MB**, 1600×1004, 26.1 s (CRF 22) | Two screen recordings, in this order: study-flow creation (20.8 s), then live lab-station monitoring (5.3 s, login screen cut). VFR → CFR 30, the second cropped to the first's 1.594 aspect. **Operator names, the organisation column and client study titles are blurred in the encode.** | Scale: the product slot the experiment grid resolves into (`habs-player.teaser`), frame drawn by the screen shader |
| `optimized/hackathon.web.mp4`: **2.9 MB**, 1600×900 (CRF 23) | H.264 1920×1080, 11.6 s | Hackathon room: the footage wall (`eeg-hackathon-cph.teaser`), frame `screen` |
| `optimized/paris-eeg-ride.web.mp4`: **7.3 MB**, 1280×960 (CRF 25) | HEVC 1920×1440 60 fps, 12.9 s | Field beat 1 (`moto-paris.teaser`), frame `hairline` |
| `optimized/skydive.web.mp4`: **6.1 MB**, 1280×960 (CRF 25) | HEVC 2704×2028 60 fps, 9.9 s | Field beat 2, the large frameless hero (`skydive.teaser`) |
| `optimized/temmacare-spo2.web.mp4`: **1.1 MB**, 480×854 (CRF 22) | H.264 480×854, 9 s | MedTech: the device-shaped evidence panel (`temmacare.teaser`), frame `device` |

**Format notes:**
- Always ship H.264: HEVC doesn't decode in many Chrome and Firefox setups.
- Re-encode with the same settings: `ffmpeg -i in -map 0:v:0 -an -vf scale=W:H -r 30 -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart out.web.mp4`.
- Before encoding any HABS screen recording, check every frame for names, emails, client or organisation names, and blur or cut them.

### Not migrated, and why

| Old asset | Verdict | Reason |
|---|---|---|
| `images/me2.jpg`, `images/Снимок.JPG` | Obsolete | Too small (274×324, 127×100) |
| `favicon.png` (round portrait) | Obsolete | A photo favicon doesn't fit the new identity |
| `images/projects/MRTP.png`, `Movable.gif` | Maybe | Real modular-robot simulation renders, but low-res. The research chapter links to the GitHub repo and video instead |
| `images/projects/stm32f070rb.jpg`, `nucleo.jpg`, `pyBoard.jpg` | Obsolete | Vendor pinout and stock-style board images |
| Coursework images (PCA, QGIS, Dataiku, ARX, gender, queens…) | Obsolete | Coursework, not the current story |
| `images/programming_skils/*` | Obsolete | Logo cloud |
| `images/supervisors/*`, `documents/recommendations/*`, `documents/diploma/*` | Obsolete | Other people's photos, letters and diplomas don't belong on the public site |
| `documents/CV/CV_Bogdan_Gorelkin_FR.pdf` | Needs replacement | Outdated: still lists AuxaSphere as the current job |

## Cinematic assets vs deep-dive links

The site works like a trailer:

- **Cinematic assets** are short local files played inside the film. They're set through `teaser` on projects and field tests, or `media` on moments, all in `src/data/projects.ts`, and live in `public/videos/` and `public/images/`.
- **Deep dives** carry the long version on YouTube or LinkedIn. They're set through `deepDives: [{ label, href, platform }]` on the same entries. The first link is the story's call to action in the film; project links are listed once in **Work & Experience** after the film (Featured projects, then Earlier projects behind a disclosure). Roles in the Experience list carry no links.
- **Embeds:** none. Links open in a new tab with an accessible label ("… — opens LinkedIn in a new tab").

## KNOWN EXTERNAL LINKS

All are public-safe sources and wired in through `LINKS` in `src/data/projects.ts`. What each one proves, and how to use it, is in [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md).

| Story | Call to action in the film | URL |
|---|---|---|
| Microsoft Hackathon (Copenhagen 2026, Crowd Award) | **Watch the full film ↗** | https://youtu.be/H-j7i20jWfI?si=lNFsgy2RSUR4Qwey |
| HABS Player | **Read how we scaled experiments ↗** | https://www.linkedin.com/feed/update/urn:li:activity:7466058297108811777/ |
| Paris ride (EEG on a motorcycle) | **Watch the Paris field test ↗** | https://www.linkedin.com/feed/update/urn:li:activity:7401523361895464960/ |
| Skydive (EEG in freefall) | **See the skydive experiment ↗** | https://www.linkedin.com/feed/update/urn:li:activity:7371069399224569856/ |
| TemmaCare / MedTech | **See the medical device work ↗** (kept in data, not shown to visitors) | https://www.linkedin.com/feed/update/urn:li:activity:7135241238428966912/ |
| Research: modular robots — hexanodes | **Watch the hexanodes simulation ↗** · **View the code ↗** | https://youtu.be/alA4-bqghO0?si=lCiKSfFQ0miONd8x · https://github.com/BogdanGorelkin/Modular-Movable-Robots |
| Networked wall lamp | Watch the build ↗ | https://youtu.be/EpEfgixWeLc (old site) |

## REAL LOCAL ASSETS STILL NEEDED

**Available now:**
- HABS Player (two-clip recording)
- Microsoft hackathon teaser
- Paris EEG ride
- Skydive
- TemmaCare SpO₂

The list below is what's still missing, in order of impact.

### 1. HABS Player: clearance only

The recording is in (see above). Still to confirm: the name "HABS Player" and the on-screen content are public (dashboard counts, lab-station names and route labels are visible; names and client titles are blurred).

### 2. HABS current system (Today / System chapters)

- **What:** real device / mobile / multi-device footage: headbands on people, the phone app receiving, several devices at once.
- **Format:** 16:9 or 4:5, 5–10 s.
- **Used:** `habs-systems.teaser`. There's no slot in the film yet: the Today scene is procedural. Ask to add a plane once footage exists.
- **Clearance:** needs public-safe clearance.

### 3. Research: hexanodes

- **What:** a 5–15 s 16:9 loop cut from the hexanodes simulation (the public video, https://youtu.be/alA4-bqghO0), as an H.264 web version.
- **Used:** set `programmable-matter.teaser` and it appears automatically beside the modules.
- **Note:** the old site's `Movable.gif` is real but low-res.

### 4. Bogdan: documentary photos (optional)

The skydive footage now puts Bogdan in the film. Still useful:
- **At the hackathon** (4:5): `moments.hackathon`. It's no longer shown in the room, because the real footage carries that scene.
- **With a headband** (4:5): `moments.headband`, not placed in the film yet.
- **In a lab or at the bench:** one exists (`public/images/profile/bogdan-bench.webp`, used in Work & Experience).

### Also open

- **TemmaCare device photos:** ECG, ultrasound probe, pulse oximeter. Optional now that the SpO₂ footage exists.
- **Social / OG image:** `public/og-image.jpg` is a frame of the opening. Re-render it if the intro changes.

## Encoding guidance

### Video

- 1920×1080 at most; 1280×720 is usually enough on a 3D plane.
- 24–30 fps, muted (no audio track), 8–20 s loops.
- Aim for **under 6–8 MB** per clip.
- Provide both formats:
  - **WebM** (VP9 or AV1)
  - **MP4** (H.264, `yuv420p`, `+faststart`)

Example:

```bash
ffmpeg -i in.mov -an -vf "scale=1280:-2,fps=30" -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 hackathon-cph.webm
ffmpeg -i in.mov -an -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart hackathon-cph.mp4
```

Always add a `poster` image: a frame from the clip as JPG or AVIF, under 200 KB.

### Images

- AVIF or WebP, with the longest side 1600–2000 px, under 300 KB each.
- The scene is dark and monochrome. Footage with natural contrast and restrained colour fits best, so grade it before export rather than in code.

### 3D models (if added)

- glTF binary (`.glb`), compressed with Draco or Meshopt, for example: `npx gltf-transform optimize in.glb out.glb --compress meshopt`.
- Self-host the decoders under `public/draco/` (or use Meshopt, which needs no extra files) so nothing depends on a CDN.
- Keep each model under ~2 MB, and lazy-load it the first time its scene's `presence` becomes non-zero, the same way `MediaPlane` does.
