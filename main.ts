import { Notice, Plugin, setIcon, WorkspaceLeaf } from 'obsidian';
import { Publisher } from './src/publish/publisher';
import { DEFAULT_BACKUP_SETTINGS, DEFAULT_SETTINGS, createSiteProfile } from './src/core/settings';
import { NoteFlareSettings, PublishResult, SiteProfile } from './src/core/types';
import { NoteFlareSettingsTab } from './src/ui/settings/settingsTab';
import { StatusBar } from './src/ui/statusBar';
import { NoteFlareView, VIEW_TYPE_NOTEFLARE } from './src/ui/noteflareView';
import { decryptSecret, encryptSecret, isSecureStorageAvailable } from './src/core/secureStore';
import { BackupEngine } from './src/backup/backupEngine';

export default class NoteFlarePlugin extends Plugin {
  settings!: NoteFlareSettings;
  statusBar!: StatusBar;
  private ribbonEl: HTMLElement | null = null;
  private backupInProgress = false;
  private backupDebounceTimer: number | null = null;

  async onload(): Promise<void> {
    await this.loadSettings();

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
    this.registerBackupAutomation();
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

    const publisher = new Publisher(this.settings, site, this.app, (message) => {
      this.syncStatusFromProgress(message);
    });

    try {
      const result = await publisher.publish();
      await this.applyPublishResult(site, result);
    } catch (err: unknown) {
      const message = this.toUserMessage(err, 'Publishing failed. Review your setup and try again.');
      this.statusBar.setError(message);
      new Notice(message, 8000);
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

  private registerBackupAutomation(): void {
    const queueAfterChange = () => {
      if (!this.settings.enableBackup || !this.settings.backup.backupOnChange) return;
      if (this.backupDebounceTimer !== null) window.clearTimeout(this.backupDebounceTimer);
      this.backupDebounceTimer = window.setTimeout(() => {
        this.backupDebounceTimer = null;
        void this.doBackup(true);
      }, 30000);
    };

    this.registerEvent(this.app.vault.on('create', queueAfterChange));
    this.registerEvent(this.app.vault.on('modify', queueAfterChange));
    this.registerEvent(this.app.vault.on('delete', queueAfterChange));
    this.registerEvent(this.app.vault.on('rename', queueAfterChange));
    this.register(() => {
      if (this.backupDebounceTimer !== null) window.clearTimeout(this.backupDebounceTimer);
    });

    this.registerInterval(window.setInterval(() => {
      void this.runScheduledBackupIfDue();
    }, 60000));
    this.app.workspace.onLayoutReady(() => void this.runScheduledBackupIfDue());
  }

  private async runScheduledBackupIfDue(): Promise<void> {
    const { backup } = this.settings;
    if (!this.settings.setupComplete || !this.settings.enableBackup || backup.intervalMinutes <= 0) {
      return;
    }

    const lastAttempt = backup.lastBackupAttemptAt
      ? new Date(backup.lastBackupAttemptAt).getTime()
      : 0;
    const intervalMs = backup.intervalMinutes * 60 * 1000;
    if (!lastAttempt || Date.now() - lastAttempt >= intervalMs) {
      await this.doBackup(true);
    }
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
    site.isPublished = site.isPublished || result.success;
    site.lastNoteCount = result.uploaded;
    await this.saveSettings();

    if (result.success) {
      this.statusBar.setLive(result.uploaded, site.siteUrl);
      const fixedNote = result.fixed > 0 ? ` (auto-fixed ${result.fixed} frontmatter issue${result.fixed === 1 ? '' : 's'})` : '';
      new Notice(`Published ${result.uploaded} files to ${site.siteUrl}${fixedNote}`, 6000);
      return;
    }

    const firstError = result.errors[0] ?? 'Publishing failed. Review your setup and try again.';
    this.statusBar.setError(firstError);
    new Notice(`Failed to publish: ${firstError}`, 8000);
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
 *  1. plaintext `githubToken`/`cloudflareToken` → decrypt-on-load via `*Enc`,
 *     and flag a re-save so the plaintext is scrubbed and rewritten encrypted.
 *  2. flat single-site fields (`githubRepo`, `cloudflareProject`, …) → one
 *     SiteProfile in `sites[]`.
 * Returns `needsResave` so the caller rewrites the file in the new shape.
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
    folder: savedBackup?.folder ?? '',
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

      return createSiteProfile({
        ...(s as Partial<SiteProfile>),
        publishScope: (publishScope as 'vault' | 'selected') || 'vault',
        publishPaths: publishPaths || [],
      });
    });
  }

  // Ensure the active id points at a real site.
  if (!settings.sites.some((s) => s.id === settings.activeSiteId)) {
    settings.activeSiteId = settings.sites[0]?.id ?? '';
  }

  return { settings };
}
