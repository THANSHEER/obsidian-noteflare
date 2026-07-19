import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';

export function renderBackupSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  const s = tab.plugin.settings;
  const backupHeading = new Setting(el);
  backupHeading.setName('Backup & Storage');
  backupHeading.setHeading();

    const backupRepoName = s.backup.repository || tab.plugin.defaultBackupRepository();
    const backupUrl = `https://github.com/${s.githubOwner}/${backupRepoName}`;

    new Setting(el)
      .setName('GitHub repository')
      .setDesc(`Publish repo: ${s.githubOwner}/${s.masterRepository || 'noteflare-sites'} (your site source). Backup repo: ${s.githubOwner}/${backupRepoName} (your vault mirror, kept separate).`)
      .addText((t) => {
        t.setValue(backupRepoName);
        t.setDisabled(true);
      });

    const linkSetting = new Setting(el)
      .setName('View backup on GitHub')
      .setDesc('Open your private vault mirror in the browser.');
    linkSetting.controlEl.createEl('a', {
      text: 'Open Repository ↗',
      href: backupUrl,
    });
    // Open in default browser instead of Obsidian
    linkSetting.controlEl.querySelector('a')?.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(backupUrl);
    });

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

      const backupStatus = s.backup.lastBackupError
        ? `Needs attention: ${s.backup.lastBackupError}`
        : s.backup.lastBackupAt
          ? `Last backup: ${new Date(s.backup.lastBackupAt).toLocaleString()}`
          : 'No backup has run yet.';

      new Setting(el)
        .setName('Backup status')
        .setDesc(backupStatus)
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
    }
}
