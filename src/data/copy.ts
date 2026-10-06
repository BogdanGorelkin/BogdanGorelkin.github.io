/**
 * Narrative copy for the film's chapters. Facts about people, projects and
 * roles live in profile / projects / experience; this file only holds the
 * storytelling lines, so tone can be edited in one place.
 *
 * The argument of the whole film: the technologies changed, the pattern
 * didn't — software that works with people and physical devices.
 */
export const copy = {
  signal: {
    /** Second line of the opening identity row, under the role. */
    domains: 'Software · hardware · realtime systems',
    meta: 'Paris / 2026',
    scrollCue: 'Scroll',
  },
  neural: {
    index: 'Today — HABS',
    headline: ['Today, I build systems', 'around connected', 'human signals.'],
    body: 'Sensors worn by people, the apps that talk to them, and the realtime systems behind.',
    annotations: [
      { key: 'Sensor', value: 'On the body' },
      { key: 'BLE', value: 'Wireless link' },
      { key: 'Mobile', value: 'At the edge' },
      { key: 'Realtime', value: 'Streaming' },
    ],
  },
  data: {
    index: 'Today — the system',
    headline: ['From sensor', 'to experience.'],
    body: 'Hardware integration, mobile, frontend, backend, realtime infrastructure — I own it end to end.',
    layers: ['Devices', 'BLE', 'Mobile / edge', 'Backend', 'Realtime processing', 'Experiment / experience'],
    projectId: 'habs-systems',
  },
  player: {
    index: 'Today — scale',
    headline: ['Build once.', 'Run many', 'experiments.'],
    projectId: 'habs-player',
  },
  screen: {
    index: 'Microsoft Hackathon',
    headline: ['Software', 'leaves', 'the screen.'],
    projectId: 'eeg-hackathon-cph',
  },
  field: {
    index: 'Field tests',
    headline: ['If I build it,', 'I want to know', 'how it behaves', 'outside the lab.'],
  },
  reveal: {
    index: 'Before',
    headline: ["But this didn't", 'start with EEG.'],
    caption: 'Everything so far is one chapter. Rewind.',
  },
  medtech: {
    index: 'Before — MedTech',
    headline: ['Remote care.', 'Physical diagnostics.', 'Connected through software.'],
    body: 'A patient at home, diagnostic devices beside them, a doctor somewhere else — working on the same examination.',
    devices: ['ECG', 'Ultrasound', 'Spirometry', 'Dermatoscope'],
    projectId: 'temmacare',
  },
  research: {
    index: 'Before that — research',
    headline: ['Before products,', 'I was building', 'programmable matter.'],
    earlier: 'Earlier: embedded security on STM32 (Polytech Nantes) and NB-IoT channel modelling (TUSUR).',
    projectId: 'programmable-matter',
  },
  pattern: {
    index: 'The pattern',
    headline: ['The technology changed.', "The pattern didn't."],
    threads: ['Human', 'Hardware', 'Software'],
  },
  contact: {
    index: 'Next',
    headline: ['What should', 'we build next?'],
  },
} as const
