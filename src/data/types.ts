/**
 * Content types. Everything the site says about Bogdan lives in `src/data/*`.
 * Optional fields that are left `undefined` render as an explicit
 * "TO BE ADDED" placeholder instead of invented copy.
 */

/** Width / height, e.g. `16 / 9`. */
export type AspectRatio = number

export type MediaAsset =
  | {
      kind: 'video'
      /** Paths relative to `public/`, e.g. `/videos/hackathon-cph.mp4`. Provide at least one. */
      sources: { webm?: string; mp4?: string }
      poster?: string
      alt: string
      aspect: AspectRatio
    }
  | { kind: 'image'; src: string; alt: string; aspect: AspectRatio }
  /** Procedural stand-in rendered at runtime until real media exists. */
  | { kind: 'placeholder'; label: string; alt: string; aspect: AspectRatio }

export type Project = {
  id: string
  title: string
  subtitle?: string
  /** Event, organisation or programme the project belongs to. */
  context?: string
  year?: number
  location?: string
  recognition?: string
  description?: string
  tags: string[]
  media: MediaAsset[]
  links?: { label: string; href: string }[]
}

export type FieldTest = {
  id: string
  title: string
  location?: string
  year?: number
  description?: string
  media: MediaAsset
}

export type CareerStationId = 'research' | 'robotics' | 'medtech' | 'neurotech' | 'next'

export type CareerStation = {
  id: CareerStationId
  /** Large label used on the timeline, e.g. "ROBOTICS". */
  era: string
  company?: string
  role?: string
  /** Free-form, e.g. "2021 — 2023". */
  period?: string
  location?: string
  summary?: string
  highlights: string[]
  current?: boolean
}

export type ContactLinks = {
  email?: string
  linkedin?: string
  github?: string
  /** Path under `public/`, e.g. `/cv/bogdan-gorelkin-cv.pdf`. */
  cv?: string
}

export type Profile = {
  name: string
  shortName: string
  location: string
  role: string
  /** Opening statement, one entry per visual line. */
  statement: string[]
  thesis: string
  focus: string[]
  links: ContactLinks
}
