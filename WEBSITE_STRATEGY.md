# Medscribe Website Strategy

**Planning status:** phase-one public slice implemented; later routes and content operations remain planned<br>
**Product stage:** internal beta on iOS and Android<br>
**Primary website job:** help a person recognize the care-context problem, understand the product in under two minutes, trust its privacy boundaries, and request beta access<br>
**Secondary website job:** give health-system and pharmacy contacts a precise, evidence-backed path to evaluate a conversation without turning the consumer site into an enterprise pitch deck

### Implementation update — October 15, 2026

The device page layers the pendant in front of the companion in its hero,
with concise links to each product story below. The pendant section uses
static `public/device/pendant-v4/` renders, with no interactive demo controls.
The case follows the vendor envelope with softened R8 corners and 1.6 mm
edges. A continuous approximately 393 mm cord threads through the rear clip;
the previous overlapping connector and knot are removed. Solid intersection
checks verify cord clearance from the case, clip, back, and side buttons.
Physical fit and wearable safety remain unverified.

The renders use actual 200 × 200 SD/Wasm app captures for five Know Me pages
and a pending help request. The local CAD studio retains capture-replay
controls; the native WAMR simulator runs and verifies the real SD app. Upper
hold opens help, upper tap cancels, and lower Next cycles pages. Board GPIO
mapping, caregiver transport, cellular service, and emergency dispatch remain
unimplemented. These limits are retained in technical docs and a short
hardware-development note on the marketing page.

The consumer story now includes a Medscribe-branded e-paper companion alongside
the phone app. It presents a care-only product; OS/platform branding and
general-purpose device apps are outside the Medscribe visitor's journey.
The original app homepage is restored; the device has its own `/device` page.
Its hero uses a near-white mint textured-polymer CAD case (RGB 234, 245, 238),
with unchanged smaller deep teal logo inlays and a real
recording-screen capture, with a waveform generated from demonstration data. The companion
section covers a reviewed Know Me card. Hardware assets are versioned under
`public/device/pearl-v5/`; the original source CAD is preserved.

The Know Me section follows the hardware overview and explains the practical
handover: keep the companion with you, give a new clinician or care team quick
context, and hand it over when words are difficult or a visit is unexpected.
The hardware feature row names allergies, medications, care contacts, and
communication support. The person chooses, reviews, and updates the card in
Medscribe; the story keeps that control explicit.
The section keeps a heading, short introduction, and review/update note,
without a three-use-case list. One handheld card and one actual iPhone
Emergency record capture share a responsive stage at all sizes: the phone is
behind on the right, rotated 6 degrees, and the handheld overlaps in front on
the left, rotated minus 6 degrees, with soft offset shadows. One caption reads
“Carry it on your companion. Review it in Medscribe.” The phone capture
references `public/device/phone-know-me-v1/`, with matching fictional Alex Morgan
allergies, conditions, inhalers, and care contact seeded by the guarded
`scripts/phone-preview/seed-know-me.py` into the dedicated iOS 27 preview
simulator. This is not physical card-transfer verification.

The real SD app defaults to a full-screen Know Me resting card, without a clock,
footer, or on-screen buttons. Its dense fictional Alex Morgan page contains
allergies, medications, conditions, care contact, support preferences, and care
team phone numbers. Physical center opens appointment actions; Back from those
actions and saving a recording return to the card. Optional multiple received
pages use the physical rocker. A minimal sibling paperOS public SD API extension,
`PAPER_FULLSCREEN`, supports this behavior, with SDK documentation updated.
Running WAMR checks verify default-card, wake/action, consent, and save
transitions; no board flash, physical power/sleep behavior, or panel retention
is established.

The resting card fits all six care sections on one full-screen page. A centered
ms logo and 24 px Know Me title group sits above the centered 32 px patient
name. Category headings are 24 px uppercase and body text is 24 px. Six
outlined rounded groups with public SDK section icons fit the information on
the full-screen 480 × 800 panel.
The phone-reviewed card fixture shows a scheduled
Budesonide inhaler with “Next dose: Oct 15 at 8 PM” and Albuterol “as needed”
with “No scheduled dose.” These are supplied fixture values, not new medical
advice, a live countdown, or a scheduling engine.

Below 1024 px, recording and card hardware photos appear in
`HardwareSection` as a side-by-side pair with slight overlap, rotations, and
soft drop shadows; the separate hero image is hidden in the stacked layout.
Desktop retains the separate hero and hardware-section renders.

The iPhone workflow uses fresh captures
of the actual Expo Medscribe app on an iPhone 17 Pro simulator running iOS 27.0
(24A434). Two light/dark screens show Alex Morgan's six-appointment Visits list
(knee follow-up, asthma review, physiotherapy, annual checkup, eye exam, and
medication review), and real local audio playback with a timestamped transcript.
The knee visit is marked as imported from the companion. Know Me and Companion remain parts of
the Medscribe app story; transcript review happens on the phone.

The fictional knee osteoarthritis conversation covers symptoms, the X-ray,
physiotherapy goals, and a six-week follow-up. The website shows screenshots
only, with no audio player, expandable conversation, or downloadable sample
audio in the public asset directory. Local audio remains in the app for the
playback screenshot. The fixture
records consent 25 seconds before recording; consent dialogue is outside the
audio. Assets and provenance are versioned under
`public/device/phone-appointment-v5/`, with reproduction scripts under
`scripts/phone-preview/`. Display alpha and Dynamic Island pixels captured with
`simctl screenshot --mask=alpha` are retained in `scripts/phone-preview/assets/`.
The native 1206 × 2622 screen is composited at offset `+72+69` into the existing
1350 × 2760 photographic bezel, preserving the visible island without a
hand-drawn corner mask. The fixture was seeded into a dedicated empty
simulator; its speech-synthesized audio and script-derived transcript do not
prove physical import or ASR accuracy. Generated iOS lifecycle files were
patched locally for this iOS 27 preview, without production app changes.

This is a website extension in the existing Instrument Sans, mint/teal,
light/dark design system. The phone capture set and partner print documents
remain the visual sources for their respective existing surfaces. The new
hardware renders come from a separately edited CAD copy with actual 480 × 800
framebuffer captures of an actual Medscribe SD/Wasm app mapped onto its display.
They use no synthesized imagery. The package is built with the public SDK and
executed by the SD loader, WAMR, and native C/LVGL renderer with fictional service
fixtures. Appointment, OS consent/start/stop/save, animated simulated waveform, Know Me pagination, and phone-connection screens
are captured from that running app. The native host is not an ESP32 emulator.
Editable CAD, source hashes, capture scripts, and the reproduction workflow
live under `device-cad/` and `scripts/device-preview/`. No additional public
client-side viewer or UI dependency is required.

Claim boundaries: hardware is in development, not available for purchase;
device connection currently uses the native iPhone app; transcription runs on
the phone; board originals remain encrypted and preserved on import. The
public access flow is an app-beta request, not a hardware preorder. The render
expresses the intended branded product and does not establish that a restricted
Medscribe-only firmware build exists. Firmware changes require separate work.

### Implementation update — August 20, 2026

The first coherent public slice is now built:

- `/` is consumer-first and tells the context-thread story from visit review to
  medication maintenance to a Know Me/caregiver handoff.
- `/how-it-works`, `/privacy`, and `/beta` provide the first product, trust, and
  access depth without inventing a form backend or collecting health data.
- Shared public navigation, a richer footer, route metadata, reduced-motion
  behavior, mobile layouts, an accessible product tab pattern, and a typed
  release/claim registry are in place.
- Northwell moved to `/briefs/northwell`; Northwell, CVS, and Walgreens print
  output remains intact and named/internal routes are `noindex` and disallowed
  in `robots.txt`.
- Sharing copy includes the current beta limitation found in simulator testing:
  ciphertext integrity and wrong-recipient rejection work, but import does not
  yet require an actively trusted sender and recipient-key metadata is not
  authenticated/checked. Revocation only blocks future local exports and cannot
  invalidate ciphertext already exported.

Still planned: dedicated caregivers/emergency pages, generic partner pages,
about/support/legal policy routes, route-specific brief authentication, a
reviewed form backend, richer evidence methodology, structured content-freshness
checks, and new captures showing the latest schedule/freshness UI.

## 1. The decision

Build one coherent public site with three deliberately different layers:

1. **The human story** — a consumer-facing homepage and scenario pages about the record that goes missing between visits and at handoffs.
2. **The product proof** — real, clearly labeled beta screens and short demos showing how a visit, a medication, and a caregiver handoff contribute to one current record.
3. **The trust proof** — a plain-language privacy and evidence center that states exactly what runs locally, what can use a network, what sharing v1 does, what has been evaluated, and what remains unfinished.

Partner materials should sit beside this public story, not replace it. The existing Northwell, CVS, and Walgreens work is useful sales collateral, but named-partner executive summaries should be private or intentionally shared, excluded from search, and protected from changes to the public design system.

The richer site should feel like an editorial product story, not a dense feature grid and not a generic “AI healthcare” landing page. Its central narrative is:

> Care happens in fragments. Medscribe helps the patient carry the context between them.

The everyday loop is the evidence for the emergency promise:

```text
visit or document
        ↓
plain-language summary
        ↓
medication and follow-up record
        ↓
daily reminders, questions, and corrections
        ↓
a current Know Me handoff when someone new needs the picture
```

This is the story no single isolated screenshot currently tells.

## 2. What the phase-one baseline gave us

Before the public slice was built, the Next.js site had more useful material
than its “single-page site” README description suggested:

- A polished Northwell-specific root page and three-page print summary, now
  preserved at `/briefs/northwell`.
- Separate in-progress CVS and Walgreens print-oriented routes.
- A retired but reusable general executive-summary page and competitive-landscape content.
- A strong screenshot library covering onboarding, visits, transcription, summaries, medications, chat, settings, and the emergency record.
- Reusable `PhoneMockup`, `FeatureShowcase`, logo, section-label, card, button, header, footer, and screen-background components.
- A restrained app-aligned teal/slate token set, light/dark preferences, and early entrance-motion utilities.
- Optional Umami analytics and an optional site-wide password gate.
- Print-specific page geometry already tuned for letter-size PDFs.

The phase-one implementation resolved the missing public information
architecture and separated Northwell from `/`. Partner print artifacts still
share global marketing and print styles, so later layout refactors must remain
narrow and regression-tested.

### Preserve during implementation

The current working tree contains uncommitted marketing, styling, PDF, CVS, and Walgreens work. Do not mechanically reorganize it as part of the first website pass. Land or otherwise establish ownership of that work first, then refactor in narrow steps.

The following behaviors are release constraints:

- `/cvs` and `/walgreens` must continue to render their intended screen instructions and exact print documents.
- The Northwell print summary must remain exportable even after `/` becomes consumer-facing.
- Letter-size page count, print backgrounds, page breaks, and print color must be regression-tested.
- Public navigation and analytics must not appear in a printed partner document.
- A public-site redesign must not silently publish previously redirected internal landscape or executive-summary content.

## 3. Audiences and jobs to be done

### Primary: a patient or family caregiver

They are usually not shopping for “on-device AI.” They are trying to keep medications, appointments, changed instructions, and family handoffs straight. They need to answer:

- Is this for a situation like mine?
- What would I actually do with it this week?
- Does it replace MyChart or my clinician? (No.)
- Will I be asked to upload health information or create another cloud account?
- What is built in the beta, and how do I try it?

The site should lead with recognition and relief, then demonstrate the workflow, then explain the architecture.

### Secondary: a health-system evaluator

They need a disciplined description of the boundary between the patient-owned layer and the institutional EHR, plus security details, operational assumptions, integration status, evaluation evidence, and a narrowly defined pilot hypothesis. They should not have to infer those facts from consumer copy.

### Secondary: a pharmacy or payer-adjacent evaluator

They need a medication-management narrative, but outcome language must stay hypothetical until measured. “Designed to support refill continuity” is supportable; “moves adherence,” “lowers cost of care,” or a guaranteed impact on Stars/EQuIPP is not yet substantiated.

### Supporting: clinicians, pharmacists, privacy reviewers, press, and potential collaborators

They need a quick product explanation and a trustworthy source trail. A clear evidence page is more persuasive than larger performance claims on the homepage.

### Not a target audience

Do not position Medscribe as a diagnostic assistant, dosing authority, clinician scribe, EHR replacement, emergency medical device, or universal health-data integration layer.

## 4. Information architecture

### Public navigation

```text
Medscribe
├── /                         Home: the portable-context story
├── /how-it-works             One record, built through everyday use
├── /caregivers               Multi-person care and handoffs
├── /emergency                The Know Me record and its limits
├── /privacy                  Data map, local inference, sharing, limitations
├── /evidence                 Sources, evaluation methods, release status
├── /beta                     Who the beta is for, expectations, request access
├── /about                    Founder story and product principles
└── /partners                 Generic partner overview and contact path
    ├── /health-systems       EHR-complement and pilot hypothesis
    └── /pharmacies           Medication-loop and pilot hypothesis
```

This is the target architecture, not a requirement to launch nine pages on day one. The first launch can combine `caregivers` and `emergency` into the homepage and combine `privacy` and `evidence` if content ownership is limited.

### Intentionally shared partner materials

```text
/briefs/northwell
/briefs/cvs
/briefs/walgreens
```

Recommended behavior:

- Require the existing password gate for named briefs or use unguessable, expiring distribution outside the site.
- Add `noindex, nofollow, noarchive` headers and metadata even when gated.
- Exclude them from sitemap, public nav, site search, and public analytics.
- Keep printable documents visually self-contained.
- Preserve `/cvs` and `/walgreens` as redirects or aliases only after verifying bookmarks and any PDFs already distributed.

The current proxy is site-wide when `SITE_PASSWORD` is set. A later implementation should support route-specific protection so the public site can remain public while named briefs stay private. That change deserves its own security review; do not improvise it during visual work.

### Utility and policy routes

Before a broad beta launch, add:

- `/privacy-policy` — actual legal/privacy notice, distinct from the architecture explainer.
- `/terms` — beta terms and medical disclaimer reviewed by counsel.
- `/support` — contact, deletion/reset instructions, device-loss guidance, and incident-reporting path.
- `/accessibility` — optional at first, but provide a direct accessibility contact in the footer.

These pages should not be generated from marketing copy. They require product/security verification and legal review.

## 5. The richer editorial narrative

The experience should alternate between human stakes and concrete proof. Avoid starting with a technology taxonomy or a competitive claim.

### Act I: the missing picture

A restrained hero introduces a familiar moment: the doctor, pharmacist, sibling, or ER asks what changed, and the complete answer is scattered across memory, portals, labels, and one caregiver's notes.

Suggested headline territory:

- **Carry the context when care gets complicated.**
- **Your medical picture should travel with you.**
- **Be known, even when the chart is incomplete.**

Suggested support line:

> Medscribe is a private, patient-controlled beta that helps you keep visits, medications, and critical context together on your device, ready to review or share when you choose.

The hero should show the product, but not as an isolated phone floating beside copy. Use a small sequence of three screens or a layered “record assembling” composition: visit summary, medication card, then Know Me record.

Primary CTA: **Request beta access**<br>
Secondary CTA: **See how it works**<br>
Status label: **Internal beta · iOS and Android**

### Act II: the record earns its freshness

Tell one continuous workflow in three chapters:

1. **After a visit:** type or paste notes, import a portal screenshot, attach a document, or use consent-gated recording; review the generated summary.
2. **Between visits:** keep the medication list, reminders, refills, intake, and questions close to the underlying record.
3. **At a handoff:** open a Know Me view or manually export an encrypted snapshot to a paired caregiver.

Each chapter should contain:

- one real product screen;
- one sentence describing the user's action;
- one sentence explaining what is local/deterministic;
- one explicit confirmation or correction moment, so AI output is not presented as automatically authoritative.

### Act III: why local changes the relationship

Move from the experience to a plain-language data flow. Explain task by task, not with “everything” absolutes:

- transcription and supported AI tasks run on the device;
- bundled drug facts and known interaction pairs are read locally;
- sharing v1 is a manual, pairwise encrypted snapshot;
- model installation/update may require a network;
- product behavior and storage protections are still being hardened for broader release.

Link to the full privacy and evidence pages.

### Act IV: invite the right beta user

The close should define a good beta participant:

- managing several medications or repeated visits;
- coordinating with a family caregiver;
- willing to review generated information and report errors;
- understands this is not emergency care, diagnosis, or dosing guidance.

The beta form should ask only operational questions. Do not collect diagnoses, medication names, transcripts, or other health information on the website.

## 6. Page-by-page content and wireframes

### `/` — Home

**Goal:** recognition → product understanding → trust → beta request.

```text
[compact nav: How it works | Caregivers | Privacy | Evidence | Beta]

[beta eyebrow]
[human headline + two CTAs]         [3-screen record composition]
[one-line product boundary]

[problem vignette: “the context doesn’t travel”]
[visit] — [between visits] — [handoff]

[scrolling record thread]
  capture → review → keep current → share when chosen

[interactive product proof]
  Visits | Medications | Ask | Know Me | Sharing
  real screenshot + action + limitation/source note

[three human situations]
  newly diagnosed | long-distance caregiver | unfamiliar care setting

[privacy proof strip]
  local inference | bundled facts | patient-controlled manual sharing
  “Read the exact boundaries” → /privacy

[what the beta is / is not]

[request access CTA]
[footer: product, trust, company, legal]
```

Use `FeatureShowcase` as a starting point for product proof, but update it to an accessible tabs or disclosure pattern, add the Know Me/sharing distinction, and ensure every mobile user can reach the same content without hover.

### `/how-it-works`

**Goal:** make the daily-maintenance thesis tangible.

Sections:

1. A numbered overview of the four input paths: type/paste, portal screenshot, documents/photos, optional consent-gated audio.
2. A review checkpoint showing that summaries and extracted data are suggestions until confirmed.
3. Medication workflow: label OCR, editing, reminders/refills/intake, bundled facts.
4. Ask workflow: deterministic fact lookup versus locally generated conversational glue; clinician/pharmacist deferral boundary.
5. Record freshness: show the built current/unconfirmed/review-needed Know Me state and the built
   schedule source/confirmation/timezone UI. Broader provenance for conditions, allergies, and
   visit-derived record changes remains roadmap and must not be mocked as current.
6. Handoff: Know Me view versus paired encrypted export.
7. “What it does not do” block.

### `/caregivers`

**Goal:** center the real coordination use case without implying live synchronization.

Sections:

- A shift-change story involving two family members.
- What is built: QR identity pairing, safety-number verification, manual encrypted snapshot export/import, local trust and revocation controls.
- What is not built: account-based household, automatic background sync, blind relay, Double Ratchet/forward-secret live channel.
- A walkthrough with synthetic demo data.
- A safety checklist: verify the recipient, review content before export, re-export after material changes, revocation does not erase a snapshot already received.
- Beta CTA specific to caregiver pairs.

Never use “real-time,” “continuous shared view,” “Signal protocol,” or “live sync” for v1.

### `/emergency`

**Goal:** explain the Know Me record's role and limits.

Sections:

- The founder's motivating story, told carefully and without implying a guaranteed clinical outcome.
- The structured fields currently built: conditions, allergies, baseline, contacts, medications,
  per-medication time-critical flag/note, fixed-time or as-needed schedule, optional user-entered
  window, source/confirmation/timezone, and whole-card freshness state.
- A large, readable Know Me screen demonstration.
- “Prepared for a handoff, not a replacement for emergency services or a clinician's verification.”
- State that the app records only timing supplied by the label/pharmacist/prescribing team; it does
  not calculate or shift times. Label physical-device migration/notification/DST validation and
  broader field provenance accurately.
- Device access constraints: the current app experience is not a lock-screen medical ID unless and until that specific behavior ships and is tested.

Prefer **handoff-ready** or **Know Me record** over an unqualified **emergency-ready** claim. If “emergency-ready” remains in brand copy, define it immediately and state that no clinical outcome has been validated.

### `/privacy`

**Goal:** make the privacy promise falsifiable and useful.

Lead with a data-flow diagram and a task matrix:

| Task                      | Where it happens           | Network behavior                          | User control                                                                            |
| ------------------------- | -------------------------- | ----------------------------------------- | --------------------------------------------------------------------------------------- |
| Visit transcription       | Device                     | No cloud inference                        | Recording requires consent                                                              |
| Summary generation        | Device                     | No cloud inference                        | User reviews output                                                                     |
| Medication OCR            | Device                     | No cloud inference                        | User confirms extracted fields                                                          |
| Drug facts/interactions   | Bundled data               | No runtime lookup for fact answers        | Source and coverage disclosed                                                           |
| Model installation/update | Device receives model file | Network may be required                   | Integrity/version status disclosed                                                      |
| Caregiver sharing v1      | Pairwise encrypted export  | User chooses the transport for ciphertext | Pair, verify, export, revoke trust                                                      |
| Local record storage      | Device database            | No Medscribe cloud account                | State exact OS/app protection; do not claim app-level at-rest encryption unless shipped |
| Website analytics         | Marketing site only        | Optional limited web telemetry            | State provider, fields, retention, opt-out                                              |

Also include:

- a precise threat-model summary;
- what the design protects against and what it does not;
- lost/unlocked device considerations;
- model-download and update integrity status;
- sharing protocol/version language;
- a dated security changelog or link;
- a security contact and incident-reporting method;
- separate links to the legal privacy policy and beta terms.

Do not publish the current strongest language (“nothing to breach,” “nothing to subpoena,” or “no BAA to negotiate”) as fact. Local storage can still be exposed on a compromised or unlocked device, exported ciphertext can persist with a recipient, websites have their own telemetry, and BAA applicability is a legal/operational conclusion.

### `/evidence`

**Goal:** replace generic AI superlatives with reproducible evidence.

Content model for each evidence card:

- capability tested;
- model/build identifier;
- dataset or scenario set and sample count;
- held-out versus training status;
- platform tested (Mac is not iPhone);
- date;
- metric definition;
- result;
- known blind spots;
- link to methodology or a concise downloadable report.

Suggested sections:

1. Product status table: built, beta-verified, device-tested, roadmap.
2. Deterministic knowledge sources: openFDA label data, RxNorm terminology, MED-RT/DailyMed classes, and ONC/CredibleMeds interaction inputs, with coverage counts and dataset dates pulled from the release manifest.
3. Model evaluation, clearly separating MLX/Mac, llama.cpp/Mac, simulator, and physical-device results.
4. Human review status for condensed drug information. Do not imply that public source data makes the condensed patient wording FDA-reviewed.
5. Safety boundaries and known failure classes.
6. Release notes and last verification date.

Do not carry forward the retired executive page's 97% extraction and 100% refusal numbers without the full model version, test-set size, methodology, platform, date, and current-release match. Historical results can appear in a labeled archive.

### `/beta`

**Goal:** produce qualified beta conversations without collecting health data.

Sections:

- Who it is for.
- What platforms and distribution channels are currently available.
- What participants should expect: onboarding, manual review, feedback, possible resets, no guaranteed continuity.
- What not to submit on the website.
- Current test focus: record freshness, medication-label edge cases, notifications, caregiver export, Know Me comprehension, and physical-device model performance.
- Short form: name, email, iOS/Android, patient/caregiver/both, general coordination challenge in non-clinical categories, willingness to test with a caregiver, consent to be contacted.
- Medical and emergency disclaimer.

Until a privacy-reviewed form backend exists, retain the current email CTA but rewrite the prefilled body so it does not solicit diagnoses, medications, or other health details.

### `/about`

**Goal:** establish origin and principles without making the founder story carry the whole proof burden.

Sections:

- Sean O'Connor and the grandfather/caregiver origin.
- The product principles: patient control, local inference, facts before fluent guesses, review before authority.
- Current beta stage and collaborator/contact CTA.
- Corporate identity stated consistently after legal review.

### `/partners`

**Goal:** route serious evaluators without turning public pages into named account pitches.

Use a generic overview with two paths:

- **Health systems:** patient-held context between and outside institutional encounters; a pilot can test handoff completeness and patient engagement. FHIR import and workflow integration are roadmap unless a scoped prototype is built.
- **Pharmacies:** patient-held medication context, reminders, refill visibility, and pharmacist questions. A pilot can test usability and refill continuity; do not claim measured adherence, cost, Star, EQuIPP, or script-share impact before data exists.

Every outcome statement should use a three-part pattern:

```text
Observed problem → product mechanism → measurable pilot hypothesis
```

Example:

> Medication lists become fragmented across prescribers. Medscribe helps a participant review one patient-held list and reminder history. A pilot could measure list completeness, correction frequency, and participant-reported confidence; it has not yet established an effect on adherence or medical spend.

### `/partners/health-systems`

Suggested modules:

- The between-visit and out-of-network gap.
- Exact current workflow without integration.
- Future import-only FHIR direction, explicitly roadmap.
- Security architecture and diligence links.
- Pilot shape: population, duration, responsibilities, opt-in metrics, safety escalation.
- What remains with Epic/MyChart.
- Contact CTA.

Avoid “feeds context back into Epic” until an actual consented workflow/integration exists. Say “a future partner workflow could return patient-approved context” and label it proposed.

### `/partners/pharmacies`

Suggested modules:

- Cross-prescriber medication picture.
- Reminder, refill, intake, and facts-first question workflow.
- Pharmacist escalation rather than model authority.
- Generic pilot hypothesis and metrics.
- Integration/co-branding possibilities labeled proposed.
- Contact CTA.

Keep named CVS and Walgreens business logic in their briefs, not this public route.

## 7. Claim system and guardrails

Claims need a source of truth just as drug facts do. Phase one introduced a
typed registry in `src/content/product.ts`; continue expanding it before adding
quantitative, security, integration, regulatory, clinical-outcome, or
availability claims. Each claim should carry:

```ts
type Claim = {
  id: string;
  publicCopy: string;
  status: "built" | "beta-verified" | "proposed" | "roadmap";
  evidence: string;
  verifiedOn: string;
  owner: string;
};
```

Render status labels where ambiguity is likely and make stale verification dates fail a content check or appear in a review report.

### Copy guardrail table

| Topic                | Supportable language now                                                                     | Avoid until verified                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Runtime AI           | “Visit transcription and supported AI tasks run on the device.”                              | “Nothing ever leaves the phone.”                                                                                     |
| Network              | “No cloud AI inference.”                                                                     | “No network use” unless every release path is audited and qualified.                                                 |
| Storage              | “The primary record is stored locally on your device.”                                       | “Encrypted at rest by Medscribe,” “unbreachable,” or equivalent without implemented and tested app-level protection. |
| Sharing              | “Manual pairwise encrypted snapshot sharing using X25519 and XChaCha20-Poly1305 primitives.” | “The Signal protocol,” “live sync,” “continuous shared view,” “forward secret.”                                      |
| Patient control      | “You choose when to pair and export.”                                                        | “Revocation deletes every previously received copy.”                                                                 |
| Drug facts           | “Answers can render bundled fields derived from named public reference datasets.”            | “FDA-reviewed answers,” “clinically validated,” or “complete interaction checker.”                                   |
| Interaction coverage | “Known pairs from a defined bundled high-priority list.”                                     | “Catches drug interactions” without a coverage limitation.                                                           |
| AI accuracy          | Model/build/test/platform/date-specific results.                                             | Unqualified percentages, “medical-grade,” “safe,” or “accurate.”                                                     |
| Emergency use        | “A Know Me handoff puts selected context in one view.”                                       | “Prevents errors,” “saves lives,” “works from the lock screen,” or “medical device” claims.                          |
| Integrations         | “Portal screenshots can be imported; structured FHIR import is roadmap.”                     | “Integrates with Epic/MyChart,” “feeds Epic,” or “interoperable” as a current feature.                               |
| Release stage        | “Internal beta on [verified channels].”                                                      | “Shipped,” “production-ready,” or broad availability if access remains controlled.                                   |
| Business impact      | “A pilot could measure…”                                                                     | “Moves adherence,” “lowers costs,” “improves ratings,” or “keeps scripts” without evidence.                          |
| Legal/compliance     | Describe architecture and data flow.                                                         | “HIPAA compliant,” “no BAA required,” or legal conclusions without counsel and operating context.                    |

### Release-content rule

No quantitative, security, integration, regulatory, clinical-outcome, or availability claim should ship from an ad hoc component string. It must point to a dated evidence or product-status entry and be reviewed when the app release changes.

## 8. Visual direction

### Character

Keep the current app-aligned teal/slate foundation, editorial serif headings, and high legibility. Make it richer through composition, pacing, and genuine product material—not through more gradients, glass effects, or AI imagery.

Desired qualities:

- calm and humane rather than sterile;
- precise rather than futuristic;
- domestic and between-visit rather than hospital-centric;
- recognizably a health product without stock doctors, glowing brains, shields, or abstract neural networks.

### Signature visual: the context thread

Use a thin, evolving line or ledger motif that connects a visit excerpt, medication change, daily reminder, caregiver note, and Know Me field. On wide screens it can travel vertically through the page. On small screens it becomes a simple numbered sequence. It should demonstrate provenance and continuity, not decorate empty space.

### Product imagery

- Keep real screenshots large enough to read.
- Use one primary phone at a time on mobile; avoid tiny multi-phone collages.
- On desktop, layer two or three screens only when their relationship is the point.
- Pair each screenshot with a visible status: **Current beta**, **Illustrated workflow**, or **Roadmap concept**.
- Never place invented medical content in a mockup without a clear synthetic-demo label.

### Color and typography

- Preserve the current serif/sans pairing unless performance or licensing review suggests a system fallback.
- Add one warm neutral range for human-story sections; do not add a second saturated brand color.
- Reserve red/amber for actual warnings and status, not decoration.
- Maintain WCAG 2.2 AA contrast in light and dark preferences.
- Avoid low-contrast teal-on-mint for small text and badges.

### Motion

Use motion to reveal the record's continuity:

- gentle crossfade or matched transition between the three lifecycle screens;
- a progress line that advances as chapters enter the viewport;
- screenshot detail callouts that appear after the screen settles;
- optional, user-controlled 30–45 second product demo.

Constraints:

- Respect `prefers-reduced-motion`; all meaning must remain present with animation disabled.
- Do not autoplay audio.
- Avoid scroll-jacking, pinned sections longer than one viewport on mobile, parallax text, or looping attention animation.
- Pause media when off-screen and provide visible controls, captions, and a transcript.
- Keep entrance motion under roughly 300–500 ms and never delay primary content for choreography.

## 9. Responsive and accessible behavior

Treat accessibility as a component acceptance criterion, not a final audit.

### Global requirements

- Semantic landmark structure, one descriptive `h1`, and logical heading hierarchy.
- Keyboard-visible focus that survives light/dark themes.
- Skip link to main content.
- Touch targets at least 44 by 44 CSS pixels where practical.
- No information available only through hover, color, animation, or a device mockup.
- Descriptive alternative text for product screens; decorative frame art gets empty alt text.
- Captions and transcripts for all product video.
- Form labels, errors, status, and success messages announced correctly.
- No health-related prompt or questionnaire should be mistaken for medical advice.

### Interactive product showcase

The current button row should evolve into either:

- a WAI-ARIA tabs pattern with arrow-key behavior and stable panels; or
- a stacked disclosure/accordion on narrow screens and tabs at wider breakpoints.

Do not auto-cycle tabs. Preserve the currently selected panel through hydration and avoid content layout jumps.

### Responsive layout

- **Small phones:** single-column story, full-width copy, one readable screen, sticky CTA only if it does not obscure content.
- **Large phones/tablets:** screenshot beside short proof copy where it remains readable.
- **Desktop:** alternating editorial grid with a maximum readable text measure; avoid stretching the current `max-w-5xl` into a wall of copy.
- **Very wide screens:** constrain the narrative canvas; decorative context line can use the extra gutter.
- **Print:** named briefs use a separate invariant layout and do not inherit responsive public navigation.

### Quality gates

Target:

- WCAG 2.2 AA on critical flows;
- automated axe checks plus manual keyboard and VoiceOver pass;
- no horizontal overflow at 320 px;
- 200% browser zoom without loss of function;
- reduced-motion screenshot test;
- light and dark preference snapshots.

## 10. Trust, evidence, and provenance content operations

### One release manifest

The website should consume or be updated from a small, reviewed release manifest rather than copying status across pages:

```ts
type ProductRelease = {
  version: string;
  releasedOn: string;
  stage: "internal-beta" | "closed-beta" | "public-beta";
  platforms: Array<"ios" | "android">;
  model: { id: string; onDeviceValidated: boolean };
  drugDataset: { records: number; sourceDates: string[]; reviewStatus: string };
  interactions: { pairs: number; coverageNote: string };
  sharingProtocol: string;
  knownLimitations: string[];
};
```

It can start as hand-reviewed TypeScript. Automation can follow after release practice stabilizes.

### Visible provenance

On the evidence page, show:

- dataset names and release dates;
- coverage boundaries;
- whether wording is source text, mechanically normalized, or AI-condensed;
- human-review status;
- last product build used for verification;
- evaluation links and known failure examples summarized without exposing patient data.

### Content freshness

- Every trust/evidence page displays **Last verified**.
- Claims older than a defined window (for example, 90 days or one app release) enter a review queue.
- A launch checklist compares website status against app and model release notes.
- Roadmap sections use dates only when there is a real delivery commitment; otherwise use ordered stages.

## 11. Product demo and media asset plan

### Existing asset inventory to reuse

The repository already includes screens for:

- onboarding and home;
- visits, visit detail, transcript, timeline, and summary;
- appointment capture and summary;
- medication list/detail;
- chat, suggestions, and response;
- emergency record;
- settings.

Audit each image before reuse for build freshness, real personal data, contrast, status-bar details, and whether the UI shown is still shipped.

### Required synthetic demo profile

Create one clearly fictional, consistent profile used across every screenshot and video. Define:

- a non-real name and avatar;
- 2–3 common conditions;
- 3–4 medications selected for safe demonstration;
- one fictional visit and follow-up;
- one caregiver relationship;
- one time-critical medication with a clearly fictional source-confirmed schedule/window that does
  not imply Medscribe supplied dosing advice.

Have a product/safety reviewer approve the scenario. Never use a founder family member's real medical details as demo data.

### Shot list

1. Home with record status and next action.
2. Portal screenshot import → OCR/result review.
3. Visit summary with source/review state.
4. Medication label scan → editable extracted fields.
5. Medication detail with bundled-fact source label.
6. Question answered with deterministic facts and pharmacist deferral.
7. Know Me view with time-critical schedule, source, confirmation, and freshness warning.
8. Caregiver QR pairing and safety number.
9. Manual encrypted export/import confirmation.
10. Settings/privacy boundaries and model status.

### Media formats

- **Hero:** optimized AVIF/WebP stills with responsive sizes; do not make video the LCP dependency.
- **Workflow demos:** short muted MP4/WebM loops, each 6–12 seconds, with still fallback and text equivalent.
- **Full demo:** optional 30–45 second user-controlled video, captions, transcript, chapter links.
- **Architecture/provenance diagrams:** semantic SVG or HTML/CSS, not raster text.
- **Open Graph:** 1200×630 image with no patient-like details and a stable product claim.

### Capture protocol

Record app version, OS/device, capture date, demo-profile version, and screen route for every asset. Store that metadata next to the asset manifest. Re-capture when a visible flow materially changes.

## 12. SEO, analytics, and website privacy

### Search strategy

Prioritize high-intent, non-diagnostic themes:

- patient-owned medical record;
- caregiver medication organizer;
- organize medical visits and medications;
- private on-device medical companion;
- medical handoff information for caregivers;
- portable care context across providers.

Do not chase condition-specific advice queries or publish generated drug/diagnosis SEO pages. That creates a medical-content review burden and confuses the product boundary.

### Technical SEO

- Unique title, description, canonical URL, and social image per public route.
- `sitemap.xml` includes public routes only.
- `robots.txt` and `X-Robots-Tag` exclude login, auth, named briefs, print views, and retired internal routes.
- Add organization and software application structured data only for fields that are verifiably true; do not add review ratings or availability claims without evidence.
- Give screenshot images useful dimensions and context; product screenshots do not need to be indexed independently.
- Use internal links around the central “portable context” concept rather than duplicating keyword blocks.

### Analytics posture

Umami can remain optional, but “privacy-friendly” is not a complete disclosure. Decide and document:

- hosted versus self-hosted;
- fields collected;
- IP handling;
- cookie behavior;
- retention;
- processor location;
- whether Do Not Track or Global Privacy Control is honored.

Recommended public event taxonomy:

- `beta_cta_clicked` with placement only;
- `how_it_works_viewed`;
- `privacy_detail_opened`;
- `evidence_method_opened`;
- `demo_started`, `demo_completed`;
- `partner_path_selected` with generic audience only.

Never collect:

- form free text in analytics;
- medication, condition, or caregiver details;
- email addresses or URL query values;
- named-partner brief paths in third-party analytics;
- product screenshots containing real data.

Prefer aggregate conversion and page-sequence analysis. Do not add session replay, heatmaps, ad pixels, or cross-site retargeting to a health-related site.

### Web security baseline

Before public launch, add and verify:

- Content Security Policy compatible with the chosen analytics/media hosts;
- HSTS at the hosting layer;
- `Referrer-Policy`, `Permissions-Policy`, and anti-sniffing headers;
- rate limiting and generic errors on auth/contact endpoints;
- route-specific protection for named briefs;
- no secrets or partner names in client analytics payloads;
- dependency and deployed-header review.

## 13. Concrete implementation guidance for this codebase

### Route and layout boundaries

After the existing working changes are settled:

```text
src/app/
├── (public)/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── how-it-works/page.tsx
│   ├── caregivers/page.tsx
│   ├── emergency/page.tsx
│   ├── privacy/page.tsx
│   ├── evidence/page.tsx
│   ├── beta/page.tsx
│   ├── about/page.tsx
│   └── partners/...
├── (briefs)/briefs/
│   ├── layout.tsx
│   ├── northwell/page.tsx
│   ├── cvs/page.tsx
│   └── walgreens/page.tsx
├── login/page.tsx
└── api/auth/route.ts
```

Route-group names do not affect URLs. Use separate layouts so briefs do not mount the public background, navigation, footer, or analytics by accident.

### Component reuse

- **`PhoneMockup`:** retain for static product proof; add responsive image sizing and a simpler frame option so not every screen pays for an interactive client dependency.
- **`FeatureShowcase`:** reuse its typed content model and screenshot set; refactor interaction to accessible tabs/disclosures and include status/source annotations.
- **`SiteHeader`:** evolve from a centered “Executive summary” capsule to public navigation, beta CTA, mobile menu, and active-route state.
- **`SiteFooter`:** add product/trust/company/legal columns, beta status, security/accessibility contact, and verified corporate copy.
- **`ScreenBackground`:** keep as a subtle base; create the context-thread visual as a separate progressive-enhancement component.
- **`SectionLabel`, `Card`, `Badge`, `Button`:** preserve the primitives, audit focus and contrast, and introduce variants only when a page need repeats.
- **`lib/beta.ts`:** keep shared stage/CTA copy, but replace broad “everything” statements with a release-manifest-backed boundary.
- **`UmamiAnalytics`:** mount in the public layout after policy is settled; omit from briefs/auth or explicitly filter them.

### Content architecture

Move long marketing strings out of route components into reviewed content modules:

```text
src/content/
├── product-release.ts
├── claims.ts
├── home.ts
├── privacy.ts
├── evidence.ts
└── partners/
    ├── health-systems.ts
    ├── pharmacies.ts
    ├── cvs.ts
    └── walgreens.ts
```

Keep public product truth and account-specific sales hypotheses separate. A partner name should never be interpolated into a generic claim if the underlying business model differs, as the current CVS/Walgreens distinction correctly demonstrates.

### Print architecture

The current CVS and Walgreens components duplicate a common print frame and similar product page. That is an appropriate future refactor, but only after pixel baselines exist.

Recommended sequence:

1. Render and archive current PDFs and page PNGs as baselines.
2. Extract only the page frame/header/footer to `components/briefs/print-page.tsx`.
3. Move partner-specific claims to typed content modules.
4. Extract shared capability blocks without forcing identical partner payoff logic.
5. Keep print CSS in a dedicated `briefs-print.css` imported only by the briefs layout if Next/Tailwind output remains stable.
6. Compare generated PDFs for page count, clipping, fonts, backgrounds, and URL/footer artifacts.

Do not rename or reinterpret the existing `northwell-print-*` classes as part of the public homepage work. The names are inelegant but harmless; page stability matters more.

### Rendering and performance

- Keep most pages as React Server Components.
- Isolate interactive showcase, media player, and mobile navigation as small client islands.
- Avoid shipping all screenshots or partner content in the root bundle.
- Use route-level metadata and static generation.
- Set explicit image sizes and `sizes`; prioritize only the true hero image.
- Lazy-load below-the-fold video and device-mockup code.
- Subset fonts and verify the two Google font families do not block first render; consider self-hosted or system fallbacks if deployment policy requires no runtime third-party font calls.

Performance targets on a representative mobile connection:

- Core Web Vitals in the “good” range;
- LCP under 2.5 seconds at the 75th percentile;
- CLS under 0.1;
- INP under 200 ms;
- initial JavaScript kept low enough that the text narrative works before hydration.

### Testing

Add:

- content/claim registry validation;
- component tests for status labels and route-specific copy;
- accessibility tests for navigation, tabs, form, and video controls;
- Playwright smoke tests for every public route;
- screenshot baselines at mobile/tablet/desktop, light/dark, and reduced motion;
- PDF render tests for Northwell/CVS/Walgreens page counts and clipping;
- sitemap/robots tests proving named briefs are excluded;
- analytics tests proving no form values or partner paths are sent.

## 14. Phased implementation backlog

### Phase 0 — Establish product truth and protect existing work

**Outcome:** the site has an approved factual foundation and print baselines before restructuring.

Tasks:

- Resolve and land or explicitly preserve the current uncommitted web changes.
- Render current Northwell, CVS, and Walgreens PDFs and screenshots as baselines.
- Reconcile product claims with the current app/model release.
- Create the typed product-release and claim registries.
- Decide beta distribution wording, company identity, analytics policy, security contact, and named-brief access policy.
- Inventory screenshots and mark keep/recapture/retire.

Acceptance criteria:

- Every homepage-level claim has an owner, evidence/status, and verification date.
- Current print artifacts are reproducible with documented commands and match approved baselines.
- No public copy claims app-level at-rest encryption, complete accuracy, FDA review/approval, FHIR/Epic integration, full Signal protocol, clinical efficacy, or production readiness.
- Named briefs have an agreed public/private distribution rule.

Dependencies:

- App security/release audit status.
- Current model promotion/device-validation status.
- Human review status for bundled drug-info condensation.
- Founder/legal decision on public company and policy copy.

### Phase 1 — Public foundation and homepage

**Outcome:** `/` becomes a strong consumer product narrative while partner print flows remain unchanged.

Tasks:

- Introduce public and briefs layouts without moving named URLs yet.
- Build public header/footer/navigation and skip link.
- Implement the editorial homepage, record-thread sequence, accessible product showcase, privacy strip, and beta CTA.
- Replace homepage-specific Northwell rendering with a dedicated brief route while retaining a compatibility path.
- Add route metadata, social image, sitemap, and robots policy.
- Add initial responsive/accessibility/performance tests.

Acceptance criteria:

- A first-time visitor can state what Medscribe does, who it is for, what is local, and how to request access after a two-minute moderated review.
- Homepage contains no named-account pitch or proposed integration presented as current.
- All content and CTAs work at 320 px, keyboard-only, VoiceOver, 200% zoom, dark preference, and reduced motion.
- Existing print PDFs remain visually equivalent and retain page counts.
- Mobile LCP is not dependent on video or a large client bundle.

### Phase 2 — Product and scenario depth

**Outcome:** users can understand the full workflow without making the homepage encyclopedic.

Tasks:

- Build `/how-it-works`, `/caregivers`, and `/emergency`.
- Capture the approved synthetic demo-profile screenshots.
- Add short workflow clips with still fallbacks, captions, and transcripts.
- Build `/beta` with email CTA or a privacy-reviewed minimal form.
- Build `/about`.

Acceptance criteria:

- Current versus roadmap behavior is visible on every relevant module.
- Caregiver content accurately describes manual pairwise export and revocation limits.
- Emergency content does not imply lock-screen access, clinical validation, or guaranteed prevention.
- No demo asset contains real personal/health data.
- Beta intake collects no health details and provides stage/safety expectations.

Dependencies:

- Synthetic demo profile and content approval.
- Current app build available for consistent captures.
- Decision on beta intake backend and policy.

### Phase 3 — Trust and evidence center

**Outcome:** privacy/security and model claims are inspectable rather than ornamental.

Tasks:

- Build `/privacy` data map and limitations.
- Build `/evidence` release status, datasets, evaluations, and review state.
- Add last-verified dates and content-freshness checks.
- Publish legal privacy/terms/support pages after review.
- Add security headers and incident/security contact workflow.

Acceptance criteria:

- A privacy reviewer can identify every current runtime network path and storage boundary from the site.
- All quantitative results name the model/build, test set, metric, platform, and date.
- Drug data source and human-review status are explicit.
- Legal and architecture explanations are clearly distinct.
- Stale product evidence is detected before deployment.

Dependencies:

- Security hardening and threat-model review.
- Physical-device model results.
- Drug-info human review.
- Legal/privacy counsel.

### Phase 4 — Partner framework

**Outcome:** generic partner paths and named briefs share accurate primitives without sharing unsupported conclusions.

Tasks:

- Build `/partners`, `/partners/health-systems`, and `/partners/pharmacies`.
- Add route-specific protection/noindex for named briefs.
- Migrate or alias Northwell/CVS/Walgreens into the briefs layout.
- After baselines, extract shared print frame and typed account content.
- Replace outcome assertions with measurable pilot hypotheses unless evidence exists.
- Create a one-page security/architecture diligence download tied to the evidence release.

Acceptance criteria:

- Public partner pages contain no customer logos or implied partnerships without permission.
- Named briefs are absent from sitemap, public nav, public analytics, and search indexing.
- FHIR/Epic, co-branding, refill routing, and reporting are labeled proposed/roadmap.
- Every pilot page distinguishes product capabilities, partner work, dependencies, and outcome hypotheses.
- All three PDFs pass regression tests.

Dependencies:

- Partner-distribution decision.
- Counsel review of outcome/compliance claims.
- Product decision on the primary 90-day commercial motion.

### Phase 5 — Enrichment and learning loop

**Outcome:** richer media and analytics improve comprehension without compromising privacy or performance.

Tasks:

- Add the optional full product demo and architecture animation.
- Instrument the minimal aggregate event taxonomy.
- Run five patient/caregiver comprehension sessions and three partner-evaluator sessions.
- Test hero/headline and beta-flow comprehension, not medical fear.
- Publish a lightweight release/evidence changelog.
- Tune performance and accessibility from real monitoring.

Acceptance criteria:

- No analytics event includes free text, email, medical content, or named-brief paths.
- Demo is user-controlled, captioned, transcribed, reduced-motion safe, and not LCP-critical.
- Research participants can correctly explain the app's limits as well as its value.
- Changes are driven by observed confusion/conversion, not page decoration.

## 15. Priorities: now, next, later

### Now

1. Freeze factual copy into a reviewed claim registry.
2. Capture print baselines and protect named briefs.
3. Replace the Northwell root with the consumer narrative.
4. Reuse the product showcase and screenshot library to tell one continuous record story.
5. State beta, sharing, AI, network, storage, and integration boundaries precisely.

### Next

1. Add the workflow, caregiver, emergency, beta, privacy, and evidence pages.
2. Recapture a consistent synthetic profile.
3. Add route-specific partner protection and noindex behavior.
4. Build generic health-system and pharmacy pilot pages.

### Later

1. Refactor duplicated brief interiors after visual regression infrastructure exists.
2. Add richer video/motion after the still narrative performs well.
3. Add research/press resources when there is verified beta evidence to publish.
4. Add FHIR or live-sharing material only when those product capabilities actually exist.

## 16. What not to build yet

- A condition/drug content farm.
- A public competitor comparison matrix with brittle superiority claims.
- A diagnostic chatbot demo on the marketing site.
- Personalized ROI calculators based on unvalidated adherence or utilization assumptions.
- A portal-login/FHIR simulation that looks like a current integration.
- A live patient-record demo or website account system.
- Heavy 3D device scenes, autoplay hero video, or scroll-jacked storytelling.
- A CMS before content ownership and release verification have become genuine bottlenecks.
- A single white-label template that flattens material differences between a health system, an integrated payer/pharmacy, and a pharmacy without an owned plan.

## 17. Definition of a successful richer site

The richer website succeeds if it produces clarity, not merely visual density:

- A caregiver sees their own weekly coordination problem before reading about AI.
- A patient understands how daily use can keep one record more current.
- A technical reviewer can map each sensitive task to its actual data boundary.
- A partner evaluator can distinguish what is built, what a pilot would test, and what requires integration.
- A beta participant knows that generated output requires review and is not medical advice.
- No visitor leaves believing Medscribe currently has app-level at-rest encryption, universal drug/interactions coverage, FDA review, FHIR/Epic integration, automatic caregiver sync, full Signal protocol, measured clinical outcomes, or production readiness.
- Northwell, CVS, and Walgreens print artifacts continue to work exactly as designed.

That combination—human recognition, real product proof, and unusually exact limits—is a stronger expression of Medscribe's product thesis than a conventional “private medical AI” landing page.

### Pendant presentation refinement

The device hero layers the smaller pendant in front of the larger companion.
Product links below lead to each design; the pendant section is a static
marketing story without preview controls. The R8 case and threaded cord use
actual SD-app captures. Geometry checks cover cord clearance from the shell,
back, clip, and side buttons; physical wearable validation remains outstanding.
