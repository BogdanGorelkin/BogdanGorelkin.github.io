import { useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { JOURNEY_COLLAPSE } from './world'

/**
 * Wraps today's journey (signal → HABS → system → hackathon → field). On the
 * rewind it shrinks around the HABS station until it is the size of the other
 * career stations — the visitor watches everything they've seen become one
 * chapter. world = pivot + s · (local − pivot).
 */
export function JourneyCollapse({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null)
  useFrame(() => {
    const g = group.current
    if (!g) return
    const s = THREE.MathUtils.lerp(1, JOURNEY_COLLAPSE.scale, stage.collapse)
    const [px, py, pz] = JOURNEY_COLLAPSE.pivot
    g.scale.setScalar(s)
    g.position.set(px * (1 - s), py * (1 - s), pz * (1 - s))
  })
  return <group ref={group}>{children}</group>
}
