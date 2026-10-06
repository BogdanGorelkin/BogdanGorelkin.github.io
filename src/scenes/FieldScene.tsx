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
 * comes to rest (shots.ts, t ≈ 5.86); slot 2 is framed mid-dolly (t ≈ 5.5).
 * Extra field tests reuse the pattern further along.
 */
const SLOTS: { pos: V3; height: number; rotY: number }[] = [
  { pos: [14.5, 1.0, -213], height: 4.4, rotY: -0.06 },
  { pos: [-7, 1.2, -209], height: 4.2, rotY: 0.22 },
  { pos: [4, 0.3, -216], height: 3.8, rotY: 0.05 },
  { pos: [6.5, 3.6, -209], height: 2.4, rotY: -0.1 },
  { pos: [22, 2.0, -209], height: 4, rotY: -0.2 },
]

/**
 * Which plane each story gets — choreography, so it lives here, not in data.
 * The skydive gets the hero plane where the dolly rests; the Paris ride the
 * plane centred mid-dolly. Anything new falls into the next free slot.
 */
const SLOT_BY_ID: Record<string, number> = { skydive: 0, 'wall-lamp': 1, 'moto-paris': 2, 'hackathon-floor': 3, bench: 4 }

const PLANES = (() => {
  const items = [...fieldTests.map((t) => ({ id: t.id, media: t.teaser })), { id: moments.bench.id, media: moments.bench.media }]
  let next = SLOTS.length
  return items.map((item) => ({ ...item, slot: SLOT_BY_ID[item.id] ?? next++ }))
})()

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
      {PLANES.map((plane) => {
        const slot = SLOTS[plane.slot % SLOTS.length]!
        const lap = Math.floor(plane.slot / SLOTS.length)
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
