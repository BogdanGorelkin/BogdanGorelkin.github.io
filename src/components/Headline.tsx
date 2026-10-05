type Props = {
  lines: readonly string[]
  id?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}

/** Large statement split into masked lines (animated via `.line__inner`). */
export function Headline({ lines, id, className = '', as: Tag = 'h2' }: Props) {
  return (
    <Tag id={id} className={`headline ${className}`}>
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span className="line__inner">{line}</span>
          {i < lines.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  )
}
