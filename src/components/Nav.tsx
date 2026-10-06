import { CHAPTERS } from '../experience/chapters'
import { profile } from '../data/profile'
import { useActiveChapter, useOffstage } from '../hooks/useStory'
import { LinkSlot } from './LinkSlot'

const pad = (n: number) => String(n).padStart(2, '0')

const ITEMS = [
  { href: '#work', label: 'Work', chapter: 'screen' },
  { href: '#experience', label: 'Experience', chapter: 'timeline' },
  { cv: true },
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
          {ITEMS.map((item) =>
            'cv' in item ? (
              <li key="cv">
                <LinkSlot label="CV" href={profile.links.cv} download className="nav__cv" />
              </li>
            ) : (
              <li key={item.href}>
                <a href={item.href} aria-current={!offstage && current?.id === item.chapter ? 'location' : undefined}>
                  {item.label}
                </a>
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  )
}
