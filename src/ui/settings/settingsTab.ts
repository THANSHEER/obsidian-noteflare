import { App, PluginSettingTab, Setting, ButtonComponent } from 'obsidian';
import { SetupStep } from '../../core/types';
import type NoteFlarePlugin from '../../../main';
import { provisionSite, slugify, buildCloudflareTokenUrl, AddSiteModal, RemoveSiteModal, ResetModal, EditSiteModal, PathSuggestModal } from './siteModals';
import { GitHubApi } from '../../api/githubApi';
import { CloudflareApi } from '../../api/cloudflareApi';

const GITHUB_TOKEN_URL = 'https://github.com/settings/tokens/new?scopes=repo,workflow&description=NoteFlare';
const CLOUDFLARE_APP_URL = 'https://github.com/apps/cloudflare-workers-and-pages/installations/new';
const CLOUDFLARE_TOKEN_URL = buildCloudflareTokenUrl();

export class NoteFlareSettingsTab extends PluginSettingTab {
  plugin: NoteFlarePlugin;
  private wizardStep: SetupStep = 'github';
  private pendingName = '';
  private pendingScope: 'vault' | 'selected' = 'vault';
  private pendingPaths: string[] = [];
  private pendingDeployTarget: 'github-actions' | 'cloudflare' = 'github-actions';
  private hasInitializedWizard = false;

  constructor(app: App, plugin: NoteFlarePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void { this.render(); }

  render(): void {
    const { containerEl } = this;
    containerEl.empty();

    const hasCreds = !!(this.plugin.settings.githubToken);
    const setupComplete = this.plugin.settings.setupComplete;
    const needsSetup = !setupComplete || !hasCreds ||
      (this.plugin.settings.enablePublish && this.plugin.settings.sites.length === 0);
    if (needsSetup || (this.wizardStep === 'done' && this.hasInitializedWizard)) {
      if (!this.hasInitializedWizard) {
        this.wizardStep = this.getInitialWizardStep();
        this.hasInitializedWizard = true;
      }
      this.renderWizard(containerEl);
    } else {
      this.renderManagePanel(containerEl);
    }
  }

  // ─── Wizard (first run: collect credentials + create the first site) ────────

  private renderWizard(el: HTMLElement): void {
    this.renderWizardHeader(el);
    if (this.wizardStep === 'github') this.renderStep1(el);
    else if (this.wizardStep === 'mode') this.renderStepMode(el);
    else if (this.wizardStep === 'deploy-target') this.renderStepDeployTarget(el);
    else if (this.wizardStep === 'cloudflare') this.renderStep2(el);
    else this.renderStep3(el);
  }

  private renderStep1(el: HTMLElement): void {
    new Setting(el).setName('Connect your account').setHeading();
    el.createEl('p', {
      cls: 'setting-item-description',
      text: 'One secure connection powers publishing and optional private backups. Your token is encrypted with your operating system keychain.',
    });

    let tokenValue = this.plugin.settings.githubToken;
    const tokenSetting = new Setting(el).setName('Access token');
    tokenSetting.descEl.appendText('Create a token with the ');
    tokenSetting.descEl.createEl('strong', { text: 'repo' });
    tokenSetting.descEl.appendText(' and ');
    tokenSetting.descEl.createEl('strong', { text: 'workflow' });
    tokenSetting.descEl.appendText(' scopes. Stored encrypted in your OS keychain, never logged. ');
    tokenSetting.descEl.createEl('a', {
      text: 'Create token ↗',
      href: GITHUB_TOKEN_URL,
      attr: { target: '_blank', rel: 'noopener' },
    });
    tokenSetting.addText(text => {
      text.setPlaceholder('ghp_…');
      text.inputEl.type = 'password';
      text.setValue(tokenValue);
      text.onChange(v => { tokenValue = v.trim(); });
    });

    const errorEl = this.createErrorEl(el);

    new Setting(el).addButton(btn => {
      btn.setButtonText('Verify & continue').setCta();
      btn.onClick(async () => {
        if (!tokenValue) return this.showError(errorEl, 'Please enter your GitHub token.');
        this.hideError(errorEl);
        this.busy(btn, 'Verifying…');

        try {
          const username = await new GitHubApi(tokenValue, '', '').getAuthenticatedUser();

          this.plugin.settings.githubToken = tokenValue;
          this.plugin.settings.githubOwner = username;
          await this.plugin.saveSettings();

          this.wizardStep = 'mode';
          this.render();
        } catch (err: unknown) {
          const msg = (err as Error).message;
          this.showError(
            errorEl,
            /invalid/i.test(msg)
              ? 'Token invalid or missing the repo scope. Check it and try again.'
              : msg,
          );
          this.idle(btn, 'Verify & continue');
        }
      });
    });
  }

  /** Step 2: choose the outcomes NoteFlare should manage. */
  private renderStepMode(el: HTMLElement): void {
    new Setting(el).setName('Choose your experience').setHeading();
    el.createEl('p', {
      cls: 'setting-item-description',
      text: 'Start with either feature or use both. You can change this later.',
    });

    let enableBackup = this.plugin.settings.enableBackup;
    let enablePublish = this.plugin.settings.enablePublish;

    new Setting(el)
      .setName('Automatic private backup')
      .setDesc('Protect your vault quietly in the background with no manual steps or file selection.')
      .addToggle(t => {
        t.setValue(enableBackup);
        t.onChange(v => { enableBackup = v; });
      });

    new Setting(el)
      .setName('Publish a website')
      .setDesc('Turn selected notes into a fast public site with one-click updates.')
      .addToggle(t => {
        t.setValue(enablePublish);
        t.onChange(v => { enablePublish = v; });
      });

    const errorEl = this.createErrorEl(el);

    new Setting(el)
      .addButton(back => {
        back.setButtonText('Back');
        back.onClick(() => { this.wizardStep = 'github'; this.render(); });
      })
      .addButton(btn => {
        btn.setButtonText('Continue').setCta();
        btn.onClick(async () => {
          if (!enableBackup && !enablePublish) {
            return this.showError(errorEl, 'Please enable at least one feature.');
          }
          this.hideError(errorEl);
          this.plugin.settings.enableBackup = enableBackup;
          this.plugin.settings.enablePublish = enablePublish;

          if (enableBackup && !this.plugin.settings.backup.repository) {
            this.plugin.settings.backup.repository = this.plugin.defaultBackupRepository();
          }

          if (enablePublish) {
            this.wizardStep = 'deploy-target';
          } else {
            this.plugin.settings.setupComplete = true;
            await this.plugin.saveSettings();
            this.wizardStep = 'done';
          }
          await this.plugin.saveSettings();
          this.render();
        });
      });
  }

  /** Step 3 (publish path): choose deploy target — GitHub Actions or Cloudflare. */
  private renderStepDeployTarget(el: HTMLElement): void {
    new Setting(el).setName('Create your site').setHeading();
    el.createEl('p', {
      cls: 'setting-item-description',
      text: 'Choose what to publish and where NoteFlare should host it.',
    });

    let siteName = this.pendingName || 'noteflare-site';
    new Setting(el)
      .setName('Site name')
      .setDesc('Used for your site address. Lowercase letters, numbers, and dashes work best.')
      .addText(text => {
        text.setPlaceholder('my-notes');
        text.setValue(siteName);
        text.onChange(value => { siteName = value; });
      });

    let scope = this.pendingScope;
    let paths = [...this.pendingPaths];

    let updateVisibility: () => void;

    new Setting(el)
      .setName('Publish scope')
      .setDesc('Configure what to publish: the entire vault or selected files/folders.')
      .addDropdown(d => {
        d.addOption('vault', 'Full Vault');
        d.addOption('selected', 'Selected Files/Folders');
        d.setValue(scope);
        d.onChange(v => {
          scope = v as 'vault' | 'selected';
          updateVisibility();
        });
      });

    const pathsContainer = el.createDiv('noteflare-paths-container');
    
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

      // Add new path
      const addRow = pathsContainer.createDiv('noteflare-add-path-row');
      addRow.setCssStyles({ marginTop: '8px' });
      
      const addBtn = addRow.createEl('button', { text: 'Browse Vault...' });
      addBtn.setCssStyles({ width: '100%' });
      addBtn.addEventListener('click', () => {
        new PathSuggestModal(this.app, (selectedPath) => {
          if (!paths.includes(selectedPath)) {
            paths.push(selectedPath);
            renderPaths();
          }
        }).open();
      });
    };

    updateVisibility = () => {
      renderPaths();
    };
    updateVisibility();

    new Setting(el).setName('Hosting Provider').setHeading();

    new Setting(el)
      .setName('Simple hosting (GitHub Pages)')
      .setDesc('Free, automated hosting via GitHub Actions with no extra accounts. Perfect for a fast, simple setup.')
      .addButton(btn => {
        btn.setButtonText(this.pendingDeployTarget === 'github-actions' ? '✓ Selected' : 'Select');
        if (this.pendingDeployTarget === 'github-actions') btn.setCta();
        btn.onClick(() => {
          this.pendingName = siteName;
          this.pendingScope = scope;
          this.pendingPaths = paths;
          this.pendingDeployTarget = 'github-actions';
          this.render();
        });
      });

    new Setting(el)
      .setName('Cloudflare hosting')
      .setDesc('Premium features: global CDN, instant deployment toggles, and custom domains. Requires connecting a free Cloudflare account.')
      .addButton(btn => {
        btn.setButtonText(this.pendingDeployTarget === 'cloudflare' ? '✓ Selected' : 'Select');
        if (this.pendingDeployTarget === 'cloudflare') btn.setCta();
        btn.onClick(() => {
          this.pendingName = siteName;
          this.pendingScope = scope;
          this.pendingPaths = paths;
          this.pendingDeployTarget = 'cloudflare';
          this.render();
        });
      });

    const errorEl = this.createErrorEl(el);
    new Setting(el)
      .addButton(back => {
        back.setButtonText('Back');
        back.onClick(() => { this.wizardStep = 'mode'; this.render(); });
      })
      .addButton(btn => {
        btn.setButtonText('Continue').setCta();
        btn.onClick(() => {
          if (!slugify(siteName)) {
            this.showError(errorEl, 'Please enter a site name.');
            return;
          }
          this.pendingName = siteName;
          this.pendingScope = scope;
          this.pendingPaths = paths;
          this.wizardStep = 'cloudflare';
          this.render();
        });
      });
  }

  private renderStep2(el: HTMLElement): void {
    const deployTarget = this.pendingDeployTarget;
    const repoSlug = `${this.plugin.settings.githubOwner}/${slugify(this.pendingName)}`;
    const cfRequired = deployTarget === 'cloudflare';

    new Setting(el).setName(
      cfRequired ? 'Connect Cloudflare' : 'Launch your site'
    ).setHeading();
    el.createEl('p', {
      cls: 'setting-item-description',
      text: cfRequired
        ? 'Cloudflare hosts the site for free and lets NoteFlare take it online or offline without deleting content. Two one-time clicks in your browser:'
        : 'NoteFlare will create a GitHub repo and push a GitHub Actions workflow that builds and deploys your site to GitHub Pages.',
    });

    let cfToken = this.plugin.settings.cloudflareToken;
    let cfAccount = this.plugin.settings.cloudflareAccount;

    if (cfRequired) {
      const tokenStep = new Setting(el).setName('1. Create a Cloudflare API token');
      tokenStep.descEl.appendText('Opens with Pages, Workers and Account permissions pre-selected — click through to create it, then copy it. ');
      tokenStep.descEl.createEl('a', {
        text: 'Create token ↗',
        href: CLOUDFLARE_TOKEN_URL,
        attr: { target: '_blank', rel: 'noopener' },
      });

      const appStep = new Setting(el).setName('2. Authorize Cloudflare on GitHub');
      appStep.descEl.appendText('Grant the “Cloudflare Workers and Pages” app access to your ');
      appStep.descEl.createEl('code', { text: repoSlug });
      appStep.descEl.appendText(' repo — Cloudflare needs this to build the site. ');
      appStep.descEl.createEl('a', {
        text: 'Authorize ↗',
        href: CLOUDFLARE_APP_URL,
        attr: { target: '_blank', rel: 'noopener' },
      });

      new Setting(el)
        .setName('Cloudflare API token')
        .setDesc('Stored encrypted in your OS keychain and never logged.')
        .addText(text => {
          text.setPlaceholder('Paste API token…');
          text.inputEl.type = 'password';
          text.setValue(cfToken);
          text.onChange(v => { cfToken = v.trim(); });
        });

      new Setting(el)
        .setName('Cloudflare account ID')
        .setDesc('Optional — NoteFlare detects this automatically from your token.')
        .addText(text => {
          text.setPlaceholder('Auto-detected');
          text.setValue(cfAccount);
          text.onChange(v => { cfAccount = v.trim(); });
        });
    } else {
      new Setting(el)
        .setName('Ready to create')
        .setDesc('NoteFlare will provision the site and prepare its first deployment automatically.');
    }

    const errorEl = this.createErrorEl(el);

    new Setting(el)
      .addButton(back => {
        back.setButtonText('Back');
        back.onClick(() => { this.wizardStep = 'deploy-target'; this.render(); });
      })
      .addButton(btn => {
        btn.setButtonText(cfRequired ? 'Connect & create site' : 'Create site').setCta();
        btn.onClick(async () => {
          if (cfRequired && !cfToken) {
            return this.showError(errorEl, 'Please paste your Cloudflare API token.');
          }
          this.hideError(errorEl);
          this.busy(btn, cfRequired ? 'Checking token…' : 'Creating your site…');

          try {
            if (cfRequired) {
              let accountId = cfAccount;
              if (!accountId) {
                this.busy(btn, 'Detecting account…');
                accountId = await new CloudflareApi(cfToken, '').getAccountId();
              }
              this.plugin.settings.cloudflareToken = cfToken;
              this.plugin.settings.cloudflareAccount = accountId;
              await this.plugin.saveSettings();
            }

            this.busy(btn, 'Creating your site…');
            const site = await provisionSite(
              this.plugin,
              this.pendingName,
              {
                publishScope: this.pendingScope,
                publishPaths: this.pendingPaths,
              },
              deployTarget
            );
            this.plugin.settings.sites.push(site);
            this.plugin.settings.activeSiteId = site.id;
            this.plugin.settings.setupComplete = true;
            await this.plugin.saveSettings();

            this.wizardStep = 'done';
            this.render();
          } catch (err: unknown) {
            this.showError(errorEl, (err as Error).message);
            this.idle(btn, cfRequired ? 'Connect & create site' : 'Create site');
          }
        });
      });
  }

  private renderStep3(el: HTMLElement): void {
    const site = this.plugin.getActiveSite();
    new Setting(el).setName('You’re ready').setHeading();

    const done = new Setting(el).setName(
      site ? 'Your site is ready to publish' : 'Automatic backup is ready',
    );
    if (site?.siteUrl) {
      done.descEl.appendText('Site: ');
      done.descEl.createEl('a', {
        text: `https://${site.siteUrl}`,
        href: `https://${site.siteUrl}`,
        attr: { target: '_blank', rel: 'noopener' },
      });
    } else {
      done.setDesc('NoteFlare will protect your vault quietly using your chosen schedule.');
    }

    new Setting(el)
      .addButton(later => {
        later.setButtonText(site ? "I'll publish later" : 'Open settings');
        later.onClick(async () => {
          this.plugin.settings.setupComplete = true;
          await this.plugin.saveSettings();
          this.hasInitializedWizard = false;
          if (site) this.closeSettings();
          else this.render();
        });
      })
      .addButton(btn => {
        btn.setButtonText(site ? 'Publish now' : 'Back up now').setCta();
        btn.onClick(async () => {
          this.plugin.settings.setupComplete = true;
          await this.plugin.saveSettings();
          this.hasInitializedWizard = false;
          this.closeSettings();
          if (site) await this.plugin.doPublish();
          else await this.plugin.doBackup(false);
        });
      });
  }

  // ─── Manage panel (multi-site) ─────────────────────────────────────────────

  private renderManagePanel(el: HTMLElement): void {
    const s = this.plugin.settings;
    // const site = this.plugin.getActiveSite();

    const optsSetting = new Setting(el);
    optsSetting.setName('Options');
    optsSetting.setHeading();

    new Setting(el)
      .setName('Open panel in')
      .setDesc('Where the NoteFlare panel should open by default when clicking the ribbon icon or running the command.')
      .addDropdown(d => {
        d.addOption('left', 'Left sidebar');
        d.addOption('right', 'Right sidebar');
        d.addOption('tab', 'Main workspace tab');
        d.setValue(s.defaultViewLocation ?? 'left');
        d.onChange(async v => {
          s.defaultViewLocation = v as 'left' | 'right' | 'tab';
          await this.plugin.saveSettings();
        });
      });

    new Setting(el).setName('Features').setHeading();
    new Setting(el)
      .setName('Publish a website')
      .setDesc('Keep one-click publishing available in the NoteFlare panel.')
      .addToggle(toggle => {
        toggle.setValue(s.enablePublish);
        toggle.onChange(async value => {
          s.enablePublish = value;
          await this.plugin.saveSettings();
          this.render();
        });
      });

    new Setting(el)
      .setName('Automatic private backup')
      .setDesc('Protect your vault in the background without manual version-control steps.')
      .addToggle(toggle => {
        toggle.setValue(s.enableBackup);
        toggle.onChange(async value => {
          s.enableBackup = value;
          if (value && !s.backup.repository) {
            s.backup.repository = this.plugin.defaultBackupRepository();
          }
          await this.plugin.saveSettings();
          this.render();
        });
      });

    if (s.enableBackup) {
      new Setting(el).setName('Backup').setHeading();



      new Setting(el)
        .setName('After changes')
        .setDesc('Run a backup 30 seconds after vault files change.')
        .addToggle(toggle => {
          toggle.setValue(s.backup.backupOnChange);
          toggle.onChange(async value => {
            s.backup.backupOnChange = value;
            await this.plugin.saveSettings();
          });
        });

      new Setting(el)
        .setName('Schedule')
        .setDesc('Periodic backups run while Obsidian is open.')
        .addDropdown(dropdown => {
          dropdown.addOption('0', 'Off');
          dropdown.addOption('15', 'Every 15 minutes');
          dropdown.addOption('30', 'Every 30 minutes');
          dropdown.addOption('60', 'Every hour');
          dropdown.addOption('360', 'Every 6 hours');
          dropdown.addOption('1440', 'Daily');
          dropdown.setValue(String(s.backup.intervalMinutes));
          dropdown.onChange(async value => {
            s.backup.intervalMinutes = Number(value);
            await this.plugin.saveSettings();
          });
        });

      const backupStatus = s.backup.lastBackupError
        ? `Needs attention: ${s.backup.lastBackupError}`
        : s.backup.lastBackupAt
          ? `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}`
          : 'Your first backup has not run yet.';
      new Setting(el)
        .setName('Backup status')
        .setDesc(backupStatus)
        .addButton(button => {
          button.setButtonText('Back up now').setCta();
          button.onClick(async () => {
            button.setDisabled(true).setButtonText('Backing up…');
            await this.plugin.doBackup(false);
            this.render();
          });
        });
    }

    if (!s.enablePublish) {
      this.renderDangerZone(el);
      return;
    }

    // ── Global Config ──
    new Setting(el).setName('Global Configuration').setHeading();
    new Setting(el)
      .setName('Master Repository')
      .setDesc(`GitHub repository to host all your sites: ${s.githubOwner}/${s.masterRepository || 'noteflare-sites'}`)
      .addText(t => {
        t.setPlaceholder('noteflare-sites');
        t.setValue(s.masterRepository || 'noteflare-sites');
        t.onChange(async v => {
          s.masterRepository = v.trim();
          await this.plugin.saveSettings();
        });
      });

    // ── Sites List ──
    new Setting(el).setName('Your Sites').setHeading();
    
    if (s.sites.length === 0) {
      el.createEl('p', { cls: 'setting-item-description', text: 'No sites yet — add one to get started.' });
    } else {
      for (const site of s.sites) {
        const isLive = site.isPublished;
        const statusText = site.lastPublished
            ? `Last published ${new Date(site.lastPublished).toLocaleString()} · ${site.lastNoteCount} notes`
            : 'Not published yet';
            
        const siteSetting = new Setting(el)
          .setName(site.name || site.cloudflareProject || 'Site')
          .setDesc(`${isLive ? '🟢 Live' : '⚪ Offline'} — ${statusText}`);

        if (site.siteUrl) {
          siteSetting.addExtraButton(b =>
            b.setIcon('external-link').setTooltip('Open site').onClick(() => {
              window.open(`https://${site.siteUrl}`, '_blank');
            }),
          );
        }
        
        siteSetting.addButton(b => 
          b.setButtonText('Edit').onClick(() => {
            new EditSiteModal(this.app, this.plugin, site, () => this.render()).open();
          })
        );
        
        siteSetting.addButton(b =>
          b.setButtonText('Remove').setDestructive().onClick(() => {
            new RemoveSiteModal(this.app, this.plugin, site, () => this.render()).open();
          })
        );
      }
    }

    new Setting(el)
      .addButton(b => b.setButtonText('Add site').setCta().onClick(() => {
        new AddSiteModal(this.app, this.plugin, () => this.render()).open();
      }));

    this.renderDangerZone(el);
  }

  private renderDangerZone(el: HTMLElement): void {
    new Setting(el).setName('Danger zone').setHeading();
    new Setting(el)
      .setName('Reset NoteFlare')
      .setDesc('Clears all NoteFlare settings (tokens + every site) and restarts setup. Your GitHub repos and Cloudflare projects are NOT deleted.')
      .addButton(b => {
        b.setButtonText('Reset').setDestructive();
        b.onClick(() => new ResetModal(this.app, this.plugin, () => {
          this.wizardStep = 'github';
          this.pendingName = '';
          this.pendingScope = 'vault';
          this.pendingPaths = [];
          this.render();
        }).open());
      });
  }

  // ─── Helpers ─────────────────────────────────────────────────────────────

  private renderWizardHeader(container: HTMLElement): void {
    const current = this.wizardStep === 'github'
      ? 1
      : this.wizardStep === 'mode'
        ? 2
        : this.wizardStep === 'done'
          ? 4
          : 3;
    const labels = ['Connect', 'Choose', 'Configure', 'Ready'];
    
    new Setting(container)
      .setName(`Setup: Step ${current} of 4 — ${labels[current - 1]}`)
      .setHeading();
      
    container.createEl('p', {
      text: 'Publish polished note sites and keep your vault protected from one focused workspace.',
      cls: 'setting-item-description',
    });
  }

  private createErrorEl(container: HTMLElement): HTMLElement {
    const el = container.createEl('p', { cls: 'setting-item-description' });
    el.setCssStyles({ color: 'var(--text-error)' });
    el.hide();
    return el;
  }

  private showError(el: HTMLElement, msg: string): void {
    el.setText(msg);
    el.show();
  }

  private hideError(el: HTMLElement): void {
    el.hide();
  }

  private busy(btn: ButtonComponent, label: string): void {
    btn.setDisabled(true).setButtonText(label);
  }

  private idle(btn: ButtonComponent, label: string): void {
    btn.setDisabled(false).setButtonText(label);
  }

  private getInitialWizardStep(): SetupStep {
    const s = this.plugin.settings;
    if (s.githubToken && s.githubOwner) return 'mode';
    return 'github';
  }

  private closeSettings(): void {
    const setting = ((this.app as unknown) as Record<string, unknown>).setting as
      | { close?: () => void }
      | undefined;
    setting?.close?.();
  }
}
