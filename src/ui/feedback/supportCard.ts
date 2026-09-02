import { App, setIcon } from 'obsidian';
import {
  GITHUB_ISSUES_URL,
  GITHUB_REPO_URL,
  GITHUB_SPONSORS_URL,
  KOFI_URL,
} from '../../core/constants';
import { featureRequestFormUrl } from '../../api/geekstashApi';
import { FeedbackModal } from './feedbackModal';

export interface SupportCardOptions {
  onOpenChangelog?: () => void;
}

/**
 * Renders the modern Support & Feedback card matching the design:
 * Top: Pill buttons for "Support the project", "GitHub Sponsors", and "Star on GitHub".
 * Divider: Subtle horizontal separator.
 * Bottom: Centered dot-separated links ("Give feedback", "Request a feature", "GitHub issues", "Changelog").
 */
export function renderSupportCard(
  container: HTMLElement,
  app: App,
  options?: SupportCardOptions,
): HTMLElement {
  const card = container.createDiv({ cls: 'nf-support-card' });

  // Top row: Pill buttons
  const pillsRow = card.createDiv({ cls: 'nf-support-pills' });

  // Ko-fi / Support the project pill
  const kofiBtn = pillsRow.createEl('a', {
    cls: 'nf-support-pill nf-support-pill-kofi',
    href: KOFI_URL,
    attr: { target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Support the project' },
  });
  const kofiIcon = kofiBtn.createSpan({ cls: 'nf-pill-icon nf-cup-icon' });
  setIcon(kofiIcon, 'coffee');
  kofiBtn.createSpan({ text: 'Support the project' });
  kofiBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(KOFI_URL, '_blank');
  });

  // GitHub Sponsors pill
  const sponsorBtn = pillsRow.createEl('a', {
    cls: 'nf-support-pill nf-support-pill-sponsor',
    href: GITHUB_SPONSORS_URL,
    attr: { target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'GitHub Sponsors' },
  });
  const sponsorIcon = sponsorBtn.createSpan({ cls: 'nf-pill-icon nf-heart-icon' });
  setIcon(sponsorIcon, 'heart');
  sponsorBtn.createSpan({ text: 'GitHub Sponsors' });
  sponsorBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(GITHUB_SPONSORS_URL, '_blank');
  });

  // Star on GitHub pill
  const starBtn = pillsRow.createEl('a', {
    cls: 'nf-support-pill nf-support-pill-star',
    href: GITHUB_REPO_URL,
    attr: { target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Star on GitHub' },
  });
  const starIcon = starBtn.createSpan({ cls: 'nf-pill-icon nf-star-icon' });
  setIcon(starIcon, 'star');
  starBtn.createSpan({ text: 'Star on GitHub' });
  starBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(GITHUB_REPO_URL, '_blank');
  });

  // Divider
  card.createDiv({ cls: 'nf-support-divider' });

  // Bottom row: Text links with dots
  const linksRow = card.createDiv({ cls: 'nf-support-links' });

  // 1. Give feedback
  const feedbackLink = linksRow.createEl('a', {
    cls: 'nf-support-link',
    text: 'Give feedback',
    href: '#',
    attr: { role: 'button' },
  });
  feedbackLink.addEventListener('click', (e) => {
    e.preventDefault();
    new FeedbackModal(app, 'general').open();
  });

  linksRow.createSpan({ cls: 'nf-dot-sep', text: '·' });

  // 2. Request a feature
  const featureLink = linksRow.createEl('a', {
    cls: 'nf-support-link',
    text: 'Request a feature',
    href: featureRequestFormUrl(),
    attr: { target: '_blank', rel: 'noopener noreferrer' },
  });
  featureLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(featureRequestFormUrl(), '_blank');
  });

  linksRow.createSpan({ cls: 'nf-dot-sep', text: '·' });

  // 3. GitHub issues
  const issuesLink = linksRow.createEl('a', {
    cls: 'nf-support-link',
    text: 'GitHub issues',
    href: GITHUB_ISSUES_URL,
    attr: { target: '_blank', rel: 'noopener noreferrer' },
  });
  issuesLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(GITHUB_ISSUES_URL, '_blank');
  });

  // 4. Optional Changelog link
  if (options?.onOpenChangelog) {
    linksRow.createSpan({ cls: 'nf-dot-sep', text: '·' });
    const changelogLink = linksRow.createEl('a', {
      cls: 'nf-support-link',
      text: 'View changelog',
      href: '#',
      attr: { role: 'button' },
    });
    changelogLink.addEventListener('click', (e) => {
      e.preventDefault();
      options.onOpenChangelog?.();
    });
  }

  return card;
}
