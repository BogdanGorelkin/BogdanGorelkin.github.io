/**
 * Narrative copy for the film's chapters. Facts about people, projects and
 * roles live in profile / projects / experience; this file only holds the
 * storytelling lines, so tone can be edited in one place.
 */
export const copy = {
  signal: {
    /** Second line of the opening identity row, under the role. */
    domains: 'Neurotech · connected devices · realtime',
    meta: 'Paris / 2026',
    scrollCue: 'Scroll',
  },
  neural: {
    index: '01 — Human',
    headline: ['It starts with', 'a person.'],
    body: 'Real devices on real people. Signals read, streamed and acted on in realtime.',
    // Device-agnostic on purpose: no sample rates or specs that aren't verified for a public device.
    annotations: [
      { key: 'EEG', value: 'Brain signal' },
      { key: 'BLE', value: 'Wireless link' },
      { key: 'Sensors', value: 'On the body' },
      { key: 'Realtime', value: 'Streaming' },
    ],
  },
  data: {
    index: '02 — System',
    headline: ['One stream', 'becomes many.'],
    body: 'Several wireless headbands at once — through phones, into a realtime backend, out to whatever has to react.',
    layers: ['EEG headbands', 'Mobile · BLE', 'Realtime backend', 'Processing · experience'],
    projectId: 'habs-multi-device',
  },
  screen: {
    index: '03 — Physical',
    headline: ['Software', 'leaves', 'the screen.'],
    projectId: 'eeg-hackathon-cph',
  },
  field: {
    index: '04 — Field',
    headline: ["I don't like", 'building things', 'only for the lab.'],
    caption: 'Prototypes get tested where they will actually be used.',
  },
  timeline: {
    index: '05 — Career',
    headline: ["You've been inside", 'the current', 'chapter.'],
    caption: 'Everything so far is the current chapter — neurotech, now at HABS. Here is the whole line.',
  },
  contact: {
    index: '06 — Next',
    headline: ['What should', 'we build next?'],
  },
} as const
