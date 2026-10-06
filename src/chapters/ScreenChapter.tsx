import { Chapter } from '../components/Chapter'
import { DeepDiveLinks } from '../components/DeepDiveLinks'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { getProject } from '../data/projects'
import { fadeIn, fadeOut, linesIn, linesOut } from '../lib/motion'

/** 4 — Microsoft Hackathon: from signal to environment. The camera pushes through the screen into a room. */
export function ScreenChapter() {
  const c = copy.screen
  const project = getProject(c.projectId)
  const place = [project.location, project.period].filter(Boolean).join(' / ')
  return (
    <Chapter
      id="screen"
      labelledBy="screen-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.04)
        linesIn(tl, q('.statement .line__inner'), 0.1, 0.2)
        linesOut(tl, q('.statement .line__inner'), 0.46, 0.08)
        fadeOut(tl, q('.chapter-index'), 0.46)
        fadeIn(tl, q('.case > *'), 0.58, 0.1, 0.02)
        fadeOut(tl, q('.case'), 0.95, 0.04)
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <Headline id="screen-title" lines={c.headline} className="statement display display--center" />
      {/* Credits under the footage: the media is the protagonist, this stays secondary. */}
      <article className="case case--film block block--bottom-left" aria-label={project.title}>
        <div className="case__meta">
          <p className="mono case__label">{project.context}</p>
          {place && <p className="mono case__place">{place}</p>}
          {project.recognition && <p className="mono case__award">{project.recognition}</p>}
        </div>
        <div className="case__main">
          <h3 className="case__title">{project.title}</h3>
          {project.subtitle && <p className="case__subtitle">{project.subtitle}</p>}
          <p className="case__desc">{project.summary}</p>
        </div>
        <div className="case__side">
          {project.flow && (
            <ol className="mono flow" aria-label="Signal chain">
              {project.flow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          )}
          <DeepDiveLinks item={project} primaryOnly prominent />
        </div>
      </article>
    </Chapter>
  )
}
