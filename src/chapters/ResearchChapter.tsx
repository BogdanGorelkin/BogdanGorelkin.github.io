import { Chapter } from '../components/Chapter'
import { DeepDiveLinks } from '../components/DeepDiveLinks'
import { Headline } from '../components/Headline'
import { TriadStrip } from '../components/TriadStrip'
import { copy } from '../data/copy'
import { getStation } from '../data/experience'
import { fadeIn, fadeOut, linesIn } from '../lib/motion'

/** 8 — Research. Before products: programmable matter — modules that rearrange themselves. */
export function ResearchChapter() {
  const c = copy.research
  const station = getStation('research')
  return (
    <Chapter
      id="research"
      labelledBy="research-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.06)
        linesIn(tl, q('.headline .line__inner'), 0.1, 0.18)
        fadeIn(tl, q('.station-meta, .body, .triad > div, .deep-dive, .research-earlier'), 0.32, 0.08, 0.03)
        fadeOut(tl, q('.research__copy'), 0.88, 0.07)
      }}
    >
      <div className="research__copy block block--bottom-left">
        <p className="mono chapter-index">{c.index}</p>
        <Headline id="research-title" lines={c.headline} className="headline--m" />
        <p className="mono station-meta">
          {station.company} · {station.role} · {station.period}
        </p>
        <p className="body">{station.summary}</p>
        <TriadStrip triad={c.triad} />
        <DeepDiveLinks item={station} />
        <p className="mono research-earlier">{c.earlier}</p>
      </div>
    </Chapter>
  )
}
