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
| `public/cv/bogdan-gorelkin-cv-en.pdf` | `documents/CV/CV_Bogdan_Gorelkin_EN.pdf` (June 2026) | Nav "CV", contact chapter, Index, noscript. **It contains a phone number.** |
| `public/images/profile/bogdan-bench.webp` (720×960) | `images/about.jpg`, resized | Index → Profile, and `moments.bench` in the Field scene |
| `public/images/field/esp8266-lamp-prototype.webp` (1920×1080) | `images/projects/esp8266-led.png`, video letterbox cropped | Field scene hero plane: `fieldTests[0].teaser` |
| `public/og-image.jpg` (1200×630) | Rendered from the site's opening frame | `og:image` / `twitter:image` |
| `public/favicon.svg` | New | Favicon |

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
- **Deep dives** carry the long version on YouTube or LinkedIn. They're set through `deepDives: [{ label, href, platform }]` on the same entries. The first link is the story's call to action in the film; every link is listed in the Index.
- **Embeds:** none. Links open in a new tab with an accessible label ("… — opens LinkedIn in a new tab").

## KNOWN EXTERNAL LINKS

All are public-safe sources and wired in through `LINKS` in `src/data/projects.ts`.

| Story | Call to action in the film | URL |
|---|---|---|
| Microsoft Hackathon (Copenhagen 2026, Crowd Award) | **Watch the full film ↗** | https://youtu.be/H-j7i20jWfI?si=lNFsgy2RSUR4Qwey |
| HABS Player | **Read how we scaled experiments ↗** | https://www.linkedin.com/feed/update/urn:li:activity:7466058297108811777/ |
| Paris ride (EEG on a motorcycle) | **Watch the Paris field test ↗** | https://www.linkedin.com/feed/update/urn:li:activity:7401523361895464960/ |
| Skydive (EEG in freefall) | **See the skydive experiment ↗** | https://www.linkedin.com/feed/update/urn:li:activity:7371069399224569856/ |
| TemmaCare / MedTech | **See the medical device work ↗** | https://www.linkedin.com/feed/update/urn:li:activity:7135241238428966912/ |
| Research / programmable matter | Watch the simulation ↗ · Read the code ↗ | https://youtu.be/x4lbToZrboo · https://github.com/BogdanGorelkin/Boosted-MRTP (both from the old site) |
| Networked wall lamp | Watch the build ↗ | https://youtu.be/EpEfgixWeLc (old site) |

## REAL LOCAL ASSETS STILL NEEDED

Listed in order of impact. "Still" means a photo; "video" means a muted local loop.

### 1. Microsoft Hackathon: the first climax

- **Teaser loop** (video)
  - **Format:** horizontal 16:9, 1280×720–1920×1080, **5–15 s**, muted.
  - **Content:** the chain in one take — a person wearing the EEG headset, the game world shifting, then the LEDs or controller responding. No UI chrome.
  - **Used:** on the room's back wall after the camera breaks through the screen.
  - **Files:** `public/videos/hackathon-cph-teaser.{webm,mp4}` → `eeg-hackathon-cph.teaser`.
- **Poster** (still)
  - **Format:** a 16:9 frame from the loop.
  - **Used:** shown while the video loads.
  - **File:** `public/images/hackathon-cph-poster.jpg`.
- **Documentary still** (still)
  - **Format:** 4:5 portrait.
  - **Content:** Bogdan building or presenting at the hackathon.
  - **Used:** on the room's side wall.
  - **File:** `public/images/moments/bogdan-hackathon.webp` → `moments.hackathon`.
- **Full film:** already linked (YouTube above).

### 2. HABS Player: scale

- **UI teaser** (video, or one still)
  - **Format:** 16:9, **5–12 s**.
  - **Content:** the product UI only — protocol design, then a run, then monitoring. No OS chrome.
  - **Used:** plays on the big screen itself, replacing the procedural experiment grid.
  - **Files:** `public/videos/habs-player-teaser.*` → `habs-player.teaser`.
- **Clearance:** confirm on-screen content is public (no participant data).

### 3. Skydive: EEG in freefall

- **Teaser** (video or still)
  - **Format:** portrait 4:5, **5–10 s**.
  - **Content:** Bogdan in freefall with the headset visible.
  - **Used:** the hero plane where the Field dolly comes to rest — the film's main "Bogdan in person" moment.
  - **File:** `public/videos/field-skydive.*` or `public/images/field/skydive.webp` → `fieldTests` → `skydive.teaser`.
- **Optional extra:** a documentary still on the ground with the headset (4:5).

### 4. Paris ride: EEG on a motorcycle

- **Teaser** (video or still)
  - **Format:** landscape 3:2, **5–10 s**.
  - **Content:** the rider with the headset in traffic. A phone or app view in frame is a plus.
  - **Used:** the plane the camera settles on mid-dolly.
  - **File:** `public/images/field/moto-paris.webp` (or `public/videos/field-moto-paris.*`) → `moto-paris.teaser`.

### 5. TemmaCare / MedTech

- **Doctor-view UI** (still)
  - **Format:** 16:10.
  - **Content:** a public screenshot, e.g. the live oximetry graphs.
  - **Used:** replaces the "Remote doctor" screen in the MedTech scene.
  - **Goes to:** `temmacare.teaser`.
- **Device photos** (stills)
  - **Format:** 1:1 or 4:5, plain background.
  - **Content:** ECG, ultrasound probe, spirometer, dermatoscope, pulse oximeter.
  - **Used:** reserved for the Index / a future plane.
  - **Files:** `public/images/medtech/*`.

### 6. Research / programmable matter

- **Footage** (video or still)
  - **Format:** 16:9, **5–15 s**.
  - **Content:** real modules, VisibleSim recordings, lab shots.
  - **Used:** the scene is procedural today; a plane can be added beside the modules.
  - **Files:** `public/videos/research-*.mp4`.
- **Links:** a publication or presentation, if public → `experience.ts` → `research.deepDives`.

### 7. Bogdan: documentary material

Evidence of real work, not portraits. Each one should be 4:5 or 3:2, 1600–2000 px, WebP or AVIF.

- **Hardware / bench:** one exists (`public/images/profile/bogdan-bench.webp`, used in the Field scene and the Index). A newer one is welcome.
- **Hackathon:** see 1.
- **Headband test:** → `moments.headband`. The slot is ready but not placed in the film yet.
- **Lab or workshop.**
- **Field testing:** skydive and Paris ride, covered above.

### Also open

- **HABS systems teaser** (`habs-systems.teaser`): several devices in use, 16:9. Needs public-safe clearance.
- **Social / OG image:** `public/og-image.jpg` is a frame of the opening. Re-render it if the intro copy changes.

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
