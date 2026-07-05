import { parseYaml, stringifyYaml } from 'obsidian';
import { normalizeFrontmatter } from './contentValidator';

// A frontmatter block at the very start of the content.
const LEADING_BLOCK_RE = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;

/**
 * Prepares a vault note's text for upload. mdgarden resolves Obsidian wikilinks
 * and embeds itself, so we no longer rewrite links here — we only:
 *   1. guarantee a valid leading frontmatter block (defensive; mdgarden tolerates
 *      bad frontmatter, but a clean block gives a reliable title), and
 *   2. drop `private`/`draft` keys so the note publishes (mdgarden skips notes
 *      that still carry those flags).
 * Only the uploaded copy is changed — the vault note is never touched.
 */
export class Transformer {
  transform(content: string, filePath: string, title?: string): string {
    const noteTitle = title ?? filePath.split('/').pop()?.replace(/\.md$/, '') ?? 'Untitled';
    let result = normalizeFrontmatter(content, noteTitle);
    result = this.stripPrivateFrontmatter(result);
    return result;
  }

  /**
   * Remove `private`/`draft` keys from the leading frontmatter block. Parses the
   * block with Obsidian's YAML engine (robust against quoting/nesting) rather
   * than splitting lines. Assumes a valid leading block (guaranteed by
   * `normalizeFrontmatter` upstream); leaves content untouched otherwise.
   */
  private stripPrivateFrontmatter(content: string): string {
    const m = content.match(LEADING_BLOCK_RE);
    if (!m) return content;

    let data: Record<string, unknown>;
    try {
      data = (parseYaml(m[1]) ?? {}) as Record<string, unknown>;
    } catch {
      return content;
    }
    delete data.private;
    delete data.draft;

    const keys = Object.keys(data);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- Obsidian stringifyYaml typings may be incomplete
    const yaml = keys.length ? stringifyYaml(data).trimEnd() : '';
    const block = yaml ? `---\n${yaml}\n---` : `---\n---`;
    const trailing = m[2] ? '\n' : '';
    return content.slice(0, m.index) + block + trailing + content.slice((m.index ?? 0) + m[0].length);
  }
}
