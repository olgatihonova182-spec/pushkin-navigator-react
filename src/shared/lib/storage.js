/* The only module that knows about localStorage.
   If storage is unavailable (private window, blocked), the app works without it. */
export const safeStorage = {
  getItem(name) {
    try {
      const raw = localStorage.getItem(name);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  setItem(name, value) {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {
      /* no persistence */
    }
  },
  removeItem(name) {
    try {
      localStorage.removeItem(name);
    } catch {
      /* no persistence */
    }
  },
};
