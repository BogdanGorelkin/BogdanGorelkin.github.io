import Lenis from 'lenis'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { CHAPTERS } from './chapters'
import { getActiveChapter, setRanges, subscribe, updateFromScroll } from './scrollStore'
import { registerLenis } from './navigation'

/**
 * Boots the scroll pipeline exactly once:
 *   Lenis (smooth wheel, native touch) → ScrollTrigger → story clock.
 * One trigger per chapter section provides refresh-aware ranges and the
 * `is-active` class; a single master trigger pushes scroll into the store.
 */
export function useScrollDirector(reducedMotion: boolean) {
  useGSAP(
    () => {
      let lenis: Lenis | null = null
      const raf = (time: number) => lenis?.raf(time * 1000)

      if (!reducedMotion) {
        lenis = new Lenis({ autoRaf: false, lerp: 0.085, wheelMultiplier: 0.9, syncTouch: false })
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)
      }
      registerLenis(lenis)

      const sections = CHAPTERS.map((c) => document.querySelector<HTMLElement>(`[data-chapter="${c.id}"]`))
      const index = document.getElementById('index')

      // Ranges are contiguous; the last one ends as the Index curtain starts to rise.
      const triggers = sections.map((el, i) =>
        ScrollTrigger.create({ trigger: el, start: 'top top', end: i === sections.length - 1 ? 'bottom bottom' : 'bottom top' }),
      )

      // Exactly one chapter stage is visible at a time (including at scroll 0).
      const markActive = () => {
        const active = getActiveChapter()
        sections.forEach((el, i) => el?.classList.toggle('is-active', i === active))
      }
      const unsubscribe = subscribe(markActive)

      const sync = () => {
        const indexTop = index ? index.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY
        setRanges(
          triggers.map((t) => ({ start: t.start, end: t.end })),
          indexTop,
        )
        updateFromScroll(window.scrollY)
      }

      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: () => updateFromScroll(window.scrollY) })
      ScrollTrigger.addEventListener('refresh', sync)
      sync()
      markActive()

      // Text metrics change once web fonts land; re-measure so ranges stay exact.
      void document.fonts.ready.then(() => ScrollTrigger.refresh())

      return () => {
        ScrollTrigger.removeEventListener('refresh', sync)
        unsubscribe()
        sections.forEach((el) => el?.classList.remove('is-active'))
        gsap.ticker.remove(raf)
        registerLenis(null)
        lenis?.destroy()
      }
    },
    { dependencies: [reducedMotion] },
  )
}
