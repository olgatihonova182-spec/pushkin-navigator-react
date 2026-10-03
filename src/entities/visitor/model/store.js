import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib';

/* The visitor: where they are, what they want to see, what they have seen, how to guide them.
   All of it survives a reload. */
export const useVisitorStore = create(
  persist(
    (set, get) => ({
      me: null, // hall id where the visitor marked themselves
      saved: [], // artwork ids "want to see"
      seen: [], // artwork ids marked as seen
      noStairs: false,

      setMe: (me) => set({ me }),
      setNoStairs: (noStairs) => set({ noStairs }),
      /* Returns true if the artwork was added. */
      toggleSaved: (id) => {
        const added = !get().saved.includes(id);
        set((s) => ({ saved: added ? [...s.saved, id] : s.saved.filter((x) => x !== id) }));
        return added;
      },
      toggleSeen: (id) => {
        const added = !get().seen.includes(id);
        set((s) => ({ seen: added ? [...s.seen, id] : s.seen.filter((x) => x !== id) }));
        return added;
      },
      /* Drop ids that are no longer in the reference data. */
      sanitize: ({ isHall, isArtwork }) =>
        set((s) => ({
          me: s.me && isHall(s.me) ? s.me : null,
          saved: s.saved.filter(isArtwork),
          seen: s.seen.filter(isArtwork),
        })),
    }),
    {
      name: 'pushkin-navigator-v1',
      storage: safeStorage,
      partialize: ({ me, saved, seen, noStairs }) => ({ me, saved, seen, noStairs }),
    },
  ),
);
