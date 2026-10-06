import { useEffect } from 'react'
import { Chapter } from '../components/Chapter'
import { Headline } from '../components/Headline'
import { copy } from '../data/copy'
import { profile } from '../data/profile'
import { fadeOut, linesOut } from '../lib/motion'

/** Seconds before the statement appears on its own if the visitor hasn't scrolled. */
const STATEMENT_DELAY = 5

/**
 * 0 — Signal. Near-darkness, a name, a live trace. The statement arrives by
 * itself after a few seconds (or on the first scroll), so the point lands in
 * the first ten seconds; scroll then carries it away.
 */
export function SignalChapter() {
  useEffect(() => {
    const els = [document.getElementById('intro-statement'), document.getElementById('intro-tail')]
    const reveal = () => els.forEach((el) => el?.classList.add('is-revealed'))
    const timer = window.setTimeout(reveal, STATEMENT_DELAY * 1000)
    window.addEventListener('scroll', reveal, { once: true, passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', reveal)
    }
  }, [])

  return (
    <Chapter
      id="signal"
      labelledBy="intro-name"
      timeline={(tl, q) => {
        fadeOut(tl, q('.scroll-cue'), 0.02, 0.05)
        fadeOut(tl, q('.intro__id'), 0.2, 0.1)
        linesOut(tl, q('.statement .line__inner'), 0.84, 0.1)
        fadeOut(tl, q('.statement-tail'), 0.82, 0.08)
      }}
    >
      <div className="intro__id">
        <h1 id="intro-name" className="intro__name">
          {profile.name}
        </h1>
        {/* Positioning, connected to the name: readable, but quieter than the statement. */}
        <p className="intro__role">
          {profile.role}
          <span className="intro__domains">{copy.signal.domains}</span>
        </p>
        <p className="mono intro__meta">{copy.signal.meta}</p>
      </div>
      <Headline id="intro-statement" lines={profile.statement} className="statement display" />
      <p id="intro-tail" className="statement-tail">
        {profile.statementTail}
      </p>
      {/* Bottom centre, on the film's axis: the one instruction the first screen gives. */}
      <p className="mono scroll-cue" aria-hidden="true">
        <span>{copy.signal.scrollCue}</span>
        <span className="scroll-cue__line" />
      </p>
    </Chapter>
  )
}
