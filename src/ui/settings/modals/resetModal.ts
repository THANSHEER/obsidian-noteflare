import { App, Modal, Setting } from 'obsidian';
import type NoteFlarePlugin from '../../../../main';
import { DEFAULT_SETTINGS } from '../../../core/settings';

export class ResetModal extends Modal {
  constructor(app: App, private plugin: NoteFlarePlugin, private onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Reset NoteFlare?');
    this.contentEl.createEl('p', {
      text: 'This clears all NoteFlare settings (tokens and every site). Your GitHub repos and Cloudflare projects will NOT be deleted.',
    });
    new Setting(this.contentEl)
      .addButton(b => b.setButtonText('Cancel').onClick(() => this.close()))
      .addButton(b => {
        b.setButtonText('Reset');
        b.buttonEl.addClass('mod-warning');
        b.onClick(() => {
          void (async () => {
            this.close();
            Object.assign(this.plugin.settings, {
              ...DEFAULT_SETTINGS,
              sites: [],
              backup: { ...DEFAULT_SETTINGS.backup },
            });
            await this.plugin.saveSettings();
            this.onDone();
          })();
        });
      });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
