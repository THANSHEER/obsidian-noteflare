import { App, Component, Modal, Setting, MarkdownRenderer, setIcon } from 'obsidian';
import { type GitHubReleaseNotes } from '../../api/geekstashApi';
import { getChangelogForVersion } from '../../core/changelogData';
import { KOFI_URL } from '../../core/constants';
import {
  MERMAID_FLOW_PLUGIN_ID,
  OMNICHAT_PLUGIN_ID,
  openCommunityPlugin,
} from '../communityPluginOpener';


function normalizeVersion(v: string): string {
  return v.replace(/^v/, '').trim();
}

export interface WhatsNewPluginContext {
  settings: {
    showWhatsNewOnUpdate?: boolean;
  };
  saveSettings(): Promise<void>;
}

/**
 * Shown after a plugin update or on demand from settings / command palette.
 * Professional, clean hero layout with the official NoteFlare logo, version number,
 * official Ko-fi sponsor button, rich markdown release notes, and community plugins launcher.
 */
export class WhatsNewModal extends Modal {
  private component = new Component();
  private cleanVersion: string;

  constructor(
    app: App,
    version: string,
    private release: GitHubReleaseNotes | null,
    private plugin?: WhatsNewPluginContext,
  ) {
    super(app);
    this.cleanVersion = normalizeVersion(version);
  }

  override onOpen(): void {
    this.component.load();
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass('nf-whatsnew-modal');
    this.titleEl.setText('What’s new in NoteFlare');

    // 1. Centered Hero Header
    const heroEl = contentEl.createDiv({ cls: 'nf-whatsnew-hero' });

    // Big NoteFlare Logo (Obsidian green tile with white globe icon)
    const logoEl = heroEl.createDiv({ cls: 'nf-hero-logo' });
    const globeIcon = logoEl.createSpan({ cls: 'nf-hero-globe' });
    setIcon(globeIcon, 'globe');

    // Centered Title & New Version Number below logo
    heroEl.createEl('h2', { cls: 'nf-hero-title', text: 'What’s new in NoteFlare' });
    heroEl.createSpan({ cls: 'nf-hero-version-badge', text: `v${this.cleanVersion}` });

    // Official Ko-fi Button below version number — uses the real Ko-fi branded image
    const kofiBtn = heroEl.createEl('a', {
      cls: 'nf-official-kofi-btn',
      href: KOFI_URL,
      attr: {
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': 'Support me on Ko-fi',
      },
    });
    kofiBtn.createEl('img', {
      attr: {
        src: 'https://storage.ko-fi.com/cdn/kofi3.png?v=6',
        alt: 'Buy Me a Coffee at ko-fi.com',
        height: '36',
        style: 'border:0px;height:36px;',
        border: '0',
      },
    });
    kofiBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(KOFI_URL, '_blank');
    });

    // 2. Release Notes below the Ko-fi button
    const bodyText =
      this.release?.body?.trim() ||
      getChangelogForVersion(this.cleanVersion);

    const notesEl = contentEl.createDiv({ cls: 'nf-whatsnew-body markdown-rendered' });
    void MarkdownRenderer.render(this.app, bodyText, notesEl, '', this.component);

    // 3. Other plugins by author
    const moreRow = contentEl.createDiv({ cls: 'nf-whatsnew-more-row' });
    moreRow.createSpan({
      cls: 'nf-whatsnew-more-label',
      text: 'Other plugins by the author:',
    });

    const pluginsList = moreRow.createDiv({ cls: 'nf-whatsnew-plugins-list' });

    // Mermaid Flow
    const mermaidPill = pluginsList.createEl('a', {
      cls: 'nf-plugin-pill',
      href: `obsidian://show-plugin?id=${MERMAID_FLOW_PLUGIN_ID}`,
      attr: { role: 'button', 'aria-label': 'Open in community plugins' },
    });
    const mermaidIcon = mermaidPill.createSpan({ cls: 'nf-pill-icon' });
    setIcon(mermaidIcon, 'workflow');
    mermaidPill.createSpan({ text: 'Mermaid Flow' });
    mermaidPill.addEventListener('click', (e) => {
      e.preventDefault();
      openCommunityPlugin(this.app, MERMAID_FLOW_PLUGIN_ID);
    });

    // OmniChat
    const omniPill = pluginsList.createEl('a', {
      cls: 'nf-plugin-pill',
      href: `obsidian://show-plugin?id=${OMNICHAT_PLUGIN_ID}`,
      attr: { role: 'button', 'aria-label': 'Open in community plugins' },
    });
    const omniIcon = omniPill.createSpan({ cls: 'nf-pill-icon' });
    setIcon(omniIcon, 'bot');
    omniPill.createSpan({ text: 'OmniChat' });
    omniPill.addEventListener('click', (e) => {
      e.preventDefault();
      openCommunityPlugin(this.app, OMNICHAT_PLUGIN_ID);
    });

    // 4. Option to toggle automatic update notes
    if (this.plugin) {
      const prefRow = contentEl.createDiv({ cls: 'nf-whatsnew-pref-row' });
      new Setting(prefRow)
        .setName('Show release notes after updates')
        .setDesc('Automatically open this dialog when NoteFlare is updated.')
        .addToggle((toggle) => {
          toggle.setValue(this.plugin?.settings.showWhatsNewOnUpdate !== false);
          toggle.onChange(async (val) => {
            if (this.plugin) {
              this.plugin.settings.showWhatsNewOnUpdate = val;
              await this.plugin.saveSettings();
            }
          });
        });
    }
  }

  override onClose(): void {
    this.component.unload();
    this.contentEl.empty();
  }
}
