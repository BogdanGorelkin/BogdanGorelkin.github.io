/**
 * Content types. Everything the site says about Bogdan lives in `src/data/*`.
 *
 * The site works like a trailer: the film shows a short teaser per story,
 * and deep-dive links (LinkedIn / YouTube / external) carry the long version.
 * Missing URLs stay `undefined` (with a TODO in the data file) and simply
 * don't render — no dead links, no placeholder text in the film.
 */

/** Width / height, e.g. `16 / 9`. */
export type AspectRatio = number

export type MediaAsset =
  | {
      kind: 'video'
      /** Paths relative to `public/`, e.g. `/videos/hackathon-cph-teaser.mp4`. Provide at least one. */
      sources: { webm?: string; mp4?: string }
      poster?: string
      alt: string
      aspect: AspectRatio
    }
  | { kind: 'image'; src: string; alt: string; aspect: AspectRatio }
  /** Procedural stand-in rendered at runtime until real media exists. */
  | { kind: 'placeholder'; label: string; alt: string; aspect: AspectRatio }

/** External "long version" of a story. */
export type DeepDive = {
  linkedinUrl?: string
  youtubeUrl?: string
  externalUrl?: string
  codeUrl?: string
  /** Label for the YouTube / external link, e.g. "Watch the 2-minute film". */
  deepDiveLabel?: string
}

/** 'review' = wording kept generic until confirmed safe to publish (current employer, clients…). */
export type PublicSafety = 'public' | 'review'

export type Project = DeepDive & {
  id: string
  title: string
  subtitle?: string
  /** Organisation / event the work belongs to. */
  context?: string
  period?: string
  location?: string
  recognition?: string
  /** One or two sentences — the Index uses it; the film mostly doesn't. */
  summary?: string
  /** Short signal chain shown as metadata, e.g. ['EEG', 'Game world', 'Light']. */
  flow?: string[]
  tags: string[]
  /** Short local loop / still used inside the film (5–15 s). */
  teaser?: MediaAsset
  publicSafe: PublicSafety
  /** Listed under "Selected work" in the Index. */
  featured: boolean
}

export type FieldTest = DeepDive & {
  id: string
  title: string
  caption?: string
  period?: string
  location?: string
  teaser: MediaAsset
  publicSafe: PublicSafety
}

/** Documentary moments of Bogdan at work — evidence, not portraits. */
export type Moment = { id: string; caption: string; media: MediaAsset }

export type CareerStationId = 'research' | 'medtech' | 'neurotech' | 'next'

export type CareerStation = DeepDive & {
  id: CareerStationId
  /** Short label on the career line, e.g. "MedTech". */
  era: string
  /** What the work was about, in plain words, e.g. "Programmable matter". */
  theme: string
  company?: string
  role?: string
  /** Free-form, e.g. "2021 — 2023". */
  period?: string
  location?: string
  summary?: string
  highlights: string[]
  current?: boolean
}

/** Earlier roles kept for the Index only. */
export type EarlierRole = { role: string; company: string; period: string; location: string; summary: string; codeUrl?: string }

export type ContactLinks = {
  email?: string
  linkedin?: string
  github?: string
  /** Path under `public/`, e.g. `/cv/bogdan-gorelkin-cv.pdf`. */
  cv?: string
}

export type CapabilityGroup = { group: string; items: string[] }

export type Education = { degree: string; school: string; years: string; note?: string }

export type Profile = {
  name: string
  shortName: string
  location: string
  role: string
  /** Opening statement, one entry per visual line. */
  statement: string[]
  /** The line that follows the statement. */
  statementTail: string
  thesis: string
  /** Two or three sentences for the recruiter Index. */
  summary: string
  /** Areas of work for the Index, in plain words. */
  worksAcross: string[]
  photo?: { src: string; alt: string }
  capabilities: CapabilityGroup[]
  education: Education[]
  languages: string[]
  links: ContactLinks
}
