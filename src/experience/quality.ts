/**
 * Device tiers. Mobile isn't a shrunken desktop: fewer points, fewer streams,
 * lower DPR, no 3D-anchored HTML labels and a gentler camera (see shots.ts).
 */
export type Tier = 'high' | 'low'

export type Quality = {
  tier: Tier
  dpr: [number, number]
  headPoints: number
  dust: number
  streams: number
  particlesPerStream: number
  /** DOM labels pinned to 3D points. Off on small screens; the chapter's DOM list takes over. */
  spatialLabels: boolean
  /** Subtle pointer parallax on the camera. */
  parallax: boolean
}

const QUALITY: Record<Tier, Quality> = {
  high: {
    tier: 'high',
    dpr: [1, 1.75],
    headPoints: 12000,
    dust: 900,
    streams: 6,
    particlesPerStream: 60,
    spatialLabels: true,
    parallax: true,
  },
  low: {
    tier: 'low',
    dpr: [1, 1.25],
    headPoints: 5000,
    dust: 280,
    streams: 3,
    particlesPerStream: 36,
    spatialLabels: false,
    parallax: false,
  },
}

export const MOBILE_QUERY = '(max-width: 768px)'

export function detectTier(): Tier {
  if (typeof window === 'undefined') return 'high'
  const small = window.matchMedia(MOBILE_QUERY).matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const weakCpu = (navigator.hardwareConcurrency || 8) <= 4
  return small || (coarse && weakCpu) ? 'low' : 'high'
}

export function getQuality(tier: Tier): Quality {
  return QUALITY[tier]
}

export function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!canvas.getContext('webgl2')
  } catch {
    return false
  }
}
