import { Notice, Plugin, setIcon, WorkspaceLeaf } from 'obsidian';
import { Publisher } from './src/publish/publisher';
import { DEFAULT_BACKUP_SETTINGS, DEFAULT_SETTINGS, createSiteProfile } from './src/core/settings';
import { NoteFlareSettings, PublishResult, SiteProfile } from './src/core/types';
import { NoteFlareSettingsTab } from './src/ui/settings/settingsTab';
import { StatusBar } from './src/ui/statusBar';
import { NoteFlareView, VIEW_TYPE_NOTEFLARE } from './src/ui/noteflareView';
import { decryptSecret, encryptSecret, isSecureStorageAvailable } from './src/core/secureStore';
import { BackupEngine } from './src/backup/backupEngine';
import { BackupScheduler } from './src/backup/backupScheduler';
import { VaultRegistry } from './src/core/vaultRegistry';
import { GitHubApi } from './src/api/githubApi';
import { CloudflareApi } from './src/api/cloudflareApi';

export interface LiveSiteStatus {
  loading: boolean;
  repoHtmlUrl: string;
  repoPushedAt: string;
  workflowStatus: string;    // 'queued' | 'in_progress' | 'completed' | ''
  workflowConclusion: string; // 'success' | 'failure' | 'cancelled' | ''
  workflowUrl: string;
  workflowUpdatedAt: string;
  commitSha: string;
  commitMessage: string;
  commitDate: string;
  fetchedAt: string; // ISO timestamp of last successful fetch
  error: string;    // non-empty if last fetch failed
}

export default class NoteFlarePlugin extends Plugin {
  settings!: NoteFlareSettings;
  statusBar!: StatusBar;
  private ribbonEl: HTMLElement | null = null;
  private backupInProgress = false;
  /** In-progress publish tracking (in-memory only, cleared on success/fail). */
  publishInProgress: Record<string, boolean> = {};
  /** Live GitHub status cache (in-memory, refreshed on panel open/refresh). */
  liveStatus: Record<string, LiveSiteStatus> = {};

  async onload(): Promise<void> {
    await this.loadSettings();

    // Check the vault registry for sites that existed before a reinstall.
    // If credentials are present but no sites are loaded, the user probably
    // reinstalled the plugin — show a notice prompting them to restore.
    if (this.settings.githubToken && this.settings.githubOwner && this.settings.sites.length === 0) {
      const registry = await VaultRegistry.load(this.app);
      if (registry.entries.length > 0) {
        new Notice(
          `NoteFlare found ${registry.entries.length} previously configured site${registry.entries.length === 1 ? '' : 's'} in your vault. Open NoteFlare settings to restore them.`,
          10000,
        );
      }
    }

    if (!isSecureStorageAvailable()) {
      new Notice(
        'NoteFlare: secure token storage is unavailable on this system. Your tokens will not be saved between sessions — you may need to re-enter them.',
        10000,
      );
    }

    const statusEl = this.addStatusBarItem();
    this.statusBar = new StatusBar(statusEl);
    this.updateStatusBar();

    this.registerView(VIEW_TYPE_NOTEFLARE, (leaf) => new NoteFlareView(leaf, this));

    // The ribbon icon opens the publishing panel.
    this.ribbonEl = this.addRibbonIcon(
      this.isActiveLive() ? 'cloud-check' : 'cloud-upload',
      'NoteFlare',
      () => void this.activateView(),
    );
    this.updateRibbonIcon();

    this.addCommand({
      id: 'open-panel',
      name: 'Open panel',
      callback: () => void this.activateView(),
    });
    this.addCommand({
      id: 'publish',
      name: 'Publish active site',
      callback: () => void this.doPublish(),
    });
    this.addCommand({
      id: 'unpublish',
      name: 'Unpublish active site',
      callback: () => void this.doUnpublish(),
    });
    this.addCommand({
      id: 'backup-now',
      name: 'Back up vault now',
      callback: () => void this.doBackup(false),
    });

    this.addSettingTab(new NoteFlareSettingsTab(this.app, this));
    
    new BackupScheduler(this).registerAutomation();
  }

  /** The currently-selected site, or the first one, or null when none exist. */
  getActiveSite(): SiteProfile | null {
    const { sites, activeSiteId } = this.settings;
    return sites.find((s) => s.id === activeSiteId) ?? sites[0] ?? null;
  }

  private isActiveLive(): boolean {
    return this.getActiveSite()?.isPublished ?? false;
  }

  /** Reveal the NoteFlare panel (creating it if needed in the configured location). */
  async activateView(): Promise<void> {
    const { workspace } = this.app;
    let leaf: WorkspaceLeaf | null = workspace.getLeavesOfType(VIEW_TYPE_NOTEFLARE)[0] ?? null;

    if (!leaf) {
      const loc = this.settings.defaultViewLocation ?? 'left';
      if (loc === 'right') {
        leaf = workspace.getRightLeaf(false);
      } else if (loc === 'tab') {
        leaf = workspace.getLeaf('tab');
      } else {
        leaf = workspace.getLeftLeaf(false);
      }
      if (!leaf) return;
      await leaf.setViewState({ type: VIEW_TYPE_NOTEFLARE, active: true });
    }
    void workspace.revealLeaf(leaf);
  }

  private refreshView(): void {
    this.app.workspace.getLeavesOfType(VIEW_TYPE_NOTEFLARE).forEach((leaf) => {
      const view = leaf.view;
      if (view instanceof NoteFlareView) view.refresh();
    });
  }

  async doBackup(background = false): Promise<void> {
    if (this.backupInProgress) {
      if (!background) new Notice('A backup is already running.');
      return;
    }
    if (!this.settings.setupComplete || !this.settings.enableBackup) {
      if (!background) {
        this.openSettingsTab();
        new Notice('Enable private backup in NoteFlare settings first.');
      }
      return;
    }

    if (!this.settings.backup.repository) {
      this.settings.backup.repository = this.defaultBackupRepository();
    }

    this.backupInProgress = true;
    this.settings.backup.lastBackupAttemptAt = new Date().toISOString();
    const engine = new BackupEngine(this.app, this.settings, (message) => {
      if (!background) this.statusBar.setMessage(`NoteFlare: ${message}`);
    });

    try {
      const result = await engine.backup();
      if (!result.success) throw new Error(result.errors[0] ?? 'Backup failed.');

      this.settings.backup.lastBackupAt = new Date().toISOString();
      this.settings.backup.lastBackupError = '';
      await this.saveSettings();

      if (!background) {
        const message = result.updated > 0
          ? `Backup complete · ${result.updated} file${result.updated === 1 ? '' : 's'} updated`
          : 'Backup is already up to date';
        new Notice(message, 5000);
      }
    } catch (error: unknown) {
      const message = this.toUserMessage(error, 'Backup failed.');
      this.settings.backup.lastBackupError = message;
      await this.saveSettings();
      if (!background) {
        this.statusBar.setError(message);
        new Notice(message, 8000);
      } else {
        console.error(`NoteFlare background backup failed: ${message}`);
      }
    } finally {
      this.backupInProgress = false;
      if (!background) this.updateStatusBar();
    }
  }

  async doPublish(): Promise<void> {
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.openSettingsTab();
      new Notice('Add a site before publishing.');
      return;
    }

    // Guard against double-clicks.
    if (this.publishInProgress[site.id]) return;
    this.publishInProgress[site.id] = true;
    this.refreshView();

    const publisher = new Publisher(this.settings, site, this.app, (message) => {
      this.syncStatusFromProgress(message);
      this.refreshView();
    });

    try {
      const result = await publisher.publish();
      // publisher.ts already wrote lastPublishFailed/lastPublishError onto site.
      await this.applyPublishResult(site, result);
    } catch (err: unknown) {
      const message = this.toUserMessage(err, 'Publishing failed. Review your setup and try again.');
      // Persist the failure so it survives a restart.
      site.lastPublishFailed = true;
      site.lastPublishError = message;
      site.isPublished = false;
      this.statusBar.setError(message);
      new Notice(message, 8000);
      await this.saveSettings();
    } finally {
      this.publishInProgress[site.id] = false;
      this.refreshView();
    }
  }

  async doUnpublish(): Promise<void> {
    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.openSettingsTab();
      new Notice('Add a site first.');
      return;
    }

    const publisher = new Publisher(this.settings, site, this.app, (message) => {
      this.statusBar.setMessage(`NoteFlare: ${message}`);
    });

    this.statusBar.setMessage('NoteFlare: Taking your site offline...');

    try {
      await publisher.unpublish();
      site.isPublished = false;
      await this.saveSettings();
      this.updateStatusBar();
      new Notice('Your site is now offline. You can publish again any time.');
    } catch (err: unknown) {
      const message = this.toUserMessage(err, 'Unpublish failed. Check your Cloudflare settings and try again.');
      this.statusBar.setError(message);
      new Notice(message, 8000);
    }
  }

  async loadSettings(): Promise<void> {
    const loaded = (await this.loadData()) as Record<string, unknown> | null;
    const { settings } = migrateSettings(loaded);
    this.settings = settings;
  }

  async saveSettings(): Promise<void> {
    // Persist tokens as OS-encrypted ciphertext; never write plaintext. If
    // secure storage is unavailable the tokens simply aren't persisted (they
    // stay in memory for the session) rather than being written in the clear.
    const { githubToken, cloudflareToken, ...rest } = this.settings;
    const persisted: Record<string, unknown> = { ...rest };
    if (isSecureStorageAvailable()) {
      persisted.githubTokenEnc = githubToken ? encryptSecret(githubToken) : '';
      persisted.cloudflareTokenEnc = cloudflareToken ? encryptSecret(cloudflareToken) : '';
    }
    await this.saveData(persisted);

    // Keep the vault registry in sync so sites survive plugin uninstall/reinstall.
    // Non-fatal: a registry write failure must not block the settings save.
    for (const site of this.settings.sites) {
      void VaultRegistry.upsert(
        this.app,
        site,
        this.settings.masterRepository,
        this.settings.githubOwner,
        this.settings.masterRepositoryPrivate || false,
      );
    }

    this.updateStatusBar();
    this.updateRibbonIcon();
    this.refreshView();
  }

  updateStatusBar(): void {
    if (!this.statusBar) return;

    const site = this.getActiveSite();
    if (!this.settings.setupComplete || !site) {
      this.statusBar.setIdle();
      return;
    }

    if (site.isPublished) {
      this.statusBar.setLive(site.lastNoteCount, site.siteUrl);
      return;
    }

    this.statusBar.setUnpublished();
  }

  private updateRibbonIcon(): void {
    if (!this.ribbonEl) return;

    const live = this.isActiveLive();
    setIcon(this.ribbonEl, live ? 'cloud-check' : 'cloud-upload');
    this.ribbonEl.setAttribute(
      'aria-label',
      live ? 'NoteFlare: Unpublish site' : 'NoteFlare: Publish site',
    );
  }

  private syncStatusFromProgress(message: string): void {
    const uploadMatch = /Uploading (\d+)\/(\d+)/.exec(message);
    if (uploadMatch) {
      this.statusBar.setPublishing(Number(uploadMatch[1]), Number(uploadMatch[2]));
      return;
    }

    const rateMatch = /Rate limited(?:.*?)(\d+)s/.exec(message);
    if (rateMatch) {
      this.statusBar.setRateLimited(Number(rateMatch[1]));
      return;
    }

    this.statusBar.setMessage(`NoteFlare: ${message}`);
  }

  defaultBackupRepository(): string {
    const vaultName = this.app.vault.getName()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `${vaultName || 'obsidian-vault'}-backup`;
  }

  private async applyPublishResult(site: SiteProfile, result: PublishResult): Promise<void> {
    site.lastPublished = new Date().toISOString();
    site.isPublished = result.success;
    // Use noteCount (vault files only) — not result.uploaded which also counts build files.
    site.lastNoteCount = result.noteCount;
    // lastPublishFailed and lastPublishError were already set by publisher.ts;
    // ensure they're correct even if publisher didn't set them (shouldn't happen).
    site.lastPublishFailed = !result.success;
    site.lastPublishError = result.success ? '' : (result.errors[0] ?? 'Unknown error');
    await this.saveSettings();

    if (result.success) {
      this.statusBar.setLive(result.noteCount, site.siteUrl);
      const fixedNote = result.fixed > 0 ? ` (auto-fixed ${result.fixed} frontmatter issue${result.fixed === 1 ? '' : 's'})` : '';
      new Notice(`Published ${result.noteCount} file${result.noteCount === 1 ? '' : 's'} to ${site.siteUrl}${fixedNote}`, 6000);
      // Kick off a live status fetch so the panel reflects the new deployment.
      void this.fetchLiveStatus(site);
      return;
    }

    const firstError = result.errors[0] ?? 'Publishing failed. Review your setup and try again.';
    this.statusBar.setError(firstError);
    new Notice(`Failed to publish: ${firstError}`, 8000);
  }

  /**
   * Fetch live GitHub status for the given site and cache it in `liveStatus`.
   * The view calls this on open and on the Refresh button. Never throws.
   */
  async fetchLiveStatus(site: SiteProfile): Promise<void> {
    const repo = site.githubRepo || this.settings.masterRepository;
    
    if (!this.settings.githubToken || !this.settings.githubOwner || !repo) {
      this.liveStatus[site.id] = {
        ...(this.liveStatus[site.id] ?? {}),
        loading: false,
        error: !repo ? 'GitHub repository not configured.' : 'GitHub account not connected.',
      } as LiveSiteStatus;
      this.refreshView();
      return;
    }

    const branch = site.githubBranch || 'main';
    const github = new GitHubApi(
      this.settings.githubToken,
      this.settings.githubOwner,
      repo,
      branch,
    );

    // Mark loading so the view can show a spinner.
    this.liveStatus[site.id] = {
      ...(this.liveStatus[site.id] ?? {}),
      loading: true,
    } as LiveSiteStatus;
    this.refreshView();

    try {
      const [repoInfo, workflowRun, latestCommit] = await Promise.all([
        github.getRepoInfo(),
        github.getLatestWorkflowRun('deploy.yml'),
        github.getLatestCommit(branch),
      ]);

      let cfWorkflowStatus = workflowRun?.status ?? '';
      let cfWorkflowConclusion = workflowRun?.conclusion ?? '';
      let cfWorkflowUrl = workflowRun?.htmlUrl ?? '';
      let cfWorkflowUpdatedAt = workflowRun?.updatedAt ?? '';

      if (site.hostingProvider === 'cloudflare' && this.settings.cloudflareToken && this.settings.cloudflareAccount && site.cloudflareProject) {
        try {
          const cf = new CloudflareApi(this.settings.cloudflareToken, this.settings.cloudflareAccount);
          const cfDeployments = await cf.listDeployments(site.cloudflareProject);
          const latestCf = cfDeployments?.result?.[0];
          if (latestCf) {
            const status = latestCf.status as string | undefined;
            if (status === 'queued' || status === 'pending' || status === 'in_progress') {
              cfWorkflowStatus = 'in_progress';
              cfWorkflowConclusion = '';
            } else if (status === 'success' || status === 'active') {
              cfWorkflowStatus = 'completed';
              cfWorkflowConclusion = 'success';
            } else if (status === 'failure' || status === 'error') {
              cfWorkflowStatus = 'completed';
              cfWorkflowConclusion = 'failure';
            } else if (status === 'canceled') {
              cfWorkflowStatus = 'completed';
              cfWorkflowConclusion = 'cancelled';
            } else {
              cfWorkflowStatus = 'completed';
              cfWorkflowConclusion = 'success';
            }
            cfWorkflowUrl = (latestCf.url as string | undefined) || '';
            cfWorkflowUpdatedAt = (latestCf.modified_on as string | undefined) || (latestCf.created_on as string | undefined) || '';
          }
        } catch (cfErr: unknown) {
          console.warn('NoteFlare: could not fetch Cloudflare status:', cfErr);
        }
      }

      this.liveStatus[site.id] = {
        loading: false,
        repoHtmlUrl: repoInfo?.htmlUrl ?? '',
        repoPushedAt: repoInfo?.pushedAt ?? '',
        workflowStatus: cfWorkflowStatus,
        workflowConclusion: cfWorkflowConclusion,
        workflowUrl: cfWorkflowUrl,
        workflowUpdatedAt: cfWorkflowUpdatedAt,
        commitSha: latestCommit?.sha ?? '',
        commitMessage: latestCommit?.message ?? '',
        commitDate: latestCommit?.date ?? '',
        fetchedAt: new Date().toISOString(),
        error: '',
      };
    } catch (err: unknown) {
      this.liveStatus[site.id] = {
        ...(this.liveStatus[site.id] ?? {}),
        loading: false,
        error: (err instanceof Error ? err.message : 'Status fetch failed'),
      } as LiveSiteStatus;
    }

    this.refreshView();
  }

  openSettingsTab(): void {
    const setting = ((this.app as unknown) as Record<string, unknown>).setting as
      | { open?: () => void; openTabById?: (id: string) => void }
      | undefined;
    setting?.open?.();
    setting?.openTabById?.(this.manifest.id);
  }

  private toUserMessage(err: unknown, fallback: string): string {
    const message = err instanceof Error ? err.message : '';
    return message || fallback;
  }
}

/**
 * Build the in-memory settings from whatever is in `data.json`, upgrading two
 * legacy shapes so existing users keep working:
 *  1. plaintext `githubToken`/`cloudflareToken` → decrypt-on-load via `*Enc`
 *     (the plaintext is scrubbed on the next save).
 *  2. flat single-site fields (`githubRepo`, `cloudflareProject`, …) → one
 *     SiteProfile in `sites[]`.
 */
function migrateSettings(
  loaded: Record<string, unknown> | null,
): { settings: NoteFlareSettings } {
  const settings: NoteFlareSettings = {
    ...DEFAULT_SETTINGS,
    sites: [],
    backup: { ...DEFAULT_BACKUP_SETTINGS },
  };
  if (!loaded) return { settings };

  const str = (v: unknown): string => (typeof v === 'string' ? v : '');
  settings.githubOwner = str(loaded.githubOwner);
  settings.cloudflareAccount = str(loaded.cloudflareAccount);
  settings.masterRepository = str(loaded.masterRepository) || 'noteflare-sites';
  settings.masterRepositoryPrivate = loaded.masterRepositoryPrivate === true;
  settings.setupComplete = loaded.setupComplete === true;
  settings.activeSiteId = str(loaded.activeSiteId);
  settings.enableBackup = loaded.enableBackup === true;
  settings.enablePublish = loaded.enablePublish !== false; // default true
  const savedBackup = typeof loaded.backup === 'object' && loaded.backup !== null
    ? loaded.backup as Partial<NoteFlareSettings['backup']>
    : null;
  settings.backup = {
    ...DEFAULT_BACKUP_SETTINGS,
    ...(savedBackup ?? {}),
    repository: savedBackup?.repository ?? '',
    repoVisibility: (savedBackup?.repoVisibility as 'private' | 'public' | undefined) ?? 'private',
    backupOnChange: savedBackup?.backupOnChange ?? true,
    lastBackupAt: savedBackup?.lastBackupAt ?? '',
  };

  if (loaded.githubTokenEnc) {
    settings.githubToken = decryptSecret(str(loaded.githubTokenEnc));
  }
  if (loaded.cloudflareTokenEnc) {
    settings.cloudflareToken = decryptSecret(str(loaded.cloudflareTokenEnc));
  }

  if (Array.isArray(loaded.sites)) {
    settings.sites = (loaded.sites as Record<string, unknown>[]).map((s) => {
      // Migrate legacy publishScope ('folder' | 'page') and publishPath to publishPaths
      let publishScope = s.publishScope as string | undefined;
      let publishPaths = s.publishPaths as string[] | undefined;

      if (publishScope === 'folder' || publishScope === 'page') {
        publishScope = 'selected';
        const legacyPath = s.publishPath as string | undefined;
        if (legacyPath && !publishPaths) {
          publishPaths = [legacyPath];
        }
      }

      // Migrate legacy deployTarget to hostingProvider, then discard it.
      let hostingProvider = s.hostingProvider as SiteProfile['hostingProvider'] | undefined;
      if (!hostingProvider) {
        const legacyTarget = s.deployTarget as string | undefined;
        hostingProvider = legacyTarget === 'cloudflare' ? 'cloudflare' : 'github-pages';
      }

      const { deployTarget: _dt, ...rest } = s as Record<string, unknown>;
      void _dt; // consumed by migration above

      return createSiteProfile({
        ...(rest as Partial<SiteProfile>),
        publishScope: (publishScope as 'vault' | 'selected') || 'vault',
        publishPaths: publishPaths || [],
        hostingProvider,
      });
    });
  }

  // Ensure the active id points at a real site.
  if (!settings.sites.some((s) => s.id === settings.activeSiteId)) {
    settings.activeSiteId = settings.sites[0]?.id ?? '';
  }

  return { settings };
}