# Contributing to NoteFlare

Welcome to the NoteFlare project! This guide explains the project structure and how to contribute effectively.

## Project Structure

NoteFlare has been restructured into modular components to make it easier to navigate and maintain.

```
obsidian-noteflare/
├── main.ts                     # Orchestrator and entry point (Plugin subclass, events)
└── src/
    ├── api/                    # External service integrations
    │   ├── githubApi.ts        # GitHub REST & Git Data API client
    │   └── cloudflareApi.ts    # Cloudflare Pages API client
    │
    ├── backup/                 # Automatic vault mirror logic
    │   ├── backupEngine.ts     # The core diff/delta sync engine
    │   └── backupScheduler.ts  # Background scheduling and debounce logic
    │
    ├── core/                   # Shared types, settings, and constants
    │   ├── constants.ts        # Build versions, workflow strings, extensions
    │   ├── secureStore.ts      # Token encryption via Electron safeStorage
    │   ├── settings.ts         # Default configurations
    │   ├── types.ts            # TypeScript interfaces
    │   └── vaultRegistry.ts    # Orphaned site recovery across installs
    │
    ├── publish/                # The publishing pipeline
    │   ├── contentValidator.ts # Frontmatter inspection and auto-repair
    │   ├── fileCollector.ts    # Vault walker matching scope & globs
    │   ├── publisher.ts        # The main build manifest and commit orchestrator
    │   └── transformer.ts      # Markdown processing before upload
    │
    └── ui/                     # User interface components
        ├── noteflareView.ts    # The side panel / main view for publish controls
        ├── statusBar.ts        # Typed progress strings for the bottom bar
        │
        └── settings/           # Settings tab and modular UI components
            ├── settingsTab.ts  # The NoteFlareSettingsTab router class
            ├── settingsHelpers.ts # Shared UI helper functions
            │
            ├── wizard/         # The first-time setup flow
            │   ├── wizardRenderer.ts
            │   ├── stepGitHub.ts
            │   ├── stepHosting.ts
            │   ├── stepBackup.ts
            │   └── stepDone.ts
            │
            ├── manage/         # The active configuration panel
            │   ├── index.ts
            │   ├── connectionsSection.ts
            │   ├── backupSection.ts
            │   ├── sitesSection.ts
            │   └── restoreSection.ts
            │
            └── modals/         # All popups and dialogs
                ├── index.ts
                ├── addSiteModal.ts
                ├── removeSiteModal.ts
                ├── editSiteModal.ts
                ├── unpublishModals.ts
                ├── resetModal.ts
                ├── changeRepoModal.ts
                └── pathSuggestModal.ts
```

## Adding New Features

1. **Modals:** Create new modals in `src/ui/settings/modals/` and re-export them via `index.ts`.
2. **Settings UI:** If adding a new setting, incorporate it into the appropriate section inside `src/ui/settings/manage/`.
3. **Logic:** Keep UI files strictly focused on rendering. Use classes in `src/core/`, `src/publish/`, or `src/backup/` for business logic.

## Building and Testing

```bash
npm install            # Install dependencies
npm run dev            # Run esbuild watch (auto-rebuilds main.js on save)
npm run build          # Create production bundle
npm test               # Run Jest unit tests
```

Remember to reload the plugin in Obsidian to see your changes!
