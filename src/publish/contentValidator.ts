import { parseYaml } from 'obsidian';

/**
 * Pre-publish frontmatter check + repair. mdgarden parses YAML frontmatter with
 * the same js-yaml engine Obsidian exposes as `parseYaml`, so we can catch the
 * exact failures here — before anything reaches Cloudflare.
 *
 * The recurring breaker: a note that starts (after a blank line) with a stray
 * `---` horizontal rule and no closing `---`. mdgarden treats it as a frontmatter
 * opener, never finds the close, and tries to YAML-parse the whole body →
 * "end of the stream or a document separator is expected". The fix is to ensure
 * every published note BEGINS with a valid frontmatter block; the stray `---`
 * then degrades to an ordinary body horizontal-rule.
 */

export type FrontmatterStatus = 'clean' | 'fixed';

export interface FrontmatterInspection {
  status: FrontmatterStatus;
  reason?: string;
}

// A frontmatter block at the very start: `---` line, body, closing `---` line.
const LEADING_BLOCK_RE = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(\r?\n|$)/;

/** True only when the content starts with a parseable `---…---` block. */
function hasValidLeadingFrontmatter(raw: string): boolean {
  const s = raw.replace(/^\ufeff/, '');
  const m = s.match(LEADING_BLOCK_RE);
  if (!m) return false;
  try {
    parseYaml(m[1]);
    return true;
  } catch {
    return false;
  }
}

/** Whether the content *looks* like it opens with frontmatter (latches mdgarden). */
function looksLikeFrontmatterOpener(raw: string): boolean {
  const stripped = raw.replace(/^\ufeff/, '').replace(/^[ \t\r\n]+/, '');
  return stripped.startsWith('---');
}

/**
 * Classify a note's frontmatter without modifying it. `clean` = safe to publish
 * as-is; `fixed` = would break mdgarden and will be auto-repaired on publish.
 */
export function inspectFrontmatter(raw: string): FrontmatterInspection {
  if (hasValidLeadingFrontmatter(raw)) return { status: 'clean' };
  if (looksLikeFrontmatterOpener(raw)) {
    return { status: 'fixed', reason: 'stray or unparseable “---” at the top — would break the mdgarden build' };
  }
  // No leading frontmatter and no risky opener → nothing to do.
  return { status: 'clean' };
}

/**
 * Return content that is guaranteed to begin with a valid frontmatter block.
 * If the note already does, it's returned unchanged; otherwise a minimal block
 * (`title`) is prepended so mdgarden parses cleanly. Only the published copy is
 * affected — never the user's vault note.
 */
export function normalizeFrontmatter(raw: string, title: string): string {
  if (hasValidLeadingFrontmatter(raw)) return raw;
  const safeTitle = title.replace(/"/g, "'");
  return `---\ntitle: "${safeTitle}"\n---\n\n${raw}`;
}
