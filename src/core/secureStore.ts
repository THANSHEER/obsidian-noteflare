/**
 * Token storage backed by Electron `safeStorage`, which encrypts/decrypts with a
 * key held in the OS keychain (macOS Keychain / Windows DPAPI / Linux libsecret).
 *
 * We persist ONLY the ciphertext (base64) in `data.json`; the plaintext token
 * lives in memory at runtime and is never written to disk. This keeps the user's
 * GitHub/Cloudflare tokens out of the plaintext settings file.
 */

interface SafeStorageBuffer extends Uint8Array {
  toString(encoding?: string): string;
}

interface BufferStaticLike {
  from(str: string, encoding?: string): Uint8Array;
}

interface SafeStorage {
  isEncryptionAvailable(): boolean;
  encryptString(plain: string): SafeStorageBuffer;
  decryptString(buf: Uint8Array): string;
}

function resolveSafeStorage(): SafeStorage | null {
  try {
    // Obsidian's desktop renderer has nodeIntegration, so `require('electron')` works.
    // Newer Electron exposes `safeStorage` directly; older versions only via the
    // deprecated `remote` module — try both, fall back to null if neither.
    const req = (typeof require === 'function' ? (require as unknown as (id: string) => unknown) : null);
    if (!req) return null;
    const electron = req('electron') as {
      safeStorage?: SafeStorage;
      remote?: { safeStorage?: SafeStorage };
    } | null;
    if (!electron) return null;
    return electron.safeStorage ?? electron.remote?.safeStorage ?? null;
  } catch {
    return null;
  }
}

const safeStorage = resolveSafeStorage();

/** True when the OS-backed encryption is usable (e.g. a keyring is present). */
export function isSecureStorageAvailable(): boolean {
  try {
    return !!safeStorage && safeStorage.isEncryptionAvailable();
  } catch {
    return false;
  }
}

/** Encrypt a token to a base64 string. Empty in → empty out. Throws if unavailable. */
export function encryptSecret(plain: string): string {
  if (!plain) return '';
  if (!isSecureStorageAvailable()) {
    throw new Error('Secure storage is unavailable on this system.');
  }
  const encrypted: SafeStorageBuffer = safeStorage!.encryptString(plain);
  return encrypted.toString('base64');
}

/** Decrypt a base64 ciphertext back to the token. Returns '' on any failure. */
export function decryptSecret(b64: string): string {
  if (!b64) return '';
  if (!isSecureStorageAvailable()) return '';
  try {
    const nodeBuffer = (typeof window !== 'undefined' ? (window as unknown as { Buffer?: BufferStaticLike }).Buffer : undefined);
    if (!nodeBuffer) return '';
    const buf: Uint8Array = nodeBuffer.from(b64, 'base64');
    return safeStorage!.decryptString(buf);
  } catch {
    return '';
  }
}
