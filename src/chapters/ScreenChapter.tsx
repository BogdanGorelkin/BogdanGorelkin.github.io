import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { caseLabel, getProject } from '../data/projects'
import { fadeIn, fadeOut, linesIn, linesOut } from '../lib/motion'

/** 3 — Software leaves the screen. The camera pushes through into a room. */
export function ScreenChapter() {
  const c = copy.screen
  const project = getProject(c.projectId)
  const place = [project.location, project.year].filter(Boolean).join(' / ')
  return (
    <Chapter
      id="screen"
      labelledBy="screen-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.04)
        linesIn(tl, q('.statement .line__inner'), 0.1, 0.2)
        linesOut(tl, q('.statement .line__inner'), 0.46, 0.08)
        fadeOut(tl, q('.chapter-index'), 0.46)
        fadeIn(tl, q('.case > *'), 0.56, 0.1, 0.012)
        fadeOut(tl, q('.case'), 0.95, 0.04)
      }}
    >
      <p className="mono chapter-index block block--top-left">{c.index}</p>
      <Headline id="screen-title" lines={c.headline} className="statement display display--center" />
      <article className="case block block--bottom-right" aria-label={project.title}>
        <p className="mono case__label">
          {caseLabel(project)}
          {project.context && <> — {project.context}</>}
        </p>
        {place && <p className="mono case__place">{place}</p>}
        <h3 className="case__title">{project.title}</h3>
        {project.subtitle && <p className="case__subtitle">{project.subtitle}</p>}
        {project.recognition && <p className="mono case__award">{project.recognition}</p>}
        {project.flow && (
          <ol className="mono flow" aria-label="Signal chain">
            {project.flow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}
        <p className="case__desc">{project.description ?? <span className="pending">Project details to be added.</span>}</p>
        <ul className="mono tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </article>
    </Chapter>
  )
}
