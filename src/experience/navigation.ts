import type Lenis from 'lenis'
import { CHAPTERS, NAV_TRAVEL_DURATION, chapterIndex, type ChapterId } from './chapters'
import { getRange } from './scrollStore'

let lenis: Lenis | null = null

export function registerLenis(instance: Lenis | null) {
  lenis = instance
}

const travelEase = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export function scrollToY(y: number, immediate = false) {
  if (lenis) {
    lenis.scrollTo(y, immediate ? { immediate: true, force: true } : { duration: NAV_TRAVEL_DURATION, easing: travelEase, force: true })
  } else {
    // No Lenis means reduced motion: cut, don't travel.
    window.scrollTo({ top: y, behavior: 'instant' })
  }
}

export function scrollToChapter(id: ChapterId, immediate = false) {
  const i = chapterIndex(id)
  const range = getRange(i)
  const chapter = CHAPTERS[i]
  if (!range || !chapter) return
  // The static (reduced-motion) layout has no choreography to land in: use the chapter top.
  const cinematic = document.documentElement.classList.contains('is-cinematic')
  scrollToY(range.start + (cinematic ? chapter.anchorT : 0) * (range.end - range.start), immediate)
}

/**
 * Handles in-page links (`#work`, `#experience`, `#contact`, `#index`, `#top`).
 * Chapter hashes land on the chapter's readable moment, not its first pixel.
 * Returns false for hashes it doesn't know, so the browser can handle them.
 */
export function navigateToHash(hash: string, immediate = false): boolean {
  const id = hash.replace(/^#/, '')
  const chapter = CHAPTERS.find((c) => c.hash === id)
  const el = id ? document.getElementById(id) : null
  if (id === '' || id === 'top') scrollToY(0, immediate)
  else if (chapter) scrollToChapter(chapter.id, immediate)
  else if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY, immediate)
  else return false
  // Move keyboard focus with the jump, without letting the browser scroll.
  el?.focus({ preventScroll: true })
  return true
}
