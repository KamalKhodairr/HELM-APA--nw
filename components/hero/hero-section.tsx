"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { NeuralMesh } from "./neural-mesh"
import { siteContent } from "@/content/site"
import { useState, useEffect } from "react"
import { ScheduleModal } from "@/components/modals/schedule-modal"
import { trackCTAClick } from "@/lib/analytics"

export function HeroSection() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const scrollToProcess = () => {
    const element = document.getElementById("process")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      trackCTAClick("hero", siteContent.hero.secondaryCTA)
    }
  }

  const handleScheduleClick = () => {
    setScheduleModalOpen(true)
    trackCTAClick("hero", siteContent.hero.primaryCTA)
  }

  const animationProps = reducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
    : { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, ease: "easeOut" } }

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Neural mesh background */}
        <NeuralMesh />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,194,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,194,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div {...animationProps} className="space-y-8">
              {/* Trust note */}
              <motion.div
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0.3 : 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect text-sm text-muted-foreground"
              >
                <div className={`w-2 h-2 rounded-full bg-accent ${reducedMotion ? "" : "animate-pulse"}`} />
                {siteContent.hero.trustNote}
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: reducedMotion ? 0 : 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0.1 : 0.4, duration: reducedMotion ? 0.3 : 0.8 }}
                className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
              >
                <span className="text-gradient">{siteContent.hero.headline}</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0.2 : 0.6, duration: reducedMotion ? 0.3 : 0.6 }}
                className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl"
              >
                {siteContent.hero.subheadline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reducedMotion ? 0.3 : 0.8, duration: reducedMotion ? 0.3 : 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  onClick={handleScheduleClick}
                  className="group relative overflow-hidden bg-primary hover:bg-primary-600 text-primary-foreground px-8 py-4 text-lg font-semibold glow-primary transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {siteContent.hero.primaryCTA}
                    <ArrowRight
                      className={`w-5 h-5 ${reducedMotion ? "" : "group-hover:translate-x-1"} transition-transform`}
                    />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToProcess}
                  className="group border-primary/30 hover:border-primary text-foreground hover:bg-primary/10 px-8 py-4 text-lg font-semibold transition-all duration-300 bg-transparent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                >
                  <Play
                    className={`w-5 h-5 mr-2 ${reducedMotion ? "" : "group-hover:scale-110"} transition-transform`}
                  />
                  {siteContent.hero.secondaryCTA}
                </Button>
              </motion.div>
            </motion.div>

            {/* Right side - Additional visual space for the 3D mesh */}
            <motion.div
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: reducedMotion ? 0.4 : 1, duration: reducedMotion ? 0.3 : 1, ease: "easeOut" }}
              className="relative h-96 lg:h-[600px] flex items-center justify-center"
            >
              {/* Glow effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-full blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/10 to-transparent rounded-full blur-2xl" />

              {/* Central focal point */}
              <div
                className={`relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-xl ${reducedMotion ? "" : "animate-pulse"}`}
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0.5 : 1.2, duration: reducedMotion ? 0.3 : 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
              <div className={`w-1 h-3 bg-primary rounded-full mt-2 ${reducedMotion ? "" : "animate-bounce"}`} />
            </div>
          </div>
        </motion.div>
      </section>

      <ScheduleModal open={scheduleModalOpen} onOpenChange={setScheduleModalOpen} />
    </>
  )
}
