import { requestUrl } from 'obsidian';

const CF_API = 'https://api.cloudflare.com/client/v4';

// Install deps first, then build with mdgarden. A bare `npx mdgarden build`
// might work if caching is perfect, but this guarantees the version pinned in
// package.json is installed before execution.
// `npm ci || npm install` acts as a fallback for missing lockfiles.
// Without this, npx would interactively prompt "Need to install... Ok to proceed? (y)"
const MDGARDEN_BUILD_COMMAND = 'npm ci || npm install && npx mdgarden build';

interface CloudflareApiError {
  errors?: Array<{ message?: string }>;
  result?: unknown;
}

export class CloudflareApi {
  constructor(
    private token: string,
    private accountId: string,
  ) {}

  private get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    path: string,
    method = 'GET',
    body?: Record<string, unknown>,
  ): Promise<T> {
    try {
      const resp = await requestUrl({
        url: `${CF_API}${path}`,
        method,
        headers: this.headers,
        body: body ? JSON.stringify(body) : undefined,
        throw: false,
      });

      const data = (resp.json ?? {}) as CloudflareApiError;
      if (resp.status >= 400) {
        const message = data.errors?.[0]?.message ?? this.messageForStatus(resp.status);
        const err = new Error(message) as Error & { status?: number };
        err.status = resp.status;
        throw err;
      }

      return data as T;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '';
      if (message.toLowerCase().includes('failed to fetch')) {
        const fetchErr = new Error(
          'Could not reach Cloudflare. Check your internet connection, firewall, or proxy, then try again.',
        ) as Error & { status?: number };
        fetchErr.status = 500;
        throw fetchErr;
      }
      throw err;
    }
  }

  private messageForStatus(status: number): string {
    if (status === 401 || status === 403) {
      return 'Cloudflare rejected this token. Create an Account API Token with Cloudflare Pages: Edit (and Workers Scripts: Edit) permissions.';
    }
    if (status === 404) {
      return 'Cloudflare account or Pages project not found. Double-check the Account ID and project name.';
    }
    if (status >= 500) {
      return 'Cloudflare is temporarily unavailable. Please try again in a moment.';
    }
    return 'Cloudflare request failed.';
  }

  /**
   * Lists the accounts this token can reach and returns the first id.
   * Lets the wizard auto-detect the Account ID so the user never has to copy
   * the 32-character value out of the dashboard by hand. Requires the token to
   * include Account Settings: Read (bundled into our token template link).
   */
  async getAccountId(): Promise<string> {
    const data = await this.request<{ result?: Array<{ id?: string }> }>('/accounts');
    const accounts = data.result ?? [];
    const id = accounts[0]?.id;
    if (!id) {
      throw new Error(
        'Could not read any Cloudflare account from this token. Add the "Account Settings: Read" permission, or paste your Account ID manually.',
      );
    }
    return id;
  }

  async createProject(
    name: string,
    githubOwner: string,
    repo: string,
    branch: string,
    rootDir: string = '',
  ): Promise<string> {
    const data = await this.request<CloudflareApiError>(
      `/accounts/${this.accountId}/pages/projects`,
      'POST',
      {
        name,
        source: {
          type: 'github',
          config: {
            owner: githubOwner,
            repo_name: repo,
            // The repo's default branch (main). Building a non-existent branch
            // yields a blank site / 522.
            production_branch: branch,
            deployments_enabled: true,
          },
        },
        build_config: {
          build_command: MDGARDEN_BUILD_COMMAND,
          destination_dir: 'public',
          root_dir: rootDir,
        },
      },
    );
    const result = (data.result ?? {}) as Record<string, unknown>;
    const rawSubdomain = (result.subdomain as string | undefined) ?? name;
    const subdomain = rawSubdomain.replace(/\.pages\.dev$/, '');
    return `${subdomain}.pages.dev`;
  }

  /**
   * Repair the build settings on an EXISTING project so a re-publish self-heals
   * a project that was created with a bad build command or wrong branch — the
   * user never has to edit the Cloudflare dashboard. Called every publish.
   * - build_command must install deps before `npx mdgarden build` (see above).
   * - production_branch must be the repo's real default branch (main) or
   *   Cloudflare builds a non-existent branch → blank site / 522.
   */
  async configureBuild(
    name: string,
    githubOwner: string,
    repo: string,
    branch: string,
    rootDir: string = '',
  ): Promise<void> {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      'PATCH',
      {
        build_config: {
          build_command: MDGARDEN_BUILD_COMMAND,
          destination_dir: 'public',
          root_dir: rootDir,
        },
        source: {
          type: 'github',
          config: {
            owner: githubOwner,
            repo_name: repo,
            production_branch: branch,
            deployments_enabled: true,
          },
        },
      },
    );
  }

  /**
   * Forces a fresh production build. Content commits normally trigger a build
   * via the git webhook, but firing this explicitly guarantees the latest notes
   * actually get deployed. Best-effort — the caller treats failure as non-fatal.
   */
  async triggerDeployment(name: string, branch: string): Promise<void> {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}/deployments`,
      'POST',
      branch ? { branch } : undefined,
    );
  }

  async getProject(name: string): Promise<string> {
    const data = await this.request<CloudflareApiError>(
      `/accounts/${this.accountId}/pages/projects/${name}`,
    );
    const result = data.result as Record<string, unknown>;
    const rawSubdomain = (result?.subdomain as string | undefined) ?? name;
    const subdomain = rawSubdomain.replace(/\.pages\.dev$/, '');
    return `${subdomain}.pages.dev`;
  }

  async enableDeployment(name: string): Promise<void> {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      'PATCH',
      {
        deployment_configs: { production: { deployment_enabled: true } },
      },
    );
  }

  /**
   * Pause a Cloudflare Pages deployment — takes the site offline without
   * deleting the project or any content. `enableDeployment` restores it.
   * This is the correct backend for "Unpublish".
   */
  async disableDeployment(name: string): Promise<void> {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      'PATCH',
      {
        deployment_configs: { production: { deployment_enabled: false } },
      },
    );
  }

  async deleteProject(name: string): Promise<void> {
    await this.request(
      `/accounts/${this.accountId}/pages/projects/${name}`,
      'DELETE',
    );
  }

  async listDeployments(name: string): Promise<{ result?: Array<Record<string, unknown>> }> {
    return this.request<{ result?: Array<Record<string, unknown>> }>(
      `/accounts/${this.accountId}/pages/projects/${name}/deployments`,
    );
  }
}
