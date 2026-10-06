import * as THREE from 'three'
import { bustBandPoints, bustElectrodes } from './shared/bust'
import { CAREER, HEAD, PHONE, type V3 } from './world'

/** Normalised bust space → head-local world space (scale, then turn toward the phone). */
export const HEAD_TRANSFORM = new THREE.Matrix4()
  .makeRotationY(HEAD.yaw)
  .multiply(new THREE.Matrix4().makeScale(HEAD.radius, HEAD.radius, HEAD.radius))

/** The headband fitted to the bust, in head-local space. */
export const BAND = {
  points: bustBandPoints().map((p) => p.applyMatrix4(HEAD_TRANSFORM)),
  electrodes: bustElectrodes().map((p) => p.applyMatrix4(HEAD_TRANSFORM)),
}

const head = new THREE.Vector3(...HEAD.center)
const toV3 = (v: THREE.Vector3): V3 => [v.x, v.y, v.z]
const phonePos = new THREE.Vector3(...PHONE.pos)

/**
 * The HABS rig, in world space: device (headband) → wireless link → phone →
 * out toward the system. The four annotations sit on these stages, so the
 * labels read as a chain rather than as parts of a brain.
 */
export const HABS_RIG = (() => {
  // The sensor the link leaves from: the electrode nearest the phone.
  const sensor = BAND.electrodes
    .map((e) => e.clone().add(head))
    .reduce((best, e) => (e.distanceTo(phonePos) < best.distanceTo(phonePos) ? e : best))
  const phone = phonePos.clone()
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
 * — the floor is y = 0. Read at a glance: a patient with three diagnostic
 * devices beside them, one data arc (the software) to a doctor somewhere else,
 * and the real footage as a separate piece of evidence.
 */
export const MEDTECH = {
  origin: [CAREER.x.medtech, CAREER.y, CAREER.z] as V3,
  /** The patient: the film's human figure (shared/bust.ts), turned toward the devices. */
  patient: { pos: [0, 8.2, 0] as V3, yaw: 1.5, scale: 2 },
  devices: [
    { id: 'ecg', pos: [4.2, 7.2, 2.4] as V3 },
    { id: 'ultrasound', pos: [3.4, 3.6, 3.6] as V3 },
    { id: 'spo2', pos: [1.4, 4.4, 4.6] as V3 },
  ],
  /** Where the session leaves the room for the doctor. */
  uplink: [4.6, 9.4, 2.2] as V3,
  /** The remote doctor: the same figure, far away, turned back toward the patient. */
  doctor: { pos: [18, 14.5, -15] as V3, yaw: -2.3, scale: 1.6 },
  /** Real footage panel (TemmaCare SpO₂ video) — documentary proof, apart from the diagram. */
  proof: [13.6, 7.5, 12] as V3,
  proofHeight: 11,
}

export const medtechWorld = (local: V3, lift = 0): V3 => [
  MEDTECH.origin[0] + local[0],
  MEDTECH.origin[1] + local[1] + lift,
  MEDTECH.origin[2] + local[2],
]
