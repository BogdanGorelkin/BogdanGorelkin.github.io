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
| `public/images/profile/bogdan-bench.webp` (720×960) | `images/about.jpg`, resized | Index → Profile (shown desaturated) |
| `public/images/field/esp8266-lamp-prototype.webp` (1920×1080) | `images/projects/esp8266-led.png`, video letterbox cropped | Field scene hero plane: `fieldTests[0]` |
| `public/og-image.jpg` (1200×630) | Rendered from the site's opening frame | `og:image` / `twitter:image` |
| `public/favicon.svg` | New | Favicon |

### Not migrated, and why

| Old asset | Verdict | Reason |
|---|---|---|
| `images/me2.jpg`, `images/Снимок.JPG` | Obsolete | Too small (274×324, 127×100) |
| `favicon.png` (round portrait) | Obsolete | A photo favicon doesn't fit the new identity |
| `images/projects/MRTP.png`, `Movable.gif` | Maybe | Real modular-robot simulation renders, but low-res. The robotics station links to the GitHub repo and video instead |
| `images/projects/stm32f070rb.jpg`, `nucleo.jpg`, `pyBoard.jpg` | Obsolete | Vendor pinout and stock-style board images |
| Coursework images (PCA, QGIS, Dataiku, ARX, gender, queens…) | Obsolete | Coursework, not the current story |
| `images/programming_skils/*` | Obsolete | Logo cloud |
| `images/supervisors/*`, `documents/recommendations/*`, `documents/diploma/*` | Obsolete | Other people's photos, letters and diplomas don't belong on the public site |
| `documents/CV/CV_Bogdan_Gorelkin_FR.pdf` | Needs replacement | Outdated: still lists AuxaSphere as the current job |

## REAL ASSETS STILL NEEDED

Listed in order of impact.

### 1. Microsoft Hackathon hero video (Scene 3, the room's back wall)

- **Goes to:** `projects.ts` → `eeg-hackathon-cph` → `media[0]`, files at `public/videos/hackathon-cph.webm`, `.mp4` and `public/images/hackathon-cph-poster.jpg`.
- **Format:** horizontal 16:9, ideally 1920×1080 (1280×720 is fine), 8–20 s muted loop.
- **Should show the chain in one shot if possible:** someone wearing the EEG headset, then the game reacting, then the LEDs or controller responding. Real environment, people, light.
- **Avoid:** UI chrome, screen recordings of IDEs, faces of people who haven't agreed to be shown.
- **Bonus:** one still of the Crowd Award moment (16:9 or 3:2).

### 2. Field: skydiving experiment (Field scene, second plane)

- **Goes to:** `fieldTests` → `skydiving` → `media`, at `public/images/field/skydiving.avif` (or `public/videos/field-skydiving.*`).
- **Format:** portrait 4:5, or a 5–10 s vertical loop.
- **Should show:** the device or test setup in context, so it reads as an experiment rather than a holiday photo. Add one line of description: what was measured and why.

### 3. Field: motorcycle / mobile testing

- **Goes to:** `fieldTests` → `motorcycle` → `media`.
- **Format:** landscape 3:2.
- **Should show:** the hardware mounted or worn while moving, ideally with a phone or app visible. Add one line of description.

### 4. Field: hackathon floor, Copenhagen 2026

- **Goes to:** `fieldTests` → `hackathon-floor` → `media`.
- **Format:** square 1:1 (or 4:5).
- **Should show:** building or debugging on site, with hardware on the table. A different moment from the hero video.

### 5. HABS / multi-device system (Scene 2 + Index)

- **Goes to:** `projects.ts` → `habs-multi-device` → `media[0]`. Not rendered in the film yet; the system scene is procedural.
- **Format:** 16:9, still or loop.
- **Should show:** several headsets streaming at once, or a realtime visualisation.
- **Needs public-safe clearance first** (see README → content notes). Avoid customer names, unreleased hardware, internal dashboards and datasets.

### 6. TemmaCare (MedTech station / Index)

- **Status:** optional. A public product shot of the app with a diagnostic device, 16:9, only if TemmaCare / AuxaSphere material is public.

### 7. Social / OG image (optional)

- **Status:** `public/og-image.jpg` is a frame of the site itself and is good enough to launch. Replace it if you want a different preview.

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
