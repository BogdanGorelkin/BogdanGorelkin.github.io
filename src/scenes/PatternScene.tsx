import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { mulberry32 } from '../lib/math'
import { bustGeometry } from './shared/bust'
import { boxEdges, roundedRectGeometry } from './shared/geometry'
import { createLineMaterial, createPointsMaterial, fade, withPhase } from './shared/materials'
import { SignalLine } from './shared/SignalLine'
import { NEXT_LINE, PATTERN, type V3 } from './world'

/** Live label anchors (human, hardware, software), read by SpatialLabels. */
export const PATTERN_ANCHORS: V3[] = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]

type Layout = {
  human: V3
  hardware: V3
  software: V3
  softwareScale: number
  /** Where the software's two paths leave its frame (left → human, right → hardware). */
  portLeft: V3
  portRight: V3
}

/**
 * Positions relative to PATTERN.center. Human and hardware are two worlds,
 * further back on either side; software sits in the foreground, between and
 * in front of them — the connective layer, and the protagonist.
 */
const LANDSCAPE: Layout = {
  human: [-19, -1, -18],
  hardware: [19, -1, -18],
  software: [0, -6, 16],
  softwareScale: 1,
  portLeft: [-6.6, -5, 16],
  portRight: [6.6, -5, 16],
}
/** Portrait: the two worlds high and apart, software large at the front, below them. */
const PORTRAIT: Layout = {
  human: [-8.5, 3, -20],
  hardware: [8.5, 2, -20],
  software: [0, -14, 14],
  softwareScale: 0.82,
  portLeft: [-5.4, -12.6, 14],
  portRight: [5.4, -12.6, 14],
}

const LABEL_DROP = 7.2
const SCREEN_W = 13
const SCREEN_H = 8

/**
 * The payoff: software is the tool that connects humans with the physical
 * world. Two motifs recalled from the film — a person (the figure of HABS and
 * MedTech) and hardware (headband, phone, module) — sit apart, further back.
 * Software (the Player's screen of runs) is in front. Its signal paths reach
 * out to both and draw them into one system; then one line is born from that
 * connection and runs on — it becomes the closing line of Contact.
 */
export function PatternScene() {
  const portrait = useThree((s) => s.size.width / s.size.height < 0.85)
  const L = portrait ? PORTRAIT : LANDSCAPE
  const root = useRef<THREE.Group>(null)
  const softwareRef = useRef<THREE.Group>(null)

  const geos = useMemo(
    () => ({
      human: bustGeometry(3600, new THREE.Matrix4().makeRotationY(Math.PI / 2).multiply(new THREE.Matrix4().makeScale(3.1, 3.1, 3.1)), 17),
      band: new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, 2.6, 2.2).getPoints(96).map((p) => new THREE.Vector3(p.x, 0, p.y))),
      phone: roundedRectGeometry(2, 4, 0.26),
      module: boxEdges(1.8, 1.8, 1.8),
      screen: roundedRectGeometry(SCREEN_W, SCREEN_H, 0.3),
      tiles: tileGeometry(SCREEN_W, SCREEN_H),
      packets: withPhase(new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(new Float32Array(PACKETS * 3), 3)), mulberry32(4)),
    }),
    [],
  )

  // The software's paths: out of its frame, up to each world. Same curve for the
  // signal ribbon and for the packets that ride it.
  const paths = useMemo(() => {
    // To the person's near ear — where a sensor sits — arcing outward so it never crosses the face.
    const toHuman: V3[] = [L.portLeft, mid(L.portLeft, L.human, 3, 4), [L.human[0] - 0.2, L.human[1] - 0.3, L.human[2] + 2.5]]
    const toHardware: V3[] = [L.portRight, mid(L.portRight, L.hardware, -3, 4), [L.hardware[0] - 2.4, L.hardware[1] - 1.2, L.hardware[2]]]
    // Born from the connection: one line runs on and becomes the closing line.
    const [cx, cy, cz] = PATTERN.center
    const nextStart: V3 = [NEXT_LINE.from - cx, NEXT_LINE.y - cy, NEXT_LINE.z - cz]
    const onward: V3[] = [
      [L.software[0] + SCREEN_W * 0.5 * L.softwareScale, L.software[1] - 1.6, L.software[2]],
      [L.software[0] + 40, L.software[1] - 10, L.software[2] - 4],
      [nextStart[0] - 40, nextStart[1] + 4, nextStart[2]],
      nextStart,
    ]
    const curve = (pts: V3[]) =>
      new THREE.CatmullRomCurve3(
        pts.map((p) => new THREE.Vector3(...p)),
        false,
        'centripetal',
      )
    return {
      toHuman,
      toHardware,
      onward,
      curves: { toHuman: curve(toHuman), toHardware: curve(toHardware) },
    }
  }, [L])

  const mats = useMemo(
    () => ({
      human: createPointsMaterial({ size: 1.5, opacity: 0.5, twinkle: 0.3 }),
      hardware: createLineMaterial(0.8),
      software: createLineMaterial(0.95),
      tiles: createLineMaterial(0.4),
      packets: createPointsMaterial({ size: 3.4, opacity: 1, twinkle: 0.2 }),
    }),
    [],
  )
  const tmp = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const g = root.current
    if (!g) return
    const p = stage.presence.pattern
    g.visible = p > 0.002
    if (!g.visible) return

    const links = stage.patternLinks
    const c = stage.converge
    // The two worlds come forward as the software reaches them; software swells slightly.
    const worlds = 0.6 + 0.4 * links
    softwareRef.current?.scale.setScalar(L.softwareScale * (1 + 0.06 * links))

    const [ox, oy, oz] = PATTERN.center
    const anchor = (i: number, v: V3, drop: number) => {
      PATTERN_ANCHORS[i]![0] = ox + v[0]
      PATTERN_ANCHORS[i]![1] = oy + v[1] - drop
      PATTERN_ANCHORS[i]![2] = oz + v[2]
    }
    anchor(0, L.human, LABEL_DROP + 2.4)
    anchor(1, L.hardware, LABEL_DROP)
    anchor(2, L.software, (SCREEN_H / 2) * L.softwareScale + 2)

    // Packets: from the person, through the software, out to the hardware — one system.
    const packets = geos.packets.getAttribute('position') as THREE.BufferAttribute
    const { toHuman, toHardware } = paths.curves
    for (let k = 0; k < PACKETS; k++) {
      const f = (stage.clock * 0.16 + k / PACKETS) % 1
      // First half: human → software (reverse along toHuman); second half: software → hardware.
      if (f < 0.5) toHuman.getPoint(1 - f * 2, tmp)
      else toHardware.getPoint((f - 0.5) * 2, tmp)
      packets.setXYZ(k, tmp.x, tmp.y, tmp.z)
    }
    packets.needsUpdate = true

    mats.human.uniforms.uTime!.value = stage.clock
    mats.human.uniforms.uOpacity!.value = 0.5 * p * worlds
    fade(mats.hardware, 0.8 * p * worlds)
    fade(mats.software, 0.95 * p)
    fade(mats.tiles, (0.4 + 0.25 * c) * p)
    mats.packets.uniforms.uOpacity!.value = p * links
    mats.packets.uniforms.uTime!.value = stage.clock
  })

  return (
    <>
      <group ref={root} position={PATTERN.center}>
        {/* Human — the figure of HABS and MedTech, turned toward the software. */}
        <points geometry={geos.human} material={mats.human} position={L.human} />
        {/* Hardware — headband, phone, module: devices from three chapters. */}
        <group position={L.hardware}>
          <group position={[-3.6, 1.8, 0]} rotation-x={0.5}>
            <lineLoop geometry={geos.band} material={mats.hardware} />
          </group>
          <lineLoop geometry={geos.phone} material={mats.hardware} position={[0.8, -0.4, 0]} />
          <lineSegments geometry={geos.module} material={mats.hardware} position={[4.4, -1.6, 0]} rotation={[0.4, 0.6, 0]} />
        </group>
        {/* Software — in front: the Player's screen of runs, with a live trace. */}
        <group ref={softwareRef} position={L.software} rotation-x={-0.1}>
          <lineLoop geometry={geos.screen} material={mats.software} />
          <lineSegments geometry={geos.tiles} material={mats.tiles} />
          <SignalLine points={TRACE} samples={140} presence="pattern" amplitude={0.4} waveScale={3} />
        </group>
        <SignalLine points={paths.toHuman} samples={160} presence="pattern" amplitude={0.32} waveScale={1.6} reveal={() => stage.patternLinks} />
        <SignalLine points={paths.toHardware} samples={160} presence="pattern" amplitude={0.32} waveScale={1.6} reveal={() => stage.patternLinks} />
        <points geometry={geos.packets} material={mats.packets} frustumCulled={false} />
      </group>
      {/* Outside the pattern group and lit by 'next', so it stays on as the camera leaves for Contact;
        it only exists once the connection is made, and calms into the closing line. */}
      <group position={PATTERN.center}>
        <SignalLine points={paths.onward} samples={420} presence="next" amplitude={0.3} waveScale={0.8} calmable reveal={() => stage.converge} />
      </group>
    </>
  )
}

const PACKETS = 10

const TRACE: V3[] = [
  [-SCREEN_W * 0.4, SCREEN_H * 0.28, 0.05],
  [SCREEN_W * 0.4, SCREEN_H * 0.28, 0.05],
]

/** A point between `a` and `b`, pushed sideways and up so the path arcs. */
function mid(a: V3, b: V3, dx: number, dy: number): V3 {
  return [(a[0] + b[0]) / 2 + dx, (a[1] + b[1]) / 2 + dy, (a[2] + b[2]) / 2]
}

/** A 2 × 2 grid of run tiles in the lower part of the software screen. */
function tileGeometry(w: number, h: number) {
  const v: number[] = []
  const pad = 0.6
  const top = h * 0.1
  const tw = (w - pad * 3) / 2
  const th = (h / 2 + top - pad * 3) / 2
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
