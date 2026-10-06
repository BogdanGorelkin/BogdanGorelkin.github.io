import { CAREER, HEAD, NEXT_LINE, SCREEN, type V3 } from '../scenes/world'

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
  { t: 1.6, pos: [9.4, 2.6, -29.5], look: [-0.6, 1.4, -41], fov: 34, mobile: { pos: [12.5, 3.2, -26] } },
  { t: 1.72, pos: [9.4, 2.6, -29.5], look: [-0.6, 1.4, -41], fov: 34, mobile: { pos: [12.5, 3.2, -26] } },
  { t: 2.0, pos: [3.5, 4.4, -35], look: [0, 0.4, -52], fov: 40 },

  // ── 2 SYSTEM — fly through the layers: headbands → edge → backend → screen.
  { t: 2.18, pos: [0, 2.6, -47], look: [0, 0, -60], fov: 44 },
  { t: 2.4, pos: [-1.6, 1.1, -55], look: [0, 0, -76], fov: 46 },
  { t: 2.62, pos: [3.4, 2.8, -79], look: [0, 0, -100], fov: 44 },
  { t: 2.84, pos: [0.6, 0.6, -97], look: [0, 0, -124], fov: 48 },
  { t: 3.0, pos: [0, 0.2, -120], look: [0, 0, SCREEN.z], fov: 42, mobile: { pos: [0, 0.2, -114] } },

  // ── 3 SCALE (HABS Player) — hold on the screen while it becomes a grid of experiments.
  { t: 3.25, pos: [-3.4, 0.4, -122], look: [3.2, 0, SCREEN.z], fov: 42, ease: 'silk', mobile: { pos: [0, 0.3, -115], look: [0, -1.2, SCREEN.z] } },
  { t: 3.75, pos: [-2.8, 0.35, -123.5], look: [3.2, 0, SCREEN.z], fov: 42, mobile: { pos: [0, 0.3, -116.5], look: [0, -1.2, SCREEN.z] } },
  { t: 4.0, pos: [0, 0.1, -127], look: [0, 0, SCREEN.z], fov: 42, mobile: { pos: [0, 0.1, -122] } },

  // ── 4 SOFTWARE LEAVES THE SCREEN — push straight through the screen into a room.
  { t: 4.2, pos: [0, 0.1, -129], look: [0, 0, SCREEN.z], fov: 42, ease: 'silk', mobile: { pos: [0, 0.1, -124] } },
  { t: 4.46, pos: [0, 0.3, -144], look: [0, 0.4, -172], fov: 54 },
  { t: 4.7, pos: [-5.2, 2.0, -150], look: [0, 0.6, -180], fov: 46 },
  { t: 4.86, pos: [2.6, 1.0, -160], look: [0, 1.0, -182], fov: 42, ease: 'silk', mobile: { pos: [1.2, 1.0, -156] } },
  { t: 4.96, pos: [2.6, 1.0, -160], look: [0, 1.0, -182], fov: 42, mobile: { pos: [1.2, 1.0, -156] } },

  // ── 5 FIELD — a lateral dolly across layered media for real parallax.
  { t: 5.18, pos: [-4, 1.4, -186], look: [0, 1, -214], fov: 42 },
  { t: 5.55, pos: [5, 1.2, -191], look: [7, 1, -220], fov: 40 },
  // Come to rest on the hero plane (FieldScene slot 0), framed right of the notes.
  { t: 5.86, pos: [10.5, 1.4, -198], look: [10.5, 1.3, -213], fov: 40, ease: 'silk', mobile: { pos: [14.5, 1.3, -200], look: [14.5, 1.1, -213] } },
  { t: 5.96, pos: [10.5, 1.4, -198], look: [10.5, 1.3, -213], fov: 40, mobile: { pos: [14.5, 1.3, -200], look: [14.5, 1.1, -213] } },

  // ── 6 REWIND — pull back: today's whole journey is one station on a longer line…
  { t: 6.04, pos: [30, 14, -170], look: [8, 0, -215], fov: 44 },
  { t: 6.2, pos: [-150, 470, 880], look: [-150, -10, cz], fov: 38, ease: 'silk', mobile: { pos: [-150, 820, 1600], fov: 42 } },
  { t: 6.44, pos: [-150, 470, 880], look: [-150, -10, cz], fov: 38, mobile: { pos: [-150, 820, 1600], fov: 42 } },
  // …then travel backwards along it.
  { t: 6.72, pos: [-120, 70, 80], look: [cx.medtech, -4, cz], fov: 40 },

  // ── 7 MEDTECH — patient, devices, a remote doctor: human + hardware + software.
  { t: 7.1, pos: [cx.medtech + 24, 4, cz + 26], look: [cx.medtech - 6, -3, cz - 2], fov: 40, ease: 'silk', mobile: { pos: [cx.medtech + 14, 6, cz + 40], look: [cx.medtech - 6, -2, cz - 2] } },
  { t: 7.55, pos: [cx.medtech + 19, 2.5, cz + 23], look: [cx.medtech - 7, -3.5, cz - 2], fov: 40, mobile: { pos: [cx.medtech + 11, 5, cz + 37], look: [cx.medtech - 7, -2.5, cz - 2] } },
  { t: 7.82, pos: [cx.medtech + 6, 6, cz + 30], look: [cx.medtech - 20, -3, cz - 6], fov: 42, ease: 'silk' },
  { t: 8.0, pos: [cx.medtech - 110, 40, cz + 70], look: [cx.research, -4, cz], fov: 40 },

  // ── 8 RESEARCH — programmable matter: modules reconfigure, a sync pulse spreads.
  { t: 8.15, pos: [cx.research + 22, 6, cz + 26], look: [cx.research, -3, cz], fov: 40, ease: 'silk', mobile: { pos: [cx.research + 14, 8, cz + 40], look: [cx.research, -3, cz] } },
  { t: 8.6, pos: [cx.research + 15, 2.5, cz + 22], look: [cx.research - 3, -3, cz], fov: 40, mobile: { pos: [cx.research + 10, 5, cz + 36], look: [cx.research - 1, -3, cz] } },
  { t: 8.85, pos: [cx.research + 12, 14, cz + 30], look: [cx.research - 2, -2, cz], fov: 42 },

  // ── 9 THE PATTERN — side-on: three threads run through every station.
  { t: 9.2, pos: [-155, 84, cz + 1150], look: [-155, 70, cz], fov: 38, ease: 'silk', mobile: { pos: [-60, 84, cz + 1500], look: [-60, 70, cz], fov: 44 } },
  { t: 9.75, pos: [-155, 82, cz + 1080], look: [-155, 70, cz], fov: 38, mobile: { pos: [-60, 82, cz + 1420], look: [-60, 70, cz], fov: 44 } },
  { t: 9.95, pos: [cx.next + 70, 30, cz + 110], look: [cx.next, 4, cz], fov: 40 },

  // ── 10 CONTACT — align square to the line again: the opening shot, bookended.
  { t: 10.3, pos: [NEXT_LINE.from + 120, 0.3, NEXT_LINE.z + 12], look: [NEXT_LINE.from + 120, 0, NEXT_LINE.z], fov: 32, ease: 'silk', mobile: { pos: [NEXT_LINE.from + 120, 0.3, NEXT_LINE.z + 15] } },
  { t: 11.0, pos: [NEXT_LINE.from + 124, 0.3, NEXT_LINE.z + 10.5], look: [NEXT_LINE.from + 124, 0, NEXT_LINE.z], fov: 30, mobile: { pos: [NEXT_LINE.from + 124, 0.3, NEXT_LINE.z + 13] } },
]
