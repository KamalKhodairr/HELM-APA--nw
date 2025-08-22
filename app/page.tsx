import { Navbar } from "@/components/navigation/navbar"
import { HeroSection } from "@/components/hero/hero-section"
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
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
