import { Navbar } from "@/components/navigation/navbar"
import { HeroSectionSimple } from "@/components/hero/hero-section-simple"
import { ProblemSection } from "@/components/sections/problem-section"
import { SolutionSection } from "@/components/sections/solution-section"
import { ProcessSection } from "@/components/sections/process-section"
import { Footer } from "@/components/footer/footer"
import { StickyCTA } from "@/components/ui/sticky-cta"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="relative">
        <HeroSectionSimple />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
