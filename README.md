<div align="center">
  <img src="public/logo/noteflare.svg" alt="NoteFlare Logo" width="140" />

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

With just a few clicks, convert your entire vault (or selected folders/notes) into a fast, public website hosted on **Cloudflare Workers** (1-Click API Upload, zero GitHub authorization needed) or **Cloudflare Pages** (legacy Git integration).

---

## Demos

### 🎬 Introduction & Setup
<div align="center">
  <img src="public/assets/demo-intro.gif" alt="NoteFlare Intro Demo" width="100%" style="border-radius: 8px;" />
</div>

### 🎬 Publishing Your Notes
<div align="center">
  <img src="public/assets/demo-publish.gif" alt="NoteFlare Publishing Demo" width="100%" style="border-radius: 8px;" />
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
   - **GitHub Personal Access Token:** Generate a token with `repo` permissions.
   - **Cloudflare API Token:** Obtain your API token from Cloudflare.
3. Save your tokens securely into system storage.

### Step 3: Configure Your Site
1. Select **Publish Site** mode in the wizard.
2. Choose your **Hosting Engine**:
   - **Cloudflare Workers (Recommended)**: 1-Click direct upload — **zero GitHub App authorization required**.
   - **Cloudflare Pages (Legacy)**: Git-backed deployment (*requires one-time GitHub App authorization*).
3. Choose your **Publish Scope**:
   - **Whole Vault**: Publish all notes.
   - **Folder / Selected Files**: Publish only selected paths.
4. Click **Create & Launch Site**.

### Step 4: Publish & View Your Live Site
1. Click the **NoteFlare** icon in the Obsidian ribbon or sidebar panel.
2. Click **Publish Now**.
3. NoteFlare packages your Markdown, resolves `[[wikilinks]]` & images, and deploys directly.
4. Your live URL will appear in the status panel. Click to view your live site!

---

## Key Features

### 🚀 1-Click Cloudflare Workers Publishing
Publish directly via Cloudflare API. **No GitHub App authorization, webhooks, or manual approval steps required!**

### ⚡ Global CDN Speed
Built and served on Cloudflare's edge network using the [mdgarden](https://www.npmjs.com/package/mdgarden) static site generator.

### 🔒 Private Local-Authoritative Backup
Sync your vault root to a private GitHub repository on a schedule or automatically after edits.

### 🌐 Multi-Site Support
Publish multiple separate digital gardens from one vault with independent scopes and domains.

### 🛡️ Native Keychain Security
Your API tokens are encrypted using your Operating System's native Keychain.

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
