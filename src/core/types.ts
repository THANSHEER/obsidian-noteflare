/**
 * One published site. Each profile is fully isolated: its own GitHub repo,
 * Cloudflare project/URL, the vault folder it draws from, and its own publish
 * state. Account-level credentials are shared (see NoteFlareSettings).
 */
export interface SiteProfile {
  id: string;
  name: string;
  githubRepo: string;
  githubBranch: string;
  cloudflareProject: string;
  siteUrl: string;
  /** What to publish: the entire vault, a specific folder, or a single page. */
  publishScope?: 'vault' | 'selected';
  /** The folders or pages to publish (if scope is 'selected'). */
  publishPaths?: string[];
  authorName?: string;
  sidebarTitle?: string;
  siteDescription?: string;
  excludePatterns: string[];
  includeAttachments: boolean;
  isPublished: boolean;
  lastPublished: string;
  lastNoteCount: number;
  /** Where to deploy the built site. Defaults to 'cloudflare' if CF token present, else 'github-actions'. */
  deployTarget?: 'cloudflare' | 'github-actions';
}

/** User-facing backup settings. Git details intentionally stay internal. */
export interface BackupSettings {
  /** Private storage repository, generated during setup. */
  repository: string;
  /** Vault folder to back up ('' = whole vault). */
  folder: string;
  /** Run a debounced backup after vault files change. */
  backupOnChange: boolean;
  /** Scheduled backup cadence. Zero disables scheduled backups. */
  intervalMinutes: number;
  /** ISO timestamp of the most recent backup attempt, used to throttle retries. */
  lastBackupAttemptAt: string;
  /** ISO timestamp of the last successful backup. */
  lastBackupAt: string;
  /** Most recent background backup error, cleared on success. */
  lastBackupError: string;
}

export interface NoteFlareSettings {
  // Shared account credentials (one GitHub account + one Cloudflare account per
  // vault). Tokens are kept in memory only; persisted encrypted as *Enc fields.
  githubOwner: string;
  githubToken: string;
  cloudflareAccount: string;
  cloudflareToken: string;
  // Sites this vault publishes, and which one is currently selected.
  sites: SiteProfile[];
  activeSiteId: string;
  /** True once the initial setup wizard is complete (at least GitHub creds set). */
  setupComplete: boolean;
  /** Which features the user opted into during setup. */
  enableBackup: boolean;
  enablePublish: boolean;
  /** Master GitHub repository used for all published sites. */
  masterRepository: string;
  /** Automatic private backup settings. */
  backup: BackupSettings;
  /** Where the NoteFlare panel should open by default. */
  defaultViewLocation?: 'left' | 'right' | 'tab';
}

/**
 * Shape actually written to `data.json`: tokens are stored as encrypted
 * ciphertext (*Enc), never as plaintext. Legacy flat fields may appear when
 * reading an older file and are handled by migration in main.ts.
 */
export interface PersistedData
  extends Omit<NoteFlareSettings, 'githubToken' | 'cloudflareToken'> {
  githubTokenEnc?: string;
  cloudflareTokenEnc?: string;
}

export type SetupStep = 'github' | 'mode' | 'deploy-target' | 'cloudflare' | 'done';

export interface UploadFile {
  path: string;
  content: string | null;
}

export interface PublishResult {
  success: boolean;
  uploaded: number;
  failed: number;
  errors: string[];
  /** Notes whose frontmatter was auto-repaired before upload. */
  fixed: number;
  /** Human-readable notes about what was auto-fixed (file: reason). */
  issues: string[];
}

export interface BackupResult {
  success: boolean;
  updated: number;
  errors: string[];
}
