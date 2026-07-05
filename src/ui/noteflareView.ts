import { ItemView, WorkspaceLeaf, setIcon, Setting } from 'obsidian';
import { AddSiteModal, UnpublishModal, EditSiteModal, RemoveSiteModal, PathSuggestModal } from './settings/siteModals';
import type NoteFlarePlugin from '../../main';

export const VIEW_TYPE_NOTEFLARE = 'noteflare-panel';

const CLOUDFLARE_APP_URL = 'https://github.com/apps/cloudflare-workers-and-pages/installations/new';

/**
 * Focused publishing panel. Backup runs quietly in the background and is
 * configured from NoteFlare settings.
 */
export class NoteFlareView extends ItemView {
  constructor(leaf: WorkspaceLeaf, private plugin: NoteFlarePlugin) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE_NOTEFLARE;
  }

  getDisplayText(): string {
    return 'NoteFlare';
  }

  getIcon(): string {
    return this.plugin.getActiveSite()?.isPublished ? 'cloud-check' : 'cloud-upload';
  }

  async onOpen(): Promise<void> {
    await this.render();
  }

  async onClose(): Promise<void> {
    // nothing to clean up
  }

  refresh(): void {
    void this.render();
  }

  private async render(): Promise<void> {
    const root = this.containerEl.children[1] as HTMLElement;
    root.empty();
    root.addClass('noteflare-view');

    const s = this.plugin.settings;
    
    if (!s.setupComplete) {
      root.createEl('p', {
        text: 'Finish setup to publish your notes and protect your vault with automatic backups.',
        cls: 'setting-item-description',
      });
      const setupBtn = root.createEl('button', { text: 'Open setup', cls: 'mod-cta' });
      setupBtn.setCssStyles({ marginTop: '10px' });
      setupBtn.addEventListener('click', () => this.plugin.openSettingsTab());
      return;
    }

    const content = root.createEl('div', { cls: 'noteflare-tab-content' });
    if (s.enablePublish) {
      await this.renderPublish(content);
    } else {
      const backup = content.createEl('div');
      backup.createEl('h3', { text: 'Your vault is protected' });
      backup.createEl('p', {
        text: s.backup.lastBackupAt
          ? `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}`
          : 'Your first backup will run automatically.',
        cls: 'setting-item-description',
      });
      const settingsButton = backup.createEl('button', { text: 'Backup settings', cls: 'mod-cta' });
      settingsButton.setCssStyles({ marginTop: '10px' });
      settingsButton.addEventListener('click', () => this.plugin.openSettingsTab());
    }
  }

  private async renderPublish(root: HTMLElement): Promise<void> {
    const s = this.plugin.settings;
    const site = this.plugin.getActiveSite();

    if (!site) {
      root.createEl('p', {
        text: 'No publish sites configured.',
        cls: 'noteflare-muted',
      });
      const createBtn = root.createEl('button', { text: 'Quick create site', cls: 'mod-cta' });
      createBtn.addEventListener('click', () => {
        new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
      });
      return;
    }



    // ── Header: Site switcher, Status, Add Site ───────────────────────────────
    const isLive = site.isPublished;
    new Setting(root)
      .setName('Current Site')
      .setDesc(`Status: ${isLive ? '🟢 Live' : '⚪ Offline'}`)
      .addDropdown(d => {
        for (const sp of s.sites) {
          d.addOption(sp.id, sp.name || sp.githubRepo);
        }
        d.setValue(site.id);
        d.onChange(async id => {
          s.activeSiteId = id;
          await this.plugin.saveSettings();
          void this.render();
        });
      })
      .addButton(b => {
        b.setIcon('plus').setTooltip('Create another site').onClick(() => {
          new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
        });
      });

    // ── Site Publish Settings ────────────────────────────────────────────────
    let updateVisibility: () => void;

    new Setting(root)
      .setName('Publish scope')
      .setDesc('Configure what to publish: the entire vault or selected files/folders.')
      .addDropdown(d => {
        d.addOption('vault', 'Full Vault');
        d.addOption('selected', 'Selected Files/Folders');
        d.setValue(site.publishScope || 'vault');
        d.onChange(async v => {
          site.publishScope = v as 'vault' | 'selected';
          updateVisibility();
          await this.plugin.saveSettings();
        });
      });

    const pathsContainer = root.createDiv('noteflare-paths-container');
    pathsContainer.setCssStyles({
      paddingLeft: '1.5em',
      paddingRight: '1.5em',
      paddingBottom: '1em'
    });
    
    const renderPaths = () => {
      pathsContainer.empty();
      if ((site.publishScope || 'vault') === 'vault') {
        pathsContainer.setCssStyles({ display: 'none' });
        return;
      }
      pathsContainer.setCssStyles({ display: 'block' });
      
      const addRow = pathsContainer.createDiv('noteflare-add-path-row');
      addRow.setCssStyles({ marginTop: '8px' });
      
      const addBtn = addRow.createEl('button', { text: 'Browse Vault...' });
      addBtn.setCssStyles({ width: '100%' });
      addBtn.addEventListener('click', () => {
        new PathSuggestModal(this.app, (selectedPath) => { void (async () => {
          if (!site.publishPaths) site.publishPaths = [];
          if (!site.publishPaths.includes(selectedPath)) {
            site.publishPaths.push(selectedPath);
            await this.plugin.saveSettings();
            renderPaths();
          }
        })(); }).open();
      });

      const paths = site.publishPaths || [];
      if (paths.length === 0) {
        const p = pathsContainer.createEl('p', { text: 'No files or folders selected.', cls: 'setting-item-description' });
        p.setCssStyles({ marginTop: '12px' });
      } else {
        const chipContainer = pathsContainer.createDiv();
        chipContainer.setCssStyles({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginTop: '12px',
          maxHeight: '150px',
          overflowY: 'auto',
          padding: '4px 0'
        });

        for (let i = 0; i < paths.length; i++) {
          const chip = chipContainer.createDiv();
          chip.setCssStyles({
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 8px',
            background: 'var(--background-modifier-form-field)',
            border: '1px solid var(--background-modifier-border)',
            borderRadius: 'var(--radius-s)',
            fontSize: 'var(--font-ui-smaller)'
          });
          
          const iconSpan = chip.createSpan();
          const abstractFile = this.app.vault.getAbstractFileByPath(paths[i]);
          const isFolder = abstractFile && 'children' in abstractFile;
          setIcon(iconSpan, isFolder ? 'folder' : 'file-text');
          iconSpan.setCssStyles({
            display: 'flex',
            alignItems: 'center',
            color: 'var(--text-muted)',
            width: '14px',
            height: '14px'
          });
          
          chip.createSpan({ text: paths[i] });
          const removeBtn = chip.createSpan({ cls: 'clickable-icon' });
          setIcon(removeBtn, 'x');
          removeBtn.setCssStyles({
            display: 'flex',
            alignItems: 'center',
            padding: '0',
            width: '14px',
            height: '14px'
          });
          removeBtn.addEventListener('click', () => { void (async () => {
            site.publishPaths?.splice(i, 1);
            await this.plugin.saveSettings();
            renderPaths();
          })(); });
        }
      }
    };

    updateVisibility = () => {
      renderPaths();
    };
    updateVisibility();

    // ── Advanced Customization ──────────────────────────────────────────────
    new Setting(root)
      .setName('Advanced Settings')
      .setDesc('Configure metadata, styling, and exclusions for this site.')
      .addButton(b => {
        b.setButtonText('Edit settings').onClick(() => {
          new EditSiteModal(this.app, this.plugin, site, () => this.refresh()).open();
        });
      });

    // ── Status and Deploy Info ───────────────────────────────────────────────
    const deployTarget = site.deployTarget ?? (s.cloudflareToken ? 'cloudflare' : 'github-actions');
    const targetLabel = deployTarget === 'cloudflare' ? 'Cloudflare Pages' : 'GitHub Actions';
    
    const deploySetting = new Setting(root)
      .setName('Deployment Info')
      .setDesc(`Deploy: ${targetLabel}`);

    if (site.siteUrl) {
      deploySetting.addButton(b => {
        b.setIcon('external-link').setButtonText('Open Site').onClick(() => {
          window.open(`https://${site.siteUrl}`, '_blank');
        });
      });
    }

    if (deployTarget === 'cloudflare') {
      new Setting(root)
        .setName('GitHub Connection')
        .setDesc('If Cloudflare says "Disconnected from Git", click here to grant access to your repository.')
        .addButton(b => b.setButtonText('Grant Access').onClick(() => {
          window.open(CLOUDFLARE_APP_URL, '_blank');
        }));
    }

    // ── Actions ──────────────────────────────────────────────────────────────
    const actionSetting = new Setting(root).setName('Actions');
    
    actionSetting.controlEl.setCssStyles({
      display: 'flex',
      flexDirection: 'row',
      gap: '8px',
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
    });

    actionSetting
      .addButton(b => {
        b.setButtonText('Publish')
         .setCta()
         .onClick(async () => {
           b.setDisabled(true);
           b.setButtonText('Publishing...');
           try {
             await this.plugin.doPublish();
           } finally {
             b.setDisabled(false);
             b.setButtonText('Publish');
           }
         });
      })
      .addButton(b => {
        b.setButtonText('Unpublish');
        if (!site.isPublished) b.setDisabled(true);
        else b.setDestructive();
        b.onClick(() => {
          new UnpublishModal(this.app, this.plugin, () => this.refresh()).open();
        });
      })
      .addButton(b => {
        b.setButtonText('Delete')
         .setDestructive()
         .onClick(() => {
           new RemoveSiteModal(this.app, this.plugin, site, () => {
             this.refresh();
           }).open();
         });
      });
  }
}