import { Setting, setIcon } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';

export function renderBackupSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  const s = tab.plugin.settings;

  const backupHeading = new Setting(el);
  backupHeading.setName('Backup & Storage');
  backupHeading.setHeading();

  const backupRepoName = s.backup.repository || tab.plugin.defaultBackupRepository();
  const backupUrl = `https://github.com/${s.githubOwner}/${backupRepoName}`;
  const publishRepoUrl = `https://github.com/${s.githubOwner}/${s.masterRepository || 'noteflare-sites'}`;

  // Show repo info as description links instead of a disabled input
  const repoSetting = new Setting(el)
    .setName('GitHub repositories')
    .setDesc('');

  const repoDescEl = repoSetting.descEl;
  repoDescEl.empty();

  const publishLine = repoDescEl.createEl('span', { text: 'Publish: ' });
  publishLine.setCssStyles({ display: 'block', fontSize: 'var(--font-ui-smaller)', color: 'var(--text-muted)', marginBottom: '3px' });
  const publishLink = publishLine.createEl('a', {
    text: `${s.githubOwner}/${s.masterRepository || 'noteflare-sites'}`,
    href: publishRepoUrl,
  });
  publishLink.addEventListener('click', (e) => { e.preventDefault(); window.open(publishRepoUrl); });

  const backupLine = repoDescEl.createEl('span', { text: 'Backup: ' });
  backupLine.setCssStyles({ display: 'block', fontSize: 'var(--font-ui-smaller)', color: 'var(--text-muted)' });
  const backupLink = backupLine.createEl('a', {
    text: `${s.githubOwner}/${backupRepoName}`,
    href: backupUrl,
  });
  backupLink.addEventListener('click', (e) => { e.preventDefault(); window.open(backupUrl); });

  new Setting(el)
    .setName('Enable automatic backup')
    .setDesc('Silently mirror your vault to a private GitHub repository in the background.')
    .addToggle((toggle) => {
      toggle.setValue(s.enableBackup);
      toggle.onChange((value) => {
        void (async () => {
          s.enableBackup = value;
          if (value && !s.backup.repository) {
            s.backup.repository = tab.plugin.defaultBackupRepository();
          }
          await tab.plugin.saveSettings();
          tab.render();
        })();
      });
    });

  if (s.enableBackup) {
    new Setting(el)
      .setName('Repository visibility')
      .setDesc('Private keeps your notes confidential. Public makes the backup repo visible on GitHub.')
      .addDropdown((d) => {
        d.addOption('private', '🔒 Private (recommended)');
        d.addOption('public', '🌐 Public');
        d.setValue(s.backup.repoVisibility ?? 'private');
        d.onChange((v) => {
          void (async () => {
            s.backup.repoVisibility = v as 'private' | 'public';
            await tab.plugin.saveSettings();
          })();
        });
      });

    new Setting(el)
      .setName('Back up after changes')
      .setDesc('Run a backup 30 seconds after vault files are modified.')
      .addToggle((toggle) => {
        toggle.setValue(s.backup.backupOnChange);
        toggle.onChange((value) => {
          void (async () => {
            s.backup.backupOnChange = value;
            await tab.plugin.saveSettings();
          })();
        });
      });

    new Setting(el)
      .setName('Schedule')
      .setDesc('Periodic backups run while Obsidian is open.')
      .addDropdown((dropdown) => {
        dropdown.addOption('0', 'Off');
        dropdown.addOption('15', 'Every 15 minutes');
        dropdown.addOption('30', 'Every 30 minutes');
        dropdown.addOption('60', 'Every hour');
        dropdown.addOption('360', 'Every 6 hours');
        dropdown.addOption('1440', 'Daily');
        dropdown.setValue(String(s.backup.intervalMinutes));
        dropdown.onChange((value) => {
          void (async () => {
            s.backup.intervalMinutes = Number(value);
            await tab.plugin.saveSettings();
          })();
        });
      });

    // Backup status with icon indicator
    const hasError = !!s.backup.lastBackupError;
    const hasBackup = !!s.backup.lastBackupAt;

    const statusSetting = new Setting(el)
      .setName('Backup status')
      .addButton((button) => {
        button.setButtonText('Back up now').setCta();
        button.onClick(() => {
          void (async () => {
            button.setDisabled(true).setButtonText('Backing up…');
            await tab.plugin.doBackup(false);
            tab.render();
          })();
        });
      });

    // Replace the default desc with an icon + text combo
    statusSetting.descEl.empty();
    const statusDescEl = statusSetting.descEl;
    statusDescEl.addClass('nf-backup-status-desc');

    const iconSpan = statusDescEl.createSpan();
    if (hasError) {
      setIcon(iconSpan, 'alert-triangle');
      iconSpan.setCssStyles({ display: 'inline-flex', alignItems: 'center', width: '14px', height: '14px', color: 'var(--color-orange)' });
      statusDescEl.createSpan({ cls: 'nf-backup-status-warn', text: `Needs attention: ${s.backup.lastBackupError}` });
    } else if (hasBackup) {
      setIcon(iconSpan, 'check-circle');
      iconSpan.setCssStyles({ display: 'inline-flex', alignItems: 'center', width: '14px', height: '14px', color: 'var(--color-green)' });
      statusDescEl.createSpan({ cls: 'nf-backup-status-ok', text: `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}` });
    } else {
      setIcon(iconSpan, 'clock');
      iconSpan.setCssStyles({ display: 'inline-flex', alignItems: 'center', width: '14px', height: '14px', color: 'var(--text-faint)' });
      statusDescEl.createSpan({ text: 'No backup has run yet.' });
    }
  }
}
