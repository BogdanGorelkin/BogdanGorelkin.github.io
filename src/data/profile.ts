import type { Profile } from './types'

/*
 * Sources: CV_Bogdan_Gorelkin_EN.pdf (June 2026) and the previous personal
 * site. Where they disagreed, the newer CV wins (see README → content notes).
 */
export const profile: Profile = {
  name: 'Bogdan Gorelkin',
  shortName: 'BG',
  location: 'Paris, France',
  role: 'Full-stack / Product Engineer',
  statement: ['I build systems', 'between humans', 'and machines.'],
  thesis:
    'I build systems where software interacts with people, sensors, devices and the physical world.',
  summary:
    'Product-focused full-stack engineer with 5+ years taking products from idea to production across web, mobile, backend and connected devices. ' +
    'Today that means software for biometric signal acquisition at HABS; before that, telemedicine with diagnostic hardware at TemmaCare, and modular-robotics research at Inria & Femto-ST. ' +
    'I like fast PoCs, then turning the ones that work into systems that hold up.',
  photo: {
    src: '/images/profile/bogdan-bench.webp',
    alt: 'Bogdan Gorelkin at a workbench with microcontroller boards, wiring and an LED strip',
  },
  capabilities: [
    { group: 'Product', items: ['React', 'React Native', 'TypeScript', 'Multi-role UX', 'PoC → MVP → production'] },
    { group: 'Systems', items: ['Node.js', 'NestJS', 'Python', 'Flask', 'Java / Spring', 'MongoDB', 'Redis', 'RabbitMQ'] },
    {
      group: 'Connected devices',
      items: ['BLE', 'EEG / biometric signals', 'IoT', 'ESP8266 / Arduino / STM32', 'MicroPython', 'C / C++', 'ROS', 'RTOS', 'PCB & soldering'],
    },
    { group: 'Infrastructure', items: ['Linux', 'Docker', 'CI/CD', 'Git', 'SSH / shell'] },
  ],
  education: [
    { degree: 'M.Sc. Internet of Things', school: 'Université Bourgogne Franche-Comté (UTBM), Montbéliard', years: '2020 — 2021' },
    {
      degree: 'M.Sc. Wireless Embedded Technologies',
      school: 'Polytech Nantes',
      years: '2019 — 2020',
      note: 'Double degree with TUSUR (M.Sc. Communication Systems & IoT, Tomsk)',
    },
  ],
  languages: ['English (B2)', 'French (B2)', 'Russian (native)', 'German (A1)'],
  links: {
    // From the June 2026 CV. The old site listed b.gorelkin@yandex.com — confirm which to publish.
    email: 'b.k.gorelkin@gmail.com',
    linkedin: 'https://www.linkedin.com/in/bogdan-gorelkin/',
    github: 'https://github.com/BogdanGorelkin',
    // Note: this PDF includes a phone number.
    cv: '/cv/bogdan-gorelkin-cv-en.pdf',
  },
}
