import { Setting, setIcon } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { buildCloudflareTokenUrl } from '../modals/helpers';
import { CloudflareApi } from '../../../api/cloudflareApi';
import { createErrorEl, showError, hideError, busy, idle } from '../settingsHelpers';
import { renderRestoreFromRegistry } from './restoreSection';

const CLOUDFLARE_TOKEN_URL = buildCloudflareTokenUrl();

export function renderConnectionsSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
    const s = tab.plugin.settings;

    // ── Section: Connections ────────────────────────────────────────────────
    const connHeading = new Setting(el);
    connHeading.setName('Connections');
    connHeading.setHeading();

    // GitHub row
    const ghSetting = new Setting(el).setName('GitHub');
    if (s.githubToken && s.githubOwner) {
      const descEl = ghSetting.descEl;
      descEl.addClass('nf-conn-desc');
      const dot = descEl.createSpan({ cls: 'nf-status-dot connected' });
      void dot;
      const iconSpan = descEl.createSpan();
      setIcon(iconSpan, 'check');
      iconSpan.setCssStyles({ display: 'inline-flex', alignItems: 'center', width: '13px', height: '13px', color: 'var(--color-green)', marginRight: '3px' });
      descEl.createSpan({ text: `Connected as @${s.githubOwner}` });

      ghSetting.addButton((b) => {
        b.setButtonText('Disconnect');
        b.buttonEl.addClass('mod-warning');
        b.onClick(() => {
          void (async () => {
            s.githubToken = '';
            s.githubOwner = '';
            s.setupComplete = false;
            await tab.plugin.saveSettings();
            tab.hasInitializedWizard = false;
            tab.wizardStep = 'github';
            tab.render();
          })();
        });
      });
    } else {
      const descEl = ghSetting.descEl;
      descEl.addClass('nf-conn-desc');
      const dot = descEl.createSpan({ cls: 'nf-status-dot disconnected' });
      void dot;
      descEl.createSpan({ text: 'Not connected' });

      ghSetting.addButton((b) => {
        b.setButtonText('Connect').setCta();
        b.onClick(() => { tab.hasInitializedWizard = false; tab.wizardStep = 'github'; tab.render(); });
      });
    }

    // Cloudflare row
    const cfSetting = new Setting(el).setName('Cloudflare');
    if (s.cloudflareToken) {
      const descEl = cfSetting.descEl;
      descEl.addClass('nf-conn-desc');
      const dot = descEl.createSpan({ cls: 'nf-status-dot connected' });
      void dot;
      const iconSpan = descEl.createSpan();
      setIcon(iconSpan, 'check');
      iconSpan.setCssStyles({ display: 'inline-flex', alignItems: 'center', width: '13px', height: '13px', color: 'var(--color-green)', marginRight: '3px' });
      const accountHint = s.cloudflareAccount
        ? `Connected · Account ${s.cloudflareAccount.slice(0, 8)}…`
        : 'Connected';
      descEl.createSpan({ text: accountHint });

      const CLOUDFLARE_APP_URL = 'https://github.com/apps/cloudflare-workers-and-pages/installations/new';
      cfSetting.addButton((b) => {
        b.setButtonText('Authorize GitHub App ↗');
        b.setTooltip('Authorize Cloudflare on GitHub if using legacy Cloudflare Pages');
        b.onClick(() => { window.open(CLOUDFLARE_APP_URL, '_blank'); });
      });
      cfSetting.addButton((b) => {
        b.setButtonText('Disconnect');
        b.buttonEl.addClass('mod-warning');
        b.onClick(() => {
          void (async () => {
            s.cloudflareToken = '';
            s.cloudflareAccount = '';
            await tab.plugin.saveSettings();
            tab.render();
          })();
        });
      });
    } else {
      const descEl = cfSetting.descEl;
      descEl.addClass('nf-conn-desc');
      const dot = descEl.createSpan({ cls: 'nf-status-dot disconnected' });
      void dot;
      descEl.createSpan({ text: 'Not connected — required for Cloudflare Pages hosting' });

      cfSetting.addButton((b) => {
        b.setButtonText('Connect');
        b.onClick(() => { tab.openCloudflareConnectFlow(); });
      });
    }

    // Restore from vault registry (shown only when sites exist in registry but not in settings)
    void renderRestoreFromRegistry(tab, el);
}

export function openCloudflareConnectFlow(tab: NoteFlareSettingsTab, containerEl: HTMLElement): void {
    const s = tab.plugin.settings;

    const heading = new Setting(containerEl);
    heading.setName('Connect Cloudflare');
    heading.setHeading();

    containerEl.createEl('p', {
      cls: 'setting-item-description',
      text: 'Enter your Cloudflare API credentials below:',
    });

    const cfSection = containerEl.createDiv();

    let cfToken = '';
    let cfAccount = '';

    const CLOUDFLARE_APP_URL = 'https://github.com/apps/cloudflare-workers-and-pages/installations/new';
    const cfTokenSetting = new Setting(cfSection).setName('Cloudflare API token');
    cfTokenSetting.descEl.appendText('Pre-filled permissions for Pages & Workers. ');
    cfTokenSetting.descEl.createEl('a', {
      text: 'Create token ↗',
      href: CLOUDFLARE_TOKEN_URL,
      attr: { target: '_blank', rel: 'noopener' },
    });
    cfTokenSetting.descEl.appendText(' · ');
    cfTokenSetting.descEl.createEl('a', {
      text: 'Authorize Pages App ↗',
      href: CLOUDFLARE_APP_URL,
      attr: { target: '_blank', rel: 'noopener', title: 'One-time authorization for legacy Cloudflare Pages' },
    });
    cfTokenSetting.addText((t) => {
      t.setPlaceholder('Paste API token…');
      t.inputEl.type = 'password';
      t.onChange((v) => { cfToken = v.trim(); });
    });

    new Setting(cfSection)
      .setName('Cloudflare account ID')
      .setDesc('Optional — detected automatically from your token.')
      .addText((t) => {
        t.setPlaceholder('Auto-detected');
        t.onChange((v) => { cfAccount = v.trim(); });
      });

    const errorEl = createErrorEl(containerEl);

    new Setting(containerEl)
      .addButton((back) => {
        back.setButtonText('Cancel');
        back.onClick(() => {
          tab.isCloudflareConnectFlowOpen = false;
          tab.render();
        });
      })
      .addButton((btn) => {
        btn.setButtonText('Save & connect').setCta();
        btn.onClick(() => {
          void (async () => {
            if (!cfToken) return showError(errorEl, 'Please paste your Cloudflare API token.');
            hideError(errorEl);
            busy(btn, 'Verifying…');
            try {
              let accountId = cfAccount;
              if (!accountId) {
                busy(btn, 'Detecting account…');
                accountId = await new CloudflareApi(cfToken, '').getAccountId();
              }
              s.cloudflareToken = cfToken;
              s.cloudflareAccount = accountId;
              await tab.plugin.saveSettings();
              tab.isCloudflareConnectFlowOpen = false;
              tab.render();
            } catch (err: unknown) {
              showError(errorEl, (err as Error).message);
              idle(btn, 'Save & connect');
            }
          })();
        });
      });
}
