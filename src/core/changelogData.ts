/**
 * Embedded changelog entries matching CHANGELOG.md.
 * Ensures the What's New dialog displays complete, rich release notes
 * on every plugin update, even if GitHub API is offline or rate-limited.
 */

export const CHANGELOG_REGISTRY: Record<string, string> = {
  '1.2.4': `### ✨ Added
- **Authentic Release Archives & SHA-256 Checksums**: Every release now packages official convenience archives (\`obsidian-noteflare-<version>.zip\` and \`noteflare-<version>.zip\`) along with cryptographic SHA-256 checksum files (\`.sha256\`), providing end-to-end tamper protection and integrity verification.
- **In-Plugin Release Browser & Downloads**: Added an interactive version switcher to the What's New dialog, allowing users to browse past versions, download any release \`.zip\` directly, and view/copy verified SHA-256 checksums with 1-click.
- **Rollback & Manual Installation Guide**: Built-in instructions for extracting archives into \`.obsidian/plugins/noteflare/\` and reloading plugins, making rollbacks effortless.
- **Settings Release Access**: Added a dedicated **Release history & older versions** setting in the Feedback & Support section.

### 🛠️ Fixed
- Added Git ref update retry handling during publish to gracefully recover from push conflicts.
- Hardened mirror-sync deletions logging to prevent silent deletions failures.
- Augmented \`GitHubRelease\` and \`GitHubReleaseAsset\` interfaces with comprehensive asset parsing and offline embedded fallbacks.

### 🔒 Security
- Integrated automated Sigstore build provenance (\`actions/attest-build-provenance@v2\`) across CI/CD release pipelines.`,

  '1.2.3': `### ✨ Changed
- **Modern Support & Community Card**: Redesigned the Feedback & Support settings section with a modern card UI featuring pill buttons for Ko-fi ("Support the project"), GitHub Sponsors, and Star on GitHub, along with quick links for feedback, feature requests, GitHub issues, and changelog.
- **Enhanced Changelog Experience**: Upgraded the What's New dialog to render rich formatted Markdown notes (headings, styled bullet points, badges) instead of raw text.
- **Reliable Update Notes**: Added an embedded changelog fallback to guarantee release notes display smoothly on every plugin update, even if the GitHub API is offline or rate-limited.
- **View Changelog Command**: Added **NoteFlare: View changelog** to the Obsidian Command Palette (\`Ctrl/Cmd+P\`) and a direct link inside the settings card.

### 🛠️ Fixed
- Fixed \`@typescript-eslint/no-unsafe-*\` warnings across secret storage and frontmatter transformer modules.
- Implemented \`getSettingDefinitions()\` on \`NoteFlareSettingsTab\` to comply with Obsidian 1.13+ declarative settings requirements while maintaining backward compatibility.`,

  '1.2.2': `### 🛠️ Fixed
- **Obsidian 1.13+ Support**: Fixed Setup Wizard not starting on Obsidian 1.13.0+.
- **Secure Persistence**: Integrated Obsidian's native Secret Storage API for tokens with graceful fallback.

### ✨ Changed
- Added **NoteFlare: Open setup wizard** command to the Command Palette.
- Setup Wizard launches automatically on initial install/activation.`,

  '1.2.1': `### 🔒 Security
- Replaced dynamic external scripts with native Obsidian DOM helpers.
- Enhanced CSS selector specificity for button styles.
- Cleaned up internal registry dependencies.`,

  '1.2.0': `### ✨ Added
- Direct feedback and feature request workflows.
- Automatic update notifications.
- Integrated Ko-fi support and GitHub sponsorship.`,

  '1.1.3': `### ✨ Changed
- Simplified setup flow for Cloudflare Pages.
- Better cleanup warnings when unlinking sites.

### 🛠️ Fixed
- Stability fixes for connection persistence.`,
};

export function getChangelogForVersion(version: string): string {
  const clean = version.replace(/^v/, '').trim();
  if (CHANGELOG_REGISTRY[clean]) {
    return CHANGELOG_REGISTRY[clean];
  }
  return CHANGELOG_REGISTRY['1.2.4'] || 'See full release history on GitHub.';
}

export function getEmbeddedReleases(): import('../api/geekstashApi').GitHubRelease[] {
  const repo = 'THANSHEER/obsidian-noteflare';
  return Object.entries(CHANGELOG_REGISTRY).map(([version, body]) => {
    const tagName = version;
    const recommendedZip = `obsidian-noteflare-${version}.zip`;
    const recommendedSha = `${recommendedZip}.sha256`;
    const zipName = `noteflare-${version}.zip`;
    const shaName = `${zipName}.sha256`;
    return {
      tag_name: tagName,
      name: `NoteFlare v${version}`,
      published_at: '',
      html_url: `https://github.com/${repo}/releases/tag/${tagName}`,
      body,
      prerelease: false,
      draft: false,
      assets: [
        {
          name: recommendedZip,
          browser_download_url: `https://github.com/${repo}/releases/download/${tagName}/${recommendedZip}`,
          size: 0,
          download_count: 0,
        },
        {
          name: recommendedSha,
          browser_download_url: `https://github.com/${repo}/releases/download/${tagName}/${recommendedSha}`,
          size: 64,
          download_count: 0,
        },
        {
          name: zipName,
          browser_download_url: `https://github.com/${repo}/releases/download/${tagName}/${zipName}`,
          size: 0,
          download_count: 0,
        },
        {
          name: shaName,
          browser_download_url: `https://github.com/${repo}/releases/download/${tagName}/${shaName}`,
          size: 64,
          download_count: 0,
        },
      ],
    };
  });
}
