import {
  KOFI_BUTTON_COLOR,
  KOFI_BUTTON_LABEL,
  KOFI_URL,
  KOFI_WIDGET_SCRIPT,
} from '../../core/constants';

interface KofiWidget2 {
  init(text: string, color: string, id: string): void;
  getHTML(): string;
  draw(): void;
}

declare global {
  interface Window {
    kofiwidget2?: KofiWidget2;
  }
}

let loading: Promise<KofiWidget2> | null = null;

function loadKofiWidget(): Promise<KofiWidget2> {
  if (window.kofiwidget2) return Promise.resolve(window.kofiwidget2);
  if (loading) return loading;

  loading = new Promise<KofiWidget2>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${KOFI_WIDGET_SCRIPT}"]`,
    );
    if (existing) {
      if (window.kofiwidget2) {
        resolve(window.kofiwidget2);
        return;
      }
      existing.addEventListener('load', () => {
        if (window.kofiwidget2) resolve(window.kofiwidget2);
        else reject(new Error('Ko-fi widget failed to load.'));
      });
      existing.addEventListener('error', () =>
        reject(new Error('Ko-fi widget failed to load.')),
      );
      return;
    }

    const script = document.createElement('script');
    script.src = KOFI_WIDGET_SCRIPT;
    script.async = true;
    script.onload = () => {
      if (window.kofiwidget2) resolve(window.kofiwidget2);
      else reject(new Error('Ko-fi widget failed to load.'));
    };
    script.onerror = () => reject(new Error('Ko-fi widget failed to load.'));
    document.head.appendChild(script);
  });

  return loading;
}

/**
 * Mount the official Ko-fi Widget_2 into `container`.
 * Uses `getHTML()` instead of `draw()` — `draw()` calls `document.writeln`
 * and would wipe the Obsidian window.
 */
export async function mountKofiWidget(container: HTMLElement): Promise<void> {
  try {
    const widget = await loadKofiWidget();
    // Page id is the last path segment of KOFI_URL (P0R02009G7).
    const id = KOFI_URL.replace(/\/$/, '').split('/').pop() ?? 'P0R02009G7';
    widget.init(KOFI_BUTTON_LABEL, KOFI_BUTTON_COLOR, id);
    container.empty();
    // Official widget markup (style + button). Safe: static HTML from Ko-fi CDN.
    container.innerHTML = widget.getHTML();
  } catch {
    // Fallback if the CDN script is blocked.
    container.empty();
    const link = container.createEl('a', {
      cls: 'nf-kofi-button',
      text: KOFI_BUTTON_LABEL,
      href: KOFI_URL,
      attr: { target: '_blank', rel: 'noopener' },
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
}
