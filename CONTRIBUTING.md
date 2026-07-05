# Contributing to NoteFlare

Thank you for your interest in contributing to NoteFlare! We welcome bug reports, feature requests, and pull requests.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://npmjs.com/)
- Obsidian desktop app

## Local Development Setup

To work on NoteFlare locally, you should clone the repository directly into your Obsidian vault's plugin folder.

1. Open your terminal and navigate to your vault's plugins folder:
   ```bash
   cd /path/to/your/vault/.obsidian/plugins/
   ```

2. Clone this repository:
   ```bash
   git clone https://github.com/your-username/obsidian-noteflare.git
   cd obsidian-noteflare
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Plugin

We use `esbuild` for fast, iterative development.

- **Development Build (Watch Mode):**
  ```bash
  npm run dev
  ```
  This command will watch for changes in the `src/` directory and rebuild `main.js` automatically (with inline sourcemaps). 
  *Note:* You still need to reload the plugin in Obsidian (Settings -> Community plugins -> toggle NoteFlare off and on) or reload the entire app (`Ctrl/Cmd + R`) to see the changes.

- **Production Build:**
  ```bash
  npm run build
  ```
  This command runs the TypeScript compiler (`tsc -noEmit -skipLibCheck`) to type-check your code, and then creates a minified production bundle. 

> **Important:** There is no separate linting step or test framework. The only quality gate is the type-check performed during `npm run build`. Please ensure your code passes the build before submitting a PR.

## Code Structure

- `main.ts`: The entry point, orchestrator, and plugin shell.
- `src/api/`: GitHub and Cloudflare API clients.
- `src/core/`: Types, settings, constants, and secure storage wrappers.
- `src/publish/`: The core publish pipeline, file collector, and content transformer.
- `src/backup/`: The local-authoritative backup engine.
- `src/ui/`: NoteFlare's UI, including the main view, status bar, and settings modals.

## Pull Request Guidelines

1. **Fork the repository** and create your branch from `main`.
2. **Make your changes** and ensure they build successfully (`npm run build`).
3. **Keep changes focused.** Try to address a single issue or feature per PR.
4. **Do not hand-edit `main.js`.** It is a bundled output file. Edit the `.ts` files in the `src/` directory.
5. Submit your PR with a clear description of the problem you are solving and the changes you've made.

We review pull requests on a regular basis. Thank you for making NoteFlare better!
