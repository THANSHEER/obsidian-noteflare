import { CloudWorkerApi, DEFAULT_WORKER_ENDPOINT } from '../src/api/cloudWorkerApi';

jest.mock('obsidian', () => ({
  requestUrl: jest.fn(),
}));

import { requestUrl } from 'obsidian';

describe('CloudWorkerApi', () => {
  const mockRequestUrl = requestUrl as jest.MockedFunction<typeof requestUrl>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should publish payload to the Cloud Worker API successfully', async () => {
    mockRequestUrl.mockResolvedValueOnce({
      status: 200,
      headers: {},
      arrayBuffer: new ArrayBuffer(0),
      text: '',
      json: {
        success: true,
        siteUrl: 'https://test-site.noteflare.workers.dev',
        noteCount: 5,
        uploaded: 5,
      },
    });

    const api = new CloudWorkerApi('test-token', DEFAULT_WORKER_ENDPOINT);
    const res = await api.publish({
      siteId: 'site-123',
      siteName: 'test-site',
      files: [{ path: 'test.md', content: '# Hello' }],
    });

    expect(res.success).toBe(true);
    expect(res.siteUrl).toBe('https://test-site.noteflare.workers.dev');
    expect(mockRequestUrl).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${DEFAULT_WORKER_ENDPOINT}/publish`,
        method: 'POST',
      }),
    );
  });

  it('should throw an error when Worker API returns status 400+', async () => {
    mockRequestUrl.mockResolvedValueOnce({
      status: 500,
      headers: {},
      arrayBuffer: new ArrayBuffer(0),
      text: '',
      json: { message: 'Internal Build Error' },
    });

    const api = new CloudWorkerApi('test-token');
    await expect(
      api.publish({
        siteId: 'site-123',
        siteName: 'test-site',
        files: [],
      }),
    ).rejects.toThrow('Cloud Worker Build failed: Internal Build Error');
  });

  it('should unpublish site via Worker API', async () => {
    mockRequestUrl.mockResolvedValueOnce({
      status: 200,
      headers: {},
      arrayBuffer: new ArrayBuffer(0),
      text: '',
      json: { success: true },
    });

    const api = new CloudWorkerApi('test-token');
    await api.unpublish('site-123');

    expect(mockRequestUrl).toHaveBeenCalledWith(
      expect.objectContaining({
        url: `${DEFAULT_WORKER_ENDPOINT}/unpublish`,
        method: 'POST',
      }),
    );
  });
});
