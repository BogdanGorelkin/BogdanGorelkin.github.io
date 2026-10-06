import type { CareerStation, EarlierRole } from './types'

/**
 * Stations on the career line, in chronological order. The film visits them
 * backwards (HABS → MedTech → Research) after the reveal. Periods are
 * year-level on purpose: the old site and the CVs disagree on some months.
 * Roles carry no links: public evidence lives on the projects (projects.ts),
 * so each URL exists in exactly one place.
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
  },
  {
    id: 'medtech',
    era: 'MedTech',
    theme: 'Remote medicine',
    role: 'Software application developer',
    company: 'TemmaCare · AuxaSphere',
    period: '2022 — 2025',
    location: 'Paris',
    summary: 'Software for remote consultations with diagnostic devices beside the patient: device data, live graphs, a multi-role product.',
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
    summary: 'Connected human-signal systems end to end: wearable devices over BLE, mobile apps, backend and realtime pipelines — from PoC to production.',
    current: true,
  },
  {
    id: 'next',
    era: 'Next',
    theme: 'What should we build?',
    summary: 'Robotics, medtech, neurotech, connected products — systems where software meets people and hardware.',
  },
]

export const getStation = (id: CareerStation['id']) => career.find((s) => s.id === id)!

/** Earlier research roles — in the Experience list after the film, not on the film's career line. */
export const earlierRoles: EarlierRole[] = [
  {
    role: 'Research engineer',
    company: 'Polytech Nantes / IETR',
    period: '2020',
    location: 'Nantes',
    summary: 'Embedded security: RSA on an STM32 microcontroller, analysed through side channels.',
    deepDives: [{ label: 'Read the RSA side-channel code', href: 'https://github.com/BogdanGorelkin/RSA-SCA', platform: 'GitHub' }],
  },
  {
    role: 'Research student',
    company: 'TUSUR lab',
    period: '2018 — 2019',
    location: 'Tomsk',
    summary: 'NB-IoT channel modelling (3GPP) for low-data telemetry devices.',
  },
]
