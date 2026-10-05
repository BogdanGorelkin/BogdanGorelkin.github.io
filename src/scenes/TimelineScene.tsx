import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { career } from '../data/experience'
import type { CareerStationId } from '../data/types'
import { stage } from '../experience/director'
import { boxEdges, circleGeometry, latticeGeometry, segments } from './shared/geometry'
import { createLineMaterial, fade } from './shared/materials'
import { SignalLine } from './shared/SignalLine'
import { usePresence } from './shared/usePresence'
import { PILLAR_TOP } from './layout'
import { CAREER, NEXT_LINE, type V3 } from './world'

/** Radius of the ring that marks the journey the visitor just travelled through. */
const CURRENT_RING = 150

/**
 * Scene 5 — the career line. Stations are sparse procedural environments
 * along +X; the NeuroTech station *is* the journey (scenes 0–4), circled.
 */
export function TimelineScene() {
  const group = useRef<THREE.Group>(null)

  const mats = useMemo(
    () => ({ path: createLineMaterial(0.5), env: createLineMaterial(0.4), marker: createLineMaterial(0.55) }),
    [],
  )
  const geos = useMemo(() => {
    const y = CAREER.y
    const z = CAREER.z
    const path = segments([CAREER.x.research - 160, y, z, CAREER.x.next, y, z])
    const pillars = segments(
      career.flatMap((s) => {
        const x = CAREER.x[s.id]
        return [x, y, z, x, PILLAR_TOP, z]
      }),
    )
    return { path, pillars, ring: circleGeometry(14), current: circleGeometry(CURRENT_RING, 'xz', 180) }
  }, [])

  usePresence('career', group, (p) => {
    fade(mats.path, 0.5 * p)
    fade(mats.env, 0.4 * p)
    fade(mats.marker, 0.55 * p)
  })

  return (
    <>
      <group ref={group}>
        <lineSegments geometry={geos.path} material={mats.path} />
        <lineSegments geometry={geos.pillars} material={mats.marker} />
        {career.map((s) => (
          <lineLoop
            key={s.id}
            geometry={s.current ? geos.current : geos.ring}
            material={mats.marker}
            position={[CAREER.x[s.id], CAREER.y, CAREER.z]}
          />
        ))}
        <Research at={station('research')} material={mats.env} />
        <Robotics at={station('robotics')} material={mats.env} />
        <MedTech at={station('medtech')} material={mats.env} />
      </group>
      <NextFrame />
    </>
  )
}

const station = (id: CareerStationId): V3 => [CAREER.x[id], CAREER.y, CAREER.z]

/** Research — a measured lattice: sampling, structure, method. */
function Research({ at, material }: { at: V3; material: THREE.Material }) {
  const geometry = useMemo(() => latticeGeometry(60, 6), [])
  return <lineSegments geometry={geometry} material={material} position={[at[0], at[1] + 34, at[2]]} />
}

/** Robotics — a slow articulated arm. */
function Robotics({ at, material }: { at: V3; material: THREE.Material }) {
  const shoulder = useRef<THREE.Group>(null)
  const elbow = useRef<THREE.Group>(null)
  const parts = useMemo(
    () => ({ base: boxEdges(16, 4, 16), upper: boxEdges(4, 30, 4), fore: boxEdges(3, 24, 3), tool: boxEdges(6, 3, 3) }),
    [],
  )
  useFrame(() => {
    if (!shoulder.current || !elbow.current || stage.presence.career <= 0) return
    const t = stage.clock * 0.35
    shoulder.current.rotation.z = -0.35 + Math.sin(t) * 0.18
    shoulder.current.rotation.y = Math.sin(t * 0.6) * 0.5
    elbow.current.rotation.z = 1.1 + Math.sin(t * 1.3 + 1) * 0.25
  })
  return (
    <group position={at}>
      <lineSegments geometry={parts.base} material={material} position={[0, 2, 0]} />
      <group ref={shoulder} position={[0, 4, 0]}>
        <lineSegments geometry={parts.upper} material={material} position={[0, 15, 0]} />
        <group ref={elbow} position={[0, 30, 0]}>
          <lineSegments geometry={parts.fore} material={material} position={[0, 12, 0]} />
          <lineSegments geometry={parts.tool} material={material} position={[0, 25, 0]} />
        </group>
      </group>
    </group>
  )
}

/** MedTech — a scanner gantry around a patient table. */
function MedTech({ at, material }: { at: V3; material: THREE.Material }) {
  const geometry = useMemo(() => {
    const v: number[] = []
    const n = 48
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2
      const a1 = ((i + 1) / n) * Math.PI * 2
      for (const r of [20, 30]) {
        for (const z of [-5, 5]) v.push(Math.cos(a0) * r, Math.sin(a0) * r, z, Math.cos(a1) * r, Math.sin(a1) * r, z)
      }
      if (i % 4 === 0) v.push(Math.cos(a0) * 30, Math.sin(a0) * 30, -5, Math.cos(a0) * 30, Math.sin(a0) * 30, 5)
    }
    return segments(v)
  }, [])
  const table = useMemo(() => boxEdges(8, 2, 70), [])
  return (
    <group position={[at[0], at[1] + 30, at[2]]}>
      <lineSegments geometry={geometry} material={material} rotation-y={Math.PI / 2} />
      <lineSegments geometry={table} material={material} position={[0, -12, 0]} rotation-y={Math.PI / 2} />
    </group>
  )
}

/** What's next — an unfinished frame, with the signal running straight through it. */
function NextFrame() {
  const group = useRef<THREE.Group>(null)
  const material = useMemo(() => createLineMaterial(0.55), [])
  const geometry = useMemo(() => {
    // Box edges with a few deliberately missing: not built yet.
    const h = 20
    const c = [-h, h]
    const v: number[] = []
    let k = 0
    for (const a of c)
      for (const b of c) {
        if (k++ % 3 !== 1) v.push(-h, a, b, h, a, b)
        if (k % 4 !== 0) v.push(a, -h, b, a, h, b)
        if (k % 2 === 0) v.push(a, b, -h, a, b, h)
      }
    return segments(v)
  }, [])
  usePresence('next', group, (p) => fade(material, 0.55 * p * (1 - stage.calm * 0.7)))

  return (
    <>
      <group ref={group} position={[CAREER.x.next, NEXT_LINE.y, NEXT_LINE.z]}>
        <lineSegments geometry={geometry} material={material} />
      </group>
      <SignalLine points={NEXT_POINTS} samples={1600} presence="next" amplitude={0.55} calmable />
    </>
  )
}

const NEXT_POINTS: V3[] = [
  [NEXT_LINE.from, NEXT_LINE.y, NEXT_LINE.z],
  [NEXT_LINE.to, NEXT_LINE.y, NEXT_LINE.z],
]
