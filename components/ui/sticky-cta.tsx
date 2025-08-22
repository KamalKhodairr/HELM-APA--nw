"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, X } from "lucide-react"
import { ScheduleModal } from "@/components/modals/schedule-modal"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past hero section
      const heroHeight = window.innerHeight
      const scrolled = window.scrollY > heroHeight * 0.8

      setIsVisible(scrolled && !isDismissed)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          >
            <div className="glass-effect border border-primary/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">Ready to automate?</p>
                  <p className="text-xs text-muted-foreground">Schedule your strategic consultation</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setScheduleModalOpen(true)}
                    className="bg-primary hover:bg-primary-600 text-primary-foreground glow-primary"
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </Button>

                  <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-muted-foreground">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScheduleModal open={scheduleModalOpen} onOpenChange={setScheduleModalOpen} />
    </>
  )
}
