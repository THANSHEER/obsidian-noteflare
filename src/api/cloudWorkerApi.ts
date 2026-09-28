import { requestUrl } from 'obsidian';

export interface CloudWorkerPublishPayload {
  siteId: string;
  siteName: string;
  authorName?: string;
  sidebarTitle?: string;
  siteDescription?: string;
  files: Array<{
    path: string;
    content: string; // Base64 or utf8 string
    isBase64?: boolean;
  }>;
}

export interface CloudWorkerPublishResponse {
  success: boolean;
  siteUrl: string;
  noteCount: number;
  uploaded: number;
  errors?: string[];
}

export const DEFAULT_WORKER_ENDPOINT = 'https://api.geekstash.dev/noteflare';

export class CloudWorkerApi {
  constructor(
    private token: string,
    private endpoint: string = DEFAULT_WORKER_ENDPOINT,
  ) {}

  private get headers(): Record<string, string> {
    return {
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  async publish(payload: CloudWorkerPublishPayload): Promise<CloudWorkerPublishResponse> {
    try {
      const resp = await requestUrl({
        url: `${this.endpoint}/publish`,
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload),
        throw: false,
      });

      if (resp.status >= 400) {
        const errorData = (resp.json ?? {}) as { message?: string; errors?: string[] };
        const msg = errorData.message || errorData.errors?.[0] || `Worker API failed with status ${resp.status}`;
        throw new Error(msg);
      }

      const result = (resp.json ?? {}) as CloudWorkerPublishResponse;
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error connecting to Cloud Worker';
      throw new Error(`Cloud Worker Build failed: ${msg}`);
    }
  }

  async unpublish(siteId: string): Promise<void> {
    try {
      const resp = await requestUrl({
        url: `${this.endpoint}/unpublish`,
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({ siteId }),
        throw: false,
      });

      if (resp.status >= 400) {
        const errorData = (resp.json ?? {}) as { message?: string };
        throw new Error(errorData.message || `Unpublish failed with status ${resp.status}`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to unpublish site';
      throw new Error(`Cloud Worker Unpublish error: ${msg}`);
    }
  }
}
