EKJOT SINGH — PORTFOLIO V9, DYNAMIC CONTACT

OPEN IT
Extract this ZIP into a NEW folder. Double-click OPEN-PORTFOLIO.html.
Styles, scripts, portrait, fonts, resume and all five screenshots are included.
Carousel, gallery, project details and screenshot inspection work offline. External
project links require internet. The downloaded copy prepares an email draft;
the hosted Site receives messages directly.
The browser tab says 'Portfolio V9 — Dynamic Contact' to identify it.

EDIT IT
Edit index.html, portfolio-v9.css and portfolio-v9.js.
Serve this folder over HTTP (for example: python3 -m http.server 8080),
then visit http://localhost:8080/index.html. HTTP avoids local-file mask restrictions.
Upload index.html, both CSS/JS files and assets/ to a static host for the visual
site. To enable direct form submissions, deploy the included Worker and D1 schema
as described in BACKEND.md. Static hosting alone cannot save messages.
OPEN-PORTFOLIO.html is a standalone snapshot; editing the separate files does
not change it automatically. Use index.html to view your edits.

WHAT CHANGED
The About portrait now fits within its frame on desktop, tablet and mobile;
its full turban stays visible. The photo and alpha mask are unchanged.
ET AI Awards uses the new full-HD screenshot supplied on 21 September.
The form adapts for a role, a project or a general enquiry, with optional
context, progress feedback, inline validation, a character counter and recovery
on errors. The live Site saves messages to its private database with a
confirmation reference. Email notifications are not enabled.

SOUND
Every page load starts with sound enabled at 100% site volume. A welcome tone
plays automatically when permitted; otherwise the first click, tap or Enter/Space
unlocks playback. A pending autoplay request never blocks the rest of the page.
Browsers control autoplay and visitors control their device volume. Hover, clicks,
project navigation, form focus, carousel advance and headline changes have cues.
Use the speaker to mute immediately, or the adjacent settings for volume.
Mute and volume apply to this visit. A refresh starts enabled at 100% again.
Hidden tabs stop audio; returning waits for interaction to resume a suspended
context. Short tone envelopes and a compressor prevent overlapping peaks clipping.
There are no third-party audio services or external sound files.

CONTENT
The portrait PNG is a byte-for-byte copy of your supplied high-quality image.
CSS applies the existing alpha-only mask in the hero and a crop in the header.
All screenshot PNGs are unchanged full-HD copies. The original portrait pixels
also remain unchanged. Asset provenance and exact dimensions are documented in
assets/PROJECT-IMAGE-SOURCES.md. Earlier unused images are excluded from this ZIP.
No screens, outcomes or performance metrics have been fabricated.

CONTACT
The downloaded file uses an email-draft fallback and never claims it sent a
message. The hosted Site stores messages in contact_messages (DB), visible to
the owner in Sites Settings > Database. There is no public read API and no
email service is configured. Direct email and copy-email links remain available.
The API validates and bounds input, uses prepared SQL, rejects cross-origin
browser submissions, limits each email to five messages per hour, and reuses
request IDs for safe retries. Messages are not stored in browser storage.
