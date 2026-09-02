import { renderSupportCard } from '../src/ui/feedback/supportCard';
import { getChangelogForVersion } from '../src/core/changelogData';
import { App } from './mocks/obsidian';

describe('renderSupportCard', () => {
  it('should render pill buttons, divider, and feedback links', () => {
    const createdElements: Array<{ tag: string; options?: any }> = [];
    const divMock: any = {
      createDiv: jest.fn((options?: any) => {
        createdElements.push({ tag: 'div', options });
        return divMock;
      }),
      createEl: jest.fn((tag: string, options?: any) => {
        createdElements.push({ tag, options });
        return {
          createSpan: jest.fn((spanOptions?: any) => {
            createdElements.push({ tag: 'span', options: spanOptions });
            return {};
          }),
          addEventListener: jest.fn(),
        };
      }),
      createSpan: jest.fn((options?: any) => {
        createdElements.push({ tag: 'span', options });
        return {};
      }),
    };

    const container = divMock as HTMLElement;
    const app = new App() as any;
    const onOpenChangelog = jest.fn();

    renderSupportCard(container, app, { onOpenChangelog });

    expect(divMock.createDiv).toHaveBeenCalled();
    expect(divMock.createEl).toHaveBeenCalled();

    const tags = createdElements.map(e => e.tag);
    expect(tags).toContain('div');
    expect(tags).toContain('a');
    expect(tags).toContain('span');
  });
});

describe('getChangelogForVersion', () => {
  it('should return markdown notes for known versions', () => {
    const v122 = getChangelogForVersion('1.2.2');
    expect(v122).toContain('Obsidian 1.13+ Support');

    const withPrefix = getChangelogForVersion('v1.2.1');
    expect(withPrefix).toContain('Security & Compliance');
  });

  it('should return a fallback string for unknown versions', () => {
    const unknown = getChangelogForVersion('99.99.99');
    expect(unknown.length).toBeGreaterThan(0);
  });
});
