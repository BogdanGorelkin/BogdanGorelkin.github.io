import type { Triad } from '../data/types'

/**
 * The recurring pattern in one chapter's own words: who the human is, what
 * the hardware is, what the software does. Repeats across chapters so the
 * final "the pattern didn't change" is something the visitor has already seen.
 */
export function TriadStrip({ triad, className = '' }: { triad: Triad; className?: string }) {
  const rows: [string, string | null][] = [
    ['Human', triad.human],
    ['Hardware', triad.hardware],
    ['Software', triad.software],
  ]
  return (
    <dl className={`mono triad ${className}`}>
      {rows.map(([key, value]) => (
        <div key={key} className={value ? undefined : 'triad__absent'}>
          <dt>{key}</dt>
          <dd>{value ?? 'Not yet — that came next'}</dd>
        </div>
      ))}
    </dl>
  )
}
