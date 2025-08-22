"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CheckCircle, Sparkles } from "lucide-react"
import { trackModalOpen, trackFormSubmission } from "@/lib/analytics"

interface ScheduleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  name: string
  clinicName: string
  email: string
  phone: string
  message: string
  honeypot: string // Anti-spam field
}

export function ScheduleModal({ open, onOpenChange }: ScheduleModalProps) {
  const [step, setStep] = useState<"form" | "calendar" | "success">("form")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    clinicName: "",
    email: "",
    phone: "",
    message: "",
    honeypot: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      trackModalOpen("schedule_consultation")
    }
    onOpenChange(newOpen)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^[+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-$$$$]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Check honeypot (should be empty)
    if (formData.honeypot) {
      console.log("Spam detected")
      return false
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      trackFormSubmission("schedule_consultation", false)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setStep("calendar")
    trackFormSubmission("schedule_consultation", true)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleCalendarComplete = () => {
    setStep("success")
  }

  const resetModal = () => {
    setStep("form")
    setFormData({
      name: "",
      clinicName: "",
      email: "",
      phone: "",
      message: "",
      honeypot: "",
    })
    setErrors({})
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="glass-effect border-primary/20 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            {step === "form" && "Schedule Your Strategic Consultation"}
            {step === "calendar" && "Choose Your Preferred Time"}
            {step === "success" && "Consultation Scheduled!"}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) => handleInputChange("honeypot", e.target.value)}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`glass-effect border-primary/20 focus:border-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      placeholder="Dr. John Smith"
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-sm text-red-400" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="clinicName">Clinic Name *</Label>
                    <Input
                      id="clinicName"
                      value={formData.clinicName}
                      onChange={(e) => handleInputChange("clinicName", e.target.value)}
                      className={`glass-effect border-primary/20 focus:border-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                        errors.clinicName ? "border-red-500" : ""
                      }`}
                      placeholder="Smith Family Dental"
                      aria-describedby={errors.clinicName ? "clinic-error" : undefined}
                    />
                    {errors.clinicName && (
                      <p id="clinic-error" className="text-sm text-red-400" role="alert">
                        {errors.clinicName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`glass-effect border-primary/20 focus:border-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="doctor@clinic.com"
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-400" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`glass-effect border-primary/20 focus:border-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      placeholder="(555) 123-4567"
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="text-sm text-red-400" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="glass-effect border-primary/20 focus:border-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background min-h-[100px]"
                    placeholder="Tell us about your current challenges or specific goals..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="flex-1 border-primary/30 hover:border-primary bg-transparent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-primary hover:bg-primary-600 text-primary-foreground glow-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : (
                      "Continue to Calendar"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {step === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Calendly Placeholder */}
              <div className="bg-surface/50 border border-primary/20 rounded-xl p-8 text-center space-y-4">
                <Calendar className="w-16 h-16 text-primary mx-auto" />
                <h3 className="text-xl font-semibold">Calendar Integration</h3>
                <p className="text-muted-foreground">
                  In production, this would be a Calendly embed or similar scheduling widget.
                </p>
                <Button
                  onClick={handleCalendarComplete}
                  className="bg-primary hover:bg-primary-600 text-primary-foreground glow-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
                >
                  Simulate Booking Completion
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setStep("form")}
                className="w-full border-primary/30 hover:border-primary bg-transparent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                ← Back to Form
              </Button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6 py-8"
            >
              {/* Confetti effect - respects reduced motion */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <CheckCircle className="w-20 h-20 text-accent mx-auto" />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ delay: 0.5, duration: 2, repeat: 2 }}
                  className="absolute -inset-4"
                >
                  <Sparkles className="w-6 h-6 text-primary absolute top-0 left-0" />
                  <Sparkles className="w-4 h-4 text-accent absolute top-2 right-0" />
                  <Sparkles className="w-5 h-5 text-primary absolute bottom-0 left-2" />
                  <Sparkles className="w-4 h-4 text-accent absolute bottom-2 right-2" />
                </motion.div>
              </motion.div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gradient">Perfect! You're All Set</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  We've received your information and you should receive a calendar confirmation shortly. We're excited
                  to discuss how HELM can transform your practice.
                </p>
              </div>

              <div className="bg-surface/50 border border-accent/20 rounded-xl p-6 space-y-3">
                <h4 className="font-semibold text-accent">What happens next?</h4>
                <ul className="text-sm text-muted-foreground space-y-2 text-left max-w-sm mx-auto">
                  <li>• Calendar confirmation email sent</li>
                  <li>• Pre-consultation questionnaire (optional)</li>
                  <li>• Strategic consultation call</li>
                  <li>• Custom automation proposal</li>
                </ul>
              </div>

              <Button
                onClick={resetModal}
                className="bg-primary hover:bg-primary-600 text-primary-foreground glow-primary focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
              >
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
