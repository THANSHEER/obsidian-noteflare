import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { renderSupportCard } from '../../feedback/supportCard';
import { WhatsNewModal } from '../../feedback/whatsNewModal';
import {
  MERMAID_FLOW_PLUGIN_ID,
  OMNICHAT_PLUGIN_ID,
  openCommunityPlugin,
} from '../../communityPluginOpener';

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
    .setName('Other plugins by the author')
    .setDesc('Explore Mermaid Flow and OmniChat directly inside Obsidian Community Plugins.')
    .addButton((btn) => {
      btn.setButtonText('Mermaid Flow');
      btn.setTooltip('Visual drag-and-drop Mermaid flowchart editor');
      btn.onClick(() => {
        openCommunityPlugin(tab.app, MERMAID_FLOW_PLUGIN_ID);
      });
    })
    .addButton((btn) => {
      btn.setButtonText('OmniChat');
      btn.setTooltip('Embedded AI browser for ChatGPT, Claude, Gemini & more');
      btn.onClick(() => {
        openCommunityPlugin(tab.app, OMNICHAT_PLUGIN_ID);
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
