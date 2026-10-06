import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { copy } from '../data/copy'
import { career } from '../data/experience'
import { annotationAnchor, MEDTECH, medtechWorld, stationLabelAnchor } from '../scenes/layout'
import { PATTERN_ANCHORS } from '../scenes/PatternScene'
import { CAREER, type V3 } from '../scenes/world'
import { stage } from './director'
import type { Tier } from './quality'

/**
 * DOM text pinned to points in the 3D world. The elements are ordinary DOM
 * (outside the canvas, aria-hidden — the same facts exist in the chapter
 * text); a projector inside the canvas moves them every frame.
 */
type Label = {
  id: string
  className: string
  position: V3 | (() => V3)
  opacity: () => number
  /** Only shown when the camera is above this height — i.e. on wide shots. */
  minCameraY?: number
  /** Also shown on the mobile tier (most small labels give way to DOM lists there). */
  mobile?: boolean
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
  // MedTech: two people and the software between them — no device catalogue.
  {
    id: 'medtech-patient',
    className: 'annotation',
    position: medtechWorld(MEDTECH.patient.pos, 2.6),
    opacity: () => stage.presence.medtechLabels,
    lines: twoLines('Patient', 'Devices beside them'),
  },
  {
    id: 'medtech-doctor',
    className: 'annotation',
    position: medtechWorld(MEDTECH.doctor.pos, 2.6),
    opacity: () => stage.presence.medtechLabels,
    lines: twoLines('Doctor', 'Remote, live'),
  },
  ...career.map((s, i) => ({
    id: `station-${s.id}`,
    className: `station-label${s.current ? ' station-label--current' : ''}`,
    position: stationLabelAnchor(CAREER.x[s.id]),
    opacity: () => stage.presence.career * (1 - stage.presence.pattern),
    minCameraY: 25,
    mobile: true,
    lines: [
      { text: `${String(i + 1).padStart(2, '0')} — ${s.era}${s.current ? ' · now' : ''}`, className: '' },
      { text: s.theme, className: 'station-label__era' },
    ],
  })),
  ...copy.pattern.threads.map((word, i) => ({
    id: `thread-${i}`,
    className: 'thread-label',
    position: () => PATTERN_ANCHORS[i]!,
    opacity: () => stage.presence.pattern,
    mobile: true,
    lines: [{ text: word, className: '' }],
  })),
]

const elements = new Map<string, HTMLDivElement>()
const forTier = (tier: Tier) => (tier === 'high' ? LABELS : LABELS.filter((l) => l.mobile))

export function SpatialLabels({ tier }: { tier: Tier }) {
  return (
    <div className="spatial-labels">
      {forTier(tier).map((l) => (
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

export function LabelProjector({ tier }: { tier: Tier }) {
  const v = useMemo(() => new THREE.Vector3(), [])
  const shown = useMemo(() => new Map<string, boolean>(), [])
  const labels = useMemo(() => forTier(tier), [tier])

  useFrame(({ camera, size }) => {
    for (const label of labels) {
      const el = elements.get(label.id)
      if (!el) continue
      const opacity = label.opacity()
      const aerial = !label.minCameraY || camera.position.y > label.minCameraY
      const pos = typeof label.position === 'function' ? label.position() : label.position
      v.set(...pos).project(camera)
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
