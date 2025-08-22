export const siteContent = {
  hero: {
    headline: "The End of the Empty Chair",
    subheadline:
      "HELM deploys intelligent automation to capture every lead, eliminate no-shows, and guarantee a full calendar.",
    primaryCTA: "Schedule a Strategic Consultation",
    secondaryCTA: "See How It Works",
    trustNote: "",
  },
  problem: {
    headline: "Your Practice is Leaking Revenue. Find Out How.",
    cards: [
      {
        title: "Missed Opportunities",
        description:
          "Website leads go unanswered for hours, losing potential patients to competitors who respond faster.",
      },
      {
        title: "Revenue Leakage",
        description: "No-shows and cancellations create gaps in your schedule, directly impacting your bottom line.",
      },
      {
        title: "Manual Inefficiency",
        description: "Staff spend hours on scheduling calls and follow-ups instead of focusing on patient care.",
      },
    ],
  },
  solution: {
    headline: "A Dedicated Automation Engine for Your Practice.",
    cards: [
      {
        title: "Capture & Qualify",
        description: "An AI-powered system engages and converts website leads in seconds.",
      },
      {
        title: "Eliminate No-Shows",
        description: "Intelligent reminders and confirmations via SMS & WhatsApp protect your revenue.",
      },
      {
        title: "Automate Recall",
        description: "A smart recall system brings existing patients back for their next appointment, effortlessly.",
      },
    ],
  },
  process: {
    headline: "Launch Your Automated System in 3 Simple Steps.",
    subheadline: "The Path to a Fully Automated Practice.",
    steps: [
      {
        number: "01",
        title: "Strategic Audit",
        description: "A comprehensive analysis of your current patient acquisition and retention process.",
      },
      {
        number: "02",
        title: "System Deployment",
        description: "The implementation of the custom-configured HELM automation engine.",
      },
      {
        number: "03",
        title: "Performance & Growth",
        description: "Activation of the system, followed by ongoing performance monitoring and support.",
      },
    ],
  },
  navigation: {
    logo: "HELM",
    links: [
      { label: "Home", href: "#home" },
      { label: "Problem", href: "#problem" },
      { label: "Solutions", href: "#solutions" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Schedule Consultation",
  },
  footer: {
    tagline: "Intelligent automation for modern clinics",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
} as const
