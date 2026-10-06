import { Chapter } from '../components/Chapter'
import { DeepDiveLinks } from '../components/DeepDiveLinks'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { caseLabel, getProject } from '../data/projects'
import { fadeIn, fadeOut, linesIn } from '../lib/motion'

/**
 * 3 — Scale (HABS Player). The screen behind becomes a grid of experiments
 * running on one system. The point isn't the feature list — it's that the
 * team stopped rebuilding experiments and started running them.
 */
export function PlayerChapter() {
  const c = copy.player
  const project = getProject(c.projectId)
  return (
    <Chapter
      id="player"
      labelledBy="player-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.04)
        linesIn(tl, q('.headline .line__inner'), 0.1, 0.16)
        fadeIn(tl, q('.player__copy > :not(.headline):not(.chapter-index)'), 0.3, 0.08, 0.03)
        fadeOut(tl, q('.player__copy'), 0.86, 0.08)
      }}
    >
      <div className="player__copy block block--bottom-left">
        <p className="mono chapter-index">{c.index}</p>
        <Headline id="player-title" lines={c.headline} className="headline--m" />
        <p className="lede">{c.lede}</p>
        <dl className="mono before-after">
          <div>
            <dt>Before</dt>
            <dd>{c.before}</dd>
          </div>
          <div>
            <dt>After</dt>
            <dd>{c.after}</dd>
          </div>
        </dl>
        <p className="mono case-tag">
          {caseLabel(project)} — {project.title}
        </p>
        <DeepDiveLinks item={project} primaryOnly prominent />
      </div>
    </Chapter>
  )
}
