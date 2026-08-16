import { requestUrl } from 'obsidian';

export const GEEKSTASH_ORIGIN = 'https://geekstash.dev';
export const NOTEFLARE_SLUG = 'noteflare';
export const NOTEFLARE_GITHUB_REPO = 'THANSHEER/obsidian-noteflare';

export interface GitHubReleaseNotes {
  tagName: string;
  name: string;
  body: string;
  htmlUrl: string;
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
      if (resp.status === 200) {
        const data = resp.json as {
          tag_name?: string;
          name?: string;
          body?: string;
          html_url?: string;
        };
        return {
          tagName: data.tag_name ?? tag,
          name: data.name ?? tag,
          body: (data.body ?? '').trim(),
          htmlUrl: data.html_url ?? `https://github.com/${NOTEFLARE_GITHUB_REPO}/releases`,
        };
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
    if (latest.status !== 200) return null;

    const data = latest.json as {
      tag_name?: string;
      name?: string;
      body?: string;
      html_url?: string;
    };
    if (!matchesReleaseTag(version, data.tag_name)) {
      return {
        tagName: version,
        name: `NoteFlare ${version}`,
        body: '',
        htmlUrl: `https://github.com/${NOTEFLARE_GITHUB_REPO}/releases`,
      };
    }
    return {
      tagName: data.tag_name ?? '',
      name: data.name ?? 'Latest release',
      body: (data.body ?? '').trim(),
      htmlUrl: data.html_url ?? `https://github.com/${NOTEFLARE_GITHUB_REPO}/releases`,
    };
  }
}
