import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { renderSupportCard } from '../../feedback/supportCard';
import { WhatsNewModal } from '../../feedback/whatsNewModal';

export function renderFeedbackSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  const heading = new Setting(el);
  heading.setName('Feedback & support');
  heading.setHeading();

  new Setting(el)
    .setName('Show release notes after updates')
    .setDesc('Display release notes and what’s new modal automatically when NoteFlare is updated.')
    .addToggle((toggle) => {
      toggle.setValue(tab.plugin.settings.showWhatsNewOnUpdate !== false);
      toggle.onChange(async (val) => {
        tab.plugin.settings.showWhatsNewOnUpdate = val;
        await tab.plugin.saveSettings();
      });
    });

  new Setting(el)
    .setName('Release notes')
    .setDesc('View changelog and what’s new in NoteFlare.')
    .addButton((btn) => {
      btn.setButtonText('View release notes');
      btn.onClick(() => {
        new WhatsNewModal(tab.app, tab.plugin.manifest.version, null, tab.plugin).open();
      });
    });

  const container = el.createDiv({ cls: 'nf-feedback-card-wrapper' });
  renderSupportCard(container, tab.app, {
    onOpenChangelog: () => {
      new WhatsNewModal(tab.app, tab.plugin.manifest.version, null, tab.plugin).open();
    },
  });
}
