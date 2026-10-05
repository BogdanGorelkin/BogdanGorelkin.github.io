import * as THREE from 'three'
import { CAREER, HEAD, type V3 } from './world'

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

export const PILLAR_TOP = 70

export const stationLabelAnchor = (x: number): V3 => [x, PILLAR_TOP + 4, CAREER.z]
