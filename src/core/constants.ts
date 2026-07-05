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
export const NODE_VERSION = '22';

// The mdgarden engine dependency written into each published repo's
// package.json (Cloudflare runs `npm install` then `npx mdgarden build`).
// Defaults to the npm release — publish mdgarden to npm for this to resolve.
// During local dev or before publish, this could point to a github branch:
// 'github:<owner>/mdgarden' (mdgarden's `prepare` script builds it on install).
// 'latest' will fetch the newest version, but pinning a version is safer.

export const MDGARDEN_VERSION = 'latest';

/**
 * GitHub Actions workflow YAML for the "GitHub Actions" deploy target.
 * This gets committed to `.github/workflows/deploy.yml` in the publish repo.
 * It installs mdgarden, builds the site, and deploys to GitHub Pages.
 */
export const GITHUB_ACTIONS_WORKFLOW = `name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '${NODE_VERSION}'
          cache: npm
      - run: npm ci || npm install
      - run: npx mdgarden build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: public

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
`;