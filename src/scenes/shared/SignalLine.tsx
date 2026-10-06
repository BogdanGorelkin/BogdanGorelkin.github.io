import { useMemo, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { stage, type PresenceKey } from '../../experience/director'
import type { V3 } from '../world'
import { usePresence } from './usePresence'
import { COLORS } from './materials'

/**
 * The signal: a screen-space ribbon along a curve, displaced on the GPU by
 * a procedural EEG-like waveform. A thin core + a wide soft halo share one
 * geometry. Width is in CSS pixels, so it stays a hairline at any distance.
 */
const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uCalm;
  uniform float uLength;
  uniform float uWaveScale;
  uniform float uStep;
  uniform float uWidth;
  uniform vec2 uResolution;
  attribute vec3 aPrev;
  attribute vec3 aNext;
  attribute float aSide;
  attribute float aS;
  varying float vS;
  varying float vSide;
  #include <fog_pars_vertex>

  float wave(float s) {
    float x = s * uLength * uWaveScale;
    float t = uTime;
    float eeg = sin(x * 1.7 - t * 2.1) * 0.42
              + sin(x * 4.3 + t * 3.3) * 0.2
              + sin(x * 9.1 - t * 5.2) * 0.09
              + sin(x * 0.53 + t * 0.6) * 0.3;
    // Bursts of faster activity drifting along the line.
    float burst = smoothstep(0.62, 1.0, 0.5 + 0.5 * sin(x * 0.11 - t * 0.9));
    eeg += sin(x * 13.0 - t * 9.0) * 0.35 * burst;
    // Calm mode: near-flat, with one slow travelling blip.
    float bx = x - (100.0 + mod(t * 8.0, 40.0));
    float blip = exp(-bx * bx * 0.8) * sin(bx * 3.0) * 1.4;
    float ends = smoothstep(0.0, 0.04, s) * smoothstep(1.0, 0.96, s);
    return mix(eeg, blip, uCalm) * ends;
  }

  vec4 project(vec3 p, float s) {
    p.y += wave(s) * uAmp;
    return projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }

  void main() {
    vec4 cp = project(position, aS);
    vec4 pp = project(aPrev, max(0.0, aS - uStep));
    vec4 np = project(aNext, min(1.0, aS + uStep));

    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 sc = cp.xy / cp.w * aspect;
    vec2 sp = pp.xy / pp.w * aspect;
    vec2 sn = np.xy / np.w * aspect;
    vec2 dir = normalize(sn - sp + 1e-6);
    vec2 normal = vec2(-dir.y, dir.x) / aspect;

    // Vertices behind the camera keep zero width so near-plane crossings don't flare.
    if (cp.w > 0.0 && pp.w > 0.0 && np.w > 0.0) {
      cp.xy += normal * aSide * (uWidth / uResolution.y) * cp.w;
    }
    gl_Position = cp;

    vS = aS;
    vSide = aSide;
    vec3 displaced = position;
    displaced.y += wave(aS) * uAmp;
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    #include <fog_vertex>
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uReveal;
  uniform float uSoftness;
  uniform float uTime;
  uniform float uPulse;
  varying float vS;
  varying float vSide;
  #include <fog_pars_fragment>

  void main() {
    if (vS > uReveal) discard;
    float edge = pow(1.0 - abs(vSide), uSoftness);
    float tip = smoothstep(uReveal, uReveal - 0.004, vS);
    // A bright packet travelling along the line — something to follow.
    float d = vS - fract(uTime * 0.045);
    float pulse = exp(-d * d * 2600.0) * uPulse;
    float a = edge * tip * uOpacity * (1.0 + pulse * 3.0);
    gl_FragColor = vec4(uColor, a);
    #include <fog_fragment>
  }
`

type Props = {
  points: V3[]
  samples: number
  presence: PresenceKey
  /** World-unit amplitude before stage modulation. */
  amplitude: number
  /** Draw-on reveal driven by the timed intro. */
  intro?: boolean
  /** Follow `stage.calm` (the closing bookend). */
  calmable?: boolean
  /** Wave frequency multiplier — < 1 for lines seen from very far away. */
  waveScale?: number
}

export function SignalLine({ points, samples, presence, amplitude, intro, calmable, waveScale = 1 }: Props) {
  const group = useRef<THREE.Group>(null)
  const size = useThree((s) => s.size)

  const { geometry, length } = useMemo(() => buildRibbon(points, samples), [points, samples])
  const core = useMemo(() => createRibbonMaterial(1.1, 1, 0.6), [])
  const halo = useMemo(() => createRibbonMaterial(9, 0.14, 2.2), [])

  usePresence(presence, group, (p) => {
    const reveal = intro ? Math.max(stage.intro, Math.min(1, stage.time * 2.2)) : 1
    const calm = calmable ? stage.calm : 0
    for (const [m, base] of [
      [core, 1],
      [halo, 0.14],
    ] as const) {
      const u = m.uniforms
      u.uTime!.value = stage.clock
      u.uAmp!.value = amplitude * (calmable ? 1 : stage.signalAmp)
      u.uCalm!.value = calm
      u.uLength!.value = length
      u.uWaveScale!.value = waveScale
      u.uStep!.value = 1 / (samples - 1)
      u.uReveal!.value = reveal
      u.uOpacity!.value = base * p
      ;(u.uResolution!.value as THREE.Vector2).set(size.width, size.height)
    }
  })

  return (
    <group ref={group}>
      <mesh geometry={geometry} material={halo} frustumCulled={false} renderOrder={1} />
      <mesh geometry={geometry} material={core} frustumCulled={false} renderOrder={2} />
    </group>
  )
}

function createRibbonMaterial(width: number, opacity: number, softness: number) {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uColor: { value: COLORS.ink.clone() },
        uOpacity: { value: opacity },
        uWidth: { value: width },
        uSoftness: { value: softness },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uTime: { value: 0 },
        uAmp: { value: 0.3 },
        uCalm: { value: 0 },
        uLength: { value: 1 },
        uWaveScale: { value: 1 },
        uStep: { value: 0.001 },
        uReveal: { value: 1 },
        uPulse: { value: 1 },
      },
    ]),
    vertexShader,
    fragmentShader,
    fog: true,
    transparent: true,
    depthWrite: false,
    // The ribbon is expanded in screen space, so its winding flips with view direction.
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  })
}

function buildRibbon(points: V3[], samples: number) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
    false,
    'centripetal',
  )
  const pts = curve.getSpacedPoints(samples - 1)
  const n = pts.length
  const position = new Float32Array(n * 6)
  const prev = new Float32Array(n * 6)
  const next = new Float32Array(n * 6)
  const side = new Float32Array(n * 2)
  const s = new Float32Array(n * 2)
  const index: number[] = []

  for (let i = 0; i < n; i++) {
    const c = pts[i]!
    const a = pts[Math.max(0, i - 1)]!
    const b = pts[Math.min(n - 1, i + 1)]!
    for (let k = 0; k < 2; k++) {
      const v = i * 2 + k
      c.toArray(position, v * 3)
      a.toArray(prev, v * 3)
      b.toArray(next, v * 3)
      side[v] = k === 0 ? -1 : 1
      s[v] = i / (n - 1)
    }
    if (i < n - 1) {
      const o = i * 2
      index.push(o, o + 1, o + 2, o + 1, o + 3, o + 2)
    }
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(position, 3))
  geometry.setAttribute('aPrev', new THREE.BufferAttribute(prev, 3))
  geometry.setAttribute('aNext', new THREE.BufferAttribute(next, 3))
  geometry.setAttribute('aSide', new THREE.BufferAttribute(side, 1))
  geometry.setAttribute('aS', new THREE.BufferAttribute(s, 1))
  geometry.setIndex(index)
  return { geometry, length: curve.getLength() }
}
