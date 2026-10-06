import { Chapter } from '../components/Chapter'
import { DeepDiveAnchor, DeepDiveLinks } from '../components/DeepDiveLinks'
import { Headline } from '../components/Headline'
import { TriadStrip } from '../components/TriadStrip'
import { copy } from '../data/copy'
import { fieldTests, getFieldTest } from '../data/projects'
import type { FieldTest } from '../data/types'
import { fadeIn, fadeOut, linesIn, linesOut } from '../lib/motion'

/**
 * Local-progress windows for the two field beats, matched to the dolly in
 * shots.ts: the Paris plane is centred around t ≈ 5.5, the skydive plane is
 * where the camera comes to rest (t ≈ 5.86).
 */
const BEAT_WINDOWS: [number, number][] = [
  [0.42, 0.66],
  [0.7, 1],
]

/** 5 — Field tests. If it's built, it gets tried outside the lab: a Paris ride, then a skydive. */
export function FieldChapter() {
  const c = copy.field
  const beats = c.beats.map(getFieldTest)
  const also = fieldTests.filter((t) => !c.beats.includes(t.id as (typeof c.beats)[number]))
  return (
    <Chapter
      id="field"
      labelledBy="field-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.04)
        linesIn(tl, q('.statement .line__inner'), 0.06, 0.16)
        linesOut(tl, q('.statement .line__inner'), 0.38, 0.07)
        fadeIn(tl, q('.triad'), 0.42, 0.06)
        q('.field-beat').forEach((el, i) => {
          const [from, to] = BEAT_WINDOWS[i] ?? [0.7, 1]
          fadeIn(tl, el, from, 0.05)
          if (to < 1) fadeOut(tl, el, to - 0.04, 0.04)
        })
        fadeIn(tl, q('.field-also'), 0.8)
        fadeOut(tl, q('.chapter-index, .triad, .field-beats, .field-also'), 0.94, 0.05)
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <Headline id="field-title" lines={c.headline} className="statement headline--l display--left" />
      <TriadStrip triad={c.triad} className="block block--top-right" />
      <div className="field-beats block block--bottom-left">
        {beats.map((t) => (
          <FieldBeat key={t.id} test={t} />
        ))}
        <p className="mono field-also">
          {c.alsoLabel}:{' '}
          {also.map((t, i) => (
            <span key={t.id}>
              {i > 0 && ' · '}
              {t.title}
              {t.deepDives?.[0] && (
                <>
                  {' '}
                  <DeepDiveAnchor link={t.deepDives[0]} />
                </>
              )}
            </span>
          ))}
        </p>
      </div>
    </Chapter>
  )
}

function FieldBeat({ test: t }: { test: FieldTest }) {
  return (
    <article className="field-beat" aria-labelledby={`field-${t.id}`}>
      {t.signals && (
        <p className="mono field-beat__signals">
          {[t.location, ...t.signals].filter(Boolean).join('  ·  ')}
        </p>
      )}
      <h3 id={`field-${t.id}`} className="field-beat__title">
        {t.title}
      </h3>
      {t.caption && <p className="body">{t.caption}</p>}
      <DeepDiveLinks item={t} primaryOnly prominent />
    </article>
  )
}
