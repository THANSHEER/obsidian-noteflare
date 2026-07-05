import { BackupSettings, NoteFlareSettings, SiteProfile } from './types';

/** Default exclude globs applied to a brand-new site. */
export const DEFAULT_EXCLUDE_PATTERNS = ['private/**', '*.private.md', 'Templates/**'];

export const DEFAULT_BACKUP_SETTINGS: BackupSettings = {
  repository: '',
  folder: '',
  backupOnChange: true,
  intervalMinutes: 60,
  lastBackupAttemptAt: '',
  lastBackupAt: '',
  lastBackupError: '',
};

export const DEFAULT_SETTINGS: NoteFlareSettings = {
  githubOwner: '',
  githubToken: '',
  cloudflareAccount: '',
  cloudflareToken: '',
  sites: [],
  activeSiteId: '',
  setupComplete: false,
  enableBackup: false,
  enablePublish: true,
  backup: { ...DEFAULT_BACKUP_SETTINGS },
  masterRepository: '',
  defaultViewLocation: 'left',
};

/** Build a fresh site profile with sensible defaults. */
export function createSiteProfile(partial: Partial<SiteProfile> = {}): SiteProfile {
  return {
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `site-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: '',
    githubRepo: '',
    githubBranch: '',
    cloudflareProject: '',
    siteUrl: '',
    publishScope: partial.publishScope || 'vault',
    publishPaths: partial.publishPaths || [],
    authorName: '',
    sidebarTitle: '',
    siteDescription: '',
    excludePatterns: [...DEFAULT_EXCLUDE_PATTERNS],
    includeAttachments: true,
    isPublished: false,
    lastPublished: '',
    lastNoteCount: 0,
    deployTarget: 'cloudflare',
    ...partial,
  };
}
