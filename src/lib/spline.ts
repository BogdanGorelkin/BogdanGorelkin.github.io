import type { V3 } from '../scenes/world'

/**
 * Monotone (Fritsch–Carlson style) velocity at keyframe i, in units per
 * story-time: the harmonic mean of the neighbouring slopes, or zero where the
 * path turns back on an axis. The camera therefore never overshoots a
 * keyframe — important next to fast moves — and holds (repeated keyframes)
 * come out perfectly still.
 */
function velocity(times: number[], points: V3[], i: number, axis: 0 | 1 | 2): number {
  const slope = (a: number, b: number) => (points[b]![axis] - points[a]![axis]) / (times[b]! - times[a]!)
  const last = points.length - 1
  if (i === 0) return slope(0, 1)
  if (i === last) return slope(last - 1, last)
  const d0 = slope(i - 1, i)
  const d1 = slope(i, i + 1)
  return d0 * d1 > 0 ? 2 / (1 / d0 + 1 / d1) : 0
}

function hermite(p1: number, p2: number, m1: number, m2: number, t: number) {
  const t2 = t * t
  const t3 = t2 * t
  return (2 * t3 - 3 * t2 + 1) * p1 + (t3 - 2 * t2 + t) * m1 + (-2 * t3 + 3 * t2) * p2 + (t3 - t2) * m2
}

/**
 * Samples a keyframed spline: `points[i]` is reached at `times[i]`.
 * `easeAt(i)` shapes motion inside segment i (ease-in-out ⇒ the camera settles
 * on the keyframe; linear ⇒ it glides through).
 */
export function sampleKeyframes(
  times: number[],
  points: V3[],
  t: number,
  easeAt: (segment: number) => (u: number) => number,
  out: V3,
): V3 {
  const n = times.length
  const first = t <= times[0]! ? 0 : t >= times[n - 1]! ? n - 1 : -1
  if (first >= 0) {
    const p = points[first]!
    out[0] = p[0]
    out[1] = p[1]
    out[2] = p[2]
    return out
  }

  let i = 0
  while (i < n - 2 && t >= times[i + 1]!) i++
  const u = easeAt(i)((t - times[i]!) / (times[i + 1]! - times[i]!))
  const a = points[i]!
  const b = points[i + 1]!
  const span = times[i + 1]! - times[i]!
  for (const axis of [0, 1, 2] as const) {
    const m0 = velocity(times, points, i, axis) * span
    const m1 = velocity(times, points, i + 1, axis) * span
    out[axis] = hermite(a[axis], b[axis], m0, m1, u)
  }
  return out
}
