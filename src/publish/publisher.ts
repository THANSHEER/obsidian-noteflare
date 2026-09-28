import { App } from 'obsidian';
import { NoteFlareSettings, PublishResult, SiteProfile, UploadFile } from '../core/types';
import { GitHubApi } from '../api/githubApi';
import { CloudflareApi } from '../api/cloudflareApi';
import { CloudWorkerApi, DEFAULT_WORKER_ENDPOINT } from '../api/cloudWorkerApi';
import { FileCollector } from './fileCollector';
import { Transformer } from './transformer';
import { inspectFrontmatter } from './contentValidator';
import { MDGARDEN_VERSION, NODE_VERSION } from '../core/constants';

function textToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
}

/** Empty result for early-return failure paths. */
function failResult(error: string): PublishResult {
  return { success: false, uploaded: 0, noteCount: 0, failed: 0, fixed: 0, errors: [error], issues: [] };
}

export class Publisher {
  constructor(
    private settings: NoteFlareSettings,
    private site: SiteProfile,
    private app: App,
    private onProgress: (msg: string) => void,
  ) {}

  private get hostingProvider(): SiteProfile['hostingProvider'] {
    return this.site.hostingProvider || 'cloud-worker';
  }

  async publish(): Promise<PublishResult> {
    const repo = this.settings.masterRepository;

    // ── Upfront validation ──
    if (this.hostingProvider === 'cloudflare') {
      if (!this.settings.githubToken || !this.settings.githubOwner) {
        return failResult('GitHub account not connected. Open settings → Connections to reconnect.');
      }
      if (!repo) {
        return failResult('No master repository configured. Run setup again or check settings.');
      }
      if (!this.settings.cloudflareToken) {
        return failResult('Cloudflare token not set. Open settings → Connections to reconnect.');
      }
    }

    const collector = new FileCollector(this.app, this.site);
    const transformer = new Transformer();

    const uploadFilesMap = new Map<string, UploadFile>();
    const workerPayloadFiles: Array<{ path: string; content: string; isBase64?: boolean }> = [];
    const issues: string[] = [];
    let fixedCount = 0;

    const rootDir = `sites/${this.site.id}`;

    this.onProgress('Collecting files…');

    const files = await collector.collect();
    for (const file of files) {
      let content: string;
      let rawText = '';
      let repoPath: string;

      if (file.extension === 'md') {
        rawText = await this.app.vault.read(file);
        const check = inspectFrontmatter(rawText);
        if (check.status === 'fixed') {
          fixedCount++;
          issues.push(`${file.path}: ${check.reason ?? 'frontmatter auto-fixed'}`);
        }
        const transformed = transformer.transform(rawText, file.path, file.basename);
        content = textToBase64(transformed);
        repoPath = `${rootDir}/content/${file.path}`;

        workerPayloadFiles.push({
          path: file.path,
          content: transformed,
          isBase64: false,
        });
      } else {
        content = await collector.readAsBase64(file);
        repoPath = `${rootDir}/content/attachments/${file.name}`;

        workerPayloadFiles.push({
          path: `attachments/${file.name}`,
          content,
          isBase64: true,
        });
      }

      if (!uploadFilesMap.has(repoPath)) {
        uploadFilesMap.set(repoPath, { path: repoPath, content });
      }
    }

    // Direct Cloud Worker API deployment (Option A Engine)
    if (this.hostingProvider === 'cloud-worker') {
      this.onProgress('Sending files to Cloud Worker Build Engine…');
      try {
        const workerApi = new CloudWorkerApi(
          this.settings.githubToken || this.settings.cloudflareToken || 'noteflare-token',
          this.site.workerEndpoint || DEFAULT_WORKER_ENDPOINT,
        );

        const workerResult = await workerApi.publish({
          siteId: this.site.id,
          siteName: this.site.name,
          authorName: this.site.authorName,
          sidebarTitle: this.site.sidebarTitle,
          siteDescription: this.site.siteDescription,
          files: workerPayloadFiles,
        });

        if (workerResult.siteUrl) {
          this.site.siteUrl = workerResult.siteUrl;
        }
        this.site.isPublished = true;
        this.site.lastPublished = new Date().toISOString();
        this.site.lastNoteCount = files.length;
        this.site.lastPublishFailed = false;
        this.site.lastPublishError = '';

        // If GitHub master repository is configured, also sync files to GitHub as private backup store
        if (this.settings.githubToken && this.settings.githubOwner && repo) {
          try {
            const probe = new GitHubApi(this.settings.githubToken, this.settings.githubOwner, repo);
            const branch = await probe.getDefaultBranch();
            const github = new GitHubApi(this.settings.githubToken, this.settings.githubOwner, repo, branch);
            const uploadFiles = Array.from(uploadFilesMap.values());
            await github.commitFiles(
              uploadFiles,
              `NoteFlare: backup publish ${uploadFiles.length} files`,
              () => {},
              () => {},
              `${rootDir}/content/`,
              { isPrivate: this.settings.masterRepositoryPrivate || false },
            );
          } catch (ghErr: unknown) {
            console.warn('NoteFlare: optional GitHub repo sync skipped:', (ghErr as Error).message);
          }
        }

        return {
          success: true,
          uploaded: workerPayloadFiles.length,
          noteCount: files.length,
          failed: 0,
          fixed: fixedCount,
          errors: [],
          issues,
        };
      } catch (err: unknown) {
        const errorMsg = (err as Error).message;
        this.site.lastPublishFailed = true;
        this.site.lastPublishError = errorMsg;
        return failResult(errorMsg);
      }
    }

    // Direct Cloudflare Pages API deployment
    let branch = this.site.githubBranch || 'main';
    try {
      const probe = new GitHubApi(
        this.settings.githubToken,
        this.settings.githubOwner,
        repo,
      );
      branch = await probe.getDefaultBranch();
      this.site.githubBranch = branch;

      const isPrivate = await probe.isRepoPrivate();
      this.settings.masterRepositoryPrivate = isPrivate;
    } catch (probeErr: unknown) {
      console.warn('NoteFlare: branch/privacy probe failed:', (probeErr as Error).message);
    }

    const github = new GitHubApi(
      this.settings.githubToken,
      this.settings.githubOwner,
      repo,
      branch,
    );

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

    const uploadFiles = Array.from(uploadFilesMap.values());
    this.onProgress(`Uploading 0/${uploadFiles.length}...`);

    const result = await github.commitFiles(
      uploadFiles,
      `NoteFlare: publish ${uploadFiles.length} files`,
      (done, total) => this.onProgress(`Uploading ${done}/${total}...`),
      (secsLeft) => this.onProgress(`Rate limited — ${secsLeft}s...`),
      `${rootDir}/content/`,
      { isPrivate: this.settings.masterRepositoryPrivate || false },
    );

    result.fixed = fixedCount;
    result.issues = issues;
    result.noteCount = files.length;

    if (result.success) {
      const cloudflare = new CloudflareApi(
        this.settings.cloudflareToken,
        this.settings.cloudflareAccount,
      );

      try {
        await cloudflare.enableDeployment(this.site.cloudflareProject);
      } catch (err: unknown) {
        const msg = (err as Error).message;
        const status = (err as Error & { status?: number }).status;
        if (status === 404 || msg.toLowerCase().includes('project not found')) {
          try {
            await cloudflare.createProject(
              this.site.cloudflareProject,
              this.settings.githubOwner,
              repo,
              branch,
              rootDir,
            );
          } catch (createErr: unknown) {
            result.errors.push(`Cloudflare recovery failed: ${(createErr as Error).message}`);
            result.success = false;
          }
        } else {
          result.errors.push(`Cloudflare: ${msg}`);
          result.success = false;
        }
      }

      if (result.success) {
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
      }

      if (result.success) {
        try {
          await cloudflare.triggerDeployment(this.site.cloudflareProject, branch);
        } catch (err: unknown) {
          result.errors.push(`Cloudflare build: ${(err as Error).message}`);
          result.success = false;
        }
      }
    }

    this.site.lastPublishFailed = !result.success;
    this.site.lastPublishError = result.success ? '' : (result.errors[0] ?? 'Unknown error');

    return result;
  }

  private buildPackageJson(): string {
    const pkg = {
      name: this.site.name || 'my-mdgarden',
      private: true,
      scripts: { build: 'mdgarden build' },
      dependencies: { mdgarden: MDGARDEN_VERSION },
    };
    return `${JSON.stringify(pkg, null, 2)}\n`;
  }

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
    if (this.hostingProvider === 'cloud-worker') {
      const workerApi = new CloudWorkerApi(
        this.settings.githubToken || this.settings.cloudflareToken || 'noteflare-token',
        this.site.workerEndpoint || DEFAULT_WORKER_ENDPOINT,
      );
      await workerApi.unpublish(this.site.id);
      return;
    }

    const cloudflare = new CloudflareApi(
      this.settings.cloudflareToken,
      this.settings.cloudflareAccount,
    );
    await cloudflare.disableDeployment(this.site.cloudflareProject);
  }
}
