export type ClaimStatus = "built" | "beta-verified" | "roadmap";

export type ProductClaim = {
  publicCopy: string;
  status: ClaimStatus;
  evidence: string;
  verifiedOn: string;
};

export const productRelease = {
  stage: "Internal beta",
  platforms: "iOS and Android",
  verifiedOn: "August 20, 2026",
  drugFacts: 203,
  rxNormTerms: 33_185,
  interactionPairs: 1_150,
  flaggedForReview: 76,
} as const;

export const productClaims = {
  localAi: {
    publicCopy:
      "Visit transcription and supported AI tasks run on the device, without cloud AI inference.",
    status: "built",
    evidence: "App architecture and release-path audit",
    verifiedOn: "2026-08-20",
  },
  localRecord: {
    publicCopy:
      "The primary record is stored locally on the person's device, with no Medscribe cloud account.",
    status: "built",
    evidence: "Local SQLite data architecture",
    verifiedOn: "2026-08-20",
  },
  medicationFacts: {
    publicCopy:
      "Medication facts and known interaction pairs are read from bundled reference data rather than model memory.",
    status: "built",
    evidence: "Bundled data release manifest and deterministic answer paths",
    verifiedOn: "2026-08-20",
  },
  caregiverSharing: {
    publicCopy:
      "A person can manually export an encrypted snapshot targeted to a caregiver's public key.",
    status: "built",
    evidence:
      "QR pairing, safety-number display, encrypted export, ciphertext integrity, and wrong-recipient rejection",
    verifiedOn: "2026-08-20",
  },
  recordFreshness: {
    publicCopy:
      "Medication schedules can carry source, confirmation, timezone, and freshness state in the beta.",
    status: "built",
    evidence: "Medication schedule and Know Me freshness implementation",
    verifiedOn: "2026-08-20",
  },
  broaderProvenance: {
    publicCopy:
      "Source and freshness for conditions, allergies, baseline, and visit-derived changes are planned next.",
    status: "roadmap",
    evidence: "Current product roadmap",
    verifiedOn: "2026-08-20",
  },
} satisfies Record<string, ProductClaim>;

export const publicRoutes = [
  "/",
  "/how-it-works",
  "/privacy",
  "/beta",
] as const;
