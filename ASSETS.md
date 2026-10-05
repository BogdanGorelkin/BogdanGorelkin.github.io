# Assets

Every media slot is driven by data in `src/data/`, so the scene code never changes. Drop the file into `public/`, then point the matching entry at it. Paths are served from the site root, so `public/videos/a.mp4` is written as `/videos/a.mp4`.

Until real media exists, each slot renders a procedural placeholder, generated at runtime with no files and no network.

## Media entry format

```ts
// src/data/types.ts → MediaAsset
{ kind: 'video', sources: { webm: '/videos/x.webm', mp4: '/videos/x.mp4' }, poster: '/images/x-poster.jpg', alt: '…', aspect: 16 / 9 }
{ kind: 'image', src: '/images/x.avif', alt: '…', aspect: 3 / 2 }
{ kind: 'placeholder', label: 'SHOWN ON THE PLACEHOLDER', alt: '…', aspect: 4 / 5 }
```

`aspect` is width ÷ height. Each plane is sized from it, so give the true aspect ratio of the file.

## Slots

| Where in the film | Data entry | Suggested files | Aspect | Notes |
|---|---|---|---|---|
| Scene 3: the room's back wall (Microsoft Hackathon, Copenhagen 2026) | `projects.ts` → `eeg-hackathon-cph` → `media[0]` | `public/videos/hackathon-cph.webm`, `hackathon-cph.mp4`, `public/images/hackathon-cph-poster.jpg` | 16:9 | Muted loop of 8–20 s. Plays only while the room is on screen. |
| Scene 2: multi-device system (case 01) | `projects.ts` → `multi-device-eeg` → `media[0]` | `public/videos/multi-device.*` or `public/images/multi-device.avif` | 16:9 | Reserved: not rendered in V1 (the system scene is procedural). Ready for a future case view. |
| Scene 4: field tests (parallax planes) | `projects.ts` → `fieldTests[n].media` | `public/images/field-skydiving.avif`, `field-motorcycle.avif`, `field-prototypes.avif`, `field-hackathons.avif`, `field-demos.avif` (or short videos) | 4:5, 3:2 or 1:1 | Mixing portrait and landscape makes the parallax read better. |
| CV download | `profile.ts` → `links.cv` | `public/cv/bogdan-gorelkin-cv.pdf` | — | Until it's set, "CV" shows as disabled text in the nav, the contact chapter and the Index. |
| Contact links | `profile.ts` → `links.email / linkedin / github` | — | — | An empty link shows "to be added", never a dead link. |
| Future 3D models | (new scene code) | `public/models/*.glb` | — | Use compressed glTF (see below). |
| Future textures | (new scene code) | `public/textures/*.ktx2` / `.webp` | — | Power-of-two sizes where possible. |

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

### 3D models (when added)

- glTF binary (`.glb`), compressed with Draco or Meshopt, for example: `npx gltf-transform optimize in.glb out.glb --compress meshopt`.
- Self-host the decoders under `public/draco/` (or use Meshopt, which needs no extra files) so nothing depends on a CDN.
- Keep each model under ~2 MB, and lazy-load it the first time its scene's `presence` becomes non-zero, the same way `MediaPlane` does.
