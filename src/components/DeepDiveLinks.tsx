import type { DeepDive } from '../data/types'

/**
 * External "long version" links for a story. Only URLs that exist render —
 * TODO links stay invisible instead of becoming dead ends.
 */
export function DeepDiveLinks({ item, className = '' }: { item: DeepDive; className?: string }) {
  const links = [
    item.youtubeUrl && { href: item.youtubeUrl, label: item.deepDiveLabel ?? 'Watch' },
    item.linkedinUrl && { href: item.linkedinUrl, label: 'Read on LinkedIn' },
    item.externalUrl && { href: item.externalUrl, label: item.youtubeUrl ? 'Website' : (item.deepDiveLabel ?? 'Website') },
    item.codeUrl && { href: item.codeUrl, label: 'Code' },
  ].filter((l): l is { href: string; label: string } => Boolean(l))

  if (!links.length) return null
  return (
    <p className={`mono deep-dive ${className}`}>
      {links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
          {l.label} ↗
        </a>
      ))}
    </p>
  )
}
