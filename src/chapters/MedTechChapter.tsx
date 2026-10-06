import { Chapter } from '../components/Chapter'
import { DeepDiveLinks } from '../components/DeepDiveLinks'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { getStation } from '../data/experience'
import { fadeIn, fadeOut, linesIn } from '../lib/motion'

/** 7 — MedTech. Remote care: patient, diagnostic devices, a doctor elsewhere — software in between. */
export function MedTechChapter() {
  const c = copy.medtech
  const station = getStation('medtech')
  return (
    <Chapter
      id="medtech"
      labelledBy="medtech-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.06)
        linesIn(tl, q('.headline .line__inner'), 0.1, 0.18)
        fadeIn(tl, q('.station-meta, .body, .annotation-list li, .deep-dive'), 0.3, 0.08, 0.02)
        fadeOut(tl, q('.medtech__copy'), 0.88, 0.07)
      }}
    >
      <div className="medtech__copy block block--bottom-left">
        <p className="mono chapter-index">{c.index}</p>
        <Headline id="medtech-title" lines={c.headline} className="headline--m" />
        <p className="mono station-meta">
          {station.company} · {station.role} · {station.period}
        </p>
        <p className="body">{c.body}</p>
        {/* Desktop shows these as labels in 3D; this list serves phones and screen readers. */}
        <ul className="mono annotation-list" aria-label="Connected diagnostic devices">
          {c.devices.map((d) => (
            <li key={d}>
              <strong>{d}</strong>
            </li>
          ))}
        </ul>
        <DeepDiveLinks item={station} />
      </div>
    </Chapter>
  )
}
