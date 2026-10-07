import { useState } from 'react'
import { ContactLinks } from '../components/ContactLinks'
import { LinkSlot } from '../components/LinkSlot'
import { DeepDiveAnchor } from '../components/DeepDiveLinks'
import { career, earlierRoles } from '../data/experience'
import { earlierProjects, featuredProjects, type ExploreEntry } from '../data/explore'
import { profile } from '../data/profile'

/**
 * Work & Experience — the recruiter layer after the film. Not a second CV:
 * featured projects (concrete public proof, with their deep dives — the only
 * place they're listed), earlier projects behind a disclosure (optional
 * technical history), then the professional timeline, one line per role.
 * Plain semantic HTML; also the reduced-motion / no-WebGL source of truth.
 * Keeps id="index" — nav, skip link and the scroll director hand off to it.
 */
export function IndexSection() {
  return (
    <section id="index" className="index" aria-labelledby="index-title" tabIndex={-1}>
      <header className="index__head">
        <div className="index__intro">
          <h2 id="index-title">Work &amp; Experience</h2>
          <p className="index__lead">{profile.thesis}</p>
          <div className="index__who">
            <p className="mono">
              {profile.name} — {profile.role} — {profile.location}
            </p>
            <ContactLinks className="contact-links--inline" withBooking />
          </div>
        </div>
        {profile.photo && (
          <img className="index__photo" src={profile.photo.src} alt={profile.photo.alt} width={720} height={960} loading="lazy" decoding="async" />
        )}
      </header>

      <section id="projects" className="index__block" aria-labelledby="projects-title" tabIndex={-1}>
        <h3 id="projects-title" className="mono">
          Featured projects
        </h3>
        <div>
          <ol className="evidence">
            {featuredProjects.map((e) => (
              <EvidenceRow key={e.id} entry={e} />
            ))}
          </ol>
          <EarlierProjects />
        </div>
      </section>

      {/* The nav's "CV" lands here: the career, with the PDF one click away. */}
      <section id="cv" className="index__block" aria-labelledby="experience-title" tabIndex={-1}>
        <div className="index__rail">
          <h3 id="experience-title" className="mono">
            Experience
          </h3>
          <LinkSlot label="Download CV" href={profile.links.cv} download className="mono index__cv" />
        </div>
        <ol className="roles">
          {career
            .filter((s) => s.id !== 'next')
            .reverse()
            .map((s) => (
              <li key={s.id}>
                <p className="mono roles__period">{s.period}</p>
                <div>
                  <h4>
                    {s.role} — {s.company}
                  </h4>
                  {s.summary && <p>{s.summary}</p>}
                </div>
              </li>
            ))}
          {earlierRoles.map((r) => (
            <li key={r.company} className="roles--earlier">
              <p className="mono roles__period">{r.period}</p>
              <div>
                <h4>
                  {r.role} — {r.company}
                </h4>
                <p>{r.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="index__facts">
        <section aria-labelledby="capabilities-title">
          <h3 id="capabilities-title" className="mono">
            Capabilities
          </h3>
          <dl className="index__caps">
            {profile.capabilities.map((c) => (
              <div key={c.group}>
                <dt className="mono">{c.group}</dt>
                <dd>{c.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="education-title">
          <h3 id="education-title" className="mono">
            Education
          </h3>
          <ul className="index__edu">
            {profile.education.map((e) => (
              <li key={e.degree}>
                <h4>{e.degree}</h4>
                <p>
                  {e.school}, {e.years}
                  {e.note && <> — {e.note}</>}
                </p>
              </li>
            ))}
          </ul>
          <h3 className="mono">Languages</h3>
          <p>{profile.languages.join(' · ')}</p>
        </section>
      </div>

      <footer className="mono index__foot">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#top">Back to the start ↑</a>
      </footer>
    </section>
  )
}

/** Optional technical history: collapsed by default, a quiet disclosure under the featured rows. */
function EarlierProjects() {
  const [open, setOpen] = useState(false)
  return (
    <div className={`earlier${open ? ' is-open' : ''}`}>
      <button type="button" className="mono earlier__toggle" aria-expanded={open} aria-controls="earlier-projects" onClick={() => setOpen((o) => !o)}>
        <span className="earlier__icon" aria-hidden="true" />
        {open ? 'Hide earlier projects' : 'Show earlier projects'}
      </button>
      <div id="earlier-projects" className="earlier__panel" inert={!open}>
        <ol className="evidence evidence--earlier" aria-label="Earlier projects">
          {earlierProjects.map((e) => (
            <EvidenceRow key={e.id} entry={e} />
          ))}
        </ol>
      </div>
    </div>
  )
}

function EvidenceRow({ entry: e }: { entry: ExploreEntry }) {
  return (
    <li className="evidence__row">
      <h4 className="evidence__name">{e.name}</h4>
      <p className="evidence__proves">{e.proves}</p>
      <p className="mono evidence__meta">{e.meta}</p>
      <p className="mono evidence__links">
        {e.links.map((l) => (
          <DeepDiveAnchor key={l.href} link={l} />
        ))}
      </p>
    </li>
  )
}
