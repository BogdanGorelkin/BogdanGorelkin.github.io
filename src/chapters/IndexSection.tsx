import { ContactLinks } from '../components/ContactLinks'
import { DeepDiveLinks } from '../components/DeepDiveLinks'
import { career, earlierRoles } from '../data/experience'
import { profile } from '../data/profile'
import { caseLabel, projects } from '../data/projects'

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
        <div className="index__col index__col--profile">
          {profile.photo && (
            <img className="index__photo" src={profile.photo.src} alt={profile.photo.alt} width={720} height={960} loading="lazy" decoding="async" />
          )}
        </div>

        <div className="index__col index__col--lead">
          <h3 className="mono">Profile</h3>
          <p className="index__lead">
            {profile.name} — {profile.role}, {profile.location}.
          </p>
          <p className="index__thesis">{profile.thesis}</p>
          <p className="mono index__across">Works across: {profile.worksAcross.join(' · ')}</p>
          <p>{profile.summary}</p>
          <ContactLinks className="contact-links--inline" />
        </div>

        <div className="index__col index__col--wide">
          <h3 className="mono">Experience</h3>
          <ol className="index__list">
            {career
              .filter((s) => s.id !== 'next')
              .reverse()
              .map((s) => (
                <li key={s.id}>
                  <p className="mono">
                    {s.period} · {s.theme}
                    {s.current && ' · current'}
                  </p>
                  <h4>
                    {s.role} — {s.company}
                  </h4>
                  {s.summary && <p>{s.summary}</p>}
                  {s.highlights.length > 0 && (
                    <ul className="index__bullets">
                      {s.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                  <DeepDiveLinks item={s} className="index__links" />
                </li>
              ))}
            {earlierRoles.map((r) => (
              <li key={r.company}>
                <p className="mono">{r.period} · Earlier research</p>
                <h4>
                  {r.role} — {r.company}
                </h4>
                <p>{r.summary}</p>
                <DeepDiveLinks item={r} className="index__links" />
              </li>
            ))}
          </ol>
        </div>

        <div className="index__col index__col--wide">
          <h3 className="mono">Selected work</h3>
          <ol className="index__list">
            {projects
              .filter((p) => p.featured)
              .map((p) => (
                <li key={p.id}>
                  <p className="mono">
                    {caseLabel(p)}
                    {[p.context, p.location, p.period].filter(Boolean).map((v) => ` · ${v}`)}
                    {p.recognition && <span className="index__award"> · {p.recognition}</span>}
                  </p>
                  <h4>{p.title}</h4>
                  <p>{p.summary ?? p.subtitle}</p>
                  <DeepDiveLinks item={p} className="index__links" />
                </li>
              ))}
          </ol>
        </div>

        <div className="index__col index__col--wide">
          <h3 className="mono">Capabilities</h3>
          <dl className="index__caps">
            {profile.capabilities.map((c) => (
              <div key={c.group}>
                <dt className="mono">{c.group}</dt>
                <dd>{c.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="index__col index__col--wide">
          <h3 className="mono">Education</h3>
          <ul className="index__list index__list--tight">
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
