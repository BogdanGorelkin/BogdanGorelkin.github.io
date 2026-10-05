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

  // ── 3 SOFTWARE LEAVES THE SCREEN — push straight through the screen into a room.
  { t: 3.2, pos: [0, 0.1, -129], look: [0, 0, SCREEN.z], fov: 42, ease: 'silk', mobile: { pos: [0, 0.1, -124] } },
  { t: 3.46, pos: [0, 0.3, -144], look: [0, 0.4, -172], fov: 54 },
  { t: 3.7, pos: [-5.2, 2.0, -150], look: [0, 0.6, -180], fov: 46 },
  { t: 3.86, pos: [2.6, 1.0, -160], look: [0, 1.0, -182], fov: 42, ease: 'silk', mobile: { pos: [1.2, 1.0, -156] } },
  { t: 3.96, pos: [2.6, 1.0, -160], look: [0, 1.0, -182], fov: 42, mobile: { pos: [1.2, 1.0, -156] } },

  // ── 4 FIELD — a lateral dolly across layered media for real parallax.
  { t: 4.18, pos: [-4, 1.4, -186], look: [0, 1, -214], fov: 42 },
  { t: 4.55, pos: [5, 1.2, -191], look: [7, 1, -220], fov: 40 },
  // Come to rest on the hero plane (FieldScene slot 0), framed right of the notes.
  { t: 4.86, pos: [10.5, 1.4, -198], look: [10.5, 1.3, -213], fov: 40, ease: 'silk', mobile: { pos: [14.5, 1.3, -200], look: [14.5, 1.1, -213] } },
  { t: 4.96, pos: [10.5, 1.4, -198], look: [10.5, 1.3, -213], fov: 40, mobile: { pos: [14.5, 1.3, -200], look: [14.5, 1.1, -213] } },

  // ── 5 CAREER — pull back: the whole journey was one station. Then track the path.
  { t: 5.04, pos: [30, 14, -170], look: [8, 0, -215], fov: 44 },
  { t: 5.2, pos: [-290, 560, 880], look: [-290, -20, cz], fov: 38, ease: 'silk', mobile: { pos: [-290, 900, 1500], fov: 40 } },
  { t: 5.27, pos: [-290, 560, 880], look: [-290, -20, cz], fov: 38, mobile: { pos: [-290, 900, 1500], fov: 40 } },
  { t: 5.36, pos: [cx.research + 60, 46, cz + 150], look: [cx.research - 55, 14, cz], fov: 40, ease: 'silk', mobile: { pos: [cx.research + 40, 76, cz + 210], look: [cx.research, 28, cz] } },
  { t: 5.42, pos: [cx.research + 60, 46, cz + 150], look: [cx.research - 55, 14, cz], fov: 40, mobile: { pos: [cx.research + 40, 76, cz + 210], look: [cx.research, 28, cz] } },
  { t: 5.5, pos: [cx.robotics + 60, 46, cz + 150], look: [cx.robotics - 55, 22, cz], fov: 40, ease: 'silk', mobile: { pos: [cx.robotics + 40, 76, cz + 210], look: [cx.robotics, 36, cz] } },
  { t: 5.56, pos: [cx.robotics + 60, 46, cz + 150], look: [cx.robotics - 55, 22, cz], fov: 40, mobile: { pos: [cx.robotics + 40, 76, cz + 210], look: [cx.robotics, 36, cz] } },
  { t: 5.64, pos: [cx.medtech + 60, 40, cz + 150], look: [cx.medtech - 55, 14, cz], fov: 40, ease: 'silk', mobile: { pos: [cx.medtech + 40, 70, cz + 210], look: [cx.medtech, 28, cz] } },
  { t: 5.7, pos: [cx.medtech + 60, 40, cz + 150], look: [cx.medtech - 55, 14, cz], fov: 40, mobile: { pos: [cx.medtech + 40, 70, cz + 210], look: [cx.medtech, 28, cz] } },
  { t: 5.8, pos: [150, 120, 160], look: [0, -4, cz], fov: 42, ease: 'silk', mobile: { pos: [200, 200, 300] } },
  { t: 5.86, pos: [150, 120, 160], look: [0, -4, cz], fov: 42, mobile: { pos: [200, 200, 300] } },
  { t: 5.95, pos: [cx.next + 70, 30, cz + 110], look: [cx.next, 4, cz], fov: 40 },

  // ── 6 CONTACT — align square to the line again: the opening shot, bookended.
  { t: 6.3, pos: [NEXT_LINE.from + 120, 0.3, NEXT_LINE.z + 12], look: [NEXT_LINE.from + 120, 0, NEXT_LINE.z], fov: 32, ease: 'silk', mobile: { pos: [NEXT_LINE.from + 120, 0.3, NEXT_LINE.z + 15] } },
  { t: 7.0, pos: [NEXT_LINE.from + 124, 0.3, NEXT_LINE.z + 10.5], look: [NEXT_LINE.from + 124, 0, NEXT_LINE.z], fov: 30, mobile: { pos: [NEXT_LINE.from + 124, 0.3, NEXT_LINE.z + 13] } },
]
