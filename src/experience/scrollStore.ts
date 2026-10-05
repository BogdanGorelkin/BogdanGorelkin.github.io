import { CHAPTERS, STORY_END } from './chapters'
import { clamp } from '../lib/math'

/**
 * Single source of truth for scroll → story. Mutable on purpose: the render
 * loop reads it every frame without React re-renders. Only coarse state
 * (active chapter, offstage) is exposed to React through `subscribe`.
 */
export const story = {
  /** Continuous story clock, 0 … STORY_END. Chapter i spans [i, i + 1). */
  time: 0,
  /** True once the Index section fully covers the viewport. */
  offstage: false,
}

type Range = { start: number; end: number }

let ranges: Range[] = []
let indexTop = Number.POSITIVE_INFINITY
let activeChapter = 0
const listeners = new Set<() => void>()

export function setRanges(next: Range[], indexStart: number) {
  ranges = next
  indexTop = indexStart
}

export function getRange(i: number): Range | undefined {
  return ranges[i]
}

function timeAt(y: number): number {
  if (!ranges.length) return 0
  for (let i = 0; i < ranges.length; i++) {
    const r = ranges[i]!
    if (y < r.end) return i + clamp((y - r.start) / Math.max(1, r.end - r.start))
  }
  return STORY_END
}

export function updateFromScroll(y: number) {
  story.time = timeAt(y)
  const nextActive = Math.min(CHAPTERS.length - 1, Math.floor(story.time))
  const nextOffstage = y >= indexTop - 1
  if (nextActive !== activeChapter || nextOffstage !== story.offstage) {
    activeChapter = nextActive
    story.offstage = nextOffstage
    listeners.forEach((l) => l())
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getActiveChapter = () => activeChapter
export const getOffstage = () => story.offstage
