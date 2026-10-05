import { useEffect, useMemo, useRef } from 'react'
import { useFrame, type ThreeElements } from '@react-three/fiber'
import * as THREE from 'three'
import type { MediaAsset } from '../../data/types'
import { stage, type PresenceKey } from '../../experience/director'
import { placeholderTexture } from './placeholderTexture'
import { createLineMaterial, fade } from './materials'

type Props = ThreeElements['group'] & {
  asset: MediaAsset
  /** Height in world units; width follows the asset's aspect ratio. */
  height: number
  presence: PresenceKey
  opacity?: number
}

/**
 * A media surface in the world. Placeholders render instantly; images and
 * videos load lazily the first time their environment becomes present, and
 * videos pause whenever it isn't. Swap media in `src/data`, not here.
 */
export function MediaPlane({ asset, height, presence, opacity = 1, ...group }: Props) {
  const width = height * asset.aspect
  const material = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, toneMapped: false, depthWrite: false }),
    [],
  )
  const frameMaterial = useMemo(() => createLineMaterial(0.5), [])
  const frame = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(width * 1.04, height * 1.04)),
    [width, height],
  )
  const video = useRef<HTMLVideoElement | null>(null)
  const loaded = useRef(false)

  useEffect(() => {
    if (asset.kind === 'placeholder') {
      material.map = placeholderTexture(asset.label, asset.aspect)
      material.needsUpdate = true
      loaded.current = true
    }
    return () => {
      video.current?.pause()
      video.current?.removeAttribute('src')
      video.current = null
    }
  }, [asset, material])

  useFrame(() => {
    const p = stage.presence[presence]
    const active = p > 0.002
    if (active && !loaded.current) {
      loaded.current = true
      material.map = loadTexture(asset, video)
      material.needsUpdate = true
    }
    const v = video.current
    if (v) {
      if (active && v.paused) void v.play().catch(() => undefined)
      else if (!active && !v.paused) v.pause()
    }
    fade(material, p * opacity)
    fade(frameMaterial, 0.5 * p)
  })

  return (
    <group {...group}>
      <mesh material={material}>
        <planeGeometry args={[width, height]} />
      </mesh>
      <lineSegments geometry={frame} material={frameMaterial} />
    </group>
  )
}

function loadTexture(asset: MediaAsset, video: { current: HTMLVideoElement | null }): THREE.Texture | null {
  if (asset.kind === 'image') {
    const tex = new THREE.TextureLoader().load(asset.src)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }
  if (asset.kind === 'video') {
    const el = document.createElement('video')
    el.muted = true
    el.loop = true
    el.playsInline = true
    el.preload = 'auto'
    el.crossOrigin = 'anonymous'
    if (asset.poster) el.poster = asset.poster
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
    const tex = new THREE.VideoTexture(el)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }
  return placeholderTexture(asset.label, asset.aspect)
}
