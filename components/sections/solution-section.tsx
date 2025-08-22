"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Shield, RotateCcw, Play } from "lucide-react"
import { siteContent } from "@/content/site"
import { useState } from "react"
import { DemoModal } from "@/components/modals/demo-modal"

const solutionIcons = {
  "Capture & Qualify": Zap,
  "Eliminate No-Shows": Shield,
  "Automate Recall": RotateCcw,
}

export function SolutionSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState("")

  const handleDemoClick = (cardTitle: string) => {
    setSelectedDemo(cardTitle)
    setDemoModalOpen(true)
  }

  return (
    <>
      <section id="solutions" className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface/10 via-transparent to-surface/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(111,255,233,0.1),transparent_50%)]" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">{siteContent.solution.headline}</h2>
          </motion.div>

          {/* Solution cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {siteContent.solution.cards.map((card, index) => {
              const Icon = solutionIcons[card.title as keyof typeof solutionIcons]
              const isHovered = hoveredCard === index

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.02,
                    rotateX: 3,
                    rotateY: index === 1 ? 0 : index === 0 ? -3 : 3,
                    z: 50,
                  }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group"
                >
                  <Card className="relative p-8 h-full glass-effect border-accent/20 hover:border-accent/40 transition-all duration-500 overflow-hidden">
                    {/* Flowing signal lines */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {/* Horizontal flowing lines */}
                      <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={isHovered ? { x: "100%", opacity: [0, 1, 0] } : {}}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent"
                      />
                      <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={isHovered ? { x: "-100%", opacity: [0, 1, 0] } : {}}
                        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.5 }}
                        className="absolute bottom-1/4 right-0 w-full h-px bg-gradient-to-l from-transparent via-primary to-transparent"
                      />

                      {/* Vertical flowing lines */}
                      <motion.div
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={isHovered ? { y: "100%", opacity: [0, 1, 0] } : {}}
                        transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.3 }}
                        className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-accent to-transparent"
                      />
                      <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={isHovered ? { y: "-100%", opacity: [0, 1, 0] } : {}}
                        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: "linear", delay: 0.8 }}
                        className="absolute right-1/4 bottom-0 w-px h-full bg-gradient-to-t from-transparent via-primary to-transparent"
                      />
                    </div>

                    {/* Icon with enhanced glow */}
                    <motion.div
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative mb-6"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center group-hover:glow-accent transition-all duration-500">
                        <Icon className="w-8 h-8 text-accent group-hover:text-primary transition-colors duration-500" />
                      </div>

                      {/* Pulsing ring effect */}
                      <motion.div
                        initial={{ scale: 1, opacity: 0 }}
                        animate={isHovered ? { scale: 1.5, opacity: [0, 0.5, 0] } : {}}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        className="absolute inset-0 rounded-2xl border-2 border-accent"
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-4 mb-6">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                        {card.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors duration-300">
                        {card.description}
                      </p>
                    </div>

                    {/* Demo button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDemoClick(card.title)}
                      className="group/btn text-accent hover:text-primary hover:bg-accent/10 transition-all duration-300 p-0 h-auto font-medium"
                    >
                      <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      See a 10-sec demo
                    </Button>

                    {/* Enhanced hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/0 group-hover:border-accent/50 transition-all duration-500" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500" />
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} title={selectedDemo} />
    </>
  )
}
