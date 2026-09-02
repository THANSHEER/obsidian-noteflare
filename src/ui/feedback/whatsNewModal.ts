import { App, Component, Modal, Setting, MarkdownRenderer } from 'obsidian';
import { NOTEFLARE_GITHUB_REPO, type GitHubReleaseNotes } from '../../api/geekstashApi';
import { getChangelogForVersion } from '../../core/changelogData';
import { renderSupportCard } from './supportCard';

/**
 * Shown after a plugin update or on demand from settings.
 * Displays the release notes formatted as rich Markdown, reliable embedded changelog fallback,
 * and the modern Support & Feedback card.
 */
export class WhatsNewModal extends Modal {
  private component = new Component();

  constructor(
    app: App,
    private version: string,
    private release: GitHubReleaseNotes | null,
  ) {
    super(app);
  }

  override onOpen(): void {
    this.component.load();
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('nf-whatsnew-modal');

    // Modal Header
    const headerEl = contentEl.createDiv({ cls: 'nf-whatsnew-header' });
    headerEl.createSpan({ cls: 'nf-version-badge', text: `v${this.version}` });
    this.titleEl.setText(`What’s new in NoteFlare`);

    // Extract release body or fall back to embedded changelog
    const body = this.release?.body?.trim() || getChangelogForVersion(this.version);

    // Render formatted markdown notes
    const notesEl = contentEl.createDiv({ cls: 'nf-whatsnew-body markdown-rendered' });
    void MarkdownRenderer.render(this.app, body, notesEl, '', this.component);

    // Support and feedback card
    renderSupportCard(contentEl, this.app);

    // Action buttons
    const releaseUrl = this.release?.htmlUrl || `https://github.com/${NOTEFLARE_GITHUB_REPO}/releases`;
    new Setting(contentEl)
      .addButton((b) => {
        b.setButtonText('View on GitHub ↗');
        b.onClick(() => {
          window.open(releaseUrl, '_blank');
        });
      })
      .addButton((b) => {
        b.setButtonText('Got it').setCta();
        b.onClick(() => {
          this.close();
        });
      });
  }

  override onClose(): void {
    this.component.unload();
    this.contentEl.empty();
  }
}
