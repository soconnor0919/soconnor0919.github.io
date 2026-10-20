export const productRelease = {
  stage: "Closed beta",
  platforms: "iOS and Android",
} as const;

export const productHardware = {
  name: "Medscribe companion",
  availability: "Hardware is in development and is not available to purchase.",
  renderLabel:
    "CAD render · SD app simulator capture · Hardware in development",
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
      "Share selected care updates privately, so a trusted caregiver can catch up since the last copy they reviewed.",
  },
  recordFreshness: {
    publicCopy:
      "See schedules, reminders, and key details together in one readable view.",
  },
} as const;

export const publicRoutes = [
  "/",
  "/device",
  "/how-it-works",
  "/privacy",
  "/access",
] as const;
