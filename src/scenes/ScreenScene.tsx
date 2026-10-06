import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getProject, moments } from '../data/projects'
import { copy } from '../data/copy'
import { stage } from '../experience/director'
import { COLORS, createLineMaterial, fade } from './shared/materials'
import { MediaPlane } from './shared/MediaPlane'
import { SignalLine } from './shared/SignalLine'
import { usePresence } from './shared/usePresence'
import { ROOM, SCREEN, type V3 } from './world'

const LEDS_PER_WALL = 16

/**
 * The HABS Player product slot on the big screen: the right half (16:9).
 * The experiment grid resolves into this frame; a real UI recording plays here.
 * UV rect and world rect describe the same area.
 */
const PLAYER_SLOT = { uv: { cx: 0.7, cy: 0.5, hx: 0.25, hy: 0.25 }, x: 3.2, width: 8, height: 4.5 }

/** The hackathon footage wall — the protagonist of the climax. */
export const FOOTAGE = { height: 7.2, y: 2.6 }

/** The signal, now physical: it runs along the floor from the screen to the footage wall. */
const FLOOR_SIGNAL: V3[] = [
  [0, ROOM.floorY + 0.05, ROOM.near - 0.5],
  [0, ROOM.floorY + 0.05, ROOM.far + 2],
]

/**
 * Scenes 3–4 — one screen, two beats. First it shows live channels, then a
 * grid of experiments running on one system (HABS Player). Then the camera
 * pushes through it into a physical room where LEDs respond to the signal
 * and the hackathon footage plays: software leaves the screen.
 */
export function ScreenScene() {
  const player = getProject(copy.player.projectId)
  return (
    <>
      <SoftwareSurface />
      {/* A real Player recording, once provided, fills the product slot the grid resolves into. */}
      {player.teaser && player.teaser.kind !== 'placeholder' && (
        <MediaPlane asset={player.teaser} height={PLAYER_SLOT.height} presence="player" position={[PLAYER_SLOT.x, 0, SCREEN.z + 0.05]} />
      )}
      <Room />
    </>
  )
}

function SoftwareSurface() {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 }, uGrid: { value: 0 }, uFocus: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform float uOpacity;
          uniform float uGrid;
          uniform float uFocus;
          varying vec2 vUv;
          const vec2 SLOT_C = vec2(${PLAYER_SLOT.uv.cx.toFixed(3)}, ${PLAYER_SLOT.uv.cy.toFixed(3)});
          const vec2 SLOT_H = vec2(${PLAYER_SLOT.uv.hx.toFixed(3)}, ${PLAYER_SLOT.uv.hy.toFixed(3)});
          // Signed distance (in uv) to the product slot's edge: < 0 inside.
          float slotDist(vec2 uv) {
            vec2 d = abs(uv - SLOT_C) - SLOT_H;
            return max(d.x, d.y);
          }
          // One channel of a multi-channel recording, drawn as an anti-aliased hairline.
          float channel(vec2 uv, float k) {
            float base = (k + 0.5) / 8.0;
            float x = uv.x * 36.0;
            float y = base + 0.028 * (sin(x * 1.3 - uTime * 2.0 + k * 1.7) * 0.4
                                    + sin(x * 3.1 + uTime * 2.7 + k) * 0.2
                                    + sin(x * 8.3 - uTime * 5.0 + k * 2.3) * 0.1);
            float w = fwidth(uv.y) * 1.1;
            return smoothstep(w, 0.0, abs(uv.y - y));
          }
          // HABS Player: one system, many experiments. A 4×3 grid of runs; a few
          // are live at any moment and the live set keeps rotating.
          float experiments(vec2 uv) {
            vec2 g = uv * vec2(4.0, 3.0);
            vec2 id = floor(g);
            vec2 f = fract(g);
            float k = id.x + (2.0 - id.y) * 4.0;
            float edge = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y)) - 0.05;
            float border = 1.0 - smoothstep(0.0, fwidth(g.x) * 1.4, abs(edge));
            float traces = 0.0;
            for (int j = 0; j < 3; j++) {
              float fj = float(j);
              float y = 0.3 + 0.2 * fj + 0.045 * sin(f.x * 15.0 - uTime * 2.4 + k * 1.3 + fj * 2.1) * sin(f.x * 4.0 + k);
              traces += smoothstep(fwidth(f.y) * 1.2, 0.0, abs(f.y - y)) * step(0.1, f.x) * step(f.x, 0.9);
            }
            float live = step(mod(uTime * 1.2 - k, 12.0), 4.0);
            return border * mix(0.25, 0.7, live) + traces * mix(0.15, 1.0, live);
          }
          void main() {
            float lines = 0.0;
            for (int k = 0; k < 8; k++) lines += channel(vUv, float(k));
            // A sweep cursor, like a monitor: fresh data bright, older data dim.
            float age = fract(fract(uTime * 0.07) - vUv.x);
            lines *= mix(1.0, 0.2, age);
            // Player: many runs on one system… which resolve into one product frame.
            float sd = slotDist(vUv);
            float inside = step(sd, 0.0);
            float runs = experiments(vUv) * mix(1.0, mix(0.2, 0.0, inside), uFocus);
            float slotEdge = (1.0 - smoothstep(0.0, fwidth(sd) * 1.5, abs(sd))) * uFocus;
            lines = mix(lines, runs + slotEdge * 0.85, uGrid);
            vec2 cell = vUv * vec2(32.0, 18.0);
            vec2 gd = abs(fract(cell - 0.5) - 0.5) / fwidth(cell);
            float grid = 1.0 - min(min(gd.x, gd.y), 1.0);
            vec3 col = mix(vec3(0.045, 0.047, 0.052), vec3(0.925, 0.92, 0.9), clamp(lines + grid * 0.05, 0.0, 1.0));
            gl_FragColor = vec4(col, uOpacity);
          }
        `,
        transparent: true,
        depthWrite: false,
      }),
    [],
  )
  const frame = useMemo(() => createLineMaterial(0.6), [])
  const frameGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(SCREEN.width + 0.3, SCREEN.height + 0.3)), [])

  usePresence('screen', mesh, (p) => {
    material.uniforms.uTime!.value = stage.clock
    material.uniforms.uOpacity!.value = 0.94 * p
    material.uniforms.uGrid!.value = stage.playerGrid
    material.uniforms.uFocus!.value = stage.playerFocus
    fade(frame, 0.6 * p)
  })

  return (
    <mesh ref={mesh} position={[0, 0, SCREEN.z]} material={material}>
      <planeGeometry args={[SCREEN.width, SCREEN.height]} />
      <lineSegments geometry={frameGeo} material={frame} />
    </mesh>
  )
}

function Room() {
  const group = useRef<THREE.Group>(null)
  const leds = useRef<THREE.InstancedMesh>(null)
  const media = getProject(copy.screen.projectId).teaser

  const floor = useMemo(() => {
    const v: number[] = []
    const y = ROOM.floorY
    for (let x = -ROOM.halfWidth; x <= ROOM.halfWidth + 0.01; x += 1.5) v.push(x, y, ROOM.near, x, y, ROOM.far)
    for (let z = ROOM.near; z >= ROOM.far - 0.01; z -= 1.5) v.push(-ROOM.halfWidth, y, z, ROOM.halfWidth, y, z)
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3))
    return g
  }, [])
  const floorMat = useMemo(() => createLineMaterial(0.2), [])
  const ledMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ffffff', toneMapped: false }), [])
  const ledGeo = useMemo(() => new THREE.BoxGeometry(0.07, 2.8, 0.07), [])

  const positions = useMemo(() => {
    const m = new THREE.Matrix4()
    return Array.from({ length: LEDS_PER_WALL * 2 }, (_, i) => {
      const side = i < LEDS_PER_WALL ? -1 : 1
      const k = i % LEDS_PER_WALL
      const z = ROOM.near - 4 - (k / (LEDS_PER_WALL - 1)) * (ROOM.near - ROOM.far - 8)
      return { matrix: m.makeTranslation(side * ROOM.halfWidth, ROOM.floorY + 1.6, z).clone(), z }
    })
  }, [])

  const color = useMemo(() => new THREE.Color(), [])
  usePresence('room', group, (p) => {
    const mesh = leds.current
    if (!mesh) return
    const light = stage.roomLight * p
    fade(floorMat, 0.2 * (0.3 + 0.7 * light) * p)
    positions.forEach(({ z }, i) => {
      // A wave of activity travels down the room — the signal, made physical.
      const w = 0.5 + 0.5 * Math.sin(z * 0.45 + stage.clock * 3.2 + (i < LEDS_PER_WALL ? 0 : 1.3))
      color.copy(COLORS.warm).multiplyScalar(0.06 + light * (0.25 + 0.75 * w * w) + stage.ledBurst * 1.4)
      mesh.setColorAt(i, color)
    })
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <group ref={group}>
      <lineSegments geometry={floor} material={floorMat} />
      <SignalLine points={FLOOR_SIGNAL} samples={500} presence="room" amplitude={0.22} />
      <instancedMesh
        ref={(mesh) => {
          leds.current = mesh
          if (!mesh) return
          positions.forEach(({ matrix }, i) => mesh.setMatrixAt(i, matrix))
          mesh.instanceMatrix.needsUpdate = true
        }}
        args={[ledGeo, ledMat, positions.length]}
      />
      {/* The footage is the protagonist: big, centred, high in frame so the text sits below it. */}
      {media && <MediaPlane asset={media} height={FOOTAGE.height} presence="room" position={[0, FOOTAGE.y, ROOM.far + 1.5]} />}
      {/* Bogdan at the event — a smaller documentary moment beside the footage. */}
      <MediaPlane
        asset={moments.hackathon.media}
        height={3.4}
        presence="room"
        opacity={0.85}
        position={[8.1, 0.4, ROOM.far + 3.2]}
        rotation-y={-0.3}
      />
    </group>
  )
}
