import * as fs from 'fs';
import * as path from 'path';

describe('Obsidian Community Plugin Checklist & Compliance', () => {
  const rootDir = path.resolve(__dirname, '..');
  const manifestPath = path.join(rootDir, 'manifest.json');
  const packagePath = path.join(rootDir, 'package.json');
  const versionsPath = path.join(rootDir, 'versions.json');
  const changelogPath = path.join(rootDir, 'CHANGELOG.md');
  const stylesPath = path.join(rootDir, 'styles.css');
  const srcDir = path.join(rootDir, 'src');

  it('manifest.json must contain all required fields and valid semver', () => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    expect(manifest.id).toBe('noteflare');
    expect(typeof manifest.name).toBe('string');
    expect(typeof manifest.version).toBe('string');
    expect(typeof manifest.minAppVersion).toBe('string');
    expect(typeof manifest.description).toBe('string');
    expect(typeof manifest.author).toBe('string');
    expect(manifest.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(manifest.minAppVersion).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('versions must be synchronized across manifest, package.json, versions.json, and CHANGELOG.md', () => {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const versions = JSON.parse(fs.readFileSync(versionsPath, 'utf8'));
    const changelog = fs.readFileSync(changelogPath, 'utf8');

    expect(pkg.version).toBe(manifest.version);
    expect(versions[manifest.version]).toBeDefined();
    expect(changelog).toContain(`## [${manifest.version}]`);
  });

  it('styles.css must not contain !important declarations', () => {
    const css = fs.readFileSync(stylesPath, 'utf8');
    const matches = css.split('\n').filter((line) => line.includes('!important'));
    expect(matches).toEqual([]);
  });

  it('source files must not contain innerHTML, outerHTML, or dynamic script elements', () => {
    const getTsFiles = (dir: string): string[] => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      const files: string[] = [];
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...getTsFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.ts')) {
          files.push(fullPath);
        }
      }
      return files;
    };

    const tsFiles = getTsFiles(srcDir);
    expect(tsFiles.length).toBeGreaterThan(0);

    for (const file of tsFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, idx) => {
        // Exclude comments
        const cleanLine = line.trim();
        if (cleanLine.startsWith('//') || cleanLine.startsWith('*')) return;

        expect({
          file: path.relative(rootDir, file),
          line: idx + 1,
          hasInnerHTML: /\.innerHTML\s*=/.test(line),
        }).toEqual({
          file: path.relative(rootDir, file),
          line: idx + 1,
          hasInnerHTML: false,
        });

        expect({
          file: path.relative(rootDir, file),
          line: idx + 1,
          hasOuterHTML: /\.outerHTML\s*=/.test(line),
        }).toEqual({
          file: path.relative(rootDir, file),
          line: idx + 1,
          hasOuterHTML: false,
        });

        expect({
          file: path.relative(rootDir, file),
          line: idx + 1,
          hasDynamicScript: /createElement\(['"`]script['"`]\)/.test(line),
        }).toEqual({
          file: path.relative(rootDir, file),
          line: idx + 1,
          hasDynamicScript: false,
        });
      });
    }
  });
});
