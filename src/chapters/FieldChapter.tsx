import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { fieldTests } from '../data/projects'
import { fadeIn, fadeOut, linesIn, linesOut } from '../lib/motion'

/** 4 — Field tests. Technology should survive outside the lab. */
export function FieldChapter() {
  const c = copy.field
  return (
    <Chapter
      id="field"
      labelledBy="field-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.04)
        // Statement first, then it clears so the dolly shows the real media.
        linesIn(tl, q('.statement .line__inner'), 0.06, 0.16)
        linesOut(tl, q('.statement .line__inner'), 0.44, 0.08)
        fadeIn(tl, q('.field-caption'), 0.48)
        fadeIn(tl, q('.field-list li'), 0.52, 0.08, 0.03)
        fadeOut(tl, q('.field-list, .field-caption, .chapter-index'), 0.88, 0.06)
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <Headline id="field-title" lines={c.headline} className="statement display display--left" />
      <div className="field-notes block block--bottom-left">
        <p className="body field-caption">{c.caption}</p>
        <ul className="mono field-list">
          {fieldTests.map((t, i) => (
            <li key={t.id}>
              <span className="field-list__n">{String(i + 1).padStart(2, '0')}</span>
              <span>{t.title}</span>
              {t.links?.[0] ? (
                <a href={t.links[0].href} target="_blank" rel="noreferrer">
                  {t.links[0].label} ↗
                </a>
              ) : (
                <span className="pending">{t.year ?? 'Media soon'}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  )
}
