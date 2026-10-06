import * as THREE from 'three'
import { CAREER, HEAD, PHONE, type V3 } from './world'

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
  return { radius, tilt, lift, electrodes }
})()

const head = new THREE.Vector3(...HEAD.center)
const toV3 = (v: THREE.Vector3): V3 => [v.x, v.y, v.z]

/**
 * The HABS rig, in world space: device (headband) → wireless link → phone →
 * out toward the system. The four annotations sit on these stages, so the
 * labels read as a chain rather than as parts of a brain.
 */
export const HABS_RIG = (() => {
  const sensor = BAND.electrodes[1]!.clone().add(head)
  const phone = new THREE.Vector3(...PHONE.pos)
  const phoneTop = phone.clone().add(new THREE.Vector3(0, PHONE.height / 2 + 0.05, 0))
  const linkMid = sensor.clone().lerp(phoneTop, 0.5).add(new THREE.Vector3(0, 1.3, 0))
  const link = new THREE.QuadraticBezierCurve3(sensor, linkMid, phoneTop)
  const outbound = phone.clone().add(new THREE.Vector3(-0.6, -0.1, -3.5))
  return {
    sensor,
    phone,
    link,
    anchors: [
      toV3(sensor.clone().add(new THREE.Vector3(0.3, 0.9, 0.2))),
      toV3(link.getPoint(0.5).add(new THREE.Vector3(0, 0.7, 0))),
      toV3(phone.clone().add(new THREE.Vector3(0.9, 1.5, 0))),
      // Realtime sits low, where the stream leaves the phone for the system.
      toV3(outbound.add(new THREE.Vector3(0.6, -1.5, 0))),
    ] as V3[],
  }
})()

/** World-space anchor of HABS annotation `i` (Sensor, BLE, Mobile, Realtime). */
export const annotationAnchor = (i: number): V3 => HABS_RIG.anchors[i]!

/** Station names sit just under the career line. */
export const stationLabelAnchor = (x: number): V3 => [x, CAREER.y - 9, CAREER.z]

/**
 * MedTech station, in local space around (CAREER.x.medtech, CAREER.y, CAREER.z)
 * — the floor is y = 0. Human scale (≈ metres × 1.5) so it reads up close.
 * Three representative devices only: the story is the connection, not the catalogue.
 */
export const MEDTECH = {
  origin: [CAREER.x.medtech, CAREER.y, CAREER.z] as V3,
  head: [0, 8.2, 0] as V3,
  devices: [
    { id: 'ecg', pos: [5.4, 5.4, 2.4] as V3 },
    { id: 'ultrasound', pos: [-5, 4.2, 2.8] as V3 },
    { id: 'spo2', pos: [1.4, 2.4, 5.8] as V3 },
  ],
  hub: [3.4, 1.2, 6.4] as V3,
  /** The remote doctor's screen — also the slot for real TemmaCare media. */
  doctor: [17, 10, -13] as V3,
}

export const medtechWorld = (local: V3, lift = 0): V3 => [
  MEDTECH.origin[0] + local[0],
  MEDTECH.origin[1] + local[1] + lift,
  MEDTECH.origin[2] + local[2],
]
