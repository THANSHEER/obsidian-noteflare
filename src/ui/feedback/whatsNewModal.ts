import { App, Modal, Setting } from 'obsidian';
import type { GitHubReleaseNotes } from '../../api/geekstashApi';
import { FeedbackModal } from './feedbackModal';
import { mountKofiWidget } from './kofiWidget';

/**
 * Shown after a plugin update. Displays the GitHub release body,
 * the official Ko-fi support widget, and a shortcut to send feedback.
 */
export class WhatsNewModal extends Modal {
  constructor(
    app: App,
    private version: string,
    private release: GitHubReleaseNotes | null,
  ) {
    super(app);
  }

  onOpen(): void {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('nf-feedback-modal');

    const title = this.release?.name?.trim() || `NoteFlare ${this.version}`;
    this.titleEl.setText(`What's new — ${title}`);

    contentEl.createEl('p', {
      cls: 'setting-item-description',
      text: `Updated to ${this.version}. Here’s what changed:`,
    });

    const notes = contentEl.createDiv({ cls: 'nf-release-notes' });
    const body = this.release?.body?.trim();
    if (body) {
      // Keep it plain text — release markdown can be noisy in a modal.
      notes.createEl('pre', { cls: 'nf-release-body', text: body });
    } else {
      notes.createEl('p', {
        cls: 'setting-item-description',
        text: 'Release notes for this version are not available yet. You can still view the full release history on GitHub.',
      });
    }

    const releaseUrl = this.release?.htmlUrl;
    if (releaseUrl) {
      new Setting(contentEl).addButton((b) => {
        b.setButtonText(body ? 'View release on GitHub' : 'View releases on GitHub');
        b.onClick(() => {
          window.open(releaseUrl, '_blank');
        });
      });
    }

    // Official Ko-fi Widget_2 (black button, same as site embed).
    const support = contentEl.createDiv({ cls: 'nf-kofi-support' });
    support.createEl('p', {
      cls: 'nf-whatsnew-feedback-prompt',
      text: 'If NoteFlare helps you, you can support development on Ko-fi.',
    });
    const kofiHost = support.createDiv({ cls: 'nf-kofi-widget-host' });
    void mountKofiWidget(kofiHost);

    contentEl.createEl('p', {
      cls: 'nf-whatsnew-feedback-prompt',
      text: 'How’s the update going? We’d love your feedback.',
    });

    new Setting(contentEl)
      .addButton((b) => {
        b.setButtonText('Give feedback').setCta();
        b.onClick(() => {
          this.close();
          new FeedbackModal(this.app, 'general').open();
        });
      })
      .addButton((b) =>
        b.setButtonText('Dismiss').onClick(() => {
          this.close();
        }),
      );
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
