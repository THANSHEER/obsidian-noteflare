export class StatusBar {
  constructor(private el: HTMLElement) {}

  setIdle(): void {
    this.set('NoteFlare: Not set up');
    this.el.title = '';
  }

  setUnpublished(): void {
    this.set('NoteFlare: Unpublished');
    this.el.title = '';
  }

  setPublishing(n: number, total: number): void {
    this.set(`NoteFlare: Uploading ${n}/${total}...`);
  }

  setLive(noteCount: number, url: string): void {
    this.set(`NoteFlare: Live — ${noteCount} notes ↗`);
    this.el.title = url ? `https://${url}` : '';
  }

  setError(msg: string): void {
    this.set(`NoteFlare: Error — ${msg}`);
  }

  setRateLimited(secsLeft: number): void {
    this.set(`NoteFlare: Rate limited — ${secsLeft}s`);
  }

  setMessage(msg: string): void {
    this.set(msg);
  }

  private set(text: string): void {
    this.el.textContent = text;
  }
}
