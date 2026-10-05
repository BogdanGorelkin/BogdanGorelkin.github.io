/**
 * Narrative copy for the film's chapters. Facts about people, projects and
 * roles live in profile / projects / experience; this file only holds the
 * storytelling lines, so tone can be edited in one place.
 */
export const copy = {
  signal: {
    meta: 'Paris / 2026',
    scrollCue: 'Scroll',
  },
  neural: {
    index: '01 — Human',
    headline: ['It starts with', 'a person.'],
    body: 'Real devices. Real signals. Read in realtime.',
    annotations: [
      { key: 'EEG', value: 'Signal' },
      { key: 'BLE', value: 'Wireless link' },
      { key: '250 Hz', value: 'Sample rate' },
      { key: 'Realtime', value: 'Streaming' },
    ],
  },
  data: {
    index: '02 — System',
    headline: ['One stream', 'becomes many.'],
    body: 'Multiple wireless devices streaming realtime sensor data into a larger software system.',
    layers: ['Headbands', 'Mobile / edge', 'Realtime backend', 'Processing / experience'],
    projectId: 'multi-device-eeg',
  },
  screen: {
    index: '03 — Physical',
    headline: ['Software', 'leaves', 'the screen.'],
    projectId: 'eeg-hackathon-cph',
  },
  field: {
    index: '04 — Field',
    headline: ["I don't like", 'building things', 'only for the lab.'],
  },
  timeline: {
    index: '05 — Career',
    headline: ["You've been inside", 'the current', 'chapter.'],
    caption: 'Everything so far happened at one station. Here is the whole line.',
  },
  contact: {
    index: '06 — Next',
    headline: ['What should', 'we build next?'],
  },
} as const
