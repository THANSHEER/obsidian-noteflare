import { ItemView, WorkspaceLeaf, setIcon, Setting, Notice } from 'obsidian';
import { AddSiteModal, UnpublishModal, EditSiteModal, RemoveSiteModal, PathSuggestModal } from './settings/modals';
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
      const setupWrap = root.createDiv();
      setupWrap.setCssStyles({ padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px' });
      setupWrap.createEl('p', {
        text: 'Finish setup to publish your notes and protect your vault with automatic backups.',
        cls: 'setting-item-description',
      });
      const setupBtn = setupWrap.createEl('button', { text: 'Open setup', cls: 'mod-cta' });
      setupBtn.addEventListener('click', () => this.plugin.openSettingsTab());
      return;
    }

    const content = root.createDiv({ cls: 'noteflare-tab-content' });
    if (s.enablePublish) {
      await this.renderPublish(content);
    } else {
      const backup = content.createDiv();
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
        cls: 'setting-item-description',
      });
      const createBtn = root.createEl('button', { text: '+ Add your first site', cls: 'mod-cta' });
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

    // ── Site Switcher ─────────────────────────────────────────────────────────
    this.renderSiteSwitcher(root, site, s, isLive, isPublishing, hasFailed);

    // ── Status Dashboard ──────────────────────────────────────────────────────
    this.renderStatusDashboard(root, site, isLive, hasFailed, isPublishing, live);

    // ── Actions ───────────────────────────────────────────────────────────────
    this.renderActions(root, site, isLive, hasFailed, isPublishing);

    // ── Divider ───────────────────────────────────────────────────────────────
    root.createDiv({ cls: 'nf-section-divider' });

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

    // ── Publish Scope ─────────────────────────────────────────────────────────
    this.renderPublishScope(root, site);

    // ── Advanced ──────────────────────────────────────────────────────────────
    const advRow = root.createDiv({ cls: 'nf-advanced-row' });
    const advLabel = advRow.createSpan({ cls: 'nf-advanced-label', text: 'Metadata, styling & exclusions' });
    void advLabel;
    const advBtn = advRow.createEl('button', { text: 'Advanced…' });
    advBtn.addEventListener('click', () => {
      new EditSiteModal(this.app, this.plugin, site, () => this.refresh()).open();
    });
  }

  /** Render the site switcher header with inline badge. */
  private renderSiteSwitcher(
    root: HTMLElement,
    site: SiteProfile,
    s: NoteFlarePlugin['settings'],
    isLive: boolean,
    isPublishing: boolean,
    hasFailed: boolean,
  ): void {
    if (s.sites.length === 1) {
      // Single site — show just the name + badge, no dropdown
      const header = root.createDiv({ cls: 'nf-site-header' });
      header.createSpan({ cls: 'nf-site-header-name', text: site.name || site.githubRepo || 'My Site' });
      header.appendChild(this.makeBadgeEl(isPublishing, hasFailed, isLive));
    } else {
      // Multiple sites — show a Setting-style switcher
      const switcherSetting = new Setting(root)
        .setName('Site')
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
          b.setIcon('plus').setTooltip('Add site').onClick(() => {
            new AddSiteModal(this.app, this.plugin, () => this.refresh()).open();
          });
        });
      switcherSetting.settingEl.setCssStyles({ paddingBottom: '4px' });
    }
  }

  /** Build a styled badge element for the current publish state. */
  private makeBadgeEl(isPublishing: boolean, hasFailed: boolean, isLive: boolean): HTMLElement {
    const badge = document.createElement('span');
    if (isPublishing) {
      badge.className = 'noteflare-badge publishing';
      badge.textContent = '● Publishing…';
    } else if (hasFailed) {
      badge.className = 'noteflare-badge error';
      badge.textContent = '● Failed';
    } else if (isLive) {
      badge.className = 'noteflare-badge live';
      badge.textContent = '● Live';
    } else {
      badge.className = 'noteflare-badge offline';
      badge.textContent = '● Offline';
    }
    return badge;
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
    const card = root.createDiv({ cls: 'nf-status-card' });

    // ── Card header: badge + refresh ─────────────────────────────────────────
    const cardHeader = card.createDiv({ cls: 'nf-status-card-header' });

    // Derive badge label from live workflow data when available
    let badgeClass = 'offline';
    let badgeText = '● Offline';

    if (isPublishing) {
      badgeClass = 'publishing';
      badgeText = '● Publishing…';
    } else if (hasFailed) {
      badgeClass = 'error';
      badgeText = '● Last publish failed';
    } else if (isLive) {
      if (live && !live.loading && live.workflowStatus === 'completed') {
        if (live.workflowConclusion === 'success') {
          badgeClass = 'live';
          badgeText = '● Live';
        } else if (live.workflowConclusion === 'failure') {
          badgeClass = 'error';
          badgeText = site.hostingProvider === 'cloudflare' ? '● Build failed on Cloudflare' : '● Build failed on GitHub';
        } else if (live.workflowConclusion === 'cancelled') {
          badgeClass = 'warning';
          badgeText = '● Build cancelled';
        }
      } else if (live && live.workflowStatus === 'in_progress') {
        badgeClass = 'building';
        badgeText = site.hostingProvider === 'cloudflare' ? '● Building on Cloudflare…' : '● Building on GitHub…';
      } else {
        badgeClass = 'live';
        badgeText = '● Live';
      }
    }

    const badgeEl = cardHeader.createSpan({ cls: `noteflare-badge ${badgeClass}`, text: badgeText });
    void badgeEl;

    // Refresh icon-button
    const refreshBtn = cardHeader.createEl('button');
    refreshBtn.setAttr('aria-label', 'Refresh status');
    setIcon(refreshBtn, live?.loading ? 'loader' : 'refresh-cw');
    refreshBtn.setCssStyles({ display: 'flex', alignItems: 'center', padding: '4px 6px', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', borderRadius: 'var(--radius-s)' });
    if (live?.loading) {
      refreshBtn.setAttr('disabled', 'true');
      refreshBtn.setCssStyles({ ...refreshBtn.style, opacity: '0.5', cursor: 'not-allowed' });
    }
    refreshBtn.addEventListener('click', () => {
      const s = this.plugin.getActiveSite();
      if (s) void this.plugin.fetchLiveStatus(s);
    });

    // ── Info rows ─────────────────────────────────────────────────────────────
    const infoList = card.createDiv({ cls: 'nf-status-info-list' });

    const addInfoRow = (label: string, value: string, href?: string) => {
      const row = infoList.createDiv({ cls: 'nf-status-info-row' });
      row.createSpan({ cls: 'nf-status-info-label', text: label });
      const valEl = row.createSpan({ cls: 'nf-status-info-value' });
      if (href && value) {
        const link = valEl.createEl('a', { text: value, href });
        link.addEventListener('click', (e) => { e.preventDefault(); window.open(href, '_blank'); });
      } else {
        valEl.setText(value || '—');
      }
    };

    // Site URL
    addInfoRow(
      'URL',
      site.siteUrl || '—',
      site.siteUrl ? `https://${site.siteUrl.replace(/^https?:\/\//, '')}` : undefined,
    );

    // Host
    const hostLabel = site.hostingProvider === 'cloud-worker' ? 'Cloud Worker Engine'
      : site.hostingProvider === 'cloudflare' ? 'Cloudflare Pages'
      : site.hostingProvider;
    addInfoRow('Host', hostLabel);

    if (live && !live.loading) {
      const repoPath = `${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`;
      const repoUrl = live.repoHtmlUrl || `https://github.com/${repoPath}`;
      addInfoRow('Repository', repoPath, repoUrl);
      addInfoRow('Last push', live.repoPushedAt ? relativeTime(live.repoPushedAt) : '—');

      if (live.commitSha) {
        const shortSha = live.commitSha.slice(0, 7);
        const commitMsg = live.commitMessage ? ` — ${live.commitMessage.slice(0, 38)}` : '';
        addInfoRow(
          'Last commit',
          `${shortSha}${commitMsg}`,
          `https://github.com/${repoPath}/commits`,
        );
        addInfoRow('Committed', relativeTime(live.commitDate));
      }

      if ((site.hostingProvider === 'cloud-worker' || site.hostingProvider === 'cloudflare') && live.workflowStatus) {
        const wfLabel = live.workflowStatus === 'in_progress' ? 'Building…'
          : live.workflowConclusion === 'success' ? '✓ Passed'
          : live.workflowConclusion === 'failure' ? '✗ Failed'
          : live.workflowConclusion === 'cancelled' ? '⊘ Cancelled'
          : live.workflowStatus;
        addInfoRow('Build', wfLabel, live.workflowUrl || undefined);
        addInfoRow('Build ran', relativeTime(live.workflowUpdatedAt));
      }

      if (live.fetchedAt) {
        card.createEl('p', {
          cls: 'nf-status-fetched',
          text: `Refreshed ${relativeTime(live.fetchedAt)}`,
        });
      }
    } else if (live?.loading) {
      card.createEl('p', { cls: 'nf-status-loading', text: 'Fetching live status…' });
    } else {
      // No live data yet — show cached info
      const repoPath = `${this.plugin.settings.githubOwner}/${this.plugin.settings.masterRepository}`;
      addInfoRow('Repository', repoPath, `https://github.com/${repoPath}`);
      if (site.lastPublished) {
        addInfoRow('Published', relativeTime(site.lastPublished));
        addInfoRow('Notes', String(site.lastNoteCount));
      }
    }

    // ── Error display ─────────────────────────────────────────────────────────
    if (hasFailed && site.lastPublishError) {
      card.createEl('p', {
        cls: 'nf-status-error',
        text: `⚠ ${site.lastPublishError}`,
      });
    }

    // ── Backup status ─────────────────────────────────────────────────────────
    if (this.plugin.settings.enableBackup) {
      const backupRow = card.createDiv({ cls: 'nf-status-backup-row' });
      const iconSpan = backupRow.createSpan();
      if (this.plugin.settings.backup.lastBackupError) {
        setIcon(iconSpan, 'alert-triangle');
        iconSpan.setCssStyles({ color: 'var(--color-orange)', display: 'flex', alignItems: 'center', width: '14px', height: '14px' });
        backupRow.createSpan({ text: `Backup: ${this.plugin.settings.backup.lastBackupError}` });
      } else if (this.plugin.settings.backup.lastBackupAt) {
        setIcon(iconSpan, 'check');
        iconSpan.setCssStyles({ color: 'var(--color-green)', display: 'flex', alignItems: 'center', width: '14px', height: '14px' });
        backupRow.createSpan({ text: `Backup: ${relativeTime(this.plugin.settings.backup.lastBackupAt)}` });
      } else {
        setIcon(iconSpan, 'clock');
        iconSpan.setCssStyles({ color: 'var(--text-faint)', display: 'flex', alignItems: 'center', width: '14px', height: '14px' });
        backupRow.createSpan({ text: 'Backup: not run yet' });
      }
    }
  }

  /** Render the publish scope picker with path chips. */
  private renderPublishScope(root: HTMLElement, site: SiteProfile): void {
    const section = root.createDiv({ cls: 'nf-scope-section' });

    const scopeHeader = section.createDiv({ cls: 'nf-scope-header' });
    scopeHeader.createSpan({ cls: 'nf-scope-label', text: 'Publish scope' });

    // Dropdown for scope
    const scopeSelect = scopeHeader.createEl('select');
    scopeSelect.setCssStyles({ fontSize: 'var(--font-ui-smaller)', padding: '3px 6px', borderRadius: 'var(--radius-s)', border: '1px solid var(--background-modifier-border)', background: 'var(--background-modifier-form-field)', color: 'var(--text-normal)', cursor: 'pointer' });
    const optVault = scopeSelect.createEl('option', { text: 'Full vault', value: 'vault' });
    const optSelected = scopeSelect.createEl('option', { text: 'Selected paths', value: 'selected' });
    scopeSelect.value = site.publishScope || 'vault';

    const pathsDiv = section.createDiv({ cls: 'nf-scope-paths' });

    const renderPaths = () => {
      pathsDiv.empty();
      if ((site.publishScope || 'vault') === 'vault') {
        pathsDiv.setCssStyles({ display: 'none' });
        section.createEl('p', { cls: 'nf-scope-desc', text: 'All notes in your vault will be published.' })?.setCssStyles?.({ display: site.publishScope === 'vault' ? '' : 'none' });
        return;
      }
      pathsDiv.setCssStyles({ display: 'flex' });

      // Browse button
      const browseBtn = pathsDiv.createEl('button', { text: '+ Browse vault…', cls: 'nf-browse-btn' });
      browseBtn.addEventListener('click', () => {
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
        pathsDiv.createEl('p', { cls: 'nf-no-paths-hint', text: 'No paths selected — all notes will be excluded.' });
      } else {
        const chipContainer = pathsDiv.createDiv({ cls: 'nf-path-chips' });
        for (let i = 0; i < paths.length; i++) {
          const chip = chipContainer.createDiv({ cls: 'nf-path-chip' });

          const iconSpan = chip.createSpan({ cls: 'nf-path-chip-icon' });
          const abstractFile = this.app.vault.getAbstractFileByPath(paths[i]);
          const isFolder = abstractFile && 'children' in abstractFile;
          setIcon(iconSpan, isFolder ? 'folder' : 'file-text');

          chip.createSpan({ text: paths[i] });

          const removeBtn = chip.createSpan({ cls: 'nf-path-chip-remove clickable-icon' });
          setIcon(removeBtn, 'x');
          removeBtn.setAttribute('aria-label', `Remove ${paths[i]}`);
          removeBtn.addEventListener('click', () => { void (async () => {
            site.publishPaths?.splice(i, 1);
            await this.plugin.saveSettings();
            renderPaths();
          })(); });
        }
      }
    };

    scopeSelect.addEventListener('change', () => { void (async () => {
      site.publishScope = scopeSelect.value as 'vault' | 'selected';
      renderPaths();
      await this.plugin.saveSettings();
    })(); });

    void optVault; void optSelected;
    renderPaths();
  }

  /** Render the Publish / Unpublish / Delete action buttons. */
  private renderActions(
    root: HTMLElement,
    site: SiteProfile,
    isLive: boolean,
    hasFailed: boolean,
    isPublishing: boolean,
  ): void {
    const bar = root.createDiv({ cls: 'nf-actions-bar' });

    // ── Primary: Publish / Update / Republish ─────────────────────────────────
    const publishLabel = isPublishing
      ? 'Publishing…'
      : hasFailed
        ? 'Republish'
        : isLive
          ? 'Update'
          : 'Publish';

    const publishBtn = bar.createEl('button', {
      text: publishLabel,
      cls: isPublishing ? '' : 'mod-cta nf-actions-bar-primary',
    });
    if (isPublishing) {
      publishBtn.setAttr('disabled', 'true');
      publishBtn.setCssStyles({ flex: '1' });
    } else {
      publishBtn.setCssStyles({ flex: '1' });
    }

    publishBtn.addEventListener('click', () => { void (async () => {
      publishBtn.setAttr('disabled', 'true');
      publishBtn.textContent = 'Publishing…';
      try {
        await this.plugin.doPublish();
      } finally {
        void this.render();
      }
    })(); });

    // ── Secondary group ───────────────────────────────────────────────────────
    const secondaryGroup = bar.createDiv({ cls: 'nf-actions-bar-secondary' });

    // Unpublish
    const unpublishBtn = secondaryGroup.createEl('button', {
      text: 'Take offline',
      cls: 'mod-warning',
    });
    if (!isLive || isPublishing) {
      unpublishBtn.setAttr('disabled', 'true');
    }
    unpublishBtn.addEventListener('click', () => {
      new UnpublishModal(this.app, this.plugin, () => this.refresh()).open();
    });

    // Delete
    const deleteTooltip = site.hostingProvider === 'cloud-worker'
      ? 'Deletes the site deployment from Cloud Engine'
      : 'Removes the site deployment and repository files';
    const deleteBtn = secondaryGroup.createEl('button', { text: 'Delete', cls: 'mod-warning' });
    deleteBtn.setAttr('title', deleteTooltip);
    if (isPublishing) deleteBtn.setAttr('disabled', 'true');
    deleteBtn.addEventListener('click', () => {
      new RemoveSiteModal(this.app, this.plugin, site, () => {
        this.refresh();
      }).open();
    });

    // ── Error recovery: shown only on failure ─────────────────────────────────
    if (hasFailed) {
      const recoveryDiv = root.createDiv({ cls: 'nf-error-recovery' });
      const recoverySetting = new Setting(recoveryDiv);
      recoverySetting.settingEl.setCssStyles({ border: 'none', padding: '0' });
      recoverySetting.setName('Clear error state');
      recoverySetting.setDesc('Reset all failed flags to start a fresh publish attempt.');
      recoverySetting.addButton(b => {
        b.setButtonText('Reset');
        b.setTooltip('Clears lastPublishFailed, lastPublishError, and isPublished so you can start fresh');
        b.buttonEl.addClass('mod-warning');
        b.onClick(() => { void (async () => {
          site.lastPublishFailed = false;
          site.lastPublishError = '';
          site.isPublished = false;
          await this.plugin.saveSettings();
          void this.render();
        })(); });
      });
    }
  }
}