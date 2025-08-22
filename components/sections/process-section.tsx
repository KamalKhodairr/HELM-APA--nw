"use client"

import { motion, useInView } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { siteContent } from "@/content/site"

interface ProcessStep {
  number: string
  title: string
  description: string
}

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0)
  const [pathDrawn, setPathDrawn] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const steps = siteContent.process.steps

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setPathDrawn(true), 500)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 4000) // Change step every 4 seconds

    return () => clearInterval(interval)
  }, [isInView, steps.length])

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const sectionRect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRect.height
      const scrollProgress = Math.max(0, Math.min(1, -sectionRect.top / (sectionHeight * 0.7)))

      const newStep = Math.floor(scrollProgress * steps.length)
      if (newStep !== activeStep && newStep < steps.length) {
        setActiveStep(newStep)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeStep, steps.length])

  return (
    <section id="process" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,194,255,0.05),transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gradient">{siteContent.process.headline}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{siteContent.process.subheadline}</p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left side - Interactive Pipeline */}
            <div className="relative h-96">
              {/* SVG Pipeline */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 300"
                fill="none"
                role="img"
                aria-label="Process pipeline with three steps"
              >
                <defs>
                  <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.3" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Curved path */}
                <motion.path
                  d="M 50 150 Q 200 50 350 150"
                  stroke="url(#pathGradient)"
                  strokeWidth="3"
                  fill="none"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={pathDrawn ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />

                {/* Process nodes */}
                {steps.map((step, index) => {
                  const positions = [
                    { x: 50, y: 150 },
                    { x: 200, y: 75 },
                    { x: 350, y: 150 },
                  ]
                  const pos = positions[index]
                  const isActive = activeStep === index

                  return (
                    <g key={index}>
                      {/* Node glow effect */}
                      {isActive && (
                        <motion.circle
                          cx={pos.x}
                          cy={pos.y}
                          r="25"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="2"
                          opacity="0.6"
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}

                      {/* Signal pulse animation */}
                      {isActive && index > 0 && (
                        <motion.circle
                          r="4"
                          fill="var(--accent)"
                          initial={{ offsetDistance: "0%" }}
                          animate={{ offsetDistance: "100%" }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                          style={{
                            offsetPath: `path("M ${positions[index - 1].x} ${positions[index - 1].y} Q 200 ${
                              index === 1 ? 50 : 75
                            } ${pos.x} ${pos.y}")`,
                          }}
                        />
                      )}

                      {/* Main node */}
                      <motion.circle
                        cx={pos.x}
                        cy={pos.y}
                        r="20"
                        fill={isActive ? "var(--primary)" : "var(--surface)"}
                        stroke={isActive ? "var(--accent)" : "var(--primary)"}
                        strokeWidth="2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 + index * 0.3, duration: 0.5 }}
                      />

                      {/* Node number */}
                      <motion.text
                        x={pos.x}
                        y={pos.y + 6}
                        textAnchor="middle"
                        className="text-sm font-bold pointer-events-none"
                        fill={isActive ? "var(--bg)" : "var(--primary)"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 + index * 0.3 }}
                      >
                        {step.number}
                      </motion.text>
                    </g>
                  )
                })}
              </svg>
            </div>

            {/* Right side - Detail Panel */}
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background font-bold text-lg">
                    {steps[activeStep].number}
                  </div>
                  <h3 className="text-3xl font-bold text-gradient">{steps[activeStep].title}</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{steps[activeStep].description}</p>
              </div>

              {/* Progress indicator */}
              <div className="flex gap-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeStep ? "bg-primary w-8" : "bg-muted w-4"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout - Scroll-snap sections for smooth scrolling */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Progress bar */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-muted">
              <motion.div
                className="w-full bg-gradient-to-b from-primary to-accent"
                initial={{ height: "0%" }}
                animate={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Steps with scroll-snap */}
            <div className="space-y-16 pl-12" style={{ scrollSnapType: "y mandatory" }}>
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative transition-all duration-500 ${index === activeStep ? "scale-105" : "scale-100"}`}
                  style={{ scrollSnapAlign: "start", minHeight: "200px" }}
                >
                  {/* Node */}
                  <div
                    className={`absolute -left-14 top-4 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                      index === activeStep
                        ? "bg-primary border-accent text-background glow-primary"
                        : "bg-surface border-primary text-primary"
                    }`}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <Card
                    className={`p-6 transition-all duration-500 ${
                      index === activeStep
                        ? "glass-effect border-primary/40 glow-primary"
                        : "bg-surface/50 border-muted"
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-3 text-gradient">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Auto-progress indicator */}
            <div className="flex justify-center items-center mt-8 gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === activeStep ? "bg-primary w-8" : "bg-muted w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
