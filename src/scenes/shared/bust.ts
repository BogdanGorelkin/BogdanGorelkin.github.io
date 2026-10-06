import * as THREE from 'three'
import { clamp, mulberry32 } from '../../lib/math'
import { withPhase } from './materials'

/**
 * A procedural head-and-shoulders bust, sampled as points — the one human
 * figure of the film (HABS, MedTech, the pattern). Abstract, not a portrait:
 * enough cues (brow, nose, lips, chin, ears, neck, shoulders) for the eye to
 * read "a person" at a glance, in the same points-and-fog language as the rest.
 *
 * Normalised space: face toward +z, y up, origin at the centre of the cranium
 * (≈ eye level). The head spans y ≈ −0.95…1.0; the shoulders fade out near −2.5.
 * Callers scale / rotate it into place.
 */

const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a))
  return t * t * (3 - 2 * t)
}
const bell = (x: number, s: number) => Math.exp(-(x * x) / (s * s))

/** Headband fitted to the bust's cranium, in normalised space. */
export const BUST_BAND = { center: new THREE.Vector3(0, 0.34, -0.02), rx: 0.75, rz: 0.95, tilt: -0.22 }

/** Pushes a point on the base ellipsoid out into a head: face, jaw, ears. */
function sculptHead(dx: number, dy: number, dz: number, out: THREE.Vector3) {
  const k = 1 / Math.sqrt((dx * dx) / 0.5 + (dy * dy) / 1.04 + (dz * dz) / 0.85)
  let x = dx * k
  const y = dy * k
  let z = dz * k

  // Jaw narrows toward the chin; the back of the skull tucks into the neck.
  x *= 1 - 0.26 * smooth(-0.25, -0.95, y)
  if (z < 0) z *= 1 - 0.42 * smooth(-0.15, -0.95, y)

  // The face is a near-vertical plane, curving back at the sides.
  const ax = Math.abs(x)
  const face =
    0.8 -
    0.09 * smooth(-0.5, -0.88, y) -
    0.62 * x * x +
    0.05 * bell(y - 0.13, 0.06) * smooth(0.55, 0.2, ax) - // brow
    0.08 * bell(ax - 0.29, 0.11) * bell(y + 0.01, 0.08) + // eye sockets
    0.25 * bell(x, 0.085) * smooth(0.06, -0.3, y) * smooth(-0.42, -0.31, y) + // nose
    0.05 * bell(x, 0.2) * bell(y + 0.53, 0.05) + // lips
    0.06 * bell(x, 0.24) * bell(y + 0.76, 0.08) // chin
  const front = smooth(0.25, 0.8, dz) * smooth(0.62, 0.3, y)
  if (z > 0) z += (face - z) * front

  // Ears.
  x += Math.sign(x) * 0.045 * bell(y + 0.06, 0.18) * bell(z + 0.08, 0.13)
  return out.set(x, y, z)
}

const NECK = { top: -0.5, bottom: -1.45, rx: 0.42, rz: 0.44 }
/** The neck sits toward the back of the head and leans forward as it descends. */
const neckZ = (y: number) => -0.2 - 0.12 * (y - NECK.top)

/** Shoulders: a cross-section that widens fast under the neck, then falls away. */
function shoulderSection(t: number) {
  const w = 0.42 + 1.36 * (1 - Math.pow(1 - smooth(0, 0.42, t), 2))
  const d = 0.44 + 0.14 * smooth(0, 0.5, t)
  return { w, d, y: -1.3 - t * 1.2 }
}

/**
 * `count` points: ~45% on contour rings (they show the curvature, like a
 * scan), the rest scattered so the surface reads as volume. Returns a
 * geometry with per-point phase for the twinkle shader.
 */
export function bustGeometry(count: number, transform?: THREE.Matrix4, seed = 7) {
  const rand = mulberry32(seed)
  const pos = new Float32Array(count * 3)
  const v = new THREE.Vector3()
  const nHead = Math.round(count * 0.64)
  const nNeck = Math.round(count * 0.07)
  const golden = Math.PI * (3 - Math.sqrt(5))
  let i = 0
  const push = () => {
    if (transform) v.applyMatrix4(transform)
    pos.set([v.x, v.y, v.z], i * 3)
    i++
  }

  // Head: contour rings, then a Fibonacci scatter.
  const rings = 30
  const ringPts = Math.round(nHead * 0.45)
  const perRingWeight = Array.from({ length: rings }, (_, r) => Math.sqrt(1 - (1 - (2 * (r + 0.5)) / rings) ** 2))
  const total = perRingWeight.reduce((a, b) => a + b, 0)
  for (let r = 0; r < rings && i < ringPts; r++) {
    const dy = 1 - (2 * (r + 0.5)) / rings
    if (dy < -0.82) continue
    const m = Math.round((ringPts * perRingWeight[r]!) / total)
    const rr = Math.sqrt(1 - dy * dy)
    for (let j = 0; j < m && i < ringPts; j++) {
      const a = ((j + rand() * 0.3) / m) * Math.PI * 2
      sculptHead(Math.sin(a) * rr, dy, Math.cos(a) * rr, v)
      push()
    }
  }
  const scatter = nHead - i
  for (let j = 0; j < scatter * 1.3 && i < nHead; j++) {
    const dy = 1 - (2 * (j + 0.5)) / (scatter * 1.3)
    if (dy < -0.82) continue
    const rr = Math.sqrt(1 - dy * dy)
    const a = j * golden
    sculptHead(Math.sin(a) * rr, dy, Math.cos(a) * rr, v)
    v.multiplyScalar(1 + (rand() - 0.5) * 0.02)
    push()
  }

  // Neck: a slightly forward-leaning cylinder.
  for (let j = 0; j < nNeck; j++) {
    const y = NECK.top + (NECK.bottom - NECK.top) * rand()
    const a = rand() * Math.PI * 2
    v.set(Math.sin(a) * NECK.rx, y, neckZ(y) + Math.cos(a) * NECK.rz)
    push()
  }

  // Shoulders and upper chest, thinning out toward the bottom edge.
  while (i < count) {
    let t = Math.pow(rand(), 1.25)
    if (rand() < smooth(0.55, 1, t)) continue
    // Some points snap to contour rings, like the head.
    if (rand() < 0.15) t = Math.round(t * 14) / 14
    const s = shoulderSection(t)
    const a = rand() * Math.PI * 2
    v.set(Math.sin(a) * s.w, s.y, -0.12 + Math.cos(a) * s.d)
    push()
  }

  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return withPhase(g, rand)
}

/** Points along the fitted headband, in normalised space. */
export function bustBandPoints(segments = 160) {
  const rot = new THREE.Matrix4().makeRotationX(BUST_BAND.tilt)
  return new THREE.EllipseCurve(0, 0, BUST_BAND.rx, BUST_BAND.rz)
    .getPoints(segments)
    .map((p) => new THREE.Vector3(p.x, 0, p.y).applyMatrix4(rot).add(BUST_BAND.center))
}

/** Electrode positions on the front arc of the band (around the forehead), normalised. */
export function bustElectrodes(count = 10) {
  const rot = new THREE.Matrix4().makeRotationX(BUST_BAND.tilt)
  return Array.from({ length: count }, (_, i) => {
    // Angle measured from +z (the forehead), ±105° around the sides.
    const a = (-105 + (i / (count - 1)) * 210) * (Math.PI / 180)
    return new THREE.Vector3(Math.sin(a) * BUST_BAND.rx, 0, Math.cos(a) * BUST_BAND.rz).applyMatrix4(rot).add(BUST_BAND.center)
  })
}
