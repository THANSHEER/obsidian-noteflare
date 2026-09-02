import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { renderSupportCard } from '../../feedback/supportCard';
import { WhatsNewModal } from '../../feedback/whatsNewModal';

export function renderFeedbackSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  const heading = new Setting(el);
  heading.setName('Feedback & support');
  heading.setHeading();

  const container = el.createDiv({ cls: 'nf-feedback-card-wrapper' });
  renderSupportCard(container, tab.app, {
    onOpenChangelog: () => {
      new WhatsNewModal(tab.app, tab.plugin.manifest.version, null).open();
    },
  });
}
