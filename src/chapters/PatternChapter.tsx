import { Chapter } from '../components/Chapter'
import { copy } from '../data/copy'
import { career } from '../data/experience'
import { fadeIn, fadeOut, linesIn } from '../lib/motion'

/**
 * 9 — The pattern. Two beats of type, then the three threads (human,
 * hardware, software) running through every station carry the point.
 */
export function PatternChapter() {
  const c = copy.pattern
  return (
    <Chapter
      id="pattern"
      labelledBy="pattern-title"
      timeline={(tl, q) => {
        fadeIn(tl, q('.chapter-index'), 0.06)
        // "The technology changed." … beat … "The pattern didn't."
        linesIn(tl, q('.line:nth-child(1) .line__inner'), 0.1, 0.12)
        linesIn(tl, q('.line:nth-child(2) .line__inner'), 0.32, 0.12)
        fadeIn(tl, q('.pattern-words li, .pattern-eras'), 0.44, 0.08, 0.04)
        fadeOut(tl, q('.pattern__copy, .pattern-words, .pattern-eras'), 0.9, 0.06)
      }}
    >
      <div className="pattern__copy block block--top-left">
        <p className="mono chapter-index">{c.index}</p>
        <h2 id="pattern-title" className="headline headline--payoff">
          {c.headline.map((line, i) => (
            <span className="line" key={i}>
              <span className="line__inner">{line}</span>{' '}
            </span>
          ))}
        </h2>
      </div>
      {/* Desktop: these words are pinned to the threads in 3D; phones and screen readers get them here. */}
      <ul className="pattern-words" aria-label="Present in every chapter">
        {c.threads.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
      <p className="mono pattern-eras block block--bottom-left">
        {career.map((s) => s.theme).join('  →  ')}
      </p>
    </Chapter>
  )
}
