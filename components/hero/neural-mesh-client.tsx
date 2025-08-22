"use client"

import { useRef, useMemo, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

function NeuralPoints({ count = 1000 }) {
  const ref = useRef<THREE.Points>(null!)
  const { mouse, viewport } = useThree()

  const throttledMouse = useRef({ x: 0, y: 0 })
  const lastUpdate = useRef(0)

  const [positions, connections] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const connections: number[][] = []

    // Generate random points in a sphere
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const radius = Math.random() * 4 + 1
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)
    }

    // Create connections between nearby points
    for (let i = 0; i < count; i++) {
      const nearby: number[] = []
      const x1 = positions[i * 3]
      const y1 = positions[i * 3 + 1]
      const z1 = positions[i * 3 + 2]

      for (let j = i + 1; j < count; j++) {
        const x2 = positions[j * 3]
        const y2 = positions[j * 3 + 1]
        const z2 = positions[j * 3 + 2]

        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2)
        if (distance < 1.5 && nearby.length < 3) {
          nearby.push(j)
        }
      }
      connections[i] = nearby
    }

    return [positions, connections]
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      const now = state.clock.elapsedTime * 1000
      if (now - lastUpdate.current > 16) {
        throttledMouse.current.x = mouse.x
        throttledMouse.current.y = mouse.y
        lastUpdate.current = now
      }

      // Rotate the mesh slowly
      ref.current.rotation.x = state.clock.elapsedTime * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.05

      // React to mouse movement with throttled values
      const mouseInfluence = 0.5
      ref.current.rotation.x += throttledMouse.current.y * mouseInfluence * 0.1
      ref.current.rotation.y += throttledMouse.current.x * mouseInfluence * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00C2FF"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function NeuralConnections({ count = 200 }) {
  const ref = useRef<THREE.LineSegments>(null!)
  const { mouse } = useThree()

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 6) // 2 points per line, 3 coords per point

    for (let i = 0; i < count; i++) {
      const i6 = i * 6
      // Random start point
      const radius1 = Math.random() * 3 + 1
      const theta1 = Math.random() * Math.PI * 2
      const phi1 = Math.acos(2 * Math.random() - 1)

      positions[i6] = radius1 * Math.sin(phi1) * Math.cos(theta1)
      positions[i6 + 1] = radius1 * Math.sin(phi1) * Math.sin(theta1)
      positions[i6 + 2] = radius1 * Math.cos(phi1)

      // Random end point nearby
      const radius2 = radius1 + (Math.random() - 0.5) * 0.5
      const theta2 = theta1 + (Math.random() - 0.5) * 0.3
      const phi2 = phi1 + (Math.random() - 0.5) * 0.3

      positions[i6 + 3] = radius2 * Math.sin(phi2) * Math.cos(theta2)
      positions[i6 + 4] = radius2 * Math.sin(phi2) * Math.sin(theta2)
      positions[i6 + 5] = radius2 * Math.cos(phi2)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05
      ref.current.rotation.y = state.clock.elapsedTime * 0.03

      // Pulse effect based on mouse movement
      const mouseDistance = Math.sqrt(mouse.x ** 2 + mouse.y ** 2)
      const opacity = 0.1 + mouseDistance * 0.2
      if (ref.current.material instanceof THREE.LineBasicMaterial) {
        ref.current.material.opacity = Math.min(opacity, 0.4)
      }
    }
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#6FFFE9" transparent opacity={0.1} blending={THREE.AdditiveBlending} />
    </lineSegments>
  )
}

export function NeuralMeshClient() {
  const [webGLSupported, setWebGLSupported] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isIdle, setIsIdle] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    const idleTimer = setTimeout(() => setIsIdle(true), 1000)

    // Check WebGL support with proper error handling
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebGLSupported(false)
      }
    } catch (e) {
      setWebGLSupported(false)
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      clearTimeout(idleTimer)
    }
  }, [])

  if (!isIdle || !webGLSupported || reducedMotion) {
    return null
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: "transparent" }}
          dpr={[1, Math.min(window.devicePixelRatio, 2)]}
          performance={{ min: 0.5 }}
          frameloop="demand"
        >
          <ambientLight intensity={0.5} />
          <NeuralPoints count={600} />
          <NeuralConnections count={100} />
        </Canvas>
      </Suspense>
    </div>
  )
}
