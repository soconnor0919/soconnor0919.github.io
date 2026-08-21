export const productRelease = {
  stage: "Private by design",
  platforms: "iOS and Android",
} as const;

export const productClaims = {
  localAi: {
    publicCopy:
      "Medscribe helps turn visits and medication routines into clear, reviewable context.",
  },
  localRecord: {
    publicCopy:
      "Your health context stays organized around you and under your control.",
  },
  medicationFacts: {
    publicCopy:
      "Medication information is presented clearly, with important decisions left to you and your care team.",
  },
  caregiverSharing: {
    publicCopy:
      "Share selected context with a trusted caregiver when you choose.",
  },
  recordFreshness: {
    publicCopy:
      "See schedules, reminders, and key details together in one readable view.",
  },
} as const;

export const publicRoutes = [
  "/",
  "/how-it-works",
  "/privacy",
  "/access",
] as const;
