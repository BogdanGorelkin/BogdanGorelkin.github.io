import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { gsap } from '../lib/gsap'
import { Atmosphere } from '../scenes/Atmosphere'
import { DataScene } from '../scenes/DataScene'
import { FieldScene } from '../scenes/FieldScene'
import { MedTechScene } from '../scenes/MedTechScene'
import { NeuralScene } from '../scenes/NeuralScene'
import { PatternScene } from '../scenes/PatternScene'
import { ResearchScene } from '../scenes/ResearchScene'
import { ScreenScene } from '../scenes/ScreenScene'
import { SignalScene } from '../scenes/SignalScene'
import { TimelineScene } from '../scenes/TimelineScene'
import { CameraRig } from './CameraRig'
import { LabelProjector, SpatialLabels } from './SpatialLabels'
import { ExperienceContext } from './context'
import { stage } from './director'
import { detectTier, getQuality } from './quality'
import { subscribe, getActiveChapter, getOffstage } from './scrollStore'

/**
 * The WebGL layer: one fixed, decorative canvas behind the DOM film.
 * Lazy-loaded so the DOM paints first; everything here is aria-hidden.
 */
export default function Experience({ reducedMotion }: { reducedMotion: boolean }) {
  const quality = useMemo(() => getQuality(detectTier()), [])
  const [dpr, setDpr] = useState(quality.dpr[1])
  const wrapper = useRef<HTMLDivElement>(null)
  const settings = useMemo(() => ({ quality, reducedMotion }), [quality, reducedMotion])

  // Timed intro (not scroll-driven): the trace draws itself across the dark.
  useEffect(() => {
    if (reducedMotion) {
      stage.intro = 1
      return
    }
    stage.intro = 0
    const tl = gsap
      .timeline({ delay: 0.9 })
      .to(stage, { intro: 0.4, duration: 0.01 })
      .to(stage, { intro: 0.52, duration: 2.6, ease: 'power2.out' })
      .to(stage, { intro: 1, duration: 2.2, ease: 'power1.in' })
    const fadeIn = gsap.fromTo(wrapper.current, { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power1.out', clearProps: 'opacity' })
    return () => {
      tl.kill()
      fadeIn.revert()
    }
  }, [reducedMotion])

  return (
    <div className="webgl" ref={wrapper} aria-hidden="true">
      <Canvas
        dpr={[quality.dpr[0], dpr]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
        camera={{ fov: 30, near: 0.1, far: 4000, position: [-3, 0.15, 10] }}
        frameloop={reducedMotion ? 'demand' : 'always'}
      >
        <ExperienceContext.Provider value={settings}>
          <PerformanceMonitor
            onDecline={() => setDpr(quality.dpr[0])}
            onIncline={() => setDpr(quality.dpr[1])}
          />
          <color attach="background" args={['#07080a']} />
          <RenderGate reducedMotion={reducedMotion} wrapper={wrapper} />
          <CameraRig />
          <Atmosphere />
          <SignalScene />
          <NeuralScene />
          <DataScene />
          <ScreenScene />
          <FieldScene />
          <TimelineScene />
          <MedTechScene />
          <ResearchScene />
          <PatternScene />
          {quality.spatialLabels && <LabelProjector />}
        </ExperienceContext.Provider>
      </Canvas>
      {quality.spatialLabels && <SpatialLabels />}
    </div>
  )
}

/**
 * Decides when frames are worth rendering.
 * - Index section covering the screen → rest (demand mode, no invalidations);
 *   scrolling back resumes the loop. Never a dead state.
 * - Reduced motion → render only on chapter change, with a short crossfade cut.
 */
function RenderGate({
  reducedMotion,
  wrapper,
}: {
  reducedMotion: boolean
  wrapper: RefObject<HTMLDivElement | null>
}) {
  const setFrameloop = useThree((s) => s.setFrameloop)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    let chapter = getActiveChapter()
    let timer = 0
    const update = () => {
      const offstage = getOffstage()
      if (!reducedMotion) {
        setFrameloop(offstage ? 'demand' : 'always')
        return
      }
      const next = getActiveChapter()
      if (next === chapter) return
      chapter = next
      const el = wrapper.current
      el?.classList.add('is-cutting')
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        invalidate()
        el?.classList.remove('is-cutting')
      }, 280)
    }
    update()
    invalidate()
    const unsubscribe = subscribe(update)
    return () => {
      unsubscribe()
      window.clearTimeout(timer)
    }
  }, [reducedMotion, setFrameloop, invalidate, wrapper])

  return null
}
