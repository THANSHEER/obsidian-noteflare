# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

NoteFlare is an Obsidian **desktop** plugin that does two related things for a user's vault, from inside Obsidian with no git/terminal/backend:

1. **Publish** — turns the vault (or selected files/folders) into a free website. Each published site lives in its own isolated subdirectory (`sites/<site-id>/`) of one shared **master GitHub repository** (`settings.masterRepository`), and is built/served by **Cloudflare Pages** or **GitHub Pages** (user's choice per site; Netlify/Vercel are listed as "coming soon" but not implemented). GitHub is used only as a content store; the hosting provider performs the actual build.
2. **Backup** — mirrors the whole vault root to a *separate*, dedicated private GitHub repository automatically after edits and/or on a schedule. Backup is intentionally one-way and local-authoritative; there is no changes list, branch control, pull, conflict, or manual commit workflow. **The backup repo is never the master publish repo — the two are always distinct.**

The site is built by **mdgarden**, NoteFlare's own lightweight static-site generator — a separate open-source npm package developed in its own repo. The build host runs `npm ci || npm install && npx mdgarden build`. If you find any `mdsite` or `quartz` reference in the source, it is stale — the engine is `mdgarden`.

This repo lives _inside a real Obsidian vault_ at `.obsidian/plugins/obsidian-noteflare/`. Obsidian loads the built `main.js` + `manifest.json` + `styles.css` directly from this folder, so the build output is committed/present alongside the source.

`PRD.md` in the repo root is the authoritative, current-functionality spec (v2.0) — read it for full detail on any flow below; it is kept in sync with the code (unlike stale historical docs).

## Commands

```bash
npm install            # install deps
npm run dev            # esbuild watch — rebuilds main.js in place (inline sourcemap)
npm run build          # `tsc -noEmit -skipLibCheck` typecheck, then production bundle to main.js
tsc -noEmit -skipLibCheck   # typecheck only (there is no separate lint step)
npm test                    # run all Jest unit tests
npx jest tests/publisher.test.ts     # run a single test file
npx jest -t "test name substring"    # run tests matching a name
```

- **Never hand-edit `main.js`** — it's the bundled esbuild output. Edit the `.ts` sources and rebuild.
- **To see a change in Obsidian:** rebuild, then reload the plugin (Obsidian → Settings → Community plugins → toggle NoteFlare off/on, or reload the app). `npm run dev`'s watch rebuilds `main.js` but does not reload Obsidian for you.
- Entry point is the root `main.ts` (the `Plugin` subclass, incl. settings migration); all other logic lives in `src/`, organized into `api/`, `backup/`, `core/`, `publish/`, `ui/`.
- CI (`.github/workflows/ci-release.yml`) runs `npm test` then `npm run build` on every push/PR to `main`; on `main` it also auto-tags/releases when `manifest.json`'s `version` hasn't been tagged yet, attaching `main.js`/`manifest.json`/`styles.css`.

## Source layout

```
main.ts                          orchestrator + plugin shell (Plugin subclass, commands, ribbon, settings I/O + migrateSettings)
src/core/       types.ts         all interfaces: NoteFlareSettings, SiteProfile, RegistryEntry, BackupSettings, PublishResult, BackupResult, SetupStep
                settings.ts      DEFAULT_SETTINGS, DEFAULT_BACKUP_SETTINGS, createSiteProfile()
                constants.ts     ATTACHMENT_EXTS, NODE_VERSION, MDGARDEN_VERSION, GITHUB_ACTIONS_WORKFLOW, Ko-fi constants
                secureStore.ts   Electron safeStorage wrapper (encrypt/decrypt tokens)
                vaultRegistry.ts reads/writes `.noteflare/registry.json` (survives uninstall/reinstall)
src/api/        githubApi.ts     GitHub REST + Git Data API (requestUrl-based)
                cloudflareApi.ts Cloudflare Pages API (requestUrl-based)
                geekstashApi.ts  fetches GitHub release notes for the "What's New" modal; builds deep-links to geekstash.dev feedback/bug/uninstall forms (NoteFlare never talks to api.geekstash.dev or embeds Turnstile itself)
src/publish/    publisher.ts     the publish pipeline (per active SiteProfile)
                fileCollector.ts walks the vault, applies scope + exclude globs
                transformer.ts   normalizes frontmatter (no link rewriting)
                contentValidator.ts  inspectFrontmatter — preflight + auto-repair
src/backup/     backupEngine.ts  local-authoritative private backup mirror
                backupScheduler.ts registers debounce + interval automation
src/ui/         noteflareView.ts the sidebar publish panel (or backup status for backup-only setups)
                statusBar.ts     typed status-bar setters
                feedback/        FeedbackModal, WhatsNewModal, UninstallFeedbackModal, KofiWidget
                settings/settingsTab.ts   NoteFlareSettingsTab router (wizard vs. manage panel)
                settings/wizard/          4-step setup flow: stepGitHub → stepHosting → stepBackup → stepDone (wizardRenderer.ts drives it)
                settings/manage/          the post-setup panel: connectionsSection, sitesSection, backupSection, restoreSection, feedbackSection (index.ts assembles them)
                settings/modals/          addSiteModal, editSiteModal, removeSiteModal, changeRepoModal, unpublishModals, resetModal, pathSuggestModal
```

## Architecture

The publish pipeline is shaped around **mdgarden conventions** and a **one master repo, many sites** layout — the cross-cutting facts that tie otherwise-separate files together. Changing the target static-site generator or the repo layout means touching these in concert:

- `settings.masterRepository` is the single GitHub repo (created once via `githubApi.createRepo`) that holds *every* published site for this vault, each isolated under `sites/<site.id>/`. There is no template fork, no per-site repo, no branch juggling — the repo's actual default branch (usually `main`) is re-resolved on every publish via `getDefaultBranch()` and stored on `site.githubBranch`.
- `publisher.ts` uploads markdown to `sites/<id>/content/` and attachments to `sites/<id>/content/attachments/` (where mdgarden reads from), plus per-site build files: `sites/<id>/package.json` (depends on `mdgarden`), `sites/<id>/mdgarden.config.json` (the build manifest), and `sites/<id>/.node-version`.
- `transformer.ts` normalizes frontmatter via `contentValidator.ts` and strips `private`/`draft` keys. It does **not** rewrite links — mdgarden resolves Obsidian `[[wikilinks]]`/`![[embeds]]` natively.
- `cloudflareApi.ts` / the GitHub Actions workflow both point their build root at `sites/<id>/`.

**Two hosting providers are live: Cloudflare Pages and GitHub Pages** (`SiteProfile.hostingProvider`; `'netlify'`/`'vercel'` are reserved enum values shown as "Coming soon" in the UI, not functional). Each `SiteProfile` picks its provider independently — one master repo can serve a mix of Cloudflare and GitHub Pages sites simultaneously.
  - **Cloudflare Pages**: `Publisher.publish()` calls `enableDeployment` → (on 404) `createProject` → `configureBuild` (self-heal) → `triggerDeployment` after every commit. Unpublish = `disableDeployment` (pauses without deleting). Requires the user to separately authorize the "Cloudflare Workers and Pages" GitHub App on the repo — the Pages API cannot do this itself.
  - **GitHub Pages**: the publish step also commits `.github/workflows/deploy.yml` (`GITHUB_ACTIONS_WORKFLOW` in `constants.ts`) to the repo root. That workflow builds *every* `sites/*/` directory each run and serves the most-recently-updated site at the repo's Pages root, with the rest reachable under `/sites/<id>/`. Unpublish has no API equivalent — the UI shows manual steps instead.

**Publish flow** (`Publisher.publish`, driven from `main.ts`): re-resolves the master repo's real default branch (`getDefaultBranch`) and privacy (`isRepoPrivate`) so stale stored data self-heals → `FileCollector` walks `app.vault.getFiles()`, honoring the site's **publish scope** (`'vault'` / `'selected'` via `publishPaths`) + exclude globs (micromatch), keeping `.md` + optionally the attachment types in `constants.ts` → `Transformer` **normalizes frontmatter** (`contentValidator.inspectFrontmatter`: if a note doesn't begin with a parseable `---…---` block, it prepends a minimal valid block; vault notes are untouched, only the uploaded copy) and strips `private`/`draft` keys (so the note publishes — mdgarden otherwise skips notes carrying those flags) → `Publisher` counts auto-fixed notes onto `PublishResult.fixed`/`issues` → content is base64-encoded → per-site build files added, plus the Actions workflow for `github-pages` sites → `GitHubApi.commitFiles` uploads everything as **one commit** via the Git Data API (blobs → tree on `base_tree` → commit → fast-forward the ref), with batched blob creation + HTTP 429/secondary-rate-limit backoff, and **mirrors `sites/<id>/content/`** (deletes existing blobs under that prefix that aren't in this publish, so removed/excluded notes disappear — skipped on partial failure; other sites' subtrees and root build files are untouched) → provider-specific steps run. One commit per publish = exactly one build, no per-file SHA conflicts.

**Publish/unpublish is deployment toggling, not content deletion** (Cloudflare target). Unpublish flips Cloudflare `deployment_enabled: false`; the GitHub content stays put so re-publishing just re-enables it. Keep this invariant — don't make unpublish delete files. GitHub Pages has no such toggle; unpublish there is documented as a manual step in the UI.

**Backup is separate from publishing — always a different repo.** `BackupEngine` mirrors the *entire vault root* (auto-excluding `.obsidian/`, `.trash/`, `node_modules/`, OS junk files) to `settings.backup.repository`, a dedicated private-by-default repo, never a site's publish repo. It reads binary-safe file content, compares local git-blob SHAs with the remote tree, and uploads only additions, updates, and deletions. The local vault is authoritative. `main.ts` registers vault change listeners (30-second debounce, via `backupScheduler.ts`) plus a schedule checker; users control after-change backup and interval in Settings.

**Both `GitHubApi` and `CloudflareApi` use Obsidian's `requestUrl`** (not `fetch`) — required to avoid CORS errors in the Electron renderer, since neither API reliably returns CORS headers for this use case. Don't introduce `fetch` for either client.

**Progress is a stringly-typed protocol.** `Publisher`/`GitHubApi` emit human-readable progress strings (`"Uploading 3/10..."`, `"Rate limited — 42s..."`) through an `onProgress` callback → `main.ts syncStatusFromProgress` regex-matches `Uploading n/total` and `Rate limited … Ns` → calls typed `StatusBar` methods (`setPublishing`, `setRateLimited`, `setLive`, `setMessage`, `setError`, …) in `src/ui/statusBar.ts`, which just set the status-bar text. The wording, the regex, and the StatusBar strings are three coupled ends of one protocol: change one, update the other two.

**Settings are the state machine + persistence layer — multi-site, multi-feature.** `NoteFlareSettings` (`core/types.ts`, defaults in `core/settings.ts`) holds **shared account credentials** (`githubOwner`/`githubToken`, `cloudflareAccount`/`cloudflareToken`), feature flags **`enablePublish`/`enableBackup`**, `masterRepository`/`masterRepositoryPrivate`, a **`backup: BackupSettings`** block, an array of **`SiteProfile`s** + `activeSiteId`, and `defaultViewLocation` (`left`/`right`/`tab`). Each `SiteProfile` is one fully-isolated published site within the master repo: its own `id` (the `sites/<id>/` path segment), `githubBranch`, `cloudflareProject`/`siteUrl`, `hostingProvider`, publish scope (`publishScope` + `publishPaths`), site metadata (`authorName`, `sidebarTitle`, `siteDescription`), per-site `excludePatterns`/`includeAttachments`, and publish state (`isPublished`, `lastPublished`, `lastNoteCount`, `lastPublishFailed`, `lastPublishError`). `plugin.getActiveSite()` resolves the selected profile (or the first, or null). `plugin.saveSettings()` is the choke point (re-encrypts tokens, upserts every site into the vault registry, refreshes status bar/ribbon/panel) — prefer it over `saveData`.

**The vault registry (`.noteflare/registry.json`) survives plugin uninstall/reinstall.** `VaultRegistry` (`src/core/vaultRegistry.ts`) stores minimal, credential-free `RegistryEntry` records (repo/project names, URLs, id) alongside the vault itself, not in plugin data. `saveSettings()` upserts every site into it on every save. It is intentionally **not** cleared by Hard Reset (which wipes tokens + site profiles) so a user who resets or reinstalls can reconnect credentials and see a "restore previous sites" prompt (`main.ts onload`) driven by `VaultRegistry.buildRestoredProfiles`.

**Setup is a guided 4-step wizard** (`settingsTab.ts` + `settings/wizard/`, `SetupStep` in `types.ts`): connect GitHub (mandatory) → choose hosting + create the first site (master repo + optional Cloudflare project) → automatic private backup (optional) → done. The manage panel (`settings/manage/`) exposes connections, per-site management, backup scope/schedule/status, and a danger-zone hard reset — no version-control concepts anywhere in the UI.

**Tokens are never persisted in plaintext.** `saveSettings` strips `githubToken`/`cloudflareToken` and writes only OS-encrypted ciphertext (`githubTokenEnc`/`cloudflareTokenEnc`) via `src/core/secureStore.ts`, which wraps **Electron `safeStorage`** (key held in macOS Keychain / Windows DPAPI / Linux libsecret). `loadSettings` → `migrateSettings` (in `main.ts`) decrypts them back into memory and **upgrades legacy shapes on load**, re-saving once: (1) old plaintext tokens get encrypted and scrubbed; (2) legacy `publishScope`/`publishPath` (`'folder'`/`'page'`) collapse into `'selected'`/`publishPaths`; (3) legacy `deployTarget` maps onto `hostingProvider`. If `safeStorage.isEncryptionAvailable()` is false, tokens are kept in memory only (never written) and the user is warned on load.

**Setup is idempotent — safe to re-run.** Preserve these patterns. (1) *"Already exists" fallbacks:* `createRepo` treats GitHub 422 as success; `createProject` failure → wizard falls back to `getProject`. (2) *Async polling gate:* after `createRepo` the wizard awaits `GitHubApi.waitForRepo` (~30s) before continuing — the usual place setup appears to "hang."

**mdgarden is the build engine.** `githubApi.createRepo()` makes a fresh `auto_init` repo whose default branch is stored as `masterRepository`'s branch and passed to Cloudflare as `production_branch`. Pointing Cloudflare at a branch that doesn't exist yields a blank site / **HTTP 522**, so keep these aligned (`publish()` re-resolves via `getDefaultBranch` every run to defend against this). **The Cloudflare build command must install deps first** (`npm ci || npm install && npx mdgarden build`): Cloudflare's auto-install can't be relied on, and a bare `npx mdgarden build` fails with "could not determine executable to run" because the `mdgarden` bin only exists in `node_modules/.bin` after an install. **`publisher.publish` self-heals every publish** (cloudflare target): rewrites `package.json` + `mdgarden.config.json`, calls `configureBuild` (PATCHes the build command + `production_branch`), and calls `triggerDeployment` (best-effort).

**mdgarden must be installable for the build to resolve `mdgarden`.** The generated `package.json` pins the engine via `MDGARDEN_VERSION` (`constants.ts`, currently `'latest'`). For builds to succeed, **mdgarden must be published to npm** at a matching version, or `MDGARDEN_VERSION` must point at a public git spec (`github:<owner>/mdgarden`, whose `prepare` script builds it on install) to avoid needing an npm account. mdgarden lives in its own repo/package — rebuild and republish it there when the engine changes.

**The Cloudflare↔GitHub connection is the publish-or-fail hinge (cloudflare sites only).** The Pages API can specify a GitHub repo as the build source, but it *cannot* perform the GitHub OAuth/App authorization — the user must install the "Cloudflare Workers and Pages" GitHub App (`github.com/apps/cloudflare-workers-and-pages`) and grant it the repo once, in the browser. If they don't, `createProject` fails and no build is ever triggered, so the site stays blank. The wizard's hosting step calls this out and turns a create failure into that instruction. The grant can later be **revoked** ("This project is disconnected from your Git account") — no API fix, so the manage panel + sidebar surface a **Reconnect** action to the App URL, and `publisher.ts` appends `RECONNECT_HINT` to Cloudflare build errors.

## Notes

- `data.json` holds live runtime state. **Tokens are stored encrypted** (`githubTokenEnc`/`cloudflareTokenEnc` via Electron `safeStorage`, key in the OS keychain) — never plaintext. Treat it as local machine state: keep it out of any git repo. (Pre-`safeStorage` files held plaintext tokens; `migrateSettings` upgrades & scrubs them on first load.)
- **Shared constants live in `src/core/constants.ts`.** `ATTACHMENT_EXTS` (the publishable image/PDF whitelist, used by `fileCollector.ts`), `NODE_VERSION` (build Node pin, written to `.node-version` and the Actions workflow), `MDGARDEN_VERSION` (the `mdgarden` dependency spec written into the published `package.json`), and `GITHUB_ACTIONS_WORKFLOW` (the multi-site GitHub Pages deploy workflow) are the single source of truth — don't re-inline them. There are two base64 helpers by input type: `textToBase64` (`publisher.ts`, strings) and `readAsBase64` (`fileCollector.ts`, binary) — that split is intentional.
- **Undocumented Obsidian internal API.** `main.ts` (`openSettingsTab`) and `settingsTab.ts` reach into `app.setting.open()` / `openTabById()` via `unknown` casts. These aren't part of Obsidian's public API and can break across versions — touch with care.
- `geekstashApi.ts` only reads public GitHub release data and builds deep-links to `geekstash.dev` — NoteFlare itself never calls `api.geekstash.dev` or embeds Turnstile; those forms live entirely on the Geekstash website.

## Obsidian Plugin Review Rules & Best Practices

To maintain compliance with the official Obsidian plugin review guidelines, follow these strict rules when modifying this codebase:

1. **Network Requests:** Never use `fetch`. Always use Obsidian's `requestUrl` (both `githubApi.ts` and `cloudflareApi.ts` already do this).
2. **DOM Timers:** Never use global `setTimeout` or `setInterval`. Always explicitly call `window.setTimeout` and `window.setInterval`. This ensures timers fire correctly when the plugin is moved into an Obsidian popout window.
3. **Styles:** Never use direct inline style assignments (e.g., `element.style.color = 'red'`). Always use Obsidian's helper: `element.setCssStyles({ color: 'red' })`.
4. **Settings UI:**
   - Never use the word "Settings" in the text of a settings section heading (use "Options" or similar). The linter is known to falsely flag chained `new Setting().setName().setHeading()` calls even after fixing the name — if a false positive occurs, split the instantiation and method calls onto separate lines.
   - `PluginSettingTab.display()` is deprecated. Keep `display()` as a thin entrypoint that calls a custom `render()` method to do the actual UI building.
   - Use `.setDestructive()` for warning buttons, not `.setWarning()` (requires `minAppVersion: 1.13.0+`).
   - **`minAppVersion`** is pinned at `1.9.0` in both `manifest.json` and `versions.json` for compatibility with the developer's installed Obsidian (v1.9.12). Never raise it without explicit user confirmation that they've upgraded Obsidian — a higher `minAppVersion` causes "No appropriate version found" and blocks install. Keep the two files in sync.
5. **Event Handlers:** Never return a Promise directly to a DOM event listener (e.g., `btn.onClick(async () => {...})` is bad if the API expects `() => any`). Wrap async logic in a void IIFE: `() => { void (async () => { await doWork(); })(); }`.
6. **ESLint Directives:** Every `// eslint-disable-next-line` comment *must* have an explanatory description appended using `--` (e.g., `// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- required for electron`). When bypassing `require()`, also include `@typescript-eslint/no-unsafe-call`.
7. **Config Paths:** Never hardcode `.obsidian`. Always use `app.vault.configDir` when reading or writing internal config files dynamically.
8. **Redundant Type Assertions:** Do not cast variables with `as type` if they already inherently possess that type. Obsidian's strict linter will reject redundant assertions.

## AI Assistant Rules

1. **Strict User Control & Decision Making:** The human user is the sole decision maker. NEVER make architectural, UI, or workflow decisions on your own. If any ambiguity or choice arises, ask the user first before proceeding.
2. **No Unprompted Actions / Over-Engineering:** Execute ONLY what is explicitly requested in the prompt. Do not add unrequested features, modify unrelated files, or write unexpected code.
3. **No Auto-Committing:** NEVER automatically execute `git commit` or `git push` on behalf of the user unless explicitly commanded to do so in the prompt. Leave git management strictly to the user.
4. **minAppVersion Pin:** NEVER set `minAppVersion` above `1.9.0` in `manifest.json` or `versions.json` without explicit user confirmation. Keep `manifest.json` and `versions.json` in sync.

