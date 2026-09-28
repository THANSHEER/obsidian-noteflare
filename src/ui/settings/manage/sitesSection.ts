import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { EditSiteModal, RemoveSiteModal, AddSiteModal } from '../modals';

export function renderSitesSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  const s = tab.plugin.settings;

  if (!s.enablePublish) return;

  // ── Section: Sites ──────────────────────────────────────────────────────
  const sitesHeading = new Setting(el);
  sitesHeading.setName('Sites');
  sitesHeading.setHeading();

  // Panel location — display preference, shown here as "Appearance"
  new Setting(el)
    .setName('Panel location')
    .setDesc('Where the NoteFlare panel opens by default.')
    .addDropdown((d) => {
      d.addOption('left', 'Left sidebar');
      d.addOption('right', 'Right sidebar');
      d.addOption('tab', 'Main workspace tab');
      d.setValue(s.defaultViewLocation ?? 'left');
      d.onChange((v) => {
        void (async () => {
          s.defaultViewLocation = v as 'left' | 'right' | 'tab';
          await tab.plugin.saveSettings();
        })();
      });
    });

  // Site list
  if (s.sites.length === 0) {
    el.createEl('p', {
      cls: 'setting-item-description',
      text: 'No sites yet — add one to get started.',
    });
  } else {
    for (const site of s.sites) {
      const isLive = site.isPublished;
      const providerLabel =
        site.hostingProvider === 'cloud-worker'
          ? 'Cloud Worker'
          : site.hostingProvider === 'cloudflare'
            ? 'Cloudflare Pages'
            : 'Static Host';

      const siteSetting = new Setting(el)
        .setName(site.name || site.cloudflareProject || 'Site');

      // Replace default desc with structured elements
      siteSetting.descEl.empty();
      const descEl = siteSetting.descEl;
      descEl.addClass('nf-site-row-desc');

      // Live / Offline badge
      const statusBadge = descEl.createSpan({
        cls: `noteflare-badge ${isLive ? 'live' : 'offline'}`,
        text: isLive ? '● Live' : '● Offline',
      });
      void statusBadge;

      // Provider badge
      descEl.createSpan({ cls: 'nf-site-provider-badge', text: providerLabel });

      // Last published meta
      if (site.lastPublished) {
        const metaText = `${site.lastNoteCount} notes · ${new Date(site.lastPublished).toLocaleDateString()}`;
        descEl.createSpan({ cls: 'nf-site-row-meta', text: metaText });
      } else {
        descEl.createSpan({ cls: 'nf-site-row-meta', text: 'Not published yet' });
      }

      // External link (open site)
      if (site.siteUrl) {
        siteSetting.addExtraButton((b) =>
          b
            .setIcon('external-link')
            .setTooltip('Open site in browser')
            .onClick(() => {
              window.open(`https://${site.siteUrl}`, '_blank');
            }),
        );
      }

      siteSetting.addButton((b) =>
        b.setButtonText('Edit').onClick(() => {
          new EditSiteModal(tab.app, tab.plugin, site, () => tab.render()).open();
        }),
      );

      siteSetting.addButton((b) => {
        b.setButtonText('Remove');
        b.buttonEl.addClass('mod-warning');
        b.onClick(() => {
          new RemoveSiteModal(tab.app, tab.plugin, site, () => tab.render()).open();
        });
      });
    }
  }

  // Add site button
  new Setting(el).addButton((b) =>
    b
      .setButtonText('Add site')
      .setCta()
      .onClick(() => {
        new AddSiteModal(tab.app, tab.plugin, () => tab.render()).open();
      }),
  );
}
