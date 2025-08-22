"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

const NeuralMeshClient = dynamic(
  () => import("./neural-mesh-client").then((mod) => ({ default: mod.NeuralMeshClient })),
  {
    ssr: false,
    loading: () => <NeuralMeshFallback />,
  },
)

function NeuralMeshFallback() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary/30"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated dots */}
          <g className="animate-pulse">
            <circle cx="200" cy="150" r="2" fill="currentColor" className="text-primary" />
            <circle cx="350" cy="200" r="1.5" fill="currentColor" className="text-accent" />
            <circle cx="500" cy="180" r="2" fill="currentColor" className="text-primary" />
            <circle cx="300" cy="350" r="1.5" fill="currentColor" className="text-accent" />
            <circle cx="600" cy="300" r="2" fill="currentColor" className="text-primary" />
          </g>

          {/* Connection lines */}
          <g className="opacity-30">
            <line x1="200" y1="150" x2="350" y2="200" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
            <line
              x1="350"
              y1="200"
              x2="500"
              y2="180"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary"
            />
            <line x1="300" y1="350" x2="500" y2="180" stroke="currentColor" strokeWidth="0.5" className="text-accent" />
          </g>
        </svg>
      </div>
    </div>
  )
}

export function NeuralMesh() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <NeuralMeshFallback />
  }

  return (
    <>
      <NeuralMeshFallback />
      <NeuralMeshClient />
    </>
  )
}
