import { earlierRoles } from './experience'
import { getFieldTest, getProject } from './projects'
import type { DeepDiveLink, FieldTest, Project } from './types'

/**
 * "Work & Experience" after the film: the project index. One row per public
 * example — what it proves in one line, and its deep dives. Links are read
 * from the projects / field tests / roles, never retyped here. Order is the
 * order of these arrays.
 */
export type ExploreEntry = {
  id: string
  name: string
  /** What this example proves, in a few words. */
  proves: string
  meta: string
  links: DeepDiveLink[]
}

const entry = (item: Project | FieldTest, name: string, proves: string, meta: string): ExploreEntry => ({
  id: item.id,
  name,
  proves,
  meta,
  links: item.deepDives ?? [],
})

const player = getProject('habs-player')
const hackathon = getProject('eeg-hackathon-cph')
const robots = getProject('programmable-matter')
const embedded = earlierRoles.find((r) => r.company === 'Polytech Nantes / IETR')!

/** Concrete public proof, in this order — the four stories the film is built on. */
export const featuredProjects: ExploreEntry[] = [
  entry(hackathon, 'Microsoft Hackathon', 'End to end: EEG → software → game, LEDs and controller', `${hackathon.location} / ${hackathon.period} · ${hackathon.recognition}`),
  entry(player, 'HABS Player', 'Product and scale: one-off experiment scripts became a platform the team runs', `HABS · ${player.period}`),
  entry(getFieldTest('moto-paris'), 'Paris EEG Ride', 'Field testing in traffic: EEG with GPS, speed and acceleration', 'Paris · mobile app'),
  entry(getFieldTest('skydive'), 'Skydive EEG', 'Field validation in freefall, analysed in real time', '4,000 m'),
]

/**
 * Optional technical history, collapsed by default. Only older work that shows
 * the path toward physical / connected systems — not every old repository.
 */
export const earlierProjects: ExploreEntry[] = [
  entry(robots, 'Modular robots — hexanodes', 'Research / simulation of modular movable robots', `${robots.context} · C++ · VisibleSim`),
  {
    id: 'rsa-stm32',
    name: 'RSA on an STM32',
    proves: 'Embedded security on a microcontroller, analysed through side channels',
    meta: `${embedded.company} · ${embedded.period}`,
    links: embedded.deepDives ?? [],
  },
]
