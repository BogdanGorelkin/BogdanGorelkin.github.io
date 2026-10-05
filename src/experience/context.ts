import { createContext, useContext } from 'react'
import type { Quality } from './quality'

export type ExperienceSettings = { quality: Quality; reducedMotion: boolean }

export const ExperienceContext = createContext<ExperienceSettings | null>(null)

export function useExperience(): ExperienceSettings {
  const value = useContext(ExperienceContext)
  if (!value) throw new Error('useExperience must be used inside <Experience>')
  return value
}
