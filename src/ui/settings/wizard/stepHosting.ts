import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { CloudflareApi } from '../../../api/cloudflareApi';
import { buildCloudflareTokenUrl, slugify, provisionSite } from '../modals/helpers';
import { createErrorEl, showError, hideError, busy, idle } from '../settingsHelpers';
import { PathSuggestModal } from '../modals/pathSuggestModal';

const CLOUDFLARE_APP_URL = 'https://github.com/apps/cloudflare-workers-and-pages/installations/new';
const CLOUDFLARE_TOKEN_URL = buildCloudflareTokenUrl();

export function renderStepHosting(tab: NoteFlareSettingsTab, el: HTMLElement): void {
    const heading = new Setting(el);
    heading.setName('Set up Cloudflare Pages & create your site');
    heading.setHeading();

    el.createEl('p', {
      cls: 'setting-item-description',
      text: "NoteFlare publishes to Cloudflare Pages — a free global CDN with instant deploy controls. You'll need a free Cloudflare account.",
    });

    // ── Site name ─────────────────────────────────────────────────────────────
    let siteName = tab.pendingName || 'my-notes';
    new Setting(el)
      .setName('Site name')
      .setDesc('Used for your repository and site address. Lowercase letters, numbers, and dashes.')
      .addText((text) => {
        text.setPlaceholder('my-notes');
        text.setValue(siteName);
        text.onChange((v) => {
          siteName = v;
          // Hint doesn't reference siteName, but update in case subclass overrides.
        });
      });

    // ── Master repo name ──────────────────────────────────────────────────────
    let masterRepo = tab.plugin.settings.masterRepository || 'noteflare-sites';
    new Setting(el)
      .setName('GitHub repository name')
      .setDesc('All your NoteFlare sites will live inside this single repository.')
      .addText((text) => {
        text.setPlaceholder('noteflare-sites');
        text.setValue(masterRepo);
        text.onChange((v) => {
          masterRepo = v.trim();
          updateCfAppHint();
        });
      });

    // ── Publish scope ─────────────────────────────────────────────────────────
    let scope = tab.pendingScope;
    let paths = [...tab.pendingPaths];

    new Setting(el)
      .setName('Publish scope')
      .setDesc('Publish the entire vault or only selected files and folders.')
      .addDropdown((d) => {
        d.addOption('vault', 'Full vault');
        d.addOption('selected', 'Selected files / folders');
        d.setValue(scope);
        d.onChange((v) => {
          scope = v as 'vault' | 'selected';
          renderPaths();
        });
      });

    const pathsContainer = el.createDiv('noteflare-paths-container');
    const renderPaths = () => {
      pathsContainer.empty();
      if (scope === 'vault') {
        pathsContainer.setCssStyles({ display: 'none' });
        return;
      }
      pathsContainer.setCssStyles({ display: 'block' });
      if (paths.length === 0) {
        pathsContainer.createEl('p', { text: 'No items selected.', cls: 'noteflare-muted' });
      } else {
        const list = pathsContainer.createEl('ul', { cls: 'noteflare-path-list' });
        for (let i = 0; i < paths.length; i++) {
          const li = list.createEl('li');
          li.setCssStyles({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' });
          li.createSpan({ text: paths[i] });
          const rb = li.createEl('button', { text: '✕' });
          rb.addEventListener('click', () => { paths.splice(i, 1); renderPaths(); });
        }
      }
      const addRow = pathsContainer.createDiv();
      addRow.setCssStyles({ marginTop: '8px' });
      const addBtn = addRow.createEl('button', { text: 'Browse vault…' });
      addBtn.setCssStyles({ width: '100%' });
      addBtn.addEventListener('click', () => {
        new PathSuggestModal(tab.app, (p) => {
          if (!paths.includes(p)) { paths.push(p); renderPaths(); }
        }).open();
      });
    };
    renderPaths();

    // ── Cloudflare credentials ────────────────────────────────────────────────
    let cfToken = tab.plugin.settings.cloudflareToken;
    let cfAccount = tab.plugin.settings.cloudflareAccount;

    // Live-update the Authorize button description as the user edits the repo name.
    let cfAppHintEl: HTMLElement | null = null;
    const updateCfAppHint = () => {
      if (cfAppHintEl) {
        cfAppHintEl.setText(
          `Grant the "Cloudflare Workers and Pages" app access to: ${tab.plugin.settings.githubOwner}/${masterRepo || 'noteflare-sites'}`,
        );
      }
    };

    new Setting(el)
      .setName('1. Create a Cloudflare API token')
      .setDesc('Creates a token with Pages, Workers, and Account permissions pre-filled.')
      .addButton((b) => {
        b.setButtonText('Create Token ↗');
        b.onClick(() => { window.open(CLOUDFLARE_TOKEN_URL, '_blank'); });
      });

    const cfAppSetting = new Setting(el)
      .setName('2. Authorize Cloudflare on GitHub')
      .setDesc(`Grant the "Cloudflare Workers and Pages" app access to: ${tab.plugin.settings.githubOwner}/${masterRepo || 'noteflare-sites'}`)
      .addButton((b) => {
        b.setButtonText('Authorize ↗');
        b.onClick(() => { window.open(CLOUDFLARE_APP_URL, '_blank'); });
      });
    cfAppHintEl = cfAppSetting.descEl;

    new Setting(el)
      .setName('Cloudflare API token')
      .setDesc('Stored encrypted in your OS keychain.')
      .addText((t) => {
        t.setPlaceholder('Paste API token…');
        t.inputEl.type = 'password';
        t.setValue(cfToken);
        t.onChange((v) => { cfToken = v.trim(); });
      });

    new Setting(el)
      .setName('Cloudflare account ID')
      .setDesc('Optional — detected automatically from your token.')
      .addText((t) => {
        t.setPlaceholder('Auto-detected');
        t.setValue(cfAccount);
        t.onChange((v) => { cfAccount = v.trim(); });
      });

    const errorEl = createErrorEl(el);

    new Setting(el)
      .addButton((back) => {
        back.setButtonText('Back');
        back.onClick(() => { tab.wizardStep = 'github'; tab.render(); });
      })
      .addButton((btn) => {
        btn.setButtonText('Continue').setCta();
        btn.onClick(() => {
          void (async () => {
            const nameSlug = slugify(siteName);
            if (!nameSlug) return showError(errorEl, 'Please enter a site name.');
            if (!masterRepo.trim()) return showError(errorEl, 'Please enter a repository name.');
            if (!cfToken) return showError(errorEl, 'Please paste your Cloudflare API token.');
            hideError(errorEl);
            busy(btn, 'Setting up…');

            try {
              tab.plugin.settings.masterRepository = masterRepo.trim();

              // Auto-detect Cloudflare account ID from token if not provided.
              let accountId = cfAccount;
              if (!accountId) {
                busy(btn, 'Detecting Cloudflare account…');
                accountId = await new CloudflareApi(cfToken, '').getAccountId();
              }
              tab.plugin.settings.cloudflareToken = cfToken;
              tab.plugin.settings.cloudflareAccount = accountId;
              await tab.plugin.saveSettings();

              busy(btn, 'Creating your site…');
              const site = await provisionSite(
                tab.plugin,
                siteName,
                { publishScope: scope, publishPaths: paths },
                'cloudflare',
              );
              tab.plugin.settings.sites.push(site);
              tab.plugin.settings.activeSiteId = site.id;
              tab.plugin.settings.enablePublish = true;
              await tab.plugin.saveSettings();

              tab.pendingName = siteName;
              tab.pendingScope = scope;
              tab.pendingPaths = paths;
              tab.pendingProvider = 'cloudflare';
              tab.wizardStep = 'backup';
              tab.render();
            } catch (err: unknown) {
              showError(errorEl, (err as Error).message);
              idle(btn, 'Continue');
            }
          })();
        });
      });
}
