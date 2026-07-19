import { App, PluginSettingTab, Setting } from 'obsidian';
import type NoteFlarePlugin from '../../../main';
import { SetupStep } from '../../core/types';
import { renderWizard } from './wizard/wizardRenderer';
import { renderConnectionsSection, renderBackupSection, renderSitesSection } from './manage';
import { openCloudflareConnectFlow } from './manage/connectionsSection';
import { ResetModal } from './modals';

export class NoteFlareSettingsTab extends PluginSettingTab {
  public plugin: NoteFlarePlugin;
  public wizardStep: SetupStep;
  public isCloudflareConnectFlowOpen = false;
  public hasInitializedWizard = false;

  getSettingDefinitions() {
    return [
      { id: 'publish', name: 'Publish', description: 'Configure publishing to Cloudflare and GitHub Pages' },
      { id: 'backup', name: 'Automated Backup', description: 'Configure automatic private repository backups' },
      { id: 'connections', name: 'Connections', description: 'Manage connected GitHub and Cloudflare accounts' }
    ];
  }

  // Pending config across wizard steps
  public pendingName = '';
  public pendingScope: 'vault' | 'selected' = 'vault';
  public pendingPaths: string[] = [];
  public pendingProvider: 'github-pages' | 'cloudflare' | 'netlify' | 'vercel' = 'cloudflare';

  constructor(app: App, plugin: NoteFlarePlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.wizardStep = this.getInitialWizardStep();
  }

  public getInitialWizardStep(): SetupStep {
    const s = this.plugin.settings;
    if (s.githubToken && s.githubOwner) return 'hosting';
    return 'github';
  }

  override display(): void {
    this.render();
  }

  public render(): void {
    const { containerEl } = this;
    containerEl.empty();

    const s = this.plugin.settings;

    try {
      if (!s.setupComplete) {
        if (!this.hasInitializedWizard) {
          this.wizardStep = this.getInitialWizardStep();
          this.hasInitializedWizard = true;
        }
        renderWizard(this, containerEl);
      } else if (this.isCloudflareConnectFlowOpen) {
        openCloudflareConnectFlow(this, containerEl);
      } else {
        try { renderConnectionsSection(this, containerEl); }
        catch (e) { this.renderSectionError(containerEl, 'Connections', e); }
        try { renderBackupSection(this, containerEl); }
        catch (e) { this.renderSectionError(containerEl, 'Backup', e); }
        try { renderSitesSection(this, containerEl); }
        catch (e) { this.renderSectionError(containerEl, 'Sites', e); }
      }
    } catch (err: unknown) {
      this.renderSectionError(containerEl, 'Settings', err);
    }

    // Always render the reset footer, even if a section above threw.
    this.renderResetFooter(containerEl);
  }

  /** Display an inline error when a settings section fails to render. */
  private renderSectionError(el: HTMLElement, section: string, err: unknown): void {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`NoteFlare: ${section} section render error:`, err);
    const p = el.createEl('p', { cls: 'setting-item-description' });
    p.setText(`⚠ NoteFlare (${section}): ${msg}`);
    p.setCssStyles({ color: 'var(--text-error)', marginBottom: '8px' });
  }

  public openCloudflareConnectFlow(): void {
    this.isCloudflareConnectFlowOpen = true;
    this.render();
  }

  public closeSettings(): void {
    const setting = (this.app as unknown as Record<string, unknown>).setting as
      | { close?: () => void }
      | undefined;
    setting?.close?.();
  }

  private renderResetFooter(el: HTMLElement): void {
    const divider = el.createDiv('nf-reset-footer');

    const dangerHeading = new Setting(divider);
    dangerHeading.setName('Danger zone');
    dangerHeading.setHeading();

    const resetSetting = new Setting(divider);
    resetSetting.setName('Hard reset NoteFlare');
    resetSetting.setDesc(
      'Clears all NoteFlare data — tokens, every site, and all configuration. ' +
      'Your GitHub repos and Cloudflare projects are NOT deleted and can be reconnected any time.',
    );
    resetSetting.addButton((b) => {
      b.setButtonText('Hard reset');
      b.buttonEl.addClass('mod-warning');
      b.onClick(() =>
        new ResetModal(this.app, this.plugin, () => {
          this.wizardStep = 'github';
          this.pendingName = '';
          this.pendingScope = 'vault';
          this.pendingPaths = [];
          this.pendingProvider = 'cloudflare';
          this.hasInitializedWizard = false;
          this.render();
        }).open(),
      );
    });
  }
}
