import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { profile } from '../data/profile'
import { fadeOut, linesIn, linesOut } from '../lib/motion'

/** 0 — Signal. Near-darkness, a name, a live trace; then the first statement. */
export function SignalChapter() {
  return (
    <Chapter
      id="signal"
      labelledBy="intro-name"
      timeline={(tl, q) => {
        fadeOut(tl, q('.scroll-cue'), 0.02, 0.05)
        fadeOut(tl, q('.intro__id'), 0.2, 0.1)
        linesIn(tl, q('.statement .line__inner'), 0.3, 0.18)
        linesOut(tl, q('.statement .line__inner'), 0.84, 0.1)
      }}
    >
      <div className="intro__id">
        <h1 id="intro-name" className="intro__name">
          {profile.name}
        </h1>
        <p className="mono intro__role">{profile.role}</p>
        <p className="mono intro__meta">{copy.signal.meta}</p>
      </div>
      <Headline lines={profile.statement} className="statement display" />
      <p className="mono scroll-cue" aria-hidden="true">
        <span>{copy.signal.scrollCue}</span>
      </p>
    </Chapter>
  )
}
