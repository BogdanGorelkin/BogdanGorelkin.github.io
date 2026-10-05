import type { CareerStation } from './types'

/**
 * Career stations in chronological order. The 3D timeline places one
 * environment per station; fill in company / role / period as they're ready.
 */
export const career: CareerStation[] = [
  { id: 'research', era: 'Research', highlights: [] },
  { id: 'robotics', era: 'Robotics', highlights: [] },
  { id: 'medtech', era: 'MedTech', highlights: [] },
  { id: 'neurotech', era: 'NeuroTech', company: 'HABS', current: true, highlights: [] },
  { id: 'next', era: "What's next?", summary: 'The next system worth building.', highlights: [] },
]
