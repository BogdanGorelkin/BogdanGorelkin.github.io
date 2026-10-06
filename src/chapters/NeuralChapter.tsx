import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { getStation } from '../data/experience'
import { fadeIn, fadeOut, linesIn } from '../lib/motion'

/** 1 — Today (HABS). Start with what Bogdan builds: systems around signals from people. */
export function NeuralChapter() {
  const c = copy.neural
  const habs = getStation('neurotech')
  return (
    <Chapter
      id="neural"
      labelledBy="neural-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.06)
        linesIn(tl, q('.headline .line__inner'), 0.1, 0.14)
        fadeIn(tl, q('.station-meta, .body'), 0.26, 0.08, 0.03)
        fadeIn(tl, q('.annotation-list li'), 0.44, 0.08, 0.02)
        fadeOut(tl, q('.neural__copy'), 0.86, 0.08)
      }}
    >
      <div className="neural__copy block block--bottom-left">
        <p className="mono chapter-index">{c.index}</p>
        <Headline id="neural-title" lines={c.headline} className="headline--m" />
        <p className="mono station-meta">
          {habs.company} · {habs.period}
        </p>
        <p className="body">{c.body}</p>
        {/* Visible on small screens; on desktop the same facts float in 3D and this list is for screen readers. */}
        <ul className="mono annotation-list">
          {c.annotations.map((a) => (
            <li key={a.key}>
              <strong>{a.key}</strong> <span>{a.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  )
}
