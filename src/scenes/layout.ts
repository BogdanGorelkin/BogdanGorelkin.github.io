import * as THREE from 'three'
import { CAREER, HEAD, PATTERN, type V3 } from './world'

/** Headband geometry around the abstract head, in head-local space. */
export const BAND = (() => {
  const radius = HEAD.radius * 1.08
  const tilt = 0.32
  const lift = new THREE.Vector3(0, HEAD.radius * 0.55, 0)
  const rotation = new THREE.Matrix4().makeRotationX(tilt)
  const count = 10
  const electrodes = Array.from({ length: count }, (_, i) => {
    const a = -Math.PI * 0.05 + (i / (count - 1)) * Math.PI * 1.1
    return new THREE.Vector3(Math.cos(a) * radius * 0.94, 0, Math.sin(a) * radius * 1.14)
      .applyMatrix4(rotation)
      .add(lift)
  })
  // Four electrodes get an annotation, each with a short leader line outward.
  const picks = [1, 3, 6, 8].map((i) => electrodes[i]!)
  const anchors = picks.map((e, i) => e.clone().add(new THREE.Vector3(e.x * 0.35 + 0.6, 1.0 + i * 0.35, e.z * 0.25)))
  return { radius, tilt, lift, electrodes, picks, anchors }
})()

const head = new THREE.Vector3(...HEAD.center)

/** World-space anchor of annotation `i`. */
export const annotationAnchor = (i: number): V3 => BAND.anchors[i]!.clone().add(head).toArray() as V3

/** Station names sit just under the career line. */
export const stationLabelAnchor = (x: number): V3 => [x, CAREER.y - 16, CAREER.z]

/** Thread names sit on top of each pattern thread, at its left end. */
export const threadLabelAnchor = (i: number): V3 => [PATTERN.from + 6, PATTERN.y[i]!, CAREER.z]

/**
 * MedTech station, in local space around (CAREER.x.medtech, CAREER.y, CAREER.z)
 * — the floor is y = 0. Human scale (≈ metres × 1.5) so it reads up close.
 */
export const MEDTECH = {
  origin: [CAREER.x.medtech, CAREER.y, CAREER.z] as V3,
  head: [0, 8.2, 0] as V3,
  devices: [
    { id: 'ecg', pos: [5.5, 5, 2.6] as V3 },
    { id: 'ultrasound', pos: [-5.2, 3.6, 3.2] as V3 },
    { id: 'spirometry', pos: [4.8, 2.4, -3.4] as V3 },
    { id: 'dermatoscope', pos: [-4.6, 6.2, -2.2] as V3 },
  ],
  hub: [2.8, 1.4, 5.2] as V3,
  doctor: [-24, 5.5, -8] as V3,
}

export const medtechWorld = (local: V3, lift = 0): V3 => [
  MEDTECH.origin[0] + local[0],
  MEDTECH.origin[1] + local[1] + lift,
  MEDTECH.origin[2] + local[2],
]
