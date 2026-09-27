<div align="center">
  <img src="public/logo/logo.svg" alt="NoteFlare Logo" width="140" />

  # NoteFlare for Obsidian

  **Bridging the gap between your local Obsidian vault and the open web.**<br>
  *Powered by the [mdgarden](https://www.npmjs.com/package/mdgarden) static site generator.*

  [![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/THANSHEER/obsidian-noteflare?style=for-the-badge&logo=github)](https://github.com/THANSHEER/obsidian-noteflare/releases)
  [![GitHub stars](https://img.shields.io/github/stars/THANSHEER/obsidian-noteflare?style=for-the-badge&logo=github&color=yellow)](https://github.com/THANSHEER/obsidian-noteflare/stargazers)
  [![Obsidian Downloads](https://img.shields.io/badge/Obsidian-Community_Plugin-7A36F4?style=for-the-badge&logo=obsidian)](https://obsidian.md/plugins)
  [![License: GPL v3](https://img.shields.io/badge/License-GPL_v3-blue.svg?style=for-the-badge)](https://github.com/THANSHEER/obsidian-noteflare/blob/main/LICENSE)
  [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=for-the-badge&logo=kofi&logoColor=white)](https://ko-fi.com/P0R02009G7)

  [Overview](#overview) • [Demos](#demos) • [Step-by-Step Publishing Guide](#step-by-step-publishing-guide) • [Key Features](#key-features) • [Installation](#installation) • [Support](#support)

</div>

---

## Overview

**NoteFlare** is a desktop plugin for [Obsidian](https://obsidian.md/) that lets you publish and backup your notes directly from Obsidian. No terminal, no manual Git commands, no complex server management required.

With just a few clicks, convert your entire vault (or selected folders/notes) into a fast, public website hosted on **Cloudflare Pages**, or set up automated private backups.

---

## Demos

### 🎬 Introduction & Setup
<div align="center">
  <video src="public/assets/demo-intro.mp4" controls autoplay loop muted playsinline width="100%" style="border-radius: 8px;"></video>
</div>

### 🎬 Publishing Your Notes
<div align="center">
  <video src="public/assets/demo-publish.mp4" controls autoplay loop muted playsinline width="100%" style="border-radius: 8px;"></video>
</div>

---

## Step-by-Step Publishing Guide

Publishing your digital garden with NoteFlare is straightforward. Here is how to publish your site from scratch:

### Step 1: Install & Enable NoteFlare
1. Open Obsidian **Settings** (`Cmd/Ctrl + ,`).
2. Go to **Community plugins** → Turn off **Restricted Mode**.
3. Click **Browse**, search for **NoteFlare**, then click **Install** and **Enable**.

### Step 2: Complete the Setup Wizard
1. Open **Settings** > **NoteFlare** (or press `Cmd/Ctrl + P` and search `NoteFlare: Open setup wizard`).
2. **Connect Accounts:**
   - **GitHub Personal Access Token:** Click the link in the wizard to generate a fine-grained or classic GitHub token with repository permissions.
   - **Cloudflare Account ID & API Token:** Obtain your Account ID and Pages API token from your Cloudflare dashboard.
3. Save your tokens securely into system storage.

### Step 3: Configure Your Site
1. Select **Publish Site** mode in the wizard.
2. Enter your **Site Name** (e.g., `my-digital-garden`).
3. Choose your **Scope**:
   - **Whole Vault**: Publish all notes.
   - **Folder**: Publish only notes inside a selected folder (e.g., `Published/`).
   - **Selected File**: Publish a specific note.
4. Click **Create & Launch Site**.

### Step 4: Publish & View Your Live Site
1. Click the **NoteFlare** icon in the Obsidian ribbon or sidebar panel.
2. Click **Publish Now**.
3. NoteFlare processes your Markdown, resolves `[[wikilinks]]` & images, and deploys to Cloudflare Pages.
4. Once completed, your live URL (e.g., `https://my-digital-garden.pages.dev`) will appear in the status panel. Click to view your site!

### Step 5: Updating Your Site
- Whenever you make edits in Obsidian, open the NoteFlare panel and click **Publish Now** to push instant updates.
- Enable **Automatic Background Publish** if you want edits synced automatically.

---

## Key Features

### 🚀 One-Click Publishing
Turn notes into a public website instantly. NoteFlare structures Markdown, resolves Obsidian `[[wikilinks]]`, tags, and attachments automatically.

### ⚡ Cloudflare Pages Hosting
Built and served on Cloudflare Pages using [mdgarden](https://www.npmjs.com/package/mdgarden) static site generator for global CDN speed.

### 🔒 Private Local-Authoritative Backup
Sync your vault root to a private GitHub repository on a schedule or automatically after edits.

### 🌐 Multi-Site Support
Publish multiple separate websites from one vault with independent scopes and domains.

### 🛡️ Native Keychain Security
Your GitHub and Cloudflare tokens are encrypted using your Operating System's native Keychain.

---

## Installation

### Community Plugin Store (Recommended)
1. In Obsidian, go to **Settings** > **Community plugins**.
2. Click **Browse** and search for **NoteFlare**.
3. Click **Install**, then **Enable**.

### Manual Installation
1. Download `main.js`, `styles.css`, and `manifest.json` from [Latest Releases](https://github.com/THANSHEER/obsidian-noteflare/releases).
2. Copy them to `.obsidian/plugins/obsidian-noteflare/` inside your vault.
3. Reload Obsidian and enable the plugin under Community plugins.

---

## Support

If NoteFlare helps your workflow:
- ⭐ **[Star on GitHub](https://github.com/THANSHEER/obsidian-noteflare)**
- ☕ **[Support on Ko-fi](https://ko-fi.com/P0R02009G7)**
- 💖 **[Sponsor on GitHub](https://github.com/sponsors/THANSHEER)**
