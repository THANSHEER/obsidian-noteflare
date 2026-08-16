import { App, Modal } from 'obsidian';
import { uninstallFormUrl } from '../../api/geekstashApi';

/**
 * Shown from the plugin unload path while Obsidian is still open. NoteFlare
 * doesn't collect uninstall feedback itself — "Tell us why" just opens the
 * Geekstash website form (Turnstile + submission live there). See API.md.
 */
export class UninstallFeedbackModal extends Modal {
  private resolved = false;

  constructor(
    app: App,
    private onFinished?: () => void,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Leaving NoteFlare?');
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('nf-feedback-modal');

    contentEl.createEl('p', {
      cls: 'nf-uninstall-message',
      text: 'Sorry to see you go. If you have a moment, tell us why in your browser — it helps us improve. You can skip this.',
    });

    const row = contentEl.createDiv({ cls: 'nf-uninstall-actions' });
    const skip = row.createEl('button', { text: 'Skip' });
    skip.addEventListener('click', () => this.finish());

    const tell = row.createEl('button', { text: 'Tell us why', cls: 'mod-cta' });
    tell.addEventListener('click', () => {
      window.open(uninstallFormUrl(), '_blank');
      this.finish();
    });
  }

  onClose(): void {
    this.contentEl.empty();
    if (!this.resolved) {
      this.resolved = true;
      this.onFinished?.();
    }
  }

  private finish(): void {
    this.resolved = true;
    this.onFinished?.();
    this.close();
  }
}
