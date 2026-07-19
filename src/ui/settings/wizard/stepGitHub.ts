import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { GitHubApi } from '../../../api/githubApi';
import { createErrorEl, showError, hideError, busy, idle } from '../settingsHelpers';

const GITHUB_TOKEN_URL = 'https://github.com/settings/tokens/new?scopes=repo,workflow&description=NoteFlare';

export function renderStepGitHub(tab: NoteFlareSettingsTab, el: HTMLElement): void {
    const heading = new Setting(el);
    heading.setName('Connect GitHub');
    heading.setHeading();

    el.createEl('p', {
      cls: 'setting-item-description',
      text: 'GitHub stores your site and vault backup. Your token is encrypted in your OS keychain — never logged.',
    });

    let tokenValue = tab.plugin.settings.githubToken;

    const tokenSetting = new Setting(el).setName('Personal access token');
    tokenSetting.descEl.appendText('Create one with ');
    tokenSetting.descEl.createEl('strong', { text: 'repo' });
    tokenSetting.descEl.appendText(' + ');
    tokenSetting.descEl.createEl('strong', { text: 'workflow' });
    tokenSetting.descEl.appendText(' scopes. ');
    tokenSetting.descEl.createEl('a', {
      text: 'Create token ↗',
      href: GITHUB_TOKEN_URL,
      attr: { target: '_blank', rel: 'noopener' },
    });
    tokenSetting.addText((text) => {
      text.setPlaceholder('ghp_…');
      text.inputEl.type = 'password';
      text.setValue(tokenValue);
      text.onChange((v) => {
        tokenValue = v.trim();
      });
    });

    const errorEl = createErrorEl(el);

    new Setting(el).addButton((btn) => {
      btn.setButtonText('Verify & continue').setCta();
      btn.onClick(() => {
        void (async () => {
          if (!tokenValue) return showError(errorEl, 'Please enter your GitHub token.');
          hideError(errorEl);
          busy(btn, 'Verifying…');
          try {
            const username = await new GitHubApi(tokenValue, '', '').getAuthenticatedUser();
            tab.plugin.settings.githubToken = tokenValue;
            tab.plugin.settings.githubOwner = username;
            await tab.plugin.saveSettings();
            tab.wizardStep = 'hosting';
            tab.render();
          } catch (err: unknown) {
            const msg = (err as Error).message;
            showError(
              errorEl,
              /invalid/i.test(msg)
                ? 'Token invalid or missing the repo scope. Check it and try again.'
                : msg,
            );
            idle(btn, 'Verify & continue');
          }
        })();
      });
    });
}
