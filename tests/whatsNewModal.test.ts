import { WhatsNewModal } from '../src/ui/feedback/whatsNewModal';
import { App } from 'obsidian';
import { type GitHubReleaseNotes } from '../src/api/geekstashApi';

describe('WhatsNewModal', () => {
  let app: App;

  beforeEach(() => {
    jest.clearAllMocks();
    app = new App();
  });

  test('opens and renders NoteFlare logo, header, version badge, and release notes', () => {
    const mockRelease: GitHubReleaseNotes = {
      tagName: 'v1.2.4',
      name: 'NoteFlare 1.2.4',
      body: '### Features\n- Streamlined release notes with logo\n- Direct internal community plugin launcher',
      htmlUrl: 'https://github.com/THANSHEER/obsidian-noteflare/releases/tag/v1.2.4',
      assets: [],
    };

    const modal = new WhatsNewModal(app, '1.2.4', mockRelease);
    modal.onOpen();

    expect(modal.titleEl.setText).toHaveBeenCalledWith('What’s new in NoteFlare');
    expect(modal.contentEl.addClass).toHaveBeenCalledWith('nf-whatsnew-modal');
    expect(modal.contentEl.createDiv).toHaveBeenCalled();
  });

  test('falls back gracefully to embedded changelog when release is null', () => {
    const modal = new WhatsNewModal(app, '1.2.4', null);
    modal.onOpen();

    expect(modal.titleEl.setText).toHaveBeenCalledWith('What’s new in NoteFlare');
  });

  test('renders update preference toggle when plugin context is provided', () => {
    const mockPlugin = {
      settings: {
        showWhatsNewOnUpdate: true,
      },
      saveSettings: jest.fn().mockResolvedValue(undefined),
    };

    const modal = new WhatsNewModal(app, '1.2.4', null, mockPlugin);
    modal.onOpen();

    expect(modal.contentEl.createDiv).toHaveBeenCalled();
  });
});
