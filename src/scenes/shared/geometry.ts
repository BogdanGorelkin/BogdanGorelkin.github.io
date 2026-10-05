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
