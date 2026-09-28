import { App, setIcon } from 'obsidian';
import {
  GITHUB_ISSUES_URL,
  GITHUB_REPO_URL,
  KOFI_URL,
} from '../../core/constants';
import { featureRequestFormUrl } from '../../api/geekstashApi';
import { FeedbackModal } from './feedbackModal';
import {
  MERMAID_FLOW_PLUGIN_ID,
  OMNICHAT_PLUGIN_ID,
  openCommunityPlugin,
} from '../communityPluginOpener';


export interface SupportCardOptions {
  onOpenChangelog?: () => void;
}

/**
 * Renders the modern Support & Feedback card matching the design:
 * Top: Pill buttons for official Ko-fi support and "Star on GitHub".
 * Middle: Other Obsidian plugins ("Mermaid Flow", "OmniChat") opening inside Obsidian.
 * Bottom: Centered dot-separated links ("Give feedback", "Request a feature", "GitHub issues", "Changelog").
 */
export function renderSupportCard(
  container: HTMLElement,
  app: App,
  options?: SupportCardOptions,
): HTMLElement {
  const card = container.createDiv({ cls: 'nf-support-card' });

  // Top row: Pill buttons (Ko-fi sponsor and Star on GitHub)
  const pillsRow = card.createDiv({ cls: 'nf-support-pills' });

  // Ko-fi official branded button (real Ko-fi image from their CDN)
  const kofiLink = pillsRow.createEl('a', {
    cls: 'nf-support-pill-kofi-img',
    href: KOFI_URL,
    attr: { target: '_blank', rel: 'noopener noreferrer', 'aria-label': 'Support the project on Ko-fi' },
  });
  kofiLink.createEl('img', {
    attr: {
      src: 'https://storage.ko-fi.com/cdn/kofi3.png?v=6',
      alt: 'Buy Me a Coffee at ko-fi.com',
      height: '36',
      style: 'border:0px;height:36px;',
      border: '0',
    },
  });
  kofiLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.open(KOFI_URL, '_blank');
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

  // Other Obsidian plugins section
  const pluginsRow = card.createDiv({ cls: 'nf-support-plugins-row' });
  pluginsRow.createSpan({
    cls: 'nf-support-plugins-label',
    text: 'Other plugins by the author:',
  });

  const pluginsContainer = pluginsRow.createDiv({ cls: 'nf-support-plugins-list' });

  // 1. Mermaid Flow
  const mermaidPill = pluginsContainer.createEl('a', {
    cls: 'nf-plugin-pill',
    href: `obsidian://show-plugin?id=${MERMAID_FLOW_PLUGIN_ID}`,
    attr: { role: 'button', 'aria-label': 'Open in community plugins' },
  });
  const mermaidIcon = mermaidPill.createSpan({ cls: 'nf-pill-icon' });
  setIcon(mermaidIcon, 'workflow');
  mermaidPill.createSpan({ text: 'Mermaid Flow' });
  mermaidPill.addEventListener('click', (e) => {
    e.preventDefault();
    openCommunityPlugin(app, MERMAID_FLOW_PLUGIN_ID);
  });

  // 2. OmniChat
  const omniPill = pluginsContainer.createEl('a', {
    cls: 'nf-plugin-pill',
    href: `obsidian://show-plugin?id=${OMNICHAT_PLUGIN_ID}`,
    attr: { role: 'button', 'aria-label': 'Open in community plugins' },
  });
  const omniIcon = omniPill.createSpan({ cls: 'nf-pill-icon' });
  setIcon(omniIcon, 'bot');
  omniPill.createSpan({ text: 'OmniChat' });
  omniPill.addEventListener('click', (e) => {
    e.preventDefault();
    openCommunityPlugin(app, OMNICHAT_PLUGIN_ID);
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
