import { App, Modal, Setting } from 'obsidian';
import { feedbackFormUrl } from '../../api/geekstashApi';

const TOPICS: Record<string, string> = {
  general: 'General',
  publishing: 'Publishing',
  backup: 'Backup',
  ui: 'Interface',
  other: 'Other',
};

/**
 * NoteFlare doesn't collect or submit feedback itself — it hands off to the
 * Geekstash website form (Turnstile + submission live there). See API.md.
 */
export class FeedbackModal extends Modal {
  private topic: string;

  constructor(app: App, defaultTopic = 'general') {
    super(app);
    this.topic = defaultTopic in TOPICS ? defaultTopic : 'general';
  }

  onOpen(): void {
    this.titleEl.setText('Send feedback');
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('nf-feedback-modal');

    contentEl.createEl('p', {
      cls: 'setting-item-description',
      text: 'Feedback opens in your browser on the Geekstash site — it only takes a minute.',
    });

    new Setting(contentEl).setName('Topic').addDropdown((d) => {
      for (const [id, label] of Object.entries(TOPICS)) {
        d.addOption(id, label);
      }
      d.setValue(this.topic);
      d.onChange((v) => {
        this.topic = v;
      });
    });

    new Setting(contentEl)
      .addButton((b) => b.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((b) => {
        b.setButtonText('Open feedback form').setCta();
        b.onClick(() => {
          window.open(feedbackFormUrl(this.topic), '_blank');
          this.close();
        });
      });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
