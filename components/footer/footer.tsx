"use client"

import { motion } from "framer-motion"
import { siteContent } from "@/content/site"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,194,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,194,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]">
          {/* Animated grid lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute inset-0 bg-[linear-gradient(rgba(111,255,233,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(111,255,233,0.2)_1px,transparent_1px)] bg-[size:80px_80px]"
          />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface/50 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo and tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
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
              <span className="text-3xl font-bold text-gradient">{siteContent.navigation.logo}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-sm">{siteContent.footer.tagline}</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-3">
              {siteContent.navigation.links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => {
                    const element = document.getElementById(link.href.replace("#", ""))
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Contact & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-foreground">Contact</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground">Ready to automate your practice?</p>
              <button
                onClick={() => console.log("Opening contact modal")}
                className="text-primary hover:text-accent transition-colors duration-200 font-medium"
              >
                Get in touch →
              </button>
            </div>

            {/* Legal Links */}
            <div className="pt-4 space-y-2">
              {siteContent.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">© {currentYear} HELM. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>AI-Powered Automation</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-24 bg-gradient-to-t from-primary/10 to-transparent blur-3xl" />
    </footer>
  )
}
