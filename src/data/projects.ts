import type { FieldTest, Project } from './types'

/**
 * Case studies, in display order. Case numbers ("CASE 01") are derived from
 * this order — reorder the array and the labels follow.
 */
export const projects: Project[] = [
  {
    id: 'multi-device-eeg',
    title: 'Realtime multi-device EEG',
    subtitle: 'Multiple wireless headbands streaming into one software system',
    tags: ['EEG', 'BLE', 'Realtime', 'Mobile / edge'],
    media: [
      {
        kind: 'placeholder',
        label: 'MULTI-DEVICE SYSTEM — MEDIA TO BE ADDED',
        alt: 'Multi-device EEG system',
        aspect: 16 / 9,
      },
    ],
  },
  {
    id: 'eeg-hackathon-cph',
    title: 'EEG-driven interactive environment',
    subtitle: 'Brain signals shaping a game world and physical light',
    context: 'Microsoft Hackathon',
    location: 'Copenhagen',
    year: 2026,
    recognition: 'Crowd Award',
    tags: ['EEG', 'Game world', 'LED feedback', 'Realtime orchestration'],
    media: [
      // Replace with { kind: 'video', sources: { webm: '/videos/hackathon-cph.webm', mp4: '/videos/hackathon-cph.mp4' }, poster: '/images/hackathon-cph-poster.jpg', alt: '…', aspect: 16 / 9 }
      {
        kind: 'placeholder',
        label: 'HACKATHON FOOTAGE — COPENHAGEN 2026',
        alt: 'EEG-driven game environment at the Microsoft Hackathon, Copenhagen',
        aspect: 16 / 9,
      },
    ],
  },
]

export const fieldTests: FieldTest[] = [
  {
    id: 'skydiving',
    title: 'Skydiving experiment',
    media: { kind: 'placeholder', label: 'SKYDIVING EXPERIMENT', alt: 'Skydiving experiment', aspect: 4 / 5 },
  },
  {
    id: 'motorcycle',
    title: 'Motorcycle / mobile testing',
    media: { kind: 'placeholder', label: 'MOBILE TESTING', alt: 'Motorcycle and mobile testing', aspect: 3 / 2 },
  },
  {
    id: 'prototypes',
    title: 'Hardware prototypes',
    media: { kind: 'placeholder', label: 'HARDWARE PROTOTYPES', alt: 'Hardware prototypes', aspect: 1 },
  },
  {
    id: 'hackathons',
    title: 'Hackathons',
    media: { kind: 'placeholder', label: 'HACKATHONS', alt: 'Hackathons', aspect: 3 / 2 },
  },
  {
    id: 'field-demos',
    title: 'Field demos',
    media: { kind: 'placeholder', label: 'FIELD DEMOS', alt: 'Field demos', aspect: 4 / 5 },
  },
]

export function getProject(id: string): Project {
  const project = projects.find((p) => p.id === id)
  if (!project) throw new Error(`Unknown project id: ${id}`)
  return project
}

export function caseLabel(project: Project): string {
  const index = projects.indexOf(project)
  return `CASE ${String(index + 1).padStart(2, '0')}`
}
