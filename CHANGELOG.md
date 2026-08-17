# Changelog

All notable changes to NoteFlare are documented here.

## [1.2.1] - 2026-08-17

### Security & Compliance
- Replaced dynamic external Ko-fi script loading and `innerHTML` with native Obsidian DOM helpers (`createEl`), ensuring full compliance with Obsidian Community Plugin security policies.
- Fixed CSS linting warning by removing `!important` and using CSS selector specificity for button styles.
- Removed unused imports and parameters (`RegistryEntry`, `_hostingProvider`).

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.2.0] - 2026-08-16

### Features
- "Send feedback", "Request a feature", and "Report a bug" actions in Options → Feedback, each opening a web-based form on geekstash.dev in the browser
- "What's New" dialog shown automatically after an update, pulling that version's release notes straight from the GitHub Releases API and offering a one-click feedback shortcut
- Uninstall prompt (shown when the plugin is disabled or removed) offering an optional "tell us why" web form — skippable, no data collected in-app
- Ko-fi support widget embedded in the What's New dialog, with a linked fallback button if the embedded script can't load; Ko-fi added alongside GitHub Sponsors as a funding link, plus a Support section in the README

### Improvements
- CI now extracts the release title and body straight from the matching `CHANGELOG.md` entry when publishing a GitHub Release, instead of GitHub's auto-generated commit summary — the release page and the changelog can no longer drift apart

### Security
- Feedback, feature-request, bug-report, and uninstall forms all live on geekstash.dev — NoteFlare itself never calls `api.geekstash.dev` or embeds a Turnstile widget, so no backend submission code or challenge keys ship inside the plugin

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.1.3] - 2026-07-20

### Improvements
- Setup is simpler now that Cloudflare Pages is the only hosting option
- Removing a site now warns you if anything needs manual cleanup on Cloudflare

### Fixes
- Fixed new sites sometimes being set up with the wrong hosting type
- Fixed site status not loading correctly for some sites
- Fixed some sites losing their saved connection info after reinstalling the plugin
- Fixed a leftover setting that could show incorrect hosting information

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.1.2] - 2026-07-19

### Improvements
- Settings screen is easier to read, with clearer groupings for related options
- Restoring a previously configured site now works more reliably

### Fixes
- Fixed an issue that could show incorrect information while restoring a site's settings

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.1.1] - 2026-07-19

### Features
- Redesigned setup wizard walks you through choosing a host and setting up your site
- Previously published sites are restored automatically when you reinstall the plugin
- New live status view shows whether your site is published and up to date

### Improvements
- Editing publishing rules and deleting or unpublishing a site is clearer and safer
- Unpublishing a site now just takes it offline instead of deleting your content
- More reliable handling of publish failures, with clearer messages when something goes wrong

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.0.0] - 2026-07-05

### Features
- Publish your whole vault, a folder, or a single note as a free public website
- Automatic private backup keeps a safe copy of your vault after edits or on a schedule
- Guided setup walks you through connecting your accounts and choosing what to publish

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.
