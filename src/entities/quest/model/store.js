import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib';
import { getCountry } from '@/shared/config';

/* Quest progress. Survives a reload, like "My visit".
   view: null — the quest list; { questId, screen: 'start' | 'play' }.
   session: { mode: 'ru' | 'native', step, finished, results: { [taskId]: result } }
   result: { status: 'wrong' | 'correct' | 'revealed' | 'done', attempts, firstTry, text } */
export const useQuestStore = create(
  persist(
    (set) => ({
      country: null, // id from shared/config/countries.js or OTHER_COUNTRY
      nativeLang: null,
      mode: null, // 'ru' | 'native' — in which language quests are played
      view: null,
      sessions: {},

      setNativeLang: (nativeLang) => set({ nativeLang }),
      setMode: (mode) => set({ mode }),
      /* A listed country brings its language; "other" keeps the language the student picks. */
      setCountry: (country) => set((s) => ({ country, nativeLang: getCountry(country)?.lang ?? s.nativeLang })),
      openStart: (questId) => set({ view: { questId, screen: 'start' } }),
      resume: (questId) => set({ view: { questId, screen: 'play' } }),
      closeView: () => set({ view: null }),
      /* As for a new student: no progress, no country, no language. */
      resetAll: () => set({ country: null, nativeLang: null, mode: null, view: null, sessions: {} }),
      begin: (questId, mode) =>
        set((s) => ({
          view: { questId, screen: 'play' },
          sessions: { ...s.sessions, [questId]: { mode, step: 0, finished: false, results: {} } },
        })),
      updateResult: (questId, taskId, patch) =>
        set((s) => {
          const session = s.sessions[questId];
          const result = { attempts: 0, ...session.results[taskId], ...patch };
          return { sessions: { ...s.sessions, [questId]: { ...session, results: { ...session.results, [taskId]: result } } } };
        }),
      goNext: (questId, taskCount) =>
        set((s) => {
          const session = s.sessions[questId];
          const step = session.step + 1;
          return {
            sessions: {
              ...s.sessions,
              [questId]: { ...session, step: Math.min(step, taskCount - 1), finished: step >= taskCount },
            },
          };
        }),
    }),
    {
      name: 'pushkin-quests-v1',
      storage: safeStorage,
      partialize: ({ country, nativeLang, mode, view, sessions }) => ({ country, nativeLang, mode, view, sessions }),
    },
  ),
);
