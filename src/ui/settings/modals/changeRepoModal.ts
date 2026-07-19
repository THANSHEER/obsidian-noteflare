import { App, Modal, Notice, Setting } from 'obsidian';
import type NoteFlarePlugin from '../../../../main';
import { SiteProfile } from '../../../core/types';
import { createSiteProfile } from '../../../core/settings';

export class ChangeRepoModal extends Modal {
  constructor(
    app: App,
    private plugin: NoteFlarePlugin,
    private site: SiteProfile,
    private onDone: () => void,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Change Repository');
    let newRepo = '';

    new Setting(this.contentEl)
      .setName('New repository name')
      .setDesc('Enter the new GitHub repository name.')
      .addText(t => {
        t.setValue(this.site.githubRepo || this.plugin.settings.masterRepository);
        t.onChange(v => { newRepo = v.trim(); });
      });

    new Setting(this.contentEl)
      .setName('Migrate or Create New')
      .setDesc('Migrate will update this site. Create New will clone this profile for the new repo.')
      .addButton(b => b.setButtonText('Migrate').onClick(() => {
        if (!newRepo) return;
        this.site.githubRepo = newRepo;
        void this.plugin.saveSettings().then(() => {
          new Notice('Repository updated. Publish to provision the new repo.');
          this.close();
          this.onDone();
        });
      }))
      .addButton(b => b.setButtonText('Create New').setCta().onClick(() => {
        if (!newRepo) return;
        const newSite = createSiteProfile({
          ...this.site,
          name: `${this.site.name} (Copy)`,
          githubRepo: newRepo,
          cloudflareProject: '',
          siteUrl: '',
          isPublished: false,
          lastPublished: '',
          lastNoteCount: 0,
        });
        this.plugin.settings.sites.push(newSite);
        void this.plugin.saveSettings().then(() => {
          new Notice('New site profile created.');
          this.close();
          this.onDone();
        });
      }));
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
