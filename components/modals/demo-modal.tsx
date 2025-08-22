"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface DemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export function DemoModal({ open, onOpenChange, title }: DemoModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-effect border-primary/20 max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gradient flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            {title} Demo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lottie Animation Placeholder */}
          <div className="bg-surface/50 border border-primary/20 rounded-xl aspect-video flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
                <Play className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Interactive Demo</h3>
                <p className="text-muted-foreground text-sm max-w-md">
                  In production, this would show a Lottie animation demonstrating the {title.toLowerCase()} process in
                  action.
                </p>
              </div>
            </div>
          </div>

          {/* Demo description */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">How {title} Works:</h4>
            <div className="grid gap-3 text-sm text-muted-foreground">
              {title === "Capture & Qualify" && (
                <>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p>Lead submits form on your website</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p>AI instantly analyzes and qualifies the lead</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p>Personalized response sent within seconds</p>
                  </div>
                </>
              )}
              {title === "Eliminate No-Shows" && (
                <>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">1</span>
                    </div>
                    <p>Smart reminders sent via SMS & WhatsApp</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">2</span>
                    </div>
                    <p>AI detects potential no-shows early</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">3</span>
                    </div>
                    <p>Automatic rebooking for missed appointments</p>
                  </div>
                </>
              )}
              {title === "Automate Recall" && (
                <>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">1</span>
                    </div>
                    <p>System tracks patient treatment schedules</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p>Automated outreach at optimal timing</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-primary">3</span>
                    </div>
                    <p>Seamless booking for return visits</p>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            className="w-full bg-primary hover:bg-primary-600 text-primary-foreground glow-primary"
          >
            Close Demo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
