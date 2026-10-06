import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { stage, type PresenceKey } from '../../experience/director'
import { mulberry32 } from '../../lib/math'
import { createPointsMaterial, withPhase } from './materials'
import { usePresence } from './usePresence'

const LUT_SIZE = 160

/**
 * Data packets flowing along curves. Each curve is pre-sampled into a small
 * lookup table, so per-frame cost is a lerp per particle — no arc-length
 * maths in the loop.
 */
export function StreamParticles({
  curves,
  perCurve,
  presence,
  size = 1.6,
  speed = 1,
}: {
  curves: THREE.Curve<THREE.Vector3>[]
  perCurve: number
  presence: PresenceKey
  size?: number
  /** Multiplier on travel speed. */
  speed?: number
}) {
  const ref = useRef<THREE.Points>(null)

  const { geometry, luts, seeds } = useMemo(() => {
    const rand = mulberry32(5)
    const luts = curves.map((c) => c.getSpacedPoints(LUT_SIZE - 1).flatMap((p) => [p.x, p.y, p.z]))
    const count = curves.length * perCurve
    const seeds = Array.from({ length: count }, (_, i) => ({
      curve: i % curves.length,
      offset: rand(),
      speed: 0.035 + rand() * 0.05,
    }))
    const g = new THREE.BufferGeometry()
    const attr = new THREE.BufferAttribute(new Float32Array(count * 3), 3)
    attr.setUsage(THREE.DynamicDrawUsage)
    g.setAttribute('position', attr)
    withPhase(g, rand)
    return { geometry: g, luts, seeds }
  }, [curves, perCurve])

  const material = useMemo(() => createPointsMaterial({ size, opacity: 0.9, twinkle: 0.3 }), [size])

  usePresence(presence, ref, (p) => {
    const t = stage.clock
    const arr = geometry.getAttribute('position') as THREE.BufferAttribute
    const out = arr.array as Float32Array
    seeds.forEach((s, i) => {
      const lut = luts[s.curve]!
      const f = (((s.offset + t * s.speed * speed) % 1) + 1) % 1
      const x = f * (LUT_SIZE - 1)
      const k = Math.floor(x)
      const u = x - k
      const a = k * 3
      const b = Math.min(LUT_SIZE - 1, k + 1) * 3
      out[i * 3] = lut[a]! + (lut[b]! - lut[a]!) * u
      out[i * 3 + 1] = lut[a + 1]! + (lut[b + 1]! - lut[a + 1]!) * u
      out[i * 3 + 2] = lut[a + 2]! + (lut[b + 2]! - lut[a + 2]!) * u
    })
    arr.needsUpdate = true
    material.uniforms.uTime!.value = t
    material.uniforms.uOpacity!.value = 0.9 * p
  })

  return <points ref={ref} geometry={geometry} material={material} frustumCulled={false} />
}
