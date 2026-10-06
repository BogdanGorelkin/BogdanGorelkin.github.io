import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { getProject } from '../data/projects'
import { stage } from '../experience/director'
import { circleGeometry } from './shared/geometry'
import { COLORS, createLineMaterial, fade } from './shared/materials'
import { MediaPlane } from './shared/MediaPlane'
import { usePresence } from './shared/usePresence'
import { CAREER, type V3 } from './world'

const ORIGIN: V3 = [CAREER.x.research, CAREER.y, CAREER.z]
const SCALE = 1.05

/**
 * Research station — programmable matter. A swarm of identical modules
 * reconfigures from a compact block into an arch as the chapter scrolls
 * (stage.morph), while a synchronisation pulse ripples out from one module
 * to all the others — the time-sync work, made visible.
 */
export function ResearchScene() {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.InstancedMesh>(null)
  const { from, to, count } = useMemo(configurations, [])
  const footage = getProject('programmable-matter').teaser

  const geometry = useMemo(() => new THREE.BoxGeometry(0.84, 0.84, 0.84), [])
  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, toneMapped: false }), [])
  const floor = useMemo(() => circleGeometry(12, 'xz', 96), [])
  const floorMat = useMemo(() => createLineMaterial(0.25), [])
  const tmp = useMemo(() => ({ m: new THREE.Matrix4(), p: new THREE.Vector3(), lead: new THREE.Vector3(), c: new THREE.Color() }), [])

  usePresence('research', group, (p) => {
    const inst = mesh.current
    if (!inst) return
    fade(material, p)
    fade(floorMat, 0.25 * p)
    const front = (stage.clock * 5) % 22
    const leadU = THREE.MathUtils.smoothstep(stage.morph * 1.55, 0, 1)
    tmp.lead.set(...from[0]!).lerp(tmp.p.set(...to[0]!), leadU)
    for (let i = 0; i < count; i++) {
      // Staggered move: modules set off one after another, hopping in an arc.
      const delay = (i / count) * 0.55
      const u = THREE.MathUtils.smoothstep(stage.morph * 1.55 - delay, 0, 1)
      const a = from[i]!
      const b = to[i]!
      tmp.p.set(a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u + Math.sin(Math.PI * u) * 1.5, a[2] + (b[2] - a[2]) * u)
      tmp.m.makeTranslation(tmp.p.x, tmp.p.y, tmp.p.z)
      inst.setMatrixAt(i, tmp.m)
      // Sync pulse travelling outward from module 0.
      const d = tmp.p.distanceTo(tmp.lead)
      const pulse = Math.exp(-((d - front) ** 2) * 0.5)
      // Calmer than before: an origin story, not the climax.
      tmp.c.copy(COLORS.warm).multiplyScalar(0.08 + pulse * 0.55)
      inst.setColorAt(i, tmp.c)
    }
    inst.instanceMatrix.needsUpdate = true
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true
  })

  return (
    <group ref={group} position={ORIGIN}>
      <lineLoop geometry={floor} material={floorMat} />
      <group scale={SCALE}>
        <instancedMesh ref={mesh} args={[geometry, material, count]} frustumCulled={false} />
      </group>
      {/* Real simulation footage, once provided, sits beside the modules. */}
      {footage && footage.kind !== 'placeholder' && (
        <MediaPlane asset={footage} height={6} presence="research" position={[13, 4, -6]} rotation-y={-0.35} />
      )}
    </group>
  )
}

/** Two shapes built from the same modules: a compact block and an arch. */
function configurations() {
  const arch: V3[] = []
  // One layer deep: fewer modules, more negative space.
  for (let x = -7; x <= 7; x++)
    for (let y = 0; y <= 8; y++) {
      const r = Math.hypot(x, y)
      if (r >= 4.6 && r <= 6.2) arch.push([x, y + 0.5, 0])
    }
  arch.sort((a, b) => a[1] - b[1] || a[0] - b[0])
  const count = arch.length
  const block: V3[] = []
  for (let y = 0; block.length < count; y++)
    for (let x = -2; x <= 1 && block.length < count; x++)
      for (let z = -1; z <= 0 && block.length < count; z++) block.push([x + 0.5, y + 0.5, z + 0.5])
  // Pair modules so each travels a short-ish path: both lists sorted the same way.
  block.sort((a, b) => a[1] - b[1] || a[0] - b[0])
  return { from: block, to: arch, count }
}
