type Props = {
  label: string
  href?: string
  download?: boolean
  external?: boolean
  className?: string
}

/**
 * A real link when the data has a URL; otherwise an explicit, non-interactive
 * "to be added" marker — never a dead link.
 */
export function LinkSlot({ label, href, download, external, className = '' }: Props) {
  if (!href) {
    return (
      <span className={`link link--pending ${className}`} aria-disabled="true">
        {label}
        <span className="link__note"> — to be added</span>
      </span>
    )
  }
  return (
    <a
      className={`link ${className}`}
      href={href}
      download={download || undefined}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {label}
    </a>
  )
}
