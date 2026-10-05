import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { career, stationLabel } from '../data/experience'
import type { CareerStation } from '../data/types'
import { emphasise, fadeIn, fadeOut, linesIn, linesOut } from '../lib/motion'

/**
 * Local-progress windows for each station panel; they bracket the camera
 * holds in shots.ts (storyTime 5.36 → 5.95).
 */
const STATION_WINDOWS: [number, number][] = [
  [0.3, 0.45],
  [0.46, 0.59],
  [0.6, 0.74],
  [0.75, 0.89],
  [0.9, 1],
]

/** 5 — Career. The camera pulls back: the journey so far was one station. */
export function TimelineChapter() {
  const c = copy.timeline
  return (
    <Chapter
      id="timeline"
      labelledBy="timeline-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.01)
        linesIn(tl, q('.reveal .line__inner'), 0.04, 0.12)
        fadeIn(tl, q('.reveal-caption'), 0.12)
        linesOut(tl, q('.reveal .line__inner'), 0.26, 0.05)
        fadeOut(tl, q('.reveal-caption'), 0.26, 0.04)
        fadeIn(tl, q('.rail'), 0.28, 0.04)
        q('.station').forEach((el, i) => {
          const [from, to] = STATION_WINDOWS[i % STATION_WINDOWS.length]!
          fadeIn(tl, el, from, 0.04)
          if (to < 1) fadeOut(tl, el, to - 0.03, 0.03)
        })
        q('.rail li').forEach((el, i) => {
          const [from, to] = STATION_WINDOWS[i % STATION_WINDOWS.length]!
          emphasise(tl, el, from, to, 0.35)
        })
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <div className="reveal-block block block--bottom-left">
        <Headline id="timeline-title" lines={c.headline} className="reveal headline--l" />
        <p className="body reveal-caption">{c.caption}</p>
      </div>
      <div className="stations block block--bottom-left">
        {career.map((s, i) => (
          <StationPanel key={s.id} station={s} index={i} total={career.length} />
        ))}
      </div>
      <ol className="mono rail" aria-label="Career stations">
        {career.map((s) => (
          <li key={s.id} className={s.current ? 'is-current' : undefined}>
            {stationLabel(s)}
          </li>
        ))}
      </ol>
    </Chapter>
  )
}

function StationPanel({ station: s, index, total }: { station: CareerStation; index: number; total: number }) {
  const n = (v: number) => String(v).padStart(2, '0')
  const isFuture = s.id === 'next'
  return (
    <article className="station" aria-labelledby={`station-${s.id}`}>
      <p className="mono station__index">
        {n(index + 1)} / {n(total)}
        {s.current && <span className="station__now"> — current chapter</span>}
      </p>
      <h3 id={`station-${s.id}`} className="station__era">
        {s.era}
      </h3>
      {!isFuture && s.location && <p className="mono station__where">{s.location}</p>}
      {!isFuture && (
        <dl className="mono station__facts">
          <Fact label="Role" value={s.role} />
          <Fact label="Company" value={s.company} />
          <Fact label="Period" value={s.period} />
        </dl>
      )}
      <p className="station__summary">{s.summary ?? <span className="pending">Details to be added.</span>}</p>
      {s.highlights.length > 0 && (
        <ul className="station__highlights">
          {s.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
      {s.links && s.links.length > 0 && (
        <p className="mono station__links">
          {s.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </article>
  )
}

function Fact({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value ?? <span className="pending">To be added</span>}</dd>
    </div>
  )
}
