/**
 * Shared UI helpers for the settings wizard and manage panel.
 * Pure functions with no plugin dependency — passed as callbacks
 * so each step file can call busy/idle/error without coupling to the tab class.
 */
import { ButtonComponent } from 'obsidian';

/** Append a hidden error paragraph to `container` and return it. */
export function createErrorEl(container: HTMLElement): HTMLElement {
  const el = container.createEl('p', { cls: 'setting-item-description' });
  el.setCssStyles({ color: 'var(--text-error)' });
  el.hide();
  return el;
}

export function showError(el: HTMLElement, msg: string): void {
  el.setText(msg);
  el.show();
}

export function hideError(el: HTMLElement): void {
  el.hide();
}

export function busy(btn: ButtonComponent, label: string): void {
  btn.setDisabled(true).setButtonText(label);
}

export function idle(btn: ButtonComponent, label: string): void {
  btn.setDisabled(false).setButtonText(label);
}
