
import { GitHubApi } from '../../../api/githubApi';
import { CloudflareApi } from '../../../api/cloudflareApi';
import { createSiteProfile } from '../../../core/settings';
import { SiteProfile } from '../../../core/types';
import type NoteFlarePlugin from '../../../../main';


export function buildCloudflareTokenUrl(): string {
  const perms = encodeURIComponent(JSON.stringify([
    { key: 'page', type: 'edit' },
    { key: 'workers_scripts', type: 'edit' },
    { key: 'account_settings', type: 'read' },
  ]));
  return `https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=${perms}&accountId=*&zoneId=all&name=NoteFlare`;
}

/** Normalise a site name into a valid GitHub repo / Pages project slug. */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/** Turns a raw Cloudflare error into an actionable setup message. */
export function cloudflareSetupHint(rawMessage: string, repoSlug: string): string {
  const lower = rawMessage.toLowerCase();
  if (lower.includes('rejected this token') || lower.includes('permission') || lower.includes('authentication')) {
    return 'Cloudflare rejected this token. Make sure it has the Cloudflare Pages: Edit permission, then try again.';
  }
  return `Couldn't create the Pages project. Most likely the Cloudflare GitHub App isn't authorized for ${repoSlug} yet — use “Authorize Cloudflare on GitHub”, grant access to that repo, then try again. (Cloudflare said: ${rawMessage})`;
}


/**
 * End-to-end site creation, shared by the first-run wizard and the "Add site"
 * modal: create a fresh GitHub repo, then a Cloudflare Pages project pointed at
 * it. The first publish commits the user's content plus a mdgarden
 * package.json/config, which Cloudflare builds with `npx mdgarden build`. Reuses
 * the shared GitHub/Cloudflare credentials already on the plugin settings.
 *
 * NoteFlare supports Cloudflare Pages only — the GitHub Pages code path has been
 * removed. The `hostingProvider` parameter is retained for type compatibility
 * with existing SiteProfile data.
 */
export async function provisionSite(
  plugin: NoteFlarePlugin,
  name: string,
  profileParams: Partial<SiteProfile>,
  hostingProvider: SiteProfile['hostingProvider'] = 'cloudflare',
): Promise<SiteProfile> {
  const slug = slugify(name);
  if (!slug) throw new Error('Please enter a site name.');

  const owner = plugin.settings.githubOwner;
  const repo = plugin.settings.masterRepository;
  if (!repo) throw new Error('Please configure a Master Repository in settings first.');

  const site = createSiteProfile({
    name,
    hostingProvider: 'cloudflare',
    ...profileParams,
  });

  const gh = new GitHubApi(plugin.settings.githubToken, owner, repo);
  await gh.createRepo();
  if (!(await gh.waitForRepo(30000))) {
    throw new Error('Repository creation timed out — please try again.');
  }

  let branch = 'main';
  try {
    branch = await gh.getDefaultBranch();
  } catch {
    // Keep the default branch.
  }
  site.githubBranch = branch;
  site.githubRepo = repo;

  // Cloudflare Pages: create (or recover) a Pages project.
  const cf = new CloudflareApi(plugin.settings.cloudflareToken, plugin.settings.cloudflareAccount);
  const rootDir = `sites/${site.id}`;
  // Make project name unique since multiple sites share the same repo.
  const projectName = slugify(`${repo}-${slug}`);
  let siteUrl = '';
  try {
    siteUrl = await cf.createProject(projectName, owner, repo, branch, rootDir);
    site.cloudflareProject = projectName;
  } catch (createErr: unknown) {
    try {
      siteUrl = await cf.getProject(projectName);
      site.cloudflareProject = projectName;
    } catch {
      throw new Error(cloudflareSetupHint((createErr as Error).message, `${owner}/${repo}`));
    }
  }

  site.siteUrl = siteUrl;
  return site;
}

