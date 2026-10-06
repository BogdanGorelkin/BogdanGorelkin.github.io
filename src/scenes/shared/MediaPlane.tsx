import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree, type ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'
import type { MediaAsset } from '../../data/types'
import { useExperience } from '../../experience/context'
import { stage, type PresenceKey } from '../../experience/director'
import { placeholderTexture } from './placeholderTexture'
import { roundedRectGeometry } from './geometry'
import { createLineMaterial, fade } from './materials'

/**
 * How the surface is dressed — each real piece of media gets the frame that
 * suits it, so planes don't all look alike:
 * - `hairline`: a thin outline (documentary frame)
 * - `screen`:   a double outline, for footage presented as a projected screen
 * - `device`:   a rounded bezel, for footage that was itself a phone / device view
 * - `none`:     frameless, a window straight into the footage
 */
export type MediaFrame = 'hairline' | 'screen' | 'device' | 'none'

type Props = ThreeElements['group'] & {
  asset: MediaAsset
  /** Height in world units; width follows the asset's aspect ratio. */
  height: number
  presence: PresenceKey
  /** Start loading when this (earlier) presence appears, so the media is ready when its own does. */
  loadWith?: PresenceKey
  opacity?: number
  frame?: MediaFrame
}

const tmp = { frustum: new THREE.Frustum(), m: new THREE.Matrix4(), sphere: new THREE.Sphere(), v: new THREE.Vector3() }

/**
 * Untextured, the plane is a restrained dark surface (just above the scene's
 * near-black) — never white. It brightens to an untinted map only once a
 * poster or a decoded video frame is actually on it.
 */
const EMPTY = new THREE.Color('#111216')
const LIT = new THREE.Color('#ffffff')

/**
 * A media surface in the world. Placeholders render instantly; images and
 * videos load lazily the first time their environment becomes present.
 * Videos show their poster until the first frame decodes, play (muted,
 * looping, inline, no controls) only while present AND on screen — so two
 * heavy clips never decode at once — and never play under reduced motion,
 * where the poster stands in. Until any texture is ready the plane stays
 * dark; if the video fails, the poster simply remains. Swap media in
 * `src/data`, not here.
 */
export function MediaPlane({ asset, height, presence, loadWith, opacity = 1, frame = 'hairline', ...group }: Props) {
  const { reducedMotion } = useExperience()
  // Textures arrive asynchronously; in on-demand rendering (reduced motion) ask for a frame.
  const invalidate = useThree((s) => s.invalidate)
  const width = height * asset.aspect
  const mesh = useRef<THREE.Mesh>(null)
  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: EMPTY.clone(), transparent: true, toneMapped: false, depthWrite: false }),
    [],
  )
  /** 0 = dark, untextured surface; 1 = the poster / video shown untinted. */
  const lit = useRef(0)
  const frameMaterial = useMemo(() => createLineMaterial(0.5), [])
  const frameGeos = useMemo(() => frameGeometries(frame, width, height), [frame, width, height])
  const video = useRef<HTMLVideoElement | null>(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (asset.kind === 'placeholder') {
      material.map = placeholderTexture(asset.label, asset.aspect)
      material.color.copy(LIT)
      material.needsUpdate = true
      lit.current = 1
      loaded.current = true
    }
    return () => {
      const v = video.current
      if (v) {
        v.pause()
        v.removeAttribute('src')
        v.querySelectorAll('source').forEach((s) => s.remove())
        v.load()
      }
      video.current = null
      loaded.current = false
      material.map = null
      material.color.copy(EMPTY)
      material.needsUpdate = true
      lit.current = 0
    }
  }, [asset, material])

  useFrame(({ camera }, delta) => {
    const p = stage.presence[presence]
    const present = p > 0.002
    if ((present || (loadWith && stage.presence[loadWith] > 0.002)) && !loaded.current) {
      loaded.current = true
      loadInto(asset, material, video, reducedMotion, invalidate)
    }
    const v = video.current
    if (v && mesh.current) {
      // Play only while present and actually in view.
      tmp.m.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
      tmp.frustum.setFromProjectionMatrix(tmp.m)
      mesh.current.getWorldPosition(tmp.sphere.center)
      mesh.current.getWorldScale(tmp.v)
      tmp.sphere.radius = Math.hypot(width, height) * 0.5 * tmp.v.x
      const visible = present && tmp.frustum.intersectsSphere(tmp.sphere)
      if (visible && v.paused) void v.play().catch(() => undefined)
      else if (!visible && !v.paused) v.pause()
    }
    // A texture arrived: ease from the dark surface to the image (no pop, no white flash).
    if (material.map && lit.current < 1) {
      lit.current = reducedMotion ? 1 : Math.min(1, lit.current + delta * 2.5)
      material.color.lerpColors(EMPTY, LIT, lit.current)
      if (reducedMotion) invalidate()
    }
    fade(material, p * opacity)
    fade(frameMaterial, (frame === 'screen' ? 0.45 : 0.5) * p)
  })

  return (
    <group {...group}>
      <mesh ref={mesh} material={material}>
        <planeGeometry args={[width, height]} />
      </mesh>
      {frameGeos.map((g, i) =>
        frame === 'device' ? (
          <lineLoop key={i} geometry={g} material={frameMaterial} />
        ) : (
          <lineSegments key={i} geometry={g} material={frameMaterial} />
        ),
      )}
    </group>
  )
}

function frameGeometries(frame: MediaFrame, w: number, h: number): THREE.BufferGeometry[] {
  switch (frame) {
    case 'none':
      return []
    case 'device': {
      const pad = Math.min(w, h) * 0.07
      return [roundedRectGeometry(w + pad * 2, h + pad * 3.2, pad * 1.6)]
    }
    case 'screen':
      return [
        [1.02, 1.035],
        [1.045, 1.08],
      ].map(([a, b]) => new THREE.EdgesGeometry(new THREE.PlaneGeometry(w * a!, h * b!)))
    default:
      return [new THREE.EdgesGeometry(new THREE.PlaneGeometry(w * 1.04, h * 1.04))]
  }
}

function loadImage(src: string, material: THREE.MeshBasicMaterial, onReady: () => void) {
  new THREE.TextureLoader().load(src, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace
    // Don't overwrite a video texture that already took over.
    if (!(material.map instanceof THREE.VideoTexture)) {
      material.map = tex
      material.needsUpdate = true
      onReady()
    }
  })
}

function loadInto(
  asset: MediaAsset,
  material: THREE.MeshBasicMaterial,
  video: { current: HTMLVideoElement | null },
  reducedMotion: boolean,
  onReady: () => void,
) {
  if (asset.kind === 'placeholder') return
  if (asset.kind === 'image') return loadImage(asset.src, material, onReady)

  // Video: poster first; under reduced motion the poster is all there is.
  if (asset.poster) loadImage(asset.poster, material, onReady)
  if (reducedMotion && asset.poster) return

  const el = document.createElement('video')
  el.muted = true
  el.defaultMuted = true
  el.loop = true
  el.playsInline = true
  el.controls = false
  el.preload = 'auto'
  el.crossOrigin = 'anonymous'
  el.setAttribute('muted', '')
  el.setAttribute('playsinline', '')
  for (const [type, src] of [
    ['video/webm', asset.sources.webm],
    ['video/mp4', asset.sources.mp4],
  ] as const) {
    if (!src) continue
    const source = document.createElement('source')
    source.src = src
    source.type = type
    el.appendChild(source)
  }
  video.current = el
  // Swap to the video only once a frame is decoded (readyState ≥ HAVE_CURRENT_DATA).
  // On error the poster (or the dark surface) simply stays.
  el.addEventListener(
    'loadeddata',
    () => {
      if (el.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) return
      const tex = new THREE.VideoTexture(el)
      tex.colorSpace = THREE.SRGBColorSpace
      material.map = tex
      material.needsUpdate = true
      onReady()
    },
    { once: true },
  )
  // A failing <source> doesn't fire on the video itself; catch it on the way down.
  // Then stop trying to play it — the poster stays as the frame.
  el.addEventListener(
    'error',
    () =>
      // Let the resource-selection algorithm settle (it may still try another <source>).
      window.setTimeout(() => {
        if (el.networkState !== HTMLMediaElement.NETWORK_NO_SOURCE && !el.error) return
        el.pause()
        if (video.current === el) video.current = null
      }, 0),
    true,
  )
}
