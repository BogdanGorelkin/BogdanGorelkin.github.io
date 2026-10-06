/**
 * World layout (≈ metres). The personal journey (scenes 0–4) runs along −Z and
 * is itself one station — NeuroTech / HABS, the current chapter — on a much
 * larger career path that runs along +X. Shots and scenes both import from
 * here so geometry and camera never drift apart.
 */
export type V3 = [number, number, number]

/**
 * The person wearing the headband: a bust (shared/bust.ts) scaled by `radius`,
 * turned by `yaw` so it's seen near profile, looking toward the phone.
 */
export const HEAD = { center: [0, 0.6, -41] as V3, radius: 3.2, yaw: 2.3 }

/** The intro signal: flat along X, then bending away into depth toward the head. */
export const SPINE: V3[] = [
  [-46, 0, 0],
  [-14, 0, 0],
  [2, 0, 0],
  [6.5, 0, -4],
  [7.5, 0, -12],
  [5.5, 0.2, -24],
  [2.4, 0.5, -32],
  [0.6, 0.6, -37.6],
]

/** The phone (mobile / edge) the headband talks to — the bridge from device to system. */
export const PHONE = { pos: [5, 0.2, -42.8] as V3, yaw: 0.42, width: 1.15, height: 2.3 }

export const DATA = {
  /** The one "system" the streams converge through — the camera flies through it. */
  gateZ: -100,
  /** Streams terminate on the screen. */
  screenZ: -140,
}

export const SCREEN = { z: -140, width: 16, height: 9 }

export const ROOM = { near: -142, far: -184, halfWidth: 9, height: 7, floorY: -2.6 }

export const FIELD = { z: -205, x: 6 }

export const CAREER = {
  z: -120,
  y: -10,
  /**
   * Station anchor X positions. The HABS station sits on the journey itself:
   * on the rewind the whole journey collapses (JOURNEY_COLLAPSE) to the size
   * of one station, so all stations read at the same scale.
   */
  x: { research: -240, medtech: -120, neurotech: 0, next: 110 } as const,
}

/** On the rewind, the journey scales down around the HABS station to this size. */
export const JOURNEY_COLLAPSE = { pivot: [0, CAREER.y, CAREER.z] as V3, scale: 0.11 }

/** The payoff composition: human, hardware and software motifs, above the career line. */
export const PATTERN = { center: [-60, 46, CAREER.z] as V3, spread: 21, spreadPortrait: 15 }

/** The bookend: a calm signal line running through the "next" frame. */
export const NEXT_LINE = { y: 0, z: -120, from: 80, to: 780 }
