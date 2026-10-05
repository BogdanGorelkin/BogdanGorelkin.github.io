import { Chapter } from '../components/Chapter'
import { ContactLinks } from '../components/ContactLinks'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { profile } from '../data/profile'
import { fadeIn, linesIn } from '../lib/motion'

/** 6 — Contact. Complexity stripped back to one calm line and a question. */
export function ContactChapter() {
  const c = copy.contact
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
