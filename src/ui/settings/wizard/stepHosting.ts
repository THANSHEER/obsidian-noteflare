import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { slugify, provisionSite } from '../modals/helpers';
import { createErrorEl, showError, hideError, busy, idle } from '../settingsHelpers';
import { PathSuggestModal } from '../modals/pathSuggestModal';

export function renderStepHosting(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  const heading = new Setting(el);
  heading.setName('Set up your Cloud Engine Site');
  heading.setHeading();

  el.createEl('p', {
    cls: 'setting-item-description',
    text: 'NoteFlare deploys your site instantly via the Cloud Worker API engine. No manual dashboard approval or GitHub App installation required!',
  });

  // ── Site name ─────────────────────────────────────────────────────────────
  let siteName = tab.pendingName || 'my-notes';
  new Setting(el)
    .setName('Site name')
    .setDesc('Used for your live site address. Lowercase letters, numbers, and dashes.')
    .addText((text) => {
      text.setPlaceholder('my-notes');
      text.setValue(siteName);
      text.onChange((v) => {
        siteName = v;
      });
    });

  // ── Master repo name (optional content backup) ───────────────────────────
  let masterRepo = tab.plugin.settings.masterRepository || 'noteflare-sites';
  new Setting(el)
    .setName('GitHub repository name (Optional backup store)')
    .setDesc('Optional private GitHub repository to keep a raw Markdown copy of your published content.')
    .addText((text) => {
      text.setPlaceholder('noteflare-sites');
      text.setValue(masterRepo);
      text.onChange((v) => {
        masterRepo = v.trim();
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
          hideError(errorEl);
          busy(btn, 'Setting up…');

          try {
            if (masterRepo.trim()) {
              tab.plugin.settings.masterRepository = masterRepo.trim();
            }
            await tab.plugin.saveSettings();

            busy(btn, 'Creating your site…');
            const site = await provisionSite(
              tab.plugin,
              siteName,
              { publishScope: scope, publishPaths: paths },
              'cloud-worker',
            );
            tab.plugin.settings.sites.push(site);
            tab.plugin.settings.activeSiteId = site.id;
            tab.plugin.settings.enablePublish = true;
            await tab.plugin.saveSettings();

            tab.pendingName = siteName;
            tab.pendingScope = scope;
            tab.pendingPaths = paths;
            tab.pendingProvider = 'cloud-worker';
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
