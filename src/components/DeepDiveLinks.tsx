import type { DeepDive, DeepDiveLink } from '../data/types'

type Props = {
  item: DeepDive
  /** Only the first (primary) deep dive — what the film shows. */
  primaryOnly?: boolean
  /** Render as the prominent CTA used inside the film. */
  prominent?: boolean
  className?: string
}

/**
 * External "long version" links. Labels come from the data and are written
 * per story ("Watch the full film", "Read how we scaled experiments"…).
 * Nothing renders when a story has no public link yet.
 */
export function DeepDiveLinks({ item, primaryOnly, prominent, className = '' }: Props) {
  const links = primaryOnly ? item.deepDives?.slice(0, 1) : item.deepDives
  if (!links?.length) return null
  return (
    <p className={`mono deep-dive ${prominent ? 'deep-dive--prominent' : ''} ${className}`}>
      {links.map((l) => (
        <DeepDiveAnchor key={l.href} link={l} />
      ))}
    </p>
  )
}

export function DeepDiveAnchor({ link }: { link: DeepDiveLink }) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={`${link.label} — opens ${link.platform} in a new tab`}>
      {link.label} <span aria-hidden="true">↗</span>
    </a>
  )
}
