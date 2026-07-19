import { App, Modal, Setting } from 'obsidian';
import type NoteFlarePlugin from '../../../../main';
import { SiteProfile } from '../../../core/types';
import { PathSuggestModal } from './pathSuggestModal';
import { ChangeRepoModal } from './changeRepoModal';
import { slugify } from './helpers';


export class EditSiteModal extends Modal {
  constructor(
    app: App,
    private plugin: NoteFlarePlugin,
    private site: SiteProfile,
    private onDone: () => void,
  ) {
    super(app);
  }

  onOpen(): void {
    const s = this.site;
    this.titleEl.setText(`Settings for ${s.name || s.cloudflareProject || 'Site'}`);
    this.render();
  }

  private render(): void {
    this.contentEl.empty();
    const s = this.site;

    new Setting(this.contentEl).setName('Publishing rules').setHeading();

    new Setting(this.contentEl)
      .setName('GitHub repository')
      .setDesc('The repository linked to this site.')
      .addText(t => {
        t.setValue(s.githubRepo || this.plugin.settings.masterRepository);
        t.setDisabled(true);
      })
      .addButton(b => b.setButtonText('Change Repo').onClick(() => {
        new ChangeRepoModal(this.app, this.plugin, s, () => this.render()).open();
      }));

    let updateVisibility: () => void;
    
    new Setting(this.contentEl)
      .setName('Publish scope')
      .setDesc('Configure what to publish: the entire vault or selected files/folders.')
      .addDropdown(d => {
        d.addOption('vault', 'Full Vault');
        d.addOption('selected', 'Selected Files/Folders');
        d.setValue(s.publishScope || 'vault');
        d.onChange((v) => { void (async () => {
          s.publishScope = v as 'vault' | 'selected';
          await this.plugin.saveSettings();
          updateVisibility();
        })(); });
      });

    const pathsContainer = this.contentEl.createDiv('noteflare-paths-container');
    
    const renderPaths = () => {
      pathsContainer.empty();
      if ((s.publishScope || 'vault') === 'vault') {
        pathsContainer.setCssStyles({ display: 'none' });
        return;
      }
      pathsContainer.setCssStyles({ display: 'block' });
      
      const paths = s.publishPaths || [];
      if (paths.length === 0) {
        pathsContainer.createEl('p', { text: 'No files or folders selected.', cls: 'noteflare-muted' });
      } else {
        const list = pathsContainer.createEl('ul', { cls: 'noteflare-path-list' });
        for (let i = 0; i < paths.length; i++) {
          const li = list.createEl('li');
          li.setCssStyles({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' });
          
          li.createSpan({ text: paths[i] });
          const removeBtn = li.createEl('button', { text: '✕' });
          removeBtn.addEventListener('click', () => { void (async () => {
            s.publishPaths?.splice(i, 1);
            await this.plugin.saveSettings();
            renderPaths();
          })(); });
        }
      }

      const addRow = pathsContainer.createDiv('noteflare-add-path-row');
      addRow.setCssStyles({ marginTop: '8px' });
      
      const addBtn = addRow.createEl('button', { text: 'Browse Vault...' });
      addBtn.setCssStyles({ width: '100%' });
      addBtn.addEventListener('click', () => {
        new PathSuggestModal(this.app, (selectedPath) => { void (async () => {
          if (selectedPath.trim()) {
            if (!s.publishPaths) s.publishPaths = [];
            if (!s.publishPaths.includes(selectedPath.trim())) {
              s.publishPaths.push(selectedPath.trim());
              await this.plugin.saveSettings();
              renderPaths();
            }
          }
        })(); }).open();
      });
    };

    updateVisibility = () => {
      renderPaths();
    };
    updateVisibility();

    // Customizations
    new Setting(this.contentEl).setName('Site Customization').setHeading();

    new Setting(this.contentEl)
      .setName('Site name')
      .setDesc('Internal name for this site.')
      .addText(t => {
        t.setValue(s.name || '');
        t.onChange((v) => { void (async () => {
          s.name = v.trim();
          await this.plugin.saveSettings();
        })(); });
      });

    new Setting(this.contentEl)
      .setName('Author name')
      .setDesc('The author name written to the site metadata.')
      .addText(t => {
        t.setPlaceholder('Your Name');
        t.setValue(s.authorName || '');
        t.onChange((v) => { void (async () => {
          s.authorName = v.trim();
          await this.plugin.saveSettings();
        })(); });
      });

    new Setting(this.contentEl)
      .setName('Sidebar title')
      .setDesc('Title shown in the sidebar. Defaults to the site name.')
      .addText(t => {
        t.setPlaceholder('My Digital Garden');
        t.setValue(s.sidebarTitle || '');
        t.onChange((v) => { void (async () => {
          s.sidebarTitle = v.trim();
          await this.plugin.saveSettings();
        })(); });
      });

    new Setting(this.contentEl)
      .setName('Site description')
      .setDesc('Description of your site.')
      .addText(t => {
        t.setPlaceholder('Notes and thoughts…');
        t.setValue(s.siteDescription || '');
        t.onChange((v) => { void (async () => {
          s.siteDescription = v.trim();
          await this.plugin.saveSettings();
        })(); });
      });

    new Setting(this.contentEl)
      .setName('Exclude patterns')
      .setDesc('One glob per line. Matching files are not published (e.g. private/**, *.private.md).')
      .addTextArea(area => {
        area.setValue(s.excludePatterns.join('\n'));
        area.inputEl.rows = 4;
        area.onChange((v) => { void (async () => {
          s.excludePatterns = v.split('\n').map(x => x.trim()).filter(Boolean);
          await this.plugin.saveSettings();
        })(); });
      });

    new Setting(this.contentEl)
      .setName('Include attachments')
      .setDesc('Upload images and PDFs alongside your notes.')
      .addToggle(toggle => {
        toggle.setValue(s.includeAttachments);
        toggle.onChange((v) => { void (async () => {
          s.includeAttachments = v;
          await this.plugin.saveSettings();
        })(); });
      });

    new Setting(this.contentEl)
      .addButton(b => b.setButtonText('Done').setCta().onClick(() => {
        this.close();
        this.onDone();
      }));
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
