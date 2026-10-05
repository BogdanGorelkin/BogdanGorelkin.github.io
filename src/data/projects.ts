import type { FieldTest, Project } from './types'

/**
 * Case studies, in display order. Case numbers ("CASE 01") are derived from
 * this order — reorder the array and the labels follow. The first two are
 * staged in the film (System, Software leaves the screen); all appear in the
 * Index.
 */
export const projects: Project[] = [
  {
    // TODO: PUBLIC-SAFE CONTENT REVIEW — kept deliberately generic (no device
    // names, customers, data or internal architecture). Confirm before publishing.
    id: 'habs-multi-device',
    title: 'Simultaneous multi-device EEG',
    subtitle: 'Several wireless headbands streaming at once, through mobile, into one realtime system',
    context: 'HABS',
    location: 'Paris',
    description:
      'Software for biometric signal acquisition and protocol execution: device connection over BLE, mobile apps, realtime pipelines and the tools that run experiments.',
    flow: ['EEG headbands', 'BLE', 'Mobile', 'Realtime backend', 'Experience'],
    tags: ['React Native', 'BLE', 'TypeScript', 'Node.js', 'Python', 'WebSockets'],
    media: [
      {
        kind: 'placeholder',
        label: 'MULTI-DEVICE EEG — MEDIA PENDING REVIEW',
        alt: 'Several EEG headbands streaming into one system',
        aspect: 16 / 9,
      },
    ],
  },
  {
    id: 'eeg-hackathon-cph',
    title: 'EEG-driven game environment',
    subtitle: 'Brain signals steering a game world, the room’s light and the controller in your hands',
    context: 'Microsoft Hackathon',
    location: 'Copenhagen',
    year: 2026,
    recognition: 'Crowd Award',
    description:
      'Realtime EEG drove a game environment, with LEDs and controller feedback orchestrated around it — the room reacted to the player’s state.',
    flow: ['Brain signal', 'Data', 'Game world', 'LEDs', 'Controller'],
    tags: ['Realtime EEG', 'Game environment', 'Environment orchestration', 'LED & controller feedback'],
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
  {
    id: 'temmacare',
    title: 'TemmaCare — connected telemedicine',
    subtitle: 'Apps and diagnostic hardware working together, so patients can take measurements with a doctor remotely',
    context: 'AuxaSphere',
    location: 'Paris',
    description:
      'A suite of applications for secure, reliable data exchange between medical devices, patients and doctors: device-data visualisation, encryption, storage and delivery, multi-role UX, microservices.',
    tags: ['React', 'React Native', 'Microservices', 'Medical devices', 'Linux'],
    media: [],
    links: [{ label: 'temma.care', href: 'https://temma.care/' }],
  },
  {
    id: 'modular-robots',
    title: 'Modular robots: time synchronisation',
    subtitle: 'Self-reconfigurable robots that keep a shared clock',
    context: 'Inria & Femto-ST',
    year: 2021,
    description:
      'Behaviour of robot modules as finite-state machines, a boosted time-synchronisation protocol (MRTP) and movement simulation, in VisibleSim and BIP.',
    tags: ['C++', 'VisibleSim', 'Distributed algorithms'],
    media: [],
    links: [
      { label: 'Code', href: 'https://github.com/BogdanGorelkin/Boosted-MRTP' },
      { label: 'Video', href: 'https://youtu.be/x4lbToZrboo' },
    ],
  },
  {
    id: 'rsa-side-channel',
    title: 'RSA side-channel attack on STM32',
    subtitle: 'Probing an embedded crypto implementation through its side channels',
    context: 'Polytech Nantes / IETR',
    year: 2020,
    description: 'Implemented RSA on an STM32 microcontroller and investigated its vulnerabilities through side channels.',
    tags: ['C', 'STM32', 'Embedded security'],
    media: [],
    links: [{ label: 'Code', href: 'https://github.com/BogdanGorelkin/RSA-SCA' }],
  },
]

/**
 * Real-world tests. Order matters: the first entries get the largest, nearest
 * planes in the Field scene.
 */
export const fieldTests: FieldTest[] = [
  {
    id: 'wall-lamp',
    title: 'Networked wall lamp — ESP8266',
    year: 2024,
    description: 'From idea to MVP: a wall lamp controlled over the local network, remotely, or through Siri.',
    media: {
      kind: 'image',
      src: '/images/field/esp8266-lamp-prototype.webp',
      alt: 'Soldering an ESP8266 board for a networked wall lamp',
      aspect: 16 / 9,
    },
    links: [{ label: 'Video', href: 'https://youtu.be/EpEfgixWeLc' }],
  },
  {
    id: 'skydiving',
    title: 'Skydiving experiment',
    media: { kind: 'placeholder', label: 'SKYDIVING EXPERIMENT', alt: 'Skydiving experiment', aspect: 4 / 5 },
  },
  {
    id: 'hackathon-floor',
    title: 'Hackathon floor — Copenhagen 2026',
    location: 'Copenhagen',
    year: 2026,
    media: { kind: 'placeholder', label: 'HACKATHON — COPENHAGEN 2026', alt: 'Microsoft Hackathon, Copenhagen', aspect: 1 },
  },
  {
    id: 'motorcycle',
    title: 'Motorcycle / mobile testing',
    media: { kind: 'placeholder', label: 'MOBILE TESTING', alt: 'Motorcycle and mobile testing', aspect: 3 / 2 },
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
