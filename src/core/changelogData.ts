/**
 * Embedded changelog entries matching CHANGELOG.md.
 * Ensures the What's New dialog displays complete, rich release notes
 * on every plugin update, even if GitHub API is offline or rate-limited.
 */

export const CHANGELOG_REGISTRY: Record<string, string> = {
  '1.2.3': `### ✨ Improvements
- **Modern Support & Community Card**: Redesigned the Feedback & Support settings section with a modern card UI featuring pill buttons for Ko-fi ("Support the project"), GitHub Sponsors, and Star on GitHub, along with quick links for feedback, feature requests, GitHub issues, and changelog.
- **Enhanced Changelog Experience**: Upgraded the What's New dialog to render rich formatted Markdown notes (headings, styled bullet points, badges) instead of raw text.
- **Reliable Update Notes**: Added an embedded changelog fallback to guarantee release notes display smoothly on every plugin update, even if the GitHub API is offline or rate-limited.
- **View Changelog Command**: Added **NoteFlare: View changelog** to the Obsidian Command Palette (\`Ctrl/Cmd+P\`) and a direct link inside the settings card.

### 🛠️ Fixes & Compliance
- Fixed \`@typescript-eslint/no-unsafe-*\` warnings across secret storage and frontmatter transformer modules.
- Implemented \`getSettingDefinitions()\` on \`NoteFlareSettingsTab\` to comply with Obsidian 1.13+ declarative settings requirements while maintaining backward compatibility.`,

  '1.2.2': `### 🛠️ Fixes
- **Obsidian 1.13+ Support**: Fixed Setup Wizard not starting on Obsidian 1.13.0+.
- **Secure Persistence**: Integrated Obsidian's native Secret Storage API for tokens with graceful fallback.

### ✨ Improvements
- Added **NoteFlare: Open setup wizard** command to the Command Palette.
- Setup Wizard launches automatically on initial install/activation.`,

  '1.2.1': `### 🔒 Security & Compliance
- Replaced dynamic external scripts with native Obsidian DOM helpers.
- Enhanced CSS selector specificity for button styles.
- Cleaned up internal registry dependencies.`,

  '1.2.0': `### ✨ Features & Feedback
- Direct feedback and feature request workflows.
- Automatic update notifications.
- Integrated Ko-fi support and GitHub sponsorship.`,

  '1.1.3': `### ⚡ Improvements
- Simplified setup flow for Cloudflare Pages.
- Better cleanup warnings when unlinking sites.
- Stability fixes for connection persistence.`,
};

export function getChangelogForVersion(version: string): string {
  const clean = version.replace(/^v/, '').trim();
  if (CHANGELOG_REGISTRY[clean]) {
    return CHANGELOG_REGISTRY[clean];
  }
  return CHANGELOG_REGISTRY['1.2.3'] || 'See full release history on GitHub.';
}
