import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { stage } from '../experience/director'
import { useExperience } from '../experience/context'
import { mulberry32 } from '../lib/math'
import { COLORS, createPointsMaterial, withPhase } from './shared/materials'

const DUST_BOX = 36

/**
 * Fog (the film's main depth/lighting instrument, driven by the director)
 * and a field of dust that wraps around the camera so it exists everywhere
 * without filling the whole world with points.
 */
export function Atmosphere() {
  const { quality } = useExperience()
  const scene = useThree((s) => s.scene)
  const fog = useMemo(() => new THREE.Fog(COLORS.bg, stage.fogNear, stage.fogFar), [])
  useEffect(() => {
    scene.fog = fog
    return () => {
      scene.fog = null
    }
  }, [scene, fog])

  const geometry = useMemo(() => {
    const rand = mulberry32(3)
    const pos = new Float32Array(quality.dust * 3)
    for (let i = 0; i < pos.length; i++) pos[i] = rand() * DUST_BOX
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return withPhase(g, rand)
  }, [quality.dust])

  const material = useMemo(() => {
    const m = createPointsMaterial({ size: 0.7, opacity: 0.35, twinkle: 0.8 })
    m.uniforms.uCenter = { value: new THREE.Vector3() }
    // Wrap each dust mote into a box centred on the camera.
    m.vertexShader = m.vertexShader.replace(
      'vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);',
      `vec3 wrapped = mod(position - uCenter, ${DUST_BOX.toFixed(1)}) - ${(DUST_BOX / 2).toFixed(1)} + uCenter;
       vec4 mvPosition = modelViewMatrix * vec4(wrapped, 1.0);`,
    )
    m.vertexShader = 'uniform vec3 uCenter;\n' + m.vertexShader
    return m
  }, [])

  useFrame(({ camera }) => {
    fog.near = stage.fogNear
    fog.far = stage.fogFar
    material.uniforms.uTime!.value = stage.clock
    ;(material.uniforms.uCenter!.value as THREE.Vector3).copy(camera.position)
    // Dust belongs to close-up scenes; it dissolves on the wide career shots.
    material.uniforms.uOpacity!.value = 0.35 * (1 - stage.presence.career) * (1 - stage.calm)
  })

  return <points geometry={geometry} material={material} frustumCulled={false} />
}
