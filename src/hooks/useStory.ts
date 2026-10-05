import { useSyncExternalStore } from 'react'
import { getActiveChapter, getOffstage, subscribe } from '../experience/scrollStore'

/** Index of the chapter currently on screen. Re-renders only on chapter change. */
export function useActiveChapter(): number {
  return useSyncExternalStore(subscribe, getActiveChapter, () => 0)
}

/** True while the plain Index section covers the viewport. */
export function useOffstage(): boolean {
  return useSyncExternalStore(subscribe, getOffstage, () => false)
}
