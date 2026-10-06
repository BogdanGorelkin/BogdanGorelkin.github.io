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
  // Slightly above eye level, so the headband reads as a ring around the head.
  { t: 1.6, pos: [12.5, 7.2, -25], look: [-0.6, 0.4, -41.0], fov: 34, mobile: { pos: [14, 7, -12], look: [2.4, -6, -42] } },
  { t: 1.72, pos: [12.2, 7.2, -25.4], look: [-0.6, 0.4, -41.0], fov: 34, mobile: { pos: [13.8, 7, -12.4], look: [2.4, -6, -42] } },
  // Swing behind the phone and look down the stream it sends.
  { t: 2.0, pos: [8.5, 2.6, -36.5], look: [4, 0.2, -52], fov: 40 },

  // ── 2 SYSTEM — ride the signal: phone (edge) → one gate (the system) → screen (experience).
  { t: 2.18, pos: [6, 1.5, -47], look: [2, 0, -72], fov: 44 },
  { t: 2.42, pos: [3, 0.9, -63], look: [0.5, 0, -96], fov: 46 },
  { t: 2.64, pos: [0.9, 0.5, -86], look: [0, 0, -104], fov: 46 },
  // Out of the gate, the camera eases off over half a chapter rather than braking at the
  // boundary: speed, FOV and the drift toward the product slot all resolve across 2.84 → 3.32.
  { t: 2.84, pos: [0, 0.2, -102], look: [0, 0, -130], fov: 50 },
  { t: 2.98, pos: [-0.5, 0.25, -112.5], look: [-0.2, 0, SCREEN.z], fov: 46, mobile: { pos: [0.4, 0.2, -108], look: [0.8, -0.6, SCREEN.z] } },
  { t: 3.12, pos: [-2.1, 0.33, -119], look: [-0.45, 0, SCREEN.z], fov: 43, mobile: { pos: [2, 0.25, -116.5], look: [2.4, -1.6, SCREEN.z] } },

  // ── 3 SCALE (HABS Player) — hold on the screen while it becomes a grid of experiments.
  // Frame the product slot (right half of the screen) with room for the copy on the left.
  { t: 3.32, pos: [-3.4, 0.4, -122], look: [-0.6, 0, SCREEN.z], fov: 42, ease: 'silk', mobile: { pos: [3.2, 0.3, -122], look: [3.2, -3.1, SCREEN.z] } },
  { t: 3.75, pos: [-2.8, 0.35, -123.5], look: [-0.6, 0, SCREEN.z], fov: 42, mobile: { pos: [3.2, 0.3, -123], look: [3.2, -3.1, SCREEN.z] } },
  { t: 4.0, pos: [0, 0.1, -127], look: [0, 0, SCREEN.z], fov: 42, mobile: { pos: [0, 0.1, -122] } },

  // ── 4 FROM SIGNAL TO ENVIRONMENT — push straight through the screen into a room.
  { t: 4.2, pos: [0, 0.1, -129], look: [0, 0, SCREEN.z], fov: 42, ease: 'silk', mobile: { pos: [0, 0.1, -124] } },
  { t: 4.46, pos: [0, 0.3, -144], look: [0, 0.4, -172], fov: 54 },
  { t: 4.7, pos: [-5.2, 2.0, -150], look: [0, 0.6, -180], fov: 46 },
  // Square on the footage wall, which sits high in frame: media first, text below.
  { t: 4.86, pos: [0.6, 0.9, -164.2], look: [0.6, 0.8, -182.5], fov: 42, ease: 'silk', mobile: { pos: [0, 0.8, -158], look: [0, 3.4, -182.5] } },
  { t: 4.96, pos: [0.6, 0.9, -164.7], look: [0.6, 0.8, -182.5], fov: 42, mobile: { pos: [0, 0.8, -158.5], look: [0, 3.4, -182.5] } },

  // ── 5 FIELD — Paris at street level, then up and into the skydive.
  { t: 5.18, pos: [-4, 1.4, -186], look: [0, 1, -214], fov: 42 },
  // Settle on the Paris ride (street level, FieldScene FIELD_PLANES[0])…
  { t: 5.48, pos: [-1.6, 2.1, -206], look: [-3.3, 2.5, -222], fov: 40, ease: 'silk', mobile: { pos: [0, 2.2, -208], look: [0, 1.6, -222] } },
  { t: 5.62, pos: [-1.2, 2.1, -206.5], look: [-3, 2.5, -222], fov: 40, mobile: { pos: [0.3, 2.2, -208.5], look: [0.3, 1.6, -222] } },
  // …then slide past the Paris window (it leaves the frame on the left) and rise,
  // the ground line dropping away, into the open depth where the skydive waits.
  { t: 5.74, pos: [3.5, 4.2, -219], look: [10, 6.5, -240], fov: 42 },
  // Rest on the skydive: larger, frameless, right of the copy.
  { t: 5.86, pos: [9, 6.6, -228], look: [9.2, 6.6, -246], fov: 40, ease: 'silk', mobile: { pos: [12.5, 6.8, -233], look: [13, 5.4, -246] } },
  { t: 5.96, pos: [9.2, 6.6, -228.6], look: [9.2, 6.6, -246], fov: 40, mobile: { pos: [12.6, 6.8, -233.4], look: [13, 5.4, -246] } },

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
  { t: 7.1, pos: [cx.medtech + 20, 1, cz + 46], look: [cx.medtech - 3, -4.5, cz - 8], fov: 40, ease: 'silk', mobile: { pos: [cx.medtech + 21, 2, cz + 56], look: [cx.medtech + 13.6, -19, cz + 8] } },
  { t: 7.55, pos: [cx.medtech + 18, 1, cz + 43], look: [cx.medtech - 3, -4.5, cz - 8], fov: 40, mobile: { pos: [cx.medtech + 20.6, 2, cz + 55], look: [cx.medtech + 13.6, -19, cz + 8] } },
  { t: 7.82, pos: [cx.medtech + 8, 8, cz + 34], look: [cx.medtech - 12, 0, cz - 6], fov: 42, ease: 'silk' },
  { t: 8.0, pos: [cx.medtech - 50, 24, cz + 60], look: [cx.research, -4, cz], fov: 40 },

  // ── 8 RESEARCH — programmable matter, from a calmer distance: an origin, not a climax.
  { t: 8.15, pos: [cx.research + 26, 6, cz + 38], look: [cx.research - 7, -2, cz], fov: 40, ease: 'silk', mobile: { pos: [cx.research + 14, 4, cz + 44], look: [cx.research, -18, cz] } },
  { t: 8.6, pos: [cx.research + 24, 5.5, cz + 36], look: [cx.research - 7, -2, cz], fov: 40, mobile: { pos: [cx.research + 13, 4, cz + 42], look: [cx.research, -18, cz] } },
  { t: 8.86, pos: [cx.research + 50, 30, cz + 60], look: [PATTERN.center[0], PATTERN.center[1], cz], fov: 42 },

  // ── 9 THE PATTERN — human, hardware and software, recalled from earlier chapters, then converging.
  // Software is in the foreground (PatternScene): the camera sits close enough for it to loom.
  { t: 9.12, pos: [PATTERN.center[0], PATTERN.center[1] + 4, cz + 70], look: [PATTERN.center[0], PATTERN.center[1] + 1, cz], fov: 38, ease: 'silk', mobile: { pos: [PATTERN.center[0], PATTERN.center[1] + 1, cz + 60], look: [PATTERN.center[0], PATTERN.center[1] - 3, cz], fov: 44 } },
  // Hold while the software connects both worlds and the onward line is born, then follow it out.
  { t: 9.84, pos: [PATTERN.center[0] + 1.5, PATTERN.center[1] + 3, cz + 63], look: [PATTERN.center[0] + 1, PATTERN.center[1] + 1, cz], fov: 38, mobile: { pos: [PATTERN.center[0], PATTERN.center[1] + 1, cz + 55], look: [PATTERN.center[0], PATTERN.center[1] - 3, cz], fov: 44 } },
  { t: 9.95, pos: [cx.next + 70, 30, cz + 110], look: [cx.next, 4, cz], fov: 40 },

  // ── 10 CONTACT — align square to the line again: the opening shot, bookended.
  { t: 10.3, pos: [NEXT_LINE.from + 120, 0.3, NEXT_LINE.z + 12], look: [NEXT_LINE.from + 120, 0, NEXT_LINE.z], fov: 32, ease: 'silk', mobile: { pos: [NEXT_LINE.from + 120, 0.3, NEXT_LINE.z + 15] } },
  { t: 11.0, pos: [NEXT_LINE.from + 124, 0.3, NEXT_LINE.z + 10.5], look: [NEXT_LINE.from + 124, 0, NEXT_LINE.z], fov: 30, mobile: { pos: [NEXT_LINE.from + 124, 0.3, NEXT_LINE.z + 13] } },
]
