import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { copy } from '../data/copy'
import { career } from '../data/experience'
import { annotationAnchor, stationLabelAnchor } from '../scenes/layout'
import { CAREER, type V3 } from '../scenes/world'
import { stage } from './director'

/**
 * DOM text pinned to points in the 3D world. The elements are ordinary DOM
 * (outside the canvas, aria-hidden — the same facts exist in the chapter
 * text); a projector inside the canvas moves them every frame.
 */
type Label = {
  id: string
  kind: 'annotation' | 'station'
  position: V3
  opacity: () => number
  /** Only shown when the camera is above this height — i.e. on aerial shots. */
  minCameraY?: number
  lines: { text: string; className: string }[]
}

const LABELS: Label[] = [
  ...copy.neural.annotations.map((a, i) => ({
    id: `annotation-${i}`,
    kind: 'annotation' as const,
    position: annotationAnchor(i),
    opacity: () => stage.presence.annotations * stage.presence.neural,
    lines: [
      { text: a.key, className: 'annotation__key' },
      { text: a.value, className: 'annotation__value' },
    ],
  })),
  ...career.map((s, i) => ({
    id: `station-${s.id}`,
    kind: 'station' as const,
    position: stationLabelAnchor(CAREER.x[s.id]),
    opacity: () => stage.presence.career,
    minCameraY: 90,
    lines: [
      { text: String(i + 1).padStart(2, '0'), className: '' },
      { text: s.era, className: 'station-label__era' },
      ...(s.current ? [{ text: s.company ? `${s.company} — now` : 'Now', className: 'station-label__now' }] : []),
    ],
  })),
]

const elements = new Map<string, HTMLDivElement>()

export function SpatialLabels() {
  return (
    <div className="spatial-labels">
      {LABELS.map((l) => (
        <div
          key={l.id}
          className={l.kind === 'annotation' ? 'annotation' : 'station-label'}
          ref={(el) => {
            if (el) elements.set(l.id, el)
            else elements.delete(l.id)
          }}
        >
          {l.lines.map((line) => (
            <span key={line.text} className={line.className}>
              {line.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}

export function LabelProjector() {
  const v = useMemo(() => new THREE.Vector3(), [])
  const shown = useMemo(() => new Map<string, boolean>(), [])

  useFrame(({ camera, size }) => {
    for (const label of LABELS) {
      const el = elements.get(label.id)
      if (!el) continue
      const opacity = label.opacity()
      const aerial = !label.minCameraY || camera.position.y > label.minCameraY
      v.set(...label.position).project(camera)
      const visible = aerial && opacity > 0.01 && v.z < 1 && Math.abs(v.x) < 1.2 && Math.abs(v.y) < 1.2
      if (visible) {
        const x = (v.x * 0.5 + 0.5) * size.width
        const y = (-v.y * 0.5 + 0.5) * size.height
        // `translate` positions; the CSS `transform` keeps each kind's own offset.
        el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`
        el.style.opacity = opacity.toFixed(3)
      }
      if (shown.get(label.id) !== visible) {
        shown.set(label.id, visible)
        el.style.visibility = visible ? 'visible' : 'hidden'
      }
    }
  })

  return null
}
