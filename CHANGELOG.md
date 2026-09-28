# Changelog

All notable changes to NoteFlare are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.4] - 2026-09-27

### Added
- **Authentic Release Archives & SHA-256 Checksums**: Every release now packages official convenience archives (`obsidian-noteflare-<version>.zip` and `noteflare-<version>.zip`) along with cryptographic SHA-256 checksum files (`.sha256`), providing end-to-end tamper protection and integrity verification.
- **In-Plugin Release Browser & Downloads**: Added an interactive version switcher to the What's New dialog, allowing users to browse changelogs of past versions, download any release `.zip` directly, and view/copy its verified SHA-256 checksum with 1-click.
- **Rollback & Manual Installation Guide**: Included built-in step-by-step instructions for extracting archives into `.obsidian/plugins/noteflare/` and reloading plugins, enabling easy version rollbacks.
- **Settings Release Access**: Added a dedicated **Release history & older versions** setting in the Feedback & Support section for quick access to release archives and checksums.

### Fixed
- Added Git ref fast-forward conflict retry handling during multi-file publish.
- Hardened mirror-sync deletions logging to prevent silent deletions failures.
- Augmented internal `GitHubRelease` and `GitHubReleaseAsset` interfaces with comprehensive asset parsing and offline embedded fallbacks.

### Security
- Integrated automated Sigstore build provenance (`actions/attest-build-provenance@v2`) across release pipelines.

---

**How to Update:** Install from Obsidian Community Plugins or download `obsidian-noteflare-1.2.4.zip` from GitHub Releases.

No breaking changes.

---

## [1.2.3] - 2026-09-02

### Changed
- **Modern Support & Community Card**: Redesigned the Feedback & Support settings section with a modern card UI featuring pill buttons for Ko-fi ("Support the project"), GitHub Sponsors, and Star on GitHub, along with quick links for feedback, feature requests, GitHub issues, and changelog.
- **Enhanced Changelog Experience**: Upgraded the What's New dialog to render rich formatted Markdown notes (headings, styled bullet points, badges) instead of raw text.
- **Reliable Update Notes**: Added an embedded changelog fallback to guarantee release notes display smoothly on every plugin update, even if the GitHub API is offline or rate-limited.
- **View Changelog Command**: Added `NoteFlare: View changelog` to the Obsidian Command Palette (`Ctrl/Cmd+P`) and a direct link inside the settings card.

### Fixed
- Fixed `@typescript-eslint/no-unsafe-*` warnings across secret storage and frontmatter transformer modules.
- Implemented `getSettingDefinitions()` on `NoteFlareSettingsTab` to comply with Obsidian 1.13+ declarative settings requirements while maintaining backward compatibility.

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.2.2] - 2026-09-02

### Fixed
- Fixed Setup Wizard not starting on Obsidian 1.13.0+ (resolves #5). Removed conflicting declarative settings definition override so Obsidian 1.13+ properly executes the imperative `display()` method.
- Fixed secure token persistence across app restarts by integrating Obsidian's native `secretStorage` API with graceful fallback.

### Changed
- Added `NoteFlare: Open setup wizard` command to the Obsidian Command Palette (`Ctrl/Cmd+P`).
- Setup Wizard now launches automatically on initial install/activation if setup is not yet completed.
- Updated README branding to use the official product logo SVG (`public/logo/logo.svg`).

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.2.1] - 2026-08-17

### Security
- Replaced dynamic external Ko-fi script loading and `innerHTML` with native Obsidian DOM helpers (`createEl`), ensuring full compliance with Obsidian Community Plugin security policies.
- Fixed CSS linting warning by removing `!important` and using CSS selector specificity for button styles.
- Removed unused imports and parameters (`RegistryEntry`, `_hostingProvider`).

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.2.0] - 2026-08-16

### Added
- "Send feedback", "Request a feature", and "Report a bug" actions in Options → Feedback, each opening a web-based form on geekstash.dev in the browser
- "What's New" dialog shown automatically after an update, pulling that version's release notes straight from the GitHub Releases API and offering a one-click feedback shortcut
- Uninstall prompt (shown when the plugin is disabled or removed) offering an optional "tell us why" web form — skippable, no data collected in-app
- Ko-fi support widget embedded in the What's New dialog, with a linked fallback button if the embedded script can't load; Ko-fi added alongside GitHub Sponsors as a funding link, plus a Support section in the README

### Changed
- CI now extracts the release title and body straight from the matching `CHANGELOG.md` entry when publishing a GitHub Release, instead of GitHub's auto-generated commit summary — the release page and the changelog can no longer drift apart

### Security
- Feedback, feature-request, bug-report, and uninstall forms all live on geekstash.dev — NoteFlare itself never calls `api.geekstash.dev` or embeds a Turnstile widget, so no backend submission code or challenge keys ship inside the plugin

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.1.3] - 2026-07-20

### Changed
- Setup is simpler now that Cloudflare Pages is the only hosting option
- Removing a site now warns you if anything needs manual cleanup on Cloudflare

### Fixed
- Fixed new sites sometimes being set up with the wrong hosting type
- Fixed site status not loading correctly for some sites
- Fixed some sites losing their saved connection info after reinstalling the plugin
- Fixed a leftover setting that could show incorrect hosting information

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.1.2] - 2026-07-19

### Changed
- Settings screen is easier to read, with clearer groupings for related options
- Restoring a previously configured site now works more reliably

### Fixed
- Fixed an issue that could show incorrect information while restoring a site's settings

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.1.1] - 2026-07-19

### Added
- Redesigned setup wizard walks you through choosing a host and setting up your site
- Previously published sites are restored automatically when you reinstall the plugin
- New live status view shows whether your site is published and up to date

### Changed
- Editing publishing rules and deleting or unpublishing a site is clearer and safer
- Unpublishing a site now just takes it offline instead of deleting your content
- More reliable handling of publish failures, with clearer messages when something goes wrong

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.

---

## [1.0.0] - 2026-07-05

### Added
- Publish your whole vault, a folder, or a single note as a free public website
- Automatic private backup keeps a safe copy of your vault after edits or on a schedule
- Guided setup walks you through connecting your accounts and choosing what to publish

---

**How to Update:** Install from Obsidian Community Plugins.

No breaking changes.
