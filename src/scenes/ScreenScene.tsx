import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getProject } from '../data/projects'
import { copy } from '../data/copy'
import { stage } from '../experience/director'
import { COLORS, createLineMaterial, fade } from './shared/materials'
import { MediaPlane } from './shared/MediaPlane'
import { SignalLine } from './shared/SignalLine'
import { usePresence } from './shared/usePresence'
import { ROOM, SCREEN, type V3 } from './world'

const LEDS_PER_WALL = 16

/**
 * The HABS Player product slot on the big screen (right half). The experiment
 * grid resolves into this frame and the real Player recording plays in it, so
 * its size follows the recording's aspect ratio. UV rect and world rect
 * describe the same area.
 */
const PLAYER_ASPECT = (() => {
  const teaser = getProject(copy.player.projectId).teaser
  return teaser && teaser.kind !== 'placeholder' ? teaser.aspect : 16 / 9
})()
const PLAYER_SLOT = (() => {
  const height = 5
  const width = height * PLAYER_ASPECT
  const x = 3.2
  return {
    x,
    width,
    height,
    uv: { cx: 0.5 + x / SCREEN.width, cy: 0.5, hx: width / 2 / SCREEN.width, hy: height / 2 / SCREEN.height },
  }
})()

/** The hackathon footage wall — the protagonist of the climax. */
export const FOOTAGE = { height: 7.2, y: 2.6 }

/** The signal, now physical: it runs along the floor from the screen to the footage wall. */
const FLOOR_SIGNAL: V3[] = [
  [0, ROOM.floorY + 0.05, ROOM.near - 0.5],
  [0, ROOM.floorY + 0.05, ROOM.far + 2],
]

/**
 * Scenes 3–4 — one screen, two beats. First it shows live channels, which
 * reorganise into a grid of experiments running on one system and then
 * narrow onto the real HABS Player recording. Then the camera pushes through
 * it into a physical room where LEDs respond to the signal and the hackathon
 * footage plays: the signal becomes an environment.
 */
export function ScreenScene() {
  const player = getProject(copy.player.projectId)
  return (
    <>
      <SoftwareSurface />
      {/* The real Player recording fills the product slot the grid resolves into; the shader draws its frame. */}
      {player.teaser && player.teaser.kind !== 'placeholder' && (
        <MediaPlane
          asset={player.teaser}
          height={PLAYER_SLOT.height}
          presence="player"
          loadWith="screen"
          frame="none"
          position={[PLAYER_SLOT.x, 0, SCREEN.z + 0.05]}
        />
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
          const vec2 SLOT_C = vec2(${PLAYER_SLOT.uv.cx.toFixed(4)}, ${PLAYER_SLOT.uv.cy.toFixed(4)});
          const vec2 SLOT_H = vec2(${PLAYER_SLOT.uv.hx.toFixed(4)}, ${PLAYER_SLOT.uv.hy.toFixed(4)});
          const vec2 CELLS = vec2(4.0, 3.0);
          float hash(vec2 p) { return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
          // Signed distance (in uv) to the product slot's edge: < 0 inside.
          float slotDist(vec2 uv) {
            vec2 d = abs(uv - SLOT_C) - SLOT_H;
            return max(d.x, d.y);
          }
          // The one live signal everything on this screen is drawn from. Global
          // time and a global x: the grid never restarts it, only reframes it.
          float wave(float x, float k) {
            return sin(x * 1.3 - uTime * 2.0 + k * 1.7) * 0.4
                 + sin(x * 3.1 + uTime * 2.7 + k) * 0.2
                 + sin(x * 8.3 - uTime * 5.0 + k * 2.3) * 0.1;
          }
          void main() {
            vec2 g = vUv * CELLS;
            vec2 cell = floor(g);
            vec2 f = fract(g);
            float seed = hash(cell);
            // Live channels → many experiments: each of the 9 channels glides
            // from its full-width lane into a lane of its tile row. Phase comes
            // only from time and position — the grid (scroll progress) moves
            // lanes and scales amplitude per tile, it never shifts the wave.
            float lines = 0.0;
            for (int i = 0; i < 9; i++) {
              float k = float(i);
              float row = floor(k / 3.0);
              float slot = k - row * 3.0;
              float base = mix((k + 0.5) / 9.0, (row + 0.3 + 0.2 * slot) / 3.0, uGrid);
              float amp = mix(0.026, 0.015 * mix(0.6, 1.3, seed), uGrid);
              float y = base + amp * wave(vUv.x * 36.0, k);
              lines += smoothstep(fwidth(vUv.y) * 1.1, 0.0, abs(vUv.y - y));
            }
            // A sweep cursor, like a monitor: fresh data bright, older data dim.
            // It keeps running through the change, so the system never stops.
            float age = fract(fract(uTime * 0.07) - vUv.x);
            lines *= mix(1.0, mix(0.2, 0.45, uGrid), age);
            // Tiles form around the lanes: gaps open, hairline borders draw in.
            float edge = min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y));
            float inTile = smoothstep(0.03, 0.07, edge);
            float border = 1.0 - smoothstep(0.0, fwidth(g.x) * 1.4, abs(edge - 0.05));
            // A few runs are live at any moment; the live set rotates, with soft fades.
            float k = cell.x + (2.0 - cell.y) * 4.0;
            float live = smoothstep(0.15, 0.6, 0.5 + 0.5 * sin(uTime * 0.55 - k * 1.9));
            lines *= mix(1.0, inTile * mix(0.3, 1.0, live), uGrid);
            lines += border * mix(0.18, 0.5, live) * uGrid;
            // …then attention narrows onto one product frame, where the real UI plays.
            float sd = slotDist(vUv);
            float inside = 1.0 - smoothstep(-0.004, 0.004, sd);
            lines *= mix(1.0, mix(0.22, 0.0, inside), uFocus);
            float frameD = abs(sd - 0.006);
            lines += (1.0 - smoothstep(0.0, fwidth(sd) * 1.5, frameD)) * uFocus * 0.9;
            vec2 px = vUv * vec2(32.0, 18.0);
            vec2 gd = abs(fract(px - 0.5) - 0.5) / fwidth(px);
            float grid = (1.0 - min(min(gd.x, gd.y), 1.0)) * (1.0 - inside * uFocus);
            vec3 col = mix(vec3(0.045, 0.047, 0.052), vec3(0.925, 0.92, 0.9), clamp(lines + grid * 0.05, 0.0, 1.0));
            // The slot turns transparent as attention lands on it: the recording behind shows unveiled.
            gl_FragColor = vec4(col, uOpacity * (1.0 - inside * uFocus));
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
      {/* The real hackathon footage is the protagonist: big, centred, high in frame, the text below it. */}
      {media && <MediaPlane asset={media} height={FOOTAGE.height} presence="room" frame="screen" position={[0, FOOTAGE.y, ROOM.far + 1.5]} />}
    </group>
  )
}
