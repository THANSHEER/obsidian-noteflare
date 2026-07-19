import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { buildCloudflareTokenUrl } from '../modals/helpers';
import { CloudflareApi } from '../../../api/cloudflareApi';
import { createErrorEl, showError, hideError, busy, idle } from '../settingsHelpers';
import { renderRestoreFromRegistry } from './restoreSection';

const CLOUDFLARE_APP_URL = 'https://github.com/apps/cloudflare-workers-and-pages/installations/new';
const CLOUDFLARE_TOKEN_URL = buildCloudflareTokenUrl();

export function renderConnectionsSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
    const s = tab.plugin.settings;

    // ── Section 1: Connections ──────────────────────────────────────────────
    const connHeading = new Setting(el);
    connHeading.setName('Connections');
    connHeading.setHeading();

    // GitHub row
    const ghSetting = new Setting(el).setName('GitHub');
    if (s.githubToken && s.githubOwner) {
      ghSetting.setDesc(`Connected as @${s.githubOwner}`);
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
      ghSetting.setDesc('Not connected');
      ghSetting.addButton((b) => {
        b.setButtonText('Connect').setCta();
        b.onClick(() => { tab.hasInitializedWizard = false; tab.wizardStep = 'github'; tab.render(); });
      });
    }

    // Cloudflare row
    const cfSetting = new Setting(el).setName('Cloudflare');
    if (s.cloudflareToken) {
      const accountHint = s.cloudflareAccount
        ? `Account: ${s.cloudflareAccount.slice(0, 8)}…`
        : 'Connected';
      cfSetting.setDesc(accountHint);
      // Reconnect is needed when the Cloudflare ↔ GitHub App authorization
      // is revoked (e.g. after deleting and recreating the repo).
      cfSetting.addButton((b) => {
        b.setButtonText('Reconnect to GitHub');
        b.setTooltip('Open Cloudflare ↔ GitHub App authorization if your builds are disconnected');
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
      cfSetting.setDesc('Not connected — required for Cloudflare Pages hosting');
      cfSetting.addButton((b) => {
        b.setButtonText('Connect');
        b.onClick(() => { tab.openCloudflareConnectFlow(); });
      });
    }

    // Restore from vault registry (shown only when sites exist in registry but not in settings)
    void renderRestoreFromRegistry(tab, el);

    // Reset is in the persistent footer below — removed from here to avoid duplication.
}

export function openCloudflareConnectFlow(tab: NoteFlareSettingsTab, containerEl: HTMLElement): void {
    const s = tab.plugin.settings;

    const heading = new Setting(containerEl);
    heading.setName('Connect Cloudflare');
    heading.setHeading();

    containerEl.createEl('p', {
      cls: 'setting-item-description',
      text: 'Two quick one-time steps in your browser:',
    });

    const cfSection = containerEl.createDiv();
    const repoSlug = `${s.githubOwner}/${s.masterRepository || 'noteflare-sites'}`;

    new Setting(cfSection)
      .setName('1. Create a Cloudflare API token')
      .setDesc('Creates a token with Pages, Workers, and Account permissions pre-filled.')
      .addButton((b) => {
        b.setButtonText('Create Token ↗');
        b.onClick(() => { window.open(CLOUDFLARE_TOKEN_URL, '_blank'); });
      });

    new Setting(cfSection)
      .setName('2. Authorize Cloudflare on GitHub')
      .setDesc(`Grant the "Cloudflare Workers and Pages" app access to: ${repoSlug}`)
      .addButton((b) => {
        b.setButtonText('Authorize ↗');
        b.onClick(() => { window.open(CLOUDFLARE_APP_URL, '_blank'); });
      });

    let cfToken = '';
    let cfAccount = '';

    new Setting(cfSection)
      .setName('Cloudflare API token')
      .setDesc('Stored encrypted in your OS keychain.')
      .addText((t) => {
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
