import { App, Modal, Notice, Setting } from 'obsidian';
import type NoteFlarePlugin from '../../../../main';
import { SiteProfile } from '../../../core/types';
import { PathSuggestModal } from './pathSuggestModal';
import { slugify, provisionSite } from './helpers';

export class AddSiteModal extends Modal {
  constructor(app: App, private plugin: NoteFlarePlugin, private onDone: () => void) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Add a site');
    let name = '';
    let scope: 'vault' | 'selected' = 'vault';
    let paths: string[] = [];
    let authorName = '';
    let sidebarTitle = '';
    let siteDescription = '';

    new Setting(this.contentEl)
      .setName('Site name')
      .setDesc('Used as the GitHub repository name and site identifier.')
      .addText(t => {
        t.setPlaceholder('my-blog');
        t.onChange(v => { name = v; });
      });

    // Cloudflare Pages is the only supported hosting provider.
    const hostingProvider: SiteProfile['hostingProvider'] = 'cloudflare';

    new Setting(this.contentEl)
      .setName('Publish scope')
      .setDesc('Configure what to publish: the entire vault or selected files/folders.')
      .addDropdown(d => {
        d.addOption('vault', 'Full Vault');
        d.addOption('selected', 'Selected Files/Folders');
        d.setValue('vault');
        d.onChange(v => {
          scope = v as 'vault' | 'selected';
          updateVisibility();
        });
      });

    const pathsContainer = this.contentEl.createDiv('noteflare-paths-container');
    
    const renderPaths = () => {
      pathsContainer.empty();
      if (scope === 'vault') {
        pathsContainer.setCssStyles({ display: 'none' });
        return;
      }
      pathsContainer.setCssStyles({ display: 'block' });
      
      if (paths.length === 0) {
        pathsContainer.createEl('p', { text: 'No files or folders selected.', cls: 'noteflare-muted' });
      } else {
        const list = pathsContainer.createEl('ul', { cls: 'noteflare-path-list' });
        for (let i = 0; i < paths.length; i++) {
          const li = list.createEl('li');
          li.setCssStyles({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' });
          li.createSpan({ text: paths[i] });
          const removeBtn = li.createEl('button', { text: '✕' });
          removeBtn.addEventListener('click', () => {
            paths.splice(i, 1);
            renderPaths();
          });
        }
      }

      const addRow = pathsContainer.createDiv('noteflare-add-path-row');
      addRow.setCssStyles({ marginTop: '8px' });
      
      const addBtn = addRow.createEl('button', { text: 'Browse Vault...' });
      addBtn.setCssStyles({ width: '100%' });
      addBtn.addEventListener('click', () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          if (selectedPath.trim() && !paths.includes(selectedPath.trim())) {
            paths.push(selectedPath.trim());
            renderPaths();
          }
        }).open();
      });
    };

    const updateVisibility = () => {
      renderPaths();
    };

    new Setting(this.contentEl)
      .setName('Author name')
      .setDesc('Author name written to site metadata (optional).')
      .addText(t => {
        t.setPlaceholder('Your Name');
        t.onChange(v => { authorName = v.trim(); });
      });

    new Setting(this.contentEl)
      .setName('Sidebar title')
      .setDesc('Title shown in the sidebar (optional, defaults to site name).')
      .addText(t => {
        t.setPlaceholder('My Digital Garden');
        t.onChange(v => { sidebarTitle = v.trim(); });
      });

    new Setting(this.contentEl)
      .setName('Site description')
      .setDesc('Description of your site (optional).')
      .addText(t => {
        t.setPlaceholder('Notes and thoughts…');
        t.onChange(v => { siteDescription = v.trim(); });
      });

    updateVisibility();

    const errorEl = this.contentEl.createEl('p', { cls: 'setting-item-description' });
    errorEl.setCssStyles({ color: 'var(--text-error)' });
    errorEl.hide();

    new Setting(this.contentEl)
      .addButton(b => b.setButtonText('Cancel').onClick(() => this.close()))
      .addButton(b => {
        b.setButtonText('Create site').setCta();
        b.onClick(() => { void (async () => {
          if (!slugify(name)) {
            errorEl.setText('Please enter a site name.');
            errorEl.show();
            return;
          }
          errorEl.hide();
          b.setDisabled(true).setButtonText('Creating…');
          try {
            const site = await provisionSite(this.plugin, name, {
              publishScope: scope,
              publishPaths: paths,
              authorName,
              sidebarTitle,
              siteDescription,
            }, hostingProvider);
            this.plugin.settings.sites.push(site);
            this.plugin.settings.activeSiteId = site.id;
            await this.plugin.saveSettings();
            this.close();
            new Notice(`Site “${site.name}” created.`);
            this.onDone();
          } catch (err: unknown) {
            errorEl.setText((err as Error).message);
            errorEl.show();
            b.setDisabled(false).setButtonText('Create site');
          }
        })(); });
      });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
