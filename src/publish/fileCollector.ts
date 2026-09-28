import { App, TFile, TFolder } from 'obsidian';
import { isMatch } from 'micromatch';
import { SiteProfile } from '../core/types';
import { ATTACHMENT_EXTS } from '../core/constants';

export class FileCollector {
  private readonly publishScope: 'vault' | 'selected';
  private readonly publishPaths: string[];

  constructor(
    private app: App,
    private site: SiteProfile,
  ) {
    this.publishScope = site.publishScope || 'vault';
    this.publishPaths = (site.publishPaths || []).map(p => p.trim().replace(/^\/+|\/+$/g, '')).filter(Boolean);
  }

  async collect(): Promise<TFile[]> {
    const result: TFile[] = [];

    if (this.publishScope === 'selected') {
      const explicitFiles = new Set<string>();

      for (const path of this.publishPaths) {
        const abstractFile = this.app.vault.getAbstractFileByPath(path);

        if (abstractFile instanceof TFile) {
          if (abstractFile.extension === 'md' && !this.isExcluded(abstractFile.path)) {
            // Explicitly selected markdown file
            if (!result.some(f => f.path === abstractFile.path)) {
              result.push(abstractFile);
              explicitFiles.add(abstractFile.path);
            }
          } else if (
            this.site.includeAttachments &&
            ATTACHMENT_EXTS.has(abstractFile.extension.toLowerCase()) &&
            !this.isExcluded(abstractFile.path)
          ) {
            // FIX: Explicitly selected attachment files were silently ignored before.
            // Now they are included directly.
            if (!result.some(f => f.path === abstractFile.path)) {
              result.push(abstractFile);
            }
          }
        } else if (abstractFile instanceof TFolder) {
          const folderPrefix = path + '/';
          for (const file of this.app.vault.getFiles()) {
            if (file.path.startsWith(folderPrefix) && !this.isExcluded(file.path)) {
              if (file.extension === 'md') {
                if (!result.some(f => f.path === file.path)) {
                  result.push(file);
                  explicitFiles.add(file.path);
                }
              } else if (
                this.site.includeAttachments &&
                ATTACHMENT_EXTS.has(file.extension.toLowerCase())
              ) {
                if (!result.some(f => f.path === file.path)) {
                  result.push(file);
                }
              }
            }
          }
        }
      }

      if (this.site.includeAttachments) {
        const extraAttachments: TFile[] = [];
        for (const file of result) {
          if (explicitFiles.has(file.path)) {
            const cache = this.app.metadataCache.getCache(file.path);
            const linksAndEmbeds = [
              ...(cache?.links || []),
              ...(cache?.embeds || []),
            ];

            for (const item of linksAndEmbeds) {
              const destFile = this.app.metadataCache.getFirstLinkpathDest(item.link, file.path);
              if (destFile && ATTACHMENT_EXTS.has(destFile.extension.toLowerCase())) {
                if (!this.isExcluded(destFile.path) && !result.some(f => f.path === destFile.path) && !extraAttachments.some(f => f.path === destFile.path)) {
                  extraAttachments.push(destFile);
                }
              }
            }
          }
        }
        result.push(...extraAttachments);
      }

      return result;
    }

    for (const file of this.app.vault.getFiles()) {
      if (this.isExcluded(file.path)) continue;

      if (file.extension === 'md') {
        result.push(file);
      } else if (
        this.site.includeAttachments &&
        ATTACHMENT_EXTS.has(file.extension.toLowerCase())
      ) {
        result.push(file);
      }
    }

    return result;
  }

  /**
   * FIX: Use chunked base64 encoding (same as backupEngine.ts) to avoid the
   * O(n²) string concatenation that froze Obsidian on large attachments.
   * Old: byte-by-byte loop → 5M concat operations for a 5MB file.
   * New: 32KB chunks → ~160 operations for the same file.
   */
  async readAsBase64(file: TFile): Promise<string> {
    const buffer = await this.app.vault.readBinary(file);
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 0x8000; // 32 KB
    for (let offset = 0; offset < bytes.byteLength; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    }
    return btoa(binary);
  }

  private isExcluded(path: string): boolean {
    if (this.site.excludePatterns.length === 0) return false;
    return isMatch(path, this.site.excludePatterns, { dot: true });
  }
}
