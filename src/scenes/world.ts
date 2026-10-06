/**
 * World layout (≈ metres). The personal journey (scenes 0–4) runs along −Z and
 * is itself one station — NeuroTech / HABS, the current chapter — on a much
 * larger career path that runs along +X. Shots and scenes both import from
 * here so geometry and camera never drift apart.
 */
export type V3 = [number, number, number]

export const HEAD = { center: [0, 0.6, -41] as V3, radius: 3.2 }

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

export const DATA = {
  originZ: -44.5,
  headbandZ: -58,
  edgeZ: -78,
  backendZ: -100,
  /** Streams terminate on the screen. */
  screenZ: -140,
}

export const SCREEN = { z: -140, width: 16, height: 9 }

export const ROOM = { near: -142, far: -184, halfWidth: 9, height: 7, floorY: -2.6 }

export const FIELD = { z: -205, x: 6 }

export const CAREER = {
  z: -120,
  y: -10,
  /** Station anchor X positions; the HABS station sits on the journey itself. */
  x: { research: -560, medtech: -280, neurotech: 0, next: 260 } as const,
}

/**
 * The payoff: three threads — human, hardware, software — running through
 * every station on the career line (top to bottom, same order as copy).
 */
export const PATTERN = { from: -640, to: 330, y: [118, 84, 50] as const }

/** The bookend: a calm signal line running through the "next" frame. */
export const NEXT_LINE = { y: 0, z: -120, from: 200, to: 900 }
