/** Ko-fi support (widget ID P0R02009G7). */
export const KOFI_URL = 'https://ko-fi.com/P0R02009G7';
export const KOFI_BUTTON_LABEL = 'Support the project';
export const KOFI_BUTTON_COLOR = '#000000';

/** GitHub support. */
export const GITHUB_REPO_URL = 'https://github.com/THANSHEER/obsidian-noteflare';
export const GITHUB_SPONSORS_URL = 'https://github.com/sponsors/THANSHEER';
export const GITHUB_ISSUES_URL = 'https://github.com/THANSHEER/obsidian-noteflare/issues';
export const GITHUB_STAR_BUTTON_LABEL = 'Star on GitHub';


// Shared across fileCollector (which files to upload) and transformer (which
// embeds are images). Keep this as the single source of truth — both modules
// must agree on what counts as a publishable attachment.
export const ATTACHMENT_EXTS = new Set([
  'png',
  'jpg',
  'jpeg',
  'gif',
  'svg',
  'webp',
  'pdf',
]);

// Node version pinned for the Cloudflare Pages build. mdgarden needs a modern
// Node; Cloudflare otherwise defaults to a very old one and the build fails.
// Written to a `.node-version` file in the repo root on every publish.
export const NODE_VERSION = '24';

// The mdgarden engine dependency written into each published repo's
// package.json (Cloudflare runs `npm install` then `npx mdgarden build`).
// Defaults to the npm release — publish mdgarden to npm for this to resolve.
// During local dev or before publish, this could point to a github branch:
// 'github:<owner>/mdgarden' (mdgarden's `prepare` script builds it on install).
// 'latest' will fetch the newest version, but pinning a version is safer.

export const MDGARDEN_VERSION = 'latest';
