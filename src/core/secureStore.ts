/**
 * Token storage backed by Electron `safeStorage`, which encrypts/decrypts with a
 * key held in the OS keychain (macOS Keychain / Windows DPAPI / Linux libsecret).
 *
 * We persist ONLY the ciphertext (base64) in `data.json`; the plaintext token
 * lives in memory at runtime and is never written to disk. This keeps the user's
 * GitHub/Cloudflare tokens out of the plaintext settings file.
 */

interface SafeStorage {
  isEncryptionAvailable(): boolean;
  encryptString(plain: string): Buffer;
  decryptString(buf: Buffer): string;
}

function resolveSafeStorage(): SafeStorage | null {
  try {
    // Obsidian's renderer has nodeIntegration, so `require('electron')` works.
    // Newer Electron exposes `safeStorage` directly; older versions only via the
    // deprecated `remote` module — try both, fall back to null if neither.
    // Obsidian plugin execution environment provides require('electron').
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-call -- required to access electron safeStorage in Obsidian
    const electron = require('electron') as unknown as {
      safeStorage?: SafeStorage;
      remote?: { safeStorage?: SafeStorage };
    };
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return -- SafeStorage typings are incomplete
  return safeStorage!.encryptString(plain).toString('base64');
}

/** Decrypt a base64 ciphertext back to the token. Returns '' on any failure. */
export function decryptSecret(b64: string): string {
  if (!b64) return '';
  if (!isSecureStorageAvailable()) return '';
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access -- Buffer typings may be missing in Obsidian context
    return safeStorage!.decryptString(Buffer.from(b64, 'base64'));
  } catch {
    return '';
  }
}
