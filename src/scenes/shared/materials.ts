import * as THREE from 'three'

export const COLORS = {
  bg: new THREE.Color('#07080a'),
  ink: new THREE.Color('#ecebe6'),
  /** Slightly warm white for the "physical world" half of the film. */
  warm: new THREE.Color('#f1e6d2'),
}

/**
 * Soft round points with optional twinkle. Additive, fog-aware, size
 * attenuated — used for the head cloud, data particles and dust.
 */
export function createPointsMaterial({
  color = COLORS.ink,
  size = 1,
  opacity = 1,
  twinkle = 0,
}: { color?: THREE.Color; size?: number; opacity?: number; twinkle?: number } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([
      THREE.UniformsLib.fog,
      {
        uColor: { value: color.clone() },
        uSize: { value: size },
        uOpacity: { value: opacity },
        uTwinkle: { value: twinkle },
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
    ]),
    vertexShader: /* glsl */ `
      uniform float uSize;
      uniform float uTime;
      uniform float uTwinkle;
      uniform float uPixelRatio;
      attribute float aPhase;
      varying float vAlpha;
      #include <fog_pars_vertex>
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = min(48.0, uSize * uPixelRatio * (24.0 / -mvPosition.z));
        vAlpha = 1.0 - uTwinkle * (0.5 + 0.5 * sin(uTime * 1.3 + aPhase * 6.2831));
        #include <fog_vertex>
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      #include <fog_pars_fragment>
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.05, d) * uOpacity * vAlpha;
        if (a < 0.003) discard;
        // Additive blending multiplies by alpha; fog mixes rgb toward the
        // near-black background, which reads as fading out with distance.
        gl_FragColor = vec4(uColor, a);
        #include <fog_fragment>
      }
    `,
    fog: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
}

/** Thin, fog-aware graybox line material. */
export function createLineMaterial(opacity = 0.35, color = COLORS.ink) {
  return new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
}

/** Gives every vertex a random phase for twinkle shaders. */
export function withPhase(geometry: THREE.BufferGeometry, rand: () => number) {
  const count = geometry.getAttribute('position').count
  const phase = new Float32Array(count)
  for (let i = 0; i < count; i++) phase[i] = rand()
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1))
  return geometry
}

/** Sets `opacity` on a material and keeps it out of the render list at zero. */
export function fade(material: THREE.Material, opacity: number) {
  material.opacity = opacity
  material.visible = opacity > 0.002
}
