import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getFieldTest, moments } from '../data/projects'
import type { V3 } from './world'
import { MediaPlane } from './shared/MediaPlane'
import { createLineMaterial, fade } from './shared/materials'
import { usePresence } from './shared/usePresence'

/**
 * Two experiments, one documentary moment — not a collage.
 * The skydive is the hero where the dolly comes to rest (shots.ts, t ≈ 5.86);
 * the Paris ride is framed mid-dolly (t ≈ 5.5); Bogdan at the bench sits far
 * behind for depth. Other field tests live in the "Also" line and the Index.
 */
const PLANES = [
  { id: 'skydive', pos: [14.5, 1.2, -213] as V3, height: 5.2, rotY: -0.06 },
  { id: 'moto-paris', pos: [0, 2.4, -222] as V3, height: 4, rotY: 0.08 },
  { id: 'bench', pos: [24, 2.4, -230] as V3, height: 3.4, rotY: -0.25 },
].map((slot) => ({
  ...slot,
  media: slot.id === moments.bench.id ? moments.bench.media : getFieldTest(slot.id).teaser,
  opacity: slot.id === moments.bench.id ? 0.7 : 1,
}))

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
      {PLANES.map((plane) => (
        <MediaPlane
          key={plane.id}
          asset={plane.media}
          height={plane.height}
          presence="field"
          opacity={plane.opacity}
          position={plane.pos}
          rotation-y={plane.rotY}
        />
      ))}
    </group>
  )
}
