import { App } from 'obsidian';
import { NoteFlareSettings, PublishResult, SiteProfile, UploadFile } from '../core/types';
import { GitHubApi } from '../api/githubApi';
import { CloudflareApi } from '../api/cloudflareApi';
import { FileCollector } from './fileCollector';
import { Transformer } from './transformer';
import { inspectFrontmatter } from './contentValidator';
import { MDGARDEN_VERSION, NODE_VERSION, GITHUB_ACTIONS_WORKFLOW } from '../core/constants';

const RECONNECT_HINT =
  "If the build can't start, reconnect Cloudflare to GitHub: install/authorize the " +
  '"Cloudflare Workers and Pages" GitHub App for this repo.';


function textToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export class Publisher {
  constructor(
    private settings: NoteFlareSettings,
    private site: SiteProfile,
    private app: App,
    private onProgress: (msg: string) => void,
  ) {}

  /** Determine the effective deploy target for this site. */
  private get deployTarget(): 'cloudflare' | 'github-actions' {
    if (this.site.deployTarget) return this.site.deployTarget;
    return this.settings.cloudflareToken ? 'cloudflare' : 'github-actions';
  }

  async publish(): Promise<PublishResult> {
    const repo = this.settings.masterRepository;
    
    // The branch Cloudflare/GH Actions builds and we commit to is the repo's
    // own default (main). Re-resolve from GitHub in case it differs.
    let branch = this.site.githubBranch || 'main';
    try {
      const probe = new GitHubApi(
        this.settings.githubToken,
        this.settings.githubOwner,
        repo,
      );
      branch = await probe.getDefaultBranch();
      this.site.githubBranch = branch;
    } catch {
      // Keep the stored branch.
    }

    const github = new GitHubApi(
      this.settings.githubToken,
      this.settings.githubOwner,
      repo,
      branch,
    );
    const collector = new FileCollector(this.app, this.site);
    const transformer = new Transformer();

    const uploadFilesMap = new Map<string, UploadFile>();
    const issues: string[] = [];
    let fixedCount = 0;

    const rootDir = `sites/${this.site.id}`;
    
    this.onProgress('Collecting files…');

    const files = await collector.collect();
    for (const file of files) {
      let content: string;
      let repoPath: string;

      if (file.extension === 'md') {
        const raw = await this.app.vault.read(file);
        // Preflight: catch + auto-repair frontmatter that would crash the build.
        const check = inspectFrontmatter(raw);
        if (check.status === 'fixed') {
          fixedCount++;
          issues.push(`${file.path}: ${check.reason ?? 'frontmatter auto-fixed'}`);
        }
        const transformed = transformer.transform(raw, file.path, file.basename);
        content = textToBase64(transformed);
        repoPath = `${rootDir}/content/${file.path}`;
      } else {
        content = await collector.readAsBase64(file);
        repoPath = `${rootDir}/content/attachments/${file.name}`;
      }

      if (!uploadFilesMap.has(repoPath)) {
        uploadFilesMap.set(repoPath, { path: repoPath, content });
      }
    }

    // Repo-root files that drive the build (same for both deploy targets):
    //  - package.json  — pulls in mdgarden, defines build script
    //  - mdgarden.config.json — site theme + metadata
    //  - .node-version — pins a modern Node for the build environment
    uploadFilesMap.set(`${rootDir}/package.json`, {
      path: `${rootDir}/package.json`,
      content: textToBase64(this.buildPackageJson()),
    });
    uploadFilesMap.set(`${rootDir}/mdgarden.config.json`, {
      path: `${rootDir}/mdgarden.config.json`,
      content: textToBase64(this.buildMdgardenConfig()),
    });
    uploadFilesMap.set(`${rootDir}/.node-version`, {
      path: `${rootDir}/.node-version`,
      content: textToBase64(`${NODE_VERSION}\n`),
    });

    // GitHub Actions deploy target: push the workflow file so GitHub Pages
    // builds and publishes the site automatically on every push.
    if (this.deployTarget === 'github-actions') {
      uploadFilesMap.set('.github/workflows/deploy.yml', {
        path: '.github/workflows/deploy.yml',
        content: textToBase64(GITHUB_ACTIONS_WORKFLOW),
      });
    }

    const uploadFiles = Array.from(uploadFilesMap.values());

    this.onProgress(`Uploading 0/${uploadFiles.length}...`);

    const result = await github.commitFiles(
      uploadFiles,
      `NoteFlare: publish ${uploadFiles.length} files`,
      (done, total) => this.onProgress(`Uploading ${done}/${total}...`),
      (secsLeft) => this.onProgress(`Rate limited — ${secsLeft}s...`),
      // Mirror content/ so notes removed or excluded from the vault disappear
      // from the published site too.
      `${rootDir}/content/`,
    );

    result.fixed = fixedCount;
    result.issues = issues;

    // ── Cloudflare-specific post-publish steps ─────────────────────────────
    if (this.deployTarget === 'cloudflare') {
      const cloudflare = new CloudflareApi(
        this.settings.cloudflareToken,
        this.settings.cloudflareAccount,
      );

      // Enable Cloudflare deployment (handles both first publish and re-publish after unpublish)
      try {
        await cloudflare.enableDeployment(this.site.cloudflareProject);
      } catch (err: unknown) {
        const msg = (err as Error).message;
        if (msg.includes('Project not found')) {
          try {
            await cloudflare.createProject(
              this.site.cloudflareProject,
              this.settings.githubOwner,
              repo,
              branch,
              rootDir
            );
            // Project creation succeeds; deployment is automatically enabled by default.
          } catch (createErr: unknown) {
            result.errors.push(`Cloudflare recovery failed: ${(createErr as Error).message}`);
            result.success = false;
          }
        } else {
          result.errors.push(`Cloudflare: ${msg}`);
          result.success = false;
        }
      }

      // Repair the Pages build settings every publish so a project created earlier
      // with a bad build command or stale branch self-heals.
      try {
        await cloudflare.configureBuild(
          this.site.cloudflareProject,
          this.settings.githubOwner,
          repo,
          branch,
          rootDir,
        );
      } catch (err: unknown) {
        result.errors.push(`Cloudflare build config: ${(err as Error).message}`);
        result.success = false;
      }

      try {
        await cloudflare.triggerDeployment(this.site.cloudflareProject, branch);
      } catch (err: unknown) {
        result.errors.push(`Cloudflare build: ${(err as Error).message}. ${RECONNECT_HINT}`);
        result.success = false;
      }
    }

    return result;
  }

  /** package.json for the published repo so Cloudflare can `npx mdgarden build`. */
  private buildPackageJson(): string {
    const pkg = {
      name: this.site.name || 'my-mdgarden',
      private: true,
      scripts: { build: 'mdgarden build' },
      dependencies: { mdgarden: MDGARDEN_VERSION },
    };
    return `${JSON.stringify(pkg, null, 2)}\n`;
  }

  /** mdgarden.config.json generated from this site's profile (plugin-managed). */
  private buildMdgardenConfig(): string {
    const vaultName = this.app.vault.getName();
    const host = this.site.siteUrl.replace(/^https?:\/\//, '');
    const config = {
      site: {
        title: this.site.sidebarTitle || this.site.name || vaultName,
        description: this.site.siteDescription || `Notes published from ${vaultName}`,
        baseUrl: host ? `https://${host}` : '',
        language: 'en',
        author: this.site.authorName || '',
      },
      theme: { darkMode: 'toggle' },
      nav: [
        { title: 'Home', url: '/' },
        { title: 'Tags', url: '/tags/' },
      ],
      features: {
        search: true,
        backlinks: true,
        tags: true,
        graph: true,
        math: true,
        syntaxHighlight: true,
        rss: true,
        sitemap: true,
      },
      build: { contentDir: 'content', outDir: 'public' },
    };
    return `${JSON.stringify(config, null, 2)}\n`;
  }

  async unpublish(): Promise<void> {
    if (this.deployTarget === 'cloudflare') {
      const cloudflare = new CloudflareApi(
        this.settings.cloudflareToken,
        this.settings.cloudflareAccount,
      );
      await cloudflare.deleteProject(this.site.cloudflareProject);
    }
    // For GitHub Actions target, unpublish is a manual step in GitHub Pages settings.
  }

}
