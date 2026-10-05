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

/** The signal, now physical: it runs along the floor from the screen to the footage wall. */
const FLOOR_SIGNAL: V3[] = [
  [0, ROOM.floorY + 0.05, ROOM.near - 0.5],
  [0, ROOM.floorY + 0.05, ROOM.far + 2],
]

/**
 * Scene 3 — software leaves the screen. A monitor-like surface of live
 * channels fills the frame; the camera pushes through it into a physical
 * room where LEDs respond to the same signal and the project footage plays.
 */
export function ScreenScene() {
  return (
    <>
      <SoftwareSurface />
      <Room />
    </>
  )
}

function SoftwareSurface() {
  const mesh = useRef<THREE.Mesh>(null)
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uOpacity: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform float uOpacity;
          varying vec2 vUv;
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
          void main() {
            float lines = 0.0;
            for (int k = 0; k < 8; k++) lines += channel(vUv, float(k));
            // A sweep cursor, like a monitor: fresh data bright, older data dim.
            float age = fract(fract(uTime * 0.07) - vUv.x);
            lines *= mix(1.0, 0.2, age);
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
  const project = getProject(copy.screen.projectId)
  const media = project.media[0]

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
      {media && <MediaPlane asset={media} height={6.2} presence="room" position={[0, 0.9, ROOM.far + 1.5]} />}
    </group>
  )
}
