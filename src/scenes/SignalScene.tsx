import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { SignalLine } from './shared/SignalLine'
import { createLineMaterial, fade } from './shared/materials'
import { usePresence } from './shared/usePresence'
import { SPINE } from './world'

/**
 * Scene 0 — a single live trace. Seen front-on it's a flat instrument
 * readout; once the camera swings it becomes a thread into depth.
 */
export function SignalScene() {
  const ticks = useRef<THREE.LineSegments>(null)
  const { geometry, material } = useMemo(() => {
    // A faint baseline with sparse ticks: the "instrument" the trace is drawn on.
    const v: number[] = [-46, 0, 0, 3, 0, 0]
    for (let x = -40; x <= 2; x += 1) {
      const h = x % 5 === 0 ? 0.12 : 0.05
      v.push(x, -h, 0, x, h, 0)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
    g.translate(0, -1.1, 0)
    return { geometry: g, material: createLineMaterial(0.12) }
  }, [])

  usePresence('signal', ticks, (p) => fade(material, 0.12 * p))

  return (
    <group>
      <SignalLine points={SPINE} samples={900} presence="signal" amplitude={0.32} intro />
      <lineSegments ref={ticks} geometry={geometry} material={material} />
    </group>
  )
}
