import { useRef, type CSSProperties, type ReactNode } from 'react'
import { CHAPTERS, chapterIndex, type ChapterId } from '../experience/chapters'
import { useChapterTimeline, type Query, type TL } from '../lib/motion'

type Props = {
  id: ChapterId
  labelledBy: string
  /** Builds this chapter's scrubbed typography timeline (local progress 0–1). */
  timeline?: (tl: TL, q: Query) => void
  children: ReactNode
}

/**
 * A chapter is a tall scroll range with a viewport-sized "stage" for its
 * typography. In cinematic mode the stage is fixed and only shown while the
 * chapter is active; in static mode (reduced motion / no JS) it's plain flow.
 */
export function Chapter({ id, labelledBy, timeline, children }: Props) {
  const ref = useRef<HTMLElement>(null)
  const chapter = CHAPTERS[chapterIndex(id)]!
  useChapterTimeline(ref, timeline)

  return (
    <section
      ref={ref}
      id={chapter.hash}
      tabIndex={chapter.hash ? -1 : undefined}
      data-chapter={id}
      aria-labelledby={labelledBy}
      className={`chapter chapter--${id}`}
      style={{ '--len': chapter.length.desktop, '--len-m': chapter.length.mobile } as CSSProperties}
    >
      <div className="stage">{children}</div>
    </section>
  )
}
