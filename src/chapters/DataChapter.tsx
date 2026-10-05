import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { caseLabel, getProject } from '../data/projects'
import { emphasise, fadeIn, fadeOut, linesIn } from '../lib/motion'

/** Local-progress windows in which each layer is "under the lens" (see shots.ts, t 2.18–3.0). */
const LAYER_WINDOWS: [number, number][] = [
  [0.12, 0.38],
  [0.38, 0.6],
  [0.6, 0.82],
  [0.82, 1],
]

/** 2 — System. One stream becomes many; the camera flies through the stack. */
export function DataChapter() {
  const c = copy.data
  const project = getProject(c.projectId)
  return (
    <Chapter
      id="data"
      labelledBy="data-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.02)
        linesIn(tl, q('.headline .line__inner'), 0.05, 0.12)
        fadeIn(tl, q('.layers'), 0.1)
        q('.layers li').forEach((li, i) => {
          const [from, to] = LAYER_WINDOWS[i]!
          emphasise(tl, li, from, to)
        })
        fadeIn(tl, q('.body'), 0.3)
        fadeIn(tl, q('.case-tag'), 0.5)
        fadeOut(tl, q('.data__copy'), 0.88, 0.08)
        fadeOut(tl, q('.layers'), 0.94, 0.05)
      }}
    >
      <div className="data__copy block block--top-left">
        <p className="mono chapter-index">{c.index}</p>
        <Headline id="data-title" lines={c.headline} className="headline--m" />
        <p className="body">{c.body}</p>
        <p className="mono case-tag">
          {caseLabel(project)}
          {project.context && <> — {project.context}</>} — {project.title}
        </p>
      </div>
      <ol className="mono layers" aria-label="System layers">
        {c.layers.map((layer) => (
          <li key={layer}>{layer}</li>
        ))}
      </ol>
    </Chapter>
  )
}
