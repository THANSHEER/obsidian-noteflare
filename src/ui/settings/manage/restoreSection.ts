import { Setting } from 'obsidian';
import type { NoteFlareSettingsTab } from '../settingsTab';
import { VaultRegistry } from '../../../core/vaultRegistry';
import { RegistryEntry } from '../../../core/types';
import { createErrorEl, showError } from '../settingsHelpers';

export async function renderRestoreFromRegistry(tab: NoteFlareSettingsTab, el: HTMLElement): Promise<void> {
    const s = tab.plugin.settings;
    const registry = await VaultRegistry.load(tab.app);
    const existingIds = new Set<string>(s.sites.map((site) => site.id));
    const orphaned = VaultRegistry.buildRestoredProfiles(registry.entries, existingIds);

    if (orphaned.length === 0) return;

    const restoreSection = el.createDiv('nf-restore-section');

    const restoreHeading = new Setting(restoreSection);
    restoreHeading.setName('Previous sites found');
    restoreHeading.setHeading();

    restoreSection.createEl('p', {
      cls: 'setting-item-description',
      text: `NoteFlare found ${orphaned.length} site${orphaned.length === 1 ? '' : 's'} from a previous installation in your vault registry. Restore them to continue using your existing GitHub repos and Cloudflare projects.`,
    });

    for (const entry of orphaned) {
      const label =
        `${entry.name || entry.masterRepository} · ${entry.hostingProvider === 'cloudflare' ? 'Cloudflare Pages' : 'GitHub Pages'}` +
        (entry.siteUrl ? ` · ${entry.siteUrl}` : '');
      restoreSection.createEl('p', { cls: 'setting-item-description', text: `• ${label}` });
    }

    const errorEl = createErrorEl(restoreSection);

    new Setting(restoreSection).addButton((b) => {
      b.setButtonText(`Restore ${orphaned.length} site${orphaned.length === 1 ? '' : 's'}`).setCta();
      b.onClick(() => {
        void (async () => {
          b.setDisabled(true).setButtonText('Restoring…');
          errorEl.hide();
          try {
            for (const entry of orphaned) {
              s.masterRepository = s.masterRepository || entry.masterRepository;
              s.githubOwner = s.githubOwner || entry.githubOwner;
              s.masterRepositoryPrivate = s.masterRepositoryPrivate || entry.masterRepositoryPrivate || false;
              // Rebuild a lightweight SiteProfile from the registry entry.
              const { createSiteProfile: create } = await import('../../../core/settings');
              const restoredSite = create({
                id: entry.id,
                name: entry.name,
                githubRepo: entry.masterRepository,
                githubBranch: entry.githubBranch,
                cloudflareProject: entry.cloudflareProject,
                siteUrl: entry.siteUrl,
                hostingProvider: entry.hostingProvider as RegistryEntry['hostingProvider'],
                lastPublished: entry.lastPublished,
                isPublished: !!entry.lastPublished,
              });
              s.sites.push(restoredSite);
            }
            s.activeSiteId = s.activeSiteId || s.sites[0]?.id || '';
            s.enablePublish = true;
            await tab.plugin.saveSettings();
            tab.render();
          } catch (err: unknown) {
            showError(errorEl, (err as Error).message);
            b.setDisabled(false).setButtonText(`Restore ${orphaned.length} site${orphaned.length === 1 ? '' : 's'}`);
          }
        })();
      });
    });
}
