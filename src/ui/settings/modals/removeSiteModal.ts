import { App, Modal, Notice, Setting } from 'obsidian';
import type NoteFlarePlugin from '../../../../main';
import { SiteProfile } from '../../../core/types';
import { GitHubApi } from '../../../api/githubApi';
import { CloudflareApi } from '../../../api/cloudflareApi';
import { VaultRegistry } from '../../../core/vaultRegistry';

export class RemoveSiteModal extends Modal {
  private deleting = false;

  constructor(
    app: App,
    private plugin: NoteFlarePlugin,
    private site: SiteProfile,
    private onDone: () => void,
  ) {
    super(app);
  }

  onOpen(): void {
    this.titleEl.setText('Delete this site?');
    const siteName = this.site.name || this.site.githubRepo || 'Unnamed site';

    this.contentEl.createEl('p', {
      text: `"${siteName}" will be permanently deleted from NoteFlare.`,
    });

    // Show a clear, prominent summary of what the delete operation will do
    const summaryDiv = this.contentEl.createDiv();
    summaryDiv.setCssStyles({
      marginTop: '8px',
      padding: '10px 12px',
      borderLeft: '4px solid var(--text-warning)',
      backgroundColor: 'var(--background-modifier-border)',
      borderRadius: 'var(--radius-s)',
      marginBottom: '10px',
    });
    summaryDiv.createEl('strong', { text: 'What will be deleted:' });
    const stepsList = summaryDiv.createEl('ul');
    stepsList.setCssStyles({ margin: '6px 0 0 0', paddingLeft: '1.2em' });
    const ghStep = stepsList.createEl('li');
    ghStep.setText('✅ Site folder removed from GitHub repository (via API)');
    if (this.site.hostingProvider === 'cloudflare') {
      const cfStep = stepsList.createEl('li');
      cfStep.setText('✅ Cloudflare Pages project deleted (via API)');
    } else {
      stepsList.createEl('li').setText('⚠️ GitHub Pages deployment — NOT automatically removed. Disable it manually:');
      const manualNote = stepsList.createEl('li');
      manualNote.setCssStyles({ listStyleType: 'none', paddingLeft: '1em', color: 'var(--text-muted)', fontSize: 'var(--font-ui-smaller)' });
      manualNote.setText('GitHub repo → Settings → Pages → Source → None → Save');
    }

    const progressEl = this.contentEl.createEl('p', { cls: 'setting-item-description' });
    progressEl.hide();

    const errorEl = this.contentEl.createEl('p', { cls: 'setting-item-description' });
    errorEl.setCssStyles({ color: 'var(--text-error)' });
    errorEl.hide();

    new Setting(this.contentEl)
      .addButton((b) => b.setButtonText('Cancel').onClick(() => this.close()))
      .addButton((b) => {
        b.setButtonText('Delete');
        b.buttonEl.addClass('mod-warning');
        b.onClick(() => {
          void (async () => {
            if (this.deleting) return;
            this.deleting = true;
            b.setDisabled(true).setButtonText('Deleting…');
            errorEl.hide();
            progressEl.show();

            const s = this.plugin.settings;
            const gh = new GitHubApi(
              s.githubToken,
              s.githubOwner,
              s.masterRepository,
              this.site.githubBranch || 'main',
            );

            // Step 1: Cloudflare cleanup
            if (this.site.hostingProvider === 'cloudflare' && s.cloudflareToken) {
              try {
                progressEl.setText('Deleting Cloudflare Pages project…');
                const cf = new CloudflareApi(s.cloudflareToken, s.cloudflareAccount);
                await cf.deleteProject(this.site.cloudflareProject);
              } catch (e) {
                console.warn('NoteFlare: could not delete Cloudflare project:', e);
                // Non-fatal: local cleanup still proceeds, but warn the user so they
                // can manually remove the orphaned project from the Cloudflare dashboard.
                new Notice(
                  `Could not delete the Cloudflare Pages project "${this.site.cloudflareProject}" automatically. ` +
                  `Please remove it manually at dash.cloudflare.com → Workers & Pages.`,
                  10000,
                );
              }
            }

            // Step 2: GitHub folder cleanup
            try {
              progressEl.setText('Removing site from GitHub repository…');
              await gh.deleteSiteFolder(this.site.id, this.site.githubBranch || 'main');
            } catch (e) {
              console.warn('NoteFlare: could not delete GitHub site folder:', e);
            }

            // Step 3: Vault registry
            try {
              progressEl.setText('Updating vault registry…');
              await VaultRegistry.remove(this.app, this.site.id);
            } catch (e) {
              console.warn('NoteFlare: could not update vault registry:', e);
            }

            // Step 4: Remove from plugin settings
            try {
              const s2 = this.plugin.settings;
              s2.sites = s2.sites.filter((x) => x.id !== this.site.id);
              if (s2.activeSiteId === this.site.id) {
                s2.activeSiteId = s2.sites[0]?.id ?? '';
              }
              await this.plugin.saveSettings();
              this.close();
              new Notice(`Site "${siteName}" deleted.`);
              this.onDone();
            } catch (err: unknown) {
              errorEl.setText((err as Error).message);
              errorEl.show();
              progressEl.hide();
              b.setDisabled(false).setButtonText('Delete');
              this.deleting = false;
            }
          })();
        });
      });
  }

  onClose(): void {
    this.contentEl.empty();
  }
}
