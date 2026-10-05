import * as THREE from 'three'
import { mulberry32 } from '../../lib/math'

const cache = new Map<string, THREE.CanvasTexture>()

/**
 * A procedural stand-in for real footage: dark tonal gradient, film grain,
 * registration marks and a mono label. Generated locally — no network, no
 * files — and redrawn once web fonts are ready.
 */
export function placeholderTexture(label: string, aspect: number): THREE.CanvasTexture {
  const key = `${label}|${aspect.toFixed(3)}`
  const cached = cache.get(key)
  if (cached) return cached

  const w = 1024
  const h = Math.round(Math.min(1400, w / aspect))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4

  const draw = () => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const rand = mulberry32(hash(label))

    const g = ctx.createLinearGradient(0, 0, w * 0.4, h)
    g.addColorStop(0, '#1b1c1e')
    g.addColorStop(1, '#0c0d0f')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, w, h)

    // A soft "light source" so each placeholder has its own composition.
    const lx = w * (0.25 + rand() * 0.5)
    const ly = h * (0.2 + rand() * 0.4)
    const light = ctx.createRadialGradient(lx, ly, 0, lx, ly, Math.max(w, h) * 0.7)
    light.addColorStop(0, 'rgba(236,235,230,0.10)')
    light.addColorStop(1, 'rgba(236,235,230,0)')
    ctx.fillStyle = light
    ctx.fillRect(0, 0, w, h)

    // Horizon line + grain.
    ctx.fillStyle = 'rgba(236,235,230,0.06)'
    ctx.fillRect(0, Math.round(h * (0.55 + rand() * 0.2)), w, 1)
    for (let i = 0; i < 9000; i++) {
      ctx.fillStyle = `rgba(236,235,230,${rand() * 0.05})`
      ctx.fillRect(rand() * w, rand() * h, 1.5, 1.5)
    }

    // Registration marks.
    ctx.strokeStyle = 'rgba(236,235,230,0.35)'
    ctx.lineWidth = 2
    const m = 36
    const l = 22
    for (const [x, y, dx, dy] of [
      [m, m, 1, 1],
      [w - m, m, -1, 1],
      [m, h - m, 1, -1],
      [w - m, h - m, -1, -1],
    ] as const) {
      ctx.beginPath()
      ctx.moveTo(x, y + dy * l)
      ctx.lineTo(x, y)
      ctx.lineTo(x + dx * l, y)
      ctx.stroke()
    }

    ctx.fillStyle = 'rgba(236,235,230,0.85)'
    ctx.font = '500 26px "IBM Plex Mono", ui-monospace, monospace'
    ctx.textBaseline = 'alphabetic'
    ctx.fillText(label, m + 8, h - m - 18)
    ctx.fillStyle = 'rgba(236,235,230,0.4)'
    ctx.font = '400 18px "IBM Plex Mono", ui-monospace, monospace'
    ctx.fillText('PLACEHOLDER — REPLACE IN src/data', m + 8, m + 40)
    texture.needsUpdate = true
  }

  draw()
  void document.fonts?.ready.then(draw)
  cache.set(key, texture)
  return texture
}

function hash(s: string) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
