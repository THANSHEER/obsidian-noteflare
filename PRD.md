# Product Requirements Document (PRD): NoteFlare

**Version:** 2.0 — Current Functionality Only

NoteFlare is an Obsidian **desktop** plugin that does two things from inside Obsidian with no terminal or backend:

1. **Publish** — turns a vault (or a selected subset) into a free website hosted on Cloudflare Pages or GitHub Pages.
2. **Backup** — mirrors the entire vault root to a private GitHub repository automatically.

---

## 1. Architecture Overview

### 1.1 Two-Repo Model

NoteFlare uses **two separate GitHub repositories** per vault:

| Repository | Purpose | Visibility |
|------------|---------|------------|
| **Master publish repo** (e.g. `noteflare-sites`) | Stores markdown source + build configs for all published sites. Built and served by the hosting provider. | Public (by design — the site source is public) |
| **Backup repo** (e.g. `my-vault-backup`) | Stores a complete mirror of the vault root for safekeeping. | Private (recommended) or Public (user choice) |

These are always distinct repos. The backup engine never writes to the publish repo and the publisher never writes to the backup repo.

### 1.2 Build Engine

Sites are built by **mdgarden**, a lightweight static site generator. NoteFlare commits source files to GitHub; the hosting provider runs `npm ci || npm install && npx mdgarden build` to produce the `public/` directory. No pre-built HTML is ever committed to the repo or stored in the vault.

### 1.3 Multi-Site Layout (Master Repo)

Each site profile gets an isolated subdirectory inside the master repo:

```
noteflare-sites/
  sites/
    <site-id>/
      package.json          ← pins mdgarden version
      mdgarden.config.json  ← site title, description, baseUrl, features
      .node-version         ← Node version pin for build host
      content/
        **/*.md             ← vault markdown files
        attachments/
          **               ← images, PDFs
  .github/
    workflows/
      deploy.yml            ← GitHub Actions workflow (github-pages provider only)
```

Users can clone the master repo on another device and run `npx mdgarden build` locally from any `sites/<id>/` directory.

---

## 2. Web Publishing

### 2.1 Publish Pipeline

1. **Branch resolution** — `GitHubApi.getDefaultBranch()` re-resolves the master repo's actual default branch.
2. **File collection** — `FileCollector` walks `app.vault.getFiles()` filtered by publish scope and exclude patterns.
3. **Content transformation** — `Transformer` normalises frontmatter and strips `private`/`draft` keys from the uploaded copy.
4. **File upload** — All files uploaded as a **single Git commit** via the GitHub Git Data API. One commit = one build trigger.
5. **Content mirroring** — Blobs under `sites/<id>/content/` not in the current publish set are deleted (null-SHA tree entries).
6. **Deploy-target steps** — Provider-specific post-commit steps run.

### 2.2 Publish Scopes

| Scope | Description |
|-------|------------|
| **Full Vault** | All `.md` files + permitted attachments |
| **Selected Files/Folders** | Only explicitly chosen files/folders; linked attachments auto-included |

### 2.3 Hosting Providers

#### Cloudflare Pages
- Creates a Pages project pointed at the master repo with the mdgarden build command.
- Every publish: `enableDeployment()` → `configureBuild()` (self-heals stale config) → `triggerDeployment()`.
- **Unpublish**: `disableDeployment()` — pauses the site without deleting content.
- **Delete**: `deleteProject()` via API (fully supported) + removes `sites/<id>/` from master repo.
- Requires: Cloudflare API token + "Cloudflare Workers and Pages" GitHub App authorization.

#### GitHub Pages
- Commits `.github/workflows/deploy.yml` to the master repo on every publish.
- GitHub Actions builds all sites. The most recently updated site is served at `owner.github.io/repo`; additional sites at `owner.github.io/repo/sites/<site-id>`.
- After first publish, user must enable: GitHub repo → Settings → Pages → Source → GitHub Actions.
- **Unpublish**: Not possible via API. User opens manual-steps guidance in plugin.
- **Delete**: Removes `sites/<id>/` folder via API. Pages link may remain active until manually disabled.
- Requires: GitHub PAT with `repo` + `workflow` scopes.

#### Netlify / Vercel
- Shown as "Coming soon" in Connections panel and wizard. Not yet functional.

### 2.4 Content Transformation

- **Frontmatter auto-repair**: Prepends a minimal valid `---…---` block if missing in the uploaded copy.
- **Metadata strip**: `private` and `draft` YAML keys removed before upload.
- **No link rewriting**: mdgarden resolves Obsidian wikilinks/embeds natively.

### 2.5 Attachment Types

Uploadable extensions: `png`, `jpg`, `jpeg`, `gif`, `svg`, `webp`, `pdf`.

---

## 3. Automatic Private Backup

### 3.1 Scope

BackupEngine mirrors the **entire vault root** to a separate GitHub repository. Auto-excluded:
- `.obsidian/` (Obsidian config directory)
- `.DS_Store`, `Thumbs.db`, `desktop.ini`
- `.trash/`, `node_modules/`

### 3.2 Delta Backup

Computes Git blob SHA for every local file, compares with remote tree. Only additions, updates, and deletions are uploaded.

### 3.3 Automation

| Trigger | Behaviour |
|---------|-----------|
| After vault changes | Debounced 30-second timer after create/modify/delete/rename |
| Scheduled | Configurable interval (off / 15 min / 30 min / 1 hr / 6 hr / daily) |
| Manual | "Back up now" button or command palette |

### 3.4 Backup Repo Creation

- Auto-created on first backup if it doesn't exist.
- Visibility honours user setting: **Private** (recommended) or **Public**.
- If existing backup repo is public but setting is private, backup halts with error.

---

## 4. Connection Management

### 4.1 GitHub
- PAT with `repo` + `workflow` scopes. Username auto-detected via `GET /user`.
- Token encrypted at rest via Electron `safeStorage`.

### 4.2 Cloudflare
- API Token with Cloudflare Pages: Edit + Workers Scripts: Edit + Account Settings: Read.
- Account ID auto-detected via `GET /accounts`. Deep-linked creation URL pre-fills permissions.
- Token encrypted at rest.

### 4.3 Token Security
- `saveSettings()` writes only `githubTokenEnc`/`cloudflareTokenEnc` (never plaintext).
- `migrateSettings()` decrypts them back into memory on load.
- If `safeStorage` unavailable, tokens stay in memory only and the user is warned.

---

## 5. Setup Wizard (4 Steps)

| Step | Name | Content |
|------|------|---------|
| 1 | Connect GitHub | PAT entry + verification. Saves `githubOwner`. |
| 2 | Choose hosting & create site | Site name, master repo name, publish scope, provider cards. If Cloudflare: token + account ID. Creates master repo + optional Cloudflare project. |
| 3 | Automatic backup (optional) | Toggle backup; select repo visibility. Sets backup repo name. |
| 4 | Done | Shows site URL; offers "Publish now" or "I'll publish later". |

Wizard is idempotent — 422 "already exists" treated as success.

---

## 6. Manage Panel (Settings Tab)

### 6.1 Connections Section

| Row | Connected | Disconnected |
|-----|-----------|--------------|
| GitHub | `@username`; Disconnect | "Not connected"; Connect |
| Cloudflare | Account ID prefix; Reconnect to GitHub; Disconnect | "Not connected"; Connect (inline form) |
| Netlify | "Coming soon"; disabled Connect | — |
| Vercel | "Coming soon"; disabled Connect | — |

### 6.2 Backup & Storage Section

- Master publish repo path (read-only).
- Enable automatic backup toggle.
- When enabled: repo visibility; back-up-after-changes toggle; schedule; status (last run / last error) + "Back up now".
- Clear distinction shown: publish repo vs backup repo.

### 6.3 Sites Section

- Panel location dropdown (left / right / tab).
- Site list: status badge, hosting provider, last published + note count.
- Per-site: provider dropdown; open-site link; Edit; Remove.
- Add site button.

### 6.4 Danger Zone

- **Hard reset**: Clears all tokens and site profiles. Remote repos NOT deleted. Vault registry preserved.

---

## 7. Vault Registry

`.noteflare/registry.json` in the vault root survives uninstall/reinstall. Stores minimal site references (no credentials). On reinstall with credentials reconnected, shows a **"Restore previous sites"** banner.

---

## 8. NoteFlare Sidebar View

### Publish panel
- Site switcher + add-site button.
- Publish scope dropdown; file/folder chip list (when "Selected").
- Advanced button → `EditSiteModal`.
- Deployment info: host label + "Open Site" button.
- Cloudflare reconnect banner (shown only on GitHub App disconnection error).
- **Site Health card**: Building / Live / Build Failed / Offline states.
- **Actions**:
  - `Publish` (first-time) / `Update` (site already live)
  - `Republish` (when last publish failed)
  - `Unpublish` (Cloudflare: API toggle; GitHub Pages: manual-steps modal)
  - `Delete`

### Backup-only mode
- Last backup timestamp + "Backup settings" link.

---

## 9. Site Profile Fields

| Field | Description |
|-------|-------------|
| `id` | UUID — permanent; used as `sites/<id>/` path segment |
| `name` | Display name |
| `githubRepo` | Master repo name |
| `githubBranch` | Resolved default branch |
| `cloudflareProject` | Cloudflare Pages project name (empty for GitHub Pages) |
| `siteUrl` | Live URL (without `https://`) |
| `publishScope` | `'vault'` or `'selected'` |
| `publishPaths` | Selected file/folder paths |
| `authorName` / `sidebarTitle` / `siteDescription` | mdgarden metadata |
| `excludePatterns` | Glob patterns for files to skip |
| `includeAttachments` | Whether to upload images/PDFs |
| `isPublished` | `true` only when last publish succeeded |
| `lastPublished` | ISO timestamp of last successful publish |
| `lastNoteCount` | File count from last successful publish |
| `hostingProvider` | `'github-pages'` / `'cloudflare'` / `'netlify'` / `'vercel'` |

---

## 10. Delete Site Flow

### Cloudflare Pages
1. `CloudflareApi.deleteProject()` ✅ API-supported
2. `GitHubApi.deleteSiteFolder()` ✅ API-supported
3. Remove from vault registry + plugin settings

### GitHub Pages
1. `GitHubApi.deleteSiteFolder()` ✅ API-supported
2. Remove from vault registry + plugin settings
3. ⚠ Pages deployment link may remain — user must manually disable in GitHub repo Settings → Pages

---

## 11. Hosting Provider Change Behaviour

When `hostingProvider` changes on an existing site:
- Confirmation shows the **old site URL** (which will stop being updated).
- New URL unknown until next publish — `site.siteUrl` is cleared.
- Manual cleanup steps shown per platform.

---

## 12. Status Bar

Shows: Idle / `Uploading N/M…` / `Rate limited — Ns…` / `Live · N notes` / `Unpublished` / `Error — <msg>`

---

## 13. Plugin Constraints

- Network requests: `requestUrl` (not `fetch`) — Cloudflare API requires this for CORS.
- Timers: `window.setTimeout` / `window.setInterval` (not global).
- Styles: `element.setCssStyles({})` (not `element.style.*`).
- Settings headings: never use the word "Settings" (Obsidian linter rule).
- Async DOM handlers: wrapped in void IIFEs.
