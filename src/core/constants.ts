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

/**
 * GitHub Actions workflow YAML for the "GitHub Actions" deploy target.
 * This gets committed to `.github/workflows/deploy.yml` in the publish repo.
 * It installs mdgarden, builds the site, and deploys to GitHub Pages.
 *
 * Action versions pinned to known stable releases:
 *   actions/checkout@v4, setup-node@v4, configure-pages@v5,
 *   upload-pages-artifact@v3, deploy-pages@v4
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
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Build all sites
        run: |
          mkdir -p build_output/sites
          found_sites=0
          for site_dir in sites/*/; do
            if [ -f "\${site_dir}package.json" ]; then
              echo "Building site in \${site_dir}..."
              (
                cd "\${site_dir}"
                npm ci || npm install
                npx mdgarden build
              )
              site_id=\$(basename "\${site_dir}")
              cp -r "\${site_dir}public" "build_output/sites/\${site_id}"
              found_sites=\$((found_sites + 1))
            fi
          done
          if [ "\$found_sites" -eq 0 ]; then
            echo "No sites found to build."
            mkdir -p build_output
            echo "<h1>No sites published yet</h1>" > build_output/index.html
          else
            latest_site=""
            latest_time=0
            for site_dir in sites/*/; do
              if [ -f "\${site_dir}package.json" ]; then
                mtime=\$(git log -1 --format="%ct" "\${site_dir}" 2>/dev/null || echo 0)
                if [ "\$mtime" -gt "\$latest_time" ]; then
                  latest_time="\$mtime"
                  latest_site=\$(basename "\${site_dir}")
                fi
              fi
            done
            if [ -z "\$latest_site" ]; then
              latest_site=\$(ls -1 build_output/sites | head -n 1)
            fi
            if [ -n "\$latest_site" ]; then
              echo "Deploying '\$latest_site' to root..."
              cp -r "sites/\${latest_site}/public/." build_output/
            fi
          fi
          mv build_output public
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