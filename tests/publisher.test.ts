import { requestUrl } from 'obsidian';
import { Publisher } from '../src/publish/publisher';
import { NoteFlareSettings, SiteProfile } from '../src/core/types';
import { App, TFile } from 'obsidian';
import NoteFlarePlugin from '../main';

const mockedRequestUrl = requestUrl as jest.Mock;

describe('Publisher and Error Recovery Tests', () => {
  let app: App;
  let settings: NoteFlareSettings;
  let site: SiteProfile;
  let progressMsgs: string[];

  beforeEach(() => {
    jest.clearAllMocks();
    app = new App();
    progressMsgs = [];
    
    const file = new TFile();
    file.path = 'note.md';
    file.name = 'note.md';
    file.extension = 'md';
    file.basename = 'note';
    
    (app.vault.getFiles as jest.Mock).mockReturnValue([file]);
    (app.vault.read as jest.Mock).mockResolvedValue('---\ntitle: Test\n---\nHello world');

    settings = {
      githubOwner: 'test-owner',
      githubToken: 'gh-token',
      cloudflareAccount: 'cf-account',
      cloudflareToken: 'cf-token',
      masterRepository: 'master-repo',
      activeSiteId: 'site-1',
      setupComplete: true,
      enablePublish: true,
      enableBackup: false,
      sites: [],
      backup: {} as any,
    };

    site = {
      id: 'site-1',
      name: 'test-site',
      githubRepo: 'master-repo',
      githubBranch: 'main',
      cloudflareProject: 'cf-project',
      siteUrl: 'test-site.pages.dev',
      publishScope: 'vault',
      publishPaths: [],
      excludePatterns: [],
      includeAttachments: false,
      isPublished: false,
      lastPublished: '',
      lastNoteCount: 0,
      lastPublishFailed: false,
      lastPublishError: '',
      hostingProvider: 'cloudflare',
    };
  });

  const mockNetworkResponse = (status: number, json: any = {}) => {
    return {
      status,
      json,
      text: JSON.stringify(json),
    };
  };

  it('should publish successfully under normal conditions', async () => {
    mockedRequestUrl.mockImplementation((options: any) => {
      const url = options.url;
      const method = options.method || 'GET';

      // GitHub default branch probe
      if (url.endsWith('/repos/test-owner/master-repo') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { default_branch: 'main', private: false }));
      }
      // GitHub git refs GET
      if (url.includes('/git/refs/heads/main') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { object: { sha: 'base_sha' } }));
      }
      // GitHub git commits GET
      if (url.includes('/git/commits/base_sha') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { tree: { sha: 'base_tree_sha' } }));
      }
      // GitHub git blobs POST
      if (url.includes('/git/blobs') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'blob_sha' }));
      }
      // GitHub git trees POST
      if (url.includes('/git/trees') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'new_tree_sha' }));
      }
      // GitHub git commits POST
      if (url.includes('/git/commits') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'new_commit_sha' }));
      }
      // GitHub git refs PATCH
      if (url.includes('/git/refs/heads/main') && method === 'PATCH') {
        return Promise.resolve(mockNetworkResponse(200, {}));
      }
      // Cloudflare enable project deployment PATCH
      if (url.includes('/pages/projects/cf-project') && method === 'PATCH') {
        return Promise.resolve(mockNetworkResponse(200, { success: true }));
      }
      // Cloudflare trigger deployment POST
      if (url.includes('/pages/projects/cf-project/deployments') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(200, { success: true }));
      }

      return Promise.reject(new Error(`Unmocked request: ${method} ${url}`));
    });

    const publisher = new Publisher(settings, site, app, (msg) => {
      progressMsgs.push(msg);
    });

    const result = await publisher.publish();
    expect(result.success).toBe(true);
    expect(result.uploaded).toBeGreaterThan(0);
    expect(result.errors.length).toBe(0);
  });

  it('should recreate repository and publish successfully if GitHub repository is deleted', async () => {
    let createRepoCalled = false;

    mockedRequestUrl.mockImplementation((options: any) => {
      const url = options.url;
      const method = options.method || 'GET';

      // GitHub default branch probe - fails if repo is deleted
      if (url.endsWith('/repos/test-owner/master-repo') && method === 'GET') {
        if (!createRepoCalled) {
          return Promise.resolve(mockNetworkResponse(404, { message: 'Not Found' }));
        }
        return Promise.resolve(mockNetworkResponse(200, { default_branch: 'main', private: false }));
      }
      // GitHub create repo POST
      if (url.includes('/user/repos') && method === 'POST') {
        createRepoCalled = true;
        return Promise.resolve(mockNetworkResponse(201, {}));
      }
      // GitHub git refs GET
      if (url.includes('/git/refs/heads/main') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { object: { sha: 'base_sha' } }));
      }
      // GitHub git commits GET
      if (url.includes('/git/commits/base_sha') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { tree: { sha: 'base_tree_sha' } }));
      }
      // GitHub git blobs POST
      if (url.includes('/git/blobs') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'blob_sha' }));
      }
      // GitHub git trees POST
      if (url.includes('/git/trees') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'new_tree_sha' }));
      }
      // GitHub git commits POST
      if (url.includes('/git/commits') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'new_commit_sha' }));
      }
      // GitHub git refs PATCH
      if (url.includes('/git/refs/heads/main') && method === 'PATCH') {
        return Promise.resolve(mockNetworkResponse(200, {}));
      }
      // Cloudflare enable project deployment PATCH
      if (url.includes('/pages/projects/cf-project') && method === 'PATCH') {
        return Promise.resolve(mockNetworkResponse(200, { success: true }));
      }
      // Cloudflare trigger deployment POST
      if (url.includes('/pages/projects/cf-project/deployments') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(200, { success: true }));
      }

      return Promise.reject(new Error(`Unmocked request: ${method} ${url}`));
    });

    const publisher = new Publisher(settings, site, app, (msg) => {
      progressMsgs.push(msg);
    });

    const result = await publisher.publish();
    expect(createRepoCalled).toBe(true);
    expect(result.success).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should recreate project and publish successfully if Cloudflare project is deleted (404 status recovery)', async () => {
    let enableDeploymentCalls = 0;
    let createProjectCalled = false;

    mockedRequestUrl.mockImplementation((options: any) => {
      const url = options.url;
      const method = options.method || 'GET';

      // GitHub default branch probe
      if (url.endsWith('/repos/test-owner/master-repo') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { default_branch: 'main', private: false }));
      }
      // GitHub git refs GET
      if (url.includes('/git/refs/heads/main') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { object: { sha: 'base_sha' } }));
      }
      // GitHub git commits GET
      if (url.includes('/git/commits/base_sha') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { tree: { sha: 'base_tree_sha' } }));
      }
      // GitHub git blobs POST
      if (url.includes('/git/blobs') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'blob_sha' }));
      }
      // GitHub git trees POST
      if (url.includes('/git/trees') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'new_tree_sha' }));
      }
      // GitHub git commits POST
      if (url.includes('/git/commits') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'new_commit_sha' }));
      }
      // GitHub git refs PATCH
      if (url.includes('/git/refs/heads/main') && method === 'PATCH') {
        return Promise.resolve(mockNetworkResponse(200, {}));
      }

      // Cloudflare enable project deployment PATCH
      if (url.includes('/pages/projects/cf-project') && method === 'PATCH') {
        if (options.body && options.body.includes('deployment_configs')) {
          enableDeploymentCalls++;
          // First call fails with 404
          if (enableDeploymentCalls === 1) {
            const err = new Error('Cloudflare account or Pages project not found. Double-check the Account ID and project name.');
            Object.assign(err, { status: 404 });
            return Promise.reject(err);
          }
          return Promise.resolve(mockNetworkResponse(200, { success: true }));
        } else {
          // configureBuild
          return Promise.resolve(mockNetworkResponse(200, { success: true }));
        }
      }
      // Cloudflare create project POST
      if (url.includes('/pages/projects') && method === 'POST') {
        createProjectCalled = true;
        return Promise.resolve(mockNetworkResponse(201, { result: { subdomain: 'cf-project.pages.dev' } }));
      }
      // Cloudflare trigger deployment POST
      if (url.includes('/pages/projects/cf-project/deployments') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(200, { success: true }));
      }

      return Promise.reject(new Error(`Unmocked request: ${method} ${url}`));
    });

    const publisher = new Publisher(settings, site, app, (msg) => {
      progressMsgs.push(msg);
    });

    const result = await publisher.publish();
    expect(enableDeploymentCalls).toBe(1);
    expect(createProjectCalled).toBe(true);
    expect(result.success).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should fetch Cloudflare status correctly in fetchLiveStatus', async () => {
    // Set up a mock plugin instance
    const plugin = new NoteFlarePlugin(app, {} as any);
    plugin.settings = settings;
    plugin.settings.sites = [site];
    plugin.settings.activeSiteId = site.id;

    mockedRequestUrl.mockImplementation((options: any) => {
      const url = options.url;
      const method = options.method || 'GET';

      // GitHub repo info
      if (url.endsWith('/repos/test-owner/master-repo') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { html_url: 'https://github.com/test-owner/master-repo', pushed_at: '2026-07-12T12:00:00Z', private: false }));
      }
      // GitHub workflow run (none found)
      if (url.includes('/actions/workflows/deploy.yml/runs') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(404, {}));
      }
      // GitHub commits GET
      if (url.includes('/commits/main') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { sha: 'new_sha_123456789', commit: { message: 'Publish notes', author: { date: '2026-07-12T12:00:00Z', name: 'Author' } } }));
      }
      // Cloudflare list deployments GET
      if (url.includes('/pages/projects/cf-project/deployments') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, {
          result: [
            {
              id: 'dep-1',
              status: 'success', // e.g. success or active
              url: 'https://dep-1.pages.dev',
              modified_on: '2026-07-12T12:05:00Z',
            }
          ]
        }));
      }

      return Promise.reject(new Error(`Unmocked request: ${method} ${url}`));
    });

    await plugin.fetchLiveStatus(site);

    const live = plugin.liveStatus[site.id];
    expect(live).toBeDefined();
    expect(live.loading).toBe(false);
    expect(live.workflowStatus).toBe('completed');
    expect(live.workflowConclusion).toBe('success');
    expect(live.workflowUrl).toBe('https://dep-1.pages.dev');
    expect(live.commitSha).toBe('new_sha');
  });

  it('should recreate repository as private if masterRepositoryPrivate is true', async () => {
    let createRepoCalledWithPrivate = false;

    settings.masterRepositoryPrivate = true;

    mockedRequestUrl.mockImplementation((options: any) => {
      const url = options.url;
      const method = options.method || 'GET';

      // GitHub default branch probe - fails because repo is deleted
      if (url.endsWith('/repos/test-owner/master-repo') && method === 'GET') {
        if (!createRepoCalledWithPrivate) {
          return Promise.resolve(mockNetworkResponse(404, { message: 'Not Found' }));
        }
        return Promise.resolve(mockNetworkResponse(200, { default_branch: 'main', private: true }));
      }
      // GitHub create repo POST
      if (url.includes('/user/repos') && method === 'POST') {
        const body = JSON.parse(options.body);
        createRepoCalledWithPrivate = body.private === true;
        return Promise.resolve(mockNetworkResponse(201, {}));
      }
      // GitHub git refs GET
      if (url.includes('/git/refs/heads/main') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { object: { sha: 'base_sha' } }));
      }
      // GitHub git commits GET
      if (url.includes('/git/commits/base_sha') && method === 'GET') {
        return Promise.resolve(mockNetworkResponse(200, { tree: { sha: 'base_tree_sha' } }));
      }
      // GitHub git blobs POST
      if (url.includes('/git/blobs') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'blob_sha' }));
      }
      // GitHub git trees POST
      if (url.includes('/git/trees') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'new_tree_sha' }));
      }
      // GitHub git commits POST
      if (url.includes('/git/commits') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(201, { sha: 'new_commit_sha' }));
      }
      // GitHub git refs PATCH
      if (url.includes('/git/refs/heads/main') && method === 'PATCH') {
        return Promise.resolve(mockNetworkResponse(200, {}));
      }
      // Cloudflare enable project deployment PATCH
      if (url.includes('/pages/projects/cf-project') && method === 'PATCH') {
        return Promise.resolve(mockNetworkResponse(200, { success: true }));
      }
      // Cloudflare trigger deployment POST
      if (url.includes('/pages/projects/cf-project/deployments') && method === 'POST') {
        return Promise.resolve(mockNetworkResponse(200, { success: true }));
      }

      return Promise.reject(new Error(`Unmocked request: ${method} ${url}`));
    });

    const publisher = new Publisher(settings, site, app, (msg) => {
      progressMsgs.push(msg);
    });

    const result = await publisher.publish();
    expect(createRepoCalledWithPrivate).toBe(true);
    expect(result.success).toBe(true);
  });
});
