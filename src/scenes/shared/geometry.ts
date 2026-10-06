import * as THREE from 'three'

/** A cubic lattice of `size` with `div` cells per side. */
export function latticeGeometry(size: number, div: number) {
  const v: number[] = []
  const h = size / 2
  const step = size / div
  for (let i = 0; i <= div; i++) {
    for (let j = 0; j <= div; j++) {
      const a = -h + i * step
      const b = -h + j * step
      v.push(-h, a, b, h, a, b, a, -h, b, a, h, b, a, b, -h, a, b, h)
    }
  }
  return segments(v)
}

/** Circle in the XZ plane (ground) or XY plane (facing +Z). */
export function circleGeometry(radius: number, plane: 'xz' | 'xy' = 'xz', segmentsCount = 96) {
  const pts = new THREE.EllipseCurve(0, 0, radius, radius).getPoints(segmentsCount)
  return new THREE.BufferGeometry().setFromPoints(
    pts.map((p) => (plane === 'xz' ? new THREE.Vector3(p.x, 0, p.y) : new THREE.Vector3(p.x, p.y, 0))),
  )
}

export function boxEdges(w: number, h: number, d: number) {
  return new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d))
}

export function segments(flat: number[]) {
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(flat, 3))
  return g
}

/** Outline of a rounded rectangle in the XY plane (a phone, a screen), centred on the origin. */
export function roundedRectGeometry(w: number, h: number, r: number, seg = 6) {
  const pts: THREE.Vector3[] = []
  const corners: [number, number, number][] = [
    [w / 2 - r, h / 2 - r, 0],
    [-w / 2 + r, h / 2 - r, Math.PI / 2],
    [-w / 2 + r, -h / 2 + r, Math.PI],
    [w / 2 - r, -h / 2 + r, (3 * Math.PI) / 2],
  ]
  for (const [cx, cy, start] of corners) {
    for (let i = 0; i <= seg; i++) {
      const a = start + (i / seg) * (Math.PI / 2)
      pts.push(new THREE.Vector3(cx + Math.cos(a) * r, cy + Math.sin(a) * r, 0))
    }
  }
  return new THREE.BufferGeometry().setFromPoints(pts)
}
