/**
 * The film's chapter list. Order defines the story clock: chapter `i` spans
 * storyTime `[i, i + 1)`. Each chapter is a tall DOM <section> whose scroll
 * length (in svh) sets the pacing; 3D choreography is keyed to storyTime, so
 * heights can change without retuning the camera.
 */
export type ChapterId = 'signal' | 'neural' | 'data' | 'screen' | 'field' | 'timeline' | 'contact'

export type Chapter = {
  id: ChapterId
  /** Short label for the nav counter. */
  label: string
  /** Section scroll length in svh — desktop / mobile. */
  length: { desktop: number; mobile: number }
  /** Local progress (0–1) where a nav jump should land so the content is readable. */
  anchorT: number
  /** Local progress used as the still frame when motion is reduced. */
  keyT: number
  /** DOM id used by the nav / hash links. */
  hash?: string
}

export const CHAPTERS: readonly Chapter[] = [
  { id: 'signal', label: 'Signal', length: { desktop: 240, mobile: 210 }, anchorT: 0, keyT: 0.05 },
  { id: 'neural', label: 'Human', length: { desktop: 240, mobile: 210 }, anchorT: 0.6, keyT: 0.62 },
  { id: 'data', label: 'System', length: { desktop: 300, mobile: 250 }, anchorT: 0.5, keyT: 0.55 },
  { id: 'screen', label: 'Work', length: { desktop: 320, mobile: 260 }, anchorT: 0.66, keyT: 0.8, hash: 'work' },
  { id: 'field', label: 'Field', length: { desktop: 260, mobile: 220 }, anchorT: 0.5, keyT: 0.5 },
  { id: 'timeline', label: 'Career', length: { desktop: 660, mobile: 560 }, anchorT: 0.36, keyT: 0.18, hash: 'experience' },
  { id: 'contact', label: 'Contact', length: { desktop: 260, mobile: 240 }, anchorT: 0.7, keyT: 0.7, hash: 'contact' },
]

export const STORY_END = CHAPTERS.length

/** Duration (s) of a nav "fast travel" scroll between chapters. */
export const NAV_TRAVEL_DURATION = 0.8

export function chapterIndex(id: ChapterId): number {
  return CHAPTERS.findIndex((c) => c.id === id)
}
