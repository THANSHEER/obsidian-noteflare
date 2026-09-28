import { App } from 'obsidian';
import { GitHubApi } from '../api/githubApi';
import { BackupResult, NoteFlareSettings, UploadFile } from '../core/types';

const DEFAULT_IGNORE_PATTERNS = [
  '.DS_Store',
  'Thumbs.db',
  'desktop.ini',
  '.trash/',
  'node_modules/',
];

interface LocalBackupFile {
  content: string;
  sha: string;
}

/**
 * Mirrors the selected vault content to private remote storage.
 * The local vault is authoritative; there is no pull, conflict, branch, or
 * manual commit workflow exposed to users.
 */
export class BackupEngine {
  constructor(
    private app: App,
    private settings: NoteFlareSettings,
    private onProgress: (message: string) => void = () => {},
  ) {}

  async backup(): Promise<BackupResult> {
    const result: BackupResult = { success: true, updated: 0, errors: [] };
    const { githubOwner, githubToken, backup } = this.settings;

    if (!githubToken || !githubOwner || !backup.repository) {
      return {
        success: false,
        updated: 0,
        errors: ['Backup is not configured. Open NoteFlare settings to finish setup.'],
      };
    }

    try {
      const isPrivate = backup.repoVisibility !== 'public';
      let github = new GitHubApi(githubToken, githubOwner, backup.repository, 'main');
      const repositoryExists = await github.repoExists();
      if (!repositoryExists) {
        this.onProgress('Preparing backup storage…');
        await github.createRepo(isPrivate);
        if (!(await github.waitForRepo(30000))) {
          throw new Error('Timed out while preparing backup storage.');
        }
      } else if (isPrivate && !(await github.isRepoPrivate())) {
        throw new Error(
          'Backup stopped because its storage location is public. Rename that repository in GitHub or make it private, then try again.',
        );
      }

      let branch = 'main';
      try {
        branch = await github.getDefaultBranch();
      } catch {
        // Repositories created by NoteFlare use main.
      }
      github = new GitHubApi(githubToken, githubOwner, backup.repository, branch);

      const { files: localFiles, skipped } = await this.collectLocalFiles();
      const remoteFiles = await this.getRemoteFiles(github);
      const uploads: UploadFile[] = [];

      for (const [path, local] of localFiles) {
        if (remoteFiles.get(path) !== local.sha) {
          uploads.push({ path, content: local.content });
        }
        remoteFiles.delete(path);
      }

      for (const path of remoteFiles.keys()) {
        // Skip deletion if the file still exists locally but was transiently unreadable.
        const localFileExists = this.app.vault.getAbstractFileByPath(path) !== null;
        if (!this.isIgnored(path) && !localFileExists) {
          uploads.push({ path, content: null });
        }
      }

      // FIX: Report skipped files as non-fatal warnings so user knows backup is incomplete.
      if (skipped.length > 0) {
        const preview = skipped.slice(0, 3).join(', ');
        const more = skipped.length > 3 ? ` …and ${skipped.length - 3} more` : '';
        result.errors.push(
          `Warning: ${skipped.length} file(s) could not be read and were skipped: ${preview}${more}. Your backup may be incomplete.`,
        );
        // Still treat this as a "success" overall — partial backup is better than nothing.
        // Callers in main.ts check errors length to surface the warning.
      }

      if (uploads.length === 0) return result;

      const timestamp = new Date().toLocaleString();
      const committed = await github.commitFiles(
        uploads,
        `NoteFlare backup · ${timestamp}`,
        (done, total) => this.onProgress(`Backing up ${done}/${total}…`),
        undefined,
        '',
        { isPrivate: true },
      );

      result.success = committed.success;
      result.updated = committed.uploaded;
      // Merge commit errors with any skip warnings already in result.errors
      result.errors = [...result.errors, ...committed.errors];
    } catch (error: unknown) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : 'Backup failed.');
    }

    return result;
  }

  private async collectLocalFiles(): Promise<{ files: Map<string, LocalBackupFile>; skipped: string[] }> {
    const files = new Map<string, LocalBackupFile>();
    const skipped: string[] = [];

    for (const file of this.app.vault.getFiles()) {
      if (this.isIgnored(file.path)) continue;

      try {
        const bytes = new Uint8Array(await this.app.vault.readBinary(file));
        files.set(file.path, {
          content: this.toBase64(bytes),
          sha: await this.computeGitBlobSha(bytes),
        });
      } catch (err: unknown) {
        // FIX: Track skipped files instead of silently dropping them.
        // A file that fails to read is skipped without deleting its remote backup copy,
        // but the user is informed so they know the backup may be incomplete.
        skipped.push(file.path);
      }
    }

    return { files, skipped };
  }

  private async getRemoteFiles(github: GitHubApi): Promise<Map<string, string>> {
    try {
      const tree = await github.listTree();
      return new Map(
        tree
          .filter((file) => !this.isIgnored(file.path))
          .map((file) => [file.path, file.sha]),
      );
    } catch (error: unknown) {
      const status = (error as Error & { status?: number }).status;
      if (status === 404 || (error as Error).message.includes('404')) return new Map();
      throw error;
    }
  }

  private isIgnored(path: string): boolean {
    const configDir = this.app.vault.configDir;
    if (path === configDir || path.startsWith(`${configDir}/`)) return true;

    return DEFAULT_IGNORE_PATTERNS.some((pattern) => {
      if (pattern.endsWith('/')) {
        return path === pattern.slice(0, -1) || path.startsWith(pattern);
      }
      return path === pattern || path.endsWith('/' + pattern);
    });
  }

  private toBase64(bytes: Uint8Array): string {
    let binary = '';
    const chunkSize = 0x8000;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    }
    return btoa(binary);
  }

  private async computeGitBlobSha(content: Uint8Array): Promise<string> {
    const header = new TextEncoder().encode(`blob ${content.byteLength}\0`);
    const payload = new Uint8Array(header.length + content.length);
    payload.set(header);
    payload.set(content, header.length);
    const hash = await crypto.subtle.digest('SHA-1', payload);
    return Array.from(new Uint8Array(hash))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
}
