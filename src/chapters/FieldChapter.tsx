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
        linesIn(tl, q('.statement .line__inner'), 0.08, 0.18)
        fadeIn(tl, q('.field-list li'), 0.36, 0.08, 0.04)
        linesOut(tl, q('.statement .line__inner'), 0.86, 0.08)
        fadeOut(tl, q('.field-list, .chapter-index'), 0.88, 0.06)
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <Headline id="field-title" lines={c.headline} className="statement display display--left" />
      <ul className="mono field-list block block--bottom-right">
        {fieldTests.map((t, i) => (
          <li key={t.id}>
            <span className="field-list__n">{String(i + 1).padStart(2, '0')}</span>
            <span>{t.title}</span>
            <span className="pending">{t.description ?? 'Details to be added'}</span>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}
