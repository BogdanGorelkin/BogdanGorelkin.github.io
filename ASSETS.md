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

- **Cinematic assets** are short local files played inside the film. They're set through `teaser` (or `media` on moments) in `src/data/projects.ts`, and live in `public/videos/` and `public/images/`.
- **Deep-dive links** carry the long version on LinkedIn or YouTube. They're set through `linkedinUrl`, `youtubeUrl`, `externalUrl` and `deepDiveLabel` on the same entries.
- **A link left `undefined` (marked `TODO`) doesn't render.** Fill in the URL and it appears in the film and in the Index.
- **Embeds:** none. LinkedIn and YouTube are plain external links only.

## REAL ASSETS STILL NEEDED

Listed in order of impact on the story.

### 1. Microsoft Hackathon (chapter "Software leaves the screen")

| What | Spec | Goes to |
|---|---|---|
| Cinematic teaser | Horizontal 16:9, 1280×720–1920×1080, **5–15 s** muted loop. Should show the chain in one take: the EEG headset on a person, the game reacting, then the LEDs or controller responding. No UI chrome. WebM + MP4, under 6 MB, with a poster JPG. | `public/videos/hackathon-cph-teaser.{webm,mp4}`, `public/images/hackathon-cph-poster.jpg` → `projects.ts` → `eeg-hackathon-cph.teaser` |
| Original film | **The 2-minute video** itself. You host it, unlisted on YouTube. | `eeg-hackathon-cph.youtubeUrl` (the link label is "Watch the 2-minute film") |
| LinkedIn post | URL, optional | `eeg-hackathon-cph.linkedinUrl` |
| Documentary still | Bogdan building or presenting at the hackathon, 4:5 portrait | `public/images/moments/bogdan-hackathon.webp` → `moments.hackathon.media` (shown on the room's side wall) |

### 2. HABS Player (chapter "Build once. Run many experiments.")

| What | Spec | Goes to |
|---|---|---|
| UI or workflow teaser | 16:9 screen recording, **5–12 s**, cropped to the product UI (no OS chrome), or one clean screenshot. It plays on the big screen itself, replacing the procedural grid. | `public/videos/habs-player-teaser.*` → `projects.ts` → `habs-player.teaser` |
| LinkedIn deep dive | URL | `habs-player.linkedinUrl` |
| Clearance | Public-safe review of the name and description (`publicSafe: 'review'`) | — |

### 3. Skydive with a headband (Field tests)

| What | Spec | Goes to |
|---|---|---|
| Cinematic teaser | Portrait 4:5, a **5–10 s** clip (or a strong photo). The headband or app should be visible in freefall. | `public/videos/field-skydive.*` or `public/images/field/skydive.webp` → `fieldTests` → `skydive.teaser` |
| Original footage | Kept by you, for the LinkedIn post | — |
| LinkedIn post | URL | `skydive.linkedinUrl` |
| Caption | One line: what was tested | `skydive.caption` |

### 4. Moto EEG — Paris (Field tests)

| What | Spec | Goes to |
|---|---|---|
| Photo or clip | Landscape 3:2, photo or **5–10 s** clip, with the EEG headset visible on the rider | `public/images/field/moto-paris.webp` → `fieldTests` → `moto-paris.teaser` |
| LinkedIn post | URL | `moto-paris.linkedinUrl` |

### 5. TemmaCare / MedTech (chapter "Remote care")

| What | Spec | Goes to |
|---|---|---|
| Device photos | The diagnostic peripherals: ECG, ultrasound probe, spirometer, dermatoscope. 1:1 or 4:5, plain background | `public/images/medtech/*` (one can replace the "Remote doctor" plane) |
| UI screenshot | Doctor's view during a remote examination, 16:10, **public material only** | `projects.ts` → `temmacare.teaser` (shown as the remote-doctor screen) |

### 6. Research / programmable matter (chapter "Before products…")

| What | Spec | Goes to |
|---|---|---|
| Photos or video | Real modules, simulation recordings (VisibleSim), lab shots. 16:9, 5–15 s | `public/videos/research-*.mp4`. The scene is procedural today; ask to add a plane |
| Links | Publication, presentation, or other repositories if public. Boosted-MRTP code and the simulation video are already linked. | `experience.ts` → `research.externalUrl` (or `codeUrl` / `youtubeUrl`) |

### 7. Bogdan: documentary photos

Evidence of real work, not portraits. Each one should be 4:5 or 3:2, 1600–2000 px, WebP or AVIF.

- **With hardware / at the bench.** One exists: `public/images/profile/bogdan-bench.webp`, used in the Field scene and the Index. A newer one would be welcome.
- **At the Microsoft Hackathon** → `moments.hackathon` (placeholder in the room today).
- **With a headband** → `moments.headband` (slot ready, not placed in the film yet).
- **In a lab or workshop.**
- **During a field test** (skydive, moto).

### Also open

- **HABS systems teaser** (`habs-systems.teaser`): several devices in use, 16:9. Needs public-safe clearance.
- **Social / OG image:** `public/og-image.jpg` is a frame of the opening. Re-render it after any copy change to the intro.

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
