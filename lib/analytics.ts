export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // In production, this would send to your analytics provider
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("Analytics Event:", event, properties)
    }

    // Example: Google Analytics 4
    // gtag('event', event, properties)

    // Example: Mixpanel
    // mixpanel.track(event, properties)
  },

  page: (path: string, properties?: Record<string, any>) => {
    if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
      console.log("Analytics Page View:", path, properties)
    }
  },
}

// Event tracking helpers
export const trackCTAClick = (location: string, ctaText: string) => {
  analytics.track("CTA Clicked", {
    location,
    cta_text: ctaText,
    timestamp: new Date().toISOString(),
  })
}

export const trackModalOpen = (modalType: string) => {
  analytics.track("Modal Opened", {
    modal_type: modalType,
    timestamp: new Date().toISOString(),
  })
}

export const trackStepInteraction = (step: string, action: string) => {
  analytics.track("Process Step Interaction", {
    step,
    action,
    timestamp: new Date().toISOString(),
  })
}

export const trackFormSubmission = (formType: string, success: boolean) => {
  analytics.track("Form Submission", {
    form_type: formType,
    success,
    timestamp: new Date().toISOString(),
  })
}
