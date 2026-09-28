import { renderSupportCard } from '../src/ui/feedback/supportCard';
import { getChangelogForVersion } from '../src/core/changelogData';
import {
  openCommunityPlugin,
  MERMAID_FLOW_PLUGIN_ID,
  OMNICHAT_PLUGIN_ID,
} from '../src/ui/communityPluginOpener';
import { App } from './mocks/obsidian';

describe('renderSupportCard', () => {
  it('should render pill buttons, related plugins, divider, and feedback links', () => {
    const createdElements: Array<{ tag: string; options?: any }> = [];
    const makeElMock = (): any => ({
      createDiv: jest.fn((options?: any) => {
        createdElements.push({ tag: 'div', options });
        return makeElMock();
      }),
      createEl: jest.fn((tag: string, options?: any) => {
        createdElements.push({ tag, options });
        return makeElMock();
      }),
      createSpan: jest.fn((options?: any) => {
        createdElements.push({ tag: 'span', options });
        return makeElMock();
      }),
      addEventListener: jest.fn(),
    });

    const divMock = makeElMock();
    const container = divMock as HTMLElement;
    const app = new App() as any;
    const onOpenChangelog = jest.fn();

    renderSupportCard(container, app, { onOpenChangelog });

    expect(divMock.createDiv).toHaveBeenCalled();

    const tags = createdElements.map(e => e.tag);
    expect(tags).toContain('div');
    expect(tags).toContain('a');


    // Verify Mermaid Flow and OmniChat are rendered as obsidian:// protocol links
    const aElements = createdElements.filter(e => e.tag === 'a');
    const hrefs = aElements.map(e => e.options?.href);
    expect(hrefs).toContain(`obsidian://show-plugin?id=${MERMAID_FLOW_PLUGIN_ID}`);
    expect(hrefs).toContain(`obsidian://show-plugin?id=${OMNICHAT_PLUGIN_ID}`);
    expect(hrefs).toContain('https://ko-fi.com/P0R02009G7');
    expect(hrefs).not.toContain('https://github.com/sponsors/THANSHEER');

    // Verify official Ko-fi CDN image is used (kofi3.png — the real button)
    const imgElements = createdElements.filter(e => e.tag === 'img');
    const imgSrcs = imgElements.map(e => e.options?.attr?.src);
    expect(imgSrcs.some(src => src?.includes('kofi3.png'))).toBe(true);
  });
});




describe('openCommunityPlugin', () => {
  let mockWindowOpen: jest.Mock;

  beforeEach(() => {
    mockWindowOpen = jest.fn();
    (global as any).window = { open: mockWindowOpen };
  });

  afterEach(() => {
    delete (global as any).window;
    delete (global as any).document;
  });

  it('should use internalPlugins.getPluginById when available', () => {
    const mockOpenPluginPage = jest.fn();
    const app: any = {
      internalPlugins: {
        getPluginById: jest.fn().mockReturnValue({
          instance: {
            openPluginPage: mockOpenPluginPage,
          },
        }),
      },
    };

    openCommunityPlugin(app, MERMAID_FLOW_PLUGIN_ID);
    expect(mockOpenPluginPage).toHaveBeenCalledWith(MERMAID_FLOW_PLUGIN_ID);
    expect(mockWindowOpen).not.toHaveBeenCalled();
  });

  it('should use app.setting openTabById when internalPlugins is not available', () => {
    const mockOpenPluginPage = jest.fn();
    const app: any = {
      setting: {
        open: jest.fn(),
        openTabById: jest.fn().mockReturnValue({
          openPluginPage: mockOpenPluginPage,
        }),
      },
    };

    openCommunityPlugin(app, OMNICHAT_PLUGIN_ID);
    expect(app.setting.open).toHaveBeenCalled();
    expect(app.setting.openTabById).toHaveBeenCalledWith('community-plugins');
    expect(mockOpenPluginPage).toHaveBeenCalledWith(OMNICHAT_PLUGIN_ID);
    expect(mockWindowOpen).not.toHaveBeenCalled();
  });

  it('should fallback to obsidian:// protocol URI when internal APIs are absent', () => {
    const app: any = {};
    const clickMock = jest.fn();
    (global as any).document = {
      createElement: jest.fn().mockImplementation((tag: string) => {
        if (tag === 'a') {
          return {
            href: '',
            click: clickMock,
          };
        }
        return {};
      }),
    };

    openCommunityPlugin(app, MERMAID_FLOW_PLUGIN_ID);
    expect(clickMock).toHaveBeenCalled();
  });

  it('should fallback to window.open when element dispatch is not available', () => {
    const app: any = {};
    openCommunityPlugin(app, MERMAID_FLOW_PLUGIN_ID);
    expect(mockWindowOpen).toHaveBeenCalledWith(`obsidian://show-plugin?id=${MERMAID_FLOW_PLUGIN_ID}`);
  });
});

describe('getChangelogForVersion', () => {
  it('should return markdown notes for known versions', () => {
    const v122 = getChangelogForVersion('1.2.2');
    expect(v122).toContain('Obsidian 1.13+ Support');

    const withPrefix = getChangelogForVersion('v1.2.1');
    expect(withPrefix).toContain('Security');
  });

  it('should return a fallback string for unknown versions', () => {
    const unknown = getChangelogForVersion('99.99.99');
    expect(unknown.length).toBeGreaterThan(0);
  });
});
