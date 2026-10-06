import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { useExperience } from '../experience/context'
import { mulberry32 } from '../lib/math'
import { roundedRectGeometry } from './shared/geometry'
import { createLineMaterial, createPointsMaterial, fade, withPhase } from './shared/materials'
import { SignalLine } from './shared/SignalLine'
import { StreamParticles } from './shared/StreamParticles'
import { usePresence } from './shared/usePresence'
import { BAND, HABS_RIG } from './layout'
import { HEAD, PHONE, type V3 } from './world'

/**
 * Scene 1 — today at HABS, as a chain rather than a brain: a quiet head
 * wearing a device (the headband), a wireless link carrying packets to a
 * phone that shows the live signal, and the stream heading on to the system.
 * The person stays present but recedes; the device and the connection lead.
 */
export function NeuralScene() {
  const { quality } = useExperience()
  const group = useRef<THREE.Group>(null)

  const head = useMemo(() => {
    const rand = mulberry32(7)
    // A lighter head than before: it's the human in the loop, not the subject.
    const n = Math.round(quality.headPoints * 0.6)
    const pos = new Float32Array(n * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < n; i++) {
      const k = i / n
      const y = 1 - 2 * k
      const r = Math.sqrt(1 - y * y)
      const a = i * golden
      const depth = 1 + (rand() - 0.5) * 0.03
      pos[i * 3] = Math.cos(a) * r * HEAD.radius * 0.94 * depth
      pos[i * 3 + 1] = y * HEAD.radius * 1.12 * depth
      pos[i * 3 + 2] = Math.sin(a) * r * HEAD.radius * 1.14 * depth
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return withPhase(g, rand)
  }, [quality.headPoints])

  const mats = useMemo(
    () => ({
      head: createPointsMaterial({ size: 1.0, opacity: 0.4, twinkle: 0.5 }),
      band: createLineMaterial(0.9),
      phone: createLineMaterial(0.9),
      link: createLineMaterial(0.25),
      electrode: new THREE.MeshBasicMaterial({ color: '#ecebe6', transparent: true }),
    }),
    [],
  )

  const geos = useMemo(() => {
    const r = BAND.radius
    const ring = new THREE.EllipseCurve(0, 0, r * 0.94, r * 1.14).getPoints(160)
    return {
      band: new THREE.BufferGeometry().setFromPoints(ring.map((p) => new THREE.Vector3(p.x, 0, p.y))),
      electrode: new THREE.SphereGeometry(0.05, 12, 8),
      phone: roundedRectGeometry(PHONE.width, PHONE.height, 0.16),
      link: new THREE.BufferGeometry().setFromPoints(HABS_RIG.link.getPoints(48)),
    }
  }, [])

  // The live signal, drawn on the phone's screen.
  const phoneTrace = useMemo<V3[]>(() => {
    const w = PHONE.width * 0.36
    return [
      [-w, 0.15, 0.02],
      [w, 0.15, 0.02],
    ]
  }, [])

  usePresence('neural', group, (p) => {
    mats.head.uniforms.uTime!.value = stage.clock
    mats.head.uniforms.uOpacity!.value = 0.4 * p
    fade(mats.band, 0.9 * p)
    fade(mats.phone, 0.9 * p)
    fade(mats.link, 0.3 * p)
    fade(mats.electrode, p)
  })

  return (
    <group ref={group}>
      <group position={HEAD.center}>
        <points geometry={head} material={mats.head} />
        <group position={BAND.lift} rotation-x={BAND.tilt}>
          <lineLoop geometry={geos.band} material={mats.band} />
        </group>
        {BAND.electrodes.map((e, i) => (
          <mesh key={i} position={e} geometry={geos.electrode} material={mats.electrode} />
        ))}
      </group>
      <line>
        <primitive object={geos.link} attach="geometry" />
        <primitive object={mats.link} attach="material" />
      </line>
      <StreamParticles curves={[HABS_RIG.link]} perCurve={quality.tier === 'high' ? 18 : 10} presence="neural" size={1.8} speed={2.4} />
      <group position={PHONE.pos} rotation-y={PHONE.yaw}>
        <lineLoop geometry={geos.phone} material={mats.phone} />
        <SignalLine points={phoneTrace} samples={90} presence="neural" amplitude={0.1} waveScale={9} />
      </group>
    </group>
  )
}
