import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { copy } from '../data/copy'
import { career } from '../data/experience'
import { annotationAnchor, MEDTECH, medtechWorld, stationLabelAnchor, threadLabelAnchor } from '../scenes/layout'
import { CAREER, type V3 } from '../scenes/world'
import { stage } from './director'

/**
 * DOM text pinned to points in the 3D world. The elements are ordinary DOM
 * (outside the canvas, aria-hidden — the same facts exist in the chapter
 * text); a projector inside the canvas moves them every frame.
 */
type Label = {
  id: string
  className: string
  position: V3
  opacity: () => number
  /** Only shown when the camera is above this height — i.e. on wide shots. */
  minCameraY?: number
  lines: { text: string; className: string }[]
}

const twoLines = (key: string, value: string) => [
  { text: key, className: 'annotation__key' },
  { text: value, className: 'annotation__value' },
]

const LABELS: Label[] = [
  ...copy.neural.annotations.map((a, i) => ({
    id: `annotation-${i}`,
    className: 'annotation',
    position: annotationAnchor(i),
    opacity: () => stage.presence.annotations * stage.presence.neural,
    lines: twoLines(a.key, a.value),
  })),
  ...MEDTECH.devices.map((d, i) => ({
    id: `device-${d.id}`,
    className: 'annotation',
    position: medtechWorld(d.pos, 1.4),
    opacity: () => stage.presence.medtechLabels,
    lines: twoLines(copy.medtech.devices[i] ?? d.id, 'Diagnostic device'),
  })),
  {
    id: 'medtech-patient',
    className: 'annotation',
    position: medtechWorld(MEDTECH.head, 2.4),
    opacity: () => stage.presence.medtechLabels,
    lines: twoLines('Patient', 'At home'),
  },
  {
    id: 'medtech-doctor',
    className: 'annotation',
    position: medtechWorld(MEDTECH.doctor, 3.6),
    opacity: () => stage.presence.medtechLabels,
    lines: twoLines('Doctor', 'Remote, live'),
  },
  ...career.map((s, i) => ({
    id: `station-${s.id}`,
    className: 'station-label',
    position: stationLabelAnchor(CAREER.x[s.id]),
    opacity: () => stage.presence.career,
    minCameraY: 60,
    lines: [
      { text: `${String(i + 1).padStart(2, '0')} — ${s.era}${s.current ? ' · now' : ''}`, className: '' },
      { text: s.theme, className: 'station-label__era' },
    ],
  })),
  ...copy.pattern.threads.map((word, i) => ({
    id: `thread-${i}`,
    className: 'thread-label',
    position: threadLabelAnchor(i),
    opacity: () => stage.presence.pattern,
    lines: [{ text: word, className: '' }],
  })),
]

const elements = new Map<string, HTMLDivElement>()

export function SpatialLabels() {
  return (
    <div className="spatial-labels">
      {LABELS.map((l) => (
        <div
          key={l.id}
          className={l.className}
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
