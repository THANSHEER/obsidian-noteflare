import { VaultRegistry } from '../src/core/vaultRegistry';
import { SiteProfile } from '../src/core/types';

describe('VaultRegistry', () => {
  let mockApp: any;
  let files: Record<string, string>;
  let dirs: Set<string>;

  beforeEach(() => {
    files = {};
    dirs = new Set();
    
    mockApp = {
      vault: {
        adapter: {
          read: jest.fn().mockImplementation(async (path: string) => {
            if (path in files) return files[path];
            throw new Error(`File ${path} not found`);
          }),
          exists: jest.fn().mockImplementation(async (path: string) => {
            return path in files || dirs.has(path);
          }),
          write: jest.fn().mockImplementation(async (path: string, data: string) => {
            files[path] = data;
          }),
          mkdir: jest.fn().mockImplementation(async (path: string) => {
            dirs.add(path);
          })
        }
      }
    };
  });

  describe('load', () => {
    it('returns an empty registry if the file does not exist', async () => {
      const registry = await VaultRegistry.load(mockApp);
      expect(registry).toEqual({ version: 1, entries: [] });
    });

    it('returns parsed registry if file is valid', async () => {
      files['.noteflare/registry.json'] = JSON.stringify({
        version: 1,
        entries: [{ id: 'site-1', name: 'Test Site' }]
      });

      const registry = await VaultRegistry.load(mockApp);
      expect(registry.entries.length).toBe(1);
      expect(registry.entries[0].name).toBe('Test Site');
    });

    it('returns empty registry if file is corrupted/invalid JSON', async () => {
      files['.noteflare/registry.json'] = '{ invalid-json ';
      const registry = await VaultRegistry.load(mockApp);
      expect(registry).toEqual({ version: 1, entries: [] });
    });
  });

  describe('save', () => {
    it('creates .noteflare directory if it does not exist before writing', async () => {
      await VaultRegistry.save(mockApp, { version: 1, entries: [] });
      
      expect(mockApp.vault.adapter.mkdir).toHaveBeenCalledWith('.noteflare');
      expect(mockApp.vault.adapter.write).toHaveBeenCalledWith(
        '.noteflare/registry.json',
        expect.any(String)
      );
    });

    it('does not create .noteflare directory if it already exists', async () => {
      dirs.add('.noteflare');
      await VaultRegistry.save(mockApp, { version: 1, entries: [] });
      
      expect(mockApp.vault.adapter.mkdir).not.toHaveBeenCalled();
      expect(mockApp.vault.adapter.write).toHaveBeenCalled();
    });
    
    it('handles write errors gracefully without crashing', async () => {
      mockApp.vault.adapter.write.mockRejectedValueOnce(new Error('Write failed'));
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
      
      await expect(VaultRegistry.save(mockApp, { version: 1, entries: [] })).resolves.not.toThrow();
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'NoteFlare: could not write vault registry:',
        expect.any(Error)
      );
      consoleSpy.mockRestore();
    });
  });

  describe('upsert', () => {
    const mockSite = {
      id: 'site-1',
      name: 'Site 1',
      githubRepo: 'repo',
      githubBranch: 'main',
      cloudflareProject: 'cf-proj',
      siteUrl: 'https://site1.com',
      hostingProvider: 'cloudflare',
      lastPublished: 'timestamp'
    } as SiteProfile;

    it('adds a new site to an empty registry', async () => {
      await VaultRegistry.upsert(mockApp, mockSite, 'master-repo', 'testowner', false);
      
      const savedData = JSON.parse(files['.noteflare/registry.json']);
      expect(savedData.entries.length).toBe(1);
      expect(savedData.entries[0]).toMatchObject({
        id: 'site-1',
        name: 'Site 1',
        masterRepository: 'master-repo',
        githubOwner: 'testowner',
        cloudflareProject: 'cf-proj',
        masterRepositoryPrivate: false
      });
    });

    it('updates an existing site instead of duplicating', async () => {
      files['.noteflare/registry.json'] = JSON.stringify({
        version: 1,
        entries: [{ id: 'site-1', name: 'Old Name' }]
      });

      await VaultRegistry.upsert(mockApp, mockSite, 'master-repo', 'testowner', false);
      
      const savedData = JSON.parse(files['.noteflare/registry.json']);
      expect(savedData.entries.length).toBe(1);
      expect(savedData.entries[0].name).toBe('Site 1'); // Updated
    });
  });

  describe('remove', () => {
    it('removes the specified site from the registry', async () => {
      files['.noteflare/registry.json'] = JSON.stringify({
        version: 1,
        entries: [{ id: 'site-1' }, { id: 'site-2' }]
      });

      await VaultRegistry.remove(mockApp, 'site-1');
      
      const savedData = JSON.parse(files['.noteflare/registry.json']);
      expect(savedData.entries.length).toBe(1);
      expect(savedData.entries[0].id).toBe('site-2');
    });
  });

  describe('buildRestoredProfiles', () => {
    it('filters out entries that already exist in the provided Set', () => {
      const entries = [
        { id: 'site-1' },
        { id: 'site-2' },
        { id: 'site-3' }
      ] as any[];
      
      const existing = new Set(['site-2']);
      
      const restored = VaultRegistry.buildRestoredProfiles(entries, existing);
      expect(restored.length).toBe(2);
      expect(restored.map(r => r.id)).toEqual(['site-1', 'site-3']);
    });
  });
});
