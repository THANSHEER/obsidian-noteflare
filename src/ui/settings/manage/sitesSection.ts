import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { EditSiteModal, RemoveSiteModal, AddSiteModal } from '../modals';

export function renderSitesSection(tab: NoteFlareSettingsTab, el: HTMLElement): void {
  const s = tab.plugin.settings;
  if (s.enablePublish) {
    const sitesHeading = new Setting(el);
    sitesHeading.setName('Sites');
    sitesHeading.setHeading();

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

      if (s.sites.length === 0) {
        el.createEl('p', {
          cls: 'setting-item-description',
          text: 'No sites yet — add one to get started.',
        });
      } else {
        for (const site of s.sites) {
          const isLive = site.isPublished;
          const providerLabel =
            site.hostingProvider === 'cloudflare'
              ? 'Cloudflare Pages'
              : 'GitHub Pages';
          const statusText = site.lastPublished
            ? `Last published ${new Date(site.lastPublished).toLocaleString()} · ${site.lastNoteCount} notes`
            : 'Not published yet';

          const siteSetting = new Setting(el)
            .setName(site.name || site.cloudflareProject || 'Site')
            .setDesc(`${isLive ? '🟢 Live' : '⚪ Offline'} · ${providerLabel} · ${statusText}`);

          const cfConnected = !!tab.plugin.settings.cloudflareToken;
          siteSetting.addDropdown((d) => {
            d.addOption('github-pages', 'GitHub Pages');
            if (cfConnected) {
              d.addOption('cloudflare', 'Cloudflare Pages');
            }
            // Only set 'cloudflare' if the option exists; otherwise fall back to github-pages.
            const storedProvider = site.hostingProvider || 'github-pages';
            d.setValue(cfConnected ? storedProvider : 'github-pages');
            d.onChange((v) => {
              void (async () => {
                site.hostingProvider = v as 'github-pages' | 'cloudflare';
                await tab.plugin.saveSettings();
                tab.render();
              })();
            });
          });

          if (site.siteUrl) {
            siteSetting.addExtraButton((b) =>
              b
                .setIcon('external-link')
                .setTooltip('Open site')
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

      new Setting(el).addButton((b) =>
        b
          .setButtonText('Add site')
          .setCta()
          .onClick(() => {
            new AddSiteModal(tab.app, tab.plugin, () => tab.render()).open();
          }),
      );
    }
}
