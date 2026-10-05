import { ContactLinks } from '../components/ContactLinks'
import { career } from '../data/experience'
import { profile } from '../data/profile'
import { caseLabel, fieldTests, projects } from '../data/projects'

const TBA = <span className="pending">To be added</span>

/**
 * The short version: everything a recruiter needs, as plain semantic HTML.
 * Slides over the film like a curtain; also the reduced-motion / no-WebGL
 * source of truth.
 */
export function IndexSection() {
  return (
    <section id="index" className="index" aria-labelledby="index-title" tabIndex={-1}>
      <header className="index__head">
        <p className="mono">Index</p>
        <h2 id="index-title">The short version</h2>
      </header>

      <div className="index__grid">
        <div className="index__col index__col--wide">
          <h3 className="mono">Profile</h3>
          <p className="index__lead">
            {profile.name} — {profile.role}, {profile.location}.
          </p>
          <p>{profile.thesis}</p>
        </div>

        <div className="index__col index__col--wide">
          <h3 className="mono">Selected work</h3>
          <ol className="index__list">
            {projects.map((p) => (
              <li key={p.id}>
                <p className="mono">
                  {caseLabel(p)}
                  {[p.context, p.location, p.year].filter(Boolean).map((v) => ` — ${v}`)}
                </p>
                <h4>{p.title}</h4>
                {p.recognition && <p className="mono index__award">{p.recognition}</p>}
                <p>{p.description ?? TBA}</p>
                {p.links && p.links.length > 0 && (
                  <p className="index__links">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="index__col">
          <h3 className="mono">Experience</h3>
          <ol className="index__list">
            {career.map((s) => (
              <li key={s.id}>
                <h4>
                  {s.era}
                  {s.current && <span className="mono index__now"> — current</span>}
                </h4>
                {s.id !== 'next' && (
                  <p className="mono">
                    {s.role ?? TBA} · {s.company ?? TBA} · {s.period ?? TBA}
                  </p>
                )}
                {s.summary && <p>{s.summary}</p>}
                {s.highlights.length > 0 && (
                  <ul className="index__plain">
                    {s.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="index__col">
          <h3 className="mono">Field tests</h3>
          <ul className="index__plain">
            {fieldTests.map((t) => (
              <li key={t.id}>{t.title}</li>
            ))}
          </ul>
          <h3 className="mono">Focus</h3>
          <ul className="index__plain">
            {profile.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        <div className="index__col">
          <h3 className="mono">Contact</h3>
          <ContactLinks className="contact-links--stacked" />
        </div>
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
