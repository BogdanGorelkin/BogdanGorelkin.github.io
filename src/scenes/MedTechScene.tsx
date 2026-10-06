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
 * MedTech station — remote medicine, as one picture: a patient, diagnostic
 * devices around them, and a live link to a doctor somewhere else.
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
      monitor: boxEdges(2.6, 1.7, 0.15),
      probe: boxEdges(0.45, 1.5, 0.45),
      tube: boxEdges(2.2, 0.55, 0.55),
      scope: circleGeometry(0.55, 'xy', 32),
      scopeHandle: boxEdges(0.25, 1.2, 0.25),
      tablet: boxEdges(2.4, 0.1, 1.6),
      oximeter: boxEdges(0.7, 0.45, 0.55),
      // Each device is wired to the patient and to the tablet that carries the session.
      links: segments(
        MEDTECH.devices.flatMap(({ pos }) => [...pos, MEDTECH.head[0], MEDTECH.head[1] - 3, MEDTECH.head[2], ...pos, ...MEDTECH.hub]),
      ),
      ecgTrace: [
        [ecgPos[0] - 1.05, ecgPos[1], ecgPos[2] + 0.1],
        [ecgPos[0] + 1.05, ecgPos[1], ecgPos[2] + 0.1],
      ] as V3[],
    }
  }, [])

  // The session leaves the room: a long arc from the tablet to the remote doctor.
  const remote = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [new THREE.Vector3(...MEDTECH.hub), new THREE.Vector3(-8, 13, 6), new THREE.Vector3(...MEDTECH.doctor)],
        false,
        'centripetal',
      ),
    [],
  )
  const remoteLine = useMemo(() => new THREE.BufferGeometry().setFromPoints(remote.getPoints(80)), [remote])

  const mats = useMemo(
    () => ({
      body: createPointsMaterial({ size: 1.1, opacity: 0.6, twinkle: 0.4 }),
      device: createLineMaterial(0.85),
      link: createLineMaterial(0.22),
      floor: createLineMaterial(0.25),
    }),
    [],
  )

  usePresence('medtech', group, (p) => {
    mats.body.uniforms.uTime!.value = stage.clock
    mats.body.uniforms.uOpacity!.value = 0.6 * p
    fade(mats.device, 0.85 * p)
    fade(mats.link, 0.3 * p)
    fade(mats.floor, 0.25 * p)
  })

  const [ecg, us, spiro, derm, spo2] = MEDTECH.devices.map((d) => d.pos) as [V3, V3, V3, V3, V3]
  const doctor = getProject(copy.medtech.projectId).teaser

  return (
    <group ref={group} position={MEDTECH.origin}>
      <lineLoop geometry={geos.floor} material={mats.floor} />
      <points geometry={patient} material={mats.body} />
      <lineSegments geometry={geos.links} material={mats.link} />
      <lineSegments geometry={geos.monitor} material={mats.device} position={ecg} />
      <SignalLine points={geos.ecgTrace} samples={120} presence="medtech" amplitude={0.22} />
      <lineSegments geometry={geos.probe} material={mats.device} position={us} rotation-z={0.5} />
      <lineSegments geometry={geos.tube} material={mats.device} position={spiro} rotation-y={0.4} />
      <group position={derm} rotation-y={0.6}>
        <lineLoop geometry={geos.scope} material={mats.device} />
        <lineSegments geometry={geos.scopeHandle} material={mats.device} position={[0, -0.9, 0]} />
      </group>
      <lineSegments geometry={geos.oximeter} material={mats.device} position={spo2} rotation-y={-0.3} />
      <lineSegments geometry={geos.tablet} material={mats.device} position={MEDTECH.hub} />
      <line>
        <primitive object={remoteLine} attach="geometry" />
        <primitive object={mats.link} attach="material" />
      </line>
      <StreamParticles curves={[remote]} perCurve={quality.tier === 'high' ? 40 : 20} presence="medtech" />
      {doctor && (
        <MediaPlane asset={doctor} height={5.4} presence="medtech" position={MEDTECH.doctor} rotation-y={0.55} />
      )}
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
