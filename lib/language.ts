/**
 * Language persistence utilities for Hero component
 * Priority: URL param > localStorage > default 'en'
 */

export type Language = 'en' | 'zh';

const STORAGE_KEY = 'heroLang';

/**
 * Get language from URL search params
 */
function getLangFromURL(): Language | null {
  if (typeof window === 'undefined') return null;

  const params = new URLSearchParams(window.location.search);
  const lang = params.get('lang');

  if (lang === 'en' || lang === 'zh') {
    return lang;
  }

  return null;
}

/**
 * Get language from localStorage
 */
function getLangFromStorage(): Language | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'zh') {
      return stored;
    }
  } catch {
    // localStorage might be disabled
  }

  return null;
}

/**
 * Save language to localStorage
 */
export function saveLang(lang: Language): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage might be disabled
  }
}

/**
 * Update URL with lang param (without reload)
 */
export function updateURLLang(lang: Language): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);

  window.history.replaceState({}, '', url.toString());
}

/**
 * Get initial language based on priority:
 * 1. URL param (?lang=)
 * 2. localStorage
 * 3. Default 'en'
 */
export function getInitialLang(): Language {
  return getLangFromURL() ?? getLangFromStorage() ?? 'en';
}
