import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getProject } from '../data/projects'
import { copy } from '../data/copy'
import { stage } from '../experience/director'
import { useExperience } from '../experience/context'
import { MEDTECH } from './layout'
import { bustGeometry } from './shared/bust'
import { boxEdges, segments } from './shared/geometry'
import { createLineMaterial, createPointsMaterial, fade } from './shared/materials'
import { MediaPlane } from './shared/MediaPlane'
import { SignalLine } from './shared/SignalLine'
import { StreamParticles } from './shared/StreamParticles'
import { usePresence } from './shared/usePresence'
import type { V3 } from './world'

const figure = ({ pos, yaw, scale }: { pos: V3; yaw: number; scale: number }) =>
  new THREE.Matrix4()
    .makeTranslation(...pos)
    .multiply(new THREE.Matrix4().makeRotationY(yaw))
    .multiply(new THREE.Matrix4().makeScale(scale, scale, scale))

/**
 * MedTech station — remote medicine as one picture: a patient with three
 * representative diagnostic devices beside them (ECG, ultrasound, pulse
 * oximetry), one arc of data — the software — to a doctor somewhere else,
 * and the real footage beside it as evidence. Human + hardware + software,
 * years before HABS.
 */
export function MedTechScene() {
  const { quality } = useExperience()
  const group = useRef<THREE.Group>(null)

  const people = useMemo(() => {
    const count = quality.tier === 'high' ? 5200 : 2600
    return {
      patient: bustGeometry(count, figure(MEDTECH.patient), 11),
      doctor: bustGeometry(Math.round(count * 0.6), figure(MEDTECH.doctor), 13),
    }
  }, [quality.tier])

  const geos = useMemo(() => {
    const [ecg] = MEDTECH.devices.map((d) => d.pos) as [V3]
    // Each device is wired to the patient (chest height): connected locally.
    const chest: V3 = [MEDTECH.patient.pos[0] + 0.8, MEDTECH.patient.pos[1] - 2.6, MEDTECH.patient.pos[2] + 0.6]
    return {
      monitor: boxEdges(2.6, 1.7, 0.15),
      probe: boxEdges(0.5, 1.7, 0.5),
      oximeter: boxEdges(0.9, 0.55, 0.7),
      wires: segments(MEDTECH.devices.flatMap(({ pos }) => [...pos, ...chest])),
      ecgTrace: [
        [ecg[0] - 1.05, ecg[1], ecg[2] + 0.1],
        [ecg[0] + 1.05, ecg[1], ecg[2] + 0.1],
      ] as V3[],
    }
  }, [])

  // The session leaves the room: one long arc from the devices to the remote doctor.
  const remote = useMemo(() => {
    const [dx, dy, dz] = MEDTECH.doctor.pos
    return new THREE.CatmullRomCurve3(
      [new THREE.Vector3(...MEDTECH.uplink), new THREE.Vector3(11, 20, -4), new THREE.Vector3(dx - 0.6, dy + 0.4, dz + 0.8)],
      false,
      'centripetal',
    )
  }, [])
  const remoteLine = useMemo(() => new THREE.BufferGeometry().setFromPoints(remote.getPoints(80)), [remote])

  const mats = useMemo(
    () => ({
      patient: createPointsMaterial({ size: 1.5, opacity: 0.62, twinkle: 0.3 }),
      doctor: createPointsMaterial({ size: 1.4, opacity: 0.42, twinkle: 0.3 }),
      device: createLineMaterial(0.95),
      wire: createLineMaterial(0.22),
      arc: createLineMaterial(0.45),
    }),
    [],
  )

  usePresence('medtech', group, (p) => {
    for (const m of [mats.patient, mats.doctor]) m.uniforms.uTime!.value = stage.clock
    mats.patient.uniforms.uOpacity!.value = 0.62 * p
    mats.doctor.uniforms.uOpacity!.value = 0.42 * p
    fade(mats.device, 0.95 * p)
    fade(mats.wire, 0.22 * p)
    fade(mats.arc, 0.45 * p)
  })

  const [ecg, us, spo2] = MEDTECH.devices.map((d) => d.pos) as [V3, V3, V3]
  const proof = getProject(copy.medtech.projectId).teaser

  return (
    <group ref={group} position={MEDTECH.origin}>
      <points geometry={people.patient} material={mats.patient} />
      <lineSegments geometry={geos.wires} material={mats.wire} />
      <lineSegments geometry={geos.monitor} material={mats.device} position={ecg} rotation-y={0.5} />
      <SignalLine points={geos.ecgTrace} samples={120} presence="medtech" amplitude={0.24} />
      <lineSegments geometry={geos.probe} material={mats.device} position={us} rotation-z={0.5} />
      <lineSegments geometry={geos.oximeter} material={mats.device} position={spo2} rotation-y={-0.3} />
      <line>
        <primitive object={remoteLine} attach="geometry" />
        <primitive object={mats.arc} attach="material" />
      </line>
      <StreamParticles curves={[remote]} perCurve={quality.tier === 'high' ? 40 : 20} presence="medtech" size={1.9} />
      <points geometry={people.doctor} material={mats.doctor} />
      {/* Real footage, as a device-shaped panel: documentary proof, apart from the diagram. */}
      {proof && (
        <MediaPlane asset={proof} height={MEDTECH.proofHeight} presence="medtech" frame="device" position={MEDTECH.proof} rotation-y={0.23} />
      )}
    </group>
  )
}
