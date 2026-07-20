# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

NoteFlare is an Obsidian **desktop** plugin that does two related things for a user's vault, from inside Obsidian with no git/terminal/backend:

1. **Publish** — turns the vault (or a folder / single page) into a free website. It creates a GitHub repo in the user's account, uploads transformed notes plus a tiny build manifest, and the site is built and served by **Cloudflare Pages**. GitHub is used only as a content store; Cloudflare Pages performs the actual build and hosts the public site.
2. **Backup** — mirrors the whole vault (or one folder) to separate private storage automatically after edits and/or on a user-selected schedule. Backup is intentionally one-way and local-authoritative; there is no changes list, branch control, pull, conflict, or manual commit workflow.

The site is built by **mdgarden**, NoteFlare's own lightweight static-site generator — a separate open-source npm package developed in its own repo (see the "mdgarden is the build engine" section). The build host runs `npx mdgarden build`. mdgarden replaced an earlier `mdsite` package, which itself replaced a Quartz template fork (the source of the old v4/v5 branch + `.quartz/plugins` build failures). **If you find any `mdsite` or `quartz` reference in the source, it is stale — the engine is `mdgarden`.**

This repo lives _inside a real Obsidian vault_ at `.obsidian/plugins/obsidian-noteflare/`. Obsidian loads the built `main.js` + `manifest.json` + `styles.css` directly from this folder, so the build output is committed/present alongside the source.

## Commands

```bash
npm install            # install deps
npm run dev            # esbuild watch — rebuilds main.js in place (inline sourcemap)
npm run build          # `tsc -noEmit -skipLibCheck` typecheck, then production bundle to main.js
tsc -noEmit -skipLibCheck   # typecheck only (there is no separate lint step)
```

- **Tests are handled via Jest.** Run `npm test` to execute unit tests.
- **Never hand-edit `main.js`** — it's the bundled esbuild output. Edit the `.ts` sources and rebuild.
- **To see a change in Obsidian:** rebuild, then reload the plugin (Obsidian → Settings → Community plugins → toggle NoteFlare off/on, or reload the app). esbuild's `dev` watch rebuilds `main.js` but does not reload Obsidian for you.
- Entry point is the root `main.ts` (the `Plugin` subclass); all logic lives in `src/`, organized into `api/`, `backup/`, `core/`, `publish/`, `ui/` (and `ui/settings/`).

## Source layout

```
main.ts                         orchestrator + plugin shell (Plugin subclass, commands, ribbon, settings I/O, migrateSettings)
src/core/      types.ts         all interfaces: NoteFlareSettings, SiteProfile, BackupSettings, PublishResult, BackupResult, SetupStep
               settings.ts      DEFAULT_SETTINGS, DEFAULT_BACKUP_SETTINGS, createSiteProfile()
               constants.ts     ATTACHMENT_EXTS, NODE_VERSION, MDGARDEN_VERSION, GITHUB_ACTIONS_WORKFLOW
               secureStore.ts   Electron safeStorage wrapper (encrypt/decrypt tokens)
src/api/       githubApi.ts     GitHub REST + Git Data API (fetch-based)
               cloudflareApi.ts Cloudflare Pages API (requestUrl-based — see "Two HTTP clients")
src/publish/   publisher.ts     the publish pipeline (per active SiteProfile)
               fileCollector.ts walks the vault, applies scope + exclude globs
               transformer.ts   normalizes frontmatter (no link rewriting)
               contentValidator.ts  inspectFrontmatter — preflight + auto-repair
src/backup/    backupEngine.ts  local-authoritative private backup mirror
src/ui/        noteflareView.ts focused publish panel (or backup status for backup-only setups)
               statusBar.ts     typed status-bar setters
               settings/settingsTab.ts  the 5-step setup wizard + manage panel
               settings/siteModals.ts   AddSiteModal, UnpublishModal, provisionSite(), slugify(), folderOptions(), token/hint helpers
```

## Architecture

The publish pipeline is shaped around **mdgarden conventions** — the cross-cutting fact that ties otherwise-separate files together. Changing the target static-site generator means touching these in concert:

- `githubApi.ts` creates a fresh repo in the user's account (`POST /user/repos`, `auto_init: true`) on its default branch `main` — no template fork, no branch juggling. `createRepo(privateRepo)` takes a privacy flag (backup storage is always private).
- `publisher.ts` uploads markdown to `content/` and attachments to `content/attachments/` (where mdgarden reads from), plus repo-root build files: `package.json` (depends on `mdgarden`), `mdgarden.config.json` (the build manifest), and `.node-version`.
- `transformer.ts` normalizes frontmatter via `contentValidator.ts` and strips `private`/`draft` keys. It does **not** rewrite links — mdgarden resolves Obsidian `[[wikilinks]]`/`![[embeds]]` natively.
- `cloudflareApi.ts` configures the Pages build command (`MDGARDEN_BUILD_COMMAND` = `npm ci || npm install && npx mdgarden build`) → output dir `public`, on the repo's default branch.

**Active deploy target: Cloudflare Pages only.** The plugin supports `SiteProfile.deployTarget = 'cloudflare'`. GitHub hosts the content repo; Cloudflare Pages watches it and builds on every push. After the commit, `Publisher` calls `enableDeployment` → `configureBuild` (self-heal) → `triggerDeployment`. The `'github-actions'` target exists in code but is **not the active setup** — do not guide users toward it or enable it without explicit instruction.

**Publish flow** (`Publisher.publish`, driven from `main.ts`): re-resolves the repo's real default branch (`getDefaultBranch`) so a renamed/odd branch can't desync the build → `FileCollector` walks `app.vault.getFiles()`, honoring the site's **publish scope** (`vault` / `folder` / `page`) + exclude globs (micromatch), keeping `.md` + optionally the attachment types in `constants.ts` → `Transformer` **normalizes frontmatter** (`contentValidator.inspectFrontmatter`: if a note doesn't begin with a parseable `---…---` block — e.g. a stray top-of-file `---` — it prepends a minimal valid block; vault notes are untouched, only the uploaded copy) and strips `private`/`draft` keys (so the note publishes — mdgarden otherwise skips notes carrying those flags). No link rewriting. → `Publisher` counts auto-fixed notes onto `PublishResult.fixed`/`issues` → content is base64-encoded → repo-root build files added (`package.json`, `mdgarden.config.json`, `.node-version`, plus the Actions workflow for that target) → `GitHubApi.commitFiles` uploads everything as **one commit** via the Git Data API (blobs → tree on `base_tree` → commit → fast-forward the ref), with batched blob creation + HTTP 429/secondary-rate-limit backoff, and **mirrors `content/`** (deletes existing `content/` blobs not in this publish, so removed/excluded notes disappear — skipped on partial failure; root build files live outside `content/` so they persist) → deploy-target-specific steps run. One commit per publish = exactly one build, no per-file SHA conflicts.

**Publish/unpublish is deployment toggling, not content deletion.** Unpublish flips Cloudflare `deployment_enabled: false`; the GitHub content stays put so re-publishing just re-enables it. Keep this invariant — don't make unpublish delete files. (For the github-actions target there's no API toggle; unpublish is documented as manual.)

**Backup is separate from publishing.** `BackupEngine` mirrors the selected vault content to a dedicated private repository (`settings.backup.repository`, never a publish repo). It reads binary-safe file content, compares local git-blob SHAs with the remote tree, and uploads only additions, updates, and deletions. The local vault is authoritative. `main.ts` registers vault change listeners (30-second debounce) plus a one-minute schedule checker; users control after-change backup and intervals in Settings. Existing `enableSync`/`sync` data is migrated once to `enableBackup`/`backup`.

**Two HTTP clients on purpose:** `GitHubApi` uses `fetch`; `CloudflareApi` uses Obsidian's `requestUrl`. This is deliberate — the Cloudflare API doesn't return CORS headers, so `requestUrl` is required to avoid CORS errors in the Electron renderer. Don't "standardize" Cloudflare onto `fetch`.

**Progress is a stringly-typed protocol.** `Publisher`/`GitHubApi` emit human-readable progress strings (`"Uploading 3/10..."`, `"Rate limited — 42s..."`) through an `onProgress` callback → `main.ts syncStatusFromProgress` regex-matches `Uploading n/total` and `Rate limited … Ns` → calls typed `StatusBar` methods (`setPublishing`, `setRateLimited`, `setLive`, `setMessage`, `setError`, …) in `src/ui/statusBar.ts`, which just set the status-bar text. The wording, the regex, and the StatusBar strings are three coupled ends of one protocol: change one, update the other two.

**Settings are the state machine + persistence layer — multi-site, multi-feature.** `NoteFlareSettings` (`core/types.ts`, defaults in `core/settings.ts`) holds **shared account credentials** (`githubOwner`/`githubToken`, `cloudflareAccount`/`cloudflareToken`), feature flags **`enablePublish`/`enableBackup`**, a **`backup: BackupSettings`** block, an array of **`SiteProfile`s** + `activeSiteId`, and `defaultViewLocation` (`left`/`right`/`tab`). Each `SiteProfile` is one fully-isolated published site: its own `githubRepo`/`githubBranch`, `cloudflareProject`/`siteUrl`, `deployTarget`, publish scope (`publishScope` + `publishPath`, legacy `contentFolder`), site metadata (`authorName`, `sidebarTitle`, `siteDescription`), per-site `excludePatterns`/`includeAttachments`, and publish state (`isPublished`, `lastPublished`, `lastNoteCount`). `plugin.getActiveSite()` resolves the selected profile (or the first, or null). `plugin.saveSettings()` is the choke point (re-encrypts tokens, refreshes status bar, ribbon, panel) — prefer it over `saveData`.

**Setup is a guided wizard** (`settingsTab.ts`, `SetupStep` in `types.ts`): connect account → choose Publish and/or Automatic Private Backup → configure hosting when publishing → completion. Simple hosting skips Cloudflare fields completely. The manage panel exposes backup content scope, after-change behavior, schedule, status, and “Back up now,” but no version-control concepts.

**Tokens are never persisted in plaintext.** `saveSettings` strips `githubToken`/`cloudflareToken` and writes only OS-encrypted ciphertext (`githubTokenEnc`/`cloudflareTokenEnc`) via `src/core/secureStore.ts`, which wraps **Electron `safeStorage`** (key held in macOS Keychain / Windows DPAPI / Linux libsecret). `loadSettings` → `migrateSettings` (in `main.ts`) decrypts them back into memory and **upgrades two legacy shapes**, re-saving once (`needsResave`): (1) old plaintext tokens get encrypted and scrubbed; (2) old flat single-site fields collapse into one `SiteProfile`. If `safeStorage.isEncryptionAvailable()` is false, tokens are kept in memory only (never written) and the user is warned on load.

**`main.ts` is the orchestrator + UI shell.** `NoteFlarePlugin.onload` registers the `StatusBar`, the `NoteFlareView`, ribbon icon, publish/unpublish commands, the `backup-now` command, and background backup automation. Publish/unpublish target `getActiveSite()`. `doBackup(background)` guards concurrency, records attempts/results, and keeps background failures quiet while surfacing them in Settings.

**`NoteFlareView` (`src/ui/noteflareView.ts`) is the primary publishing surface.** It renders the site switcher, publish settings, deploy info, and Publish/Unpublish actions without a backup/version-control tab. Backup-only users see a compact protected/last-backup state that links to Settings.

**Setup is idempotent — safe to re-run.** Preserve these patterns. (1) *"Already exists" fallbacks:* `createRepo` treats GitHub 422 as success; `createProject` failure → wizard falls back to `getProject`. (2) *Async polling gate:* after `createRepo` the wizard awaits `GitHubApi.waitForRepo` (~30s) before continuing — the usual place setup appears to "hang."

**mdgarden is the build engine — the repo is the user's own, on `main`.** No template fork, so no v4/v5 branch drift. `githubApi.createRepo()` makes a fresh `auto_init` repo; its default branch (`main`) is stored as `SiteProfile.githubBranch`, passed to Cloudflare as `production_branch`, and committed to. Pointing Cloudflare at a branch that doesn't exist yields a blank site / **HTTP 522**, so keep these aligned (`publish()` re-resolves via `getDefaultBranch` to defend against this). **The Cloudflare build command must install deps first** (`npm ci || npm install && npx mdgarden build`): Cloudflare's auto-install can't be relied on, and a bare `npx mdgarden build` fails with "could not determine executable to run" because the `mdgarden` bin only exists in `node_modules/.bin` after an install. **`publisher.publish` self-heals every publish** (cloudflare target): rewrites `package.json` + `mdgarden.config.json`, calls `configureBuild` (PATCHes the build command + `production_branch`), and calls `triggerDeployment` (best-effort). If the GitHub repo is renamed, the stored `githubRepo` goes stale and writes get `301`-redirected — keep it in sync.

**mdgarden must be installable for the build to resolve `mdgarden`.** The generated `package.json` pins the engine via `MDGARDEN_VERSION` (`constants.ts`, currently `latest`). For builds to succeed, **mdgarden must be published to npm** at a matching version. To avoid an npm account, point `MDGARDEN_VERSION` at a public git spec instead — `github:<owner>/mdgarden` — and mdgarden's `prepare` script builds it on install. mdgarden lives in its own repo/package (not inside this plugin); rebuild and republish it there when the engine changes.

**The Cloudflare↔GitHub connection is the publish-or-fail hinge (cloudflare target only).** The Pages API can specify a GitHub repo as the build source, but it *cannot* perform the GitHub OAuth/App authorization — the user must install the "Cloudflare Workers and Pages" GitHub App (`github.com/apps/cloudflare-workers-and-pages`) and grant it the repo once, in the browser. If they don't, `createProject` fails and (worse) no build is ever triggered, so the site stays blank. Wizard Step 2 calls this out and `cloudflareSetupHint` (`siteModals.ts`) turns a create failure into that instruction. The grant can later be **revoked** ("This project is disconnected from your Git account") — no API fix, so the manage panel + sidebar surface a **Reconnect** action to the App URL, and `publisher.ts` appends that hint (`RECONNECT_HINT`) to Cloudflare build errors. It commonly breaks after a delete+recreate of the repo. **Easy-token UX:** Step 2 deep-links to a pre-filled Cloudflare token template (`buildCloudflareTokenUrl()`) and auto-detects the Account ID via `CloudflareApi.getAccountId` so the user never copies the 32-char ID by hand.

## Notes

- `data.json` holds live runtime state. **Tokens are stored encrypted** (`githubTokenEnc`/`cloudflareTokenEnc` via Electron `safeStorage`, key in the OS keychain) — never plaintext. Treat it as local machine state: keep it out of any git repo. (Pre-`safeStorage` files held plaintext tokens; `migrateSettings` upgrades & scrubs them on first load.)
- **Shared constants live in `src/core/constants.ts`.** `ATTACHMENT_EXTS` (the publishable image/PDF whitelist, used by `fileCollector.ts`), `NODE_VERSION` (build Node pin, written to `.node-version` and the Actions workflow), `MDGARDEN_VERSION` (the `mdgarden` dependency spec written into the published `package.json`), and `GITHUB_ACTIONS_WORKFLOW` (the Pages deploy workflow) are the single source of truth — don't re-inline them. Note there are two base64 helpers by input type: `textToBase64` (`publisher.ts`, strings) and `readAsBase64` (`fileCollector.ts`, binary) — that split is intentional.
- **The Cloudflare build command string is `MDGARDEN_BUILD_COMMAND` in `cloudflareApi.ts`** — its own source of truth, separate from the `package.json` `build` script (`mdgarden build`).
- **Undocumented Obsidian internal API.** `main.ts` (`openSettingsTab`) and `settingsTab.ts` reach into `app.setting.open()` / `openTabById()` via `unknown` casts. These aren't part of Obsidian's public API and can break across versions — touch with care.

## Obsidian Plugin Review Rules & Best Practices

To maintain compliance with the official Obsidian plugin review guidelines, follow these strict rules when modifying this codebase:

1. **Network Requests:** Never use `fetch`. Always use Obsidian's `requestUrl`. (In `githubApi.ts`, we use a custom `doRequest` wrapper that implements `requestUrl` with a fetch-like response interface).
2. **DOM Timers:** Never use global `setTimeout` or `setInterval`. Always explicitly call `window.setTimeout` and `window.setInterval`. This ensures timers fire correctly when the plugin is moved into an Obsidian popout window.
3. **Styles:** Never use direct inline style assignments (e.g., `element.style.color = 'red'`). Always use Obsidian's helper: `element.setCssStyles({ color: 'red' })`.
4. **Settings UI:** 
   - Never use the word "Settings" in the text of a settings section heading. (Use "Options" or similar). Note: The linter is known to aggressively cache or falsely flag chained `new Setting().setName().setHeading()` calls even after fixing the name. If a false positive occurs, split the instantiation and method calls onto separate lines to bypass the AST/regex checker.
   - `PluginSettingTab.display()` is deprecated. Keep the `display()` method purely as an entrypoint that calls a custom `this.render()` method to do the actual UI building.
   - Use `.setDestructive()` for warning buttons, not `.setWarning()` (requires `minAppVersion: 1.13.0+`). **Note:** the current `minAppVersion` in `manifest.json` is set to `1.9.0` for compatibility with the developer's installed Obsidian. If you use APIs that require a higher version, you must bump `minAppVersion` in both `manifest.json` AND `versions.json` — and verify Obsidian is updated to match, or you'll get "No appropriate version found" on install. **Note:** the current `minAppVersion` in `manifest.json` is set to `1.9.0` for compatibility with the developer's installed Obsidian. If you use APIs that require a higher version, you must bump `minAppVersion` in both `manifest.json` AND `versions.json` — and verify Obsidian is updated to match, or you'll get "No appropriate version found" on install.
5. **Event Handlers:** Never return a Promise directly to a DOM event listener (e.g., `btn.onClick(async () => {...})` is bad if the API expects `() => any`). Wrap async logic in a void IIFE: `() => { void (async () => { await doWork(); })(); }`.
6. **ESLint Directives:** Every `// eslint-disable-next-line` comment *must* have an explanatory description appended using `--` (e.g., `// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- required for electron`). When bypassing `require()`, also include `@typescript-eslint/no-unsafe-call`.
7. **Config Paths:** Never hardcode `.obsidian`. Always use `app.vault.configDir` when reading or writing internal config files dynamically.
8. **Redundant Type Assertions:** Do not cast variables with `as type` if they already inherently possess that type (e.g. casting `resp.text` as `string`). Obsidian's strict linter will reject redundant assertions.

## Known Setup Issues & Fixes

### "No appropriate version found" on plugin install
**Cause:** `manifest.json` and `versions.json` had `minAppVersion` set higher than the installed Obsidian version.
**Fix applied (2026-07-20):** Both files were updated to set `minAppVersion: "1.9.0"` — matching the developer's Obsidian v1.9.12.
**Rule for AI agents:** Never raise `minAppVersion` above `1.9.0` unless the user confirms they have updated Obsidian. Always keep `manifest.json` and `versions.json` in sync — every version entry in `versions.json` must have a `minAppVersion` ≤ the developer's installed Obsidian.

### Publish target is Cloudflare Pages — not GitHub Actions
The current active workflow is: **vault edits → backup to private GitHub repo → Cloudflare Pages builds & hosts the public site**. There is no GitHub Actions CI/CD pipeline for publishing. Do not add, suggest, or reference GitHub Actions workflows for the publish flow.