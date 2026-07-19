import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';

export function renderStepDone(tab: NoteFlareSettingsTab, el: HTMLElement): void {
    const site = tab.plugin.getActiveSite();

    const heading = new Setting(el);
    heading.setName('You\'re all set! 🎉');
    heading.setHeading();

    const doneMsg = new Setting(el).setName(
      site ? 'Your site is ready to publish' : 'Automatic backup is ready',
    );
    if (site?.siteUrl) {
      doneMsg.descEl.appendText('Your site will be live at: ');
      doneMsg.descEl.createEl('a', {
        text: `https://${site.siteUrl}`,
        href: `https://${site.siteUrl}`,
        attr: { target: '_blank', rel: 'noopener' },
      });
    } else {
      doneMsg.setDesc('NoteFlare will protect your vault quietly using your chosen schedule.');
    }

    new Setting(el)
      .addButton((later) => {
        later.setButtonText(site ? "I'll publish later" : 'Open configuration');
        later.onClick(() => {
          void (async () => {
            tab.hasInitializedWizard = false;
            if (site) tab.closeSettings();
            else tab.render();
          })();
        });
      })
      .addButton((btn) => {
        btn.setButtonText(site ? 'Publish now' : 'Back up now').setCta();
        btn.onClick(() => {
          void (async () => {
            tab.hasInitializedWizard = false;
            tab.closeSettings();
            if (site) await tab.plugin.doPublish();
            else await tab.plugin.doBackup(false);
          })();
        });
      });
}
