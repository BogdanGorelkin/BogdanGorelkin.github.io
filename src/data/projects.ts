import type { DeepDiveLink, FieldTest, Moment, Project } from './types'

/** Known public deep dives (public-safe sources). One place, referenced below. */
export const LINKS = {
  hackathonFilm: 'https://youtu.be/H-j7i20jWfI?si=lNFsgy2RSUR4Qwey',
  habsPlayerPost: 'https://www.linkedin.com/feed/update/urn:li:activity:7466058297108811777/',
  parisRidePost: 'https://www.linkedin.com/feed/update/urn:li:activity:7401523361895464960/',
  skydivePost: 'https://www.linkedin.com/feed/update/urn:li:activity:7371069399224569856/',
  medtechPost: 'https://www.linkedin.com/feed/update/urn:li:activity:7135241238428966912/',
} as const

const research: DeepDiveLink[] = [
  { label: 'Watch the simulation', href: 'https://youtu.be/x4lbToZrboo', platform: 'YouTube' },
  { label: 'Read the code', href: 'https://github.com/BogdanGorelkin/Boosted-MRTP', platform: 'GitHub' },
]

/**
 * Stories, in display order. Case numbers ("CASE 01") are derived from this
 * order. `weight` sizes them in the Index: lead = strongest current work,
 * continuity = earlier chapters that show the pattern predates HABS.
 */
export const projects: Project[] = [
  {
    id: 'habs-systems',
    title: 'Connected human-signal systems',
    subtitle: 'Wearable sensors, the apps that talk to them, and the realtime systems behind',
    context: 'HABS',
    period: '2025 — now',
    location: 'Paris',
    summary:
      'Software for biometric signal acquisition and protocol execution: device integration over BLE, mobile apps, backend services and realtime pipelines — several devices at once.',
    flow: ['Devices', 'BLE', 'Mobile', 'Backend', 'Realtime', 'Experience'],
    tags: ['React Native', 'BLE', 'TypeScript', 'Node.js', 'Python', 'WebSockets'],
    teaser: { kind: 'placeholder', label: 'HABS — DEVICES IN USE', alt: 'Connected sensing devices in use', aspect: 16 / 9 },
    // TODO: PUBLIC-SAFE CONTENT REVIEW — generic on purpose (no devices, clients, data or internal architecture).
    publicSafe: 'review',
    storyRole: 'Can he build complex connected systems?',
    weight: 'lead',
  },
  {
    // Public source: LINKS.habsPlayerPost (summarised, not quoted).
    id: 'habs-player',
    title: 'HABS Player',
    subtitle: 'From one-off experiment scripts to a platform the team runs',
    context: 'HABS',
    period: '2025 — now',
    summary:
      'Experiments used to be Python scripts, run and watched on one machine. Now protocols are designed visually, run and monitored remotely, and personalised per participant — faster iteration, more data, beyond a single lab.',
    flow: ['Visual protocols', 'Remote monitoring', 'Per-participant setup'],
    tags: ['Product', 'Platform', 'Realtime', 'Experiment orchestration'],
    teaser: { kind: 'placeholder', label: 'HABS PLAYER — UI TEASER', alt: 'HABS Player interface', aspect: 16 / 9 },
    publicSafe: 'public',
    storyRole: 'Can he make a whole team faster, not just ship features?',
    weight: 'lead',
    deepDives: [{ label: 'Read how we scaled experiments', href: LINKS.habsPlayerPost, platform: 'LinkedIn' }],
  },
  {
    id: 'eeg-hackathon-cph',
    title: 'A game environment that reacts to you',
    subtitle: 'The room responds to the player’s state in real time — game world, LEDs, controller',
    context: 'Microsoft Hackathon',
    period: '2026',
    location: 'Copenhagen',
    recognition: 'Crowd Award',
    summary:
      'Built end to end, from scratch: realtime EEG read the player’s state; software turned it into changes in the game world, the room’s LEDs and the controller’s feedback.',
    flow: ['Player state (EEG)', 'Realtime software', 'Game world', 'LEDs · controller'],
    tags: ['Realtime EEG', 'Game environment', 'Environment orchestration', 'LED & controller feedback'],
    // TODO: replace with the 5–15 s local loop:
    // { kind: 'video', sources: { webm: '/videos/hackathon-cph-teaser.webm', mp4: '/videos/hackathon-cph-teaser.mp4' }, poster: '/images/hackathon-cph-poster.jpg', alt: '…', aspect: 16 / 9 }
    teaser: {
      kind: 'placeholder',
      label: 'HACKATHON FOOTAGE — COPENHAGEN 2026',
      alt: 'EEG-driven game environment at the Microsoft Hackathon, Copenhagen',
      aspect: 16 / 9,
    },
    publicSafe: 'public',
    storyRole: 'Can he build an unusual experience end to end?',
    weight: 'lead',
    deepDives: [{ label: 'Watch the full film', href: LINKS.hackathonFilm, platform: 'YouTube' }],
  },
  {
    // Public source: LINKS.medtechPost (oximetry graphs; JavaFX → React/TypeScript).
    id: 'temmacare',
    title: 'Remote medicine with connected diagnostics',
    subtitle: 'A doctor, remotely, working with diagnostic devices next to the patient',
    context: 'TemmaCare · AuxaSphere',
    period: '2022 — 2025',
    location: 'Paris',
    summary:
      'Remote consultations where the doctor works with diagnostic devices connected locally to the patient. Medical-device data rendered live — e.g. pulse-oximetry graphs drawn on canvas during the move from JavaFX to React and TypeScript.',
    flow: ['Patient', 'Diagnostic devices', 'Software', 'Remote doctor'],
    tags: ['React', 'TypeScript', 'Canvas', 'Medical devices', 'Microservices'],
    teaser: { kind: 'placeholder', label: 'REMOTE DOCTOR', alt: 'Remote doctor view', aspect: 16 / 10 },
    publicSafe: 'public',
    storyRole: 'Did the human + hardware + software pattern exist before HABS?',
    weight: 'continuity',
    deepDives: [
      { label: 'See the medical device work', href: LINKS.medtechPost, platform: 'LinkedIn' },
      { label: 'temma.care', href: 'https://temma.care/', platform: 'Website' },
    ],
  },
  {
    id: 'programmable-matter',
    title: 'Programmable matter: modular robots',
    subtitle: 'Self-reconfigurable robots that keep a shared clock',
    context: 'Inria & Femto-ST',
    period: '2020 — 2021',
    location: 'Lille · Montbéliard',
    summary:
      'Behaviour of robot modules as finite-state machines, a boosted time-synchronisation protocol (MRTP) and movement simulation, in VisibleSim and BIP.',
    tags: ['C++', 'VisibleSim', 'Distributed algorithms', 'Modular robotics'],
    publicSafe: 'public',
    storyRole: 'Did the pattern start even earlier?',
    weight: 'continuity',
    deepDives: research,
  },
]

/**
 * Field tests. `featured` ones get their own beat in the film and an Index
 * entry; the rest appear as a short "also" line. The Field scene decides
 * which plane each one gets (FieldScene → SLOT_BY_ID).
 */
export const fieldTests: FieldTest[] = [
  {
    // Public source: LINKS.parisRidePost.
    id: 'moto-paris',
    title: 'EEG on a motorcycle — Paris',
    caption: 'A portable EEG headset and a mobile app I coded, recording brain rhythms alongside GPS, speed and acceleration on a real ride.',
    signals: ['EEG', 'GPS', 'Speed', 'Acceleration'],
    location: 'Paris',
    teaser: { kind: 'placeholder', label: 'PARIS RIDE — EEG', alt: 'EEG test on a motorcycle in Paris', aspect: 3 / 2 },
    publicSafe: 'public',
    storyRole: 'Does he test systems in uncontrolled, moving environments?',
    featured: true,
    deepDives: [{ label: 'Watch the Paris field test', href: LINKS.parisRidePost, platform: 'LinkedIn' }],
  },
  {
    // Public source: LINKS.skydivePost.
    id: 'skydive',
    title: 'EEG in freefall — skydive',
    caption: 'A jump from 4,000 m wearing an EEG headset, with HABS’s app analysing emotional state in real time.',
    signals: ['4,000 m', 'EEG', 'Real-time analysis'],
    teaser: { kind: 'placeholder', label: 'SKYDIVE — EEG', alt: 'Bogdan skydiving with an EEG headset', aspect: 4 / 5 },
    publicSafe: 'public',
    storyRole: 'Does he personally push real-world validation further?',
    featured: true,
    deepDives: [{ label: 'See the skydive experiment', href: LINKS.skydivePost, platform: 'LinkedIn' }],
  },
  {
    id: 'wall-lamp',
    title: 'Networked wall lamp — ESP8266',
    caption: 'Idea to MVP: a lamp controlled over the network, remotely or through Siri.',
    period: '2024',
    teaser: {
      kind: 'image',
      src: '/images/field/esp8266-lamp-prototype.webp',
      alt: 'Soldering an ESP8266 board for a networked wall lamp',
      aspect: 16 / 9,
    },
    publicSafe: 'public',
    deepDives: [{ label: 'Watch the build', href: 'https://youtu.be/EpEfgixWeLc', platform: 'YouTube' }],
  },
  {
    id: 'hackathon-floor',
    title: 'Hackathon floor — Copenhagen',
    period: '2026',
    location: 'Copenhagen',
    teaser: { kind: 'placeholder', label: 'HACKATHON — COPENHAGEN 2026', alt: 'Microsoft Hackathon, Copenhagen', aspect: 1 },
    publicSafe: 'public',
  },
  // Future field experiments: add entries here (same shape); the scene and lists pick them up.
]

/** Documentary moments placed inside the film. */
export const moments: Record<'bench' | 'hackathon' | 'headband', Moment> = {
  bench: {
    id: 'bench',
    caption: 'At the bench',
    media: {
      kind: 'image',
      src: '/images/profile/bogdan-bench.webp',
      alt: 'Bogdan Gorelkin at a workbench with microcontroller boards, wiring and an LED strip',
      aspect: 3 / 4,
    },
  },
  hackathon: {
    id: 'hackathon',
    caption: 'Copenhagen, 2026',
    // TODO: documentary photo of Bogdan at the hackathon (4:5).
    media: { kind: 'placeholder', label: 'BOGDAN — HACKATHON', alt: 'Bogdan at the Microsoft Hackathon', aspect: 4 / 5 },
  },
  headband: {
    id: 'headband',
    caption: 'Testing a headband',
    // TODO: documentary photo of Bogdan wearing / testing a headband (4:5). Not placed in the film yet.
    media: { kind: 'placeholder', label: 'BOGDAN — HEADBAND TEST', alt: 'Bogdan testing a headband', aspect: 4 / 5 },
  },
}

export function getProject(id: string): Project {
  const project = projects.find((p) => p.id === id)
  if (!project) throw new Error(`Unknown project id: ${id}`)
  return project
}

export function getFieldTest(id: string): FieldTest {
  const test = fieldTests.find((t) => t.id === id)
  if (!test) throw new Error(`Unknown field test id: ${id}`)
  return test
}

export function caseLabel(project: Project): string {
  const index = projects.indexOf(project)
  return `CASE ${String(index + 1).padStart(2, '0')}`
}
