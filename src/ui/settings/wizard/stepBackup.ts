import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { createErrorEl, hideError } from '../settingsHelpers';

export function renderStepBackup(tab: NoteFlareSettingsTab, el: HTMLElement): void {
    const heading = new Setting(el);
    heading.setName('Automatic backup (optional)');
    heading.setHeading();

    el.createEl('p', {
      cls: 'setting-item-description',
      text: 'NoteFlare can silently mirror your entire vault to a private GitHub repository. No manual steps — it runs in the background.',
    });

    let enableBackup = tab.plugin.settings.enableBackup;
    let repoVisibility = tab.plugin.settings.backup.repoVisibility ?? 'private';

    new Setting(el)
      .setName('Enable automatic backup')
      .setDesc('Run a backup after vault changes and/or on a schedule.')
      .addToggle((t) => {
        t.setValue(enableBackup);
        t.onChange((v) => {
          enableBackup = v;
          visibilitySection.setCssStyles({ display: v ? 'block' : 'none' });
        });
      });

    const visibilitySection = el.createDiv();
    visibilitySection.setCssStyles({ display: enableBackup ? 'block' : 'none' });

    new Setting(visibilitySection)
      .setName('Backup repository visibility')
      .setDesc('Private keeps your notes confidential. Public makes the repo visible on GitHub (not recommended for personal notes).')
      .addDropdown((d) => {
        d.addOption('private', '🔒 Private (recommended)');
        d.addOption('public', '🌐 Public');
        d.setValue(repoVisibility);
        d.onChange((v) => { repoVisibility = v as 'private' | 'public'; });
      });

    const errorEl = createErrorEl(el);

    new Setting(el)
      .addButton((back) => {
        back.setButtonText('Back');
        back.onClick(() => { tab.wizardStep = 'hosting'; tab.render(); });
      })
      .addButton((btn) => {
        btn.setButtonText('Finish setup').setCta();
        btn.onClick(() => {
          void (async () => {
            hideError(errorEl);
            tab.plugin.settings.enableBackup = enableBackup;
            tab.plugin.settings.backup.repoVisibility = repoVisibility;
            if (enableBackup && !tab.plugin.settings.backup.repository) {
              // Use the vault-derived backup repo name — NOT the publish master repo.
              tab.plugin.settings.backup.repository = tab.plugin.defaultBackupRepository();
            }
            tab.plugin.settings.setupComplete = true;
            await tab.plugin.saveSettings();
            tab.wizardStep = 'done';
            tab.render();
          })();
        });
      });
}
