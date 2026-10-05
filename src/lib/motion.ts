import type { RefObject } from 'react'
import { gsap, useGSAP } from './gsap'

/** Typography trails the camera slightly — reads as the edit following the shot. */
export const SCRUB = 0.6

export type Query = (selector: string) => Element[]
export type TL = gsap.core.Timeline
type Targets = gsap.TweenTarget

/**
 * One scrubbed timeline per chapter, spanning the chapter's full scroll
 * range. Its time axis is normalised to 0–1 = the chapter's local progress
 * (same convention as storyTime − chapterIndex), so DOM cues line up with
 * shots in `shots.ts`. Skipped entirely under reduced motion: the static
 * layout shows all text.
 */
export function useChapterTimeline(scope: RefObject<HTMLElement | null>, build?: (tl: TL, q: Query) => void) {
  useGSAP(
    () => {
      const el = scope.current
      if (!el || !build) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          // Same range as the story clock (the final chapter ends at 'bottom bottom').
          scrollTrigger: { trigger: el, start: 'top top', end: el.nextElementSibling?.matches('[data-chapter]') ? 'bottom top' : 'bottom bottom', scrub: SCRUB },
        })
        build(tl, gsap.utils.selector(el))
        tl.set({}, {}, 1)
      })
      return () => mm.revert()
    },
    { scope },
  )
}

/** Masked line reveal: each `.line__inner` rises out of its line box. */
export function linesIn(tl: TL, targets: Targets, at: number, duration = 0.14) {
  tl.fromTo(targets, { yPercent: 112 }, { yPercent: 0, duration, stagger: duration * 0.2, ease: 'reveal' }, at)
}

export function linesOut(tl: TL, targets: Targets, at: number, duration = 0.08) {
  tl.to(targets, { yPercent: -112, duration, stagger: duration * 0.15, ease: 'power2.in' }, at)
}

export function fadeIn(tl: TL, targets: Targets, at: number, duration = 0.08, stagger = 0) {
  tl.fromTo(targets, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration, stagger, ease: 'power2.out' }, at)
}

export function fadeOut(tl: TL, targets: Targets, at: number, duration = 0.06) {
  tl.to(targets, { autoAlpha: 0, y: -10, duration, ease: 'power1.in' }, at)
}

/** Highlight `target` only between `from` and `to` (local progress). */
export function emphasise(tl: TL, target: Targets, from: number, to: number, dim = 0.28) {
  tl.fromTo(target, { opacity: dim }, { opacity: 1, duration: 0.03 }, from)
  if (to < 1) tl.to(target, { opacity: dim, duration: 0.03 }, to)
}
