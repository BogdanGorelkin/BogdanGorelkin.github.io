import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect, useState } from 'react'
import { booking } from '../data/booking'
import { copy } from '../data/copy'
import { profile } from '../data/profile'

/** If the calendar isn't ready by then, the Cal.com link becomes the primary way to book. */
const READY_TIMEOUT_MS = 10_000

/**
 * Supported Cal.com UI configuration only: dark theme and the portfolio's
 * off-white as the brand colour (selected day, confirm button). No styling
 * reaches inside the iframe beyond this.
 */
const CAL_UI = {
  theme: 'dark',
  hideEventTypeDetails: false,
  layout: 'month_view',
  cssVarsPerTheme: {
    light: { 'cal-brand': '#07080a' },
    dark: { 'cal-brand': '#ecebe6', 'cal-brand-text': '#07080a' },
  },
} as const

/**
 * /book — a calm, shareable page: who, how long, and the calendar. Not part
 * of the film; the way back to it is always visible.
 */
export function BookPage() {
  const c = copy.book
  const [booked, setBooked] = useState(false)
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')

  // Official embed API only: UI config, plus its own ready / failed / booked events.
  useEffect(() => {
    let cancelled = false
    let cal: Awaited<ReturnType<typeof getCalApi>> | undefined
    const onReady = () => setStatus('ready')
    const onFailed = () => setStatus('failed')
    const onBooked = () => setBooked(true)
    // A blocked embed script never settles; don't leave the visitor waiting on it.
    const timer = window.setTimeout(() => setStatus((s) => (s === 'loading' ? 'failed' : s)), READY_TIMEOUT_MS)
    getCalApi({ namespace: booking.namespace })
      .then((api) => {
        if (cancelled) return
        cal = api
        api('ui', CAL_UI)
        api('on', { action: 'linkReady', callback: onReady })
        api('on', { action: 'linkFailed', callback: onFailed })
        api('on', { action: 'bookingSuccessfulV2', callback: onBooked })
      })
      .catch(() => !cancelled && onFailed())
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      cal?.('off', { action: 'linkReady', callback: onReady })
      cal?.('off', { action: 'linkFailed', callback: onFailed })
      cal?.('off', { action: 'bookingSuccessfulV2', callback: onBooked })
    }
  }, [])

  return (
    <>
      <header className="book-nav">
        <a className="book-nav__mark" href="/" aria-label={`${profile.name} — portfolio`}>
          {profile.shortName}
        </a>
        <a className="mono book-nav__back" href="/">
          {c.back} <span aria-hidden="true">↗</span>
        </a>
      </header>

      <main className="book">
        <aside className="book__intro">
          <h1 className="book__title">{c.headline}</h1>
          <p className="book__lede">
            {c.lede.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <p className="mono book__who">
            <span>{profile.name}</span>
            <span>{profile.role}</span>
            <span>{profile.location}</span>
          </p>
          {booked && (
            <p className="book__done" role="status">
              <span className="book__done-title">{c.booked}</span>
              <a className="mono" href="/">
                {c.afterBooking} →
              </a>
            </p>
          )}
          <ul className="mono book__alt">
            {profile.links.email && (
              <li>
                <a href={`mailto:${profile.links.email}`}>Email</a>
              </li>
            )}
            {profile.links.linkedin && (
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </aside>

        <section className="book__calendar" aria-label="Choose a time">
          <Cal
            namespace={booking.namespace}
            calLink={booking.calLink}
            style={{ width: '100%', height: '100%', overflow: 'scroll' }}
            config={{ layout: 'month_view', useSlotsViewOnSmallScreen: 'true', theme: 'dark' }}
          />
          {/* Always there; promoted to the main action if the embed fails or never loads. */}
          <p className={`mono book__fallback${status === 'failed' ? ' is-primary' : ''}`}>
            <a href={booking.publicUrl} target="_blank" rel="noreferrer">
              {c.fallback} <span aria-hidden="true">↗</span>
            </a>
          </p>
        </section>
      </main>
    </>
  )
}
