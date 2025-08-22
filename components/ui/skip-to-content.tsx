"use client"

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
    >
      Skip to main content
    </a>
  )
}
