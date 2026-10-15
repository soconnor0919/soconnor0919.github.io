# Real app promotional captures

These assets come from the actual Expo Medscribe app, running on the dedicated
**Medscribe Website Preview** iPhone 17 Pro simulator, iOS 27.0 (24A434).
They show a six-appointment Visits list and working in-app audio playback with timestamp seeking.
The marketing website uses still screenshots only; it has no audio player.
No HTML recreation or image generation is used. `compose.py` places untouched
1206 × 2622 simulator screenshots inside the site's existing photographic bezel.
The exact display alpha and Dynamic Island geometry come from an actual
`simctl io ... screenshot --mask=alpha` capture, stored under `assets/`.
This preserves the native corners and cutout without a hand-drawn mask.

Transcripts contain plain speech and timestamps, without speaker labels.

The appointment is a fictional knee pain follow-up, voiced locally by macOS
Samantha and Daniel. Its transcript is a matching script fixture, not an ASR
benchmark. No patient information is used. Consent is timestamped 25 seconds
before recording begins; the audio starts with the clinical conversation.
A physical companion transfer is not claimed or verified by this fixture.

## Reproduce

1. Build the Expo development client using `app/AGENTS.md`. Use a dedicated,
   empty simulator named exactly `Medscribe Website Preview`; the seed script
   refuses any other name or a database containing non-demo appointments.
2. For Xcode 27, run `python3 web/scripts/phone-preview/prepare-ios-preview.py`
   after Expo prebuild. It adds scene-owned windows to **generated, ignored**
   iOS files so the older app delegate template launches on iOS 27. This is
   preview compatibility work, not a complete production lifecycle migration.
3. Start Metro locally on port 8081, launch the client once to initialize SQLite,
   then terminate it before running:

   ```sh
   python3 web/scripts/phone-preview/prepare-demo.py
   python3 web/scripts/phone-preview/seed-demo.py --simulator YOUR_PREVIEW_UUID
   ```

4. Launch the app, open `medscribe://appointments` for `imported.png`, and open
   `medscribe://appointment/companion-demo-appointment?tab=transcript` for
   `playback.png`. Tap a transcript timestamp to start actual playback. Capture
   both light and dark appearance using the app's Settings, naming dark files
   `imported-dark.png` and `playback-dark.png`. Store raw captures in
   `web/device-cad/build/phone-demo`. Dismiss development overlays before capture.
5. Run `compose.py` with Pillow installed. It writes the four stills and
   provenance to `public/device/phone-appointment-v5/`. Keep the local WAV for
   the app demo only; do not publish an audio sample or transcript text to the
   website. Native display-mask assets must match the simulator model and size.

## Local Xcode 27 build notes

The preview build required an existing Node path in ignored `ios/.xcode.env.local`,
`IPHONEOS_DEPLOYMENT_TARGET=17.0`, `ENABLE_USER_SCRIPT_SANDBOXING=NO` for CocoaPods
resource generation, and an explicit `if/else` instead of a ternary C callback
in the local `expo-modules-jsi` `JavaScriptRuntime.swift`. No dependency cache is
committed. The debug build used `CODE_SIGNING_ALLOWED=NO`; its notification
Keychain warning was dismissed for captures. No notification behavior is claimed.
The scene compatibility source is retained here to reproduce the local preview.

If Expo's local Metro binds only IPv6 while emitting IPv4 URLs, use a local-only
IPv4-to-IPv6 port bridge or correct Metro binding. Do not expose this demo or its
fixture seeding tools on the network.

## Matching Know Me captures

Terminate only the dedicated preview app and run `seed-know-me.py` to add the
fictional Alex Morgan card and two inhalers matching the SD fixture. The script
checks the preview simulator name and refuses unrelated appointments or medications;
it backs up SQLite before mutation. Schedule values are authored fixture data,
not inferred medical guidance. Open `medscribe://emergency-record`, dismiss
local development overlays, and capture `know-me.png` and `know-me-dark.png` into
`device-cad/build/phone-demo` in the matching app appearances. Run
`compose-know-me.py` for the two `public/device/phone-know-me-v1/` framed stills.
The record is scrollable in the app; the website shows a still of its top portion.
