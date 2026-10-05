import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { useExperience } from '../experience/context'
import { mulberry32 } from '../lib/math'
import { createLineMaterial, createPointsMaterial, fade, withPhase } from './shared/materials'
import { usePresence } from './shared/usePresence'
import { BAND } from './layout'
import { HEAD } from './world'

/**
 * Scene 1 — an abstract human: a point-cloud head, a hairline headband with
 * electrodes, and leader lines for the four annotations (DOM, see SpatialLabels).
 */
export function NeuralScene() {
  const { quality } = useExperience()
  const group = useRef<THREE.Group>(null)

  const head = useMemo(() => {
    const rand = mulberry32(7)
    const n = quality.headPoints
    const pos = new Float32Array(n * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < n; i++) {
      // 80% on a Fibonacci-sampled ellipsoid shell, 20% scattered inside.
      const shell = i < n * 0.8
      const k = shell ? i / (n * 0.8) : rand()
      const y = 1 - 2 * k
      const r = Math.sqrt(1 - y * y)
      const a = i * golden
      const depth = shell ? 1 + (rand() - 0.5) * 0.03 : Math.cbrt(rand()) * 0.72
      pos[i * 3] = Math.cos(a) * r * HEAD.radius * 0.94 * depth
      pos[i * 3 + 1] = y * HEAD.radius * 1.12 * depth
      pos[i * 3 + 2] = Math.sin(a) * r * HEAD.radius * 1.14 * depth
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return withPhase(g, rand)
  }, [quality.headPoints])

  const pointsMat = useMemo(() => createPointsMaterial({ size: 1.1, opacity: 0.55, twinkle: 0.6 }), [])
  const bandMat = useMemo(() => createLineMaterial(0.8), [])
  const leaderMat = useMemo(() => createLineMaterial(0.5), [])
  const electrodeMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ecebe6', transparent: true }), [])

  const geos = useMemo(() => {
    const r = BAND.radius
    const ring = new THREE.EllipseCurve(0, 0, r * 0.94, r * 1.14).getPoints(160)
    return {
      band: new THREE.BufferGeometry().setFromPoints(ring.map((p) => new THREE.Vector3(p.x, 0, p.y))),
      leaders: new THREE.BufferGeometry().setFromPoints(BAND.picks.flatMap((e, i) => [e, BAND.anchors[i]!])),
      electrode: new THREE.SphereGeometry(0.045, 12, 8),
    }
  }, [])

  usePresence('neural', group, (p) => {
    pointsMat.uniforms.uTime!.value = stage.clock
    pointsMat.uniforms.uOpacity!.value = 0.55 * p
    fade(bandMat, 0.8 * p)
    fade(electrodeMat, p)
    fade(leaderMat, 0.45 * stage.presence.annotations * p)
  })

  return (
    <group ref={group} position={HEAD.center}>
      <points geometry={head} material={pointsMat} />
      <group position={BAND.lift} rotation-x={BAND.tilt}>
        <lineLoop geometry={geos.band} material={bandMat} />
      </group>
      {BAND.electrodes.map((e, i) => (
        <mesh key={i} position={e} geometry={geos.electrode} material={electrodeMat} />
      ))}
      <lineSegments geometry={geos.leaders} material={leaderMat} />
    </group>
  )
}
