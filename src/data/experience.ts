import type { CareerStation } from './types'

/**
 * Career stations in chronological order. The 3D timeline places one
 * environment per station. Periods are year-level on purpose: the old site
 * and the CVs disagree on some months (see README → content notes).
 */
export const career: CareerStation[] = [
  {
    id: 'research',
    era: 'Research',
    role: 'Researcher',
    company: 'Polytech Nantes · TUSUR',
    period: '2018 — 2020',
    location: 'Nantes · Tomsk',
    summary: 'Embedded security and wireless IoT: side-channel analysis of RSA on an STM32, and NB-IoT channel modelling for telemetry devices.',
    highlights: [],
    links: [
      { label: 'RSA side-channel', href: 'https://github.com/BogdanGorelkin/RSA-SCA' },
      { label: 'NB-IoT downlink', href: 'https://github.com/BogdanGorelkin/NB-IoT-Downlink-Physical-Layer-Design' },
    ],
  },
  {
    id: 'robotics',
    era: 'Robotics',
    role: 'Research engineer',
    company: 'Inria & Femto-ST',
    period: '2020 — 2021',
    location: 'Lille · Montbéliard',
    summary: 'Modular, self-reconfigurable robots: module behaviour as finite-state machines and a stronger time-synchronisation protocol between modules.',
    highlights: [],
    links: [
      { label: 'Boosted MRTP', href: 'https://github.com/BogdanGorelkin/Boosted-MRTP' },
      { label: 'Simulation video', href: 'https://youtu.be/x4lbToZrboo' },
    ],
  },
  {
    id: 'medtech',
    era: 'MedTech',
    role: 'Software application developer',
    company: 'AuxaSphere · TemmaCare',
    period: '2022 — 2025',
    location: 'Paris',
    summary: 'Telemedicine where apps and diagnostic hardware work together, so patients can run measurements and consult a doctor remotely.',
    highlights: ['Medical-device data: visualisation, encryption, storage, delivery', 'UX & UI for a multi-role system', 'Microservices, reusable strictly typed packages', 'Mentoring and code review'],
    links: [{ label: 'temma.care', href: 'https://temma.care/' }],
  },
  {
    // TODO: PUBLIC-SAFE CONTENT REVIEW — generic on purpose; confirm wording.
    id: 'neurotech',
    era: 'NeuroTech',
    role: 'Full-stack developer',
    company: 'HABS',
    period: '2025 — now',
    location: 'Paris',
    summary: 'Human Augmented Brain Systems. Software for biometric signal acquisition, processing workflows and protocol execution — from PoC to production.',
    highlights: ['EEG devices over BLE, several at once', 'React / React Native, backend services, infrastructure', 'Realtime data pipelines and experiment tooling', 'CI/CD pipelines that reduce release friction'],
    current: true,
  },
  {
    id: 'next',
    era: "What's next?",
    summary: 'Robotics, neurotech, medtech, connected products — systems where software meets people and hardware.',
    highlights: [],
  },
]

/** Rail / label text: the current station names its company. */
export const stationLabel = (s: CareerStation) => (s.current && s.company ? `${s.company} / ${s.era}` : s.era)
