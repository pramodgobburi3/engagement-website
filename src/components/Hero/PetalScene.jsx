import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import useWindowSize from '../../hooks/useWindowSize'

// ─────────────────────────────────────────────────────────────────────────────
// Canvas-generated sprite textures
// ─────────────────────────────────────────────────────────────────────────────

function createMarigoldTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const cx = size / 2

  // 16 outer petals
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2
    ctx.save()
    ctx.translate(cx, cx)
    ctx.rotate(angle)
    const grad = ctx.createRadialGradient(0, 16, 2, 0, 42, 30)
    grad.addColorStop(0, 'rgba(255,220,100,0.95)')
    grad.addColorStop(0.45, 'rgba(232,160,32,0.88)')
    grad.addColorStop(0.8, 'rgba(193,105,42,0.5)')
    grad.addColorStop(1, 'rgba(140,60,20,0)')
    ctx.beginPath()
    ctx.ellipse(0, 34, 9, 22, 0, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
    ctx.restore()
  }

  // 8 inner petals (offset 11.25°)
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.PI / 8
    ctx.save()
    ctx.translate(cx, cx)
    ctx.rotate(angle)
    const grad = ctx.createRadialGradient(0, 8, 1, 0, 26, 16)
    grad.addColorStop(0, 'rgba(255,240,160,1)')
    grad.addColorStop(0.5, 'rgba(240,187,80,0.9)')
    grad.addColorStop(1, 'rgba(232,160,32,0)')
    ctx.beginPath()
    ctx.ellipse(0, 20, 7, 14, 0, 0, Math.PI * 2)
    ctx.fillStyle = grad
    ctx.fill()
    ctx.restore()
  }

  // Bright center disc
  const cg = ctx.createRadialGradient(cx, cx, 0, cx, cx, 13)
  cg.addColorStop(0, 'rgba(255,255,210,1)')
  cg.addColorStop(0.5, 'rgba(248,210,80,0.95)')
  cg.addColorStop(1, 'rgba(232,160,32,0)')
  ctx.beginPath()
  ctx.arc(cx, cx, 13, 0, Math.PI * 2)
  ctx.fillStyle = cg
  ctx.fill()

  return new THREE.CanvasTexture(canvas)
}

function createGlowTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const cx = size / 2
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx)
  grad.addColorStop(0, 'rgba(255,255,220,1)')
  grad.addColorStop(0.18, 'rgba(255,240,150,0.95)')
  grad.addColorStop(0.45, 'rgba(232,160,32,0.55)')
  grad.addColorStop(0.75, 'rgba(193,105,42,0.18)')
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(canvas)
}

// ─────────────────────────────────────────────────────────────────────────────
// Flame sprite texture (canvas-drawn, always faces camera via THREE.Sprite)
// ─────────────────────────────────────────────────────────────────────────────

function createFlameTexture() {
  const w = 80, h = 140
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  const cx = w / 2

  // Outer flame body — orange-red
  ctx.beginPath()
  ctx.moveTo(cx, h * 0.96)
  ctx.bezierCurveTo(cx + w * 0.42, h * 0.78, cx + w * 0.44, h * 0.36, cx + w * 0.04, h * 0.04)
  ctx.bezierCurveTo(cx + w * 0.01, h * -0.02, cx - w * 0.01, h * -0.02, cx - w * 0.04, h * 0.04)
  ctx.bezierCurveTo(cx - w * 0.44, h * 0.36, cx - w * 0.42, h * 0.78, cx, h * 0.96)
  const outerGrad = ctx.createLinearGradient(cx, h * 0.96, cx, h * 0.04)
  outerGrad.addColorStop(0.0, 'rgba(200, 60, 0, 0.85)')
  outerGrad.addColorStop(0.3, 'rgba(240, 100, 0, 0.9)')
  outerGrad.addColorStop(0.65, 'rgba(255, 160, 0, 0.8)')
  outerGrad.addColorStop(1.0, 'rgba(255, 230, 80, 0)')
  ctx.fillStyle = outerGrad
  ctx.fill()

  // Mid flame — yellow-orange, slightly smaller
  ctx.beginPath()
  ctx.moveTo(cx, h * 0.90)
  ctx.bezierCurveTo(cx + w * 0.28, h * 0.74, cx + w * 0.30, h * 0.38, cx + w * 0.02, h * 0.10)
  ctx.bezierCurveTo(cx, h * 0.05, cx, h * 0.05, cx - w * 0.02, h * 0.10)
  ctx.bezierCurveTo(cx - w * 0.30, h * 0.38, cx - w * 0.28, h * 0.74, cx, h * 0.90)
  const midGrad = ctx.createLinearGradient(cx, h * 0.90, cx, h * 0.10)
  midGrad.addColorStop(0.0, 'rgba(255, 140, 0, 0.9)')
  midGrad.addColorStop(0.4, 'rgba(255, 200, 40, 0.95)')
  midGrad.addColorStop(1.0, 'rgba(255, 255, 150, 0)')
  ctx.fillStyle = midGrad
  ctx.fill()

  // Bright inner core — white-yellow
  const coreGrad = ctx.createRadialGradient(cx, h * 0.62, 0, cx, h * 0.62, w * 0.22)
  coreGrad.addColorStop(0.0, 'rgba(255, 255, 255, 1)')
  coreGrad.addColorStop(0.4, 'rgba(255, 255, 180, 0.9)')
  coreGrad.addColorStop(1.0, 'rgba(255, 220, 60, 0)')
  ctx.beginPath()
  ctx.ellipse(cx, h * 0.64, w * 0.16, h * 0.20, 0, 0, Math.PI * 2)
  ctx.fillStyle = coreGrad
  ctx.fill()

  return new THREE.CanvasTexture(canvas)
}

// ─────────────────────────────────────────────────────────────────────────────
// Traditional Hindu diya (oil lamp) with animated flame
// ─────────────────────────────────────────────────────────────────────────────

// Lathe profile: (radius, height) pairs — swept 360° around Y to form the bowl
const DIYA_PROFILE = [
  new THREE.Vector2(0.02, -0.13),   // bottom center
  new THREE.Vector2(0.08, -0.13),   // bottom flat
  new THREE.Vector2(0.22, -0.10),   // lower curve
  new THREE.Vector2(0.34, -0.03),   // widening
  new THREE.Vector2(0.40,  0.05),   // upper body
  new THREE.Vector2(0.38,  0.10),   // rim
  new THREE.Vector2(0.32,  0.11),   // rim lip
  new THREE.Vector2(0.26,  0.09),   // inner rim step
]

const diyaMat = new THREE.MeshStandardMaterial({
  color: '#A0522D',   // warm clay / terracotta
  roughness: 0.82,
  metalness: 0.0,
})
const oilMat = new THREE.MeshStandardMaterial({
  color: '#3A2010',   // dark oil surface
  roughness: 0.1,
  metalness: 0.4,
})

function DiyaLamp() {
  const flameTex = useMemo(() => createFlameTexture(), [])
  const glowTex  = useMemo(() => createGlowTexture(), [])
  const bowlGeo  = useMemo(() => new THREE.LatheGeometry(DIYA_PROFILE, 48), [])
  const flameRef = useRef()
  const glowRef  = useRef()
  const lightRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    // Multi-frequency flicker — realistic candle behaviour
    const fX = 1 + Math.sin(t * 13.7) * 0.10 + Math.sin(t * 7.1) * 0.06
    const fY = 1 + Math.sin(t *  9.3) * 0.08 + Math.sin(t * 17.9) * 0.04
    const lean = Math.sin(t * 2.9) * 0.08 + Math.sin(t * 5.6) * 0.03

    if (flameRef.current) {
      flameRef.current.scale.set(fX * 0.32, fY * 0.48, 1)
      flameRef.current.material.rotation = lean
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(0.7 + Math.sin(t * 8.1) * 0.12)
      glowRef.current.material.opacity = 0.55 + Math.sin(t * 11.3) * 0.12
    }
    if (lightRef.current) {
      // Flicker the point light intensity for rim/ring illumination
      lightRef.current.intensity = 2.0 + Math.sin(t * 19.1) * 0.7 + Math.sin(t * 9.7) * 0.4
    }
  })

  return (
    <group>
      {/* Clay bowl body */}
      <mesh geometry={bowlGeo} material={diyaMat} />

      {/* Oil surface — flat dark disc sitting just below the rim */}
      <mesh material={oilMat} position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 36]} />
      </mesh>

      {/* Wide warm glow at flame base (billboard sprite) */}
      <sprite ref={glowRef} position={[0, 0.22, 0]} scale={[0.9, 0.9, 0.9]}>
        <spriteMaterial map={glowTex} transparent opacity={0.55} depthWrite={false} />
      </sprite>

      {/* Flame (billboard sprite — always faces camera, flickers) */}
      <sprite ref={flameRef} position={[0, 0.42, 0]} scale={[0.32, 0.48, 1]}>
        <spriteMaterial map={flameTex} transparent alphaTest={0.005} depthWrite={false} />
      </sprite>

      {/* Flickering warm point light — illuminates the orbital rings */}
      <pointLight ref={lightRef} position={[0, 0.38, 0]} color="#FF8C00" intensity={2.0} distance={5} decay={2} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Heart-shaped marigold display
// ─────────────────────────────────────────────────────────────────────────────

// Parametric heart curve in the XY plane.
// Formula: x = 16sin³(t), y = 13cos(t)−5cos(2t)−2cos(3t)−cos(4t)
// Raw range: x ±16, y −17..5. Geometric center of bounding box = raw y −6.
// Caller passes scale + yOffset derived from the actual viewport size.
function buildHeartCurve(scale, yOffset, segments = 200) {
  const pts = []
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2
    const x = scale * 16 * Math.pow(Math.sin(t), 3)
    const y =
      scale * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) +
      yOffset
    pts.push(new THREE.Vector3(x, y, 0))
  }
  return new THREE.CatmullRomCurve3(pts, true)
}

// Cast rays through the top and bottom screen edges to find their exact
// world-space y-coordinates where they intersect the z=0 plane.
// This correctly handles any camera tilt or elevation.
function viewportBoundsAtZ0(camera) {
  const v = new THREE.Vector3()

  // Top-center of screen (NDC y=+1), any z works for ray direction
  const tNear = v.set(0, 1, -1).unproject(camera).clone()
  const tFar  = v.set(0, 1,  1).unproject(camera).clone()
  const tT    = -tNear.z / (tFar.z - tNear.z)
  const topY  = tNear.y + tT * (tFar.y - tNear.y)

  // Bottom-center of screen (NDC y=−1)
  const bNear = v.set(0, -1, -1).unproject(camera).clone()
  const bFar  = v.set(0, -1,  1).unproject(camera).clone()
  const bT    = -bNear.z / (bFar.z - bNear.z)
  const botY  = bNear.y + bT * (bFar.y - bNear.y)

  return { topY, botY }
}

function HeartDisplay() {
  const { camera, size } = useThree()
  const matRef = useRef()

  const { tubeGeo } = useMemo(() => {
    const { topY, botY } = viewportBoundsAtZ0(camera)

    // Convert 100 px to world units, then subtract from each edge
    const pxToWorld = (topY - botY) / size.height
    const margin    = 200 * pxToWorld

    const targetTopY = topY - margin
    const targetBotY = botY + margin
    const targetH    = targetTopY - targetBotY
    const centerY    = (targetTopY + targetBotY) / 2

    // Heart formula raw height = 22 (y spans −17 to +5).
    // Raw geometric center = (5 + −17) / 2 = −6.
    const scale   = targetH / 22
    const yOffset = centerY + 6 * scale   // shift raw center (−6s) to centerY

    const c   = buildHeartCurve(scale, yOffset)
    const geo = new THREE.TubeGeometry(c, 300, scale * 0.062, 8, true)
    return { tubeGeo: geo }
  }, [camera, size.width, size.height])

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const t = clock.elapsedTime
    // Same frequencies as the diya's point light (19.1 + 9.7 Hz) so
    // the heart brightens and dims in lockstep with the flame flicker.
    matRef.current.emissiveIntensity = 0.28 + Math.sin(t * 19.1) * 0.10 + Math.sin(t * 9.7) * 0.06
  })

  return (
    <mesh geometry={tubeGeo}>
      <meshStandardMaterial
        ref={matRef}
        color="#E8A020"
        emissive="#FF8C00"
        emissiveIntensity={0.28}
        roughness={0.30}
        metalness={0.18}
        transparent
        opacity={0.60}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Diya scene — diya lamp + heart of marigolds
// ─────────────────────────────────────────────────────────────────────────────

function LotusOrrery() {
  return (
    <group>
      {/* <DiyaLamp /> */}
      <HeartDisplay />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Floating petal particle system (background atmosphere — unchanged)
// ─────────────────────────────────────────────────────────────────────────────

function createPetalTexture(color) {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  gradient.addColorStop(0, color)
  gradient.addColorStop(0.4, color)
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.ellipse(size / 2, size / 2, size / 2.2, size / 3, -Math.PI / 4, 0, Math.PI * 2)
  ctx.fill()
  return new THREE.CanvasTexture(canvas)
}

const PETAL_COLORS = [
  { hex: 'rgba(232,160,32,0.7)', name: 'marigold' },
  { hex: 'rgba(193,105,42,0.6)', name: 'terracotta' },
  { hex: 'rgba(245,237,214,0.45)', name: 'cream' },
]

function FloatingPetals({ count }) {
  const refs = useRef([null, null, null])
  const spread = 6

  const groups = useMemo(() => {
    return PETAL_COLORS.map((color, gi) => {
      const n = Math.floor(count / 3) + (gi === 0 ? count % 3 : 0)
      const positions = new Float32Array(n * 3)
      const speeds = new Float32Array(n)
      const swayAmps = new Float32Array(n)
      const swayOffsets = new Float32Array(n)
      for (let i = 0; i < n; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * spread * 2
        positions[i * 3 + 1] = (Math.random() - 0.5) * 6
        positions[i * 3 + 2] = (Math.random() - 0.5) * 3
        speeds[i] = 0.003 + Math.random() * 0.009
        swayAmps[i] = 0.002 + Math.random() * 0.004
        swayOffsets[i] = Math.random() * Math.PI * 2
      }
      return { n, positions, speeds, swayAmps, swayOffsets, texture: createPetalTexture(color.hex) }
    })
  }, [count])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    groups.forEach((group, gi) => {
      const mesh = refs.current[gi]
      if (!mesh) return
      const pos = mesh.geometry.attributes.position.array
      for (let i = 0; i < group.n; i++) {
        pos[i * 3 + 1] += group.speeds[i]
        pos[i * 3 + 0] += Math.sin(t * 0.5 + group.swayOffsets[i]) * group.swayAmps[i]
        if (pos[i * 3 + 1] > 4) {
          pos[i * 3 + 1] = -4
          pos[i * 3 + 0] = (Math.random() - 0.5) * spread * 2
        }
      }
      mesh.geometry.attributes.position.needsUpdate = true
    })
  })

  return (
    <>
      {groups.map((group, gi) => (
        <points key={gi} ref={(el) => (refs.current[gi] = el)}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={group.positions}
              count={group.n}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            map={group.texture}
            size={gi === 2 ? 0.11 : 0.085}
            transparent
            alphaTest={0.01}
            depthWrite={false}
            sizeAttenuation
          />
        </points>
      ))}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────────────

export default function PetalScene() {
  const { width } = useWindowSize()
  const isMobile = width < 768
  const count = isMobile ? 100 : 260

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <Canvas
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      camera={{ fov: 55, position: [0, 0.8, 5.5], near: 0.1, far: 100 }}
      dpr={[1, 2]}
      performance={{ min: 0.5 }}
      frameloop={prefersReducedMotion ? 'never' : 'always'}
      aria-hidden="true"
    >
      {/* Warm key light from upper right */}
      <ambientLight intensity={0.35} color="#3D2410" />
      <pointLight position={[2, 3.5, 2]} intensity={2.8} color="#F0BB50" />
      {/* Terracotta fill from lower left */}
      <pointLight position={[-3, -1.5, -1]} intensity={1.1} color="#C1692A" />

      <FloatingPetals count={count} />
      <LotusOrrery />
    </Canvas>
  )
}
