import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getFieldTest } from '../data/projects'
import type { PresenceKey } from '../experience/director'
import type { V3 } from './world'
import { MediaPlane, type MediaFrame } from './shared/MediaPlane'
import { createLineMaterial, fade } from './shared/materials'
import { usePresence } from './shared/usePresence'

/**
 * Two real experiments, staged as a move from the street into the sky.
 * The Paris ride sits at street level, a framed window on the city (beat 1,
 * shots.ts t ≈ 5.48–5.62). The camera then slides past it and rises while
 * the ground line drops away, coming to rest on the skydive: larger,
 * frameless, higher and deeper — the more personal moment (beat 2, t ≈ 5.86).
 */
export const FIELD_PLANES: { id: string; pos: V3; height: number; rotY: number; frame: MediaFrame; presence: PresenceKey }[] = [
  { id: 'moto-paris', pos: [0, 2.4, -222], height: 5.4, rotY: 0.08, frame: 'hairline', presence: 'paris' },
  { id: 'skydive', pos: [13, 7.5, -246], height: 7.6, rotY: -0.18, frame: 'none', presence: 'skydive' },
]

/** Scene 5 — field tests. */
export function FieldScene() {
  const horizon = useRef<THREE.LineSegments>(null)
  const { geometry, material } = useMemo(() => {
    const g = new THREE.BufferGeometry()
    // The ground line: present on the street, falling out of frame as the camera rises.
    g.setAttribute('position', new THREE.Float32BufferAttribute([-30, -3, -236, 60, -3, -236], 3))
    return { geometry: g, material: createLineMaterial(0.25) }
  }, [])
  usePresence('field', horizon, (p) => fade(material, 0.25 * p))

  return (
    <group>
      <lineSegments ref={horizon} geometry={geometry} material={material} />
      {FIELD_PLANES.map((plane) => (
        <MediaPlane
          key={plane.id}
          asset={getFieldTest(plane.id).teaser}
          height={plane.height}
          presence={plane.presence}
          frame={plane.frame}
          position={plane.pos}
          rotation-y={plane.rotY}
        />
      ))}
    </group>
  )
}
