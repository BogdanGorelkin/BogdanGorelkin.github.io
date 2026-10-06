/**
 * Narrative copy for the film's chapters. Facts about people, projects and
 * roles live in profile / projects / experience; this file only holds the
 * storytelling lines, so tone can be edited in one place.
 *
 * The argument of the whole film: the technologies changed, the pattern
 * didn't — software that works with people and physical devices.
 */
import type { Triad } from './types'

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
    triad: { human: 'People wearing sensors', hardware: 'Wearable EEG devices', software: 'Apps + realtime backend' } satisfies Triad,
  },
  data: {
    index: 'Today — the system',
    headline: ['From sensor', 'to experience.'],
    body: 'Hardware integration, mobile, frontend, backend, realtime infrastructure — I own it end to end.',
    layers: ['Device', 'Mobile / edge', 'System', 'Experience'],
    projectId: 'habs-systems',
  },
  player: {
    index: 'Today — scale',
    headline: ['Build once.', 'Run many', 'experiments.'],
    lede: 'Not just features — systems that let a team move faster.',
    before: 'Python scripts, watched on one machine',
    after: 'Visual protocols · remote monitoring · per-participant setup',
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
    /** The two field tests that get their own beat, in film order. */
    beats: ['moto-paris', 'skydive'],
    alsoLabel: 'Also',
    triad: { human: 'A rider in traffic · me, in freefall', hardware: 'Portable EEG headsets', software: 'A mobile app · real-time analysis' } satisfies Triad,
  },
  reveal: {
    index: 'Before',
    headline: ["But this didn't", 'start with EEG.'],
    caption: 'Everything so far is one chapter — HABS, today. Rewind.',
  },
  medtech: {
    index: 'Before — MedTech',
    headline: ['Remote care.', 'Physical diagnostics.', 'Connected through software.'],
    body: 'A patient at home, diagnostic devices beside them, a doctor somewhere else — working on the same examination.',
    devices: ['ECG', 'Ultrasound', 'Pulse oximetry'],
    projectId: 'temmacare',
    triad: { human: 'Patient and doctor', hardware: 'Diagnostic devices', software: 'Remote consultation + device data' } satisfies Triad,
  },
  research: {
    index: 'Before that — research',
    headline: ['Before products,', 'I was building', 'programmable matter.'],
    earlier: 'Earlier: embedded security on STM32 (Polytech Nantes) and NB-IoT channel modelling (TUSUR).',
    projectId: 'programmable-matter',
    // Honest: the human part of the pattern arrived later.
    triad: { human: null, hardware: 'Robot modules', software: 'Distributed algorithms' } satisfies Triad,
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
