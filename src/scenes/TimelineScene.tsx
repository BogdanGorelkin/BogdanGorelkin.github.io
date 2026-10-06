import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { career } from '../data/experience'
import { stage } from '../experience/director'
import { circleGeometry, segments } from './shared/geometry'
import { createLineMaterial, fade } from './shared/materials'
import { SignalLine } from './shared/SignalLine'
import { usePresence } from './shared/usePresence'
import { CAREER, NEXT_LINE, type V3 } from './world'

/** Every station gets the same ring: once collapsed, today's journey is one chapter like the others. */
const STATION_RING = 22
const PILLAR_TOP = 34

/**
 * The career line along +X. Stations are marked by a ring and a pillar; the
 * environments themselves live in their own scenes (MedTech, Research, and
 * the collapsed journey for HABS). The current station gets a second ring.
 */
export function TimelineScene() {
  const group = useRef<THREE.Group>(null)

  const mats = useMemo(
    () => ({ path: createLineMaterial(0.5), marker: createLineMaterial(0.5), current: createLineMaterial(0.9), pillar: createLineMaterial(0.2) }),
    [],
  )
  const geos = useMemo(() => {
    const y = CAREER.y
    const z = CAREER.z
    const path = segments([CAREER.x.research - 70, y, z, CAREER.x.next, y, z])
    const pillars = segments(career.flatMap((s) => [CAREER.x[s.id], y, z, CAREER.x[s.id], PILLAR_TOP, z]))
    return { path, pillars, ring: circleGeometry(STATION_RING), current: circleGeometry(STATION_RING * 1.25, 'xz', 128) }
  }, [])

  usePresence('career', group, (p) => {
    fade(mats.path, 0.5 * p)
    fade(mats.marker, 0.5 * p)
    fade(mats.current, 0.9 * p)
    fade(mats.pillar, 0.2 * p)
  })

  return (
    <>
      <group ref={group}>
        <lineSegments geometry={geos.path} material={mats.path} />
        <lineSegments geometry={geos.pillars} material={mats.pillar} />
        {career.map((s) => (
          <lineLoop key={s.id} geometry={geos.ring} material={mats.marker} position={[CAREER.x[s.id], CAREER.y, CAREER.z]} />
        ))}
        <lineLoop geometry={geos.current} material={mats.current} position={[CAREER.x.neurotech, CAREER.y, CAREER.z]} />
      </group>
      <NextFrame />
    </>
  )
}

/** What's next — an unfinished frame, with the signal running straight through it. */
function NextFrame() {
  const group = useRef<THREE.Group>(null)
  const material = useMemo(() => createLineMaterial(0.55), [])
  const geometry = useMemo(() => {
    // Box edges with a few deliberately missing: not built yet.
    const h = 12
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
