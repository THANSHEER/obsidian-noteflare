import { App, Modal, Setting } from 'obsidian';
import type NoteFlarePlugin from '../../../../main';

export class UnpublishModal extends Modal {
  constructor(app: App, private plugin: NoteFlarePlugin, private onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Unpublish your site?');
    this.contentEl.createEl('p', {
      text: 'Your site will go offline. Files in repository remain untouched — you can re-publish any time.',
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
