import { requestUrl } from 'obsidian';
import { UploadFile, PublishResult } from '../core/types';


async function doRequest(url: string, options: { method?: string; headers?: Record<string, string>; body?: string } = {}) {
  const resp = await requestUrl({
    url,
    method: options.method || 'GET',
    headers: options.headers,
    body: options.body,
    throw: false
  });
  return {
    ok: resp.status >= 200 && resp.status < 300,
    status: resp.status,
    json: async () => resp.json as unknown,
    text: async () => resp.text
  };
}

const GITHUB_API = 'https://api.github.com';
const BATCH_SIZE = 10;
const RATE_LIMIT_WAIT_MS = 60000;

export class GitHubApi {
  private token: string;
  private owner: string;
  private repo: string;
  private branch: string;

  constructor(
    token: string,
    owner: string,
    repo: string,
    branch = '',
  ) {
    this.token = token;
    this.owner = owner;
    this.repo = repo.trim().replace(/\s+/g, '-');
    this.branch = branch;
  }

  private get headers(): Record<string, string> {
    return {
      Authorization: `token ${this.token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    };
  }

  async getAuthenticatedUser(): Promise<string> {
    const resp = await doRequest(`${GITHUB_API}/user`, { headers: this.headers });
    if (!resp.ok) {
      throw new Error('Invalid GitHub token or missing repo permission');
    }
    const data = (await resp.json()) as Record<string, unknown>;
    return (data?.login as string);
  }

  /** The repo's default branch (e.g. `main`). */
  async getDefaultBranch(): Promise<string> {
    const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}`, {
      headers: this.headers,
    });
    if (!resp.ok) {
      throw new Error('Could not read repository info from GitHub. Check the token and repo name.');
    }
    const data = (await resp.json()) as Record<string, unknown>;
    return (data?.default_branch as string) || 'main';
  }

  /**
   * Create an empty public repo, initialised with one commit on the default
   * branch (`main`). NoteFlare then commits the user's content plus a mdgarden
   * `package.json`/`mdgarden.config.json` on top — there's no template fork, so
   * there's no v4/v5 branch drift to manage. Idempotent: a 422 (already exists)
   * is treated as success so setup can be re-run.
   */
  async createRepo(privateRepo = false): Promise<void> {
    const resp = await doRequest(`${GITHUB_API}/user/repos`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: this.repo,
        private: privateRepo,
        auto_init: true,
        description: privateRepo ? 'Private vault backup managed by NoteFlare' : 'Published with NoteFlare (mdgarden)',
      }),
    });

    if (resp.status === 422) {
      // 422 almost always means the repo name is already taken — either by
      // this user (idempotent success) or by someone else (must rename).
      const errBody = (await resp.json().catch(() => ({}))) as Record<string, unknown>;
      const ghMessage: string = (errBody?.message as string) ?? '';
      const errors: Array<{ message?: string }> = (errBody?.errors as Array<{ message?: string }>) ?? [];
      const alreadyExists = errors.some((e) =>
        (e.message ?? '').toLowerCase().includes('already exist'),
      ) || ghMessage.toLowerCase().includes('already exist');

      if (alreadyExists && await this.repoExists()) {
        // The repo belongs to this account — treat as success (re-run of setup).
        return;
      }
      throw new Error(
        `A GitHub repository named "${this.repo}" already exists. ` +
        'Please choose a different site name and try again.',
      );
    }

    if (!resp.ok) {
      const err = (await resp.json().catch(() => ({}))) as Record<string, unknown>;
      throw new Error(`Failed to create GitHub repo: ${(err as { message?: string }).message ?? 'Unknown error'}`);
    }
  }

  /**
   * Configures GitHub Pages for the repository using GitHub Actions as the source.
   * This prevents the 404 error during the first deploy-pages action.
   */
  async enableGitHubPages(): Promise<void> {
    const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}/pages`, {
      method: 'POST',
      headers: {
        ...this.headers,
        Accept: 'application/vnd.github.v3+json',
      },
      body: JSON.stringify({
        build_type: 'workflow',
      }),
    });

    if (!resp.ok && resp.status !== 409) { // 409 means already enabled
      const text = await resp.text().catch(() => '');
      throw new Error(`Failed to enable GitHub Pages: ${resp.status} ${text}`);
    }
  }

  /**
   * Returns high-level repository metadata for the live status dashboard.
   * Returns null (never throws) so callers can fall back to cached data.
   */
  async getRepoInfo(): Promise<{
    htmlUrl: string;
    pushedAt: string;
    isPrivate: boolean;
    description: string;
  } | null> {
    try {
      const resp = await doRequest(`${GITHUB_API}/repos/${this.owner}/${this.repo}`, {
        headers: this.headers,
      });
      if (!resp.ok) return null;
      const data = (await resp.json()) as Record<string, unknown>;
      return {
        htmlUrl: (data.html_url as string) || '',
        pushedAt: (data.pushed_at as string) || '',
        isPrivate: (data.private as boolean) || false,
        description: (data.description as string) || '',
      };
    } catch {
      return null;
    }
  }

  /**
   * Returns the most recent workflow run for the given workflow file.
   * `workflowFile` is the filename under `.github/workflows/`, e.g. `deploy.yml`.
   * Returns null (never throws) on any error.
   */
  async getLatestWorkflowRun(workflowFile: string): Promise<{
    status: string;       // 'queued' | 'in_progress' | 'completed'
    conclusion: string;   // 'success' | 'failure' | 'cancelled' | '' (when in_progress)
    htmlUrl: string;
    createdAt: string;
    updatedAt: string;
  } | null> {
    try {
      const resp = await doRequest(
        `${GITHUB_API}/repos/${this.owner}/${this.repo}/actions/workflows/${encodeURIComponent(workflowFile)}/runs?per_page=1`,
        { headers: this.headers },
      );
      if (!resp.ok) return null;
      const data = (await resp.json()) as { workflow_runs?: Record<string, unknown>[] };
      const run = data.workflow_runs?.[0];
      if (!run) return null;
      return {
        status: (run.status as string) || '',
        conclusion: (run.conclusion as string) || '',
        htmlUrl: (run.html_url as string) || '',
        createdAt: (run.created_at as string) || '',
        updatedAt: (run.updated_at as string) || '',
      };
    } catch {
      return null;
    }
  }

  /**
   * Returns the tip commit info for a branch.
   * Returns null (never throws) on any error.
   */
  async getLatestCommit(branch?: string): Promise<{
    sha: string;
    message: string;
    date: string;
    author: string;
    htmlUrl: string;
  } | null> {
    const ref = branch || this.branch || 'main';
    try {
      const resp = await doRequest(
        `${GITHUB_API}/repos/${this.owner}/${this.repo}/commits/${encodeURIComponent(ref)}`,
        { headers: this.headers },
      );
      if (!resp.ok) return null;
      const data = (await resp.json()) as Record<string, unknown>;
      const commit = data.commit as Record<string, unknown> | undefined;
      const commitAuthor = commit?.author as Record<string, unknown> | undefined;
      return {
        sha: ((data.sha as string) || '').slice(0, 7),
        message: ((commit?.message as string) || '').split('\n')[0],
        date: (commitAuthor?.date as string) || '',
        author: (commitAuthor?.name as string) || '',
        htmlUrl: (data.html_url as string) || '',
      };
    } catch {
      return null;
    }
  }

  /** Thin JSON wrapper around the GitHub REST API; throws with .status on error. */
  private async gh<T>(path: string, method: string, body?: unknown): Promise<T> {
    const resp = await doRequest(`${GITHUB_API}${path}`, {
      method,
      headers: this.headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!resp.ok) {
      const errBody = (await resp.json().catch(() => ({}))) as Record<string, unknown>;
      const err = new Error( (errBody?.message as string) ?? `GitHub request failed (${resp.status})` ) as Error & { status?: number };
      err.status = resp.status;
      throw err;
    }
    return (await resp.json()) as T;
  }

  /**
   * Upload every file as a SINGLE git commit via the Git Data API
   * (blobs → tree → commit → move branch ref), instead of one Contents-API PUT
   * per file. One commit means Cloudflare runs exactly one build per publish,
   * and there are no per-file SHA conflicts (the new tree is layered on the
   * current tree with `base_tree`), which kills the 409/422 errors entirely.
   */
  async commitFiles(
    files: UploadFile[],
    message: string,
    onProgress: (done: number, total: number) => void,
    onRateLimit?: (secsLeft: number) => void,
    mirrorPrefix = '',
    options?: { isPrivate?: boolean }
  ): Promise<PublishResult & { commitSha?: string }> {
    const result: PublishResult & { commitSha?: string } = { success: true, uploaded: 0, noteCount: 0, failed: 0, errors: [], fixed: 0, issues: [] };
    if (files.length === 0) return result;

    try {
      const exists = await this.repoExists();
      if (!exists) {
        const isPrivate = options?.isPrivate || false;
        await this.createRepo(isPrivate);
        const ready = await this.waitForRepo(30000);
        if (!ready) {
          result.success = false;
          result.errors.push('Timed out waiting for repository creation on GitHub.');
          return result;
        }
      }
    } catch (e) {
      result.success = false;
      result.errors.push(`Failed to check or create repository: ${(e as Error).message}`);
      return result;
    }

    if (!this.branch) {
      result.success = false;
      result.errors.push('No branch specified. Run setup to detect the repository default branch.');
      return result;
    }
    const branch = this.branch;
    const refPath = `/repos/${this.owner}/${this.repo}/git/refs/heads/${encodeURIComponent(branch)}`;

    // 1. Current branch tip + its base tree.
    let headSha: string | null = null;
    let baseTreeSha: string | null = null;
    let branchExists = true;

    try {
      const ref = await this.gh<{ object: { sha: string } }>(refPath, 'GET');
      headSha = ref.object.sha;
      const headCommit = await this.gh<{ tree: { sha: string } }>(
        `/repos/${this.owner}/${this.repo}/git/commits/${headSha}`,
        'GET',
      );
      baseTreeSha = headCommit.tree.sha;
    } catch (err: unknown) {
      if ((err as Record<string, unknown>).status === 404) {
        // Branch doesn't exist — first commit scenario.
        branchExists = false;
      } else {
        result.success = false;
        result.errors.push(`Could not read branch "${branch}": ${(err as Error).message}`);
        return result;
      }
    }

    // 2. Create a blob per file (batched, with rate-limit backoff).
    const treeItems: Array<{ path: string; mode: '100644'; type: 'blob'; sha: string | null }> = [];
    let done = 0;
    for (let i = 0; i < files.length; i += BATCH_SIZE) {
      const batch = files.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (file) => {
          try {
            if (file.content === null) {
              treeItems.push({ path: file.path, mode: '100644', type: 'blob', sha: null });
            } else {
              const sha = await this.createBlobWithRetry(file.content, onRateLimit);
              treeItems.push({ path: file.path, mode: '100644', type: 'blob', sha });
            }
            result.uploaded++;
          } catch (err: unknown) {
            result.failed++;
            result.errors.push(`${file.path}: ${(err as Error).message}`);
          }
          done++;
          onProgress(done, files.length);
        }),
      );
      if (i + BATCH_SIZE < files.length) {
        await new Promise(r => window.setTimeout(r, 100));
      }
    }

    if (result.uploaded === 0) {
      result.success = false;
      return result;
    }

    // Never remove remote backup files when another upload in the same batch
    // failed. A later successful run can safely apply those deletions.
    if (result.failed > 0) {
      for (let index = treeItems.length - 1; index >= 0; index--) {
        if (treeItems[index].sha === null) treeItems.splice(index, 1);
      }
      if (treeItems.length === 0) {
        result.success = false;
        return result;
      }
    }

    // 2b. Mirror: when every file uploaded cleanly, delete any existing blobs
    // under `mirrorPrefix` that aren't in this publish — this strips any previous
    // template's demo pages and any notes removed/excluded from the vault, so
    // the live site matches the vault exactly. Skipped on partial failure (so a
    // hiccup never wipes content) and best-effort (skip if the tree can't list).
    if (mirrorPrefix && result.failed === 0 && baseTreeSha) {
      try {
        const full = await this.gh<{ tree: Array<{ path: string; type: string }> }>(
          `/repos/${this.owner}/${this.repo}/git/trees/${baseTreeSha}?recursive=1`,
          'GET',
        );
        const keep = new Set(files.map(f => f.path));
        for (const entry of full.tree) {
          if (entry.type === 'blob' && entry.path.startsWith(mirrorPrefix) && !keep.has(entry.path)) {
            treeItems.push({ path: entry.path, mode: '100644', type: 'blob', sha: null });
          }
        }
      } catch {
        // Couldn't read the existing tree — keep going with adds/updates only.
      }
    }

    // 3. Tree → commit → fast-forward the branch ref.
    try {
      const tree = await this.gh<{ sha: string }>(
        `/repos/${this.owner}/${this.repo}/git/trees`,
        'POST',
        baseTreeSha ? { base_tree: baseTreeSha, tree: treeItems } : { tree: treeItems },
      );
      const commit = await this.gh<{ sha: string }>(
        `/repos/${this.owner}/${this.repo}/git/commits`,
        'POST',
        headSha ? { message, tree: tree.sha, parents: [headSha] } : { message, tree: tree.sha, parents: [] },
      );
      result.commitSha = commit.sha;

      if (branchExists) {
        await this.gh(refPath, 'PATCH', { sha: commit.sha, force: false });
      } else {
        await this.gh(`/repos/${this.owner}/${this.repo}/git/refs`, 'POST', {
          ref: `refs/heads/${branch}`,
          sha: commit.sha,
        });
      }
    } catch (err: unknown) {
      result.success = false;
      result.errors.push(`Commit failed: ${(err as Error).message}`);
      return result;
    }

    if (result.failed > 0) result.success = false;
    return result;
  }

  private async createBlobWithRetry(
    base64Content: string,
    onRateLimit?: (secsLeft: number) => void,
  ): Promise<string> {
    let lastErr: Error | null = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const blob = await this.gh<{ sha: string }>(
          `/repos/${this.owner}/${this.repo}/git/blobs`,
          'POST',
          { content: base64Content, encoding: 'base64' },
        );
        return blob.sha;
      } catch (err: unknown) {
        lastErr = err as Error;
        const status = (lastErr as Error & { status?: number }).status;
        const msg = lastErr.message.toLowerCase();
        
        const rateLimited =
          status === 429 ||
          (status === 403 && (msg.includes('rate limit') || msg.includes('abuse') || msg.includes('secondary')));
          
        if (status === 404 || status === 401 || (status === 403 && !rateLimited)) {
          throw lastErr;
        }

        if (rateLimited) {
          await this.waitWithCountdown(RATE_LIMIT_WAIT_MS, onRateLimit);
        } else if (attempt < 2) {
          await new Promise(r => window.setTimeout(r, 1000 * Math.pow(2, attempt)));
        }
      }
    }
    throw lastErr ?? new Error('Blob creation failed');
  }

  private async waitWithCountdown(ms: number, onTick?: (secsLeft: number) => void): Promise<void> {
    if (!onTick) {
      await new Promise(r => window.setTimeout(r, ms));
      return;
    }
    let secsLeft = Math.ceil(ms / 1000);
    const interval = window.setInterval(() => {
      secsLeft--;
      if (secsLeft >= 0) onTick(secsLeft);
    }, 1000);
    await new Promise(r => window.setTimeout(r, ms));
    window.clearInterval(interval);
  }

  async repoExists(): Promise<boolean> {
    const resp = await doRequest(
      `${GITHUB_API}/repos/${this.owner}/${this.repo}`,
      { headers: this.headers },
    );
    return resp.ok;
  }

  async isRepoPrivate(): Promise<boolean> {
    const resp = await doRequest(
      `${GITHUB_API}/repos/${this.owner}/${this.repo}`,
      { headers: this.headers },
    );
    if (!resp.ok) {
      throw new Error('Could not verify backup storage privacy.');
    }
    const data = await resp.json() as { private?: boolean };
    return data.private === true;
  }

  async waitForRepo(maxWaitMs = 30000): Promise<boolean> {
    const start = Date.now();
    while (Date.now() - start < maxWaitMs) {
      if (await this.repoExists()) return true;
      await new Promise(r => window.setTimeout(r, 2000));
    }
    return false;
  }

  /**
   * Fetch the flat file tree for the repository's internal storage reference.
   * Returns an array of { path, sha, type } objects for all blobs (files).
   * Used by BackupEngine to avoid re-uploading unchanged files.
   */
  async listTree(branch?: string): Promise<Array<{ path: string; sha: string; type: string }>> {
    const ref = branch || this.branch || 'main';
    const data = await this.gh<{ tree: Array<{ path: string; sha: string; type: string }> }>(
      `/repos/${this.owner}/${this.repo}/git/trees/${encodeURIComponent(ref)}?recursive=1`,
      'GET',
    );
    return (data.tree ?? []).filter((item) => item.type === 'blob');
  }

  /**
   * Remove a site's entire sub-folder (`sites/<siteId>/`) from the master repo
   * in a single commit using null-SHA tree entries (the same mirror-deletion
   * mechanism used by publish). Does NOT delete the master repo — other sites
   * may still be living there. Best-effort: if the folder doesn't exist or the
   * repo is unreachable, this returns without throwing.
   */
  async deleteSiteFolder(siteId: string, branch: string): Promise<void> {
    const prefix = `sites/${siteId}/`;

    // Resolve the branch tip.
    let headSha: string;
    let baseTreeSha: string;
    const refPath = `/repos/${this.owner}/${this.repo}/git/refs/heads/${encodeURIComponent(branch)}`;

    try {
      const ref = await this.gh<{ object: { sha: string } }>(refPath, 'GET');
      headSha = ref.object.sha;
      const headCommit = await this.gh<{ tree: { sha: string } }>(
        `/repos/${this.owner}/${this.repo}/git/commits/${headSha}`,
        'GET',
      );
      baseTreeSha = headCommit.tree.sha;
    } catch {
      // Repo or branch doesn't exist — nothing to delete.
      return;
    }

    // Find all blobs under the site prefix.
    let toDelete: Array<{ path: string; mode: '100644'; type: 'blob'; sha: null }> = [];
    try {
      const fullTree = await this.gh<{ tree: Array<{ path: string; type: string }> }>(
        `/repos/${this.owner}/${this.repo}/git/trees/${baseTreeSha}?recursive=1`,
        'GET',
      );
      toDelete = fullTree.tree
        .filter((item) => item.type === 'blob' && item.path.startsWith(prefix))
        .map((item) => ({ path: item.path, mode: '100644' as const, type: 'blob' as const, sha: null }));
    } catch {
      return; // Can't read the tree — skip silently.
    }

    if (toDelete.length === 0) return; // Nothing under that prefix.

    // Commit the deletions as a single tree update.
    const tree = await this.gh<{ sha: string }>(
      `/repos/${this.owner}/${this.repo}/git/trees`,
      'POST',
      { base_tree: baseTreeSha, tree: toDelete },
    );
    const commit = await this.gh<{ sha: string }>(
      `/repos/${this.owner}/${this.repo}/git/commits`,
      'POST',
      { message: `NoteFlare: remove site ${siteId}`, tree: tree.sha, parents: [headSha] },
    );
    await this.gh(refPath, 'PATCH', { sha: commit.sha, force: false });
  }

}
