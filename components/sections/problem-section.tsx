"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { AlertTriangle, TrendingDown, Clock } from "lucide-react"
import { siteContent } from "@/content/site"

const problemIcons = {
  "Missed Opportunities": AlertTriangle,
  "Revenue Leakage": TrendingDown,
  "Manual Inefficiency": Clock,
}

export function ProblemSection() {
  return (
    <section id="problem" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,194,255,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">{siteContent.problem.headline}</h2>
        </motion.div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {siteContent.problem.cards.map((card, index) => {
            const Icon = problemIcons[card.title as keyof typeof problemIcons]

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: index === 1 ? 0 : index === 0 ? -5 : 5,
                }}
                className="group"
              >
                <Card className="relative p-8 h-full glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300 overflow-hidden">
                  {/* Animated background lines */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-accent to-transparent animate-pulse delay-300" />
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse delay-150" />
                    <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse delay-450" />
                  </div>

                  {/* Icon with glow effect */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative mb-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:glow-primary transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>

                    {/* Micro-animation indicator */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                    >
                      <div className="w-2 h-2 rounded-full bg-background animate-pulse" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-gradient transition-all duration-300">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                      {card.description}
                    </p>
                  </div>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
