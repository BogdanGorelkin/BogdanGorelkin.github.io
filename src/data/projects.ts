import type { FieldTest, Moment, Project } from './types'

/**
 * Stories, in display order. Case numbers ("CASE 01") are derived from this
 * order — reorder the array and the labels follow.
 *
 * Deep-dive URLs left `undefined` are TODOs: the UI hides the link until set.
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
    featured: true,
    linkedinUrl: undefined, // TODO: LinkedIn post URL, if one exists
  },
  {
    id: 'habs-player',
    title: 'HABS Player',
    subtitle: 'From one-off experiments to a reusable system',
    context: 'HABS',
    period: '2025 — now',
    summary: 'A reusable system for running experiments, so the team stops rebuilding the setup for every new protocol and can run many on the same foundation.',
    tags: ['Product', 'React', 'Realtime', 'Experiment orchestration'],
    teaser: { kind: 'placeholder', label: 'HABS PLAYER — UI TEASER', alt: 'HABS Player interface', aspect: 16 / 9 },
    // TODO: PUBLIC-SAFE CONTENT REVIEW — confirm the name and description can be public.
    publicSafe: 'review',
    featured: true,
    linkedinUrl: undefined, // TODO: LinkedIn deep-dive post URL
  },
  {
    id: 'eeg-hackathon-cph',
    title: 'EEG-driven game environment',
    subtitle: 'Brain signals steering a game world, the room’s light and the controller in your hands',
    context: 'Microsoft Hackathon',
    period: '2026',
    location: 'Copenhagen',
    recognition: 'Crowd Award',
    summary:
      'Built from scratch: realtime EEG drove a game environment, with LEDs and controller feedback orchestrated around the player — the room reacted to the player’s state.',
    flow: ['Brain signal', 'Realtime software', 'Game world', 'LEDs', 'Controller'],
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
    featured: true,
    youtubeUrl: undefined, // TODO: unlisted YouTube URL of the 2-minute film
    deepDiveLabel: 'Watch the 2-minute film',
    linkedinUrl: undefined, // TODO: optional LinkedIn post URL
  },
  {
    id: 'field-experiments',
    title: 'Field experiments',
    subtitle: 'Taking systems out of the lab to see how they behave',
    summary: 'Skydiving with a headband and a custom app, EEG tests on a motorcycle in Paris, hardware prototypes, hackathon builds.',
    tags: ['Field testing', 'Prototyping', 'Hardware'],
    publicSafe: 'public',
    featured: true,
  },
  {
    id: 'temmacare',
    title: 'Remote medicine with connected diagnostics',
    subtitle: 'A doctor, remotely, working with diagnostic devices next to the patient',
    context: 'TemmaCare · AuxaSphere',
    period: '2022 — 2025',
    location: 'Paris',
    summary:
      'Remote consultations where the doctor works with diagnostic devices connected locally to the patient — ECG, ultrasound, spirometry, dermatoscope. Device-data visualisation, encryption, storage and delivery; multi-role UX; microservices.',
    flow: ['Patient', 'Diagnostic devices', 'Software', 'Remote doctor'],
    tags: ['React', 'React Native', 'Microservices', 'Medical devices', 'Linux'],
    teaser: { kind: 'placeholder', label: 'REMOTE DOCTOR', alt: 'Remote doctor view', aspect: 16 / 10 },
    publicSafe: 'public',
    featured: true,
    externalUrl: 'https://temma.care/',
    deepDiveLabel: 'temma.care',
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
    featured: true,
    codeUrl: 'https://github.com/BogdanGorelkin/Boosted-MRTP',
    youtubeUrl: 'https://youtu.be/x4lbToZrboo',
    deepDiveLabel: 'Watch the simulation',
  },
]

/**
 * Field tests. Order matters: the first entry gets the hero plane where the
 * Field scene's dolly comes to rest.
 */
export const fieldTests: FieldTest[] = [
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
    youtubeUrl: 'https://youtu.be/EpEfgixWeLc',
    deepDiveLabel: 'Watch the build',
  },
  {
    id: 'skydive',
    title: 'Skydive with a headband',
    caption: 'A headband and a custom app, in freefall.',
    teaser: { kind: 'placeholder', label: 'SKYDIVE — HEADBAND', alt: 'Skydive experiment with a headband', aspect: 4 / 5 },
    publicSafe: 'public',
    linkedinUrl: undefined, // TODO: LinkedIn post URL
  },
  {
    id: 'moto-paris',
    title: 'Moto EEG — Paris',
    caption: 'EEG on a motorcycle, on Paris streets.',
    location: 'Paris',
    teaser: { kind: 'placeholder', label: 'MOTO EEG — PARIS', alt: 'EEG test on a motorcycle in Paris', aspect: 3 / 2 },
    publicSafe: 'public',
    linkedinUrl: undefined, // TODO: LinkedIn post URL
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
    // TODO: documentary photo of Bogdan at the hackathon (3:2 or 4:5).
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

export function caseLabel(project: Project): string {
  const index = projects.indexOf(project)
  return `CASE ${String(index + 1).padStart(2, '0')}`
}
