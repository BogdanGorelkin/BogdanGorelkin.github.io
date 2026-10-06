import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { career } from '../data/experience'
import { fadeIn, fadeOut, linesIn, linesOut } from '../lib/motion'

/**
 * 6 — Rewind. The camera pulls back: everything so far was one station.
 * Then it travels backwards along the line.
 */
export function RevealChapter() {
  const c = copy.reveal
  return (
    <Chapter
      id="reveal"
      labelledBy="reveal-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.04)
        linesIn(tl, q('.headline .line__inner'), 0.16, 0.14)
        fadeIn(tl, q('.reveal-caption'), 0.3)
        fadeIn(tl, q('.rail'), 0.22, 0.06)
        linesOut(tl, q('.headline .line__inner'), 0.62, 0.07)
        fadeOut(tl, q('.reveal-caption, .chapter-index'), 0.62)
        fadeOut(tl, q('.rail'), 0.9, 0.05)
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <div className="reveal-block block block--bottom-left">
        <Headline id="reveal-title" lines={c.headline} className="headline--l" />
        <p className="body reveal-caption">{c.caption}</p>
      </div>
      <ol className="mono rail" aria-label="Career line">
        {career.map((s) => (
          <li key={s.id} className={s.current ? 'is-current' : undefined}>
            <span>{s.era}</span>
            <span className="rail__theme">{s.theme}</span>
          </li>
        ))}
      </ol>
    </Chapter>
  )
}
