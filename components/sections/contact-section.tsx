"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import { ScheduleModal } from "@/components/modals/schedule-modal"

export function ContactSection() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)

  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@helmautomation.com" },
    { icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: MapPin, label: "Location", value: "Serving Clinics Nationwide" },
    { icon: Clock, label: "Response Time", value: "Within 24 Hours" },
  ]

  return (
    <>
      <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-surface/20 to-background">
        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gradient">Ready to Transform Your Practice?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in touch with our automation specialists and discover how HELM can eliminate your empty chairs.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Contact cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {contactInfo.map((info, index) => {
                const Icon = info.icon
                return (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="p-6 text-center glass-effect border-accent/20 hover:border-accent/40 transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{info.label}</h3>
                      <p className="text-muted-foreground text-sm">{info.value}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Button
                onClick={() => setScheduleModalOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-xl glow-primary"
              >
                Schedule Your Strategic Consultation
              </Button>
              <p className="text-muted-foreground mt-4">Free 30-minute consultation • No commitment required</p>
            </motion.div>
          </div>
        </div>
      </section>

      <ScheduleModal open={scheduleModalOpen} onOpenChange={setScheduleModalOpen} />
    </>
  )
}
