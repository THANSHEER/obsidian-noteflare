import { App } from 'obsidian';

export const MERMAID_FLOW_PLUGIN_ID = 'mermaid-flow';
export const OMNICHAT_PLUGIN_ID = 'aibrowser-chat';

interface CommunityPluginInstance {
  openPluginPage?: (id: string) => void;
}

interface InternalPluginWrapper {
  instance?: CommunityPluginInstance;
}

interface InternalPluginsManager {
  getPluginById?: (id: string) => InternalPluginWrapper | undefined;
}

interface CommunityPluginsTab {
  openPluginPage?: (id: string) => void;
}

interface AppSettingManager {
  open?: () => void;
  openTabById?: (id: string) => CommunityPluginsTab | undefined;
}

interface AppWithInternals {
  internalPlugins?: InternalPluginsManager;
  setting?: AppSettingManager;
}

/**
 * Opens an Obsidian Community Plugin directly inside Obsidian's plugin window.
 * Ensures the plugin detail page opens internally in Obsidian without launching an external web browser.
 */
export function openCommunityPlugin(app: App, pluginId: string): void {
  const appInternals = app as unknown as AppWithInternals;

  // Strategy 1: Use Obsidian's internal Community Plugins manager instance if available
  try {
    const communityPlugins = appInternals.internalPlugins?.getPluginById?.('community-plugins')?.instance;
    if (communityPlugins && typeof communityPlugins.openPluginPage === 'function') {
      communityPlugins.openPluginPage(pluginId);
      return;
    }
  } catch {
    // Continue to next strategy
  }

  // Strategy 2: Open Community Plugins tab via Settings and invoke openPluginPage
  try {
    const setting = appInternals.setting;
    if (setting) {
      setting.open?.();
      const tab = setting.openTabById?.('community-plugins');
      if (tab && typeof tab.openPluginPage === 'function') {
        tab.openPluginPage(pluginId);
        return;
      }
    }
  } catch {
    // Continue to next strategy
  }

  // Strategy 3: Trigger native Obsidian URI (obsidian://show-plugin?id=...)
  // Clicking an anchor with obsidian:// inside the Obsidian window triggers Obsidian's
  // internal URI protocol handler without launching an external web browser.
  try {
    const uri = `obsidian://show-plugin?id=${encodeURIComponent(pluginId)}`;
    if (typeof createEl === 'function') {
      const link = createEl('a', { href: uri });
      link.click();
      return;
    }
    if (typeof document !== 'undefined') {
      const link = document.createElement('a');
      link.href = uri;
      link.click();
      return;
    }
  } catch {
    // Fallback
  }

  if (typeof window !== 'undefined' && typeof window.open === 'function') {
    window.open(`obsidian://show-plugin?id=${encodeURIComponent(pluginId)}`);
  }
}
