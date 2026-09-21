# Direct contact submissions

The live Site saves enquiries in its private D1 database. Open **Sites Settings → Database → DB → contact_messages** to review the name, reply email, company, enquiry type, optional details, message and timestamp. The `created_at` value is a Unix timestamp in milliseconds. You can also ask Codex to retrieve the latest submissions from this Site.

Messages are stored on the Site. They are **not emailed** automatically. The existing direct email link remains available. No message-reading endpoint is exposed to visitors.

## Downloaded copy

`OPEN-PORTFOLIO.html` and the standalone HTML are portable visual copies. When opened as local files, the form prepares an addressed email draft. The visitor must send it in their email app. A static host alone cannot run the direct submission endpoint.

The ZIP also includes the complete contact backend in `backend/`:

1. Inside `backend/`, create a `web/` folder.
2. Copy the ZIP's editable `index.html`, versioned CSS/JS files, and `assets/` folder into `backend/web/`. Keep their filenames; the editable HTML already references them.
3. Run `npm ci`, `npm test`, then `npm run build` from `backend/`.
4. Deploy with Sites, registering a new project if deploying separately. The included manifest declares the logical `DB` binding; it deliberately contains no existing project identity. Sites provisions the database and applies the included Drizzle migration before deploying.

For this existing Site's source checkout, authored frontend files are already in `web/`. `scripts/build.mjs` copies them into `dist/client/`, copies the Worker modules into `dist/server/`, and stages hosting metadata and migrations. The Worker entrypoint exports a default `fetch` handler and uses the platform's `ASSETS` binding for frontend files.

## Behaviour and validation

The client adapts optional fields to the enquiry type, validates required fields, and keeps entered text when submission fails. A pending state disables duplicate clicks; a 15-second timeout allows retry. A stable UUID per payload prevents duplicate storage if a response is lost. Success is displayed only after the server confirms the matching saved ID.

The API accepts only bounded JSON POST requests, checks browser origins, validates every value server-side, and uses prepared statements. It rejects populated honeypots and permits up to five submissions per email per hour. This is basic abuse protection, not a CAPTCHA service. Schema migrations are generated with Drizzle; runtime code does not create tables. Message contents are not printed to server logs. No browser storage is used for submissions.

`tests/contact.test.mjs` exercises the endpoint against the actual migration in an in-memory SQLite database, including input validation, SQL text safety, duplicate retries, rate limits, cross-origin rejection and unavailable storage. It never submits test messages to the live Site.

Runtime API references: [Cloudflare asset bindings](https://developers.cloudflare.com/workers/static-assets/binding/) and [D1 prepared statements](https://developers.cloudflare.com/d1/worker-api/prepared-statements/).
