import { ItemView, WorkspaceLeaf, setIcon, Setting } from 'obsidian';
import { AddSiteModal, UnpublishModal, EditSiteModal, RemoveSiteModal, PathSuggestModal, GitHubPagesUnpublishModal } from './settings/modals';
import type NoteFlarePlugin from '../../main';
import type { LiveSiteStatus } from '../../main';
import { SiteProfile } from '../core/types';


export const VIEW_TYPE_NOTEFLARE = 'noteflare-panel';

const CLOUDFLARE_APP_URL = 'https://github.com/apps/cloudflare-workers-and-pages/installations/new';

/** Format an ISO date string to a relative time like "3 min ago". */
function relativeTime(iso: string): string {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  if (isNaN(diffMs)) return '';
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

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
    // Fetch live status in background when panel opens.
    const site = this.plugin.getActiveSite();
    if (site) void this.plugin.fetchLiveStatus(site);
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
      const settingsButton = backup.createEl('button', { text: 'Backup options', cls: 'mod-cta' });
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

    // ── Single source of truth: derive all status from persisted SiteProfile ──
    const isPublishing = !!this.plugin.publishInProgress[site.id];
    const hasFailed = site.lastPublishFailed && !isPublishing;
    const isLive = site.isPublished && !hasFailed;
    const live = this.plugin.liveStatus[site.id] ?? null;

    // ── Header: Site switcher ─────────────────────────────────────────────────
    new Setting(root)
      .setName('Current site')
      .addDropdown(d => {
        for (const sp of s.sites) {
          d.addOption(sp.id, sp.name || sp.githubRepo);
        }
        d.setValue(site.id);
        d.onChange((id) => { void (async () => {
          s.activeSiteId = id;
          await this.plugin.saveSettings();
          void this.render();
        })(); });
      })
      .addButton(b => {
        b.setIcon('plus').setTooltip('Create another site').onClick(() => {
          new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
        });
      });

    // ── Live Status Dashboard ─────────────────────────────────────────────────
    this.renderStatusDashboard(root, site, isLive, hasFailed, isPublishing, live);

    // ── Cloudflare reconnect warning ─────────────────────────────────────────
    if (
      site.hostingProvider === 'cloudflare' &&
      site.lastPublishError &&
      /disconnect|git account/i.test(site.lastPublishError)
    ) {
      const warnBanner = root.createDiv('nf-cf-warn-banner');
      warnBanner.createEl('strong', { text: '⚠ Cloudflare disconnected from GitHub' });
      warnBanner.createEl('p', {
        text: 'Your last build failed because Cloudflare lost access to your GitHub repository. Click below to re-authorize, then publish again.',
      });
      const reconnectBtn = warnBanner.createEl('button', { text: 'Re-authorize Cloudflare ↗', cls: 'mod-cta' });
      reconnectBtn.addEventListener('click', () => { window.open(CLOUDFLARE_APP_URL, '_blank'); });
    }

    // ── Site Publish Scope ───────────────────────────────────────────────────
    let updateVisibility: () => void;

    new Setting(root)
      .setName('Publish scope')
      .setDesc('Configure what to publish: the entire vault or selected files/folders.')
      .addDropdown(d => {
        d.addOption('vault', 'Full Vault');
        d.addOption('selected', 'Selected Files/Folders');
        d.setValue(site.publishScope || 'vault');
        d.onChange((v) => { void (async () => {
          site.publishScope = v as 'vault' | 'selected';
          updateVisibility();
          await this.plugin.saveSettings();
        })(); });
      });

    const pathsContainer = root.createDiv('noteflare-paths-container');
    pathsContainer.setCssStyles({
      paddingLeft: '0',
      paddingRight: '0',
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
      .setName('Advanced')
      .setDesc('Configure metadata, styling, and exclusions for this site.')
      .addButton(b => {
        b.setButtonText('Edit').onClick(() => {
          new EditSiteModal(this.app, this.plugin, site, () => this.refresh()).open();
        });
      });

    // ── Actions ──────────────────────────────────────────────────────────────
    this.renderActions(root, site, isLive, hasFailed, isPublishing);
  }

  /** Render the live status dashboard card. */
  private renderStatusDashboard(
    root: HTMLElement,
    site: SiteProfile,
    isLive: boolean,
    hasFailed: boolean,
    isPublishing: boolean,
    live: LiveSiteStatus | null,
  ): void {
    const card = root.createDiv('nf-status-card');
    card.setCssStyles({
      marginBottom: '12px',
      padding: '12px 14px',
      border: '1px solid var(--background-modifier-border)',
      borderRadius: 'var(--radius-m)',
      backgroundColor: 'var(--background-primary-alt)',
    });

    // ── Row 1: Status badge + Refresh ────────────────────────────────────────
    const headerRow = card.createDiv();
    headerRow.setCssStyles({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '10px',
    });

    // Derive the badge from single source of truth
    let badgeEmoji = '⚪';
    let badgeText = 'Offline';
    let badgeColor = 'var(--text-muted)';

    if (isPublishing) {
      badgeEmoji = '🔵';
      badgeText = 'Publishing…';
      badgeColor = 'var(--text-accent)';
    } else if (hasFailed) {
      badgeEmoji = '🔴';
      badgeText = 'Last publish failed';
      badgeColor = 'var(--text-error)';
    } else if (isLive) {
      // If we have live data, show the actual workflow conclusion
      if (live && !live.loading && live.workflowStatus === 'completed') {
        if (live.workflowConclusion === 'success') {
          badgeEmoji = '🟢';
          badgeText = 'Live';
          badgeColor = 'var(--text-success)';
        } else if (live.workflowConclusion === 'failure') {
          badgeEmoji = '🔴';
          badgeText = site.hostingProvider === 'cloudflare' ? 'Build failed on Cloudflare' : 'Build failed on GitHub';
          badgeColor = 'var(--text-error)';
        } else if (live.workflowConclusion === 'cancelled') {
          badgeEmoji = '🟡';
          badgeText = 'Build cancelled';
          badgeColor = 'var(--color-yellow)';
        }
      } else if (live && live.workflowStatus === 'in_progress') {
        badgeEmoji = '🔵';
        badgeText = site.hostingProvider === 'cloudflare' ? 'Building on Cloudflare…' : 'Building on GitHub…';
        badgeColor = 'var(--text-accent)';
      } else {
        badgeEmoji = '🟢';
        badgeText = 'Live';
        badgeColor = 'var(--text-success)';
      }
    }

    const badgeEl = headerRow.createEl('span');
    badgeEl.setCssStyles({ fontWeight: '600', color: badgeColor, fontSize: 'var(--font-ui-medium)' });
    badgeEl.setText(`${badgeEmoji} ${badgeText}`);

    // Refresh button (right side)
    const refreshBtn = headerRow.createEl('button', { text: live?.loading ? '…' : '↻ Refresh' });
    refreshBtn.setCssStyles({ fontSize: 'var(--font-ui-smaller)', padding: '2px 8px' });
    if (live?.loading) refreshBtn.setAttr('disabled', 'true');
    refreshBtn.addEventListener('click', () => {
      const s = this.plugin.getActiveSite();
      if (s) void this.plugin.fetchLiveStatus(s);
    });

    // ── Row 2: Details grid ───────────────────────────────────────────────────
    const grid = card.createDiv();
    grid.setCssStyles({
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '6px 16px',
      fontSize: 'var(--font-ui-smaller)',
      color: 'var(--text-muted)',
    });

    const addRow = (label: string, value: string, href?: string) => {
      const labelEl = grid.createEl('span', { text: label });
      labelEl.setCssStyles({ fontWeight: '500', color: 'var(--text-normal)' });
      if (href && value) {
        const linkEl = grid.createEl('a', { text: value, href });
        linkEl.setCssStyles({ color: 'var(--text-accent)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' });
        linkEl.addEventListener('click', (e) => { e.preventDefault(); window.open(href, '_blank'); });
      } else {
        const valEl = grid.createEl('span', { text: value || '—' });
        valEl.setCssStyles({ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' });
      }
    };

    // Site URL
    addRow('Site URL', site.siteUrl ? site.siteUrl : '—', site.siteUrl ? `https://${site.siteUrl.replace(/^https?:\/\//, '')}` : undefined);

    // Host
    const hostLabel = site.hostingProvider === 'cloudflare' ? 'Cloudflare Pages'
      : site.hostingProvider === 'github-pages' ? 'GitHub Pages'
      : site.hostingProvider;
    addRow('Host', hostLabel);

    if (live && !live.loading) {
      // Repository link
      addRow(
        'Repository',
        `${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`,
        live.repoHtmlUrl || `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`,
      );

      // Last push time
      addRow('Last push', live.repoPushedAt ? relativeTime(live.repoPushedAt) : '—');

      // Commit
      if (live.commitSha) {
        addRow(
          'Last commit',
          `${live.commitSha}${live.commitMessage ? ` — ${live.commitMessage.slice(0, 40)}` : ''}`,
          live.commitSha ? `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}/commits` : undefined,
        );
        addRow('Committed', relativeTime(live.commitDate));
      }

      // Workflow run
      if ((site.hostingProvider === 'github-pages' || site.hostingProvider === 'cloudflare') && live.workflowStatus) {
        const wfLabel = live.workflowStatus === 'in_progress' ? '🔄 Building…'
          : live.workflowConclusion === 'success' ? '✅ Passed'
          : live.workflowConclusion === 'failure' ? '❌ Failed'
          : live.workflowConclusion === 'cancelled' ? '⛔ Cancelled'
          : live.workflowStatus;
        addRow('Build', wfLabel, live.workflowUrl || undefined);
        addRow('Build ran', relativeTime(live.workflowUpdatedAt));
      }

      // Fetched at
      if (live.fetchedAt) {
        const fetchedEl = card.createEl('p', { text: `Status fetched ${relativeTime(live.fetchedAt)}` });
        fetchedEl.setCssStyles({ margin: '8px 0 0 0', fontSize: 'var(--font-ui-smaller)', color: 'var(--text-faint)' });
      }
    } else if (live?.loading) {
      const loadingEl = card.createEl('p', { text: 'Fetching live status…' });
      loadingEl.setCssStyles({ margin: '6px 0 0 0', fontSize: 'var(--font-ui-smaller)', color: 'var(--text-muted)' });
    } else {
      // No live data yet — show cached info
      addRow(
        'Repository',
        `${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`,
        `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`,
      );
      if (site.lastPublished) {
        addRow('Last published', relativeTime(site.lastPublished));
        addRow('Notes', String(site.lastNoteCount));
      }
    }

    // ── Error display ────────────────────────────────────────────────────────
    if (hasFailed && site.lastPublishError) {
      const errEl = card.createEl('p', { text: `⚠ ${site.lastPublishError}` });
      errEl.setCssStyles({
        margin: '8px 0 0 0',
        fontSize: 'var(--font-ui-smaller)',
        color: 'var(--text-error)',
        wordBreak: 'break-word',
      });
    }

    // ── Backup status ────────────────────────────────────────────────────────
    if (this.plugin.settings.enableBackup) {
      const backupEl = card.createEl('p');
      backupEl.setCssStyles({ margin: '8px 0 0 0', fontSize: 'var(--font-ui-smaller)', color: 'var(--text-muted)', borderTop: '1px solid var(--background-modifier-border)', paddingTop: '8px' });
      const backupText = this.plugin.settings.backup.lastBackupError
        ? `Backup: ⚠ ${this.plugin.settings.backup.lastBackupError}`
        : this.plugin.settings.backup.lastBackupAt
          ? `Backup: ✓ ${relativeTime(this.plugin.settings.backup.lastBackupAt)}`
          : 'Backup: not run yet';
      backupEl.setText(backupText);
    }
  }

  /** Render the Publish / Unpublish / Delete action buttons. */
  private renderActions(
    root: HTMLElement,
    site: SiteProfile,
    isLive: boolean,
    hasFailed: boolean,
    isPublishing: boolean,
  ): void {
    const actionBox = root.createDiv('nf-actions-box');
    actionBox.setCssStyles({
      marginTop: '8px',
      padding: '12px',
      border: '1px solid var(--background-modifier-border)',
      backgroundColor: 'var(--background-primary-alt)',
      borderRadius: 'var(--radius-s)',
      marginBottom: '15px'
    });

    const actionHeading = new Setting(actionBox).setName('Actions').setHeading();
    actionHeading.settingEl.setCssStyles({ border: 'none', padding: '0', marginBottom: '12px' });
    
    const actionSetting = new Setting(actionBox);
    actionSetting.settingEl.setCssStyles({ border: 'none', padding: '0' });
    actionSetting.infoEl.setCssStyles({ display: 'none' });
    actionSetting.controlEl.setCssStyles({
      display: 'flex',
      flexDirection: 'row',
      gap: '8px',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      width: '100%'
    });

    // ── Button label: single source of truth from persisted SiteProfile ──────
    // hasFailed → "Republish"
    // isLive (never failed) → "Update"
    // never published → "Publish"
    const publishLabel = isPublishing
      ? 'Publishing…'
      : hasFailed
        ? 'Republish'
        : isLive
          ? 'Update'
          : 'Publish';

    const hostingProvider = site.hostingProvider;

    actionSetting
      .addButton(b => {
        b.setButtonText(publishLabel);
        if (isPublishing) {
          b.setDisabled(true);
        } else {
          b.setCta();
        }
        b.onClick(() => { void (async () => {
          b.setDisabled(true);
          b.setButtonText('Publishing…');
          try {
            await this.plugin.doPublish();
          } finally {
            void this.render();
          }
        })(); });
      })
      .addButton(b => {
        if (hostingProvider === 'cloudflare') {
          b.setButtonText('Unpublish');
          if (!isLive || isPublishing) {
            b.setDisabled(true);
          } else {
            b.buttonEl.addClass('mod-warning');
          }
          b.onClick(() => {
            new UnpublishModal(this.app, this.plugin, () => this.refresh()).open();
          });
        } else {
          // GitHub Pages cannot be paused via API.
          b.setButtonText('Unpublish (Manual)');
          if (!isLive || isPublishing) {
            b.setDisabled(true);
          } else {
            b.buttonEl.addClass('mod-warning');
          }
          b.onClick(() => {
            void (async () => {
              // Mark the site offline locally so the panel reflects the change.
              // The user must still manually disable GitHub Pages in their repo
              // settings — this just keeps NoteFlare's state consistent.
              site.isPublished = false;
              await this.plugin.saveSettings();
              new GitHubPagesUnpublishModal(
                this.app,
                `https://github.com/${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}/settings/pages`,
              ).open();
              this.refresh();
            })();
          });
        }
      })
      .addButton(b => {
        const deleteTooltip = hostingProvider === 'cloudflare'
          ? 'Removes the Cloudflare Pages project (API) and the site folder from GitHub'
          : 'Removes the site folder from GitHub. GitHub Pages link may remain — disable it manually in repo Settings → Pages';
        b.setButtonText('Delete');
        b.setTooltip(deleteTooltip);
        if (isPublishing) b.setDisabled(true);
        else b.buttonEl.addClass('mod-warning');
        b.onClick(() => {
          new RemoveSiteModal(this.app, this.plugin, site, () => {
            this.refresh();
          }).open();
        });
      });
  }
}