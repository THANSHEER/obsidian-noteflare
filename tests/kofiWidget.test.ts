import { mountGitHubStarWidget, mountKofiWidget } from '../src/ui/feedback/kofiWidget';
import {
  GITHUB_REPO_URL,
  GITHUB_STAR_BUTTON_LABEL,
  KOFI_BUTTON_LABEL,
  KOFI_URL,
} from '../src/core/constants';

describe('mountKofiWidget and mountGitHubStarWidget', () => {
  it('should render a safe anchor button without innerHTML or script injection', () => {
    const createdElements: Array<{ tag: string; options: any }> = [];
    const container = {
      empty: jest.fn(),
      createEl: jest.fn((tag: string, options: any) => {
        createdElements.push({ tag, options });
        return {
          setCssStyles: jest.fn(),
          addEventListener: jest.fn(),
        };
      }),
    } as unknown as HTMLElement;

    mountKofiWidget(container);

    expect(container.empty).toHaveBeenCalledTimes(1);
    expect(container.createEl).toHaveBeenCalledTimes(1);
    expect(createdElements[0]?.tag).toBe('a');
    expect(createdElements[0]?.options.cls).toBe('nf-kofi-button');
    expect(createdElements[0]?.options.text).toContain(KOFI_BUTTON_LABEL);
    expect(createdElements[0]?.options.href).toBe(KOFI_URL);
    expect(createdElements[0]?.options.attr?.target).toBe('_blank');
    expect(createdElements[0]?.options.attr?.rel).toBe('noopener noreferrer');
  });

  it('should render a safe GitHub star anchor button', () => {
    const createdElements: Array<{ tag: string; options: any }> = [];
    const container = {
      empty: jest.fn(),
      createEl: jest.fn((tag: string, options: any) => {
        createdElements.push({ tag, options });
        return {
          setCssStyles: jest.fn(),
          addEventListener: jest.fn(),
        };
      }),
    } as unknown as HTMLElement;

    mountGitHubStarWidget(container);

    expect(container.empty).toHaveBeenCalledTimes(1);
    expect(container.createEl).toHaveBeenCalledTimes(1);
    expect(createdElements[0]?.tag).toBe('a');
    expect(createdElements[0]?.options.cls).toBe('nf-github-star-button');
    expect(createdElements[0]?.options.text).toContain(GITHUB_STAR_BUTTON_LABEL);
    expect(createdElements[0]?.options.href).toBe(GITHUB_REPO_URL);
    expect(createdElements[0]?.options.attr?.target).toBe('_blank');
    expect(createdElements[0]?.options.attr?.rel).toBe('noopener noreferrer');
  });
});
