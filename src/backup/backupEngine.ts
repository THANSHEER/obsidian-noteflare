import { App, normalizePath } from 'obsidian';
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
      let github = new GitHubApi(githubToken, githubOwner, backup.repository, 'main');
      const repositoryExists = await github.repoExists();
      if (!repositoryExists) {
        this.onProgress('Preparing private backup storage…');
        await github.createRepo(true);
        if (!(await github.waitForRepo(30000))) {
          throw new Error('Timed out while preparing private backup storage.');
        }
      } else if (!(await github.isRepoPrivate())) {
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

      const localFiles = await this.collectLocalFiles();
      const remoteFiles = await this.getRemoteFiles(github);
      const uploads: UploadFile[] = [];

      for (const [path, local] of localFiles) {
        if (remoteFiles.get(path) !== local.sha) {
          uploads.push({ path, content: local.content });
        }
        remoteFiles.delete(path);
      }

      for (const path of remoteFiles.keys()) {
        const existsButWasUnreadable =
          this.isInBackupScope(path) && this.app.vault.getAbstractFileByPath(path) !== null;
        if (!this.isIgnored(path) && !existsButWasUnreadable) {
          uploads.push({ path, content: null });
        }
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
      result.errors = committed.errors;
    } catch (error: unknown) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : 'Backup failed.');
    }

    return result;
  }

  private async collectLocalFiles(): Promise<Map<string, LocalBackupFile>> {
    const files = new Map<string, LocalBackupFile>();
    const folder = this.settings.backup.folder
      ? normalizePath(this.settings.backup.folder)
      : '';

    for (const file of this.app.vault.getFiles()) {
      if (folder && file.path !== folder && !file.path.startsWith(`${folder}/`)) continue;
      if (this.isIgnored(file.path)) continue;

      try {
        const bytes = new Uint8Array(await this.app.vault.readBinary(file));
        files.set(file.path, {
          content: this.toBase64(bytes),
          sha: await this.computeGitBlobSha(bytes),
        });
      } catch {
        // A transiently unreadable file is skipped without deleting its backup.
      }
    }

    return files;
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

  private isInBackupScope(path: string): boolean {
    const folder = this.settings.backup.folder
      ? normalizePath(this.settings.backup.folder)
      : '';
    return !folder || path === folder || path.startsWith(`${folder}/`);
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
