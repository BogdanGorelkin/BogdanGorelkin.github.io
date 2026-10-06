import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { useExperience } from '../experience/context'
import { roundedRectGeometry } from './shared/geometry'
import { bustGeometry } from './shared/bust'
import { createLineMaterial, createPointsMaterial, fade } from './shared/materials'
import { SignalLine } from './shared/SignalLine'
import { StreamParticles } from './shared/StreamParticles'
import { usePresence } from './shared/usePresence'
import { BAND, HABS_RIG, HEAD_TRANSFORM } from './layout'
import { HEAD, PHONE, type V3 } from './world'

/** Present but quieter than the type: the person reads at a glance, the headline still leads. */
const HEAD_OPACITY = 0.36

/**
 * Scene 1 — today at HABS, as a chain rather than a brain: a person
 * wearing a device (the headband), a wireless link carrying packets to a
 * phone that shows the live signal, and the stream heading on to the system.
 * The person stays present but recedes; the device and the connection lead.
 */
export function NeuralScene() {
  const { quality } = useExperience()
  const group = useRef<THREE.Group>(null)

  // A person, legibly: a head-and-shoulders bust seen near profile, looking at the phone.
  const head = useMemo(() => bustGeometry(quality.headPoints, HEAD_TRANSFORM), [quality.headPoints])

  const mats = useMemo(
    () => ({
      head: createPointsMaterial({ size: 1.6, opacity: HEAD_OPACITY, twinkle: 0.3 }),
      band: createLineMaterial(0.9),
      phone: createLineMaterial(0.9),
      link: createLineMaterial(0.25),
      electrode: new THREE.MeshBasicMaterial({ color: '#ecebe6', transparent: true }),
    }),
    [],
  )

  const geos = useMemo(() => {
    return {
      band: new THREE.BufferGeometry().setFromPoints(BAND.points),
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
    mats.head.uniforms.uOpacity!.value = HEAD_OPACITY * p
    fade(mats.band, 0.9 * p)
    fade(mats.phone, 0.9 * p)
    fade(mats.link, 0.3 * p)
    fade(mats.electrode, p)
  })

  return (
    <group ref={group}>
      <group position={HEAD.center}>
        <points geometry={head} material={mats.head} />
        <lineLoop geometry={geos.band} material={mats.band} />
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
