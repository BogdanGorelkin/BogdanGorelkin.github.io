import { gsap } from '../lib/gsap'
import { sampleKeyframes } from '../lib/spline'
import type { V3 } from '../scenes/world'
import { STORY_END } from './chapters'
import { SHOTS } from './shots'

/**
 * Everything the 3D layer reads, as plain numbers. The director timeline
 * below writes it; scenes only read. `presence` values (0–1) gate visibility
 * and opacity of each environment — 0 means "don't draw at all".
 */
export const stage = {
  /** storyTime as rendered this frame (snapped to key shots under reduced motion). */
  time: 0,
  /**
   * Seconds for ambient animation (waveforms, sweeps, packets, LEDs); frozen
   * under reduced motion. One monotonic signal clock for the whole film — never
   * R3F's clock, which `setFrameloop` resets to 0 — and never scroll progress:
   * scroll only morphs layout and opacity, so no animation restarts at a chapter.
   */
  clock: 0,
  /** 0 → 1 timed intro on first load (not scroll-driven). */
  intro: 0,
  fogNear: 4,
  /** Tight at first, so the opening reads as a flat trace with no visible depth. */
  fogFar: 26,
  /** Overall level of the room's practical light and LEDs. */
  roomLight: 0,
  /** Flash of every LED as the camera breaks through the screen. */
  ledBurst: 0,
  /** Brain-signal amplitude on the intro spine. */
  signalAmp: 1,
  /** 0 = lively EEG, 1 = calm, nearly flat line (the closing bookend). */
  calm: 0,
  /** 0 = the screen shows live channels, 1 = a grid of experiments (HABS Player). */
  playerGrid: 0,
  /** 0 → 1: the experiment grid resolves into one product frame (the Player media slot). */
  playerFocus: 0,
  /** 0 → 1: on the rewind, today's whole journey collapses into one career station. */
  collapse: 0,
  /** 0 → 1: the pattern motifs connect (human ↔ hardware ↔ software). */
  patternLinks: 0,
  /** 0 → 1: the three motifs converge into one point, which becomes the closing line. */
  converge: 0,
  /** 0 → 1: programmable-matter modules reconfigure from one shape to another. */
  morph: 0,
  presence: {
    signal: 1,
    neural: 0,
    annotations: 0,
    // Not `data`: that's a reserved GSAP vars key and would silently never tween.
    system: 0,
    screen: 0,
    /** HABS Player chapter (only drives the optional real teaser over the screen). */
    player: 0,
    room: 0,
    field: 0,
    /** Field media enters only after the statement clears — no text over the footage. */
    paris: 0,
    /** The skydive emerges as the camera leaves Paris, not before. */
    skydive: 0,
    career: 0,
    medtech: 0,
    medtechLabels: 0,
    research: 0,
    pattern: 0,
    next: 0,
  },
}

export type PresenceKey = keyof typeof stage.presence

const signalEpoch = performance.now()
/** Seconds since the page loaded: the continuous signal time behind `stage.clock`. */
export const signalTime = () => (performance.now() - signalEpoch) / 1000

/**
 * The film, as one paused GSAP timeline whose time axis *is* storyTime.
 * It's never played — the render loop seeks it with the scroll-driven clock.
 */
export function buildDirector(): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'sine.inOut' } })
  const p = stage.presence

  // Fade a presence in and/or out. Times are storyTime.
  const show = (key: PresenceKey, from: number, to: number, value = 1) =>
    tl.to(p, { [key]: value, duration: to - from }, from)

  // Fog is the main depth/lighting instrument: tight in rooms, vast on the career line.
  tl.to(stage, { fogFar: 85, duration: 0.5 }, 0.3)
    .to(stage, { fogFar: 70, duration: 0.3 }, 2.0)
    .to(stage, { fogNear: 2, fogFar: 52, duration: 0.2 }, 4.3)
    .to(stage, { fogNear: 4, fogFar: 95, duration: 0.3 }, 5.0)
    // Field: the space opens up as the camera rises from the street toward the skydive.
    .to(stage, { fogFar: 150, duration: 0.2 }, 5.64)
    .to(stage, { fogNear: 180, fogFar: 1300, duration: 0.16, ease: 'power2.in' }, 6.06)
    .to(stage, { fogNear: 6, fogFar: 46, duration: 0.3 }, 9.95)

  tl.to(stage, { signalAmp: 1.35, duration: 0.4 }, 1.2)
    // HABS Player: the same screen becomes a grid of experiments, then back to live channels.
    // The live channels reorganise into the grid while the camera settles — one motion, not a cut.
    .to(stage, { playerGrid: 1, duration: 0.28, ease: 'power1.inOut' }, 3.04)
    .to(stage, { playerFocus: 1, duration: 0.2 }, 3.38)
    .to(stage, { playerGrid: 0, playerFocus: 0, duration: 0.2 }, 3.86)
    .to(stage, { roomLight: 1, duration: 0.25, ease: 'flow' }, 4.42)
    .to(stage, { ledBurst: 1, duration: 0.04, ease: 'power2.out' }, 4.38)
    .to(stage, { ledBurst: 0, duration: 0.22, ease: 'power1.in' }, 4.42)
    .to(stage, { roomLight: 0, duration: 0.3 }, 5.35)
    .to(stage, { collapse: 1, duration: 0.2, ease: 'power2.inOut' }, 6.06)
    .to(stage, { morph: 1, duration: 0.5 }, 8.2)
    .to(stage, { patternLinks: 1, duration: 0.2 }, 9.3)
    .to(stage, { converge: 1, duration: 0.24, ease: 'power2.in' }, 9.56)
    .to(stage, { calm: 1, duration: 0.35 }, 9.95)

  // Today (HABS → hackathon → field): environments fade in ahead of the camera, out behind it.
  // The thread has led us to the person; it gives way before the type settles.
  show('signal', 1.44, 1.6, 0)
  show('neural', 0.75, 1.0)
  show('annotations', 1.42, 1.58)
  show('annotations', 1.84, 1.95, 0)
  show('system', 1.85, 2.1)
  show('neural', 2.3, 2.5, 0)
  show('screen', 2.55, 2.85)
  // The streams have delivered into the screen; they clear before the real Player UI appears.
  show('system', 3.2, 3.4, 0)
  show('player', 3.44, 3.58)
  show('player', 3.84, 3.94, 0)
  // The screen dissolves as the lens reaches it — we pass *through* software.
  show('screen', 4.3, 4.42, 0)
  show('room', 4.3, 4.45)
  show('system', 4.36, 4.5, 0)
  show('field', 4.9, 5.12)
  show('paris', 5.4, 5.5)
  show('paris', 5.64, 5.72, 0)
  show('skydive', 5.64, 5.76)
  show('skydive', 6.02, 6.1, 0)
  show('room', 5.4, 5.6, 0)

  // Rewind: pulled back, today's journey stays lit as one station among others.
  for (const key of ['signal', 'neural', 'system', 'screen', 'room', 'field'] as const) {
    show(key, 6.06, 6.2, key === 'field' ? 0.55 : 0.45)
    show(key, 9.95, 10.1, 0)
  }
  // The other stations emerge only once the journey has collapsed into its node.
  show('career', 6.16, 6.3)
  show('medtech', 6.22, 6.36)
  show('research', 6.22, 6.36)
  show('next', 6.24, 6.36)
  show('medtechLabels', 7.2, 7.35)
  show('medtechLabels', 7.85, 7.95, 0)
  show('pattern', 9.0, 9.18)
  show('pattern', 9.88, 9.98, 0)
  show('medtech', 9.95, 10.1, 0)
  show('research', 9.95, 10.1, 0)
  show('career', 9.95, 10.2, 0)

  tl.set({}, {}, STORY_END)
  // Render once end-to-end so every tween records its start values in order;
  // afterwards the timeline can be seeked anywhere, in either direction.
  tl.progress(1).progress(0)
  return tl
}

// ── Camera ────────────────────────────────────────────────────────────────

type Track = { times: number[]; pos: V3[]; look: V3[]; fov: number[]; eases: ((u: number) => number)[] }

function buildTrack(mobile: boolean): Track {
  let fov = 35
  const track: Track = { times: [], pos: [], look: [], fov: [], eases: [] }
  for (const shot of SHOTS) {
    const o = mobile ? shot.mobile : undefined
    fov = o?.fov ?? shot.fov ?? fov
    track.times.push(shot.t)
    track.pos.push(o?.pos ?? shot.pos)
    track.look.push(o?.look ?? shot.look)
    track.fov.push(fov)
    track.eases.push(gsap.parseEase(shot.ease ?? 'none'))
  }
  return track
}

const tracks = { desktop: buildTrack(false), mobile: buildTrack(true) }

export type CameraSample = { pos: V3; look: V3; fov: number }

export function sampleCamera(time: number, mobile: boolean, out: CameraSample): CameraSample {
  const track = mobile ? tracks.mobile : tracks.desktop
  const easeAt = (i: number) => track.eases[i]!
  sampleKeyframes(track.times, track.pos, time, easeAt, out.pos)
  sampleKeyframes(track.times, track.look, time, easeAt, out.look)

  const { times, fov } = track
  let i = 0
  while (i < times.length - 2 && time >= times[i + 1]!) i++
  const u = easeAt(i)(Math.min(1, Math.max(0, (time - times[i]!) / (times[i + 1]! - times[i]!))))
  out.fov = fov[i]! + (fov[i + 1]! - fov[i]!) * u
  return out
}
