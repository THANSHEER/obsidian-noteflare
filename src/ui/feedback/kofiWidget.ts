import {
  GITHUB_REPO_URL,
  GITHUB_STAR_BUTTON_LABEL,
  KOFI_BUTTON_COLOR,
  KOFI_BUTTON_LABEL,
  KOFI_URL,
} from '../../core/constants';

/**
 * Mount a Ko-fi support button into `container`.
 * Uses native Obsidian DOM helpers (`createEl`) and opens the link safely
 * without remote script injection, createElement, or unsafe innerHTML assignment.
 */
export function mountKofiWidget(container: HTMLElement): void {
  container.empty();
  const link = container.createEl('a', {
    cls: 'nf-kofi-button',
    text: `☕ ${KOFI_BUTTON_LABEL}`,
    href: KOFI_URL,
    attr: {
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': KOFI_BUTTON_LABEL,
    },
  });
  link.setCssStyles({
    backgroundColor: KOFI_BUTTON_COLOR,
    color: '#ffffff',
  });
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(KOFI_URL, '_blank');
  });
}

/**
 * Mount a GitHub Star button into `container`.
 */
export function mountGitHubStarWidget(container: HTMLElement): void {
  container.empty();
  const link = container.createEl('a', {
    cls: 'nf-github-star-button',
    text: `⭐ ${GITHUB_STAR_BUTTON_LABEL}`,
    href: GITHUB_REPO_URL,
    attr: {
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': GITHUB_STAR_BUTTON_LABEL,
    },
  });
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(GITHUB_REPO_URL, '_blank');
  });
}

