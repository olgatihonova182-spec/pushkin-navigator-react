import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { safeStorage } from '@/shared/lib';
import { DEFAULT_PROFILE, difficulty } from './config';
import { pointsFor, earnedRewards } from '../lib/rules';

/* «Zachet at Professor Tsvetaev's» — its own state, separate from the other quests:
   their logic is not touched. Survives a reload (localStorage), like the rest of the app.

   screen: welcome | params | building | book | stop | more | postcard
   stops:  { [exhibitId]: { taskStartedAt, wrong: [optionIndex], answer: { firstTry, inTime, points },
                            voice: 'sent' | 'skipped', stamped } } */
const INITIAL = {
  uiLang: 'ru',
  open: false,
  screen: 'welcome',
  profile: DEFAULT_PROFILE,
  route: null,
  startedAt: null,
  finishedAt: null,
  viewing: 0,
  stops: {},
  saved: [],
  rewards: [],
  toast: null,
  phrase: '',
  error: null,
};

/* After every change: badges earned now but not before → remembered, the newest one is toasted. */
function withRewards(state) {
  const earned = earnedRewards(state);
  const fresh = earned.filter((id) => !state.rewards.includes(id));
  if (!fresh.length) return state;
  return { ...state, rewards: [...state.rewards, ...fresh], toast: fresh[fresh.length - 1] };
}

function patchStop(state, id, patch) {
  return { ...state.stops, [id]: { wrong: [], ...state.stops[id], ...patch } };
}

export const useZachetStore = create(
  persist(
    (set) => ({
      ...INITIAL,

      setUiLang: (uiLang) => set({ uiLang }),
      openFlow: () => set((s) => ({ open: true, screen: s.route ? (s.screen === 'building' ? 'book' : s.screen) : 'welcome' })),
      closeFlow: () => set({ open: false }),
      go: (screen) => set({ screen }),
      setProfile: (patch) => set((s) => ({ profile: { ...s.profile, ...patch } })),
      startBuilding: () => set({ screen: 'building', error: null }),
      setError: (error) => set({ error }),

      setRoute: (route) =>
        set({
          route, startedAt: Date.now(), finishedAt: null, viewing: 0, stops: {}, saved: [],
          rewards: [], toast: null, phrase: '', error: null, screen: 'book',
        }),

      /* Open a stop; its timer starts the first time it is opened. */
      openStop: (index) =>
        set((s) => {
          const id = s.route.stops[index].id;
          const current = s.stops[id];
          const stops = current?.taskStartedAt ? s.stops : patchStop(s, id, { taskStartedAt: Date.now() });
          return { viewing: index, screen: 'stop', stops };
        }),

      /* Step 1: an answer to «find the detail». A wrong option is remembered; the right one scores. */
      answer: (id, option) =>
        set((s) => {
          const stop = s.route.stops.find((x) => x.id === id);
          const state = s.stops[id] || { wrong: [] };
          if (state.answer) return {};
          if (option !== stop.task.correct) {
            return { stops: patchStop(s, id, { wrong: [...(state.wrong || []), option] }) };
          }
          const limit = difficulty(s.profile.difficulty).seconds * 1000;
          const inTime = Date.now() - (state.taskStartedAt || Date.now()) <= limit;
          const firstTry = !(state.wrong || []).length;
          const answer = { firstTry, inTime, points: pointsFor(s.profile.difficulty, { firstTry, inTime }) };
          return withRewards({ ...s, stops: patchStop(s, id, { answer }) });
        }),

      /* Step 2: the voice message home was sent in the messenger, or skipped. */
      voice: (id, result) => set((s) => withRewards({ ...s, stops: patchStop(s, id, { voice: result }) })),

      /* Step 3: the stamp. The last stamp closes the record book. */
      stamp: (id) =>
        set((s) => {
          const stops = patchStop(s, id, { stamped: true });
          const closed = s.route.stops.every((x) => stops[x.id]?.stamped);
          return withRewards({ ...s, stops, finishedAt: closed ? Date.now() : s.finishedAt });
        }),

      toggleSaved: (id) =>
        set((s) => withRewards({ ...s, saved: s.saved.includes(id) ? s.saved.filter((x) => x !== id) : [...s.saved, id] })),
      setPhrase: (phrase) => set({ phrase }),
      clearToast: () => set({ toast: null }),

      /* Moderator: back to the start, as for a new student. */
      resetAll: () => set({ ...INITIAL }),
    }),
    {
      name: 'pushkin-zachet-v1',
      storage: safeStorage,
      partialize: ({ open, toast, error, ...rest }) => rest,
    },
  ),
);
