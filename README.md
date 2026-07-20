<div align="center">
  <img src="https://raw.githubusercontent.com/THANSHEER/obsidian-noteflare/main/assets/logo.svg" alt="NoteFlare Logo" width="200" />

  # NoteFlare for Obsidian

  **Bridging the gap between your local Obsidian vault and the open web.**<br>
  *Powered by the [mdgarden](https://www.npmjs.com/package/mdgarden) static site generator.*

  [![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/THANSHEER/obsidian-noteflare?style=for-the-badge&logo=github)](https://github.com/THANSHEER/obsidian-noteflare/releases)
  [![Obsidian Downloads](https://img.shields.io/badge/Obsidian-Community_Plugin-7A36F4?style=for-the-badge&logo=obsidian)](https://obsidian.md/plugins)
  [![License: GPL v3](https://img.shields.io/badge/License-GPL_v3-blue.svg?style=for-the-badge)](https://github.com/THANSHEER/obsidian-noteflare/blob/main/LICENSE)

  [Overview](#overview) • [Features](#key-features) • [Installation](#installation) • [Getting Started](#getting-started) • [Contributing](#contributing)

</div>

---

## Overview

**NoteFlare** is a powerful desktop plugin for [Obsidian](https://obsidian.md/) that allows you to seamlessly publish and backup your digital garden without touching a terminal, writing scripts, or managing backend services. 

With a few clicks, you can turn your vault into a stunning, fully-functional website, or create automated private backups of your knowledge base.

### See it in action: Publishing Notes
<div align="center">
  <img src="https://raw.githubusercontent.com/THANSHEER/obsidian-noteflare/main/assets/obsidian-noteflare-publish.webp" alt="Publish Notes Demo" style="max-width: 100%; border-radius: 8px;" />
</div>

---

## Key Features

### One-Click Publishing
Instantly turn your vault, a specific folder, or a single note into a beautiful, free website. NoteFlare automatically structures your content, applies metadata, and handles the deployment pipeline.

### Cloudflare Pages Hosting
Your site is built and served by **Cloudflare Pages** — lightning-fast global CDN with automated, zero-config build triggers. NoteFlare pushes your content to a private GitHub repository, and Cloudflare Pages automatically picks it up, runs the [mdgarden](https://www.npmjs.com/package/mdgarden) build, and deploys your site. No terminal, no CI config needed.

### Private Local-Authoritative Backup
Never lose a note again. NoteFlare provides a strict one-way mirror from your local vault to a private GitHub repository. Set it to sync automatically after edits, or on a recurring schedule.

### Multi-Site Management
Manage multiple distinct digital gardens from a single vault. Each site runs in complete isolation with its own repository, domain, and publish scope.

### Enterprise-Grade Security
Your GitHub and Cloudflare API tokens are never stored in plain text. NoteFlare leverages your Operating System's native encrypted keychain to ensure your credentials are safe.

**Sharing Settings Across Vaults:** Because Obsidian plugins store settings per-vault, a new vault won't automatically have your API tokens. However, NoteFlare makes it easy to reuse them securely! Simply copy the `data.json` file from your first vault (`.obsidian/plugins/obsidian-noteflare/data.json`) and paste it into the same folder in your second vault. 

As long as you are on the **same computer**, this works perfectly. The second vault will securely load the encrypted tokens, unlock them using your computer's System Keychain, and log you in immediately!

---

## Installation

You can install NoteFlare directly from the Obsidian Community Plugins store:

1. Open Obsidian and navigate to **Settings** > **Community plugins**.
2. Turn off **Restricted Mode** if it is enabled.
3. Click **Browse** and search for **"NoteFlare"**.
4. Click **Install**, and then **Enable**.

### Manual Installation
If you prefer to install manually from the [GitHub Repository](https://github.com/THANSHEER/obsidian-noteflare):
1. Download the `main.js`, `styles.css`, and `manifest.json` from the [Latest Release](https://github.com/THANSHEER/obsidian-noteflare/releases).
2. Place these files in a new folder located at: `[YourVault]/.obsidian/plugins/obsidian-noteflare/`.
3. Reload Obsidian and enable the plugin.

---

## Getting Started

NoteFlare features a beautiful Guided Setup Wizard that gets you online in minutes.

<div align="center">
  <img src="https://raw.githubusercontent.com/THANSHEER/obsidian-noteflare/main/assets/obsidian-noteflare-onboarding.webp" alt="Onboarding Demo" style="max-width: 100%; border-radius: 8px;" />
</div>

1. **Connect Accounts:** Open the NoteFlare settings and enter your GitHub token (and Cloudflare token, if you prefer Cloudflare hosting). The wizard will guide you to the exact links you need to generate these.
2. **Choose Your Path:** 
   - Select **Publish** to set up a public website.
   - Select **Backup** to establish a secure remote mirror of your vault.
3. **Configure & Launch:** Choose what folder to publish or backup. Once complete, manage your deployments directly from the sleek NoteFlare sidebar panel!

### Advanced Settings
Tailor your site structure, backup frequency, and deployment hooks directly inside NoteFlare's advanced configuration panel:

<div align="center">
  <img src="https://raw.githubusercontent.com/THANSHEER/obsidian-noteflare/main/assets/obsidian-noteflare-advance-settings.webp" alt="Advanced Settings Demo" style="max-width: 100%; border-radius: 8px;" />
</div>

---

## Architecture under the hood

NoteFlare utilizes the powerful **mdgarden** open-source static site generator as its build engine. When you hit publish, NoteFlare seamlessly prepares your Markdown, resolves local Obsidian `[[wikilinks]]` and attachments, and packages a build manifest. This is securely pushed to GitHub where your chosen CI/CD pipeline takes over. 

---

## Contributing

We love community contributions! Whether you're squashing bugs, improving documentation, or adding new features, your help is welcome.

Please refer to our [Contributing Guide](CONTRIBUTING.md) to learn how to:
- Set up your local development environment
- Run local builds and type-checking
- Format your Pull Requests

### Reporting Issues

If you encounter any bugs, unexpected behavior, or have feature requests, please report them on our [GitHub Issues](https://github.com/THANSHEER/obsidian-noteflare/issues) page. Your feedback is essential for making NoteFlare better!

<div align="center">
  <a href="https://github.com/THANSHEER/obsidian-noteflare">
    <img src="https://img.shields.io/badge/View_Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="View on GitHub"/>
  </a>
</div>

---

