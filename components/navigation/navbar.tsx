"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { siteContent } from "@/content/site"
import { ScheduleModal } from "@/components/modals/schedule-modal"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])
  const headerScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const handleScheduleClick = () => {
    setScheduleModalOpen(true)
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      <motion.header
        style={{ opacity: headerOpacity, scale: headerScale }}
        className={`fixed top-1 left-4 right-4 z-40 transition-all duration-500 ${
          isScrolled
            ? "glass-effect rounded-2xl border border-primary/20 shadow-2xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              {/* Helm icon */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-background"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-gradient">{siteContent.navigation.logo}</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {siteContent.navigation.links.map((link) => (
                <motion.button
                  key={link.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground/80 hover:text-foreground font-medium transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                onClick={handleScheduleClick}
                className="bg-primary hover:bg-primary-600 text-primary-foreground font-semibold px-6 py-2 glow-primary transition-all duration-300 hover:scale-105"
              >
                {siteContent.navigation.cta}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="glass-effect border-primary/20">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-3 pb-6 border-b border-primary/20">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-background"
                      >
                        <path
                          d="M12 2L2 7L12 12L22 7L12 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold text-gradient">{siteContent.navigation.logo}</span>
                  </div>

                  {/* Mobile Navigation Links */}
                  {siteContent.navigation.links.map((link) => (
                    <button
                      key={link.label}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-lg font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 py-2"
                    >
                      {link.label}
                    </button>
                  ))}

                  {/* Mobile CTA */}
                  <Button
                    onClick={handleScheduleClick}
                    className="bg-primary hover:bg-primary-600 text-primary-foreground font-semibold mt-4 glow-primary"
                  >
                    {siteContent.navigation.cta}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </motion.header>

      <ScheduleModal open={scheduleModalOpen} onOpenChange={setScheduleModalOpen} />
    </>
  )
}
