import { App } from 'obsidian';
import { RegistryEntry, VaultRegistry as VaultRegistryData, SiteProfile } from './types';

/**
 * Persists minimal site references to `.noteflare/registry.json` in the vault
 * root. This file survives plugin uninstall/reinstall, letting users restore
 * their existing GitHub repos and Cloudflare projects without re-provisioning.
 *
 * The registry is intentionally NOT cleared on Hard Reset — the reset wipes the
 * plugin's internal settings (tokens, site profiles) but leaves the registry so
 * the user can immediately restore their sites after reconnecting credentials.
 */

const REGISTRY_DIR = '.noteflare';
const REGISTRY_PATH = '.noteflare/registry.json';

export class VaultRegistry {
  /** Load the registry from disk, returning an empty registry if not found. */
  static async load(app: App): Promise<VaultRegistryData> {
    try {
      const raw = await app.vault.adapter.read(REGISTRY_PATH);
      const parsed = JSON.parse(raw) as VaultRegistryData;
      if (parsed.version === 1 && Array.isArray(parsed.entries)) {
        return parsed;
      }
    } catch {
      // File doesn't exist or is corrupted — start fresh.
    }
    return { version: 1, entries: [] };
  }

  /** Write the registry to disk, creating the `.noteflare/` directory if needed. */
  static async save(app: App, registry: VaultRegistryData): Promise<void> {
    try {
      const exists = await app.vault.adapter.exists(REGISTRY_DIR);
      if (!exists) {
        await app.vault.adapter.mkdir(REGISTRY_DIR);
      }
      await app.vault.adapter.write(REGISTRY_PATH, JSON.stringify(registry, null, 2));
    } catch (err) {
      // Non-fatal — the manage panel will still work, the registry just won't persist.
      console.warn('NoteFlare: could not write vault registry:', err);
    }
  }

  /**
   * Add or update a single site entry derived from a `SiteProfile`.
   * Called automatically by `saveSettings()` so the registry stays in sync.
   */
  static async upsert(
    app: App,
    site: SiteProfile,
    masterRepository: string,
    githubOwner: string,
    masterRepositoryPrivate: boolean,
  ): Promise<void> {
    const registry = await VaultRegistry.load(app);
    const entry: RegistryEntry = {
      id: site.id,
      name: site.name,
      masterRepository,
      githubOwner,
      githubBranch: site.githubBranch,
      cloudflareProject: site.cloudflareProject,
      siteUrl: site.siteUrl,
      hostingProvider: site.hostingProvider,
      lastPublished: site.lastPublished,
      masterRepositoryPrivate,
    };
    const idx = registry.entries.findIndex((e) => e.id === site.id);
    if (idx >= 0) {
      registry.entries[idx] = entry;
    } else {
      registry.entries.push(entry);
    }
    await VaultRegistry.save(app, registry);
  }

  /** Remove a site from the registry by ID. */
  static async remove(app: App, siteId: string): Promise<void> {
    const registry = await VaultRegistry.load(app);
    registry.entries = registry.entries.filter((e) => e.id !== siteId);
    await VaultRegistry.save(app, registry);
  }

  /**
   * Rebuild `SiteProfile` stubs from registry entries that aren't already in
   * `existingSiteIds`. Used during restore-after-reinstall: creates lightweight
   * profiles with no credential data (credentials come from the OS keychain via
   * the plugin's normal load path).
   */
  static buildRestoredProfiles(
    entries: RegistryEntry[],
    existingSiteIds: Set<string>,
  ): RegistryEntry[] {
    return entries.filter((e) => !existingSiteIds.has(e.id));
  }
}
