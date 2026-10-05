import { useFrame, type RootState } from '@react-three/fiber'
import type { RefObject } from 'react'
import type { Object3D } from 'three'
import { stage, type PresenceKey } from '../../experience/director'

/**
 * Binds an environment group to its director presence: hidden (not drawn,
 * no per-frame work) at 0, otherwise `onFrame` receives the presence 0–1.
 */
export function usePresence(
  key: PresenceKey,
  ref: RefObject<Object3D | null>,
  onFrame?: (presence: number, state: RootState, delta: number) => void,
) {
  useFrame((state, delta) => {
    const obj = ref.current
    if (!obj) return
    const p = stage.presence[key]
    obj.visible = p > 0.002
    if (obj.visible) onFrame?.(p, state, delta)
  })
}
