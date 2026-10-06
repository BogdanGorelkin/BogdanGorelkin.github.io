/**
 * The film's chapter list. Order defines the story clock: chapter `i` spans
 * storyTime `[i, i + 1)`. Each chapter is a tall DOM <section> whose scroll
 * length (in svh) sets the pacing; 3D choreography is keyed to storyTime, so
 * heights can change without retuning the camera.
 */
export type ChapterId =
  | 'signal'
  | 'neural'
  | 'data'
  | 'player'
  | 'screen'
  | 'field'
  | 'reveal'
  | 'medtech'
  | 'research'
  | 'pattern'
  | 'contact'

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
  { id: 'signal', label: 'Signal', length: { desktop: 200, mobile: 180 }, anchorT: 0, keyT: 0.05 },
  { id: 'neural', label: 'Today', length: { desktop: 220, mobile: 190 }, anchorT: 0.62, keyT: 0.62, hash: 'work' },
  { id: 'data', label: 'System', length: { desktop: 260, mobile: 220 }, anchorT: 0.5, keyT: 0.55 },
  { id: 'player', label: 'Scale', length: { desktop: 200, mobile: 180 }, anchorT: 0.5, keyT: 0.5 },
  { id: 'screen', label: 'Hackathon', length: { desktop: 300, mobile: 250 }, anchorT: 0.66, keyT: 0.8 },
  { id: 'field', label: 'Field', length: { desktop: 280, mobile: 240 }, anchorT: 0.7, keyT: 0.9 },
  { id: 'reveal', label: 'Rewind', length: { desktop: 220, mobile: 190 }, anchorT: 0.32, keyT: 0.32, hash: 'experience' },
  { id: 'medtech', label: 'MedTech', length: { desktop: 240, mobile: 210 }, anchorT: 0.45, keyT: 0.45 },
  { id: 'research', label: 'Research', length: { desktop: 240, mobile: 210 }, anchorT: 0.45, keyT: 0.45 },
  { id: 'pattern', label: 'Pattern', length: { desktop: 240, mobile: 210 }, anchorT: 0.55, keyT: 0.55 },
  { id: 'contact', label: 'Contact', length: { desktop: 240, mobile: 220 }, anchorT: 0.7, keyT: 0.7, hash: 'contact' },
]

export const STORY_END = CHAPTERS.length

/** Duration (s) of a nav "fast travel" scroll between chapters. */
export const NAV_TRAVEL_DURATION = 0.8

export function chapterIndex(id: ChapterId): number {
  return CHAPTERS.findIndex((c) => c.id === id)
}
