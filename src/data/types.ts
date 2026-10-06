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

/** One external "long version" link, with its own contextual CTA label. */
export type DeepDiveLink = {
  /** CTA text, e.g. "Watch the full film". Written for this story — never generic. */
  label: string
  href: string
  /** Where it opens; used for the accessible label ("opens YouTube in a new tab"). */
  platform: 'YouTube' | 'LinkedIn' | 'GitHub' | 'Website'
}

/** External deep dives; the first is the primary CTA shown in the film. */
export type DeepDive = { deepDives?: DeepDiveLink[] }

/** How prominent a story is in the recruiter Index. */
export type StoryWeight = 'lead' | 'support' | 'continuity'

/**
 * Human / hardware / software, in the words of one chapter — the recurring
 * pattern, made concrete. `null` = honestly absent ("not yet").
 */
export type Triad = { human: string | null; hardware: string; software: string }

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
  /** The question this story answers for a visitor (documentation; not rendered). */
  storyRole: string
  weight: StoryWeight
}

export type FieldTest = DeepDive & {
  id: string
  title: string
  caption?: string
  /** Small metadata shown with the field test, e.g. ['EEG', 'GPS', 'Speed']. */
  signals?: string[]
  period?: string
  location?: string
  teaser: MediaAsset
  publicSafe: PublicSafety
  storyRole?: string
  /** Featured field tests get their own beat in the film and an Index entry. */
  featured?: boolean
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
export type EarlierRole = DeepDive & { role: string; company: string; period: string; location: string; summary: string }

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
