import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { mulberry32 } from '../lib/math'
import { boxEdges, roundedRectGeometry } from './shared/geometry'
import { createLineMaterial, createPointsMaterial, fade, withPhase } from './shared/materials'
import { SignalLine } from './shared/SignalLine'
import { PATTERN, type V3 } from './world'

/** Live label anchors (human, hardware, software), read by SpatialLabels. */
export const PATTERN_ANCHORS: V3[] = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]

/** Motif offsets from PATTERN.center: a row on wide screens, a column on portrait. */
const LANDSCAPE: [number, number][] = [
  [-PATTERN.spread, -4],
  [0, -5],
  [PATTERN.spread, -4],
]
const PORTRAIT: [number, number][] = [
  [0, 7],
  [0, -7 - PATTERN.spreadPortrait * 0.15],
  [0, -10 - PATTERN.spreadPortrait],
]
const LABEL_DROP = 6.2

/**
 * The payoff. Three motifs recalled from the film — a human (the point-cloud
 * figure of HABS and MedTech), hardware (headband, phone, module) and software
 * (the Player's screen of runs) — connect into one loop, then converge into a
 * single point that becomes the closing line.
 */
export function PatternScene() {
  const root = useRef<THREE.Group>(null)
  const motifs = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)]
  const tmp = useMemo(() => ({ a: new THREE.Vector3(), positions: [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()] }), [])

  const geos = useMemo(
    () => ({
      human: humanGeometry(),
      band: new THREE.BufferGeometry().setFromPoints(
        new THREE.EllipseCurve(0, 0, 1.9, 1.6).getPoints(96).map((p) => new THREE.Vector3(p.x, 0, p.y)),
      ),
      phone: roundedRectGeometry(1.5, 3, 0.2),
      module: boxEdges(1.3, 1.3, 1.3),
      screen: roundedRectGeometry(9, 5.6, 0.25),
      tiles: tileGeometry(9, 5.6),
      links: new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(18), 3)),
      packets: withPhase(
        new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(9 * 3), 3)),
        mulberry32(4),
      ),
      core: withPhase(new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3)), mulberry32(9)),
    }),
    [],
  )

  const mats = useMemo(
    () => ({
      human: createPointsMaterial({ size: 1.6, opacity: 0.7, twinkle: 0.4 }),
      hardware: createLineMaterial(0.9),
      software: createLineMaterial(0.85),
      tiles: createLineMaterial(0.35),
      links: createLineMaterial(0.35),
      packets: createPointsMaterial({ size: 3.2, opacity: 1, twinkle: 0.2 }),
      core: createPointsMaterial({ size: 60, opacity: 1, twinkle: 0 }),
    }),
    [],
  )

  const trace = useMemo<V3[]>(
    () => [
      [-3.6, 1.4, 0.05],
      [3.6, 1.4, 0.05],
    ],
    [],
  )

  useFrame(({ size }) => {
    const g = root.current
    if (!g) return
    const p = stage.presence.pattern
    g.visible = p > 0.002
    if (!g.visible) return

    const c = stage.converge
    const layout = size.width / size.height < 0.85 ? PORTRAIT : LANDSCAPE
    const [cx, cy, cz] = PATTERN.center
    // Converge toward the middle of the composition.
    const tx = cx + (layout[0]![0] + layout[2]![0]) / 3
    const ty = cy + (layout[0]![1] + layout[1]![1] + layout[2]![1]) / 3
    motifs.forEach((ref, i) => {
      const [ox, oy] = layout[i]!
      const pos = tmp.positions[i]!.set(cx + ox, cy + oy, cz).lerp(tmp.a.set(tx, ty, cz), c)
      ref.current?.position.copy(pos)
      ref.current?.scale.setScalar(1 - 0.85 * c)
      PATTERN_ANCHORS[i]![0] = pos.x
      PATTERN_ANCHORS[i]![1] = pos.y - LABEL_DROP
      PATTERN_ANCHORS[i]![2] = pos.z
    })

    // The loop: human → hardware → software → human, with a packet travelling each edge.
    const links = geos.links.getAttribute('position') as THREE.BufferAttribute
    const packets = geos.packets.getAttribute('position') as THREE.BufferAttribute
    for (let e = 0; e < 3; e++) {
      const a = tmp.positions[e]!
      const b = tmp.positions[(e + 1) % 3]!
      links.setXYZ(e * 2, a.x, a.y, a.z)
      links.setXYZ(e * 2 + 1, b.x, b.y, b.z)
      for (let k = 0; k < 3; k++) {
        const f = (stage.clock * 0.35 + k / 3 + e * 0.11) % 1
        tmp.a.copy(a).lerp(b, f)
        packets.setXYZ(e * 3 + k, tmp.a.x, tmp.a.y, tmp.a.z)
      }
    }
    links.needsUpdate = true
    packets.needsUpdate = true
    ;(geos.core.getAttribute('position') as THREE.BufferAttribute).setXYZ(0, tx, ty, cz)
    geos.core.getAttribute('position').needsUpdate = true

    const fadeOut = 1 - 0.6 * c
    mats.human.uniforms.uTime!.value = stage.clock
    mats.human.uniforms.uOpacity!.value = 0.7 * p * fadeOut
    fade(mats.hardware, 0.9 * p * fadeOut)
    fade(mats.software, 0.85 * p * fadeOut)
    fade(mats.tiles, 0.35 * p * fadeOut)
    const linkLevel = stage.patternLinks * (1 - c) * p
    fade(mats.links, 0.35 * linkLevel)
    mats.packets.uniforms.uOpacity!.value = linkLevel
    mats.packets.uniforms.uTime!.value = stage.clock
    mats.core.uniforms.uOpacity!.value = c * p
  })

  return (
    <group ref={root}>
      {/* Human — the figure language of HABS and MedTech. */}
      <group ref={motifs[0]}>
        <points geometry={geos.human} material={mats.human} />
      </group>
      {/* Hardware — headband, phone, module: devices from three chapters. */}
      <group ref={motifs[1]}>
        <group position={[-3, 1.4, 0]} rotation-x={0.5}>
          <lineLoop geometry={geos.band} material={mats.hardware} />
        </group>
        <lineLoop geometry={geos.phone} material={mats.hardware} position={[0.6, -0.2, 0]} />
        <lineSegments geometry={geos.module} material={mats.hardware} position={[3.4, -1.2, 0]} rotation={[0.4, 0.6, 0]} />
      </group>
      {/* Software — the Player's screen of runs. */}
      <group ref={motifs[2]}>
        <lineLoop geometry={geos.screen} material={mats.software} />
        <lineSegments geometry={geos.tiles} material={mats.tiles} />
        <SignalLine points={trace} samples={120} presence="pattern" amplitude={0.35} waveScale={3} />
      </group>
      <lineSegments geometry={geos.links} material={mats.links} frustumCulled={false} />
      <points geometry={geos.packets} material={mats.packets} frustumCulled={false} />
      <points geometry={geos.core} material={mats.core} frustumCulled={false} />
    </group>
  )
}

/** Head and shoulders as points — the same figure language as earlier chapters. */
function humanGeometry() {
  const rand = mulberry32(17)
  const n = 1400
  const pos = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    if (i < n * 0.45) {
      const u = rand() * 2 - 1
      const a = rand() * Math.PI * 2
      const r = Math.sqrt(1 - u * u)
      pos.set([Math.cos(a) * r * 1.5, 1.6 + u * 1.8, Math.sin(a) * r * 1.5], i * 3)
    } else {
      const t = rand()
      const a = rand() * Math.PI * 2
      const w = 1.0 + Math.sqrt(t) * 2.4
      pos.set([Math.cos(a) * w, -0.4 - t * 3, Math.sin(a) * w * 0.55], i * 3)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  return withPhase(g, rand)
}

/** A 2 × 2 grid of run tiles inside the software screen. */
function tileGeometry(w: number, h: number) {
  const v: number[] = []
  const pad = 0.5
  const tw = (w - pad * 3) / 2
  const th = (h - pad * 3) / 2
  for (let r = 0; r < 2; r++)
    for (let c = 0; c < 2; c++) {
      const x0 = -w / 2 + pad + c * (tw + pad)
      const y0 = -h / 2 + pad + r * (th + pad)
      const x1 = x0 + tw
      const y1 = y0 + th
      v.push(x0, y0, 0, x1, y0, 0, x1, y0, 0, x1, y1, 0, x1, y1, 0, x0, y1, 0, x0, y1, 0, x0, y0, 0)
    }
  return new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
}
