"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { siteContent } from "@/content/site"
import { ScheduleModal } from "@/components/modals/schedule-modal"
import { DemoModal } from "@/components/modals/demo-modal"

export function HeroSectionSimple() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const [demoModalOpen, setDemoModalOpen] = useState(false)

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />

        {/* Animated workflow lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            {/* Horizontal workflow lines */}
            <motion.path
              d="M0 200 Q300 180 600 200 T1200 200"
              stroke="url(#gradient1)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{
                duration: 3,
                delay: 0.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 2,
              }}
            />
            <motion.path
              d="M0 400 Q400 380 800 400 T1200 400"
              stroke="url(#gradient2)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{
                duration: 3,
                delay: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 2,
              }}
            />
            <motion.path
              d="M0 600 Q200 580 400 600 T800 600 Q1000 580 1200 600"
              stroke="url(#gradient3)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 3,
                delay: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 2,
              }}
            />

            {/* Process nodes */}
            <motion.circle
              cx="200"
              cy="200"
              r="3"
              fill="currentColor"
              className="text-primary"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{
                duration: 0.5,
                delay: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 4,
              }}
            />
            <motion.circle
              cx="600"
              cy="400"
              r="3"
              fill="currentColor"
              className="text-accent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{
                duration: 0.5,
                delay: 2.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 4,
              }}
            />
            <motion.circle
              cx="1000"
              cy="600"
              r="3"
              fill="currentColor"
              className="text-primary"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.8 }}
              transition={{
                duration: 0.5,
                delay: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                repeatDelay: 4,
              }}
            />

            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
                <stop offset="50%" stopColor="currentColor" className="text-primary" stopOpacity="0.6" />
                <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" className="text-accent" stopOpacity="0" />
                <stop offset="50%" stopColor="currentColor" className="text-accent" stopOpacity="0.4" />
                <stop offset="100%" stopColor="currentColor" className="text-accent" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
                <stop offset="50%" stopColor="currentColor" className="text-primary" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating automation indicators */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: 0,
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-accent/50 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 1,
            }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-primary/30 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: 2,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent"
            >
              {siteContent.hero.headline}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              {siteContent.hero.subheadline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
                onClick={() => setScheduleModalOpen(true)}
              >
                {siteContent.hero.primaryCTA}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg bg-transparent"
                onClick={() => setDemoModalOpen(true)}
              >
                {siteContent.hero.secondaryCTA}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <ScheduleModal open={scheduleModalOpen} onOpenChange={setScheduleModalOpen} />
      <DemoModal
        open={demoModalOpen}
        onOpenChange={setDemoModalOpen}
        title="How HELM Works"
        description="See how our automation system transforms your practice"
      />
    </>
  )
}
