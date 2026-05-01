/**
 * Storage Utility — Safe wrappers for localStorage & sessionStorage
 * Handles errors gracefully if storage is unavailable (private browsing, quota exceeded, etc.)
 */

// ─────────────────────────────────────────────
// LOCAL STORAGE (Persistent across sessions)
// ─────────────────────────────────────────────

export const local = {
  get(key, fallback = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      console.warn(`localStorage: Failed to set key "${key}"`);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

// ─────────────────────────────────────────────
// SESSION STORAGE (Cleared when tab is closed)
// ─────────────────────────────────────────────

export const session = {
  get(key, fallback = null) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      console.warn(`sessionStorage: Failed to set key "${key}"`);
      return false;
    }
  },

  remove(key) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear() {
    try {
      sessionStorage.clear();
      return true;
    } catch {
      return false;
    }
  },
};

// ─────────────────────────────────────────────
// AUTH HELPERS (Used by authService)
// ─────────────────────────────────────────────

export const getAuthUser = () => local.get('user', null);
export const setAuthUser = (user) => local.set('user', user);
export const removeAuthUser = () => local.remove('user');

export const getTheme = () => local.get('theme', 'light');
export const setTheme = (theme) => local.set('theme', theme);

// ─────────────────────────────────────────────
// CLEAR ALL ON LOGOUT
// ─────────────────────────────────────────────

export const clearOnLogout = () => {
  local.remove('user');
  session.clear(); // also clear any multi-step form progress
};
