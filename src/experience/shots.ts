import { CAREER, HEAD, NEXT_LINE, PATTERN, SCREEN, type V3 } from '../scenes/world'

/**
 * The shot list. `t` is storyTime (chapter index + local progress).
 * Consecutive identical shots form a hold. `ease` shapes the segment that
 * *leaves* this shot (GSAP ease name; default glides through).
 * `mobile` overrides compensate for portrait framing.
 */
export type Shot = {
  t: number
  pos: V3
  look: V3
  fov?: number
  ease?: string
  mobile?: { pos?: V3; look?: V3; fov?: number }
}

const H = HEAD.center
const cx = CAREER.x
const cz = CAREER.z

export const SHOTS: Shot[] = [
  // ── 0 SIGNAL — a flat trace on a dark screen… then it turns out to have depth.
  { t: 0.0, pos: [-3, 0.15, 10], look: [-3, 0, 0], fov: 30, mobile: { pos: [-1, 0.15, 13] } },
  { t: 0.3, pos: [-1.5, 0.25, 8.6], look: [-1.5, 0, 0], fov: 30, ease: 'silk', mobile: { pos: [0, 0.2, 11] } },
  { t: 0.72, pos: [12, 1.4, 5], look: [3, 0, -18], fov: 38 },
  { t: 1.0, pos: [8.5, 1.2, -9], look: [2, 0.4, -34], fov: 36 },

  // ── 1 HUMAN — follow the signal to its source; push in for the annotations.
  { t: 1.3, pos: [13, 3.2, -24], look: [H[0], H[1] + 0.6, H[2]], fov: 34, ease: 'silk', mobile: { pos: [16, 3.6, -20] } },
  // Frame the chain: head + headband, the wireless link, the phone.
  { t: 1.6, pos: [12.5, 3, -26], look: [1.6, 0.2, -42], fov: 34, mobile: { pos: [14, 7, -12], look: [2.4, -6, -42] } },
  { t: 1.72, pos: [12.2, 3, -26.4], look: [1.6, 0.2, -42], fov: 34, mobile: { pos: [13.8, 7, -12.4], look: [2.4, -6, -42] } },
  // Swing behind the phone and look down the stream it sends.
  { t: 2.0, pos: [8.5, 2.6, -36.5], look: [4, 0.2, -52], fov: 40 },

  // ── 2 SYSTEM — ride the signal: phone (edge) → one gate (the system) → screen (experience).
  { t: 2.18, pos: [6, 1.5, -47], look: [2, 0, -72], fov: 44 },
  { t: 2.42, pos: [3, 0.9, -63], look: [0.5, 0, -96], fov: 46 },
  { t: 2.64, pos: [0.9, 0.5, -86], look: [0, 0, -104], fov: 46 },
  { t: 2.84, pos: [0, 0.2, -104], look: [0, 0, -130], fov: 50 },
  { t: 3.0, pos: [0, 0.2, -120], look: [0, 0, SCREEN.z], fov: 42, mobile: { pos: [0, 0.2, -114] } },

  // ── 3 SCALE (HABS Player) — hold on the screen while it becomes a grid of experiments.
  // Frame the product slot (right half of the screen) with room for the copy on the left.
  { t: 3.25, pos: [-3.4, 0.4, -122], look: [-0.6, 0, SCREEN.z], fov: 42, ease: 'silk', mobile: { pos: [3.2, 0.3, -122], look: [3.2, -2.2, SCREEN.z] } },
  { t: 3.75, pos: [-2.8, 0.35, -123.5], look: [-0.6, 0, SCREEN.z], fov: 42, mobile: { pos: [3.2, 0.3, -123], look: [3.2, -2.2, SCREEN.z] } },
  { t: 4.0, pos: [0, 0.1, -127], look: [0, 0, SCREEN.z], fov: 42, mobile: { pos: [0, 0.1, -122] } },

  // ── 4 SOFTWARE LEAVES THE SCREEN — push straight through the screen into a room.
  { t: 4.2, pos: [0, 0.1, -129], look: [0, 0, SCREEN.z], fov: 42, ease: 'silk', mobile: { pos: [0, 0.1, -124] } },
  { t: 4.46, pos: [0, 0.3, -144], look: [0, 0.4, -172], fov: 54 },
  { t: 4.7, pos: [-5.2, 2.0, -150], look: [0, 0.6, -180], fov: 46 },
  // Square on the footage wall, which sits high in frame: media first, text below.
  { t: 4.86, pos: [0.6, 0.9, -164.2], look: [0.6, 0.8, -182.5], fov: 42, ease: 'silk', mobile: { pos: [0, 0.8, -158], look: [0, 3.4, -182.5] } },
  { t: 4.96, pos: [0.6, 0.9, -164.7], look: [0.6, 0.8, -182.5], fov: 42, mobile: { pos: [0, 0.8, -158.5], look: [0, 3.4, -182.5] } },

  // ── 5 FIELD — a lateral dolly across layered media for real parallax.
  { t: 5.18, pos: [-4, 1.4, -186], look: [0, 1, -214], fov: 42 },
  // Settle on the Paris ride (FieldScene slot 2)…
  { t: 5.48, pos: [-1.5, 2.1, -206], look: [-2.5, 1.9, -222], fov: 40, ease: 'silk', mobile: { pos: [0, 2.2, -208], look: [0, 1.6, -222] } },
  { t: 5.62, pos: [-1.1, 2.1, -206.5], look: [-2.2, 1.9, -222], fov: 40, mobile: { pos: [0.3, 2.2, -208.5], look: [0.3, 1.6, -222] } },
  // …then on to the skydive (slot 0).
  // Come to rest on the hero plane (FieldScene slot 0), framed right of the notes.
  { t: 5.86, pos: [10.5, 1.4, -198], look: [10.5, 1.3, -213], fov: 40, ease: 'silk', mobile: { pos: [14.5, 1.3, -200], look: [14.5, 1.1, -213] } },
  { t: 5.96, pos: [10.5, 1.4, -198], look: [10.5, 1.3, -213], fov: 40, mobile: { pos: [14.5, 1.3, -200], look: [14.5, 1.1, -213] } },

  // ── 6 REWIND — rise above today's world while it collapses into one node…
  { t: 6.04, pos: [30, 14, -170], look: [8, 0, -215], fov: 44 },
  { t: 6.16, pos: [46, 70, -40], look: [0, -8, -120], fov: 44 },
  // …then pull back until the node is one station among others on a longer line.
  // Portrait: look steeply down the line instead, so the stations stack vertically.
  { t: 6.32, pos: [-65, 150, 260], look: [-65, -12, cz], fov: 38, ease: 'silk', mobile: { pos: [170, 200, cz + 10], look: [-90, -22, cz], fov: 46 } },
  { t: 6.46, pos: [-65, 146, 250], look: [-65, -12, cz], fov: 38, mobile: { pos: [166, 196, cz + 8], look: [-90, -22, cz], fov: 46 } },
  { t: 6.74, pos: [cx.medtech + 50, 36, cz + 90], look: [cx.medtech, -4, cz], fov: 40 },

  // ── 7 MEDTECH — patient, devices, a remote doctor: human + hardware + software.
  // Patient + devices + the remote doctor's screen, kept clear of the text column.
  { t: 7.1, pos: [cx.medtech + 20, 1, cz + 46], look: [cx.medtech - 3, -4.5, cz - 8], fov: 40, ease: 'silk', mobile: { pos: [cx.medtech + 16, 4, cz + 52], look: [cx.medtech + 6, -2, cz - 6] } },
  { t: 7.55, pos: [cx.medtech + 18, 1, cz + 43], look: [cx.medtech - 3, -4.5, cz - 8], fov: 40, mobile: { pos: [cx.medtech + 14, 4, cz + 49], look: [cx.medtech + 6, -2, cz - 6] } },
  { t: 7.82, pos: [cx.medtech + 8, 8, cz + 34], look: [cx.medtech - 12, 0, cz - 6], fov: 42, ease: 'silk' },
  { t: 8.0, pos: [cx.medtech - 50, 24, cz + 60], look: [cx.research, -4, cz], fov: 40 },

  // ── 8 RESEARCH — programmable matter, from a calmer distance: an origin, not a climax.
  { t: 8.15, pos: [cx.research + 26, 6, cz + 38], look: [cx.research - 7, -2, cz], fov: 40, ease: 'silk', mobile: { pos: [cx.research + 14, 4, cz + 44], look: [cx.research, -18, cz] } },
  { t: 8.6, pos: [cx.research + 24, 5.5, cz + 36], look: [cx.research - 7, -2, cz], fov: 40, mobile: { pos: [cx.research + 13, 4, cz + 42], look: [cx.research, -18, cz] } },
  { t: 8.86, pos: [cx.research + 50, 30, cz + 60], look: [PATTERN.center[0], PATTERN.center[1], cz], fov: 42 },

  // ── 9 THE PATTERN — human, hardware and software, recalled from earlier chapters, then converging.
  { t: 9.12, pos: [PATTERN.center[0], PATTERN.center[1] + 4, cz + 80], look: [PATTERN.center[0], PATTERN.center[1] + 2, cz], fov: 38, ease: 'silk', mobile: { pos: [PATTERN.center[0], PATTERN.center[1] - 2, cz + 82], look: [PATTERN.center[0], PATTERN.center[1] - 7, cz], fov: 44 } },
  // Hold while the motifs connect and converge, then leave for the closing line.
  { t: 9.84, pos: [PATTERN.center[0], PATTERN.center[1] + 3, cz + 72], look: [PATTERN.center[0], PATTERN.center[1] + 2, cz], fov: 38, mobile: { pos: [PATTERN.center[0], PATTERN.center[1] - 2, cz + 76], look: [PATTERN.center[0], PATTERN.center[1] - 7, cz], fov: 44 } },
  { t: 9.95, pos: [cx.next + 70, 30, cz + 110], look: [cx.next, 4, cz], fov: 40 },

  // ── 10 CONTACT — align square to the line again: the opening shot, bookended.
  { t: 10.3, pos: [NEXT_LINE.from + 120, 0.3, NEXT_LINE.z + 12], look: [NEXT_LINE.from + 120, 0, NEXT_LINE.z], fov: 32, ease: 'silk', mobile: { pos: [NEXT_LINE.from + 120, 0.3, NEXT_LINE.z + 15] } },
  { t: 11.0, pos: [NEXT_LINE.from + 124, 0.3, NEXT_LINE.z + 10.5], look: [NEXT_LINE.from + 124, 0, NEXT_LINE.z], fov: 30, mobile: { pos: [NEXT_LINE.from + 124, 0.3, NEXT_LINE.z + 13] } },
]
