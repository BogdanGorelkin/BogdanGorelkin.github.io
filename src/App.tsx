import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { ContactChapter } from './chapters/ContactChapter'
import { DataChapter } from './chapters/DataChapter'
import { MedTechChapter } from './chapters/MedTechChapter'
import { PatternChapter } from './chapters/PatternChapter'
import { PlayerChapter } from './chapters/PlayerChapter'
import { ResearchChapter } from './chapters/ResearchChapter'
import { RevealChapter } from './chapters/RevealChapter'
import { FieldChapter } from './chapters/FieldChapter'
import { IndexSection } from './chapters/IndexSection'
import { NeuralChapter } from './chapters/NeuralChapter'
import { ScreenChapter } from './chapters/ScreenChapter'
import { SignalChapter } from './chapters/SignalChapter'
import { Nav } from './components/Nav'
import { navigateToHash } from './experience/navigation'
import { supportsWebGL } from './experience/quality'
import { useScrollDirector } from './experience/useScrollDirector'
import { useReducedMotion } from './hooks/useReducedMotion'

// three / R3F / drei load as a separate chunk after the DOM film has painted.
const Experience = lazy(() => import('./experience/Experience'))

export function App() {
  const reducedMotion = useReducedMotion()
  const [webgl] = useState(supportsWebGL)

  // Cinematic layout (fixed stages) vs static flow — must precede trigger setup.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('is-cinematic', !reducedMotion)
  }, [reducedMotion])

  useScrollDirector(reducedMotion)
  useHashLinks(reducedMotion)

  return (
    <>
      <a className="skip-link" href="#index">
        Skip to the work and experience
      </a>
      <Nav />
      {webgl && (
        <Suspense fallback={null}>
          <Experience reducedMotion={reducedMotion} />
        </Suspense>
      )}
      <div className="veil" aria-hidden="true" />
      <main id="top" tabIndex={-1}>
        <SignalChapter />
        <NeuralChapter />
        <DataChapter />
        <PlayerChapter />
        <ScreenChapter />
        <FieldChapter />
        <RevealChapter />
        <MedTechChapter />
        <ResearchChapter />
        <PatternChapter />
        <ContactChapter />
        <IndexSection />
      </main>
    </>
  )
}

/** Upgrades in-page links into story-aware jumps, and honours a hash on load. */
function useHashLinks(reducedMotion: boolean) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
      const hash = link?.getAttribute('href')
      if (!hash || !navigateToHash(hash, reducedMotion)) return
      e.preventDefault()
      history.replaceState(null, '', hash === '#top' ? location.pathname + location.search : hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [reducedMotion])

  useEffect(() => {
    if (!location.hash) return
    let raf = 0
    void document.fonts.ready.then(() => {
      raf = requestAnimationFrame(() => navigateToHash(location.hash, true))
    })
    return () => cancelAnimationFrame(raf)
  }, [])
}
