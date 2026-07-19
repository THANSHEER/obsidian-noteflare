import type NoteFlarePlugin from '../../main';

export class BackupScheduler {
  private backupDebounceTimer: number | null = null;

  constructor(private plugin: NoteFlarePlugin) {}

  public registerAutomation(): void {
    const { app } = this.plugin;
    const queueAfterChange = () => {
      if (!this.plugin.settings.enableBackup || !this.plugin.settings.backup.backupOnChange) return;
      if (this.backupDebounceTimer !== null) window.clearTimeout(this.backupDebounceTimer);
      this.backupDebounceTimer = window.setTimeout(() => {
        this.backupDebounceTimer = null;
        void this.plugin.doBackup(true);
      }, 30000);
    };

    this.plugin.registerEvent(app.vault.on('create', queueAfterChange));
    this.plugin.registerEvent(app.vault.on('modify', queueAfterChange));
    this.plugin.registerEvent(app.vault.on('delete', queueAfterChange));
    this.plugin.registerEvent(app.vault.on('rename', queueAfterChange));
    
    this.plugin.register(() => {
      if (this.backupDebounceTimer !== null) window.clearTimeout(this.backupDebounceTimer);
    });

    this.plugin.registerInterval(window.setInterval(() => {
      void this.runScheduledBackupIfDue();
    }, 60000));
    
    app.workspace.onLayoutReady(() => void this.runScheduledBackupIfDue());
  }

  private async runScheduledBackupIfDue(): Promise<void> {
    const { settings } = this.plugin;
    const { backup } = settings;
    if (!settings.setupComplete || !settings.enableBackup || backup.intervalMinutes <= 0) {
      return;
    }

    const lastAttempt = backup.lastBackupAttemptAt
      ? new Date(backup.lastBackupAttemptAt).getTime()
      : 0;
    const intervalMs = backup.intervalMinutes * 60 * 1000;
    if (!lastAttempt || Date.now() - lastAttempt >= intervalMs) {
      await this.plugin.doBackup(true);
    }
  }
}
