import { App, Modal, Notice, Setting, TFolder } from 'obsidian';
import { GitHubApi } from '../../api/githubApi';
import { CloudflareApi } from '../../api/cloudflareApi';
import { DEFAULT_SETTINGS, createSiteProfile } from '../../core/settings';
import { SiteProfile } from '../../core/types';
import type NoteFlarePlugin from '../../../main';
export function buildCloudflareTokenUrl(): string {
  const perms = encodeURIComponent(JSON.stringify([
    { key: 'page', type: 'edit' },
    { key: 'workers_scripts', type: 'edit' },
    { key: 'account_settings', type: 'read' },
  ]));
  return `https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=${perms}&accountId=*&zoneId=all&name=NoteFlare`;
}

/** Normalise a site name into a valid GitHub repo / Pages project slug. */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/** Turns a raw Cloudflare error into an actionable setup message. */
export function cloudflareSetupHint(rawMessage: string, repoSlug: string): string {
  const lower = rawMessage.toLowerCase();
  if (lower.includes('rejected this token') || lower.includes('permission') || lower.includes('authentication')) {
    return 'Cloudflare rejected this token. Make sure it has the Cloudflare Pages: Edit permission, then try again.';
  }
  return `Couldn't create the Pages project. Most likely the Cloudflare GitHub App isn't authorized for ${repoSlug} yet — use “Authorize Cloudflare on GitHub”, grant access to that repo, then try again. (Cloudflare said: ${rawMessage})`;
}

/** Vault folders for the content-folder picker ('' = whole vault). */
export function folderOptions(app: App): Record<string, string> {
  const opts: Record<string, string> = { '': 'Whole vault' };
  for (const f of app.vault.getAllLoadedFiles()) {
    if (f instanceof TFolder && f.path && f.path !== '/') opts[f.path] = f.path;
  }
  return opts;
}

/**
 * End-to-end site creation, shared by the first-run wizard and the "Add site"
 * modal: create a fresh GitHub repo, then a Cloudflare Pages project pointed at
 * it. The first publish commits the user's content plus a mdgarden
 * package.json/config, which Cloudflare builds with `npx mdgarden build`. Reuses
 * the shared GitHub/Cloudflare credentials already on the plugin settings.
 */
export async function provisionSite(
  plugin: NoteFlarePlugin,
  name: string,
  profileParams: Partial<SiteProfile>,
  deployTarget: 'cloudflare' | 'github-actions' = 'cloudflare',
): Promise<SiteProfile> {
  const slug = slugify(name);
  if (!slug) throw new Error('Please enter a site name.');

  const owner = plugin.settings.githubOwner;
  const repo = plugin.settings.masterRepository;
  if (!repo) throw new Error('Please configure a Master Repository in settings first.');

  const site = createSiteProfile({
    name,
    deployTarget,
    ...profileParams,
  });

  const gh = new GitHubApi(plugin.settings.githubToken, owner, repo);
  await gh.createRepo();
  if (!(await gh.waitForRepo(30000))) {
    throw new Error('Repository creation timed out — please try again.');
  }

  let branch = 'main';
  try {
    branch = await gh.getDefaultBranch();
  } catch {
    // Keep the branch.
  }
  site.githubBranch = branch;

  let siteUrl = '';

  if (deployTarget === 'cloudflare') {
    const cf = new CloudflareApi(plugin.settings.cloudflareToken, plugin.settings.cloudflareAccount);
    const rootDir = `sites/${site.id}`;
    // Make project name unique since multiple sites share the same repo
    const projectName = slugify(`${repo}-${slug}`);
    try {
      siteUrl = await cf.createProject(projectName, owner, repo, branch, rootDir);
      site.cloudflareProject = projectName;
    } catch (createErr: unknown) {
      try {
        siteUrl = await cf.getProject(projectName);
        site.cloudflareProject = projectName;
      } catch {
        throw new Error(cloudflareSetupHint((createErr as Error).message, `${owner}/${repo}`));
      }
    }
  } else {
    // GitHub Actions: site URL will be github.io after first GH Pages build.
    siteUrl = `${owner}.github.io/${repo}`;
  }

  site.siteUrl = siteUrl;
  return site;
}

// ─── Modals ──────────────────────────────────────────────────────────────────

/** Create an additional site, reusing the already-connected credentials. */
/** Create an additional site, reusing the already-connected credentials. */
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
      .setDesc('A new GitHub repo + Cloudflare project with this name.')
      .addText(t => {
        t.setPlaceholder('my-blog');
        t.onChange(v => { name = v; });
      });

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
          li.setCssStyles({ display: 'flex' });
          li.setCssStyles({ justifyContent: 'space-between' });
          li.setCssStyles({ alignItems: 'center' });
          li.setCssStyles({ marginBottom: '4px' });
          
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
      .addButton(b =>
        b.setButtonText('Create site').setCta().onClick(async () => {
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
            });
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
        }),
      );
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

export class RemoveSiteModal extends Modal {
  private deleting = false;

  constructor(
    app: App,
    private plugin: NoteFlarePlugin,
    private site: SiteProfile,
    private onDone: () => void,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Remove this site?');

    this.contentEl.createEl('p', {
      text: `"${this.site.name || this.site.githubRepo || 'Unnamed site'}" will be removed from NoteFlare.`,
    });

    const errorEl = this.contentEl.createEl('p', { cls: 'setting-item-description' });
    errorEl.setCssStyles({ color: 'var(--text-error)' });
    errorEl.hide();

    new Setting(this.contentEl)
      .addButton(b => b.setButtonText('Cancel').onClick(() => this.close()))
      .addButton(b => {
        b.setButtonText('Remove').setDestructive();
        b.onClick(async () => {
          if (this.deleting) return;
          this.deleting = true;
          b.setDisabled(true).setButtonText('Removing...');
          errorEl.hide();

          try {
            if (this.site.isPublished) {
              try {
                // Inline unpublish logic for Cloudflare
                if (this.site.deployTarget === 'cloudflare' || (this.site.deployTarget == null && this.plugin.settings.cloudflareToken)) {
                  const cloudflare = new CloudflareApi(this.plugin.settings.cloudflareToken, this.plugin.settings.cloudflareAccount);
                  await cloudflare.deleteProject(this.site.cloudflareProject);
                }
              } catch (e) {
                console.warn('Could not unpublish site during removal:', e);
              }
            }

            const s = this.plugin.settings;
            s.sites = s.sites.filter(x => x.id !== this.site.id);
            if (s.activeSiteId === this.site.id) s.activeSiteId = s.sites[0]?.id ?? '';
            await this.plugin.saveSettings();
            this.close();
            this.onDone();
          } catch (err: unknown) {
            errorEl.setText((err as Error).message);
            errorEl.show();
            b.setDisabled(false).setButtonText('Remove');
            this.deleting = false;
          }
        });
      });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}


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
      .addButton(b =>
        b.setButtonText('Unpublish').setDestructive().onClick(async () => {
          this.close();
          await this.plugin.doUnpublish();
          this.onDone();
        }),
      );
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

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
      .addButton(b =>
        b.setButtonText('Reset').setDestructive().onClick(async () => {
          this.close();
          Object.assign(this.plugin.settings, {
            ...DEFAULT_SETTINGS,
            sites: [],
            backup: { ...DEFAULT_SETTINGS.backup },
          });
          await this.plugin.saveSettings();
          this.onDone();
        }),
      );
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

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

    let updateVisibility: () => void;
    
    new Setting(this.contentEl)
      .setName('Publish scope')
      .setDesc('Configure what to publish: the entire vault or selected files/folders.')
      .addDropdown(d => {
        d.addOption('vault', 'Full Vault');
        d.addOption('selected', 'Selected Files/Folders');
        d.setValue(s.publishScope || 'vault');
        d.onChange(async v => {
          s.publishScope = v as 'vault' | 'selected';
          await this.plugin.saveSettings();
          updateVisibility();
        });
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
          li.setCssStyles({ display: 'flex' });
          li.setCssStyles({ justifyContent: 'space-between' });
          li.setCssStyles({ alignItems: 'center' });
          li.setCssStyles({ marginBottom: '4px' });
          
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
        t.onChange(async v => {
          s.name = v.trim();
          await this.plugin.saveSettings();
        });
      });

    new Setting(this.contentEl)
      .setName('Author name')
      .setDesc('The author name written to the site metadata.')
      .addText(t => {
        t.setPlaceholder('Your Name');
        t.setValue(s.authorName || '');
        t.onChange(async v => {
          s.authorName = v.trim();
          await this.plugin.saveSettings();
        });
      });

    new Setting(this.contentEl)
      .setName('Sidebar title')
      .setDesc('Title shown in the sidebar. Defaults to the site name.')
      .addText(t => {
        t.setPlaceholder('My Digital Garden');
        t.setValue(s.sidebarTitle || '');
        t.onChange(async v => {
          s.sidebarTitle = v.trim();
          await this.plugin.saveSettings();
        });
      });

    new Setting(this.contentEl)
      .setName('Site description')
      .setDesc('Description of your site.')
      .addText(t => {
        t.setPlaceholder('Notes and thoughts…');
        t.setValue(s.siteDescription || '');
        t.onChange(async v => {
          s.siteDescription = v.trim();
          await this.plugin.saveSettings();
        });
      });

    new Setting(this.contentEl)
      .setName('Exclude patterns')
      .setDesc('One glob per line. Matching files are not published (e.g. private/**, *.private.md).')
      .addTextArea(area => {
        area.setValue(s.excludePatterns.join('\n'));
        area.inputEl.rows = 4;
        area.onChange(async v => {
          s.excludePatterns = v.split('\n').map(x => x.trim()).filter(Boolean);
          await this.plugin.saveSettings();
        });
      });

    new Setting(this.contentEl)
      .setName('Include attachments')
      .setDesc('Upload images and PDFs alongside your notes.')
      .addToggle(toggle => {
        toggle.setValue(s.includeAttachments);
        toggle.onChange(async v => {
          s.includeAttachments = v;
          await this.plugin.saveSettings();
        });
      });

    new Setting(this.contentEl)
      .addButton(b => b.setButtonText('Done').setCta().onClick(() => {
        this.close();
        this.onDone();
      }));
  }

  display(): void {
    this.contentEl.empty();
    this.onOpen();
  }

  onClose(): void {
    this.contentEl.empty();
  }
}

import { FuzzySuggestModal, TAbstractFile, TFile } from 'obsidian';

export class PathSuggestModal extends FuzzySuggestModal<TAbstractFile> {
  constructor(app: App, private onChoose: (path: string) => void) {
    super(app);
    this.setPlaceholder('Search for a file or folder...');
  }
  
  getItems(): TAbstractFile[] {
    return this.app.vault.getAllLoadedFiles().filter(f => 
      f.path !== '/' && 
      !f.path.startsWith('.') &&
      !f.path.includes('/.') &&
      (f instanceof TFolder || (f instanceof TFile && f.extension === 'md'))
    );
  }
  
  getItemText(item: TAbstractFile): string {
    return item.path;
  }
  
  onChooseItem(item: TAbstractFile, evt: MouseEvent | KeyboardEvent): void {
    this.onChoose(item.path);
  }
}
