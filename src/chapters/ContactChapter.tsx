import { Chapter } from '../components/Chapter'
import { ContactLinks } from '../components/ContactLinks'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { profile } from '../data/profile'
import { gsap, useGSAP } from '../lib/gsap'
import { fadeIn, linesIn } from '../lib/motion'

/**
 * 10 — Contact. Complexity stripped back to one calm line and a question.
 * As the Index curtain rises, the ending recedes (fades and lifts) so the
 * handoff reads as deliberate rather than the Index covering the scene.
 */
export function ContactChapter() {
  const c = copy.contact
  useGSAP(() => {
    const stage = document.querySelector<HTMLElement>('[data-chapter="contact"] .stage')
    const index = document.getElementById('index')
    if (!stage || !index) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Opacity / y only — visibility stays owned by the chapter's is-active class.
      gsap.to(stage, { opacity: 0, y: -48, ease: 'none', scrollTrigger: { trigger: index, start: 'top bottom', end: 'top 40%', scrub: 0.4 } })
    })
    return () => mm.revert()
  })
  return (
    <Chapter
      id="contact"
      labelledBy="contact-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.08)
        linesIn(tl, q('.statement .line__inner'), 0.12, 0.18)
        fadeIn(tl, q('.contact-links li, .contact__foot'), 0.3, 0.08, 0.02)
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <Headline id="contact-title" lines={c.headline} className="statement display display--left contact__title" />
      <div className="contact__links block block--bottom-left">
        <ContactLinks />
        <p className="mono contact__foot">
          {profile.name} — {profile.location} — <a href="#index">The short version ↓</a>
        </p>
      </div>
    </Chapter>
  )
}
