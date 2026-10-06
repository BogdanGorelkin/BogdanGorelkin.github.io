import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { fieldTests, moments } from '../data/projects'
import type { V3 } from './world'
import { MediaPlane } from './shared/MediaPlane'
import { createLineMaterial, fade } from './shared/materials'
import { usePresence } from './shared/usePresence'

/**
 * Hand-placed depth layers for the lateral dolly: near, mid and far planes
 * alternate so the parallax is legible. Slot 0 is the hero — where the dolly
 * comes to rest (shots.ts, t ≈ 4.9) — so the first field test gets the
 * final, clearest frame. Extra field tests reuse the pattern.
 */
const SLOTS: { pos: V3; height: number; rotY: number }[] = [
  { pos: [14.5, 1.0, -213], height: 4.4, rotY: -0.06 },
  { pos: [-3, 1.2, -207], height: 4.2, rotY: 0.18 },
  { pos: [4, 0.1, -216], height: 3.4, rotY: 0.05 },
  { pos: [6.5, 3.6, -209], height: 2.4, rotY: -0.1 },
  { pos: [22, 2.0, -209], height: 4, rotY: -0.2 },
]

/** Field tests first, then a documentary moment of Bogdan at the bench. */
const PLANES = [...fieldTests.map((t) => ({ id: t.id, media: t.teaser })), { id: moments.bench.id, media: moments.bench.media }]

/** Scene 5 — field tests: layered media in open space, warmer and less abstract. */
export function FieldScene() {
  const horizon = useRef<THREE.LineSegments>(null)
  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute([-30, -3, -236, 50, -3, -236], 3))
    return { geometry: g, material: createLineMaterial(0.25) }
  }, [])
  usePresence('field', horizon, (p) => fade(material, 0.25 * p))

  return (
    <group>
      <lineSegments ref={horizon} geometry={geometry} material={material} />
      {PLANES.map((plane, i) => {
        const slot = SLOTS[i % SLOTS.length]!
        const lap = Math.floor(i / SLOTS.length)
        const pos: V3 = [slot.pos[0] + lap * 26, slot.pos[1], slot.pos[2]]
        return (
          <MediaPlane
            key={plane.id}
            asset={plane.media}
            height={slot.height}
            presence="field"
            position={pos}
            rotation-y={slot.rotY}
          />
        )
      })}
    </group>
  )
}
