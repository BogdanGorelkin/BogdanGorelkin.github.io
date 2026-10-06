import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getProject } from '../data/projects'
import { copy } from '../data/copy'
import { stage } from '../experience/director'
import { useExperience } from '../experience/context'
import { mulberry32 } from '../lib/math'
import { MEDTECH } from './layout'
import { boxEdges, circleGeometry, segments } from './shared/geometry'
import { createLineMaterial, createPointsMaterial, fade, withPhase } from './shared/materials'
import { MediaPlane } from './shared/MediaPlane'
import { SignalLine } from './shared/SignalLine'
import { StreamParticles } from './shared/StreamParticles'
import { usePresence } from './shared/usePresence'
import type { V3 } from './world'

/**
 * MedTech station — remote medicine, as one picture: a patient, three
 * representative diagnostic devices around them (ECG, ultrasound, pulse
 * oximetry), and a live link to a doctor's screen somewhere else.
 * Human + hardware + software again, years before HABS.
 */
export function MedTechScene() {
  const { quality } = useExperience()
  const group = useRef<THREE.Group>(null)

  const patient = useMemo(() => patientGeometry(quality.tier === 'high' ? 1800 : 800), [quality.tier])
  const geos = useMemo(() => {
    const ecgPos = MEDTECH.devices[0]!.pos
    return {
      floor: circleGeometry(10, 'xz', 96),
      monitor: boxEdges(3, 2, 0.15),
      probe: boxEdges(0.6, 2, 0.6),
      tablet: boxEdges(2.4, 0.1, 1.6),
      oximeter: boxEdges(1, 0.6, 0.75),
      // Each device is wired to the patient and to the tablet that carries the session.
      links: segments(
        MEDTECH.devices.flatMap(({ pos }) => [...pos, MEDTECH.head[0], MEDTECH.head[1] - 3, MEDTECH.head[2], ...pos, ...MEDTECH.hub]),
      ),
      ecgTrace: [
        [ecgPos[0] - 1.25, ecgPos[1], ecgPos[2] + 0.1],
        [ecgPos[0] + 1.25, ecgPos[1], ecgPos[2] + 0.1],
      ] as V3[],
    }
  }, [])

  // The session leaves the room: a long arc from the tablet to the remote doctor.
  const remote = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [new THREE.Vector3(...MEDTECH.hub), new THREE.Vector3(12, 15, 2), new THREE.Vector3(...MEDTECH.doctor)],
        false,
        'centripetal',
      ),
    [],
  )
  const remoteLine = useMemo(() => new THREE.BufferGeometry().setFromPoints(remote.getPoints(80)), [remote])

  const mats = useMemo(
    () => ({
      body: createPointsMaterial({ size: 1.2, opacity: 0.6, twinkle: 0.4 }),
      device: createLineMaterial(0.95),
      link: createLineMaterial(0.3),
      floor: createLineMaterial(0.25),
    }),
    [],
  )

  usePresence('medtech', group, (p) => {
    mats.body.uniforms.uTime!.value = stage.clock
    mats.body.uniforms.uOpacity!.value = 0.6 * p
    fade(mats.device, 0.95 * p)
    fade(mats.link, 0.38 * p)
    fade(mats.floor, 0.25 * p)
  })

  const [ecg, us, spo2] = MEDTECH.devices.map((d) => d.pos) as [V3, V3, V3]
  const doctor = getProject(copy.medtech.projectId).teaser

  return (
    <group ref={group} position={MEDTECH.origin}>
      <lineLoop geometry={geos.floor} material={mats.floor} />
      <points geometry={patient} material={mats.body} />
      <lineSegments geometry={geos.links} material={mats.link} />
      <lineSegments geometry={geos.monitor} material={mats.device} position={ecg} />
      <SignalLine points={geos.ecgTrace} samples={120} presence="medtech" amplitude={0.26} />
      <lineSegments geometry={geos.probe} material={mats.device} position={us} rotation-z={0.5} />
      <lineSegments geometry={geos.oximeter} material={mats.device} position={spo2} rotation-y={-0.3} />
      <lineSegments geometry={geos.tablet} material={mats.device} position={MEDTECH.hub} />
      <line>
        <primitive object={remoteLine} attach="geometry" />
        <primitive object={mats.link} attach="material" />
      </line>
      <StreamParticles curves={[remote]} perCurve={quality.tier === 'high' ? 40 : 20} presence="medtech" size={1.9} />
      {/* The remote doctor's screen — the slot for real TemmaCare UI / device footage. */}
      {doctor && <MediaPlane asset={doctor} height={7} presence="medtech" position={MEDTECH.doctor} rotation-y={0.22} />}
    </group>
  )
}

/** A seated, abstract human: points on a head and a torso. */
function patientGeometry(count: number) {
  const rand = mulberry32(11)
  const pos = new Float32Array(count * 3)
  const [hx, hy, hz] = MEDTECH.head
  for (let i = 0; i < count; i++) {
    if (i < count * 0.35) {
      // Head: points on a slightly tall sphere.
      const u = rand() * 2 - 1
      const a = rand() * Math.PI * 2
      const r = Math.sqrt(1 - u * u)
      pos.set([hx + Math.cos(a) * r * 1.3, hy + u * 1.55, hz + Math.sin(a) * r * 1.35], i * 3)
    } else {
      // Torso: an elliptical shell narrowing toward the neck.
      const t = rand()
      const a = rand() * Math.PI * 2
      const y = 1.6 + t * 4.8
      const w = 2.3 - Math.pow(t, 3) * 1.4
      pos.set([hx + Math.cos(a) * w, y, hz + Math.sin(a) * w * 0.6], i * 3)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return withPhase(g, rand)
}
