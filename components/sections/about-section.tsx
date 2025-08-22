"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Award, ArrowRight } from "lucide-react"
import { useState } from "react"
import { ScheduleModal } from "@/components/modals/schedule-modal"

export function AboutSection() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)

  const stats = [
    { icon: Users, label: "Clinics Automated", value: "500+" },
    { icon: Target, label: "Revenue Increase", value: "35%" },
    { icon: Award, label: "Client Satisfaction", value: "98%" },
  ]

  return (
    <>
      <section id="about" className="py-24 relative overflow-hidden bg-gradient-to-b from-background to-surface/20">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">About HELM</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're the automation specialists dedicated to transforming healthcare practices through intelligent
              technology.
            </p>
          </motion.div>

          {/* Content grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-foreground">Built for Healthcare Excellence</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                HELM was founded by healthcare professionals who understand the unique challenges of running a modern
                practice. We've experienced firsthand the frustration of missed opportunities, no-shows, and manual
                inefficiencies.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is simple: eliminate the empty chair. Through intelligent automation, we help practices
                capture every lead, reduce no-shows, and maximize revenue while allowing staff to focus on what matters
                most - patient care.
              </p>

              <Button
                onClick={() => setScheduleModalOpen(true)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg group"
              >
                Learn More About Our Approach
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Right stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card className="p-6 glass-effect border-primary/20 hover:border-primary/40 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                          <div className="text-muted-foreground font-medium">{stat.label}</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <ScheduleModal open={scheduleModalOpen} onOpenChange={setScheduleModalOpen} />
    </>
  )
}
