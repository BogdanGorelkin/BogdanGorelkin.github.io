import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { copy } from '../data/copy'
import { career } from '../data/experience'
import { stage } from '../experience/director'
import { createPointsMaterial, withPhase } from './shared/materials'
import { SignalLine } from './shared/SignalLine'
import { usePresence } from './shared/usePresence'
import { CAREER, PATTERN, type V3 } from './world'

const THREADS: V3[][] = PATTERN.y.map((y) => [
  [PATTERN.from, y, CAREER.z],
  [PATTERN.to, y, CAREER.z],
])

/**
 * The payoff — three living threads (human, hardware, software) running the
 * full length of the career line, with a node wherever they pass a station.
 * Seen side-on: the same three lines through every era.
 */
export function PatternScene() {
  const nodesRef = useRef<THREE.Points>(null)
  const nodes = useMemo(() => {
    // A node wherever a thread meets a station — except where that part of the
    // pattern honestly wasn't there yet (research had no human in the loop).
    const pos = career.flatMap((s) =>
      PATTERN.y.flatMap((y, i) => (s.id === 'research' && i === 0 && copy.research.triad.human === null ? [] : [CAREER.x[s.id], y, CAREER.z])),
    )
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    return withPhase(g, Math.random)
  }, [])
  const material = useMemo(() => createPointsMaterial({ size: 520, opacity: 1, twinkle: 0.25 }), [])

  usePresence('pattern', nodesRef, (p) => {
    material.uniforms.uTime!.value = stage.clock
    material.uniforms.uOpacity!.value = p
  })

  return (
    <>
      {THREADS.map((points, i) => (
        <SignalLine key={i} points={points} samples={1200} presence="pattern" amplitude={2.4} waveScale={0.06} />
      ))}
      <points ref={nodesRef} geometry={nodes} material={material} frustumCulled={false} />
    </>
  )
}
