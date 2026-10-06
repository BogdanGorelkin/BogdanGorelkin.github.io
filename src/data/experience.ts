import { LINKS } from './projects'
import type { CareerStation, EarlierRole } from './types'

/**
 * Stations on the career line, in chronological order. The film visits them
 * backwards (HABS → MedTech → Research) after the reveal. Periods are
 * year-level on purpose: the old site and the CVs disagree on some months.
 */
export const career: CareerStation[] = [
  {
    id: 'research',
    era: 'Research',
    theme: 'Programmable matter',
    role: 'Research engineer',
    company: 'Inria & Femto-ST',
    period: '2020 — 2021',
    location: 'Lille · Montbéliard',
    summary: 'Self-reconfigurable modular robots: rules for each module as finite-state machines, and a stronger time-synchronisation protocol between them.',
    highlights: [],
    deepDives: [
      { label: 'Watch the simulation', href: 'https://youtu.be/x4lbToZrboo', platform: 'YouTube' },
      { label: 'Read the code', href: 'https://github.com/BogdanGorelkin/Boosted-MRTP', platform: 'GitHub' },
    ],
  },
  {
    id: 'medtech',
    era: 'MedTech',
    theme: 'Remote medicine',
    role: 'Software application developer',
    company: 'TemmaCare · AuxaSphere',
    period: '2022 — 2025',
    location: 'Paris',
    summary: 'A patient at home, diagnostic devices beside them, a doctor on the other end — the software connected all three.',
    highlights: [
      'Medical-device data: visualisation, encryption, storage, delivery',
      'Live oximetry graphs on canvas; JavaFX → React + TypeScript',
      'UX & UI for a multi-role system',
      'Microservices, reusable strictly typed packages; mentoring and code review',
    ],
    deepDives: [
      { label: 'See the medical device work', href: LINKS.medtechPost, platform: 'LinkedIn' },
      { label: 'temma.care', href: 'https://temma.care/', platform: 'Website' },
    ],
  },
  {
    // TODO: PUBLIC-SAFE CONTENT REVIEW — generic on purpose; confirm wording.
    id: 'neurotech',
    era: 'HABS',
    theme: 'Connected human signals',
    role: 'Full-stack developer',
    company: 'HABS — Human Augmented Brain Systems',
    period: '2025 — now',
    location: 'Paris',
    summary: 'Software for biometric signal acquisition, processing workflows and protocol execution — from PoC to production.',
    highlights: [
      'Device integration over BLE, several devices at once',
      'React / React Native, backend services, infrastructure',
      'HABS Player: experiments moved from local scripts to a platform with visual protocols and remote monitoring',
      'Field tests: EEG on a Paris motorcycle ride, EEG in a skydive',
    ],
    deepDives: [{ label: 'Read how we scaled experiments', href: LINKS.habsPlayerPost, platform: 'LinkedIn' }],
    current: true,
  },
  {
    id: 'next',
    era: 'Next',
    theme: 'What should we build?',
    summary: 'Robotics, medtech, neurotech, connected products — systems where software meets people and hardware.',
    highlights: [],
  },
]

export const getStation = (id: CareerStation['id']) => career.find((s) => s.id === id)!

/** Earlier research roles — kept in the Index, not on the film's career line. */
export const earlierRoles: EarlierRole[] = [
  {
    role: 'Research engineer',
    company: 'Polytech Nantes / IETR',
    period: '2020',
    location: 'Nantes',
    summary: 'Embedded security: RSA on an STM32 microcontroller, analysed through side channels.',
    deepDives: [{ label: 'Read the code', href: 'https://github.com/BogdanGorelkin/RSA-SCA', platform: 'GitHub' }],
  },
  {
    role: 'Research student',
    company: 'TUSUR lab',
    period: '2018 — 2019',
    location: 'Tomsk',
    summary: 'NB-IoT channel modelling (3GPP) for low-data telemetry devices.',
    deepDives: [{ label: 'Read the code', href: 'https://github.com/BogdanGorelkin/NB-IoT-Downlink-Physical-Layer-Design', platform: 'GitHub' }],
  },
]
