import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SkipToContent } from "@/components/ui/skip-to-content"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "HELM - AI Automation for Clinics | The End of the Empty Chair",
  description:
    "HELM deploys intelligent automation to capture every lead, eliminate no-shows, and guarantee a full calendar. Transform your clinic with AI-powered patient acquisition and retention.",
  generator: "v0.app",
  keywords: [
    "AI automation",
    "clinic management",
    "patient scheduling",
    "healthcare technology",
    "medical practice automation",
    "patient acquisition",
    "no-show prevention",
  ],
  authors: [{ name: "HELM", url: "https://helm.ai" }],
  creator: "HELM",
  publisher: "HELM",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://helm.ai",
    title: "HELM - The End of the Empty Chair",
    description: "Intelligent automation to capture every lead, eliminate no-shows, and guarantee a full calendar.",
    siteName: "HELM",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HELM - AI Automation for Clinics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HELM - AI Automation for Clinics",
    description:
      "Transform your clinic with intelligent automation. Capture leads, eliminate no-shows, guarantee a full calendar.",
    images: ["/og-image.jpg"],
    creator: "@helm_ai",
  },
  alternates: {
    canonical: "https://helm.ai",
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00C2FF" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <SkipToContent />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
