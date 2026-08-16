import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { FeedbackModal } from '../../feedback/feedbackModal';
import { bugReportFormUrl, featureRequestFormUrl } from '../../../api/geekstashApi';

export function renderFeedbackSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  const heading = new Setting(el);
  heading.setName('Feedback');
  heading.setHeading();

  new Setting(el)
    .setName('Send feedback')
    .setDesc('Share what’s working, what’s confusing, or what broke. Opens in your browser.')
    .addButton((b) => {
      b.setButtonText('Give feedback');
      b.onClick(() => {
        new FeedbackModal(tab.app).open();
      });
    });

  new Setting(el)
    .setName('Request a feature')
    .setDesc('Tell us what you’d like NoteFlare to do next. Opens in your browser.')
    .addButton((b) => {
      b.setButtonText('Request feature');
      b.setCta();
      b.onClick(() => {
        window.open(featureRequestFormUrl(), '_blank');
      });
    });

  new Setting(el)
    .setName('Report a bug')
    .setDesc('Files a GitHub issue — attach screenshots or videos there. Opens in your browser.')
    .addButton((b) => {
      b.setButtonText('Report bug');
      b.onClick(() => {
        window.open(bugReportFormUrl(), '_blank');
      });
    });
}
