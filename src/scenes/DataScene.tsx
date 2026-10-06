import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { useExperience } from '../experience/context'
import { mulberry32 } from '../lib/math'
import { circleGeometry } from './shared/geometry'
import { createLineMaterial, fade } from './shared/materials'
import { StreamParticles } from './shared/StreamParticles'
import { usePresence } from './shared/usePresence'
import { DATA, PHONE, SCREEN } from './world'

const GATE_RADIUS = 4.2

/**
 * Scene 2 — from sensor to experience. The signal itself is the protagonist:
 * streams leave the phone, tighten through one gate (the system — the camera
 * flies through it) and open out onto the screen (the experience).
 * Device → mobile / edge → system → experience, with almost no objects.
 */
export function DataScene() {
  const { quality } = useExperience()
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.LineLoop>(null)
  const n = quality.streams

  const curves = useMemo(() => {
    const rand = mulberry32(21)
    const phone = new THREE.Vector3(...PHONE.pos)
    return Array.from({ length: n }, (_, i) => {
      const u = n === 1 ? 0.5 : i / (n - 1)
      // Leave the phone as one bundle, spread a little in flight, pinch through the gate, open onto the screen.
      const spread = new THREE.Vector3(THREE.MathUtils.lerp(-2.6, 2.6, u) + 2, Math.sin(i * 1.9) * 1.2, -70 - rand() * 4)
      const pinch = new THREE.Vector3((u - 0.5) * 1.1, (rand() - 0.5) * 0.9, DATA.gateZ)
      const target = new THREE.Vector3((u - 0.5) * SCREEN.width * 0.72, (rand() - 0.5) * SCREEN.height * 0.55, DATA.screenZ)
      return new THREE.CatmullRomCurve3([phone, spread, pinch, target], false, 'centripetal', 0.5)
    })
  }, [n])

  const geos = useMemo(
    () => ({
      streams: new THREE.BufferGeometry().setFromPoints(
        curves.flatMap((c) => {
          const pts = c.getPoints(140)
          return pts.slice(1).flatMap((p, i) => [pts[i]!, p])
        }),
      ),
      outer: circleGeometry(GATE_RADIUS, 'xy', 128),
      inner: circleGeometry(GATE_RADIUS * 0.82, 'xy', 128),
    }),
    [curves],
  )

  const mats = useMemo(() => ({ stream: createLineMaterial(0.22), gate: createLineMaterial(0.8), gateInner: createLineMaterial(0.35) }), [])

  usePresence('system', group, (p) => {
    // The system "breathes" as data passes through it.
    const pulse = 0.5 + 0.5 * Math.sin(stage.clock * 2.4)
    fade(mats.stream, 0.22 * p)
    fade(mats.gate, 0.8 * p)
    fade(mats.gateInner, (0.2 + 0.25 * pulse) * p)
    inner.current?.scale.setScalar(1 + pulse * 0.05)
  })

  return (
    <group ref={group}>
      <lineSegments geometry={geos.streams} material={mats.stream} />
      <group position={[0, 0, DATA.gateZ]}>
        <lineLoop geometry={geos.outer} material={mats.gate} />
        <lineLoop ref={inner} geometry={geos.inner} material={mats.gateInner} />
      </group>
      <StreamParticles curves={curves} perCurve={quality.particlesPerStream} presence="system" size={2} />
    </group>
  )
}
