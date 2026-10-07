import { booking } from '../data/booking'
import { profile } from '../data/profile'
import { LinkSlot } from './LinkSlot'

/** Email · LinkedIn · GitHub · Download CV — optionally led by "Book a call" (the /book page). */
export function ContactLinks({ className = '', withBooking = false }: { className?: string; withBooking?: boolean }) {
  const { email, linkedin, github, cv } = profile.links
  return (
    <ul className={`contact-links ${className}`}>
      {withBooking && (
        <li>
          <LinkSlot label="Book a call" href={booking.page} />
        </li>
      )}
      <li>
        <LinkSlot label="Email" href={email ? `mailto:${email}` : undefined} />
      </li>
      <li>
        <LinkSlot label="LinkedIn" href={linkedin} external />
      </li>
      <li>
        <LinkSlot label="GitHub" href={github} external />
      </li>
      <li>
        <LinkSlot label="Download CV" href={cv} download />
      </li>
    </ul>
  )
}
