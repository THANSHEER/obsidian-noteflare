import { requestUrl } from 'obsidian';

export const GEEKSTASH_ORIGIN = 'https://geekstash.dev';
export const NOTEFLARE_SLUG = 'noteflare';
export const NOTEFLARE_GITHUB_REPO = 'THANSHEER/obsidian-noteflare';

export interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
  size: number;
  download_count: number;
}

export interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  body: string;
  prerelease: boolean;
  draft: boolean;
  assets: GitHubReleaseAsset[];
}

export interface GitHubReleaseNotes {
  tagName: string;
  name: string;
  body: string;
  htmlUrl: string;
  publishedAt?: string;
  prerelease?: boolean;
  assets?: GitHubReleaseAsset[];
  rawRelease?: GitHubRelease;
}

function asString(val: unknown, fallback = ''): string {
  return typeof val === 'string' ? val : fallback;
}

/**
 * Parses raw GitHub API release JSON into a strongly-typed GitHubRelease.
 */
export function parseGitHubRelease(data: Record<string, unknown>): GitHubRelease {
  const rawAssets = Array.isArray(data.assets) ? data.assets : [];
  const assets: GitHubReleaseAsset[] = rawAssets.map((item: unknown) => {
    const a = item && typeof item === 'object' ? (item as Record<string, unknown>) : {};
    return {
      name: asString(a.name),
      browser_download_url: asString(a.browser_download_url),
      size: typeof a.size === 'number' ? a.size : 0,
      download_count: typeof a.download_count === 'number' ? a.download_count : 0,
    };
  });

  return {
    tag_name: asString(data.tag_name),
    name: asString(data.name, asString(data.tag_name)),
    published_at: asString(data.published_at),
    html_url: asString(data.html_url, `https://github.com/${NOTEFLARE_GITHUB_REPO}/releases`),
    body: asString(data.body).trim(),
    prerelease: Boolean(data.prerelease),
    draft: Boolean(data.draft),
    assets,
  };
}

export function releaseToNotes(release: GitHubRelease): GitHubReleaseNotes {
  return {
    tagName: release.tag_name,
    name: release.name || release.tag_name,
    body: release.body,
    htmlUrl: release.html_url,
    publishedAt: release.published_at,
    prerelease: release.prerelease,
    assets: release.assets,
    rawRelease: release,
  };
}

/**
 * NoteFlare never talks to api.geekstash.dev or embeds Turnstile — the Geekstash
 * website owns those forms (Turnstile + submission). We only deep-link there.
 * See API.md for the full contract.
 */
export function feedbackFormUrl(topic?: string): string {
  const url = `${GEEKSTASH_ORIGIN}/${NOTEFLARE_SLUG}/feedback`;
  return topic && topic !== 'general' ? `${url}?topic=${encodeURIComponent(topic)}` : url;
}

export function featureRequestFormUrl(): string {
  return `${GEEKSTASH_ORIGIN}/${NOTEFLARE_SLUG}/feature-request`;
}

export function bugReportFormUrl(): string {
  return `${GEEKSTASH_ORIGIN}/${NOTEFLARE_SLUG}/bug-report`;
}

export function uninstallFormUrl(): string {
  return `${GEEKSTASH_ORIGIN}/${NOTEFLARE_SLUG}/uninstall`;
}

function matchesReleaseTag(version: string, tag: string | undefined): boolean {
  if (!tag) return false;
  const normalizedVersion = version.startsWith('v') ? version.slice(1) : version;
  const normalizedTag = tag.startsWith('v') ? tag.slice(1) : tag;
  return normalizedTag === normalizedVersion;
}

export class GeekstashApi {
  /** Public GitHub release notes for the given plugin version (no auth). */
  static async fetchReleaseNotes(version: string): Promise<GitHubReleaseNotes | null> {
    const tags = version.startsWith('v') ? [version, version.slice(1)] : [`v${version}`, version];

    for (const tag of tags) {
      const resp = await requestUrl({
        url: `https://api.github.com/repos/${NOTEFLARE_GITHUB_REPO}/releases/tags/${encodeURIComponent(tag)}`,
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        throw: false,
      });
      if (resp.status === 200 && resp.json) {
        const release = parseGitHubRelease(resp.json as Record<string, unknown>);
        return releaseToNotes(release);
      }
    }

    // Fallback: only use the latest release when it matches the current version.
    // Otherwise we'd risk showing the wrong changelog for this update.
    const latest = await requestUrl({
      url: `https://api.github.com/repos/${NOTEFLARE_GITHUB_REPO}/releases/latest`,
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      throw: false,
    });
    if (latest.status !== 200 || !latest.json) return null;

    const latestRelease = parseGitHubRelease(latest.json as Record<string, unknown>);
    if (!matchesReleaseTag(version, latestRelease.tag_name)) {
      return {
        tagName: version,
        name: `NoteFlare ${version}`,
        body: '',
        htmlUrl: `https://github.com/${NOTEFLARE_GITHUB_REPO}/releases`,
        assets: [],
      };
    }
    return releaseToNotes(latestRelease);
  }

  /**
   * Fetch historical releases from the public GitHub Releases API.
   * Enables users to browse and download older versions with verified SHA checksums.
   */
  static async fetchAllReleases(limit = 30): Promise<GitHubRelease[]> {
    try {
      const resp = await requestUrl({
        url: `https://api.github.com/repos/${NOTEFLARE_GITHUB_REPO}/releases?per_page=${Math.min(limit, 100)}`,
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        throw: false,
      });
      if (resp?.status === 200 && Array.isArray(resp.json)) {
        return (resp.json as Array<Record<string, unknown>>)
          .map((item) => parseGitHubRelease(item))
          .filter((r) => !r.draft);
      }
    } catch (e) {
      console.warn('NoteFlare: failed to fetch all releases from GitHub:', e);
    }
    return [];
  }

  /**
   * Fetch SHA-256 checksum string from a release asset's download URL.
   * Strips trailing filenames and whitespaces, returning the clean 64-char hex string.
   */
  static async fetchSha256Checksum(url: string): Promise<string | null> {
    if (!url) return null;
    try {
      const resp = await requestUrl({
        url,
        method: 'GET',
        throw: false,
      });
      if (resp?.status !== 200) return null;
      const text = resp.text || '';
      const match = text.trim().match(/^[a-fA-F0-9]{64}/);
      return match ? match[0].toLowerCase() : null;
    } catch {
      return null;
    }
  }

  /**
   * Find the release archive (.zip) asset for this release.
   */
  static findZipAsset(assets: GitHubReleaseAsset[]): GitHubReleaseAsset | null {
    if (!assets || assets.length === 0) return null;
    return (
      assets.find((a) => a.name.startsWith('obsidian-') && a.name.endsWith('.zip') && !a.name.endsWith('.sha256')) ??
      assets.find((a) => a.name.endsWith('.zip') && !a.name.endsWith('.zip.sha256') && !a.name.endsWith('.sha256')) ??
      null
    );
  }

  /**
   * Find the checksum (.sha256) asset for this release.
   */
  static findSha256Asset(assets: GitHubReleaseAsset[], zipName?: string): GitHubReleaseAsset | null {
    if (!assets || assets.length === 0) return null;
    if (zipName) {
      const matched = assets.find((a) => a.name === `${zipName}.sha256`);
      if (matched) return matched;
    }
    return (
      assets.find((a) => a.name.startsWith('obsidian-') && (a.name.endsWith('.zip.sha256') || a.name.endsWith('.sha256'))) ??
      assets.find((a) => a.name.endsWith('.sha256') || a.name.endsWith('.zip.sha256')) ??
      null
    );
  }
}
