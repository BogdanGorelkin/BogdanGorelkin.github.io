import type { Profile } from './types'

export const profile: Profile = {
  name: 'Bogdan Gorelkin',
  shortName: 'BG',
  location: 'Paris, France',
  role: 'Full-stack / Product Engineer',
  statement: ['I build systems', 'between humans', 'and machines.'],
  thesis:
    'I build systems where software interacts with people, sensors, devices and the physical world.',
  focus: [
    'Full-stack product engineering',
    'Realtime systems',
    'React / TypeScript',
    'React Native',
    'Node.js / NestJS',
    'Python',
    'BLE',
    'IoT / connected devices',
    'EEG / neurotechnology',
    'Hardware / software integration',
    'Experimentation',
    'Robotics-related systems',
  ],
  links: {
    // TODO: add real contact details. Links without a value render as "to be added".
    email: undefined, // e.g. 'name@domain.com'
    linkedin: undefined, // e.g. 'https://www.linkedin.com/in/<handle>'
    github: undefined, // e.g. 'https://github.com/<handle>'
    // TODO: drop the PDF into public/cv/ and set e.g. '/cv/bogdan-gorelkin-cv.pdf'.
    cv: undefined,
  },
}
