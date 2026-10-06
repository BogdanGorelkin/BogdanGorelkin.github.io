import { CHAPTERS } from '../experience/chapters'
import { profile } from '../data/profile'
import { useActiveChapter, useOffstage } from '../hooks/useStory'
const pad = (n: number) => String(n).padStart(2, '0')

/**
 * Three destinations, all in-page. "CV" means "show me the career" — it
 * lands on Experience, where the explicit Download CV link lives; the nav
 * never downloads the PDF itself.
 */
const ITEMS = [
  { href: '#projects', label: 'Recent projects', chapter: undefined },
  { href: '#cv', label: 'CV', chapter: undefined },
  { href: '#contact', label: 'Contact', chapter: 'contact' },
] as const

/**
 * Quiet, persistent navigation — the recruiter's fast path. Links are plain
 * anchors; App upgrades in-page hashes into fast-travel scrolls.
 */
export function Nav() {
  const active = useActiveChapter()
  const offstage = useOffstage()
  const current = CHAPTERS[active]

  return (
    <header className={`nav${offstage ? ' nav--solid' : ''}`}>
      <a className="nav__mark" href="#top" aria-label={`${profile.name} — back to the start`}>
        {profile.shortName}
      </a>
      {/* The chapter counter belongs to the film; after it, the section's own heading speaks. */}
      <p className="mono nav__counter" aria-hidden="true">
        {offstage ? '' : `${pad(active + 1)} / ${pad(CHAPTERS.length)} — ${current?.label ?? ''}`}
      </p>
      <nav aria-label="Primary">
        <ul className="mono nav__links">
          {ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} aria-current={!offstage && item.chapter && current?.id === item.chapter ? 'location' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
