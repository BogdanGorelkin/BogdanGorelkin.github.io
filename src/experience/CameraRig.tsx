import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import * as THREE from 'three'
import { CHAPTERS } from './chapters'
import { useExperience } from './context'
import { buildDirector, sampleCamera, signalTime, stage, type CameraSample } from './director'
import { story } from './scrollStore'

/** Below this aspect the framing switches to the portrait shot overrides. */
const PORTRAIT = 0.85

/**
 * Per frame: story clock → director timeline → stage → camera.
 * Runs before every scene (priority −1) so all of them read a settled stage.
 */
export function CameraRig() {
  const { reducedMotion, quality } = useExperience()
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const director = useMemo(() => buildDirector(), [])
  const sample = useMemo<CameraSample>(() => ({ pos: [0, 0, 0], look: [0, 0, 0], fov: 35 }), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const look = useRef<THREE.Vector3 | null>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!quality.parallax || reducedMotion) return
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [quality.parallax, reducedMotion])

  useEffect(() => () => void director.kill(), [director])

  useFrame((state, delta) => {
    // Reduced motion: cut to each chapter's key shot instead of travelling.
    let time = story.time
    if (reducedMotion) {
      const i = Math.min(CHAPTERS.length - 1, Math.floor(time))
      time = i + CHAPTERS[i]!.keyT
    }
    stage.time = time
    stage.clock = reducedMotion ? 4 : signalTime()
    director.seek(time, false)

    const portrait = state.size.width / state.size.height < PORTRAIT
    sampleCamera(time, portrait, sample)
    target.set(...sample.pos)
    if (!reducedMotion) {
      // A few centimetres of pointer parallax — enough to feel physical.
      target.x += pointer.current.x * 0.25
      target.y -= pointer.current.y * 0.15
    }

    const snap = reducedMotion || !look.current
    if (!look.current) look.current = new THREE.Vector3()
    if (snap) {
      camera.position.copy(target)
      look.current.set(...sample.look)
    } else {
      easing.damp3(camera.position, target, 0.22, delta)
      easing.damp3(look.current, sample.look, 0.28, delta)
    }
    camera.lookAt(look.current)

    // Keep horizontal coverage on tall screens by widening the vertical FOV.
    const aspect = state.size.width / state.size.height
    const fov = aspect < 0.75 ? THREE.MathUtils.radToDeg(2 * Math.atan((Math.tan(THREE.MathUtils.degToRad(sample.fov / 2)) * 0.75) / aspect)) : sample.fov
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = snap ? fov : THREE.MathUtils.damp(camera.fov, fov, 6, delta)
      camera.updateProjectionMatrix()
    }
  }, -1)

  return null
}
