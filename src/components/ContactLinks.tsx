import { profile } from '../data/profile'
import { LinkSlot } from './LinkSlot'

export function ContactLinks({ className = '' }: { className?: string }) {
  const { email, linkedin, github, cv } = profile.links
  return (
    <ul className={`contact-links ${className}`}>
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
