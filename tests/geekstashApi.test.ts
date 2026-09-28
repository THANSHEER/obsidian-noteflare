import {
  GeekstashApi,
  parseGitHubRelease,
  releaseToNotes,
  type GitHubRelease,
} from '../src/api/geekstashApi';
import { getEmbeddedReleases } from '../src/core/changelogData';
import { requestUrl } from 'obsidian';

describe('GeekstashApi and GitHubRelease with Assets & SHA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('parseGitHubRelease correctly parses release and asset list', () => {
    const raw = {
      tag_name: 'v1.2.3',
      name: 'NoteFlare 1.2.3',
      published_at: '2026-09-02T12:00:00Z',
      html_url: 'https://github.com/THANSHEER/obsidian-noteflare/releases/tag/v1.2.3',
      body: '### Features\n- New release',
      prerelease: false,
      draft: false,
      assets: [
        {
          name: 'noteflare-1.2.3.zip',
          browser_download_url: 'https://github.com/THANSHEER/obsidian-noteflare/releases/download/v1.2.3/noteflare-1.2.3.zip',
          size: 350000,
          download_count: 42,
        },
        {
          name: 'noteflare-1.2.3.zip.sha256',
          browser_download_url: 'https://github.com/THANSHEER/obsidian-noteflare/releases/download/v1.2.3/noteflare-1.2.3.zip.sha256',
          size: 85,
          download_count: 10,
        },
      ],
    };

    const parsed: GitHubRelease = parseGitHubRelease(raw);
    expect(parsed.tag_name).toBe('v1.2.3');
    expect(parsed.name).toBe('NoteFlare 1.2.3');
    expect(parsed.assets).toHaveLength(2);
    expect(parsed.assets[0].name).toBe('noteflare-1.2.3.zip');
    expect(parsed.assets[0].size).toBe(350000);
    expect(parsed.assets[0].download_count).toBe(42);
    expect(parsed.assets[1].name).toBe('noteflare-1.2.3.zip.sha256');

    const zip = GeekstashApi.findZipAsset(parsed.assets);
    expect(zip?.name).toBe('noteflare-1.2.3.zip');

    const sha = GeekstashApi.findSha256Asset(parsed.assets);
    expect(sha?.name).toBe('noteflare-1.2.3.zip.sha256');
  });

  test('releaseToNotes converts release into augmented GitHubReleaseNotes', () => {
    const raw = {
      tag_name: 'v1.2.0',
      name: 'Release 1.2.0',
      published_at: '2026-08-01T00:00:00Z',
      html_url: 'https://github.com/THANSHEER/obsidian-noteflare/releases/tag/v1.2.0',
      body: 'Notes',
      prerelease: false,
      draft: false,
      assets: [
        {
          name: 'noteflare-1.2.0.zip',
          browser_download_url: 'https://example.com/noteflare-1.2.0.zip',
          size: 1234,
          download_count: 5,
        },
      ],
    };
    const release = parseGitHubRelease(raw);
    const notes = releaseToNotes(release);

    expect(notes.tagName).toBe('v1.2.0');
    expect(notes.name).toBe('Release 1.2.0');
    expect(notes.assets).toHaveLength(1);
    expect(notes.rawRelease).toBe(release);
  });

  test('fetchReleaseNotes returns release notes with assets', async () => {
    (requestUrl as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: {
        tag_name: 'v1.2.3',
        name: 'v1.2.3',
        body: 'Release notes body',
        html_url: 'https://github.com/THANSHEER/obsidian-noteflare/releases/tag/v1.2.3',
        assets: [
          {
            name: 'noteflare-1.2.3.zip',
            browser_download_url: 'https://example.com/noteflare-1.2.3.zip',
            size: 2048,
            download_count: 1,
          },
        ],
      },
    });

    const notes = await GeekstashApi.fetchReleaseNotes('1.2.3');
    expect(notes).not.toBeNull();
    expect(notes?.tagName).toBe('v1.2.3');
    expect(notes?.assets).toHaveLength(1);
    expect(notes?.assets?.[0].name).toBe('noteflare-1.2.3.zip');
  });

  test('fetchAllReleases returns parsed release list with assets', async () => {
    (requestUrl as jest.Mock).mockResolvedValueOnce({
      status: 200,
      json: [
        {
          tag_name: 'v1.2.3',
          name: 'v1.2.3',
          assets: [
            {
              name: 'noteflare-1.2.3.zip',
              browser_download_url: 'https://example.com/noteflare-1.2.3.zip',
              size: 1000,
              download_count: 0,
            },
          ],
        },
        {
          tag_name: 'v1.2.2',
          name: 'v1.2.2',
          assets: [],
        },
      ],
    });

    const releases = await GeekstashApi.fetchAllReleases(10);
    expect(releases).toHaveLength(2);
    expect(releases[0].tag_name).toBe('v1.2.3');
    expect(releases[0].assets).toHaveLength(1);
    expect(releases[1].tag_name).toBe('v1.2.2');
  });

  test('fetchSha256Checksum extracts 64-char hex string from .sha256 content', async () => {
    const testHash = 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0';
    (requestUrl as jest.Mock).mockResolvedValueOnce({
      status: 200,
      text: `${testHash}  noteflare-1.2.3.zip\n`,
    });

    const hash = await GeekstashApi.fetchSha256Checksum('https://example.com/noteflare-1.2.3.zip.sha256');
    expect(hash).toBe(testHash.toLowerCase());
  });

  test('getEmbeddedReleases generates fallback release entries with zip and sha256 assets', () => {
    const releases = getEmbeddedReleases();
    expect(releases.length).toBeGreaterThan(0);
    const first = releases[0];
    expect(first.tag_name).toMatch(/^\d+\.\d+\.\d+/);
    expect(first.assets).toHaveLength(4);
    expect(first.assets[0].name).toContain('obsidian-noteflare');
    expect(first.assets[1].name).toContain('obsidian-noteflare');
    expect(first.assets[2].name).toContain('noteflare');
    expect(first.assets[3].name).toContain('noteflare');
  });
});
