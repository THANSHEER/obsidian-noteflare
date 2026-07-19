import { App, Modal, Setting } from 'obsidian';
import type NoteFlarePlugin from '../../../../main';

export class UnpublishModal extends Modal {
  constructor(app: App, private plugin: NoteFlarePlugin, private onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Unpublish your site?');
    this.contentEl.createEl('p', {
      text: 'Your site will go offline. Files in GitHub remain untouched — you can re-publish any time.',
    });
    new Setting(this.contentEl)
      .addButton(b => b.setButtonText('Cancel').onClick(() => this.close()))
      .addButton(b => {
        b.setButtonText('Unpublish');
        b.buttonEl.addClass('mod-warning');
        b.onClick(() => {
          void (async () => {
            this.close();
            await this.plugin.doUnpublish();
            this.onDone();
          })();
        });
      });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

/**
 * Info modal for GitHub Pages manual unpublish.
 * GitHub Pages cannot be paused via API so this shows the user exactly
 * how to disable it themselves in the GitHub repo settings.
 */
export class GitHubPagesUnpublishModal extends Modal {
  constructor(app: App, private pagesSettingsUrl: string) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Disable GitHub Pages (Manual)');
    this.contentEl.createEl('p', {
      text: 'GitHub Pages cannot be paused via the GitHub API. To take your site offline, follow these steps:',
    });
    const steps = this.contentEl.createEl('ol');
    steps.setCssStyles({ paddingLeft: '1.4em' });
    steps.createEl('li', { text: 'Click the button below to open your repository Pages settings.' });
    steps.createEl('li', { text: 'Under “Source”, change the selection from “GitHub Actions” to “None”.' });
    steps.createEl('li', { text: 'Click Save. Your site will be offline within a minute.' });
    new Setting(this.contentEl)
      .addButton(b => b.setButtonText('Cancel').onClick(() => this.close()))
      .addButton(b => {
        b.setButtonText('Open GitHub Pages settings ↗').setCta();
        b.onClick(() => { window.open(this.pagesSettingsUrl, '_blank'); this.close(); });
      });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
