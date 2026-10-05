import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { useExperience } from '../experience/context'
import { mulberry32 } from '../lib/math'
import { createLineMaterial, fade } from './shared/materials'
import { latticeGeometry } from './shared/geometry'
import { StreamParticles } from './shared/StreamParticles'
import { usePresence } from './shared/usePresence'
import { DATA, HEAD, SCREEN } from './world'

/**
 * Scene 2 — the system, spatially. The camera flies through four layers
 * (headbands → mobile/edge → realtime backend → processing surface) while
 * data streams fan out from one source into many and converge again.
 */
export function DataScene() {
  const { quality } = useExperience()
  const group = useRef<THREE.Group>(null)
  const n = quality.streams

  const layout = useMemo(() => {
    const rand = mulberry32(21)
    const headbands = Array.from({ length: n }, (_, i) => {
      const u = n === 1 ? 0.5 : i / (n - 1)
      return new THREE.Vector3(THREE.MathUtils.lerp(-8, 8, u), Math.sin(i * 1.7) * 1.4, DATA.headbandZ - rand() * 3)
    })
    const edgeCount = Math.ceil(n / 2)
    const edges = Array.from({ length: edgeCount }, (_, i) => {
      const u = edgeCount === 1 ? 0.5 : i / (edgeCount - 1)
      return new THREE.Vector3(THREE.MathUtils.lerp(-5, 5, u), (rand() - 0.5) * 1.6, DATA.edgeZ)
    })
    const origin = new THREE.Vector3(HEAD.center[0], HEAD.center[1], DATA.originZ)
    const curves = headbands.map((hb, i) => {
      const edge = edges[Math.floor(i / 2)]!
      const backend = new THREE.Vector3((rand() - 0.5) * 2.4, (rand() - 0.5) * 2.4, DATA.backendZ)
      const target = new THREE.Vector3(
        ((i + 0.5) / n - 0.5) * SCREEN.width * 0.7,
        (rand() - 0.5) * SCREEN.height * 0.6,
        DATA.screenZ,
      )
      return new THREE.CatmullRomCurve3([origin, hb, edge, backend, target], false, 'centripetal', 0.5)
    })
    return { headbands, edges, curves }
  }, [n])

  const geos = useMemo(() => {
    const ring = new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, 0.9, 0.75).getPoints(64).map((p) => new THREE.Vector3(p.x, p.y, 0)))
    const slab = new THREE.EdgesGeometry(new THREE.BoxGeometry(0.95, 1.9, 0.08))
    const streams = new THREE.BufferGeometry().setFromPoints(
      layout.curves.flatMap((c) => {
        const pts = c.getPoints(120)
        return pts.slice(1).flatMap((p, i) => [pts[i]!, p])
      }),
    )
    return { ring, slab, streams, lattice: latticeGeometry(7, 4) }
  }, [layout])

  const mats = useMemo(
    () => ({ device: createLineMaterial(0.85), stream: createLineMaterial(0.16), lattice: createLineMaterial(0.28) }),
    [],
  )

  usePresence('system', group, (p) => {
    // The backend breathes faintly with activity.
    const pulse = 0.85 + 0.15 * Math.sin(stage.clock * 2.2)
    fade(mats.device, 0.85 * p)
    fade(mats.stream, 0.16 * p)
    fade(mats.lattice, 0.28 * p * pulse)
  })

  return (
    <group ref={group}>
      <lineSegments geometry={geos.streams} material={mats.stream} />
      {layout.headbands.map((pos, i) => (
        <lineLoop key={i} geometry={geos.ring} material={mats.device} position={pos} />
      ))}
      {layout.edges.map((pos, i) => (
        <lineSegments key={i} geometry={geos.slab} material={mats.device} position={pos} />
      ))}
      <lineSegments geometry={geos.lattice} material={mats.lattice} position={[0, 0, DATA.backendZ]} />
      <StreamParticles curves={layout.curves} perCurve={quality.particlesPerStream} presence="system" />
    </group>
  )
}
