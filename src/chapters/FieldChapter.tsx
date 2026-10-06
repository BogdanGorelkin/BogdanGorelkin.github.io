import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { fieldTests } from '../data/projects'
import type { FieldTest } from '../data/types'
import { fadeIn, fadeOut, linesIn, linesOut } from '../lib/motion'

/** 5 — Field tests. If it's built, it gets tried outside the lab. */
export function FieldChapter() {
  const c = copy.field
  return (
    <Chapter
      id="field"
      labelledBy="field-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.04)
        // Statement first, then it clears so the dolly shows the real media.
        linesIn(tl, q('.statement .line__inner'), 0.06, 0.18)
        linesOut(tl, q('.statement .line__inner'), 0.46, 0.08)
        fadeIn(tl, q('.field-list li'), 0.52, 0.08, 0.03)
        fadeOut(tl, q('.field-list, .chapter-index'), 0.9, 0.06)
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <Headline id="field-title" lines={c.headline} className="statement headline--l display--left" />
      <div className="field-notes block block--bottom-left">
        <ul className="mono field-list">
          {fieldTests.map((t, i) => (
            <li key={t.id}>
              <span className="field-list__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="field-list__what">
                {t.title}
                {t.caption && <span className="field-list__caption">{t.caption}</span>}
              </span>
              <FieldLink test={t} />
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  )
}

/** The deep dive if there is one; otherwise the year (or nothing). */
function FieldLink({ test }: { test: FieldTest }) {
  const href = test.youtubeUrl ?? test.linkedinUrl ?? test.externalUrl
  if (href) {
    const label = test.youtubeUrl ? (test.deepDiveLabel ?? 'Watch') : test.linkedinUrl ? 'LinkedIn' : (test.deepDiveLabel ?? 'More')
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {label} ↗
      </a>
    )
  }
  return <span className="pending">{test.period ?? ''}</span>
}
